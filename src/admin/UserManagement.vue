<template>
  <div id="UserManageMent">
    <h2>회원 목록 ({{users.length}})</h2>
    <div v-if="loading">로딩 중...</div>
    <ul v-else>
      <li v-if="users.length == 0">
        <p>회원이 없습니다.</p>
      </li>
      <li v-for="(user, index) in users" :key="index">
        <p><strong>이름:</strong> {{ user.name }}</p>
        <p><strong>이메일:</strong> {{ user.email }}</p>
        <p><strong>전화번호:</strong> {{ user.phoneNumber }}</p>
        <p><strong>담당파트너:</strong> {{ user.partnerCode }}</p>
        <p><strong>가입일:</strong> {{ formatDate(user.createdAt) }}</p>
        <hr />
      </li>
    </ul>
  </div>
</template>

<script>
  import { db } from '@/firebase'
  import {mapGetters} from "vuex";
  export default {
    name: "UserManagement",
    computed: {
      ...mapGetters('auth', ['user', 'isLogin']),
    },
    data() {
      return {
        users: [],
        loading: true
      };
    },
    methods: {
      async fetchUsers() {
        try {
          let query = db.collection('users');

          // 현재 로그인된 유저가 파트너라면 partnerCode로 필터링
          if (this.user.role === 'partner') {
            query = query.where('partnerCode', '==', this.user.partnerCode);
          }

          const snapshot = await query.orderBy('createdAt', 'desc').get();
          this.users = snapshot.docs.map(doc => {
            const data = doc.data();
            return {
              ...data,
              createdAt: data.createdAt?.toDate?.() || null
            };
          });
        } catch (error) {
          console.error("회원 정보 불러오기 오류:", error);
        } finally {
          this.loading = false;
        }
      },
      formatDate(date) {
        if (!date) return '';
        return new Intl.DateTimeFormat('ko-KR', {
          dateStyle: 'full',
          timeStyle: 'medium',
          timeZone: 'Asia/Seoul'
        }).format(date);
      }
    },
    created() {
      this.fetchUsers();
    }
  };
</script>