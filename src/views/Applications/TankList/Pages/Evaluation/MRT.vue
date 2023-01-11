<template>
  <div
    class="page-container"
    :class="[
      pagePanelHiding == false ? 'page-container' : 'page-container-hide',
    ]"
  >
    <InspectionRecordPanel
      @showHidePanel="SHOW_HIDE_PANEL"
      @viewItem="VIEW_ITEM"
    />
    <div class="list-page" v-if="this.dataMRT">
      <v-ons-list>
        <v-ons-list-header
          >Inspection Details of
          <b>
            {{ DATE_FORMAT(current_view.inspection_date) }}</b
          ></v-ons-list-header
        >
      </v-ons-list>
      <div class="report-sheet">
        <div class="report-container">
          <div class="sheet-body">
            <div class="section-label">
              <label>Bottom Plate</label>
            </div>
            <div class="form-item">
              <div class="form-item-label">
                <label>RTbc</label>
              </div>
              <div class="form-item-value">
                <input v-model="dataMRT.bt_RTbc" @focusout="UPDATE_MRT()" />
              </div>
              <div class="form-item-unit">
                <label>mm</label>
              </div>
            </div>
            <div class="form-item">
              <div class="form-item-label">
                <label>RTip</label>
              </div>
              <div class="form-item-value">
                <input v-model="dataMRT.bt_RTip" @focusout="UPDATE_MRT()" />
              </div>
              <div class="form-item-unit">
                <label>mm</label>
              </div>
            </div>
            <div class="form-item">
              <div class="form-item-label">
                <label>Or</label>
              </div>
              <div class="form-item-value">
                <input v-model="dataMRT.bt_Or" @focusout="UPDATE_MRT()" />
              </div>
              <div class="form-item-unit">
                <label>years</label>
              </div>
            </div>
            <div class="form-item">
              <div class="form-item-label">
                <label>StPr</label>
              </div>
              <div class="form-item-value">
                <input v-model="dataMRT.bt_StPr" @focusout="UPDATE_MRT()" />
              </div>
              <div class="form-item-unit">
                <label>mm/yr</label>
              </div>
            </div>
            <div class="form-item">
              <div class="form-item-label">
                <label>UPr</label>
              </div>
              <div class="form-item-value">
                <input v-model="dataMRT.bt_UPr" @focusout="UPDATE_MRT()" />
              </div>
              <div class="form-item-unit">
                <label>mm/yr</label>
              </div>
            </div>
            <div class="form-item">
              <div class="form-item-label">
                <label>Age of Tank</label>
              </div>
              <div class="form-item-value">
                <input
                  v-model="dataMRT.bt_age_of_tank"
                  @focusout="UPDATE_MRT()"
                />
              </div>
              <div class="form-item-unit">
                <label>years</label>
              </div>
            </div>
            <div class="form-item">
              <div class="form-item-label">
                <label>MRT</label>
              </div>
              <div class="form-item-value">
                <input v-model="dataMRT.bt_MRT" disabled />
              </div>
              <div class="form-item-unit">
                <label>mm</label>
              </div>
            </div>
            <div class="form-item">
              <div class="form-item-label">
                <label>tmin</label>
              </div>
              <div class="form-item-value">
                <input v-model="dataMRT.bt_tmin" disabled />
              </div>
              <div class="form-item-unit">
                <label>mm</label>
              </div>
            </div>
            <div class="form-item">
              <div class="form-item-label">
                <label>Result</label>
              </div>
              <div class="form-item-value">
                <input v-model="dataMRT.bt_result" disabled />
              </div>
              <div class="form-item-unit">
                <label></label>
              </div>
            </div>
            <div class="form-item" style="grid-template-rows: 101px">
              <div class="form-item-label">
                <label>Recommendation</label>
              </div>
              <div class="form-item-textarea">
                <textarea
                  v-model="dataMRT.bt_recommedation"
                  @focusout="UPDATE_MRT()"
                />
              </div>
            </div>
          </div>
          <div class="sheet-body">
            <div class="section-label">
              <label>Annular Plate</label>
            </div>
            <div class="form-item">
              <div class="form-item-label">
                <label>RTbc</label>
              </div>
              <div class="form-item-value">
                <input v-model="dataMRT.an_RTbc" @focusout="UPDATE_MRT()" />
              </div>
              <div class="form-item-unit">
                <label>mm</label>
              </div>
            </div>
            <div class="form-item">
              <div class="form-item-label">
                <label>RTip</label>
              </div>
              <div class="form-item-value">
                <input v-model="dataMRT.an_RTip" @focusout="UPDATE_MRT()" />
              </div>
              <div class="form-item-unit">
                <label>mm</label>
              </div>
            </div>
            <div class="form-item">
              <div class="form-item-label">
                <label>Or</label>
              </div>
              <div class="form-item-value">
                <input v-model="dataMRT.an_Or" @focusout="UPDATE_MRT()" />
              </div>
              <div class="form-item-unit">
                <label>years</label>
              </div>
            </div>
            <div class="form-item">
              <div class="form-item-label">
                <label>StPr</label>
              </div>
              <div class="form-item-value">
                <input v-model="dataMRT.an_StPr" @focusout="UPDATE_MRT()" />
              </div>
              <div class="form-item-unit">
                <label>mm/yr</label>
              </div>
            </div>
            <div class="form-item">
              <div class="form-item-label">
                <label>UPr</label>
              </div>
              <div class="form-item-value">
                <input v-model="dataMRT.an_UPr" @focusout="UPDATE_MRT()" />
              </div>
              <div class="form-item-unit">
                <label>mm/yr</label>
              </div>
            </div>
            <div class="form-item">
              <div class="form-item-label">
                <label>Age of Tank</label>
              </div>
              <div class="form-item-value">
                <input
                  v-model="dataMRT.an_age_of_tank"
                  @focusout="UPDATE_MRT()"
                />
              </div>
              <div class="form-item-unit">
                <label>years</label>
              </div>
            </div>
            <div class="form-item">
              <div class="form-item-label">
                <label>MRT</label>
              </div>
              <div class="form-item-value">
                <input v-model="dataMRT.an_MRT" disabled />
              </div>
              <div class="form-item-unit">
                <label>mm</label>
              </div>
            </div>
            <div class="form-item">
              <div class="form-item-label">
                <label>tmin</label>
              </div>
              <div class="form-item-value">
                <input v-model="dataMRT.an_tmin" disabled />
              </div>
              <div class="form-item-unit">
                <label>mm</label>
              </div>
            </div>
            <div class="form-item">
              <div class="form-item-label">
                <label>Result</label>
              </div>
              <div class="form-item-value">
                <input v-model="dataMRT.an_result" disabled />
              </div>
              <div class="form-item-unit">
                <label></label>
              </div>
            </div>
            <div class="form-item" style="grid-template-rows: 101px">
              <div class="form-item-label">
                <label>Recommendation</label>
              </div>
              <div class="form-item-textarea">
                <textarea
                  v-model="dataMRT.an_recommedation"
                  @focusout="UPDATE_MRT()"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="app-instruction">
        <appInstruction
          title="Instruction"
          desc="Local deviations from the theoretical shape (for example, weld discontinuities and flat spots) shall be limited as follows."
        >
          <ol>
            <li>
              Deviations (peaking) at vertical weld joints shall not exceed 13
              mm (1/2 in.). Peaking at vertical weld joints shall be determined
              using a horizontal sweep board 900 mm (36 in.) long. The sweep
              board shall be made to the nominal radius of the tank.
            </li>
            <li>
              Deviations (banding) at horizontal weld joints shall not exceed 13
              mm (1/2 in.). Banding at horizontal weld joints shall be
              determined using a straight edge vertical sweep board 900 mm (36
              in.) long.
            </li>
            <li>
              DFlat spots measured in the vertical plane shall not exceed 1/200
              of the total height.
            </li>
          </ol>
        </appInstruction>
      </div>
    </div>
    <div
      class="list-page"
      v-if="!this.dataMRT && this.id_inspection_record != ''"
    >
      <div class="center-box-wrapper">
        <v-ons-toolbar-button v-on:click="CREATE_MRT()">
          <i class="las la-plus"></i>
          <span>Create New MRT Result</span>
        </v-ons-toolbar-button>
      </div>
    </div>
    <div class="list-page" v-if="this.id_inspection_record == ''">
      <div class="center-box-wrapper">
        <div class="page-content-message-wrapper">
          <i class="las la-search"></i>
          <span>
            Select inspection record <br />
            to view information</span
          >
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
import "devextreme/dist/css/dx.light.css";
// import innerPageName from "@/components/app-structures/app-inner-pagename.vue";
import appInstruction from "@/components/app-structures/app-instruction-dialog.vue";
import InspectionRecordPanel from "@/views/Applications/TankList/Pages/inspection-record-panel.vue";

