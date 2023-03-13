<template>
  <div class="chart-item">
    <highcharts :options="chartOptions" v-if="this.chartData" :key="dataList"></highcharts>
  </div>
</template>

<script>
// import moment from "moment";
// import axios from "/axios.js";
import { Chart } from "highcharts-vue";
import Highcharts from "highcharts";
import exportingInit from "highcharts/modules/exporting";
//import stockInit from "highcharts/modules/stock";
import offlineExporting from "highcharts/modules/offline-exporting";
// stockInit(Highcharts);
exportingInit(Highcharts);
offlineExporting(Highcharts);

export default {
  name: "chart-roundness-line",
  highcharts: Chart,
  props: {
    roundnessData: Object
  },
  created() {},
  data() {
    return {
      dataList: null,
      chartData: {},
      chartOptions: {
        chart: {
          type: "spline"
        },
        credits: {
          enabled: false
        },
        title: {
          text: "Roundness Evaluation Graph"
        },
        // subtitle: {
        //   text: "Dexon Technology Public Company Limited",
        // },
        yAxis: {
          title: {
            text: "Radius Meassured Value (mm)",
            style: {
              fontSize: "14"
            }
          },
          labels: {
            formatter: function() {
              return this.value;
            },
            style: {
              fontSize: "14"
            }
          }
        },
        xAxis: {
          title: {
            text: "Meassured Point (clockwise)"
          },
          labels: {
            style: {
              fontSize: "14"
            }
          },
          categories: []
        },
        legend: {
          layout: "horizontal",
          align: "center",
          verticalAlign: "bottom"
        },
        plotOptions: {
          series: {
            label: {
              connectorAllowed: false
            }
          },
          spline: {
            dataLabels: {
              enabled: true,
              formatter: function() {
                return this.point.y + " mm";
              }
            }
          }
        },
        series: [
          {
            name: "Meassured Value",
            data: [],
            color: "#140a4b",
            lineWidth: 2,
            marker: {
              symbol: "circle"
            },
            dataLabels: {
              enabled: false
            }
          },
          {
            name: "Max",
            data: [],
            color: "#c12400",
            lineWidth: 2,
            marker: {
              enabled: false,
              symbol: "none"
            }
          },
          {
            name: "Nom.",
            data: [],
            color: "#ffac00",
            lineWidth: 2,
            marker: {
              enabled: false,
              symbol: "circle"
            }
          },
          {
            name: "Min",
            data: [],
            color: "#fff000",
            lineWidth: 2,
            marker: {
              enabled: false,
              symbol: "circle"
            }
          }
        ],
        tooltip: {
          formatter: function() {
            return (
              "The <b>" +
              this.series.name +
              " </b>value for point <b>" +
              this.x +
              "</b> is <b>" +
              this.y
            );
          }
        },
        responsive: {
          rules: [
            {
              condition: {
                maxWidth: 500
              },
              chartOptions: {
                legend: {
                  layout: "horizontal",
                  align: "center",
                  verticalAlign: "bottom"
                }
              }
            }
          ]
        }
      }
    };
  },
  mounted() {
    if (this.roundnessData && this.roundnessData.length > 0) {
      this.dataList = this.roundnessData;
      console.log("Have data");
      console.log(this.dataList);

      if (this.dataList.length > 0) {
        for (var i = 0; i < this.dataList.length; i++) {
          this.chartOptions.series[0].data.push(this.dataList[i].measure_value);
          this.chartOptions.series[1].data.push(this.dataList[i].rad_max);
          this.chartOptions.series[2].data.push(this.dataList[i].rad_nom);
          this.chartOptions.series[3].data.push(this.dataList[i].rad_min);
          this.chartOptions.xAxis.categories.push(this.dataList[i].point_no);
        }
      }
    }
  },
  methods: {},
  computed: {}
};
</script>

<style lang="scss" scoped>
.chart-item {
  height: -webkit-fill-available;
  min-height: 200px;
  border: 1px solid #000;
  border-radius: 6px;
  overflow: hidden;
  padding-top: 20px;
  margin-top: 46px;
  .highcharts-container {
    height: 100% !important;
    margin: auto 0;
  }
}
</style>