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
  name: "chart-forecast-sales-bymonth-line",
  created() {
    this.FETCH_DATA();
  },
  data() {
    return {
      chartData: {
        idb: [],
        rbi: [],
        ffs: [],
        itp: [],
      },
      chartOptions: {
        chart: {
          type: "spline",
        },
        credits: {
          enabled: false,
        },
        title: {
          text: "THE MONTHLY SUMMARY OF FORECAST REVENUE BY SERVICE TYPE IN 2023",
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
            name: "IDB",
            data: [],
            color: "#3a0ca3",
            dataLabels: {
              enabled: true,
              formatter: function () {
                if (this.point.y == 0) return "";
                else if (this.point.y < 10000)
                  return (this.point.y / 1000000).toFixed(3) + "MB";
                else return (this.point.y / 1000000).toFixed(2) + "MB";
              },
            },
            marker: {
              symbol: "circle",
            },
          },
          {
            name: "RBI",
            data: [],
            color: "#7209b7",
            dataLabels: {
              formatter: function () {
                if (this.point.y == 0) return "";
                else if (this.point.y < 10000)
                  return (this.point.y / 1000000).toFixed(3) + "MB";
                else return (this.point.y / 1000000).toFixed(2) + "MB";
              },
            },
            marker: {
              symbol: "circle",
            },
          },
          {
            name: "FFS",
            data: [],
            color: "#4cc9f0",
            dataLabels: {
              enabled: true,
              formatter: function () {
                if (this.point.y == 0) return "";
                else if (this.point.y < 10000)
                  return (this.point.y / 1000000).toFixed(3) + "MB";
                else return (this.point.y / 1000000).toFixed(2) + "MB";
              },
            },
            marker: {
              symbol: "circle",
            },
          },
          {
            name: "ITP",
            data: [],
            color: "#4361ee",
            dataLabels: {
              enabled: true,
              formatter: function () {
                if (this.point.y == 0) return "";
                else if (this.point.y < 10000)
                  return (this.point.y / 1000000).toFixed(3) + "MB";
                else return (this.point.y / 1000000).toFixed(2) + "MB";
              },
            },
            marker: {
              symbol: "circle",
            },
            // dataLabels: {
            //   enabled: true,
            //   rotation: -90,
            //   color: '#FFFFFF',
            //   align: 'right',
            //   y: 10, // 10 pixels down from the top
            //   style: {
            //       fontSize: '10px',
            //   },
            //   formatter: function () {
            //     return (this.point.y/1000000).toFixed(2);
            //   }
            // }
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
        url: "forecast-sales/forecast-sales-group-month-sumbyyear",
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
            var json_idb = res.data;

            for (var i = 0; i < json_idb.length; i++) {
              if (json_idb[i].service_type == 1)
                this.chartData.idb.push(json_idb[i].y);
              if (json_idb[i].service_type == 2)
                this.chartData.rbi.push(json_idb[i].y);
              if (json_idb[i].service_type == 3)
                this.chartData.ffs.push(json_idb[i].y);
              if (json_idb[i].service_type == 4)
                this.chartData.itp.push(json_idb[i].y);
            }

            if (this.chartData.idb.length > 0)
              this.chartOptions.series[0].data = this.chartData.idb;
            if (this.chartData.rbi.length > 0)
              this.chartOptions.series[1].data = this.chartData.rbi;
            if (this.chartData.ffs.length > 0)
              this.chartOptions.series[2].data = this.chartData.ffs;
            if (this.chartData.itp.length > 0)
              this.chartOptions.series[3].data = this.chartData.itp;
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