//List
// import { DxList } from "devextreme-vue/list";

//FileUpload
//import { DxFileUploader } from "devextreme-vue/file-uploader";
//import { DxButton } from 'devextreme-vue/button';
//import { DxItem } from "devextreme-vue/form";

export default {
  name: "ViewProjectList",
  components: {
    //VueTabsChrome,
    // DxList,
    appInstruction,
    InspectionRecordPanel,
  },
  created() {
    this.$store.commit("UPDATE_CURRENT_INAPP", {
      name: "Tank Management",
      icon: "/img/icon_menu/tank/tank.png",
    });
    this.$store.commit("UPDATE_CURRENT_PAGENAME", {
      subpageName: "Evaluation",
      subpageInnerName: "MRT",
    });
  },
  data() {
    return {
      dataMRT: null,
      inspRecordList: {},
      campaignList: {},
      isLoading: false,
      id_inspection_record: 0,
      current_view: null,
      pagePanelHiding: false,
    };
  },
  computed: {
    baseURL() {
      var mode = this.$store.state.mode;
      if (mode == "dev") return this.$store.state.modeURL.dev;
      else if (mode == "prod") return this.$store.state.modeURL.prod;
      else return console.log("develpment mode set up incorrect.");
    },
  },
  methods: {
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
    VIEW_ITEM(item) {
      this.id_inspection_record = item.id_inspection_record;
      this.current_view = item;
      axios({
        method: "post",
        url: "mrt/get-mrt",
        headers: {
          Authorization: "Bearer " + JSON.parse(localStorage.getItem("token")),
        },
        data: {
          id_inspection_record: item.id_inspection_record,
          id_tag: this.$route.params.id_tag,
        },
      })
        .then((res) => {
          console.log("MRT result:");
          console.log(res.data);
          if (res.status == 200 && res.data) {
            this.dataMRT = res.data[0];
          }
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
    CREATE_MRT() {
      axios({
        method: "post",
        url: "mrt/add-mrt",
        headers: {
          Authorization: "Bearer " + JSON.parse(localStorage.getItem("token")),
        },
        data: {
          id_inspection_record: this.id_inspection_record,
          id_tag: this.$route.params.id_tag,
        },
      })
        .then((res) => {
          if (res.status == 200 && res.data) {
            console.log("MRT Created");
            console.log(res.data);
            this.VIEW_MRT(this.id_inspection_record);
          }
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
    UPDATE_MRT() {
      axios({
        method: "put",
        url: "mrt/edit-mrt",
        headers: {
          Authorization: "Bearer " + JSON.parse(localStorage.getItem("token")),
        },
        data: this.dataMRT,
      })
        .then((res) => {
          if (res.status == 200 && res.data) {
            console.log("MRT Updated");
            console.log(res.data);
            this.VIEW_MRT(this.id_inspection_record);
          }
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
    SHOW_HIDE_PANEL() {
      this.pagePanelHiding = !this.pagePanelHiding;
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
  width: 100%;
  height: 100%;
  margin: 0 auto;
  // padding: 20px;
  display: grid;
  grid-template-columns: 201px calc(100% - 201px);
}

.page-container-hide {
  grid-template-columns: 41px calc(100% - 41px);
}

.section-label {
  label {
    font-size: 12px !important;
    text-transform: none !important;
  }
}

.dx-list-item-content::before {
  content: none;
}

#data-grid-style {
  width: 100%;
}

.list-page {
  position: relative;
}

.app-instruction {
  margin-top: 20px;
}

.report-sheet {
  max-width: 100%;
  width: 100%;
  font-family: $web-default-font;
  box-shadow: none;
  padding: 0 !important;
  margin-top: 0;
  margin-bottom: 0;
  .report-container {
    display: grid;
    grid-template-columns: 50% 50%;
    grid-gap: 20px;
    width: calc(100% - 20px);

    .header {
      .title {
        grid-column: span 4;
      }
    }
    .sheet-body {
      grid-template-columns: 100%;
      border-radius: 6px;
      overflow: hidden;
      .form-item {
        display: grid;
        grid-template-columns: 150px calc(100% - 250px) 100px;
        grid-template-rows: 35px;
        .form-item-label {
        }
        .form-item-value {
          grid-column: span 1;
          border-right: 0;
          input {
            text-align: center;
            // margin-right: 20px;
          }
          label {
            margin: 0 auto;
            font-weight: 600;
          }
        }
        .form-item-textarea {
          textarea {
            height: auto;
            max-height: 80px;
            overflow-y: auto;
          }
        }
      }
      .form-item-picture-log .img-box {
        height: 244px;
      }
    }
  }
}

input:disabled {
  background-color: #140a4b0b;
  color: $dexon-primary-blue;
  font-weight: 700;
}

.list-page {
  position: relative;
  overflow-y: auto;
  .list {
    margin: -20px -20px 20px -20px;
  }
}
</style>