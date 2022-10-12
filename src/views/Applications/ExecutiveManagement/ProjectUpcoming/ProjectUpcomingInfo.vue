<template>
  <div class="pm-page">
    <div class="pm-toolbar">
      <toolbar
        :pageSubName="info.project_name"
        :isBack="true"
        :isEdit="true"
        :isDelete="true"
        :isPrint="false"
        :isDownload="isShowDownloadBtn"
        @isDeleteBtn="DELETE_PROJECT()"
        @isEditBtn="TOGGLE_POPUP()"
        @isDownloadBtn="DOWNLOAD_PDF()"
        @refreshInfo="FETCH_INFO()"
      />
    </div>
    <div class="pm-page-container">
      <div class="pm-project-info-sidebar form">
        <p class="pm-section-label">Project Informations</p>
        <div class="form-item-container">
          <div class="input-set">
            <p class="label">Project Name:</p>
            <p class="info">
              {{ info.project_name }}
            </p>
          </div>
          <div class="input-set">
            <p class="label">Client Name:</p>
            <p class="info">
              {{ info.client_name }}
            </p>
          </div>
          <div class="input-set">
            <p class="label">Service Type:</p>
            <p class="info">
              {{ info.service_type_desc }}
            </p>
          </div>
          <div class="input-set">
            <p class="label">Confident Level (%):</p>
            <p class="info">
              {{ info.confident_level }}
            </p>
          </div>
          <div class="input-set">
            <p class="label">Forecast Value (MB):</p>
            <p class="info">
              {{ info.project_value }}
            </p>
          </div>
          <div class="input-set">
            <p class="label">Forecast:</p>
            <p class="info">
              {{ info.is_forecast }}
            </p>
          </div>
          <div class="input-set">
            <p class="label">Description:</p>
            <p class="info">
              {{ info.project_desc }}
            </p>
          </div>
          <div class="input-set">
            <p class="label">Priority:</p>
            <p class="info">
              {{ info.priority_no }}
            </p>
          </div>
          <div class="input-set">
            <p class="label">Submission Date:</p>
            <p class="info">
              {{ info.submission_date }}
            </p>
          </div>
          <div class="input-set">
            <p class="label">Expired Date:</p>
            <p class="info">
              {{ info.expired_date }}
            </p>
          </div>
          <div class="input-set">
            <p class="label">Remark:</p>
            <p class="info">
              {{ info.remark }}
            </p>
          </div>
          <!-- <div class="input-set">
            <p class="label">Job Confirm by Client Date:</p>
            <p class="info">
              {{ jobConfirmDate }}
            </p>
          </div> -->

          <!-- <p class="pm-section-label">Client Contact</p> -->

          <!-- <div class="input-set">
            <p class="label">Client Name:</p>
            <p class="info">
              {{ info.client_name }}
            </p>
          </div> -->
          <!-- <div class="input-set">
            <p class="label">Contact Name:</p>
            <p class="info">
              {{ info.client_contact_name }}
            </p>
          </div>
          <div class="input-set">
            <p class="label">Phone:</p>
            <p class="info">
              {{ info.client_contact_phone_no }}
            </p>
          </div>
          <div class="input-set">
            <p class="label">Email:</p>
            <p class="info">
              {{ info.client_contact_email }}
            </p>
          </div> -->
        </div>
      </div>
      <div class="tab-wrapper">
        <vue-tabs-chrome v-model="tabCurrent" :tabs="tabs" />
      </div>
      <div class="page-content" v-if="this.tabCurrent == 'progress'">
        <DxDataGrid
          id="project-manager-project-list"
          key-expr="id_upcoming_project_plan"
          :data-source="progressList"
          :selection="{ mode: 'single' }"
          :hover-state-enabled="true"
          :allow-column-reordering="true"
          :show-borders="true"
          :show-row-lines="false"
          :row-alternation-enabled="true"
          @row-inserted="CREATE_PLAN"
          @row-updated="UPDATE_PLAN"
          @row-removed="DELETE_PLAN"
        >
          <DxEditing
            :allow-updating="true"
            :allow-deleting="true"
            :allow-adding="true"
            mode="row"
          />
          <DxColumn data-field="quarter_no" :width="100" caption="Quarter" />
          <DxColumn data-field="quarter_year" :width="120" caption="Year" />
          <DxColumn
            data-field="value_by_q"
            caption="Value (Baht/Quarter)"
            :allow-editing="false"
            format="#,##0.00"
          />
          <!-- Configuration goes here -->
          <!-- <DxFilterRow :visible="true" /> -->
          <DxScrolling mode="standard" />
          <DxSearchPanel :visible="true" />
          <!-- <DxExport :enabled="true" /> -->
        </DxDataGrid>
      </div>
      <div class="page-content" v-if="this.tabCurrent == 'file'">
        <UnderDevelopment />
      </div>
    </div>
    <popupEdit
      v-if="isEdit == true"
      @closePopup="TOGGLE_POPUP()"
      @refreshInfo="FETCH_INFO()"
      :editInfo="info"
    />
  </div>
