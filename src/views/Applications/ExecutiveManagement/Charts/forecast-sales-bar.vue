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
  name: "chart-forecast-sales-bar",
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
          type: "column",
        },
        credits: {
          enabled: false,
        },
        title: {
          text: "THE QUARTERLY SUMMARY OF FORECAST REVENUE BY SERVICE TYPE IN 2023",
        },
        yAxis: {
          title: {
            text: "FORECAST REVENUE [MB]",
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
          crosshair: true,
          categories: ["Q1", "Q2", "Q3", "Q4"],
          labels: {
            style: {
              fontSize: "14",
            },
          },
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
        },
        series: [
          {
            name: "IDB",
            data: [],
            color: "#3a0ca3",
            dataLabels: {
              enabled: true,
              rotation: -90,
              color: "#FFFFFF",
              align: "right",
              y: 10, // 10 pixels down from the top
              style: {
                fontSize: "10px",
              },
              formatter: function () {
                return (this.point.y / 1000000).toFixed(2);
              },
            },
          },
          {
            name: "RBI",
            data: [],
            color: "#7209b7",
            dataLabels: {
              enabled: true,
              rotation: -90,
              color: "#FFFFFF",
              align: "right",
              y: 10, // 10 pixels down from the top
              style: {
                fontSize: "10px",
              },
              formatter: function () {
                return (this.point.y / 1000000).toFixed(2);
              },
            },
          },
          {
            name: "FFS",
            data: [],
            color: "#4cc9f0",
            dataLabels: {
              enabled: true,
              rotation: -90,
              color: "#FFFFFF",
              align: "right",
              y: 10, // 10 pixels down from the top
              style: {
                fontSize: "10px",
              },
              formatter: function () {
                return (this.point.y / 1000000).toFixed(2);
              },
            },
          },
          {
            name: "ITP",
            data: [],
            color: "#4361ee",
            dataLabels: {
              enabled: true,
              rotation: -90,
              color: "#FFFFFF",
              align: "right",
              y: 10, // 10 pixels down from the top
              style: {
                fontSize: "10px",
              },
              formatter: function () {
                return (this.point.y / 1000000).toFixed(2);
              },
            },
          },
        ],
        tooltip: {
          formatter: function () {
            return (
              "The <b>" +
              this.series.name +
              " </b>value for <b>" +
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
        url: "forecast-sales/forecast-sales-group-sumbyyear",
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
          console.log(error);
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