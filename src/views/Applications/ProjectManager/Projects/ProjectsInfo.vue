<template>
  <div class="pm-page">
    <div class="pm-toolbar">
      <toolbar
        :pageSubName="info.project_no + ' - ' + info.project_name"
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
            <p class="label">Project Number:</p>
            <p class="info">
              {{ info.project_no }}
            </p>
          </div>
          <div class="input-set">
            <p class="label">Project Name:</p>
            <p class="info">
              {{ info.project_name }}
            </p>
          </div>
          <div class="input-set">
            <p class="label">Purchase Order Number:</p>
            <p class="info">
              {{ info.po_no }}
            </p>
          </div>
          <div class="input-set">
            <p class="label">Quotation Number:</p>
            <p class="info">
              {{ info.quotation_no }}
            </p>
          </div>
          <div class="input-set">
            <p class="label">Job Type:</p>
            <p class="info">
              {{ info.job_type }}
            </p>
          </div>
          <div class="input-set">
            <p class="label">Service Type:</p>
            <p class="info">
              {{ info.service_type_desc }}
            </p>
          </div>
          <div class="input-set">
            <p class="label">Project Value (Baht):</p>
            <p class="info">
              {{
                info.project_value
                  .toFixed(2)
                  .replace(/\d(?=(\d{3})+\.)/g, "$&,")
              }}
            </p>
          </div>
          <div class="input-set">
            <p class="label">Start Date:</p>
            <p class="info">
              {{ jobStartDate }}
            </p>
          </div>
          <div class="input-set">
            <p class="label">End Date:</p>
            <p class="info">
              {{ jobEndDate }}
            </p>
          </div>

          <p class="pm-section-label">Client Contact</p>

          <div class="input-set">
            <p class="label">Client Name:</p>
            <p class="info">
              {{ info.client_name }}
            </p>
          </div>
          <div class="input-set">
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
          </div>
        </div>
      </div>
      <div class="tab-wrapper">
        <vue-tabs-chrome v-model="tabCurrent" :tabs="tabs" />
      </div>
      <div class="page-content" v-if="this.tabCurrent == 'progress'">
        <ChartProjectProgress
          :info="progressChart"
          v-if="this.progressChart"
          :key="this.progressChart"
        />
        <DxDataGrid
          id="project-manager-project-list"
          key-expr="id_current_sales"
          :data-source="progressList"
          :selection="{ mode: 'single' }"
          :hover-state-enabled="true"
          :allow-column-reordering="true"
          :show-borders="true"
          :show-row-lines="false"
          :row-alternation-enabled="true"
          @row-inserted="CREATE_PROGRESS"
          @row-updated="UPDATE_PROGRESS"
          @row-removed="DELETE_PROGRESS"
        >
          <DxEditing
            :allow-updating="true"
            :allow-deleting="true"
            :allow-adding="true"
            mode="row"
          />
          <!-- <DxColumn
            data-field="id_month"
            :width="100"
            caption="id_month">  
            <DxLookup
              :data-source="masterMonth"
              display-expr="month_decs"
              value-expr="id_month"
            />
          </DxColumn> -->
          <DxColumn data-field="month_no" :width="100" caption="Month">
            <DxRequiredRule />
          </DxColumn>
          <DxColumn data-field="year_no" :width="120" caption="Year">
            <DxRequiredRule />
          </DxColumn>
          <DxColumn data-field="plan_progress" caption="Plan (%)">
            <DxRequiredRule />
          </DxColumn>
          <DxColumn
            data-field="plan_cumulative"
            caption="Plan Cumulative (%)"
            :allow-editing="false"
          />
          <DxColumn data-field="actual_progress" caption="Actual Progress (%)">
            <DxRequiredRule />
          </DxColumn>
          <DxColumn
            data-field="actual_cumulative"
            caption="Actual Cumulative (%)"
            :allow-editing="false"
          />
          <DxColumn
            data-field="value_by_month"
            caption="Value (Baht/Month)"
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
      <div
        class="page-content white-gradient-bg"
        v-if="this.tabCurrent == 'pdf'"
      >
        <div class="upload-btn-wrapper" v-if="!this.info.pdf_path">
          <input
            type="file"
            id="pdf-upload-btn"
            style="display: none"
            ref="file"
            @change="UPLOAD_FILE()"
          />
          <v-ons-toolbar-button v-if="!this.info.pdf_path">
            <label for="pdf-upload-btn"
              ><i class="las la-plus"></i>Add PDF file</label
            >
          </v-ons-toolbar-button>
          <v-ons-toolbar-button
            class="btn-delete"
            v-if="this.info.pdf_path"
            v-on:click="DELETE_PDF()"
          >
            <i class="las la-trash"></i>
          </v-ons-toolbar-button>
        </div>
        <div class="render-view" v-if="numPages >= 1">
          <pdf
            :src="pdfdata"
            :page="1"
            style="width: 100%; margin: 20px auto"
            :annotation="true"
            :resize="true"
          >
          </pdf>
        </div>
        <div class="render-view" v-if="numPages >= 2">
          <pdf
            :src="pdfdata"
            :page="2"
            style="width: 100%; margin: 20px auto"
            :annotation="true"
            :resize="true"
          >
          </pdf>
        </div>
        <div class="render-view" v-if="numPages >= 3">
          <pdf
            :src="pdfdata"
            :page="3"
            style="width: 100%; margin: 20px auto"
            :annotation="true"
            :resize="true"
          >
          </pdf>
        </div>
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
  DxRequiredRule,
  // DxLookup,
  // DxExport,
} from "devextreme-vue/data-grid";

