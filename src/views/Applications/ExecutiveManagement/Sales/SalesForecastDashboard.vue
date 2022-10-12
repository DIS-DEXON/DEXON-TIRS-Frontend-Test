<template>
  <div class="pm-page">
    <div class="pm-toolbar">
      <toolbar pageName="Forecast Revenue" @refreshInfo="FETCH_DATA()" />
    </div>
    <div class="pm-page-container">
      <div class="page-content">
        <YearSetCurrent />
        <div class="chart-wrapper-grid">
          <div class="chart-wrapper" style="grid-column: span 2">
            <ChartForecastSalesBar />
            <div class="figure-label">
              THE SUMMARY OF FORECAST REVENUE IN 2023
            </div>
          </div>
          <div class="chart-wrapper" style="grid-column: span 2">
            <ChartForecastSalesPie />
            <div class="figure-label">
              THE TOTAL FORECAST OF REVENUE BY SERVICE TYPE IN 2023
            </div>
          </div>
        </div>
      </div>
    </div>
    <popupAdd v-if="isAdd == true" @closePopup="TOGGLE_POPUP()" />
    <contentLoading
      text="Loading, please wait..."
      v-if="isLoading == true"
      color="#fc9b21"
    />
  </div>
</template> 

<script>
//Year Set
import YearSetCurrent from "@/views/Applications/ExecutiveManagement/YearSet/forecast-sales.vue";

//Chart
import ChartForecastSalesPie from "@/views/Applications/ExecutiveManagement/Charts/forecast-sales-pie.vue";
import ChartForecastSalesBar from "@/views/Applications/ExecutiveManagement/Charts/forecast-sales-bar.vue";

//Structures
import contentLoading from "@/components/app-structures/app-content-loading.vue";
import toolbar from "@/components/app-structures/app-toolbar.vue";

//API
// import axios from "/axios.js";
import moment from "moment";

export default {
  name: "ViewForecastSales",
  components: {
    toolbar,
    contentLoading,
    YearSetCurrent,
    ChartForecastSalesPie,
    ChartForecastSalesBar,
  },
  created() {
    this.$store.commit("UPDATE_CURRENT_INAPP", {
      name: "Forecast Sales",
      icon: "/img/icon_menu/executive_management/forecast-sale.png",
    });
    if (this.$store.state.status.server == true) this.FETCH_DATA();
  },
  computed: {
    report_date() {
      return moment(this.currentViewRow.report_date).format("dddd, LL");
    },
  },
  data() {
    return {
      isAdd: false,
      isEdit: false,
      isLoading: false,
    };
  },
  mounted() {},
  methods: {
    FETCH_DATA() {},
  },
};
</script>

<style lang="scss" scoped>
@import "@/style/main.scss";
.pm-page {
  border: 1px solid #e6e6e6;
  border-width: 0 0 0 1px;
  background-color: #ffffff;
  height: 100%;

  .pm-page-container {
    background-color: #ffffff;
    height: calc(100vh - 139px);
    display: flex;
    overflow-y: scroll;

    .page-content {
      width: 100%;
      height: fit-content;
      margin: 0 auto;
      padding: 20px;
    }

    .page-info {
      width: auto;
    }
  }
}
.chart-wrapper-grid {
  grid-template-columns: 100%;
  .chart-wrapper {
    margin-bottom: 0px;
  }
}
</style>