<template>
  <div class="pm-page">
    <div class="pm-page-container">
      <div class="page-header">
        <h1>
          <span style="font-size: 32px">E</span>xecutive
          <span style="font-size: 32px">R</span>eport of
          <span style="font-size: 32px">a</span>sset
          <span style="font-size: 32px">i</span>ntegrity
          <span style="font-size: 32px">s</span>ection
        </h1>
        <div>
          <label>report period:</label>
          <label> {{ weekly_start_date }} to {{ weekly_end_date }}</label>
        </div>
        <div>
          <label>report by:</label>
          <label>Mr. Chawanat Kongthanakana</label>
        </div>
        <!-- <div>
          <label>position:</label>
          <label>asset integrity section manager</label>
        </div> -->
      </div>
      <div class="page-content">
        <div class="page-report">
          <!-- Weekly Report -->
          <div class="report-item">
            <h2>The Executive Summary</h2>
            <div class="report-item-card">
              <div class="report-message-display" v-html="report_message"></div>
            </div>
          </div>
          <!-- Current Sales -->
          <div class="report-item">
            <h2>The Current Revenue of {{ current_year }}</h2>
            <div class="report-item-card">
              <YearSetCurrent />
              <div class="chart-wrapper-grid">
                <div class="chart-wrapper" style="grid-column: span 2">
                  <ChartCurrentSalesLine />
                  <!-- <div class="figure-label">
                    THE SUMMARY OF CURRENT REVENUE BY MONTHLY IN 2022
                  </div> -->
                </div>
                <div class="chart-wrapper" style="grid-column: span 2">
                  <ChartCurrentSalesPie />
                  <!-- <div class="figure-label">THE TOTAL REVENUE IN 2022</div> -->
                </div>
                <div
                  class="chart-wrapper"
                  style="grid-column: span 2; margin-bottom: 0px"
                >
                  <ChartCurrentSalesBar />
                  <!-- <div class="figure-label">
                    THE SUMMARY OF CURRENT REVENUE IN 2022
                  </div> -->
                </div>
              </div>
            </div>
          </div>
          <!-- Forecast Sales -->
          <div class="report-item">
            <h2>The Forecast Revenue of {{ current_year + 1 }}</h2>
            <div class="report-item-card">
              <YearSetForecast />
              <div class="chart-wrapper-grid">
                <div class="chart-wrapper" style="grid-column: span 2">
                  <ChartForecastSalesBar />
                  <!-- <div class="figure-label">
                    THE SUMMARY OF FORECAST REVENUE IN 2023
                  </div> -->
                </div>
                <div class="chart-wrapper" style="grid-column: span 2">
                  <ChartForecastSalesByMonthLine />
                  <!-- <div class="figure-label">
                    THE SUMMARY OF FORECAST REVENUE IN 2023
                  </div> -->
                </div>
                <div class="chart-wrapper" style="grid-column: span 2">
                  <ChartForecastSalesPie />
                  <!-- <div class="figure-label">
                    THE TOTAL FORECAST OF REVENUE BY SERVICE TYPE IN 2023
                  </div> -->
                </div>
              </div>
              <div class="table-summary">
                <div class="panel-head">
                  The Forecast Revenue Summary of 2023
                </div>
                <DxDataGrid
                  id="summary-forecast-revenue"
                  :data-source="forecast_project_list"
                  :selection="{ mode: 'single' }"
                  :hover-state-enabled="true"
                  :allow-column-reordering="true"
                  :show-borders="true"
                  :show-row-lines="false"
                  :row-alternation-enabled="true"
                >
                  <DxPaging :page-size="100" />
                  <DxColumn
                    data-field=""
                    :width="50"
                    alignment="center"
                    caption="No."
                    cell-template="CELL_ROW_FORECAST"
                  />
                  <DxColumn
                    data-field="service_type_desc"
                    alignment="center"
                    caption="Service Type"
                    :width="100"
                    header-cell-template="service-header"
                  />
                  <DxColumn
                    data-field="project_name"
                    alignment="left"
                    caption="Project Name"
                  />
                  <DxColumn
                    data-field="client_name"
                    caption="Client Name"
                    :width="400"
                  />
                  <DxColumn
                    data-field="confident_level"
                    caption="Confidence Level (%)"
                    alignment="right"
                    :width="120"
                    :customize-text="FORECAST_CONFIDENCE_LEVEL"
                    header-cell-template="confidence-header"
                    css-class="confidence-padding"
                  />
                  <DxColumn
                    data-field="project_value"
                    caption="Forecast Revenue (MB)"
                    alignment="right"
                    :width="120"
                    :customize-text="FORECAST_REVENUE"
                    header-cell-template="forecast-header"
                    css-class="forecast-value-padding"
                  />
                  <!-- Configuration goes here -->
                  <!-- <DxFilterRow :visible="true" /> -->
                  <DxScrolling mode="standard" />
                  <template #service-header>
                    <div>Service<br />Type</div>
                  </template>
                  <template #confidence-header>
                    <div>Confident<br />Level(%)</div>
                  </template>
                  <template #forecast-header>
                    <div>Forecast<br />Revenue(MB)</div>
                  </template>
                  <template #CELL_ROW_FORECAST="{ data }">
                    {{ data.rowIndex + 1 }}
                  </template>
                </DxDataGrid>
                <div class="panel-summary">
                  <div class="label">total forecast revenue (Million Baht)</div>
                  <div class="total-count">{{ forecast_revenue_total }}</div>
                </div>
              </div>
            </div>
          </div>
          <!-- Project Progress -->
          <div class="report-item">
            <h2>the current project progress</h2>
            <div class="report-item-card">
              <div class="table-summary">
                <div class="panel-head">Project Progress Summary</div>
                <DxDataGrid
                  id="summary-forecast-revenue"
                  :data-source="current_project_progress_chart"
                  :selection="{ mode: 'single' }"
                  :hover-state-enabled="true"
                  :allow-column-reordering="true"
                  :show-borders="true"
                  :show-row-lines="false"
                  :row-alternation-enabled="true"
                  @cell-prepared="STATUS_PROJECT_CUMULATIVE"
                >
                  <DxPaging :page-size="100" />
                  <DxColumn
                    data-field=""
                    :width="50"
                    alignment="center"
                    caption="No."
                    cell-template="CELL_ROW_CURRENT"
                  />
                  <DxColumn
                    data-field="project_no"
                    alignment="center"
                    caption="Project No."
                    :width="120"
                    sort-order="asc"
                  />
                  <DxColumn
                    data-field="project_name"
                    alignment="left"
                    caption="Project Name"
                  />
                  <DxColumn
                    data-field="service_type"
                    alignment="center"
                    caption="Service Type"
                    :width="100"
                    header-cell-template="service-header"
                  />
                  <DxColumn
                    data-field="client_name"
                    :width="400"
                    caption="Client Name"
                  />
                  <DxColumn
                    data-field="actual_cumulative"
                    caption="Progress (%)"
                    :width="120"
                    alignment="right"
                    :customize-text="PROJECT_PROGRESS_PERCENT"
                    header-cell-template="progress-header"
                    css-class="progress-padding"
                  />
                  <DxColumn
                    data-field="status_cumulative"
                    caption="Progress Status"
                    :width="120"
                    alignment="center"
                    header-cell-template="progress-status-header"
                  />

                  <!-- Configuration goes here -->
                  <!-- <DxFilterRow :visible="true" /> -->
                  <DxScrolling mode="standard" />
                  <template #service-header>
                    <div>Service<br />Type</div>
                  </template>
                  <template #progress-header>
                    <div>Progress<br />(%)</div>
                  </template>
                  <template #progress-status-header>
                    <div>Progress<br />Status</div>
                  </template>
                  <template #CELL_ROW_CURRENT="{ data }">
                    {{ data.rowIndex + 1 }}
                  </template>
                </DxDataGrid>
              </div>
              <div class="chart-wrpper-grid">
                <div class="chart-wrapper">
                  <div
                    v-for="(item, index) in current_project_progress_chart"
                    :key="item.id_project"
                  >
                    <ChartProjectProgress
                      :info="current_project_progress_chart[index]"
                      v-if="item.status_cumulative != 'Done'"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="report-item">
            <h2>the sales and marketing</h2>
            <div class="report-item-card">
              <UnderDevelopment />
            </div>
          </div>
          <label class="update-label"
            >Information Updated on: {{ current_date }}</label
          >
        </div>
      </div>
    </div>

    <contentLoading
      text="Loading, please wait..."
      v-if="isLoading == true"
      color="#fc9b21"
    />
  </div>