//Components
import ChartProjectProgress from "@/views/Applications/ExecutiveManagement/Charts/project-progress-line-nodetail.vue";
import toolbar from "@/components/app-structures/app-toolbar.vue";
import popupEdit from "@/views/Applications/ProjectManager/Projects/project-edit.vue";
import VueTabsChrome from "vue-tabs-chrome";
import pdfvuer from "pdfvuer";
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
    DxRequiredRule,
    // DxLookup,
    // DxExport,
    toolbar,
    popupEdit,
    pdf: pdfvuer,
    VueTabsChrome,
    ChartProjectProgress,
    UnderDevelopment,
  },
  created() {
    if (this.$store.state.status.server == true) {
      this.GET_MONTH();
      this.FETCH_INFO();
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
          label: "Project Progress",
          key: "progress",
          closable: false,
        },
        {
          label: "Information Sheet (PDF)",
          key: "pdf",
          closable: false,
        },
        {
          label: "Attached Files",
          key: "file",
          closable: false,
        },
      ],
      masterMonth: [],
      progressChart: {},
      progressList: {},
    };
  },
  methods: {
    FETCH_INFO() {
      const id_project = this.$route.params;
      if (id_project) {
        axios({
          method: "post",
          url: "/project-manager/project-info",
          headers: {
            Authorization:
              "Bearer " + JSON.parse(localStorage.getItem("token")),
          },
          data: id_project,
        })
          .then((res) => {
            // console.log(res);

            if (res.status == 200 && res.data[0]) {
              this.info = res.data[0];
              this.GET_PDF();
              this.FETCH_INFO_PROGRESS();
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
    FETCH_INFO_PROGRESS() {
      const id = this.$route.params;
      if (id) {
        axios({
          method: "post",
          url: "/current-sales/project-current-sales-progress-byid",
          headers: {
            Authorization:
              "Bearer " + JSON.parse(localStorage.getItem("token")),
          },
          data: { project_id: id.id_project },
        })
          .then((res) => {
            // console.log(res);

            if (res.status == 200 && res.data[0]) {
              this.progressChart = res.data[0];
              this.progressList = this.progressChart.progress_by_month;
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
    GET_MONTH() {
      axios({
        method: "get",
        url: "/global/master-month-quarter",
        headers: {
          Authorization: "Bearer " + JSON.parse(localStorage.getItem("token")),
        },
      })
        .then((res) => {
          // console.log(res.data);
          this.masterMonth = res.data;
        })
        .catch((error) => {
          this.$ons.notification.alert(
            error.code + " " + error.response.status + " " + error.message
          );
        })
        .finally(() => {});
    },
    GET_PDF() {
      // console.log(axios);
      if (this.info.pdf_path != null) {
        var self = this;
        var pdfPath = this.info.pdf_path;
        self.pdfdata = pdfvuer.createLoadingTask(this.baseURL + pdfPath);
        self.pdfdata.then((pdf) => {
          self.numPages = pdf.numPages;
          // console.log("pdf page count: " + self.numPages);
        });
      }
    },
    UPLOAD_FILE() {
      this.fileUpload = this.$refs.file.files[0];
      // console.log(this.fileUpload);
      if (this.fileUpload && this.fileUpload.type == "application/pdf") {
        if (this.fileUpload.size < 20000000) {
          axios({
            method: "post",
            url: "/project-manager/project-upload-pdf",
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization:
                "Bearer " + JSON.parse(localStorage.getItem("token")),
            },
            data: {
              id_project: this.info.id_project,
              file: this.fileUpload,
            },
          })
            .then((res) => {
              if (res.status == 200) {
                this.FETCH_INFO();
              }
            })
            .catch((error) => {
              this.$ons.notification.alert(
                error.code + " " + error.response.status + " " + error.message
              );
            })
            .finally(() => {});
        } else {
          this.$ons.notification.alert("File size too large. (20 MB max)");
          const file = document.getElementById("pdf-upload-btn");
          file.val = "";
        }
      } else {
        this.$ons.notification.alert(
          "Incorrect filetype. <br/> Only PDF file can be uploaded."
        );
        const file = document.getElementById("pdf-upload-btn");
        file.val = "";
      }
    },
    DELETE_PDF() {
      this.$ons.notification.confirm("Confirm delete PDF file?").then((res) => {
        if (res == 1) {
          if (this.info.id_pdf) {
            axios({
              method: "delete",
              url: "/project-manager/project-delete-pdf",
              headers: {
                Authorization:
                  "Bearer " + JSON.parse(localStorage.getItem("token")),
              },
              data: {
                id_project: this.info.id_project,
                id_pdf: this.info.id_pdf,
              },
            })
              .then((res) => {
                if (res.status == 200) {
                  this.FETCH_INFO();
                }
              })
              .catch((error) => {
                this.$ons.notification.alert(
                  error.code + " " + error.response.status + " " + error.message
                );
              })
              .finally(() => {});
          }
        }
      });
    },
    DOWNLOAD_PDF() {
      this.$ons.notification
        .confirm(
          "You are downloading project information sheet of project no: " +
            this.info.project_no
        )
        .then((res) => {
          if (res == 1) {
            const link = document.createElement("a");
            link.href = this.info.pdf_path;
            link.download =
              "project_information_" + this.info.project_no + ".pdf";
            link.click();
          }
        });
    },
    DELETE_PROJECT() {
      const id_project = this.$route.params;
      this.$ons.notification.confirm("Confirm delete?").then((res) => {
        if (res == 1) {
          axios({
            method: "delete",
            url: "/project-manager/project-delete",
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
    CREATE_PROGRESS(e) {
      e.data.id_project = this.$route.params.id_project;
      // console.log(e.data);
      axios({
        method: "post",
        url: "/current-sales/current-sales-add",
        headers: {
          Authorization: "Bearer " + JSON.parse(localStorage.getItem("token")),
        },
        data: e.data,
      })
        .then((res) => {
          if (res.status == 200) {
            // console.log("ok");
            this.FETCH_INFO_PROGRESS();
          }
        })
        .catch((error) => {
          this.$ons.notification.alert(
            error.code + " " + error.response.status + " " + error.message
          );
        })
        .finally(() => {});
    },
    UPDATE_PROGRESS(e) {
      e.data.id_project = this.$route.params.id_project;
      // console.log(e.data);
      axios({
        method: "put",
        url: "/current-sales/current-sales-edit",
        headers: {
          Authorization: "Bearer " + JSON.parse(localStorage.getItem("token")),
        },
        data: e.data,
      })
        .then((res) => {
          if (res.status == 200) {
            // console.log("ok");
            this.FETCH_INFO_PROGRESS();
          }
        })
        .catch((error) => {
          this.$ons.notification.alert(
            error.code + " " + error.response.status + " " + error.message
          );
        })
        .finally(() => {});
    },
    DELETE_PROGRESS(e) {
      // console.log(e.data);
      axios({
        method: "delete",
        url: "/current-sales/current-sales-delete",
        headers: {
          Authorization: "Bearer " + JSON.parse(localStorage.getItem("token")),
        },
        data: e.data,
      })
        .then((res) => {
          if (res.status == 200) {
            // console.log("ok");
            this.FETCH_INFO_PROGRESS();
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
    jobStartDate() {
      if (this.info.job_start_date)
        return moment(this.info.job_start_date).format("LL");
      else return "N/A";
    },
    jobEndDate() {
      if (this.info.job_end_date)
        return moment(this.info.job_end_date).format("LL");
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
    padding-bottom: 40px;
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
</style>