</template>

<script>
//DxDataGrid
import "devextreme/dist/css/dx.light.css";
// import { Workbook } from "exceljs";
// import saveAs from "file-saver";
// import { exportDataGrid } from "devextreme/excel_exporter";
import {
  DxDataGrid,
  DxSearchPanel,
  // DxPaging,
  // DxPager,
  DxScrolling,
  DxColumn,
  DxEditing,
  // DxExport,
} from "devextreme-vue/data-grid";

//Components
import toolbar from "@/components/app-structures/app-toolbar.vue";
import popupEdit from "@/views/Applications/ExecutiveManagement/ProjectUpcoming/project-edit.vue";
import VueTabsChrome from "vue-tabs-chrome";
import UnderDevelopment from "@/components/unavailable-feature.vue";

//API
import axios from "/axios.js";
import moment from "moment";
export default {
  name: "ViewProjectInfo",
  components: {
    DxDataGrid,
    DxSearchPanel,
    // DxPaging,
    // DxPager,
    DxScrolling,
    DxColumn,
    DxEditing,
    // DxExport,
    toolbar,
    popupEdit,
    VueTabsChrome,
    UnderDevelopment,
  },
  created() {
    if (this.$store.state.status.server == true) {
      this.FETCH_INFO();
      this.FETCH_INFO_PLAN();
    }
  },
  data() {
    return {
      info: {},
      isEdit: false,
      page: 1,
      numPages: 0,
      pdfdata: undefined,
      fileUpload: "",
      tabCurrent: "progress",
      tabs: [
        {
          label: "Project Plan",
          key: "progress",
          closable: false,
        },
        {
          label: "Attached Files",
          key: "file",
          closable: false,
        },
      ],
      progressList: {},
    };
  },
  methods: {
    FETCH_INFO() {
      const id_project = this.$route.params;
      if (id_project) {
        axios({
          method: "post",
          url: "forecast-sales/forecast-sales-by-id",
          headers: {
            Authorization:
              "Bearer " + JSON.parse(localStorage.getItem("token")),
          },
          data: id_project,
        })
          .then((res) => {
            console.log(res);

            if (res.status == 200 && res.data[0]) {
              this.info = res.data[0];
              // this.GET_PDF();
              // this.FETCH_INFO_PROGRESS();
            }
          })
          .catch((error) => {
            this.$ons.notification.alert(
              error.code + " " + error.response.status + " " + error.message
            );
          })
          .finally(() => {});
      }
    },
    FETCH_INFO_PLAN() {
      const id = this.$route.params;
      console.log(id);
      if (id) {
        axios({
          method: "post",
          url: "/forecast-sales/forecast-plan-by-id",
          headers: {
            Authorization:
              "Bearer " + JSON.parse(localStorage.getItem("token")),
          },
          data: id,
        })
          .then((res) => {
            console.log("plan");
            console.log(res.data);
            if (res.status == 200 && res.data) {
              this.progressList = res.data;
            }
          })
          .catch((error) => {
            this.$ons.notification.alert(
              error.code + " " + error.response.status + " " + error.message
            );
          })
          .finally(() => {});
      }
    },
    DELETE_PROJECT() {
      const id_project = this.$route.params;
      this.$ons.notification.confirm("Confirm delete?").then((res) => {
        if (res == 1) {
          axios({
            method: "delete",
            url: "/forecast-sales/forecast-sales-delete",
            headers: {
              Authorization:
                "Bearer " + JSON.parse(localStorage.getItem("token")),
            },
            data: id_project,
          })
            .then((res) => {
              if (res.status == 200) {
                this.$ons.notification.alert("Project delete successful");
                this.$router.go(-1);
              }
            })
            .catch((error) => {
              this.$ons.notification.alert(
                error.code + " " + error.response.status + " " + error.message
              );
            })
            .finally(() => {});
        }
      });
    },
    TOGGLE_POPUP() {
      this.isEdit = !this.isEdit;
    },
    CREATE_PLAN(e) {
      e.data.id_upcoming_project = this.$route.params.id_upcoming_project;
      console.log(e.data);
      axios({
        method: "post",
        url: "/forecast-sales/forecast-plan-add",
        headers: {
          Authorization: "Bearer " + JSON.parse(localStorage.getItem("token")),
        },
        data: e.data,
      })
        .then((res) => {
          if (res.status == 200) {
            console.log("ok");
            this.FETCH_INFO_PLAN();
          }
        })
        .catch((error) => {
          this.$ons.notification.alert(
            error.code + " " + error.response.status + " " + error.message
          );
        })
        .finally(() => {});
    },
    UPDATE_PLAN(e) {
      e.data.id_upcoming_project = this.$route.params.id_upcoming_project;
      console.log(e.data);

      axios({
        method: "put",
        url: "/forecast-sales/forecast-plan-edit",
        headers: {
          Authorization: "Bearer " + JSON.parse(localStorage.getItem("token")),
        },
        data: e.data,
      })
        .then((res) => {
          if (res.status == 200) {
            console.log("ok");
            this.FETCH_INFO_PLAN();
          }
        })
        .catch((error) => {
          this.$ons.notification.alert(
            error.code + " " + error.response.status + " " + error.message
          );
        })
        .finally(() => {});
    },
    DELETE_PLAN(e) {
      console.log(e.data);
      axios({
        method: "delete",
        url: "/forecast-sales/forecast-plan-delete",
        headers: {
          Authorization: "Bearer " + JSON.parse(localStorage.getItem("token")),
        },
        data: e.data,
      })
        .then((res) => {
          if (res.status == 200) {
            console.log("ok");
            this.FETCH_INFO_PLAN();
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
  computed: {
    isShowDownloadBtn() {
      if (this.info.pdf_path) return true;
      return false;
    },
    jobConfirmDate() {
      if (this.info.job_confirm_date)
        return moment(this.info.job_confirm_date).format("LL");
      else return "N/A";
    },
    baseURL() {
      var mode = this.$store.state.mode;
      if (mode == "dev") return this.$store.state.modeURL.dev;
      else if (mode == "prod") return this.$store.state.modeURL.prod;
      else return console.log("develpment mode set up incorrect.");
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
  width: 100%;
  height: calc(100vh - 78px);
  display: grid;
  grid-template-rows: 61px calc(100vh - 61px);

  .pm-page-container {
    background-color: #d9d9d9;
    display: grid;
    grid-template-columns: 360px calc(100% - 360px);
    grid-template-rows: 48px auto;
    height: calc(100% - 78px);

    @media screen and (max-width: 1024px) {
      grid-template-columns: 100%;
    }

    .page-content {
      // width: calc(100vw - 600px);
      width: 100%;
      height: calc(100vh - 139px);
      // padding: 20px;
      overflow-x: scroll;
      overflow-y: scroll;
      display: block;
      background-color: #fff;
      .render-view {
        width: 100%;
        height: 100%;
        min-height: 1130px;
        // min-width: 800px;
        -o-object-fit: contain;
        object-fit: contain;
        max-width: 800px;
        margin: 0 auto;
        margin-bottom: 20px;
        box-shadow: $web-card-shadow;
        .pdf-view {
          padding-top: 20px;
        }

        @media screen and (max-width: 1024px) {
          max-width: 90%;
        }
      }
      .render-view:last-child {
        margin-bottom: 60px;
      }
    }

    .page-content::-webkit-scrollbar {
      display: none;
    }
  }
}
h1 {
  font-size: 2em;
}

.pm-project-info-sidebar {
  width: auto;
  height: 100%;
  background: #fff;
  padding: 0 20px;
  overflow-y: scroll;
  border: 1px solid #e6e6e6;
  border-width: 0 1px 0 0px;
  grid-row: span 2;
  @media screen and (max-width: 1024px) {
    display: none;
  }

  .pm-section-label {
    font-style: normal;
    font-weight: 600;
    font-size: 1.75em;
    line-height: 16px;
    letter-spacing: -0.08px;
    color: $web-font-color-black;
    padding: 20px 0 10px 0;
    margin: 0;
    user-select: text;
  }
  .form-item-container {
    display: block;
    padding-bottom: 80px;
  }
}

.pm-project-info-sidebar::-webkit-scrollbar {
  display: none;
}

.input-set:last-child {
  margin-bottom: 40px;
}

.upload-btn-wrapper {
  width: 100%;
  height: 100%;
  background-color: #fff;
}

.dx-tabs {
  border: none;
}

.tab-wrapper {
  height: 48px;
}
.vue-tabs-chrome {
  padding-top: 10px;
  background-color: #d9d9d9;
  font-size: 14px;
}

#project-manager-project-list {
  padding: 0px 20px 80px 20px;
  height: 600px;
}

.white-gradient-bg {
  background: linear-gradient(
    180deg,
    rgba(255, 255, 255, 1) 0%,
    rgba(235, 235, 235, 1) 6%,
    rgba(217, 217, 217, 1) 100%
  );
}

#project-manager-project-list {
  padding-top: 20px;
}

.pm-project-info-sidebar .form-item-container {
  padding-bottom: 40px;
}
</style>