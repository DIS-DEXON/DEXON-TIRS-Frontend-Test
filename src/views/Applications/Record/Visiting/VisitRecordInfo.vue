<template>
  <div class="pm-page">
    <div class="pm-toolbar">
      <toolbar
        :pageSubName="'Record No. ' + info.doc_no"
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
        <div id="report-sheet">
          <div class="report-container">
            <div class="sheet-header">
              <div class="logo"><img src="/img/ai-logo.png" /></div>
              <div class="title">client visiting record</div>
              <div class="docno">{{ info.doc_no }}</div>
            </div>
            <div class="sheet-body">
              <div class="section-label"><label>client information</label></div>
              <div class="section-label"><label>visiting objective</label></div>

              <div class="form-item-label"><label>Company</label></div>
              <div class="form-item-value">
                <label>{{ info.client_company_name }}</label>
              </div>

              <div class="form-item-label"><label>Visiting</label></div>
              <div class="form-item-value">
                <label>{{ info.obj_visiting_comment }}</label>
              </div>

              <div class="form-item-label"><label>Location/Address</label></div>
              <div class="form-item-value">
                <label>{{ info.client_location }}</label>
              </div>

              <div class="form-item-label"><label>Meeting</label></div>
              <div class="form-item-value">
                <label>{{ info.obj_meeting_comment }}</label>
              </div>

              <div class="form-item-label"><label>Name</label></div>
              <div class="form-item-value">
                <label>{{ info.client_name }}</label>
              </div>

              <div class="form-item-label">
                <label>Sales and Marketing</label>
              </div>
              <div class="form-item-value">
                <label>{{ info.obj_saleandmarketing_comment }}</label>
              </div>

              <div class="form-item-label"><label>Position</label></div>
              <div class="form-item-value">
                <label>{{ info.client_position }}</label>
              </div>

              <div class="form-item-label"><label>Submit Document</label></div>
              <div class="form-item-value">
                <label>{{ info.obj_submitdoc_comment }}</label>
              </div>

              <div class="form-item-label"><label>Email</label></div>
              <div class="form-item-value">
                <label style="text-transform: lowercase">{{
                  info.client_email
                }}</label>
              </div>

              <div class="form-item-label"><label>Receive Document</label></div>
              <div class="form-item-value">
                <label>{{ info.obj_receivedoc_comment }}</label>
              </div>

              <div class="form-item-label"><label>Tel.</label></div>
              <div class="form-item-value">
                <label>{{ info.client_phone_no }}</label>
              </div>

              <div class="form-item-label"><label>Other</label></div>
              <div class="form-item-value">
                <label>{{ info.obj_other_comment }}</label>
              </div>

              <div class="section-label" style="grid-column: span 6">
                <label>note</label>
              </div>
              <div class="form-item-value form-item-value-textarea">
                <label>{{ info.note }}</label>
              </div>
              <div class="section-label" style="grid-column: span 3">
                <label>dacon acknowledgement</label>
              </div>
              <div class="section-label" style="grid-column: span 3">
                <label>client acknowledgement</label>
              </div>
              <div class="form-item-label" style="grid-column: span 1">
                <label>Name</label>
              </div>
              <div class="form-item-value" style="grid-column: span 1">
                <label>{{ info.firstname }} {{ info.lastname }}</label>
              </div>

              <div
                class="form-item-label"
                style="border-width: 0.5px; justify-content: center"
              >
                <label>Signature</label>
              </div>

              <div class="form-item-label" style="grid-column: span 1">
                <label>Name</label>
              </div>
              <div class="form-item-value" style="grid-column: span 1">
                <label>{{ info.client_name }}</label>
              </div>

              <div
                class="form-item-label"
                style="border-width: 0.5px; justify-content: center"
              >
                <label>Signature</label>
              </div>

              <div class="form-item-label"><label>Position</label></div>
              <div class="form-item-value" style="grid-column: span 1">
                <label>{{ info.position }}</label>
              </div>
              <div
                class="form-item-value"
                style="
                  grid-column: span 1;
                  grid-row: span 2;
                  border-width: 0.5px;
                  padding: 0;
                "
              >
                <div
                  class="btn-add-sign"
                  v-if="
                    info.sign_dacon_signed == false ||
                    info.sign_dacon_signed == null
                  "
                  v-on:click="TOGGLE_POPUP_SIGN('dexon')"
                >
                  <i class="las la-pen-nib"></i>
                  <span>Click to Sign</span>
                </div>
                <div class="sign-img" v-if="info.sign_dacon_signed == true">
                  <img :src="info.sign_dacon_img" />
                </div>
              </div>
              <div class="form-item-label"><label>Position</label></div>
              <div class="form-item-value" style="grid-column: span 1">
                <label>{{ info.client_position }}</label>
              </div>
              <div
                class="form-item-value"
                style="
                  grid-column: span 1;
                  grid-row: span 2;
                  border-width: 0.5px;
                  padding: 0;
                "
              >
                <div
                  class="btn-add-sign"
                  v-if="
                    info.sign_client_signed == false ||
                    info.sign_client_signed == null
                  "
                  v-on:click="TOGGLE_POPUP_SIGN('client')"
                >
                  <i class="las la-pen-nib"></i>
                  <span>Click to Sign</span>
                </div>
                <div class="sign-img" v-if="info.sign_client_signed == true">
                  <img :src="info.sign_client_img" />
                </div>
              </div>
              <div class="form-item-label"><label>Sign Date</label></div>
              <div class="form-item-value" style="grid-column: span 1">
                <label>{{ sign_dacon_date }}</label>
              </div>
              <div class="form-item-label"><label>Sign Date</label></div>
              <div class="form-item-value" style="grid-column: span 1">
                <label>{{ sign_client_date }}</label>
              </div>
            </div>
            <div class="sheet-footer">
              <label>F-PINT71-01 Rev.02</label>
              <label>Effective Date: 11-May-2021</label>
            </div>
          </div>
        </div>
      </div>
    </div>
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
import toolbar from "@/components/app-structures/app-toolbar.vue";
import popupSign from "@/views/Applications/Record/Visiting/visiting-signature-add.vue";
import popupEdit from "@/views/Applications/Record/Visiting/visiting-edit.vue";
import contentLoading from "@/components/app-structures/app-content-loading.vue";
import axios from "/axios.js";
import moment from "moment";
import { jsPDF } from "jspdf";
export default {
  name: "ViewVisitingInfo",
  components: {
    toolbar,
    popupEdit,
    popupSign,
    contentLoading,
  },
  created() {
    if (this.$store.state.status.server == true) this.FETCH_INFO();
  },
  data() {
    return {
      isLoading: false,
      isEdit: false,
      isSign: false,
      currentSigner: "",
      sign_status: true,
      info: "",
      popupTitle: "",
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
        const id_visit = this.$route.params;
        if (id_visit) {
          axios({
            method: "post",
            url: "/visit-record/visit-record-info",
            headers: {
              Authorization:
                "Bearer " + JSON.parse(localStorage.getItem("token")),
            },
            data: id_visit,
          })
            .then((res) => {
              // console.log(res);

              if (res.status == 200 && res.data[0]) {
                this.info = res.data[0];
                if (
                  this.info.sign_dacon_signed == true ||
                  this.info.sign_client_signed == true
                ) {
                  this.sign_status = false;
                }
              } else {
                this.$ons.notification.alert("Record information not found");
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
    DOWNLOAD_PDF() {
      var doc = new jsPDF({
        orientation: "l",
        unit: "mm",
        format: [1005, 720],
        putOnlyUsedFonts: true,
      });

      doc.html(document.getElementById("report-sheet"), {
        callback: function (doc) {
          doc.save();
        },
      });
    },
    TOGGLE_POPUP() {
      this.isEdit = !this.isEdit;
    },
  },
  computed: {
    sign_dacon_date() {
      if (this.info.sign_dacon_date)
        return moment(this.info.sign_dacon_date).format("LL");
      return null;
    },
    sign_client_date() {
      if (this.info.sign_client_date)
        return moment(this.info.sign_client_date).format("LL");
      return null;
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
    grid-template-columns: 100%;
    height: calc(100% - 78px);
    .page-content {
      width: 100%;
      height: calc(100vh - 139px);
      overflow-x: scroll;
      overflow-y: scroll;
      display: flex;
      justify-content: flex-start;
      flex-direction: column;
      align-items: center;
    }
    .page-content::-webkit-scrollbar {
      display: none;
    }
  }
}
h1 {
  font-size: 2em;
}
.report-container {
  .header {
    .title {
      grid-column: span 4;
    }
  }
  .section-label {
    grid-column: span 3;
  }
  .ackn-section {
    grid-column: span 6;
    display: grid;
    grid-template-columns: repeat(7, 14.28%);
  }
}

.btn-add-sign {
  background-color: transparent;
  padding: 4px 6px;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 0px;
  cursor: pointer;

  i {
    font-size: 18px;
    color: $web-font-color-blue;
  }

  span {
    font-size: 14px;
    font-weight: 500;
    color: $web-font-color-blue;
    padding-left: 6px;
    text-align: center;
  }
}

.sign-img {
  width: 100%;
  img {
    width: 100%;
    object-fit: contain;
  }
}
</style>