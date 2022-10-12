<template>
  <div class="pm-page">
    <div class="pm-toolbar">
      <toolbar
        pageName="Travel Record"
        @refreshInfo="FETCH_LIST()"
        :isNewBtn="true"
        newBtnLabel="New Travel Record"
        @newBtnFn="TOGGLE_POPUP('add')"
      />
    </div>
    <div class="pm-page-container">
      <div class="page-content page-list">
        <DxDataGrid
          id="contact-client-list"
          :data-source="TravelList"
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
            data-field="date"
            data-type="date"
            format="dd MMM, yyyy"
            caption="Travel Date"
          />
          <DxColumn data-field="created_by_name" caption="Created By" />
          <DxColumn
            data-field="created_time"
            data-type="date"
            format="dd MMM, yyyy"
            caption="Created Date"
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
import { exportDataGrid } from "devextreme/excel_exporter";
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
import saveAs from "file-saver";
import { Workbook } from "exceljs";
import moment from "moment";
import toolbar from "@/components/app-structures/app-toolbar.vue";
import popupAdd from "@/views/Applications/Record/Travel/travel-add.vue";
import popupEdit from "@/views/Applications/Record/GasBill/gasbill-edit.vue";
import contentLoading from "@/components/app-structures/app-content-loading.vue";
import clone from "just-clone";
import previewImage from "@/components/image-preview.vue";

export default {
  name: "ViewTravelRcord",
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
  },
  created() {
    this.$store.commit("UPDATE_CURRENT_INAPP", {
      name: "Travel Record",
      icon: "/img/icon_menu/record/travel.png",
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
      TravelList: [],
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
      const rowID = e.data.id_travel;
      if (rowID != null) {
        this.$router.push("/record/travel/" + rowID);
      }
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
        url: "/travel-record/travel-record-list",
        headers: {
          Authorization: "Bearer " + JSON.parse(localStorage.getItem("token")),
        },
      })
        .then((res) => {
          // console.log(res);
          if (res.data) {
            this.TravelList = res.data;
            if (this.TravelList.length > 0)
              this.currentViewRow = this.TravelList[this.TravelList.length - 1];
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