<template>
  <div id="OrderManagement">
    <div class="od_container">
      <div class="order_qty_p">
        <p>신규 주문수({{orderList.length}})</p>
      </div>
      <div class="od_table">
        <el-table v-loading="isLoading" border :data="orderList" class="clicked" with="100%">
          <el-table-column label="날짜" width="160px">
            <template slot-scope="{row}">
<!--              <p>{{ row.createDate.toDate() | moment("YYYY-MM-DD HH:mm") }}</p>-->
              <p>{{ formatDate(row.createdAt) }}</p>
            </template>
          </el-table-column>
          <el-table-column label="아이디" width="95px">
            <template slot-scope="{row}">
              <p>{{row.userName}}</p>
            </template>
          </el-table-column>
          <el-table-column label="이름" width="80px">
            <template slot-scope="{row}">
              <p>{{row.orderInfo.name}}</p>
            </template>
          </el-table-column>
          <el-table-column label="전화번호" width="120px">
            <template slot-scope="{row}">
              <p>{{row.orderInfo.phoneNumber}}</p>
            </template>
          </el-table-column>
          <el-table-column label="주소" width="250px">
            <template slot-scope="{row}">
              <p>{{row.orderInfo.totalAddress}}</p>
            </template>
          </el-table-column>
          <el-table-column label="구매물품" width="104px">
            <template slot-scope="{row}">
              <div v-for="(item, index) in row.cartItem" :key="index">
                <p>{{ item.title }},</p>
              </div>
            </template>
          </el-table-column>
          <el-table-column label="가격(배송비 포함)" width="104px">
            <template slot-scope="{row}">
                <p>{{ row.finalTotalPrice |formatNumber }}원</p>
            </template>
          </el-table-column>
          <el-table-column label="누적구매횟수" width="104px">
            <template slot-scope="{row}">
              <p>{{row.orderNumber}}</p>
            </template>
          </el-table-column>
          <el-table-column label="누적구매가격" width="104px">
            <template slot-scope="{row}">
              <p>{{row.totalSpent | formatNumber}}원</p>
            </template>
          </el-table-column>
          <el-table-column label="배송메시지" width="120px">
            <template slot-scope="{row}">
              <p>{{ row.orderInfo.deliveryMessage}}</p>
            </template>
          </el-table-column>
          <el-table-column label="옵션" width="70px">
            <template slot-scope="{row}">
              <p style="color: #a9a8a8;text-decoration: underline;cursor: pointer"
                 @click="updateOrderStatus(row.id)">
                {{ row.orderInfo.orderstatus }}
              </p>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script>

  import {db} from "@/firebase";
  import {mapGetters} from "vuex";

  export default {
    name: "OrderManagement",
    components:{},
    computed: {
      ...mapGetters("auth", ["isLogin", "user"]),
    },
    data() {
      return {
        isLoading:false,
        orderList:[],
        newOrder:''|| 0,
        total: 0, size: 10, page: 0,
      };
    },
    methods:{
      async updateOrderStatus(orderId) {
        try {
          await this.$confirm("해당 주문의 상태를 변경하시겠습니까?", "알림");

          const orderRef = db.collection("orders").doc(orderId);
          await orderRef.update({
            "orderInfo.orderstatus": '배송완료'
          });

          console.log(`주문 ${orderId}의 상태가 배송완료 로 변경되었습니다.`);

          await this.getData();
        } catch (error) {
          console.error("주문 상태 업데이트 중 오류 발생:", error);
        }
      },
      async getData(page = 1) {
        this.isLoading = true;
        this.page = page;
        try {
          const orderRef = db.collection("orders")
          .where("orderInfo.orderstatus", "==", "배송확인")  // 서버에서 orderstatus가 0인 주문만 필터링
          .orderBy("createdAt", "asc");  // "asc"는 오래된 순서대로 정렬
          const querySnapshot = await orderRef.get();
          let orders = [];
          querySnapshot.forEach((doc) => {
            orders.push({ ...doc.data(), id: doc.id });
          });

          this.orderList = orders;
          console.log("주문 목록:", this.orderList);
        } catch (error) {
          console.error("주문 목록을 불러오는 중 오류 발생:", error);
        } finally {
          this.isLoading = false;
        }
      },
      formatDate(timestamp) {
        if (timestamp && timestamp.seconds) {
          return new Date(timestamp.seconds * 1000).toLocaleString("ko-KR"); //Firestore Timestamp 변환
        }
        return "-"; //값이 없으면 기본값
      }
    },
    created(){
      this.getData()
    }
  }
</script>