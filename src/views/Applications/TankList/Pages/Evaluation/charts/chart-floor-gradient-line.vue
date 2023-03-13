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
  name: "chart-floor-gradient-line",
  highcharts: Chart,
  props: {
    floorGradientData: Object
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
          text: "Bottom Settlement Evaluation Graph"
        },
        // subtitle: {
        //   text: "Dexon Technology Public Company Limited",
        // },
        yAxis: {
          title: {
            text: "Value",
            style: {
              fontSize: "12"
            }
          },
          labels: {
            formatter: function() {
              return this.value;
            },
            style: {
              fontSize: "12"
            }
          }
        },
        xAxis: {
          title: {
            // text: "Meassured Point (clockwise)",
          },
          labels: {
            style: {
              fontSize: "12"
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
        series: [],
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
    // console.log("Have data: PROPS");
    // console.log(this.floorGradientData);
    if (this.floorGradientData && this.floorGradientData.length > 0) {
      this.dataList = this.floorGradientData;
      console.log("Have data: DATA LIST");
      console.log(this.dataList);

      // if (this.dataList.length > 0) {
      //   for (var i = 0; i < this.dataList.length; i++) {
      //     this.chartOptions.series[0].data.push(this.dataList[i].n_s);
      //     this.chartOptions.series[1].data.push(this.dataList[i].nne_ssw);
      //     this.chartOptions.series[2].data.push(this.dataList[i].ne_sw);
      //     this.chartOptions.series[3].data.push(this.dataList[i].ene_wsw);
      //     this.chartOptions.series[4].data.push(this.dataList[i].e_w);
      //     this.chartOptions.xAxis.categories.push(
      //       this.dataList[i].survey_point
      //     );
      //   }
      // }

      if (this.dataList.length > 0) {
        for (var i = 0; i < this.dataList.length; i++) {
          var name =
            this.dataList[i].direction_from +
            "->" +
            this.dataList[i].direction_to;
          var line = {
            name: name,
            data: [],
            lineWidth: 2,
            marker: {
              symbol: "circle"
            },
            dataLabels: {
              enabled: false
            }
          };
          this.chartOptions.series[i] = line;

          for (var j = 1; j <= this.dataList[i].point_total; j++) {
            this.chartOptions.series[i].data.push(
              this.dataList[i].point_data[0][j]
            );
            this.chartOptions.xAxis.categories.push(j);
          }
        }
      }

      console.log(this.chartOptions);
    }
  },
  methods: {},
  computed: {}
};
</script>

<style lang="scss" scoped>
.chart-item {
  height: -webkit-fill-available;
  min-height: 400px;
  border: 1px solid #000;
  border-radius: 6px;
  overflow: hidden;
  padding-top: 20px;
  margin-top: 5px;
  .highcharts-container {
    height: 100% !important;
    margin: auto 0;
  }
}
</style>