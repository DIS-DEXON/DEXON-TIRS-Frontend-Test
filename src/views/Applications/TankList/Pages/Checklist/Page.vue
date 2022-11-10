<template>
  <div class="page-container">
    <div class="list-panel">
      <div class="column-header">Inspection Record</div>
      <DxList :data-source="inspRecordList">
        <template #item="{ data: item }">
          <div
            class="list-item-wrapper"
            :class="{ active: item.id_inspection_record == id_insp_record }"
          >
            <div class="contents">
              id:{{ item.id_inspection_record }}
              {{ DATE_FORMAT(item.inspection_date) }}<br />
              {{ SET_CAMPAIGN(item.id_campaign) }}
            </div>
            <div class="contents">
              <v-ons-toolbar-button
                class="btn"
                v-on:click="VIEW_CHECKLIST(item.id_inspection_record)"
                style="
                  width: 50px;
                  background-color: #f6f6f6;
                  color: #303030;
                  padding: 5px 0;
                  text-align: right;
                "
              >
                <i class="las la-search"></i>
              </v-ons-toolbar-button>
            </div>
          </div>
        </template>
      </DxList>
    </div>
    <div id="page-container-view" class="page-section">
      <div v-if="this.checklistList_existance.general == true">
        <checklistGeneric
          :checklistInfo="this.checklistList.generic"
          v-if="this.checklistList.generic.length > 0"
        />
      </div>
      <div v-if="this.checklistList_existance.ilast_ext == true">
        <checklistIlastExt
          :checklistInfo="this.checklistList.ilast_ext"
          v-if="this.checklistList.ilast_ext.length > 0"
        />
      </div>
      <div v-if="this.checklistList_existance.ilast_int == true">
        <checklistIlastInt
          :checklistInfo="this.checklistList.ilast_int"
          v-if="this.checklistList.ilast_int.length > 0"
        />
      </div>
      <div
        class="checklist-button-wrapper"
        v-if="
          this.id_insp_record != '' &&
          this.checklistList_existance.general == false &&
          this.checklistList_existance.ilast_ext == false &&
          this.checklistList_existance.ilast_int == false
        "
      >
        <v-ons-toolbar-button v-on:click="CREATE_NEW_CHECKLIST()">
          <i class="las la-plus"></i>
          <span>Create New Checklist Form</span>
        </v-ons-toolbar-button>
      </div>
      <div class="checklist-button-wrapper" v-if="this.id_insp_record == ''">
        <div class="page-content-message-wrapper">
          <i class="las la-search"></i>
          <span>
            Select inspection record<br />
            to view checklist sheet</span
          >
        </div>
      </div>
      <Loading v-if="isLoading == true" text="Loading" />
    </div>
  </div>
</template> 

<script>
//UI
import Loading from "@/components/app-structures/app-loading.vue";

//API
import axios from "/axios.js";
import moment from "moment";

//Components
import "devextreme/dist/css/dx.light.css";
import checklistGeneric from "@/views/Applications/TankList/Pages/Checklist/form-generic.vue";
import checklistIlastExt from "@/views/Applications/TankList/Pages/Checklist/form-ilast-ext.vue";
import checklistIlastInt from "@/views/Applications/TankList/Pages/Checklist/form-ilast-int.vue";

//DataGrid

//List
import { DxList } from "devextreme-vue/list";

