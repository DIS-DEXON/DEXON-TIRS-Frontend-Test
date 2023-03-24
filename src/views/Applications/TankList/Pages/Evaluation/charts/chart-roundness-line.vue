<template>
  <div class="chart-item">
    <highcharts :options="chartOptions" v-if="this.chartData" :key="dataList"></highcharts>
    <contentLoading text="Loading, please wait..." v-if="isLoading == true" color="#fc9b21" />
  </div>
</template>

<script>
// import moment from "moment";
import axios from "/axios.js";
import contentLoading from "@/components/app-structures/app-content-loading.vue";
import { Chart } from "highcharts-vue";
import Highcharts from "highcharts";
import More from "highcharts/highcharts-more";
import accessibility from "highcharts/modules/accessibility";
import exportingInit from "highcharts/modules/exporting";
import offlineExporting from "highcharts/modules/offline-exporting";
// stockInit(Highcharts);
exportingInit(Highcharts);
offlineExporting(Highcharts);
More(Highcharts);
accessibility(Highcharts);

export default {
  name: "chart-roundness-line",
  contentLoading,
  highcharts: Chart,
  props: {
    roundnessData: Array
  },
  created() {},
  data() {
    return {
      id_inspection_record: "",
      circumList: [],
      id_circumList: [],
      dataSeries: null,
      isLoading: false,
      dataList: null,
      chartData: {},
      chartOptionsPolar: {
        chart: {
          polar: true
        },

        title: {
          text: "Roundness Evaluation Graph"
        },

        // subtitle: {
        //   text: "Also known as Radar Chart"
        // },

        pane: {
          startAngle: 0,
          endAngle: 360
        },

        xAxis: {
          tickInterval: 25.7,
          min: 0,
          max: 360,
          labels: {
            format: "{value}°"
          }
        },

        yAxis: {
          min: 0
        },

        plotOptions: {
          series: {
            pointStart: 0,
            pointInterval: 25.7
          }
        },

        series: [
          {
            type: "line",
            name: "Measured Value",
            data: [
              20138,
              20155,
              20140,
              20141,
              20161,
              20142,
              20138,
              20138,
              20141,
              20129,
              20143,
              20151,
              20143,
              20151,
              20128
            ],
            pointPlacement: "between"
          },
          {
            type: "line",
            name: "Nominal Value  ",
            data: [
              20145,
              20145,
              20145,
              20145,
              20145,
              20145,
              20145,
              20145,
              20145,
              20145,
              20145,
              20145,
              20145,
              20145,
              20145
            ],
            pointPlacement: "between"
          }
        ]
      },
      chartOptions: {
        chart: {
          polar: true
        },

        title: {
          text: "Roundness Evaluation Graph"
        },

        // subtitle: {
        //   text: "Also known as Radar Chart"
        // },

        pane: {
          startAngle: 0,
          endAngle: 360
        },

        xAxis: {
          tickInterval: 0,
          min: 0,
          max: 360
          // labels: {
          //   format: "{value}°"
          // }
        },

        yAxis: {
          min: 0
        },

        plotOptions: {
          series: {
            pointStart: 0,
            pointInterval: 0
          }
        },

        series: []
      },
      chartOptions_old: {
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
      this.id_inspection_record = this.roundnessData[0].id_inspection_record;
      this.FETCH_CIRCUM();

      // if (this.dataList.length > 0) {
      //   this.chartOptions.xAxis.series.tickInterval = this.dataList[1].angle_degree;
      //   this.chartOptions.plotOptions.pointInterval = this.dataList[1].angle_degree;
      //   for (let i = 0; i < this.dataList.length; i++) {
      //     this.chartOptions.series[i].data.push(this.dataList[i].measure_value);
      //     //this.chartOptions.series[i]
      //   }
      // }
    }
  },
  methods: {
    FETCH_CIRCUM() {
      axios({
        method: "get",
        url:
          "roundness/get-roundness-circum-insp-id?id_insp_record=" +
          this.id_inspection_record,
        headers: {
          Authorization: "Bearer " + JSON.parse(localStorage.getItem("token"))
        },
        data: {}
      })
        .then(res => {
          //console.log("Get how many series");
          //console.log(res.data);
          if (res.status == 200 && res.data) {
            this.circumList = res.data;
            this.CREATE_SERIES();
          }
        })
        .catch(error => {
          console.log(error);
        })
        .finally(() => {
          //this.isLoading = false;
        });
    },
    FETCH_DATAGRAPH() {
      axios({
        method: "get",
        url:
          "roundness/get-roundness-by-insp-for-graph?id_insp=" +
          this.id_inspection_record,
        headers: {
          Authorization: "Bearer " + JSON.parse(localStorage.getItem("token"))
        },
        data: {}
      })
        .then(res => {
          //console.log(res.data);
          if (res.status == 200 && res.data) {
            this.datagraph = res.data;
          }
        })
        .catch(error => {
          console.log(error);
        })
        .finally(() => {
          for (let i = 0; i < this.id_circumList.length; i++) {
            this.chartOptions.series[i].data = this.datagraph[i].data;
          }
          //this.isLoading = false;
        });
    },
    CREATE_SERIES() {
      this.chartOptions.xAxis.tickInterval = this.dataList[1].angle_degree;
      this.chartOptions.plotOptions.series.pointInterval = this.dataList[1].angle_degree;
      const series_count = this.circumList.length;

      for (let i = 0; i < series_count; i++) {
        this.id_circumList.push(this.circumList[i].id_circum);
        this.chartOptions.series.push({
          type: "line",
          name: "Circumference No." + (i + 1),
          pointPlacement: "between",
          data: []
        });
      }
      this.FETCH_DATAGRAPH();
      console.log("series");
      console.log(this.chartOptions);
      // console.log(this.id_circumList);
    }
  },
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