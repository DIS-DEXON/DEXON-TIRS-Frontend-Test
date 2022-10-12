<template>
  <div class="pm-page">
    <div class="pm-toolbar">
      <toolbar
        :pageSubName="'Record No. ' + info.record_no"
        :isBack="true"
        :isEdit="sign_status"
        :isDelete="true"
        :isPrint="false"
        :isDownload="true"
        @isDeleteBtn="DELETE_PROJECT()"
        @isEditBtn="TOGGLE_POPUP()"
        @isDownloadBtn="DOWNLOAD_PDF()"
        @refreshInfo="FETCH_INFO()"
      />
    </div>
    <div class="pm-page-container">
      <div class="page-content">
        <approvalBox
          class="approval-box-fullpage"
          :status="this.info.approve_status"
          @btnRequestApprove="APPROVE_BTN('req_approve')"
          @btnApprove="APPROVE_BTN('approve')"
          @btnReject="APPROVE_BTN('reject')"
          @btnRequestEdit="APPROVE_BTN('req_edit')"
          @btnResendApprove="APPROVE_BTN('req_approve')"
          v-if="
            this.info.created_by == this.$store.state.user.id_user ||
            this.$store.state.user.role == 'manager'
          "
        />

        <div class="page-info form">
          <p class="page-section-label">Record Detail</p>
          <div class="form-item-container">
            <div class="input-set">
              <p class="label">Record No:</p>
              <p class="info">
                {{ info.record_no }}
              </p>
            </div>
            <div class="input-set">
              <p class="label">Travel Date:</p>
              <p class="info">
                {{ travel_date }}
              </p>
            </div>
            <div class="input-set">
              <p class="label">Created By:</p>
              <p class="info">
                {{ info.created_by_name }}
              </p>
            </div>
            <div class="input-set">
              <p class="label">Total Mile:</p>
              <p class="info" v-if="total_mile > 0">{{ total_mile }} Km</p>
              <p class="info" v-if="!total_mile || total_mile <= 0">-</p>
            </div>
            <div class="input-set">
              <p class="label">Created Date:</p>
              <p class="info">
                {{ created_date }}
              </p>
            </div>
            <div class="input-set">
              <p class="label">Approval Status:</p>
              <p class="info">
                {{ info.status_desc }}
              </p>
            </div>
            <div class="input-set" style="grid-column: span 3">
              <p class="label">Note:</p>
              <p class="info" style="height: 60px; text-align: left">
                {{ info.note }}
              </p>
            </div>
          </div>

          <div class="">
            <DxDataGrid
              id="contact-client-list"
              :data-source="TravelDetailList"
              :selection="{ mode: 'single' }"
              :hover-state-enabled="true"
              :allow-column-reordering="false"
              :show-borders="true"
              :show-row-lines="false"
              :row-alternation-enabled="true"
            >
              <DxColumn
                data-field="visit_record_no"
                caption="Visit Record No."
                sort-order="asc"
              />
              <DxColumn data-field="client_name" caption="Client Name" />
              <DxColumn data-field="travel_from" caption="From" />
              <DxColumn data-field="travel_to" caption="To" />
              <DxColumn
                data-field="distance"
                caption="Distance"
                alignment="left"
              />
              <DxColumn :width="80" caption="" cell-template="option-btn-set" />

              <template #option-btn-set="{ data }">
                <div class="table-btn-group">
                  <!-- <div class="table-btn" v-on:click="VIEW_INFO(data)">
                    <i class="las la-search blue"></i>
                  </div> -->
                  <div
                    class="table-btn"
                    v-on:click="TOGGLE_POPUP('edit', data)"
                  >
                    <i class="las la-pen green"></i>
                  </div>
                  <div class="table-btn" v-on:click="DELETE_ITEM(data)">
                    <i class="las la-trash red"></i>
                  </div>
                </div>
              </template>
              <!-- Configuration goes here -->
              <!-- <DxFilterRow :visible="true" /> -->
              <DxToolbar>
                <DxItem location="before" template="tableName" />
                <DxItem location="after" template="addVisitRecord" />
              </DxToolbar>
              <template #tableName>
                <p class="page-intable-section-label">Visiting Record</p>
              </template>
              <template #addVisitRecord>
                <v-ons-toolbar-button v-on:click="TOGGLE_POPUP()">
                  <i class="las la-plus"></i>
                  <span>Add</span>
                </v-ons-toolbar-button>
              </template>
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
      </div>
    </div>
    <popupAdd :travelDate="this.info.date" />
    <popupEdit
      v-if="isEdit == true"
      @closePopup="TOGGLE_POPUP()"
      @FETCH_INFO="FETCH_INFO()"
      :editInfo="info"
    />
    <popupSign
      v-if="isSign == true"
      :title="popupTitle"
      :signer="currentSigner"
      :info="this.info"
      @closePopup="TOGGLE_POPUP_SIGN()"
      @FETCH_INFO="FETCH_INFO()"
    />
    <contentLoading
      text="Loading, please wait..."
      v-if="isLoading == true"
      color="#fbcb04"
    />
  </div>
</template>

<script>
//DataGrid
import "devextreme/dist/css/dx.light.css";
import {
  DxDataGrid,
  DxSearchPanel,
  DxPaging,
  DxPager,
  DxScrolling,
  DxColumn,
  DxToolbar,
  DxItem,
} from "devextreme-vue/data-grid";

//Pages & Structures
import toolbar from "@/components/app-structures/app-toolbar.vue";
import popupAdd from "@/views/Applications/Record/Travel/travel-detail-add.vue";
import popupEdit from "@/views/Applications/Record/Visiting/visiting-edit.vue";
import contentLoading from "@/components/app-structures/app-content-loading.vue";
import approvalBox from "@/components/app-structures/app-item-approval.vue";
import moment from "moment";