</template> 

<script>
//DataGrid
// import { exportDataGrid } from "devextreme/excel_exporter";
import "devextreme/dist/css/dx.light.css";
import {
  DxDataGrid,
  // DxSearchPanel,
  DxPaging,
  // DxPager,
  DxScrolling,
  DxColumn,
  // DxExport,
} from "devextreme-vue/data-grid";

//Charts
import ChartCurrentSalesLine from "@/views/Applications/ExecutiveManagement/Charts/current-sales-line.vue";
import ChartCurrentSalesPie from "@/views/Applications/ExecutiveManagement/Charts/current-sales-pie.vue";
import ChartCurrentSalesBar from "@/views/Applications/ExecutiveManagement/Charts/current-sales-bar.vue";

import ChartForecastSalesPie from "@/views/Applications/ExecutiveManagement/Charts/forecast-sales-pie.vue";
import ChartForecastSalesBar from "@/views/Applications/ExecutiveManagement/Charts/forecast-sales-bar.vue";
import ChartForecastSalesByMonthLine from "@/views/Applications/ExecutiveManagement/Charts/forecast-sales-bymonth-line.vue";

import ChartProjectProgress from "@/views/Applications/ExecutiveManagement/Charts/project-progress-line.vue";

//Year Set
import YearSetCurrent from "@/views/Applications/ExecutiveManagement/YearSet/current-sales.vue";
import YearSetForecast from "@/views/Applications/ExecutiveManagement/YearSet/forecast-sales.vue";

