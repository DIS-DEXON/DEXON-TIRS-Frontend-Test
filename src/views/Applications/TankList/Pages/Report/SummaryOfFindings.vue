<template>
  <div
    class="page-container"
    :class="[
      pagePanelHiding == false ? 'page-container' : 'page-container-hide',
    ]"
  >
    <InspectionRecordPanel @showHidePanel="SHOW_HIDE_PANEL" @viewItem="VIEW_ITEM" />
    <div class="list-page" v-if="this.id_inspection_record != ''">
      <v-ons-list>
        <v-ons-list-header>
          Inspection Details of
          <b>{{ DATE_FORMAT(current_view.inspection_date) }}</b>
        </v-ons-list-header>
      </v-ons-list>
      <div>
        <DxDataGrid
          id="data-table-cml"
          key-expr="id_thk"
          :data-source="mflBottom"
          :element-attr="dataGridAttributes"
          :selection="{ mode: 'single' }"
          :hover-state-enabled="true"
          :allow-column-reordering="true"
          :column-hiding-enabled="true"
          :show-borders="true"
          :show-row-lines="true"
          :row-alternation-enabled="false"
          :word-wrap-enabled="true"
          @row-inserted="CREATE_MFL"
          @row-updated="UPDATE_MFL"
          @row-removed="DELETE_MFL"
        >
          <DxFilterRow :visible="true" />
          <DxHeaderFilter :visible="true" />

          <DxEditing
            :allow-updating="true"
            :allow-deleting="true"
            :allow-adding="IS_VISIBLE_ADD()"
            :use-icons="true"
            mode="row"
          />

          <DxColumn data-field="plate_no" caption="Plate no" :width="70" :editor-options="{ placeholder: 'Plate No' }" />

          <DxColumn data-field="t_nom" caption="tnom (mm)" :width="70" :editor-options="{ placeholder: 'tnom (mm)' }" />

          <DxColumn data-field="metal_loss_top" caption="%Metal loss (top side)" :width="70" :editor-options="{ placeholder: 'Metal Loss' }" />

          <DxColumn data-field="metal_loss_bottom" caption="%Metal loss (bottom side)" :width="70" :editor-options="{ placeholder: 'Metal Loss' }" />

          <DxColumn
            data-field="lowest_remaining_thk_top"
            caption="Remaining thk top side (mm)"
            :allow-editing="false"
            :width="70"
            :editor-options="{ placeholder: 'Thickness' }"
          />

          <DxColumn
            data-field="lowest_remaining_thk_bottom"
            caption="Remaining thk bottom side (mm)"
            :allow-editing="false"
            :width="70"
            :editor-options="{ placeholder: 'Thickness' }"
          />

          <DxColumn data-field="defect_x" caption="X (mm)" :width="75" :editor-options="{ placeholder: 'X' }" />

          <DxColumn data-field="defect_y" caption="Y (mm)" :width="75" :editor-options="{ placeholder: 'X' }" />

          <DxColumn data-field="type_of_repair" caption="Type of repair" :editor-options="{ placeholder: 'Select' }">
            <DxLookup :data-source="typeOfRepair" display-expr="code" value-expr="code" />
          </DxColumn>

          <DxColumn data-field="repair_width" caption="Width (mm)" :width="70" :editor-options="{ placeholder: 'Width' }" />

          <DxColumn data-field="repair_length" caption="Length (mm)" :width="70" :editor-options="{ placeholder: 'Length' }" />

          <DxColumn data-field="repair_thick" caption="Thick (mm)" :width="70" :editor-options="{ placeholder: 'Thick' }" />

          <DxColumn data-field="repair_radius" caption="Radius (mm)" :width="70" :editor-options="{ placeholder: 'Radius' }" />

          <DxColumn data-field="repair_status" caption="Repair status" :width="70" :editor-options="{ placeholder: 'Select' }" >
            <DxLookup :data-source="repairStatus" display-expr="code" value-expr="code" />
          </DxColumn>

          <DxColumn type="buttons">
            <!-- <DxButton hint="View CML" icon="search" :on-click="VIEW_CML" /> -->
            <DxButton name="edit" hint="Edit" icon="edit" />
            <DxButton name="delete" hint="Delete" icon="trash" />
          </DxColumn>

          <!-- Configuration goes here -->
          <!-- <DxFilterRow :visible="true" /> -->
          <DxScrolling mode="standard" />
          <DxSearchPanel :visible="false" />
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
      <PageLoading v-if="isLoading == true" text="Loading. . ." />
      <div class="table-wrapper" v-if="this.dataMRT!=null">
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
                  <input v-model="dataMRT.bt_age_of_tank" @focusout="UPDATE_MRT()" />
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
                  <textarea v-model="dataMRT.bt_recommedation" @focusout="UPDATE_MRT()" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- <div
        class="list-page"
        style="margin-top:20px"
        v-if="this.dataMRT == null && this.id_inspection_record != ''"
      >
        <div class="center-box-wrapper">
          <v-ons-toolbar-button v-on:click="CREATE_MRT()">
            <i class="las la-plus"></i>
            <span>Create New MRT Result</span>
          </v-ons-toolbar-button>
        </div>
      </div> -->

      <!-- <div class="app-instruction" style="margin-top:20px">
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
      </div> -->
    </div>
    <SelectInspRecord v-if="this.id_inspection_record == ''" />
  </div>