export default {
  name: "ViewChecklistList",
  components: {
    checklistGeneric,
    checklistIlastExt,
    checklistIlastInt,
    DxList,
    Loading,
  },
  data() {
    return {
      id_tag: this.$route.params.id_tag,
      id_checklist: this.$route.params.id_checklist,
      id_insp_record: "",
      checklistList: {
        generic: [],
        ilast_ext: [],
        ilast_int: [],
      },
      checklistList_existance: {
        general: false,
        ilast_ext: false,
        ilast_int: false,
      },
      inspRecordList: {},
      isLoading: false,
      campaignList: {},
    };
  },
  computed: {},
  created() {
    if (this.$store.state.status.server == true) {
      this.FETCH_CAMPAIGN();
      this.FETCH_INSP_RECORD();
    }
  },
  mounted() {},
  watch: {
    //triggered whenever the route path changes
    $route() {
      this.CLEAR_CURRENT_VIEW();
      this.id_checklist = this.$route.params.id_checklist;
      this.id_insp_record = "";
    },
  },
  methods: {
    VIEW_CHECKLIST(id_insp_record) {
      this.CLEAR_CURRENT_VIEW();
      this.id_insp_record = id_insp_record;
      this.SCROLL_TOP("page-container-view");
      if (this.id_checklist == 1) {
        this.CHECK_EXIST_RESULT_GENERIC(id_insp_record);
      } else if (this.id_checklist == 2)
        this.CHECK_EXIST_RESULT_ILAST_EXT(id_insp_record);
      else if (this.id_checklist == 3)
        this.CHECK_EXIST_RESULT_ILAST_INT(id_insp_record);
      else console.log("view checklist failed");
    },
    CREATE_NEW_CHECKLIST() {
      console.log("CREATE NEW CHECKLIST SHEET: " + this.id_insp_record);
      var form = this.id_checklist;
      if (form == 1) {
        this.isLoading = true;
        axios({
          method: "post",
          url: "chk-generic/add-all-chkgeneric",
          headers: {
            Authorization:
              "Bearer " + JSON.parse(localStorage.getItem("token")),
          },
          data: {
            id_insp_record: this.id_insp_record,
          },
        })
          .then((res) => {
            if (res.status == 200) {
              console.log(res.data);
              console.log("NEW CHECKLIST SHEET CREATED (generic)");
              this.VIEW_CHECKLIST(this.id_insp_record);
            }
          })
          .catch((error) => {
            console.log(error);
          })
          .finally(() => {
            this.isLoading = false;
          });
      } else if (form == 2) {
        this.isLoading = true;
        axios({
          method: "post",
          url: "chk-ilast-ex/add-all-chkilastex",
          headers: {
            Authorization:
              "Bearer " + JSON.parse(localStorage.getItem("token")),
          },
          data: {
            id_insp_record: this.id_insp_record,
          },
        })
          .then((res) => {
            if (res.status == 200) {
              console.log(res.data);
              console.log("NEW CHECKLIST SHEET CREATED (ilast ext)");
              this.VIEW_CHECKLIST(this.id_insp_record);
            }
          })
          .catch((error) => {
            console.log(error);
          })
          .finally(() => {
            this.isLoading = false;
          });
      } else if (form == 3) {
        this.isLoading = true;
        axios({
          method: "post",
          url: "chk-ilast-in/add-all-chkilastin",
          headers: {
            Authorization:
              "Bearer " + JSON.parse(localStorage.getItem("token")),
          },
          data: {
            id_insp_record: this.id_insp_record,
          },
        })
          .then((res) => {
            if (res.status == 200) {
              console.log(res.data);
              console.log("NEW CHECKLIST SHEET CREATED (ilast int)");
              this.VIEW_CHECKLIST(this.id_insp_record);
            }
          })
          .catch((error) => {
            console.log(error);
          })
          .finally(() => {
            this.isLoading = false;
          });
      } else {
        console.log("err: wrong form parameter");
      }
    },
    FETCH_CHECKLIST_GENERIC(id_insp_record) {
      console.log("INSPECTION RECORD: " + id_insp_record);
      this.isLoading = true;
      axios({
        method: "post",
        url: "chk-generic/get-chkgeneric-by-insp-id",
        headers: {
          Authorization: "Bearer " + JSON.parse(localStorage.getItem("token")),
        },
        data: {
          id_insp_record: id_insp_record,
        },
      })
        .then((res) => {
          console.log("FETCH_CHECKLIST_GENERAL:");
          console.log(res);
          if (res.status == 200 && res.data) {
            this.checklistList.generic = res.data;
          }
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
    CHECK_EXIST_RESULT_GENERIC(id_insp_record) {
      console.log("CHECK RESULT EXIST (General): " + id_insp_record);
      this.isLoading = true;
      axios({
        method: "post",
        url: "chk-generic/check-chkgeneric",
        headers: {
          Authorization: "Bearer " + JSON.parse(localStorage.getItem("token")),
        },
        data: {
          id_insp_record: id_insp_record,
        },
      })
        .then((res) => {
          if (res.data == true) {
            this.checklistList_existance.general = true;
            this.FETCH_CHECKLIST_GENERIC(id_insp_record);
          } else {
            this.checklistList_existance.general = false;
            console.log("CHECK RESULT EXIST (General): FALSE");
          }
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
    FETCH_CHECKLIST_ILAST_EXT(id_insp_record) {
      this.isLoading = true;
      axios({
        method: "post",
        url: "chk-ilast-ex/get-chkilastex-by-insp-id",
        headers: {
          Authorization: "Bearer " + JSON.parse(localStorage.getItem("token")),
        },
        data: {
          id_insp_record: id_insp_record,
        },
      })
        .then((res) => {
          console.log("FETCH_CHECKLIST_ILAST_EXT:");
          console.log(res);
          if (res.status == 200 && res.data) {
            this.checklistList.ilast_ext = res.data;
          }
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
    CHECK_EXIST_RESULT_ILAST_EXT(id_insp_record) {
      console.log("CHECK RESULT EXIST (ilast ext): " + id_insp_record);
      this.isLoading = true;
      axios({
        method: "post",
        url: "chk-ilast-ex/check-chkilastex",
        headers: {
          Authorization: "Bearer " + JSON.parse(localStorage.getItem("token")),
        },
        data: {
          id_insp_record: id_insp_record,
        },
      })
        .then((res) => {
          if (res.data == true) {
            this.checklistList_existance.ilast_ext = true;
            this.FETCH_CHECKLIST_ILAST_EXT(id_insp_record);
          } else {
            this.checklistList_existance.ilast_ext = false;
            console.log("CHECK RESULT EXIST(ilast ext): FALSE");
          }
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
    FETCH_CHECKLIST_ILAST_INT(id_insp_record) {
      this.isLoading = true;
      axios({
        method: "post",
        url: "chk-ilast-in/get-chkilastin-by-insp-id",
        headers: {
          Authorization: "Bearer " + JSON.parse(localStorage.getItem("token")),
        },
        data: {
          id_insp_record: id_insp_record,
        },
      })
        .then((res) => {
          console.log("FETCH_CHECKLIST_ILAST_INT:");
          console.log(res);
          if (res.status == 200 && res.data) {
            this.checklistList.ilast_int = res.data;
          }
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
    CHECK_EXIST_RESULT_ILAST_INT(id_insp_record) {
      console.log("CHECK RESULT EXIST (ilast ext): " + id_insp_record);
      this.isLoading = true;
      axios({
        method: "post",
        url: "chk-ilast-in/check-chkilastin",
        headers: {
          Authorization: "Bearer " + JSON.parse(localStorage.getItem("token")),
        },
        data: {
          id_insp_record: id_insp_record,
        },
      })
        .then((res) => {
          if (res.data == true) {
            this.checklistList_existance.ilast_int = true;
            this.FETCH_CHECKLIST_ILAST_INT(id_insp_record);
          } else {
            this.checklistList_existance.ilast_int = false;
            console.log("CHECK RESULT EXIST(ilast int): FALSE");
          }
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
    FETCH_INSP_RECORD() {
      this.isLoading = true;
      var id_tag = this.$route.params.id_tag;
      axios({
        method: "post",
        url: "insp-record/insp-record-by-tank-id",
        headers: {
          Authorization: "Bearer " + JSON.parse(localStorage.getItem("token")),
        },
        data: {
          id_tag: id_tag,
        },
      })
        .then((res) => {
          // console.log("insp record:");
          // console.log(res.data);
          if (res.status == 200 && res.data) {
            this.inspRecordList = res.data;
          }
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
    DATE_FORMAT(d) {
      return moment(d).format("LL");
    },
    FETCH_CAMPAIGN() {
      this.isLoading = true;
      axios({
        method: "get",
        url: "/insp-record/campaign-list",
        headers: {
          Authorization: "Bearer " + JSON.parse(localStorage.getItem("token")),
        },
      })
        .then((res) => {
          console.log(res);
          if (res.status == 200 && res.data) {
            this.campaignList = res.data;
          }
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
    SET_CAMPAIGN(id) {
      if (this.campaignList) {
        var data = this.campaignList.filter(function (e) {
          return e.id_campaign == id;
        });
        // console.log(data);
        return data[0].campaign_desc;
      }
    },
    SCROLL_TOP(container_id) {
      document
        .getElementById(container_id)
        .scroll({ top: 0, behavior: "smooth" });
    },
    CLEAR_CURRENT_VIEW() {
      this.checklistList = {
        generic: [],
        ilast_ext: [],
        ilast_int: [],
      };
      this.checklistList_existance = {
        general: false,
        ilast_ext: false,
        ilast_int: false,
      };
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/style/main.scss";

.page-container {
  height: calc(100vh - 139px);
  overflow-y: hidden;
  display: grid;
  grid-template-columns: 300px calc(100% - 300px);
  width: 100%;
  background-color: #d9d9d9;
}

.page-section {
  padding: 20px;
  overflow-y: scroll;
  position: relative;
}
.page-section:last-child {
  padding-bottom: 20px;
}

.tab-wrapper {
  height: 48px;
}
.vue-tabs-chrome {
  padding-top: 10px;
  background-color: #d9d9d9;
  font-size: 14px;
}

.insp-record-header {
  font-size: 16px;
  padding: 10px;
  background-color: #140a4b;
  color: #fff;
}

.dx-list-item-content::before {
  content: none;
}

.page-section-label {
  font-size: 16px;
  padding: 10px;
  background-color: #140a4b;
  color: #fff;
  border: 1px solid #000;
}

.app-loading {
  background-color: rgba(0, 0, 0, 0) !important;
}

.toolbar-button {
  width: fit-content;
  background-color: #f6f6f6;
  padding: 0;
  padding-right: 15px;
  height: 34px;
  border: 0px;
  color: #303030;
}

.toolbar-button:hover,
.toolbar-button:active {
  background-color: #140a4b;
  color: #fff;
}

.checklist-button-wrapper {
  width: 100%;
  height: calc(100vh - 179px);
  display: flex;
  justify-content: center;
  align-items: center;
}

.dx-list .dx-empty-message,
.dx-list-item-content {
  padding: 10px;
}
</style>