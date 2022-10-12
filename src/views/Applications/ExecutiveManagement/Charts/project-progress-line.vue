<template>
  <div class="project-progress-wrapper chart-item">
    <div class="detail-panel" v-if="hideDetail == false">
      <div id="report-sheet">
        <div class="report-container">
          <div class="sheet-body">
            <div class="section-label" style="grid-column: span 2">
              <label>project information</label>
            </div>
            <div class="form-item-label"><label>Project No:</label></div>
            <div class="form-item-value">
              <label>{{ info.project_no }}</label>
            </div>
            <div class="form-item-label"><label>Service Type:</label></div>
            <div class="form-item-value">
              <label>{{ info.service_type }}</label>
            </div>
            <div class="form-item-label"><label>Client:</label></div>
            <div class="form-item-value">
              <label>{{ info.client_name }}</label>
            </div>
            <div class="form-item-label">
              <label>Project Value (MB):</label>
            </div>
            <div class="form-item-value">
              <label>{{ (info.project_value / 1000000).toFixed(2) }}</label>
            </div>
            <div class="form-item-label"><label>Progress (%):</label></div>
            <div class="form-item-value">
              <label>{{ info.last_progress.toFixed(2) }}</label>
            </div>
            <div class="form-item-label"><label>Progress Status:</label></div>

            <div
              class="form-item-value"
              style="background-color: #ccffcc"
              v-if="info.status_cumulative == 'On plan'"
            >
              <label>{{ info.status_cumulative }}</label>
            </div>
            <div
              class="form-item-value"
              style="background-color: #66ff99"
              v-if="info.status_cumulative == 'Over plan'"
            >
              <label>{{ info.status_cumulative }}</label>
            </div>
            <div
              class="form-item-value"
              style="background-color: #ffff00"
              v-if="info.status_cumulative == 'Lower plan'"
            >
              <label>{{ info.status_cumulative }}</label>
            </div>
            <div
              class="form-item-value"
              style="background-color: #00cc00"
              v-if="info.status_cumulative == 'Done'"
            >
              <label>{{ info.status_cumulative }}</label>
            </div>
          </div>
        </div>
      </div>
    </div>
    <highcharts class="chart-panel" :options="chartOptions"></highcharts>
  </div>
</template>

<script>
// import moment from "moment";
// import axios from "/axios.js";

export default {
  name: "chart-project-progress",
  props: {
    info: Object,
    hideDetail: Boolean,
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
          text:
            "PROJECT PROGRESS of " +
            this.info.project_no +
            " - " +
            this.info.client_name,
        },
        yAxis: {
          title: {
            text: "PROGRESS (%)",
            style: {
              fontSize: "14",
            },
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
            lineWidth: 2,
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
              " </b>progress for month <b>" +
              this.x +
              "</b> is <b>" +
              this.y +
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
  methods: {},
  computed: {},
  mounted() {
    if (this.info) {
      for (var i = 0; i < this.info.progress_by_month.length; i++) {
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
  },
};
</script>

<style lang="scss" scoped>
.chart-item {
  min-height: 200px;
}
.project-progress-wrapper {
  margin-top: 20px;
  display: grid;
  width: 100%;
  grid-template-columns: 300px auto;
  // border: 0.5px solid #000;
  .detail-panel {
    width: 300px;
  }
  .chart-panel {
    border: 1px solid #000;
    border-width: 1px 1px 1px 0;
  }
}

#report-sheet {
  width: 100%;
  box-shadow: none;
  padding: 0;
  // border: 0.5px solid #000;
  margin: 0;
  .report-container {
    .sheet-body {
      grid-template-columns: repeat(2, 50%);
      .section-label {
        text-align: center;
      }
      .form-item-value {
        grid-column: span 1;
      }
    }
  }
}

#report-sheet .report-container .sheet-body .form-item-value {
  padding: 10px 8px;
}
</style>