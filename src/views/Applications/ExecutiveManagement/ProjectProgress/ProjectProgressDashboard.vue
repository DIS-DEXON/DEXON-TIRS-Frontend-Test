<template>
  <div class="pm-page">
    <div class="pm-toolbar">
      <toolbar
        pageName="Ongoing Project Progress"
        @refreshInfo="FETCH_DATA()"
      />
    </div>
    <div class="pm-page-container">
      <div class="page-content">
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
    <contentLoading
      text="Loading, please wait..."
      v-if="isLoading == true"
      color="#fc9b21"
    />
  </div>
</template> 

<script>
import ChartProjectProgress from "@/views/Applications/ExecutiveManagement/Charts/project-progress-line.vue";

//Structures
import contentLoading from "@/components/app-structures/app-content-loading.vue";
import toolbar from "@/components/app-structures/app-toolbar.vue";

//API
import axios from "/axios.js";
import moment from "moment";

export default {
  name: "ViewProjectProgress",
  components: {
    toolbar,
    contentLoading,
    ChartProjectProgress,
  },
  created() {
    this.$store.commit("UPDATE_CURRENT_INAPP", {
      name: "Project Progress",
      icon: "/img/icon_menu/executive_management/progress.png",
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
      current_project_progress_chart: [],
    };
  },
  mounted() {},
  methods: {
    FETCH_DATA() {
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
  grid-template-columns: repeat(3, 33.33%);
  .chart-wrapper {
    margin-bottom: 0px;
  }
}

.page-content > div:first-child > .project-progress-wrapper {
  margin-top: 0px;
}
</style>