//API
import axios from "/axios.js";
export default {
  name: "ViewTravelInfo",
  components: {
    DxDataGrid,
    DxSearchPanel,
    DxPaging,
    DxPager,
    DxScrolling,
    DxColumn,
    DxToolbar,
    DxItem,
    toolbar,
    popupAdd,
    popupEdit,
    contentLoading,
    approvalBox,
  },
  created() {
    if (this.$store.state.status.server == true) this.FETCH_INFO();
  },
  data() {
    return {
      isLoading: false,
      isAdd: false,
      isEdit: false,
      isSign: false,
      sign_status: true,
      info: "",
      popupTitle: "",
      TravelDetailList: [
        {
          id_travel_detail: 0,
          id_travel: 2,
          id_visit: 1,
          visit_record_no: "AI-CVR-09-22-01",
          travel_from: "DEXON Main Office",
          travel_to: "PTTLNG",
          distance: 24,
          client_name: "PTTLNG",
          treval_note: "nothing to note krub",
        },
        {
          id_travel_detail: 1,
          id_travel: 2,
          id_visit: 2,
          visit_record_no: "AI-CVR-09-22-02",
          travel_from: "PTTLNG",
          travel_to: "PTTEP S1",
          distance: 76,
          client_name: "PTTEP S1",
          treval_note: "",
        },
        {
          id_travel_detail: 2,
          id_travel: 2,
          id_visit: 3,
          visit_record_no: "AI-CVR-09-22-03",
          travel_from: "PTTEP S1",
          travel_to: "DEXON Main Office",
          distance: 96,
          client_name: "-",
          treval_note: "",
        },
      ],
    };
  },
  methods: {
    TOGGLE_POPUP_SIGN(opt) {
      if (this.isSign == true) this.isSign = false;
      if (opt == "dexon") {
        this.popupTitle = "Dexon Signature";
        this.currentSigner = "dexon";
        this.isSign = true;
      } else if (opt == "client") {
        this.popupTitle = "Client Signature";
        this.currentSigner = "client";
        this.isSign = true;
      }
    },
    FETCH_INFO() {
      this.isLoading = true;
      setTimeout(() => {
        const id_travel = this.$route.params;
        if (id_travel) {
          axios({
            method: "post",
            url: "/travel-record/travel-record-info",
            headers: {
              Authorization:
                "Bearer " + JSON.parse(localStorage.getItem("token")),
            },
            data: id_travel,
          })
            .then((res) => {
              console.log(res);

              if (res.status == 200 && res.data[0]) {
                this.info = res.data[0];
              } else {
                this.$ons.notification.alert("No record found!");
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
        }
      }, 500);
    },
    FETCH_INFO_LIST() {
      this.isLoading = true;
      setTimeout(() => {
        const id_travel = this.$route.params;
        if (id_travel) {
          axios({
            method: "post",
            url: "/travel-record/travel-record-info",
            headers: {
              Authorization:
                "Bearer " + JSON.parse(localStorage.getItem("token")),
            },
            data: id_travel,
          })
            .then((res) => {
              console.log(res);

              if (res.status == 200 && res.data[0]) {
                this.info = res.data[0];
              } else {
                this.$ons.notification.alert("No record found!");
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
        }
      }, 500);
    },
    DELETE_PROJECT() {
      const id_visit = this.$route.params;
      this.$ons.notification.confirm("Confirm delete?").then((res) => {
        if (res == 1) {
          axios({
            method: "put",
            url: "/visit-record/visit-record-delete",
            headers: {
              Authorization:
                "Bearer " + JSON.parse(localStorage.getItem("token")),
            },
            data: id_visit,
          })
            .then((res) => {
              if (res.status == 200) {
                this.$ons.notification.alert("Visit Record delete successful");
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
    TOGGLE_POPUP(option) {
      if (option == "add") {
        this.isAdd = !this.isAdd;
      } else if (option == "edit") {
        this.isEdit = !this.isEdit;
      }
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
  computed: {
    travel_date() {
      if (this.info.date) return moment(this.info.date).format("LL");
      return null;
    },
    created_date() {
      if (this.info.created_time)
        return moment(this.info.created_time).format("LLL");
      return null;
    },
    total_mile() {
      const sum = this.TravelDetailList.reduce((accumulator, object) => {
        return accumulator + object.distance;
      }, 0);
      return sum;
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
    background-color: #ffffff;
    display: grid;
    grid-template-columns: 100%;
    height: calc(100% - 78px);
    .page-content {
      width: 100%;
      height: calc(100vh - 139px);
      // overflow-x: scroll;
      overflow-y: scroll;
      display: flex;
      justify-content: flex-start;
      flex-direction: column;
      align-items: center;
    }
  }
}
.page-info {
  width: 1024px;
  height: 100%;
  background: #fff;
  padding: 20px;
  position: relative;
  padding-bottom: 100px;
}

.form-item-container {
  // display: block;
  display: grid;
  grid-template-columns: repeat(3, 328px);
  grid-gap: 0 20px;
  padding-bottom: 20px;

  @media screen and (max-width: 1280px) {
    grid-template-columns: repeat(2, auto);
  }
  @media screen and (max-width: 768px) {
    grid-template-columns: repeat(2, auto);
  }
  @media screen and (max-width: 425px) {
    grid-template-columns: repeat(1, auto);
  }
}

.toolbar-button {
  background-color: #f6f6f6;
  padding: 0;
  padding-right: 15px;
  height: 34px;
  border: 0px;
}
</style>