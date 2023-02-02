<template>
  <div class="chart-item">
    <highcharts
      :options="chartOptions"
      v-if="this.chartData"
      :key="chartData.length"
    ></highcharts>
    <contentLoading
      text="Loading, please wait..."
      v-if="isLoading == true"
      color="#fc9b21"
    />
  </div>
</template>

<script>
// import moment from "moment";
import axios from "/axios.js";
import contentLoading from "@/components/app-structures/app-content-loading.vue";

export default {
  name: "chart-shell-settlement-ofp_set-ofp_def-line",
  props: {
    current_view: Object,
  },
  components: {
    contentLoading,
  },
  created() {
    this.FETCH_POINT();
  },
  data() {
    return {
      isLoading: false,
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
            name: "Out of Plane Settlement Ui",
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
            name: "Out of Plane Deflection Si",
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
      this.isLoading = true;
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
          console.log("==> FETCH: Graph Level / Cosine");
          console.log(res.data);
          if (res.status == 200 && res.data) {
            var pointData = res.data;

            if (pointData && pointData.length > 0) {
              for (var i = 0; i < pointData.length; i++) {
                this.chartOptions.series[0].data.push(
                  pointData[i].out_of_plane
                );
                this.chartOptions.series[1].data.push(
                  pointData[i].difference_value
                );
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
  position: relative;
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
  .app-content-loading {
    top: 0;
    left: 0;
  }
}
</style>