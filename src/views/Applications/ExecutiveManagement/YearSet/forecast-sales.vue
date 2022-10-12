<template>
  <div>
    <div class="card-set-year fix-six">
      <div
        class="card-item-month monthlabel"
        v-for="item in quarter"
        :key="item.no"
      >
        <p>{{ item.no }}</p>
      </div>
    </div>
    <div class="card-set-year fix-six">
      <div class="card-item-month table-td">
        <p>FORECAST REVENUE</p>
      </div>
      <div
        class="card-item-month actual"
        v-for="item in ForecastSalesYearSetData"
        :key="item.quarter_no"
      >
        <p class="label-value">{{ (item.y / 1000000).toFixed(2) }}</p>
        <p class="label-currency">MB</p>
      </div>
      <div class="card-item-month table-td">
        <p class="label-value">
          {{ (total_plan / 1000000).toFixed(2) }}
        </p>
        <p class="label-currency">MB</p>
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment";
import axios from "/axios.js";

export default {
  name: "yearset-forecast-sales",
  created() {
    this.FETCH_PLAN();
    // this.FETCH_ACTUAL();
  },
  data() {
    return {
      quarter: [
        {
          no: "YEAR 2023",
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
          no: "TOTAL",
        },
      ],
      ForecastSalesYearSetData: [],
    };
  },
  methods: {
    FETCH_PLAN() {
      axios({
        method: "post",
        url: "forecast-sales/forecast-sales-sumbyquarter",
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
            this.ForecastSalesYearSetData = res.data;
          }
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {});
    },
  },
  computed: {
    total_plan() {
      if (this.ForecastSalesYearSetData.length > 0) {
        var sum = 0;
        for (var i = 0; i < this.ForecastSalesYearSetData.length; i++) {
          sum = sum + this.ForecastSalesYearSetData[i].y;
        }
        return sum;
      } else return 0;
    },
  },
};
</script>

<style lang="scss" scoped>
.chart-item {
  min-height: 200px;
}
.fix-six {
  grid-template-columns: repeat(6, 16.66%);
}
* {
  font-family: "Play", "Noto Sans Thai" !important;
}
</style>