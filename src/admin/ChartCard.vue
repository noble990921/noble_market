<template>
  <div id="ChartCard">
    <h2>{{ name }}</h2>
    <canvas ref="myChart"></canvas>
  </div>
</template>

<script>
  import Chart from "chart.js";

  export default {
    name: "ChartCard",
    props: {
      chartData: {
        type: Object,
        required: true,
      },
      chartOptions: {
        type: Object,
        default: () => ({}),
      },
      chartType: {
        type: String,
        required: true, // 차트 타입 필수
      },
      name: {
        type: String,
        required: true, // 차트 타입 필수
      },
    },
    data(){
      return{
      }
    },
    methods: {
      renderChart() {
        const ctx = this.$refs.myChart.getContext("2d");
        new Chart(ctx, {
          type: this.chartType, // 차트 타입 (line, bar, pie 등)
          data: this.chartData,
          options: this.chartOptions,
          name: this.name
        });
      },
    },
    mounted() {
      this.renderChart();
    },
  };
</script>