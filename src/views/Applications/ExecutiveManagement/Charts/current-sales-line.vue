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
  name: "chart-current-sales-line",
  created() {
    this.FETCH_DATA();
  },
  data() {
    return {
      chartData: {
        plan: [
          {
            month: 1,
            y: 1666666,
          },
          {
            month: 2,
            y: 1666666,
          },
          {
            month: 3,
            y: 1666666,
          },
          {
            month: 4,
            y: 1666666,
          },
          {
            month: 5,
            y: 1666666,
          },
          {
            month: 6,
            y: 1666666,
          },
          {
            month: 7,
            y: 1666666,
          },
          {
            month: 8,
            y: 1666666,
          },
          {
            month: 9,
            y: 1666666,
          },
          {
            month: 10,
            y: 1666666,
          },
          {
            month: 11,
            y: 1666666,
          },
          {
            month: 12,
            y: 1666666,
          },
        ],
      },
      chartOptions: {
        chart: {
          type: "spline",
        },
        credits: {
          enabled: false,
        },
        title: {
          text: "THE SUMMARY OF CURRENT REVENUE BY MONTHLY IN 2022",
        },
        // subtitle: {
        //   text: "Dexon Technology Public Company Limited",
        // },
        yAxis: {
          title: {
            text: "ACTUAL REVENUE [MB]",
            style: {
              fontSize: "14",
            },
          },
          labels: {
            formatter: function () {
              return (this.value / 1000000).toFixed(2);
            },
            style: {
              fontSize: "14",
            },
          },
        },
        xAxis: {
          title: {
            // text: "Months",
          },
          labels: {
            style: {
              fontSize: "14",
            },
          },
          categories: [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec",
          ],
        },
        legend: {
          layout: "horizontal",
          align: "center",
          verticalAlign: "bottom",
        },
        plotOptions: {
          series: {
            label: {
              connectorAllowed: false,
            },
          },
          spline: {
            dataLabels: {
              enabled: true,
              formatter: function () {
                return (this.point.y / 1000000).toFixed(2) + "MB";
              },
            },
          },
        },
        series: [
          {
            name: "Sales Target [MB]",
            data: [],
            color: "#f00f78",
            lineWidth: 2,
            marker: {
              symbol: "circle",
            },
            dataLabels: {
              enabled: false,
            },
          },
          {
            name: "Actual Revenue [MB]",
            data: [],
            color: "#1e1450",
            lineWidth: 2,
            marker: {
              symbol: "circle",
            },
          },
        ],
        tooltip: {
          formatter: function () {
            return (
              "The <b>" +
              this.series.name +
              " </b>value for month <b>" +
              this.x +
              "</b> is <b>" +
              (this.y / 1000000).toFixed(2) +
              "MB"
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
        url: "current-sales/current-sales-sumbyyear",
        headers: {
          Authorization: "Bearer " + JSON.parse(localStorage.getItem("token")),
        },
        data: {
          year_no: moment().year(),
        },
      })
        .then((res) => {
          // console.log(res);
          if (res.data) {
            this.chartData.actual = res.data;
            if (this.chartData.plan.length > 0) {
              this.chartOptions.series[0].data = this.chartData.plan;
            }
            if (this.chartData.actual.length > 0) {
              this.chartOptions.series[1].data = this.chartData.actual;
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