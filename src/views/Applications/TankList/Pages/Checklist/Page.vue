<template>
  <div class="page-container">
    <div id="report-sheet" style="width: 300px; height: 100%;">
      <div class="report-container" style="height: 100%">
        <div class="sheet-body" style="display: block; height: 100%">
          <div class="insp-record-header">Inspection Record</div>
          <DxList
            :data-source="inspRecordList"
            height="100%"
          >
            <template #item="{ data: item }">
              <div class="grid-insp-record">
                <div class="contents">
                  {{ DATE_FORMAT(item.inspection_date) }}<br/>
                  {{ item.id_campaign }}
                </div>
                <div class="contents">
                  <v-ons-toolbar-button class="btn" v-on:click="VIEW_CHECKLIST(item.id_inspection_record)" style="width: 50px; background-color: #f6f6f6; color: #303030; padding: 5px 0; text-align: right;">
                    <i class="las la-search"></i>
                  </v-ons-toolbar-button>
                </div>
              </div>
            </template>
          </DxList>
        </div>
      </div>
    </div>
    <div id="report-sheet">
      <div class="report-container">
        <div class="sheet-body">
      <div class="tab-wrapper">
        <vue-tabs-chrome v-model="tabCurrent" :tabs="tabs" />
      </div>
      <div class="page-section info-tab-display" v-if="tabCurrent == 'generic'">

      </div>
      <div v-if="tabCurrent == 'ilast-ext'">

      </div>
      <div v-if="tabCurrent == 'ilast-in'">

      </div>
        </div>
      </div>
    </div>
  </div>
</template> 

<script>
//API
import axios from "/axios.js";
import moment from "moment";

//Components
import VueTabsChrome from "vue-tabs-chrome";
import TableDrawing from '../Information/table-drawing.vue';
import "devextreme/dist/css/dx.light.css";
//DataGrid

//List
import {
  DxList,
} from "devextreme-vue/list";

export default {
  name: "ViewProjectList",
  components: {
    VueTabsChrome,
    DxList,
  },
  created() {
    TableDrawing
    if (this.$store.state.status.server == true) {
      this.FETCH_INSP_RECORD();
      this.FETCH_GENERIC();
    }
  },
  data() {
    return {
      genericList: {},
      inspRecordList: {},
      tabCurrent: "generic",
      tabs: [
        {
          label: "Generic",
          key: "generic",
          closable: false,
        },
        {
          label: "ILAST External",
          key: "ilast-ext",
          closable: false,
        },
        {
          label: "ILAST Internal",
          key: "ilast-in",
          closable: false,
        },
      ],
      isLoading: false,
    };
  },
  computed: {
  
  },
  methods: {
    FETCH_GENERIC() {
      this.isLoading = true;
      //var id_tag = this.$route.params.id_tag;
      axios({
        method: "post",
        url: "chk-generic/get-chkgeneric-by-insp-id",
        headers: {
          Authorization: "Bearer " + JSON.parse(localStorage.getItem("token")),
        },
        data: {
          id_insp_record: 0,
        },
      })
        .then((res) => {
          console.log("generic:");
          console.log(res);
          if (res.status == 200 && res.data) {
            this.genericList = res.data;
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
          console.log("insp record:");
          console.log(res.data);
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
    VIEW_CHECKLIST(id) {
      console.log(id);
    },
    DATE_FORMAT(d) {
      return moment(d).format("LL");
    }
  },
};
</script>

<style lang="scss" scoped>
@import "@/style/main.scss";

.page-container {
  width: 100%;
  height: 100%;

  overflow-y: scroll;
}
#report-sheet {
  max-width: 100%;
  width: 100%;
  font-family: $web-default-font;
  box-shadow: none;
  padding: 0 !important;
  margin-top: 0;
  margin-bottom: 0;
  .report-container {
    .header {
      .title {
        grid-column: span 4;
      }
    }
    .sheet-body {
      grid-template-columns: 50% 50%;
      .form-item {
        display: grid;
        grid-template-columns: 220px calc(100% - 220px);
        grid-template-rows: 35px;
        .form-item-label {
          label {
            // text-transform: capitalize;
          }
        }
        .form-item-value {
          grid-column: span 1;
          label {
            margin: 0 auto;
            font-weight: 600;
          }
        }
      }
      .form-item-picture-log .img-box {
        height: 244px;
      }
    }
  }
}

.page-section {
  padding: 20px;
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
.info-tab-display {
  display: flex;
}

.insp-record-header {
  font-size: 16px;
  padding: 10px; 
  background-color: #140a4b; 
  color: #fff;
}

.grid-insp-record {
  display: grid;
  grid-template-columns: 1fr 1fr;
  padding: 10px;
  border-bottom: 1px solid #000;
}

.dx-list-item-content::before {
  content: none;
}
</style>