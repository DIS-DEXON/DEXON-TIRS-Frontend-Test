<template>
  <div class="pm-page">
    <div class="pm-toolbar">
      <toolbar
        pageName="Gas Bill Record"
        @refreshInfo="FETCH_LIST()"
        :isNewBtn="true"
        newBtnLabel="New Bill Record"
        @newBtnFn="TOGGLE_POPUP('add')"
      />
    </div>
    <div class="pm-page-container">
      <div class="page-content page-list">
        <DxDataGrid
          id="contact-client-list"
          :data-source="GasBillList"
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
            sort-order="desc"
          />
          <DxColumn
            data-field="bill_date"
            data-type="date"
            format="dd MMM, yyyy"
            caption="Date"
          />
          <DxColumn data-field="price" caption="Price" alignment="left" />
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
              <div class="table-btn" v-on:click="DELETE_ITEM(data)">
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
        v-if="this.currentViewRow != 1"
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
              <p class="label">Bill No:</p>
              <p class="info">
                {{ currentViewRow.record_no }}
              </p>
            </div>
            <div class="input-set" v-if="gas_bill_date">
              <p class="label">Bill Date:</p>
              <p class="info">
                {{ gas_bill_date }}
              </p>
            </div>
            <div class="input-set" v-if="currentViewRow.price">
              <p class="label">Price:</p>
              <p class="info">
                {{
                  currentViewRow.price
                    .toFixed(2)
                    .replace(/\d(?=(\d{3})+\.)/g, "$&,")
                }}
                <span v-if="currentViewRow.price"> THB</span>
              </p>
            </div>
            <!-- <div class="input-set" v-if="currentViewRow.status_desc">
              <p class="label">Approval Status:</p>
              <p class="info">
                {{ currentViewRow.status_desc }}
              </p>
            </div> -->
            <div class="input-set">
              <p class="label">Receipt Image:</p>
              <div class="img-box">
                <v-ons-toolbar-button
                  class="btn-preview"
                  v-on:click="PREVIEW_IMG(currentViewRow.receipt_img)"
                  v-if="currentViewRow.receipt_img != null"
                >
                  <i class="las la-expand-arrows-alt"></i>
                </v-ons-toolbar-button>
                <img
                  :src="this.baseURL + currentViewRow.receipt_img"
                  v-if="currentViewRow.receipt_img"
                />
                <i class="las la-image" v-if="!currentViewRow.receipt_img"></i>
                <label v-if="!currentViewRow.receipt_img">No Image</label>
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
import popupAdd from "@/views/Applications/Record/GasBill/gasbill-add.vue";
import popupEdit from "@/views/Applications/Record/GasBill/gasbill-edit.vue";
import contentLoading from "@/components/app-structures/app-content-loading.vue";
import clone from "just-clone";
import previewImage from "@/components/image-preview.vue";
import approvalBox from "@/components/app-structures/app-item-approval.vue";

export default {
  name: "ViewGasReceipt",
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
      name: "Gas Bill Record",
      icon: "/img/icon_menu/record/gas.png",
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
      GasBillList: [],
    };
  },
  computed: {
    gas_bill_date() {
      return moment(this.currentViewRow.bill_date).format("LL");
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
      this.currentViewRow = e.data;
      this.SCROLL_TOP_INFO();
    },
    DELETE_ITEM() {
      this.$ons.notification.confirm("Confirm delete?").then((res) => {
        if (res == 1) {
          axios({
            method: "delete",
            url: "/fuel-bill/fuel-bill-delete",
            headers: {
              Authorization:
                "Bearer " + JSON.parse(localStorage.getItem("token")),
            },
            data: {
              id_fuel_bill: this.currentViewRow.id_fuel_bill,
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
      this.currentViewRow == 1;
      this.isLoading = true;
      axios({
        method: "get",
        url: "/fuel-bill/fuel-bill-list",
        headers: {
          Authorization: "Bearer " + JSON.parse(localStorage.getItem("token")),
        },
      })
        .then((res) => {
          // console.log(res);
          if (res.data) {
            this.GasBillList = res.data;
            if (this.GasBillList.length > 0)
              this.currentViewRow =
                this.GasBillList[this.GasBillList.length - 1];
          }
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
    SCROLL_TOP_INFO() {
      if (this.currentViewRow != "") {
        document
          .getElementById("info-sidebar")
          .scroll({ top: 0, behavior: "smooth" });
      }
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
        id_fuel_bill: this.currentViewRow.id_fuel_bill,
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
            url: "/fuel-bill/fuel-bill-status",
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
}

.pm-info-sidebar::-webkit-scrollbar {
  display: none;
}

.form-item-container:last-child {
  margin-bottom: 40px;
}
</style>