</template> 

<script>
//API
import axios from "/axios.js";
import moment from "moment";

//Components
import "devextreme/dist/css/dx.light.css";
import InspectionRecordPanel from "@/views/Applications/TankList/Pages/inspection-record-panel.vue";
import SelectInspRecord from "@/components/select-insp-record.vue";
//import appInstruction from "@/components/app-structures/app-instruction-dialog.vue";
import PageLoading from "@/components/app-structures/app-loading.vue";

//DataGrid
import { Workbook } from "exceljs";
import saveAs from "file-saver";
import { exportDataGrid } from "devextreme/excel_exporter";
import {
  DxDataGrid,
  DxSearchPanel,
  DxPaging,
  DxPager,
  DxScrolling,
  DxColumn,
  DxEditing,
  DxButton,
  DxHeaderFilter,
  DxFilterRow,
  DxLookup
} from "devextreme-vue/data-grid";

//FileUpload
//import { DxFileUploader } from "devextreme-vue/file-uploader";
//import { DxButton } from 'devextreme-vue/button';
//import { DxItem } from "devextreme-vue/form";

const fileUploaderRef = "fu";
const imgRef = "img";

export default {
  name: "ViewProjectList",
  components: {
    //VueTabsChrome,
    SelectInspRecord,
    PageLoading,
    //appInstruction,
    DxDataGrid,
    DxSearchPanel,
    DxPaging,
    DxPager,
    DxScrolling,
    DxColumn,
    DxEditing,
    DxButton,
    DxHeaderFilter,
    DxFilterRow,
    InspectionRecordPanel,
    DxLookup
  },
  created() {
    this.$store.commit("UPDATE_CURRENT_PAGENAME", {
      subpageName: "Thickness Messurement",
      subpageInnerName: "MFL - Bottom"
    });
  },
  data() {
    return {
      mflBottom: {},
      inspRecordList: {},
      campaignList: {},
      isLoading: false,
      fileUploaderRef,
      imgRef,
      imgDwg: "",
      file: [],
      isInitEdit: 0,
      id_component: 0,
      id_inspection_record: 0,
      dataGridAttributes: {
        class: "data-grid-thk-style"
      },
      pagePanelHiding: false,
      current_view: {},
      typeOfRepair: [
        { code: "Patch Plate" },
        { code: "Recoating" },
        { code: "Deposited weld" }
      ],
      repairStatus: [{ code: "Yes" }, { code: "No" }],
      dataMRT: null
    };
  },
  computed: {
    baseURL() {
      var mode = this.$store.state.mode;
      if (mode == "dev") return this.$store.state.modeURL.dev;
      else if (mode == "prod") return this.$store.state.modeURL.prod;
      else return console.log("develpment mode set up incorrect.");
    }
  },
  methods: {
    EXPORT_DATA(e) {
      const workbook = new Workbook();
      const worksheet = workbook.addWorksheet("Projects");
      exportDataGrid({
        worksheet: worksheet,
        component: e.component
      }).then(function() {
        workbook.xlsx.writeBuffer().then(function(buffer) {
          saveAs(
            new Blob([buffer], { type: "application/octet-stream" }),
            "Projects.xlsx"
          );
        });
      });
      e.cancel = true;
    },
    VIEW_ITEM(item) {
      this.dataMRT = null;
      this.id_inspection_record = item.id_inspection_record;
      this.current_view = item;
      console.warn(this.id_inspection_record);
      this.FETCH_MFL(this.current_view);
      this.FETCH_MRT();
    },
    FETCH_MFL(i) {
      this.isLoading = true;
      axios({
        method: "post",
        url: "mfl-bottom-thickness/get-mfl-bottom-data-by-insp-id",
        headers: {
          Authorization: "Bearer " + JSON.parse(localStorage.getItem("token"))
        },
        data: {
          id_inspection_record: i.id_inspection_record
        }
      })
        .then(res => {
          console.log("mfl:");
          console.log(res.data);
          if (res.status == 200 && res.data) {
            this.mflBottom = res.data;
          }
        })
        .catch(error => {
          console.log(error);
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
    CREATE_MFL(e) {
      this.isLoading = true;
      var id_tag = this.$route.params.id_tag;
      e.data.id_tag = id_tag;
      e.data.id_thk = 0;
      e.data.id_inspection_record = this.id_inspection_record;
      console.log(e.data);
      axios({
        method: "post",
        url: "mfl-bottom-thickness/add-mfl-bottom-data",
        headers: {
          Authorization: "Bearer " + JSON.parse(localStorage.getItem("token"))
        },
        data: e.data
      })
        .then(res => {
          console.log(res);
          if (res.status == 200 && res.data) {
            console.log(res.data);
            var item = [];
            item.id_inspection_record = this.id_inspection_record;
            this.VIEW_ITEM(item);
          }
        })
        .catch(error => {
          console.log(error);
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
    UPDATE_MFL(e) {
      console.log(e.data);
      axios({
        method: "put",
        url: "mfl-bottom-thickness/edit-mfl-bottom-data",
        headers: {
          Authorization: "Bearer " + JSON.parse(localStorage.getItem("token"))
        },
        data: e.data
      })
        .then(res => {
          console.log(res);
          if (res.status == 200 && res.data) {
            console.log(res.data);
            var item = [];
            item.id_inspection_record = this.id_inspection_record;
            this.VIEW_ITEM(item);
          }
        })
        .catch(error => {
          console.log(error);
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
    DELETE_MFL(e) {
      console.log(e);
      axios({
        method: "delete",
        url: "mfl-bottom-thickness/delete-mfl-bottom-data",
        headers: {
          Authorization: "Bearer " + JSON.parse(localStorage.getItem("token"))
        },
        data: {
          id_thk: e.key
        }
      })
        .then(res => {
          console.log(res.data);
          if (res.status == 200 && res.data) {
            console.log(res.data);
            var item = [];
            item.id_inspection_record = this.id_inspection_record;
            this.VIEW_ITEM(item);
          }
        })
        .catch(error => {
          console.log(error);
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
    IS_VISIBLE_ADD() {
      if (this.id_inspection_record == 0) {
        return false;
      } else {
        return true;
      }
    },
    SHOW_HIDE_PANEL() {
      this.pagePanelHiding = !this.pagePanelHiding;
    },
    DATE_FORMAT(d) {
      return moment(d).format("LL");
    },
    FETCH_MRT() {
      this.isLoading = true;
      axios({
        method: "post",
        url: "mrt/get-mrt",
        headers: {
          Authorization: "Bearer " + JSON.parse(localStorage.getItem("token"))
        },
        data: {
          id_inspection_record: this.id_inspection_record,
          id_tag: this.$route.params.id_tag
        }
      })
        .then(res => {
          console.log("MRT result:");
          console.log(res.data);
          if (res.status == 200 && res.data) {
            this.dataMRT = res.data[0];
            this.mrt_status = 200;
          }
        })
        .catch(error => {
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
          Authorization: "Bearer " + JSON.parse(localStorage.getItem("token"))
        },
        data: {
          id_inspection_record: this.id_inspection_record,
          id_tag: this.$route.params.id_tag
        }
      })
        .then(res => {
          if (res.status == 200 && res.data) {
            console.log("MRT Created");
            console.log(res.data);
            this.VIEW_ITEM(this.current_view);
          }
        })
        .catch(error => {
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
          Authorization: "Bearer " + JSON.parse(localStorage.getItem("token"))
        },
        data: this.dataMRT
      })
        .then(res => {
          if (res.status == 200 && res.data) {
            console.log("MRT Updated");
            console.log(res.data);
            this.FETCH_MRT();
          }
        })
        .catch(error => {
          console.log(error);
        })
        .finally(() => {
          this.isLoading = false;
        });
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/style/main.scss";

.page-container {
  width: 100%;
  height: 100%;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 201px calc(100% - 201px);
}

.page-container-hide {
  grid-template-columns: 41px calc(100% - 41px);
}
.list-page {
  position: relative;
  overflow-y: auto;
  .list {
    margin: -20px -20px 20px -20px;
  }
}

#data-grid-style {
  width: 100%;
}
.report-sheet {
  max-width: 100%;
  width: 100%;
  font-family: $web-default-font;
  box-shadow: none;
  padding: 0 !important;
  margin-top: 0;
  margin-bottom: 0;
  margin-right: 0;
  .report-container {
    display: grid;
    grid-template-columns: 100%;
    grid-gap: 20px;
    width: calc(100% - 0px);
    margin-right: 0;
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
  @media (max-width: 1130px) {
    .report-container {
      display: inline;
      .sheet-body {
        margin-bottom: 15px;
        .form-item {
          grid-template-columns: 200px calc(100% - 300px) 100px;
        }
      }
    }
  }
}
.table-wrapper {
  margin-top: 20px;
}
</style>