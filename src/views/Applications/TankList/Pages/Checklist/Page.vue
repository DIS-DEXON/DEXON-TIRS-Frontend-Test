<template>
  <div class="page-container">
    <div class="list-panel">
      <div class="column-header">Inspection Record</div>
      <DxList :data-source="inspRecordList">
        <template #item="{ data: item }">
          <div class="list-item-wrapper">
            <div class="contents">
              {{ DATE_FORMAT(item.inspection_date) }}<br />
              ID Campaign: {{ item.id_campaign }}
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
    <div class="page-section">
      <div v-if="this.checklistList.generic.length > 0">
        <checklistGeneric :checklistInfo="this.checklistList.generic" />
      </div>
      <div v-if="this.checklistList.ilast_ext.length > 0">
        <checklistIlastExt :checklistInfo="this.checklistList.ilast_ext" />
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

//DataGrid

//List
import { DxList } from "devextreme-vue/list";

export default {
  name: "ViewChecklistList",
  components: {
    checklistGeneric,
    checklistIlastExt,
    DxList,
    Loading,
  },
  data() {
    return {
      id_tag: this.$route.params.id_tag,
      id_checklist: this.$route.params.id_checklist,
      checklistList: {
        generic: [],
        ilast_ext: [],
        ilast_int: [],
      },
      inspRecordList: {},
      isLoading: false,
    };
  },
  computed: {},
  created() {
    if (this.$store.state.status.server == true) {
      this.FETCH_INSP_RECORD();
    }
  },
  mounted() {},
  watch: {
    //triggered whenever the route path changes
    $route() {
      this.CLEAR_CURRENT_VIEW();
      this.id_checklist = this.$route.params.id_checklist; //
    },
  },
  methods: {
    VIEW_CHECKLIST(id_insp_record) {
      this.CLEAR_CURRENT_VIEW();
      if (this.id_checklist == 1) this.FETCH_CHECKLIST_GENERIC(id_insp_record);
      else if (this.id_checklist == 2)
        this.FETCH_CHECKLIST_ILAST_EXT(id_insp_record);
      else if (this.id_checklist == 3)
        this.FETCH_CHECKLIST_ILAST_INT(id_insp_record);
      else console.log("view checklist failed");
    },
    FETCH_CHECKLIST_GENERIC(id_insp_record) {
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
    FETCH_CHECKLIST_ILAST_INT(id_insp_record) {
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
    CLEAR_CURRENT_VIEW() {
      this.checklistList = {
        generic: [],
        ilast_ext: [],
        ilast_int: [],
      };
    },
    DATE_FORMAT(d) {
      return moment(d).format("LL");
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
</style>