<template>
  <div class="pm-page">
    <div class="pm-toolbar">
      <toolbar
        pageName="Mileage Record"
        @refreshInfo="FETCH_LIST()"
        :isNewBtn="true"
        newBtnLabel="New Mile Record"
        @newBtnFn="TOGGLE_POPUP('add')"
      />
    </div>
    <div class="pm-page-container">
      <div class="page-content page-list">
        <DxDataGrid
          id="contact-client-list"
          :data-source="MileageList"
          :selection="{ mode: 'single' }"
          :hover-state-enabled="true"
          :allow-column-reordering="false"
          :show-borders="true"
          :show-row-lines="false"
          :row-alternation-enabled="true"
          @exporting="EXPORT_DATA"
        >
          <DxColumn
            data-field="record_no"
            caption="Record No."
            alignment="left"
            sort-order="desc"
          />
          <DxColumn
            data-field="created_by_name"
            caption="Created By"
            alignment="left"
          />
          <DxColumn
            data-field="start_date"
            data-type="date"
            format="dd MMM, yyyy"
            caption="Start Date"
          />
          <!-- <DxColumn
            data-field="start_mile"
            caption="Start Mile"
            alignment="left"
          /> -->
          <DxColumn
            data-field="end_date"
            data-type="date"
            format="dd MMM, yyyy"
            caption="End Date"
          />
          <!-- <DxColumn data-field="end_mile" caption="End Mile" alignment="left" /> -->
          <DxColumn
            data-field="total_mile"
            caption="Total Mile"
            alignment="left"
          />
          <DxColumn
            caption="Approval Status"
            alignment="center"
            :width="150"
            cell-template="approval-status"
          />
          <DxColumn :width="50" caption="" cell-template="option-btn-set" />
          <template #approval-status="{ data }">
            <div class="approval-incolumn">
              <div class="blue" v-if="data.data.approve_status == 1">
                <span>{{ data.data.status_desc }}</span>
              </div>
              <div class="orange" v-if="data.data.approve_status == 2">
                <i class="las la-clock"></i>
                <span>{{ data.data.status_desc }}</span>
              </div>
              <div class="green" v-if="data.data.approve_status == 3">
                <i class="las la-check-double"></i>
                <span>{{ data.data.status_desc }}</span>
              </div>
              <div class="red" v-if="data.data.approve_status == 4">
                <i class="las la-times"></i>
                <span>{{ data.data.status_desc }}</span>
              </div>
              <div class="red" v-if="data.data.approve_status == 5">
                <i class="las la-pen"></i>
                <span>{{ data.data.status_desc }}</span>
              </div>
            </div>
          </template>

          <template #option-btn-set="{ data }">
            <div class="table-btn-group">
              <div class="table-btn" v-on:click="VIEW_INFO(data)">
                <i class="las la-search blue"></i>
              </div>
              <!-- <div class="table-btn" v-on:click="TOGGLE_POPUP('edit', data)">
                <i class="las la-pen green"></i>
              </div>
              <div class="table-btn" v-on:click="DELETE_CLIENT(data)">
                <i class="las la-trash red"></i>
              </div> -->
            </div>
          </template>
          <!-- Configuration goes here -->
          <!-- <DxFilterRow :visible="true" /> -->
          <DxScrolling mode="standard" />
          <DxSearchPanel :visible="true" />
          <DxPaging :page-size="10" :page-index="0" />
          <DxPager
            :show-page-size-selector="true"
            :allowed-page-sizes="[5, 10, 20]"
            :show-navigation-buttons="true"
            :show-info="true"
            info-text="Page {0} of {1} ({2} items)"
          />
          <!-- <DxExport :enabled="true" /> -->
        </DxDataGrid>
      </div>
      <div
        class="page-content page-info border-left"
        v-if="currentViewRow != 1"
      >
        <div id="info-sidebar" class="pm-info-sidebar form">
          <approvalBox
            :status="this.currentViewRow.approve_status"
            @btnRequestApprove="APPROVE_BTN('req_approve')"
            @btnApprove="APPROVE_BTN('approve')"
            @btnReject="APPROVE_BTN('reject')"
            @btnRequestEdit="APPROVE_BTN('req_edit')"
            @btnResendApprove="APPROVE_BTN('req_approve')"
            v-if="
              this.currentViewRow.created_by ==
                this.$store.state.user.id_user ||
              this.$store.state.user.role == 'manager'
            "
          />
          <p class="pm-section-label">Details</p>
          <div class="form-item-container">
            <div class="input-set" v-if="currentViewRow.record_no">
              <p class="label">Record No:</p>
              <p class="info">
                {{ currentViewRow.record_no }}
              </p>
            </div>
            <div class="input-set" v-if="currentViewRow.created_by_name">
              <p class="label">Created By:</p>
              <p class="info">
                {{ currentViewRow.created_by_name }}
              </p>
            </div>

            <div class="input-set">
              <p class="label">Start Date:</p>
              <p class="info">
                {{ start_date }}
              </p>
            </div>
            <div class="input-set" v-if="currentViewRow.start_mile">
              <p class="label">Start Mile:</p>
              <p class="info">
                {{ currentViewRow.start_mile }}<span> km</span>
              </p>
            </div>
            <div class="input-set" v-if="currentViewRow.end_date">
              <p class="label">End Date:</p>
              <p class="info">
                {{ end_date }}
              </p>
            </div>
            <div class="input-set" v-if="currentViewRow.end_mile">
              <p class="label">End Mile:</p>
              <p class="info">{{ currentViewRow.end_mile }}<span> km</span></p>
            </div>
            <div class="input-set" v-if="currentViewRow.total_mile">
              <p class="label">Total Mile:</p>
              <p class="info">
                {{ currentViewRow.total_mile }}<span> km</span>
              </p>
            </div>
          </div>
          <p class="pm-section-label">Attachments</p>
          <div class="form-item-container">
            <div class="input-set">
              <p class="label">Start Mile Image:</p>
              <div class="img-box">
                <v-ons-toolbar-button
                  class="btn-preview"
                  v-on:click="PREVIEW_IMG(currentViewRow.start_img)"
                  v-if="currentViewRow.start_img != null"
                >
                  <i class="las la-expand-arrows-alt"></i>
                </v-ons-toolbar-button>
                <img
                  :src="this.baseURL + currentViewRow.start_img"
                  v-if="currentViewRow.start_img"
                />
                <i class="las la-image" v-if="!currentViewRow.start_img"></i>
                <label v-if="!currentViewRow.start_img">No Image</label>
              </div>
            </div>

            <div class="input-set">
              <p class="label">End Mile Image:</p>
              <div class="img-box">
                <v-ons-toolbar-button
                  class="btn-preview"
                  v-on:click="PREVIEW_IMG(currentViewRow.end_img)"
                  v-if="currentViewRow.end_img != null"
                >
                  <i class="las la-expand-arrows-alt"></i>
                </v-ons-toolbar-button>
                <img
                  :src="this.baseURL + currentViewRow.end_img"
                  v-if="currentViewRow.end_img"
                />
                <i class="las la-image" v-if="!currentViewRow.end_img"></i>
                <label v-if="!currentViewRow.end_img">No Image</label>
              </div>
            </div>
          </div>
          <div
            class="form-button-container"
            v-if="
              this.$store.state.user.role == 'staff' &&
              this.currentViewRow.created_by == this.$store.state.user.id_user
            "
          >
            <div
              class="button-set info-button-set"
              v-if="
                this.currentViewRow.approve_status == 1 ||
                this.currentViewRow.approve_status == 5
              "
            >
              <v-ons-toolbar-button v-on:click="TOGGLE_POPUP('edit')">
                <i class="las la-pen"></i>
                <span>Edit</span>
              </v-ons-toolbar-button>
              <v-ons-toolbar-button class="red" v-on:click="DELETE_ITEM()">
                <i class="las la-trash"></i>
                <span>Delete</span>
              </v-ons-toolbar-button>
            </div>
          </div>
          <div
            class="form-button-container"
            v-if="this.$store.state.user.role == 'manager'"
          >
            <div class="button-set info-button-set">
              <v-ons-toolbar-button class="red" v-on:click="DELETE_ITEM()">
                <i class="las la-trash"></i>
                <span>Delete</span>
              </v-ons-toolbar-button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <popupAdd
      v-if="isAdd == true"
      @btn-cancel-add="TOGGLE_POPUP('add')"
      @refreshList="FETCH_LIST()"
    />
    <popupEdit
      v-if="isEdit == true"
      @btn-cancel-edit="TOGGLE_POPUP('edit')"
      @refreshList="FETCH_LIST()"
      v-bind:editInfo="editInfo"
    />
    <contentLoading
      text="Loading, please wait..."
      v-if="isLoading == true"
      color="#fc9b21"
    />
    <previewImage
      :imageURL="previewImg"
      v-if="previewImg"
      @close-preview="PREVIEW_IMG_CLOSE()"
    />
  </div>