//DataGrid

//Structures
import contentLoading from "@/components/app-structures/app-content-loading.vue";
import ViewLayout from "@/layouts/sidebar-layout.vue";
import ViewLayoutNoneSidebar from "@/layouts/non-sidebar-layout.vue";
import UnderDevelopment from "@/components/unavailable-feature.vue";

//API
import axios from "/axios.js";
import moment from "moment";

export default {
  name: "ViewSummaryReport",
  components: {
    // toolbar,
    UnderDevelopment,
    contentLoading,
    ChartCurrentSalesLine,
    ChartCurrentSalesPie,
    ChartCurrentSalesBar,
    YearSetCurrent,
    ChartForecastSalesPie,
    ChartForecastSalesBar,
    YearSetForecast,
    ChartProjectProgress,
    ChartForecastSalesByMonthLine,
    //DataGrid
    DxDataGrid,
    // DxSearchPanel,
    DxPaging,
    // DxPager,
    DxScrolling,
    DxColumn,
    // DxExport,
  },
  created() {
    this.$store.commit("CLEAR_CURRENT_INAPP");
    this.$store.commit("UPDATE_CURRENT_INAPP", {
      name: "Executive Summary Report",
      icon: "/img/icon_menu/executive_management/summary.png",
    });
    this.FETCH_INFO();
    this.FETCH_DATA_PROJECT_FORECAST();
    this.FETCH_DATA_PROJECT_PROGRESS();
    // this.$emit(`update:layout`, ViewLayoutNoneSidebar);
    var user = JSON.parse(localStorage.getItem("user"));
    console.log(user);
    if (user.role == "ceo") {
      this.$emit(`update:layout`, ViewLayoutNoneSidebar);
    } else {
      this.$emit(`update:layout`, ViewLayout);
    }
  },
  data() {
    return {
      isLoading: false,
      info: {
        weekly_report: {},
      },
      quarter: [
        {
          no: "Year 2023",
        },
        {
          no: "Q1",
        },
        {
          no: "Q2",
        },
        {
          no: "Q3",
        },
        {
          no: "Q4",
        },
        {
          no: "Total",
        },
      ],
      forecast_project_list: [],
      current_project_progress_list: [],
      current_project_progress_chart: [],
    };
  },
  computed: {
    weekly_start_date() {
      return moment(this.info.weekly_report.start_date).format("ddd-MMM-DD-YY");
    },
    weekly_end_date() {
      return moment(this.info.weekly_report.end_date).format("ddd-MMM-DD-YY");
    },
    current_date() {
      return moment().format("dddd, LL, hh:mm:ss a");
    },
    current_year() {
      return moment().year();
    },
    report_message() {
      if (this.info.weekly_report.report_message) {
        var htmlString = this.info.weekly_report.report_message;
        return htmlString.replace(/\\/g, "");
      } else return this.$store.state.inAppMessage.noData;
    },
    forecast_revenue_total() {
      var list = this.forecast_project_list;
      var sum = 0;
      for (var i = 0; i < list.length; i++) {
        sum += list[i].project_value;
      }
      return (sum / 1000000).toFixed(2);
    },
  },

  methods: {
    FETCH_INFO() {
      this.isLoading = true;
      axios({
        method: "get",
        url: "weekly-report/get-last-weekly-report",
        headers: {
          Authorization: "Bearer " + JSON.parse(localStorage.getItem("token")),
        },
      })
        .then((res) => {
          // console.log(res);
          if (res.data) {
            this.info.weekly_report = res.data[0];
          }
        })
        .catch((error) => {
          this.$ons.notification.alert(
            error.code + " " + error.response.status + " " + error.message
          );
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
    FETCH_DATA_PROJECT_FORECAST() {
      this.isLoading = true;
      axios({
        method: "get",
        url: "/forecast-sales/forecast-sales-list",
        headers: {
          Authorization: "Bearer " + JSON.parse(localStorage.getItem("token")),
        },
      })
        .then((res) => {
          // console.log(res);
          if (res.data) {
            this.forecast_project_list = res.data;
          }
        })
        .catch((error) => {
          this.$ons.notification.alert(
            error.code + " " + error.response.status + " " + error.message
          );
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
    FETCH_DATA_PROJECT_PROGRESS() {
      this.isLoading = true;
      axios({
        method: "get",
        url: "/current-sales/project-current-sales-progress",
        headers: {
          Authorization: "Bearer " + JSON.parse(localStorage.getItem("token")),
        },
      })
        .then((res) => {
          // console.log(res);
          if (res.data) {
            this.current_project_progress_chart = res.data;
          }
        })
        .catch((error) => {
          this.$ons.notification.alert(
            error.code + " " + error.response.status + " " + error.message
          );
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
    PROJECT_PROGRESS_PERCENT(cellInfo) {
      return cellInfo.value.toFixed(2);
    },
    FORECAST_CONFIDENCE_LEVEL(cellInfo) {
      return cellInfo.value.toFixed(0);
    },
    FORECAST_REVENUE(cellInfo) {
      return (cellInfo.value / 1000000).toFixed(2);
    },
    STATUS_PROJECT_CUMULATIVE(e) {
      if (e.rowType === "data" && e.column.dataField === "status_cumulative") {
        e.cellElement.style.background =
          e.data.status_cumulative == "On plan"
            ? "#ccffcc"
            : e.data.status_cumulative == "Over plan"
            ? "#66ff99"
            : e.data.status_cumulative == "Lower plan"
            ? "#ffff00"
            : e.data.status_cumulative == "Done"
            ? "#00cc00"
            : "";
      }
    },
  },
  mounted() {},
};
</script>

<style lang="scss" scoped>
@import "@/style/main.scss";
* {
  font-family: "Play", "Noto Sans Thai" !important;
}
.pm-page {
  overflow-y: scroll;
  overflow-x: hidden;
  height: 100%;
  // background-color: rgb(202, 202, 202);
  .pm-page-container {
    .page-header {
      height: 220px;
      display: flex;
      justify-content: center;
      align-items: flex-start;
      flex-direction: column;
      background-image: url("/public/img/main-bg.png");
      background-size: cover;
      background-position: center;
      background-repeat: no-repeat;
      position: relative;
      padding: 0 20px;
      h1,
      div {
        margin: 0;
        text-align: left;
        color: #fff;
        font-style: normal;
        width: -webkit-fill-available;
        font-family: "Play", "Noto Sans Thai" !important;
        width: 1280px;
        max-width: 1600px;

        @media screen and (max-width: 1600px) {
          width: 100%;
        }
      }
      h1,
      div {
        margin: 0 auto;
      }
      h1 {
        font-size: 26px;
        font-weight: 600;
        text-transform: uppercase;
        margin-bottom: 10px;
      }
      div {
        margin-bottom: 6px;
        display: grid;
        grid-template-columns: 150px auto;
        label {
          font-size: 16px;
          text-align: left;
          font-weight: 300;
          font-family: "Play", "Noto Sans Thai" !important;
          text-transform: uppercase;
        }
      }
    }
    .page-content {
      height: fit-content;
      display: flex;
      justify-content: center;
      align-content: center;
      .page-report {
        width: 1280px;
        // background-color: #fff;
        margin: 0 auto;

        @media screen and (max-width: 1920px) {
          width: 1280px;
        }
        @media screen and (max-width: 1600px) {
          width: calc(100% - 40px);
          padding: 0 20px;
        }

        .report-detail {
          display: flex;
          justify-content: center;
          align-items: flex-start;
          flex-direction: column;
          label {
            font-size: 14px;
          }
        }
        .report-item {
          margin-top: 40px;
          h2 {
            margin: 0;
            font-size: 20px;
            font-style: normal;
            text-transform: uppercase;
            font-family: "Play", "Noto Sans Thai" !important;
          }
          .report-item-card {
            background-color: #fff;
            padding: 10px 20px 20px 20px;
            margin-top: 20px;
            margin-bottom: 60px;
            box-shadow: 0 4px 12px -2px rgb(107 117 161 / 16%);
            border-radius: 6px;
            min-height: 200px;
            height: fit-content;
          }
        }
      }
    }
  }
}

.update-label {
  font-size: 12px;
  color: $web-font-color-grey;
  padding-bottom: 60px;
}

.report-message-display {
  min-height: 200px;
  font-size: 16px;
  font-family: "Calibri";
  // background-color: #f7f7f7;
  padding: 0 10px;
  // border: 1px solid #e8e8e8;
  border-radius: 3px;
  div {
    width: 100%;
    img {
      max-width: 100%;
      width: 100%;
    }
  }
}

.chart-wrapper-grid {
  border: 0px;
}
</style>