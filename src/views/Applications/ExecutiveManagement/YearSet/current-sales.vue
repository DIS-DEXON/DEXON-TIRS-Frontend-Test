<template>
  <div>
    <div class="card-set-year">
      <div
        class="card-item-month monthlabel"
        v-for="item in months"
        :key="item.month"
      >
        <p>{{ item.month }}</p>
      </div>
    </div>
    <div class="card-set-year">
      <div class="card-item-month table-td">
        <p>TARGET</p>
      </div>
      <div
        class="card-item-month plan"
        v-for="item in CurrentSalesYearSetData.plan"
        :key="item.month"
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
    <div class="card-set-year">
      <div class="card-item-month table-td">
        <p>ACTUAL</p>
      </div>
      <div
        class="card-item-month actual"
        v-for="item in CurrentSalesYearSetData.actual"
        :key="item.month"
      >
        <p class="label-value">{{ (item.y / 1000000).toFixed(2) }}</p>
        <p class="label-currency">MB</p>
      </div>
      <div class="card-item-month table-td">
        <p class="label-value">
          {{ (total_actual / 1000000).toFixed(2) }}
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
  name: "yearset-current-sales",
  created() {
    this.FETCH_PLAN();
    // this.FETCH_ACTUAL();
  },
  data() {
    return {
      months: [
        {
          month: "YEAR 2022",
        },
        {
          month: "Jan",
        },
        {
          month: "Feb",
        },
        {
          month: "Mar",
        },
        {
          month: "Apr",
        },
        {
          month: "May",
        },
        {
          month: "Jun",
        },
        {
          month: "Jul",
        },
        {
          month: "Aug",
        },
        {
          month: "Sep",
        },
        {
          month: "Oct",
        },
        {
          month: "Nov",
        },
        {
          month: "Dec",
        },
        {
          month: "TOTAL",
        },
      ],
      CurrentSalesYearSetData: {
        plan: [
          {
            month_no: 1,
            y: 1666666,
          },
          {
            month_no: 2,
            y: 1666666,
          },
          {
            month_no: 3,
            y: 1666666,
          },
          {
            month_no: 4,
            y: 1666666,
          },
          {
            month_no: 5,
            y: 1666666,
          },
          {
            month_no: 6,
            y: 1666666,
          },
          {
            month_no: 7,
            y: 1666666,
          },
          {
            month_no: 8,
            y: 1666666,
          },
          {
            month_no: 9,
            y: 1666666,
          },
          {
            month_no: 10,
            y: 1666666,
          },
          {
            month_no: 11,
            y: 1666666,
          },
          {
            month_no: 12,
            y: 1666666,
          },
        ],
        actual: [],
      },
    };
  },
  methods: {
    FETCH_PLAN() {
      axios({
        method: "post",
        url: "current-sales/current-sales-sumbyyear",
        headers: {
          Authorization: "Bearer " + JSON.parse(localStorage.getItem("token")),
        },
        data: {
          year_no: moment().year(),
        },
      })
        .then((res) => {
          // console.log(res);
          if (res.data) {
            this.CurrentSalesYearSetData.actual = res.data;
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
      if (this.CurrentSalesYearSetData.plan.length > 0) {
        var sum = 0;
        for (var i = 0; i < this.CurrentSalesYearSetData.plan.length; i++) {
          sum = sum + this.CurrentSalesYearSetData.plan[i].y;
        }
        return sum;
      } else return 0;
    },
    total_actual() {
      if (this.CurrentSalesYearSetData.actual.length > 0) {
        var sum = 0;
        for (var i = 0; i < this.CurrentSalesYearSetData.actual.length; i++) {
          sum = sum + this.CurrentSalesYearSetData.actual[i].y;
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
* {
  font-family: "Play", "Noto Sans Thai" !important;
}
</style>