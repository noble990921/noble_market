<template>
  <div id="DashbordManage">
    <MyChart
        :key="chartKey"
        class="chart"
        :chartData="sales_chartData"
        :chartOptions="chartOptions"
        chartType="line"
        name="판매량"
    />
    <div class="slice_chart">
      <MyChart
          :key="chartKey"
          class="chart"
          :chartData="user_chartData"
          :chartOptions="chartOptions"
          chartType="line"
          name="회원수"
      />
      <MyChart
          :key="chartKey"
          class="chart"
          :chartData="proceeds_chartData"
          :chartOptions="chartOptions"
          chartType="bar"
          name="매출량"
      />
    </div>
  </div>
</template>

<script>
  import MyChart from "./ChartCard";
  import firebase from "firebase/app";
  import "firebase/firestore";

  export default {
    name: "DashbordManage",
    components:{MyChart},
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
          // 12개월 데이터를 담을 배열 초기화
          let salesData = new Array(12).fill(0);
          let userData = new Array(12).fill(0);
          let proceedsData = new Array(12).fill(0);

          // 🔹 회원 수 가져오기
          const usersSnapshot = await db.collection("users").get();
          usersSnapshot.forEach(doc => {
            const data = doc.data();
            const createdAt = data.createdAt ? data.createdAt.toDate() : null;
            if (createdAt && createdAt.getFullYear() === currentYear) {
              const month = createdAt.getMonth(); // 0~11 (1월=0, 12월=11)
              userData[month] += 1;
            }
          });

          // 🔹 주문 데이터 가져오기 (매출량, 판매량)
          const ordersSnapshot = await db.collection("orders").get();
          ordersSnapshot.forEach(doc => {
            const data = doc.data();
            const createdAt = data.createdAt ? data.createdAt.toDate() : null;
            if (createdAt && createdAt.getFullYear() === currentYear) {
              const month = createdAt.getMonth();
              proceedsData[month] += data.finalTotalPrice || 0; // 매출량 (가격 합산)
              salesData[month] += data.cartQty || 0; // 판매량 (상품 개수)
            }
          });

          // 🔹 차트 데이터 업데이트
          this.sales_chartData.datasets[0].data = salesData;
//          console.log('salesData:',salesData)
          this.user_chartData.datasets[0].data = userData;
//          console.log('userData:',userData)
          this.proceeds_chartData.datasets[0].data = proceedsData;
//          console.log('proceedsData:',proceedsData)
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