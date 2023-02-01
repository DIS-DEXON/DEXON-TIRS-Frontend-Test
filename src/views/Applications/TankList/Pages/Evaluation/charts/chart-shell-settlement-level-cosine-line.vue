<template>
  <div class="chart-item">
    <highcharts
      :options="chartOptions"
      v-if="this.chartData"
      :key="chartData.length"
    ></highcharts>
  </div>
</template>

<script>
// import moment from "moment";
import axios from "/axios.js";

export default {
  name: "chart-roundness-line",
  props: {
    current_view: Object,
  },
  created() {
    this.FETCH_POINT();
  },
  data() {
    return {
      chartData: {},
      chartOptions: {
        chart: {
          type: "spline",
        },
        credits: {
          enabled: false,
        },
        title: {
          text: undefined,
        },
        // subtitle: {
        //   text: "Dexon Technology Public Company Limited",
        // },
        yAxis: {
          title: {
            text: "",
            style: {
              fontSize: "14",
            },
          },
          labels: {
            formatter: function () {
              return this.value;
            },
            style: {
              fontSize: "14",
            },
          },
        },
        xAxis: {
          title: {
            text: "Theta degrees",
          },
          labels: {
            style: {
              fontSize: "14",
            },
          },
          categories: [],
        },
        legend: {
          layout: "horizontal",
          align: "center",
          verticalAlign: "top",
        },
        plotOptions: {
          series: {
            label: {
              connectorAllowed: false,
            },
          },
          spline: {
            dataLabels: {
              enabled: false,
              formatter: function () {
                return this.point.y + " mm";
              },
            },
          },
        },
        series: [
          {
            name: "Level",
            data: [],
            color: "#140a4b",
            lineWidth: 2,
            marker: {
              symbol: "circle",
            },
            dataLabels: {
              enabled: false,
            },
          },
          {
            name: "Optimal Cosine Curve",
            data: [],
            color: "#c12400",
            lineWidth: 2,
            marker: {
              symbol: "square",
            },
          },
        ],
        tooltip: {
          formatter: function () {
            return (
              "The <b>" +
              this.series.name +
              " </b>value for point <b>" +
              this.x +
              "</b> is <b>" +
              this.y
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
  mounted() {},
  methods: {
    FETCH_POINT() {
      const id_tag = this.$route.params.id_tag;
      axios({
        method: "post",
        url: "shell-settlement/get-shell-settlement-graph",
        headers: {
          Authorization: "Bearer " + JSON.parse(localStorage.getItem("token")),
        },
        data: {
          id_tag: id_tag,
          id_inspection_record: this.current_view.id_inspection_record,
        },
      })
        .then((res) => {
          console.log("==> FETCH: Graph settlement / deflection");
          console.log(res.data);
          if (res.status == 200 && res.data) {
            var pointData = res.data;

            if (pointData && pointData.length > 0) {
              for (var i = 0; i < pointData.length; i++) {
                this.chartOptions.series[0].data.push(
                  pointData[i].reduced_level
                );
                this.chartOptions.series[1].data.push(pointData[i].y);
                this.chartOptions.xAxis.categories.push(
                  pointData[i].theta_degrees.toFixed(0)
                );
              }
            }
          }
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
  },
  computed: {},
};
</script>

<style lang="scss" scoped>
.chart-item {
  height: -webkit-fill-available;
  min-height: 200px;
  border: 1px solid #000;
  border-radius: 6px;
  overflow: hidden;
  padding: 10px 40px;
  margin-top: 20px;
  .highcharts-container {
    height: 100% !important;
    margin: auto 0;
  }
}
</style>