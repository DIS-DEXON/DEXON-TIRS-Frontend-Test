<template>
  <div class="project-progress-wrapper chart-item">
    <highcharts
      class="chart-panel"
      :options="chartOptions"
      :key="this.info.id_project"
    ></highcharts>
  </div>
</template>

<script>
export default {
  name: "chart-project-progress",
  props: {
    info: Object,
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
          text: "PROJECT PROGRESS of " + this.info.project_no,
        },
        yAxis: {
          title: {
            text: "PROGRESS (%)",
          },
          labels: {
            formatter: function () {
              return this.value + "%";
            },
            style: {
              fontSize: "14",
            },
          },
          max: 100,
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
          categories: [],
          //range: 1,
          //tickInterval: 1,
          plotLines: [
            {
              value: "Oct",
              dashStyle: "dash",
              width: 2,
              color: "#d33",
            },
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
                return this.point.y.toFixed(2) + " %";
              },
            },
          },
        },
        series: [
          {
            name: "Planned",
            data: [],
            color: "#f00f78",
            lineWidth: 4,
            marker: {
              symbol: "circle",
            },
            dataLabels: {
              enabled: false,
            },
          },
          {
            name: "Actual",
            data: [],
            color: "#1e1450",
            lineWidth: 4,
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
              " </b>progress for month <b>" +
              this.x +
              "</b> is <b>" +
              this.y.toFixed(2) +
              "%"
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
  created() {},
  methods: {},
  computed: {},
  mounted() {
    if (this.info) {
      var dataLength = this.info.progress_by_month;
      if (dataLength) {
        // console.log("more than one");
        for (var i = 0; i <= dataLength.length; i++) {
          this.chartOptions.series[0].data.push(
            this.info.progress_by_month[i].plan_cumulative
          );
          this.chartOptions.series[1].data.push(
            this.info.progress_by_month[i].actual_cumulative
          );
          this.chartOptions.xAxis.categories.push(
            this.info.progress_by_month[i].month_abbr
          );
        }
      }
    }
  },
};
</script>

<style lang="scss" scoped>
.chart-item {
  min-height: 200px;
}
.project-progress-wrapper {
  display: block;
  padding: 20px;
  .chart-panel {
    border: 1px solid #e6e6e6;
  }
}
</style>