</template> 

<script>
//DataGrid
import "devextreme/dist/css/dx.light.css";
import { Workbook } from "exceljs";
import saveAs from "file-saver";
import { exportDataGrid } from "devextreme/excel_exporter";
import moment from "moment";
import {
  DxDataGrid,
  DxSearchPanel,
  DxPaging,
  DxPager,
  DxScrolling,
  DxColumn,
  // DxExport,
} from "devextreme-vue/data-grid";

//API
import axios from "/axios.js";

//Pages & Structures
import toolbar from "@/components/app-structures/app-toolbar.vue";
import popupAdd from "@/views/Applications/Record/Mileage/mileage-add.vue";
import popupEdit from "@/views/Applications/Record/Mileage/mileage-edit.vue";
import contentLoading from "@/components/app-structures/app-content-loading.vue";
import previewImage from "@/components/image-preview.vue";
import clone from "just-clone";
import approvalBox from "@/components/app-structures/app-item-approval.vue";

export default {
  name: "ViewMileageList",
  components: {
    toolbar,
    DxDataGrid,
    DxSearchPanel,
    DxPaging,
    DxPager,
    DxScrolling,
    DxColumn,
    previewImage,
    // DxExport,
    contentLoading,
    popupAdd,
    popupEdit,
    approvalBox,
  },
  created() {
    this.$store.commit("UPDATE_CURRENT_INAPP", {
      name: "Mileage Record",
      icon: "/img/icon_menu/record/mileage.png",
    });
    this.FETCH_LIST();
  },
  data() {
    return {
      isAdd: false,
      isEdit: false,
      isLoading: false,
      currentViewRow: 1,
      errorMessage: "",
      editInfo: "",
      previewImg: "",
      MileageList: "",
    };
  },
  computed: {
    start_date() {
      if (this.currentViewRow.start_date)
        return moment(this.currentViewRow.start_date).format("LL");
      else return "";
    },
    end_date() {
      if (this.currentViewRow.end_date)
        return moment(this.currentViewRow.end_date).format("LL");
      else return "";
    },
    baseURL() {
      var mode = this.$store.state.mode;
      if (mode == "dev") return this.$store.state.modeURL.dev;
      else if (mode == "prod") return this.$store.state.modeURL.prod;
      else return console.log("develpment mode set up incorrect.");
    },
  },
  methods: {
    EXPORT_DATA(e) {
      const workbook = new Workbook();
      const worksheet = workbook.addWorksheet("Clients");
      exportDataGrid({
        worksheet: worksheet,
        component: e.component,
      }).then(function () {
        workbook.xlsx.writeBuffer().then(function (buffer) {
          saveAs(
            new Blob([buffer], { type: "application/octet-stream" }),
            "Clients.xlsx"
          );
        });
      });
      e.cancel = true;
    },
    VIEW_INFO(e) {
      if (e.data) {
        this.currentViewRow = e.data;
        this.SCROLL_TOP_INFO();
      }
    },
    CLEAR_VIEW_INFO() {
      this.currentViewRow = "";
    },
    TOGGLE_POPUP(m) {
      if (m == "add") {
        if (this.isAdd == true) this.isAdd = false;
        else this.isAdd = true;
      } else if (m == "edit") {
        if (this.isEdit == true) this.isEdit = false;
        else {
          this.editInfo = clone(this.currentViewRow);
          this.isEdit = true;
        }
      }
    },
    FETCH_LIST() {
      this.currentViewRow = 1;
      this.isLoading = true;
      axios({
        method: "get",
        url: "/mile-record/mile-record-list",
        headers: {
          Authorization: "Bearer " + JSON.parse(localStorage.getItem("token")),
        },
      })
        .then((res) => {
          // console.log(res);
          if (res.data) {
            this.MileageList = res.data;
            if (this.MileageList.length > 0)
              this.currentViewRow =
                this.MileageList[this.MileageList.length - 1];
          }
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
    DELETE_ITEM() {
      this.$ons.notification.confirm("Confirm delete?").then((res) => {
        if (res == 1) {
          axios({
            method: "delete",
            url: "/mile-record/mile-record-delete",
            headers: {
              Authorization:
                "Bearer " + JSON.parse(localStorage.getItem("token")),
            },
            data: {
              id_mile: this.currentViewRow.id_mile,
            },
          })
            .then((res) => {
              console.log(res);
              if (res.status == 200) {
                this.$ons.notification.alert("Delete successful");
                this.FETCH_LIST();
              }
            })
            .catch((error) => {
              console.log(error);
            })
            .finally(() => {});
        }
      });
    },
    SCROLL_TOP_INFO() {
      document
        .getElementById("info-sidebar")
        .scroll({ top: 0, behavior: "smooth" });
    },
    PREVIEW_IMG(img) {
      if (img) {
        this.previewImg = img;
      }
    },
    PREVIEW_IMG_CLOSE() {
      this.previewImg = "";
    },
    APPROVE_BTN(option) {
      var user = JSON.parse(localStorage.getItem("user"));
      var alertText = "N/A";
      var data = {
        id_mile: this.currentViewRow.id_mile,
        approve_status: 0,
        id_user: user.id_user, //updater user
      };
      if (option == "req_approve") {
        //send approve request 1--> 2
        data.approve_status = 2;
        alertText = "Confirm Send Approve Request?";
      } else if (option == "approve") {
        //feedback approve 2 --> 3
        data.approve_status = 3;
        alertText = "Confirm Send Approve Feedback?";
      } else if (option == "reject") {
        //feedback reject 2 --> 4
        data.approve_status = 4;
        alertText = "Confirm Send Reject Feedback?";
      } else if (option == "req_edit") {
        //feedback request edit 2 --> 5
        data.approve_status = 5;
        alertText = "Confirm Send Request Edit Feedback?";
      }
      this.$ons.notification.confirm(alertText).then((res) => {
        if (res == 1) {
          axios({
            method: "put",
            url: "/mile-record/mile-record-status",
            headers: {
              Authorization:
                "Bearer " + JSON.parse(localStorage.getItem("token")),
            },
            data: data,
          })
            .then((res) => {
              console.log(res);
              if (res.status == 200) {
                this.$ons.notification.alert("Approval Status Sent");
                this.FETCH_LIST();
              }
            })
            .catch((error) => {
              console.log(error);
            })
            .finally(() => {});
        }
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
  // display: grid;
  // grid-template-rows: 61px auto;
  // grid-template-columns: auto 360px;

  .pm-page-container {
    background-color: #ffffff;
    // padding: 20px 20px 0px 20px;
    height: calc(100vh - 180px);
    display: flex;

    .page-content {
      width: 100%;
      height: 100%;
      margin: 0 auto;
    }
    .page-nodata {
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .page-list {
      width: auto;
      padding: 20px 20px 0 20px;
    }
    .page-info {
      width: auto;
    }
  }
}

.pm-toolbar {
  grid-column: span 2;
}
.border-left {
  border: 1px solid #e6e6e6;
  border-width: 0 0 0 1px;
  padding: 0 !important;
  height: calc(100vh - 139px) !important;
}
.pm-info-sidebar {
  width: 360px;
  height: 100%;
  background: #fff;
  padding: 0 20px;
  overflow-y: scroll;
  position: relative;
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
  }
  .pm-sidebar-close-btn {
    width: 40px;
    height: 20px;
    position: absolute;
    top: 20px;
    right: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #f3f0f0;
    border-radius: 20px;
    cursor: pointer;
    i {
      font-size: 1.75em;
    }
  }

  .pm-sidebar-close-btn:hover {
    background: #f6f6f6;
  }
  .pm-sidebar-close-btn:active {
    background: #f3f0f0;
  }
}

.pm-info-sidebar::-webkit-scrollbar {
  display: none;
}

.form-item-container:last-child {
  margin-bottom: 40px;
}
</style>