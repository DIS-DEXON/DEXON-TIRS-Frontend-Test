<template>
  <div class="chart-item">
    <highcharts :options="chartOptions" v-if="this.chartData"></highcharts>
    <div class="" v-if="!this.chartData">no data</div>
  </div>
</template>

<script>
import moment from "moment";
import axios from "/axios.js";

export default {
  name: "chart-forecast-sales-pie",
  created() {
    this.FETCH_DATA();
  },
  data() {
    return {
      chartData: {},
      chartOptions: {
        chart: {
          type: "pie",
        },
        credits: {
          enabled: false,
        },
        title: {
          text: "THE TOTAL FORECAST OF REVENUE BY SERVICE TYPE IN 2023",
        },
        yAxis: {
          title: {
            text: "Value (Baht)",
          },
        },
        xAxis: {
          // categories: ["Jan", "Feb"],

          title: {
            // text: "Month",
          },
        },
        legend: {
          layout: "vertical",
          align: "right",
          verticalAlign: "middle",
        },
        plotOptions: {
          series: {
            label: {
              connectorAllowed: false,
            },
            pointStart: 1,
          },
          pie: {
            allowPointSelect: true,
            cursor: "pointer",
            dataLabels: {
              enabled: true,
              style: {
                fontSize: "14px",
              },
              formatter: function () {
                return (
                  this.point.name +
                  ": " +
                  (this.point.y / 1000000).toFixed(2) +
                  "MB"
                );
              },
            },
          },
        },
        series: [
          {
            name: "Service",
            colorByPoint: true,
            data: [
              {
                name: "IDB",
                y: 0,
                color: "#3a0ca3",
              },
              {
                name: "RBI",
                y: 0,
                color: "#7209b7",
              },
              {
                name: "FFS",
                y: 0,
                color: "#4cc9f0",
              },
              {
                name: "ITP",
                y: 0,
                color: "#4361ee",
              },
            ],
          },
        ],
        tooltip: {
          //pointFormat: "{series.name}: <b>{point.percentage:.1f}%</b>",
          formatter: function () {
            return (
              "<b>" +
              this.point.name +
              "<br>" +
              "</b><br>Value: " +
              (this.y / 1000000).toFixed(2) +
              "MB (" +
              this.point.percentage.toFixed(2) +
              "%)"
            );
          },
        },
        responsive: {
          rules: [
            {
              condition: {
                maxWidth: 500,
              },
              chartOptions: {
                legend: {
                  layout: "horizontal",
                  align: "center",
                  verticalAlign: "bottom",
                },
              },
            },
          ],
        },
      },
    };
  },
  methods: {
    FETCH_DATA() {
      axios({
        method: "post",
        url: "forecast-sales/forecast-sales-group-sumbytype",
        headers: {
          Authorization: "Bearer " + JSON.parse(localStorage.getItem("token")),
        },
        data: {
          year_no: moment().year() + 1,
        },
      })
        .then((res) => {
          // console.log(res);
          if (res.data) {
            this.chartData = res.data;
            if (this.chartData) {
              this.chartOptions.series[0].data[0].y = this.chartData[0].y;
              this.chartOptions.series[0].data[1].y = this.chartData[1].y;
              this.chartOptions.series[0].data[2].y = this.chartData[2].y;
              this.chartOptions.series[0].data[3].y = this.chartData[3].y;
            }
          }
        })
        .catch((error) => {
          this.$ons.notification.alert(
            error.code + " " + error.response.status + " " + error.message
          );
        })
        .finally(() => {});
    },
  },
  computed: {},
};
</script>

<style lang="scss" scoped>
.chart-item {
  min-height: 200px;
}
</style>