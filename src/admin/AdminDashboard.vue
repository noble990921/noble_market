<template>
  <div id="DashbordManage">
    <MyChart
        :key="chartKey"
        class="chart"
        :chartData="user_chartData"
        :chartOptions="chartOptions"
        chartType="line"
        name="회원수"
    />
<!--    <div class="slice_chart">-->
<!--      <MyChart-->
<!--          :key="chartKey"-->
<!--          class="chart"-->
<!--          :chartData="sales_chartData"-->
<!--          :chartOptions="chartOptions"-->
<!--          chartType="line"-->
<!--          name="판매량"-->
<!--      />-->
<!--      <MyChart-->
<!--          :key="chartKey"-->
<!--          class="chart"-->
<!--          :chartData="proceeds_chartData"-->
<!--          :chartOptions="chartOptions"-->
<!--          chartType="bar"-->
<!--          name="매출량"-->
<!--      />-->
<!--    </div>-->
  </div>
</template>

<script>
  import MyChart from "./ChartCard";
  import firebase from "firebase/app";
  import "firebase/firestore";
  import { mapGetters } from "vuex";


  export default {
    name: "DashbordManage",
    components:{MyChart},
    computed: {
      ...mapGetters("auth", ["user"])
    },
    data() {
      return {
        chartKey: 0,
        sales_chartData: {
          labels: ["1월", "2월", "3월", "4월", "5월", "6월", '7월','8월','9월','10월','11월','12월'],
          datasets: [
            {
              label: "판매량",
              backgroundColor: "rgba(75,192,192,0.03)",
              borderColor: "rgba(75,192,192,1)",
              data: [],
              pointBackgroundColor: "#fff", // 점 색상
              pointBorderColor: "#48DBFB", // 점 테두리 색상
              pointRadius: 5, // 점 크기
              pointHoverRadius: 7, // 호버 시 점 크기
              borderWidth: 2, // 선 두께
            },
          ],
        },
        user_chartData: {
          labels: ["1월", "2월", "3월", "4월", "5월", "6월", '7월','8월','9월','10월','11월','12월'],
          datasets: [
            {
              label: "회원수",
              backgroundColor: "rgba(75,192,192,0.03)",
              borderColor: "rgba(75,192,192,1)",
              data: [],
              pointBackgroundColor: "#fff", // 점 색상
              pointBorderColor: "#48DBFB", // 점 테두리 색상
              pointRadius: 5, // 점 크기
              pointHoverRadius: 7, // 호버 시 점 크기
              borderWidth: 2, // 선 두께
            },
          ],
        },
        proceeds_chartData: {
          labels: ["1월", "2월", "3월", "4월", "5월", "6월", '7월','8월','9월','10월','11월','12월'],
          datasets: [
            {
              label: "매출량",
              backgroundColor: "rgba(75,192,192,0.03)",
              borderColor: "rgba(75,192,192,1)",
              data: [],
              pointBackgroundColor: "#fff", // 점 색상
              pointBorderColor: "#48DBFB", // 점 테두리 색상
              pointRadius: 5, // 점 크기
              pointHoverRadius: 7, // 호버 시 점 크기
              borderWidth: 2, // 선 두께
            },
          ],
        },
        selectedYear: new Date().getFullYear(),
        chartOptions: {
          responsive: true,
          maintainAspectRatio: false,
        },
      };
    },
    methods: {
      async fetchChartData() {
        const db = firebase.firestore();
        const currentYear = this.selectedYear;

        try {
          let salesData = new Array(12).fill(0);
          let userData = new Array(12).fill(0);
          let proceedsData = new Array(12).fill(0);

          const isPartner = this.user.role === 'partner';
          const partnerCode = this.user.partnerCode;

          // 🔹 회원 수
          let userQuery = db.collection("users");
          if (isPartner) {
            userQuery = userQuery.where("partnerCode", "==", partnerCode);
          }
          const usersSnapshot = await userQuery.get();
          usersSnapshot.forEach(doc => {
            const data = doc.data();
            const createdAt = data.createdAt?.toDate?.();
            if (createdAt && createdAt.getFullYear() === currentYear) {
              const month = createdAt.getMonth();
              userData[month] += 1;
            }
          });

          // 🔹 주문 수
          let orderQuery = db.collection("orders");
          if (isPartner) {
            orderQuery = orderQuery.where("partnerCode", "==", partnerCode);
          }
          const ordersSnapshot = await orderQuery.get();
          ordersSnapshot.forEach(doc => {
            const data = doc.data();
            const createdAt = data.createdAt?.toDate?.();
            if (createdAt && createdAt.getFullYear() === currentYear) {
              const month = createdAt.getMonth();
              proceedsData[month] += data.finalTotalPrice || 0;
              salesData[month] += data.cartQty || 0;
            }
          });

          this.sales_chartData.datasets[0].data = salesData;
          this.user_chartData.datasets[0].data = userData;
          this.proceeds_chartData.datasets[0].data = proceedsData;
          this.chartKey += 1;
        } catch (error) {
          console.error("차트 데이터 가져오기 실패:", error);
        }
      }
    },
    created() {
      this.fetchChartData();
    }
  }
</script>