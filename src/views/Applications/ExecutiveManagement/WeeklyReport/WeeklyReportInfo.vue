<template>
  <div class="pm-page">
    <div class="pm-toolbar">
      <toolbar
        :pageSubName="'Record No. ' + info.record_no"
        :isBack="true"
        :isSave="true"
        :isDelete="true"
        @isDeleteBtn="DELETE()"
        @isSaveBtn="SAVE_EDIT()"
        @refreshInfo="FETCH_INFO()"
      />
    </div>
    <div class="pm-page-container">
      <div class="page-content">
        <div class="page-report">
          <div class="form">
            <div class="form-item-container">
              <div class="input-set">
                <div class="label-box">
                  <p class="label">Start Date:</p>
                  <span class="star-label"
                    ><i class="las la-asterisk"></i
                  ></span>
                </div>
                <DxDateBox
                  :value="formSelect.now"
                  type="date"
                  v-model="info.start_date"
                  placeholder="Start Date"
                />
              </div>
              <div class="input-set">
                <div class="label-box">
                  <p class="label">End Date:</p>
                  <span class="star-label"
                    ><i class="las la-asterisk"></i
                  ></span>
                </div>
                <DxDateBox
                  :value="formSelect.now"
                  type="date"
                  v-model="info.end_date"
                  placeholder="End Date"
                />
              </div>
            </div>
          </div>
          <!-- <wysiwyg class="text-editor" v-model="info.report_message" /> -->

          <mc-wysiwyg
            class="text-editor"
            v-model="info.report_message"
          ></mc-wysiwyg>
        </div>
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
//App Structure
import toolbar from "@/components/app-structures/app-toolbar.vue";
import popupEdit from "@/views/Applications/ProjectManager/Projects/project-edit.vue";
import DxDateBox from "devextreme-vue/date-box";

//API
import axios from "/axios.js";
// import moment from "moment";
export default {
  name: "ViewWeeklyReportInfo",
  components: {
    toolbar,
    popupEdit,
    DxDateBox,
  },
  created() {
    if (this.$store.state.status.server == true) this.FETCH_INFO();
  },
  data() {
    return {
      info: {},
      isEdit: false,
      formSelect: {
        now: new Date(),
      },
    };
  },
  methods: {
    FETCH_INFO() {
      const id_weekly = this.$route.params;
      if (id_weekly) {
        axios({
          method: "post",
          url: "/weekly-report/get-weekly-report",
          headers: {
            Authorization:
              "Bearer " + JSON.parse(localStorage.getItem("token")),
          },
          data: id_weekly,
        })
          .then((res) => {
            // console.log(res);

            if (res.status == 200 && res.data[0]) {
              this.info = res.data[0];
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
    TOGGLE_POPUP() {
      this.isEdit = !this.isEdit;
    },
    SAVE_EDIT() {
      this.$ons.notification.confirm("Confirm Save?").then((res) => {
        const data = {
          id_user: this.$store.state.user.id_user,
          id_weekly: this.info.id_weekly,
          report_message: this.info.report_message,
          start_date: this.info.start_date,
          end_date: this.info.end_date,
        };
        if (res == 1) {
          axios({
            method: "put",
            url: "/weekly-report/weekly-report-edit",
            headers: {
              Authorization:
                "Bearer " + JSON.parse(localStorage.getItem("token")),
            },
            data: data,
          })
            .then((res) => {
              if (res.status == 200) {
                this.$ons.notification.alert("Save Successful");
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
      });
    },
    DELETE() {
      this.$ons.notification.confirm("Confirm Delete Record?").then((res) => {
        const data = {
          id_weekly: this.info.id_weekly,
        };
        if (res == 1) {
          axios({
            method: "delete",
            url: "/weekly-report/weekly-report-delete",
            headers: {
              Authorization:
                "Bearer " + JSON.parse(localStorage.getItem("token")),
            },
            data: data,
          })
            .then((res) => {
              if (res.status == 200) {
                this.$ons.notification.alert("Delete Successful");
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
  },
  computed: {
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
  width: 100%;
  height: calc(100vh - 78px);
  display: grid;
  grid-template-rows: 61px calc(100vh - 61px);

  .pm-page-container {
    background-color: #d9d9d9;

    .page-content {
      height: calc(100vh - 139px);
      overflow-x: hidden;
      overflow-y: scroll;
      display: block;

      .page-report {
        width: 1280px;
        // background-color: #fff;
        margin: 0 auto;

        @media screen and (max-width: 1920px) {
          width: 1280px;
        }
        @media screen and (max-width: 1600px) {
          width: calc(100% - 80px);
          padding: 0 20px;
        }

        margin-top: 40px;
        h2 {
          margin: 0;
          font-size: 20px;
          font-style: normal;
          text-transform: uppercase;
          font-family: "Play", "Noto Sans Thai" !important;
        }

        background-color: #fff;
        padding: 20px;
        margin-top: 20px;
        margin-bottom: 60px;
        box-shadow: 0 4px 12px -2px rgb(107 117 161 / 16%);
        border-radius: 6px;
        min-height: 200px;
        height: fit-content;
      }
    }
  }
}
h1 {
  font-size: 2em;
}

.text-editor {
  font-family: "Calibri";
  font-size: 16px;
  height: 500px;
  overflow-y: scroll;
}

.form-item-container {
  display: grid;
  width: 100%;
  grid-template-columns: auto auto;
  grid-gap: 20px;
  margin-bottom: 20px;
}
</style>