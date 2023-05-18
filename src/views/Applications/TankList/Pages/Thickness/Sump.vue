<template>
  <div class="page-container">
    <div class="tab-wrapper">
      <vue-tabs-chrome v-model="tabCurrent" :tabs="tabs" />
    </div>
    <div class="page-section" v-if="tabCurrent == 'A1'">
      <div class="table-header-toolbar" style="width: calc(100% - 41px)">
        <div class="left">
          <label>Thickness Calculation Result</label>
        </div>
        <div class="right"></div>
      </div>
      <div class="table-wrapper">
        <DxDataGrid
          id="view-grid"
          key-expr="id_tp"
          :data-source="dataList.last_insp_thk"
          :element-attr="dataGridAttributes"
          :selection="{ mode: 'single' }"
          :hover-state-enabled="true"
          :allow-column-reordering="true"
          :show-borders="true"
          :show-row-lines="true"
          :row-alternation-enabled="false"
          :word-wrap-enabled="true"
        >
          <!-- <DxToolbar>
            <DxItem location="before" template="table-header" />
          </DxToolbar>
          <template #table-header>
            <div>
              <div class="page-section-label">Thickness Summary</div>
            </div>
          </template>-->
          <DxFilterRow :visible="true" />
          <DxHeaderFilter :visible="true" />

          <DxColumn data-field="sump_no" caption="Sump No." />

          <DxColumn data-field="cml_name" caption="CML name" />

          <DxColumn data-field="tp_name" caption="TP name" />

          <DxColumn
            data-field="inservice_date"
            caption="In-service date"
            data-type="date"
            format="dd MMM yyyy"
            :width="120"
          />

          <DxColumn data-field="t_nom" caption="tnom (mm)" format="#,##0.00" />

          <DxColumn data-field="t_req" caption="treq (mm)" format="#,##0.00" />

          <DxColumn
            data-field="first_insp_date"
            caption="First date"
            data-type="date"
            format="dd MMM yyyy"
            :width="120"
          />

          <DxColumn data-field="first_t_actual" caption="First thickness (mm)" format="#,##0.00" />

          <DxColumn
            data-field="previous_insp_date"
            caption="Previous date"
            data-type="date"
            format="dd MMM yyyy"
            :width="120"
          />

          <DxColumn
            data-field="previous_t_actual"
            caption="Previous thickness (mm)"
            format="#,##0.00"
          />

          <DxColumn
            data-field="inspection_date"
            caption="Last date"
            data-type="date"
            format="dd MMM yyyy"
            :width="120"
          />

          <DxColumn data-field="t_actual" caption="Last thickness (mm)" format="#,##0.00" />

          <DxColumn data-field="crs" caption="ST_CR (mm/yr)" format="#,##0.00" />

          <DxColumn data-field="crl" caption="LT_CR (mm/yr)" format="#,##0.00" />

          <DxColumn data-field="scr" caption="SCR (mm/yr)" format="#,##0.00" />

          <DxColumn data-field="rl" caption="RL (yrs)" format="#,##0.00" />

          <!-- Configuration goes here -->
          <!-- <DxFilterRow :visible="true" /> -->
          <DxScrolling mode="standard" />
          <DxPaging :page-size="10" :page-index="0" />
          <DxPager
            :show-page-size-selector="true"
            :allowed-page-sizes="[5, 10, 20]"
            :show-navigation-buttons="true"
            :show-info="true"
            info-text="Page {0} of {1} ({2} items)"
          />
          <DxExport :enabled="true" :fileName="this.$store.state.currentPageInnerName+'_calc'" />
        </DxDataGrid>
      </div>
    </div>
    <div id="x-page" class="page-section overflow-x" v-if="tabCurrent == 'A2'">
      <div class="table-wrapper">
        <div class="table-header-toolbar" style="width: calc(100% - 82px)">
          <div class="left">
            <label>Sump</label>
          </div>
          <div class="right"></div>
        </div>
        <DxDataGrid
          id="sump-grid"
          key-expr="id_sump"
          :data-source="dataList.sump"
          :element-attr="dataGridAttributes"
          :selection="{ mode: 'single' }"
          :hover-state-enabled="true"
          :allow-column-reordering="true"
          :show-borders="true"
          :show-row-lines="true"
          :row-alternation-enabled="false"
          :word-wrap-enabled="true"
          @row-inserted="CREATE_SUMP"
          @row-updated="UPDATE_SUMP"
          @row-removed="DELETE_SUMP"
          @selection-changed="VIEW_CML"
          @row-click="SUMP_FLAGER"
        >
          <DxFilterRow :visible="true" />
          <DxHeaderFilter :visible="true" />
          <DxSelection mode="single" />

          <DxEditing
            :allow-updating="true"
            :allow-deleting="true"
            :allow-adding="true"
            :use-icons="true"
            mode="row"
          />
          <DxColumn data-field="sump_no" caption="Sump no" :width="80" />

          <DxColumn data-field="sump_name" caption="Sump name" :width="120" />

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
          <DxExport :enabled="false" />
        </DxDataGrid>
      </div>
      <div class="table-wrapper">
        <div class="table-header-toolbar" style="width: calc(100% - 82px)">
          <div class="left">
            <label>CML</label>
          </div>
          <div class="right">
            <div class="dx-table-style">
              <div class="table-toolbar-set">
                <div class="download-btn">
                  <v-ons-toolbar-button id="toolbarBTN" v-on:click="FETCH_FILE_CML()">
                    <label>Download</label>
                  </v-ons-toolbar-button>
                </div>
                <v-ons-toolbar-button>
                  <label for="cml-upload-btn">
                    <i class="las la-file-import"></i>Import Excel
                  </label>
                </v-ons-toolbar-button>
              </div>
            </div>
          </div>
        </div>
        <input
          type="file"
          style="display: none"
          id="cml-upload-btn"
          ref="cml_upload_file"
          @change="UPLOAD_CML()"
        />
        <DxDataGrid
          id="cml-grid"
          key-expr="id_cml"
          :data-source="dataList.cml"
          :element-attr="dataGridAttributes"
          :selection="{ mode: 'single' }"
          :hover-state-enabled="true"
          :allow-column-reordering="true"
          :show-borders="true"
          :show-row-lines="true"
          :row-alternation-enabled="false"
          :word-wrap-enabled="true"
          @row-inserted="CREATE_CML"
          @init-new-row="initNewRowCML"
          @row-updated="UPDATE_CML"
          @row-removed="DELETE_CML"
          @selection-changed="VIEW_TP"
          @row-click="CML_FLAGER"
        >
          <DxFilterRow :visible="true" />
          <DxHeaderFilter :visible="true" />
          <DxSelection mode="single" />

          <DxEditing
            :allow-updating="true"
            :allow-deleting="true"
            :allow-adding="SELECTION_SUMP"
            :use-icons="true"
            mode="row"
          />

          <DxColumn data-field="cml_no" caption="CML no" :width="80" />

          <DxColumn data-field="cml_name" caption="CML name" :width="80" />

          <DxColumn data-field="location" caption="Location" :width="120">
            <DxLookup :data-source="location" display-expr="code" value-expr="code" />
          </DxColumn>

          <DxColumn data-field="t_nom" caption="tnom (mm)" format="#,##0.00" :width="80" />

          <DxColumn
            data-field="t_req"
            caption="treq (mm)"
            format="#,##0.00"
            :allow-editing="false"
            :width="80"
          />

          <DxColumn
            data-field="inservice_date"
            caption="In-service date"
            data-type="date"
            format="dd MMM yyyy"
            :width="120"
          />

          <DxColumn type="buttons">
            <!-- <DxButton hint="View TP" icon="search" :on-click="VIEW_TP" /> -->
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
          <DxExport :enabled="true" :fileName="this.$store.state.currentPageInnerName+'_CML'" />
        </DxDataGrid>
      </div>
      <div class="table-wrapper">
        <div class="table-header-toolbar" style="width: calc(100% - 82px)">
          <div class="left">
            <label>TP</label>
          </div>
          <div class="right">
            <div class="dx-table-style">
              <div class="table-toolbar-set">
                <div class="download-btn">
                  <v-ons-toolbar-button id="toolbarBTN" v-on:click="FETCH_FILE_SUMP()">
                    <label for="tp-download-tp-btn">Download</label>
                  </v-ons-toolbar-button>
                </div>
                <v-ons-toolbar-button>
                  <label for="tp-upload-btn">
                    <i class="las la-file-import"></i>Import Excel
                  </label>
                </v-ons-toolbar-button>
              </div>
            </div>
          </div>
        </div>
        <input
          type="file"
          style="display: none"
          id="tp-upload-btn"
          ref="tp_upload_file"
          @change="UPLOAD_TP()"
        />
        <DxDataGrid
          id="tp-grid"
          key-expr="id_tp"
          :data-source="dataList.tp"
          :element-attr="dataGridAttributes"
          :selection="{ mode: 'single' }"
          :hover-state-enabled="true"
          :allow-column-reordering="true"
          :show-borders="true"
          :show-row-lines="true"
          :row-alternation-enabled="false"
          :word-wrap-enabled="true"
          @row-inserted="CREATE_TP"
          @row-updated="UPDATE_TP"
          @row-removed="DELETE_TP"
          @selection-changed="VIEW_UTM"
          @row-click="TP_FLAGER"
        >
          <DxFilterRow :visible="true" />
          <DxHeaderFilter :visible="true" />
          <DxSelection mode="single" />
          <!-- <DxToolbar>
            <DxItem location="before" template="table-header" />
          </DxToolbar>
          <template #table-header>
            <div>
              <div class="page-section-label">TP</div>
            </div>
          </template>-->
          <DxEditing
            :allow-updating="true"
            :allow-deleting="true"
            :allow-adding="SELECTION_CML"
            :use-icons="true"
            mode="row"
          />

          <DxColumn data-field="tp_name" caption="TP No." :width="100" />
          <DxColumn data-field="tp_desc" caption="TP Desc." :width="150" />

          <DxColumn type="buttons">
            <!-- <DxButton hint="View TP" icon="search" :on-click="VIEW_UTM" /> -->
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
          <DxExport :enabled="true" :fileName="this.$store.state.currentPageInnerName+'_TP'" />
        </DxDataGrid>
      </div>
      <div class="table-wrapper">
        <div class="table-header-toolbar" style="width: calc(100% - 82px)">
          <div class="left">
            <label>Thickness</label>
          </div>
          <div class="right"></div>
        </div>
        <DxDataGrid
          id="thk-grid"
          key-expr="id_thk"
          :data-source="dataList.thk"
          :element-attr="dataGridAttributes"
          :selection="{ mode: 'single' }"
          :hover-state-enabled="true"
          :allow-column-reordering="true"
          :show-borders="true"
          :show-row-lines="true"
          :row-alternation-enabled="false"
          :word-wrap-enabled="true"
          @row-inserted="CREATE_THK"
          @row-updated="UPDATE_THK"
          @row-removed="DELETE_THK"
        >
          <DxEditing
            :allow-updating="true"
            :allow-deleting="true"
            :allow-adding="SELECTION"
            :use-icons="true"
            mode="row"
          />

          <DxFilterRow :visible="true" />
          <DxHeaderFilter :visible="true" />
          <!-- <DxColumn data-field="plate_no" caption="Plate No." />
          <DxColumn data-field="tp_name" caption="TP No." />-->
          <DxColumn data-field="id_inspection_record" caption="Inspection date" :width="150">
            <DxLookup
              :data-source="inspRecordList"
              :display-expr="SET_FORMAT_DATE"
              value-expr="id_inspection_record"
            />
          </DxColumn>

          <DxColumn data-field="t_actual" caption="tactual (mm)" format="#,##0.00" :width="150" />

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
          <DxExport
            :enabled="true"
            :fileName="this.$store.state.currentPageInnerName+'_Thickness'"
          />
        </DxDataGrid>
      </div>
    </div>
    <div class="page-container" v-if="tabCurrent == 'A3' ">
      <div
        class="page-container-A3"
        :class="[
      pagePanelHiding == false ? 'page-container-A3' : 'page-container-hide',
    ]"
      >
        <InspectionRecordPanel @showHidePanel="SHOW_HIDE_PANEL" @viewItem="VIEW_ITEM" />
        <div class="list-page" v-if="this.id_inspection_record">
          <v-ons-list>
            <v-ons-list-header>
              Inspection Details of
              <b>{{ DATE_FORMAT(current_view.inspection_date) }}</b>
            </v-ons-list-header>
          </v-ons-list>
          <div class="table-wrapper">
            <DxDataGrid
              id="data-grid-style"
              key-expr="id"
              :data-source="additionalRemarkList"
              :element-attr="dataGridAttributes"
              :hover-state-enabled="true"
              :allow-column-reordering="true"
              :show-borders="true"
              :show-row-lines="true"
              :row-alternation-enabled="false"
              @row-inserted="CREATE_ADDITIONAL_REMARK"
              @row-updated="UPDATE_ADDITIONAL_REMARK"
              @row-removed="DELETE_ADDITIONAL_REMARK"
              @editing-start="EDITING_START_ADDITIONAL_REMARK"
              @init-new-row="INIT_NEW_ROW_ADDITIONAL_REMARK"
              @saved="SAVE"
            >
              <DxEditing
                :allow-updating="true"
                :allow-deleting="true"
                :allow-adding="true"
                :use-icons="true"
                mode="form"
              >
                <DxForm label-location="top">
                  <DxItem :col-count="2" :col-span="2" item-type="group">
                    <DxItem data-field="file_path" :col-span="2" />
                    <DxItem data-field="remark_desc" :col-span="2" />
                  </DxItem>
                </DxForm>
              </DxEditing>

              <DxColumn
                data-field="file_path"
                caption="Attachment"
                cell-template="attch_img"
                edit-cell-template="attch_img-editor"
                :width="400"
              />

              <DxColumn
                data-field="remark_desc"
                caption="Description"
                :editor-options="fileNameInputOptions"
              />

              <template #attch_img="{ data }">
                <div style="position: relative">
                  <a :href="baseURL + data.value" download="dwg" target="_blank">
                    <img :src="baseURL + data.value" width="300" height="200" />
                    <br />
                  </a>
                </div>
              </template>

              <template #attch_img-editor="{ data }">
                <div>
                  <img
                    :src="baseURL + data.value"
                    width="300"
                    height="200"
                    v-if="imgHolder != '' && isInitEdit == 0"
                  />
                  <img
                    :src="imgHolder"
                    width="300"
                    height="200"
                    v-if="imgHolder != '' && isInitEdit == 1"
                  />
                  <img
                    src="http://tmt-solution.com/public/image-empty.png"
                    width="300"
                    height="200"
                    v-if="imgHolder == ''"
                  />

                  <DxFileUploader
                    select-button-text="Select photo"
                    label-text
                    accept="image/*"
                    upload-mode="useForm"
                    @value-changed="ON_ATTACHMENT_CHANGE"
                  />
                </div>
              </template>

              <!-- Configuration goes here -->
              <!-- <DxFilterRow :visible="true" /> -->
              <DxSearchPanel :visible="false" />
              <DxPaging :page-size="10" :page-index="0" />
              <DxPager
                :show-page-size-selector="true"
                :allowed-page-sizes="[5, 10, 20]"
                :show-navigation-buttons="true"
                :show-info="true"
                info-text="Page {0} of {1} ({2} items)"
              />
              <DxExport :enabled="false" />
            </DxDataGrid>
          </div>
        </div>
        <SelectInspRecord v-if="this.id_inspection_record == ''" />
      </div>
    </div>

    <contentLoading text="Loading, please wait..." v-if="isLoading == true" color="#fc9b21" />
  </div>
</template> 

<script>
//API
import axios from "/axios.js";
import moment from "moment";

//Components
import contentLoading from "@/components/app-structures/app-content-loading.vue";
import VueTabsChrome from "vue-tabs-chrome";
import InspectionRecordPanel from "@/views/Applications/TankList/Pages/inspection-record-panel.vue";
import SelectInspRecord from "@/components/select-insp-record.vue";

//DataGrid
import "devextreme/dist/css/dx.light.css";
import { DxFileUploader } from "devextreme-vue/file-uploader";
import { DxItem } from "devextreme-vue/form";
// import { Workbook } from "exceljs";
// import saveAs from "file-saver";
// import { exportDataGrid } from "devextreme/excel_exporter";
import {
  DxForm,
  DxDataGrid,
  DxSearchPanel,
  DxPaging,
  DxPager,
  DxScrolling,
  DxColumn,
  DxExport,
  // DxToolbar,
  // DxItem,
  DxEditing,
  DxLookup,
  DxButton,
  DxHeaderFilter,
  DxFilterRow,
  DxSelection
} from "devextreme-vue/data-grid";

export default {
  name: "ViewThicknessSump",
  components: {
    DxForm,
    DxItem,
    DxFileUploader,
    SelectInspRecord,
    InspectionRecordPanel,
    contentLoading,
    DxDataGrid,
    DxSearchPanel,
    DxPaging,
    DxPager,
    DxScrolling,
    DxColumn,
    DxExport,
    // DxToolbar,
    // DxItem,
    DxEditing,
    DxLookup,
    DxButton,
    DxHeaderFilter,
    DxFilterRow,
    DxSelection,
    VueTabsChrome
  },
  created() {
    this.$store.commit("UPDATE_CURRENT_INAPP", {
      name: "Tank Management",
      icon: "/img/icon_menu/tank/tank.png"
    });
    this.$store.commit("UPDATE_CURRENT_PAGENAME", {
      subpageName: "Thickness Messurement",
      subpageInnerName: "Sump"
    });
    if (this.$store.state.status.server == true) {
      this.FETCH_INSP_RECORD();
      this.FETCH_SUMP();
      this.FETCH_LAST_INSP_THK();
      this.FETCH_TANK_INFO();
    }
  },
  data() {
    return {
      pagePanelHiding: false,
      current_view: "",
      id_inspection_record: "",
      additionalRemarkList: [],
      imgHolder: "",
      file: [],
      isInitEdit: 0,
      dataIMGTemp: "",
      fileNameInputOptions: { placeholder: "Enter description ..." },
      sump_flag: false,
      cml_flag: false,
      tp_flag: false,
      infoTank: {},
      dataList: {
        sump: [],
        cml: [],
        tp: [],
        thk: [],
        last_insp_thk: []
      },
      dataGridAttributes: {
        class: "data-grid-style"
      },
      isLoading: false,
      current_view_item: {
        id_sump: null,
        id_cml: null,
        id_tp: null,
        id_utm: null
      },
      inspRecordList: {},
      matList: [
        { code: "CS" },
        { code: "SS" },
        { code: "Duplex" },
        { code: "Unknown" }
      ],
      location: [{ code: "Bottom" }, { code: "Wall" }],
      tabCurrent: "A2",
      tabs: [
        {
          label: "Calculation Result",
          key: "A1",
          closable: false
        },
        {
          label: "Messurement Result",
          key: "A2",
          closable: false
        },
        {
          label: "Additional Attachment",
          key: "A3",
          closable: false
        }
      ]
    };
  },
  computed: {
    SELECTION() {
      if (this.tp_flag) {
        return true;
      }
      return false;
    },
    SELECTION_CML() {
      if (this.cml_flag) {
        return true;
      }
      return false;
    },
    SELECTION_SUMP() {
      if (this.sump_flag) {
        return true;
      }
      return false;
    },
    baseURL() {
      var mode = this.$store.state.mode;
      if (mode == "dev") return this.$store.state.modeURL.dev;
      else if (mode == "prod") return this.$store.state.modeURL.prod;
      else return console.log("develpment mode set up incorrect.");
    }
  },
  methods: {
    FETCH_TANK_INFO() {
      axios({
        method: "post",
        url: "tank-info/tank-info-by-id",
        headers: {
          Authorization: "Bearer " + JSON.parse(localStorage.getItem("token"))
        },
        data: {
          id_tag: this.$route.params.id_tag
        }
      })
        .then(res => {
          if (res.status == 200 && res.data) {
            this.infoTank = res.data[0];
            console.warn(this.infoTank.inservice_date);
          }
        })
        .catch(error => {
          console.log(error);
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
    initNewRowCML(e) {
      e.data.inservice_date = this.infoTank.inservice_date;
    },
    FETCH_SUMP() {
      this.isLoading = true;
      var id = this.$route.params.id_tag;
      axios({
        method: "post",
        url: "sump-thickness/sump-info-by-tank-id",
        headers: {
          Authorization: "Bearer " + JSON.parse(localStorage.getItem("token"))
        },
        data: {
          id_tag: id
        }
      })
        .then(res => {
          console.log("==> sump");
          console.log(res.data);
          if (res.status == 200 && res.data) {
            this.dataList.sump = res.data;
          }
        })
        .catch(error => {
          console.log(error);
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
    FETCH_CML() {
      this.isLoading = true;
      var id = this.current_view_item.id_sump;
      axios({
        method: "post",
        url: "sump-thickness/sump-thk-cml-by-sump-id",
        headers: {
          Authorization: "Bearer " + JSON.parse(localStorage.getItem("token"))
        },
        data: {
          id_sump: id
        }
      })
        .then(res => {
          console.log("==> CML");
          console.log(res.data);
          if (res.status == 200 && res.data) {
            this.dataList.cml = res.data;
          }
        })
        .catch(error => {
          console.log(error);
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
    FETCH_TP() {
      var id = this.current_view_item.id_cml;
      axios({
        method: "post",
        url: "sump-thickness/sump-thk-tp-by-cml",
        headers: {
          Authorization: "Bearer " + JSON.parse(localStorage.getItem("token"))
        },
        data: {
          id_cml: id
        }
      })
        .then(res => {
          console.log("==> TP");
          console.log(res.data);
          if (res.status == 200 && res.data) {
            this.dataList.tp = res.data;
          }
        })
        .catch(error => {
          console.log(error);
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
    FETCH_UTM() {
      var id = this.current_view_item.id_tp;
      axios({
        method: "post",
        url: "sump-thickness/sump-thk-data-by-tp",
        headers: {
          Authorization: "Bearer " + JSON.parse(localStorage.getItem("token"))
        },
        data: {
          id_tp: id
        }
      })
        .then(res => {
          console.log("==> UTM");
          console.log(res.data);
          if (res.status == 200 && res.data) {
            this.dataList.thk = res.data;
          }
        })
        .catch(error => {
          console.log(error);
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
    FETCH_INSP_RECORD() {
      var id_tag = this.$route.params.id_tag;
      axios({
        method: "post",
        url: "insp-record/insp-record-by-tank-id",
        headers: {
          Authorization: "Bearer " + JSON.parse(localStorage.getItem("token"))
        },
        data: {
          id_tag: id_tag
        }
      })
        .then(res => {
          console.log("insp record:");
          console.log(res.data);
          if (res.status == 200 && res.data) {
            this.inspRecordList = res.data;
          }
        })
        .catch(error => {
          console.log(error);
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
    FETCH_LAST_INSP_THK() {
      var id = this.$route.params.id_tag;
      axios({
        method: "post",
        url: "sump-thickness/sump-thk-view-last-insp",
        headers: {
          Authorization: "Bearer " + JSON.parse(localStorage.getItem("token"))
        },
        data: {
          id_tag: id
        }
      })
        .then(res => {
          console.log("==> LAST INSP THK");
          console.log(res.data);
          if (res.status == 200 && res.data) {
            this.dataList.last_insp_thk = res.data;
          }
        })
        .catch(error => {
          console.log(error);
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
    VIEW_CML(e) {
      this.current_view_item.id_sump = e.selectedRowKeys[0];
      this.FETCH_CML();
      this.tp_flag = false;
      this.cml_flag = false;
    },
    VIEW_TP(e) {
      this.current_view_item.id_cml = e.selectedRowKeys[0];
      this.FETCH_TP();
      this.tp_flag = false;
    },
    VIEW_UTM(e) {
      this.current_view_item.id_tp = e.selectedRowKeys[0];
      this.FETCH_UTM();
    },
    CREATE_SUMP(e) {
      console.log(e);
      this.isLoading = true;
      var id_tag = this.$route.params.id_tag;
      e.data.id_tag = id_tag;
      e.data.id_sump = 0;
      console.log(e.data);
      axios({
        method: "post",
        url: "sump-thickness/add-sump-info",
        headers: {
          Authorization: "Bearer " + JSON.parse(localStorage.getItem("token"))
        },
        data: e.data
      })
        .then(res => {
          console.log(res);
          if (res.status == 200 && res.data) {
            console.log(res.data);
            //this.FETCH_CML();
            this.FETCH_SUMP();
          }
        })
        .catch(error => {
          console.log(error);
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
    UPDATE_SUMP(e) {
      console.log(e.data);
      axios({
        method: "post",
        url: "sump-thickness/edit-sump-info",
        headers: {
          Authorization: "Bearer " + JSON.parse(localStorage.getItem("token"))
        },
        data: e.data
      })
        .then(res => {
          console.log(res);
          if (res.status == 200 && res.data) {
            console.log(res.data);
            //this.FETCH_CML();
            this.FETCH_SUMP();
          }
        })
        .catch(error => {
          console.log(error);
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
    DELETE_SUMP(e) {
      this.isLoading = true;
      axios({
        method: "delete",
        url: "sump-thickness/delete-sump-info",
        headers: {
          Authorization: "Bearer " + JSON.parse(localStorage.getItem("token"))
        },
        data: {
          id_sump: e.key
        }
      })
        .then(res => {
          console.log(res.data);
          if (res.status == 200 && res.data) {
            this.FETCH_SUMP();
            this.FETCH_LAST_INSP_THK();
          }
        })
        .catch(error => {
          console.log(error);
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
    CREATE_CML(e) {
      this.isLoading = true;
      var id_tag = this.$route.params.id_tag;
      e.data.id_tag = id_tag;
      e.data.id_cml = 0;
      e.data.id_sump = this.current_view_item.id_sump;
      e.data.actual_od = this.SET_OCTUAL_OD(e.data.nps);
      e.data.inservice_date = moment(e.data.inservice_date).format("L");
      console.log(e.data);
      axios({
        method: "post",
        url: "sump-thickness/add-sump-thk-cml",
        headers: {
          Authorization: "Bearer " + JSON.parse(localStorage.getItem("token"))
        },
        data: e.data
      })
        .then(res => {
          console.log(res);
          if (res.status == 200 && res.data) {
            this.FETCH_CML();
            //this.FETCH_VIEW();
          }
        })
        .catch(error => {
          console.log(error);
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
    UPDATE_CML(e) {
      e.data.actual_od = this.SET_OCTUAL_OD(e.data.nps);
      e.data.inservice_date = moment(e.data.inservice_date).format("L");
      console.log(e.data);
      this.isLoading = true;
      axios({
        method: "put",
        url: "sump-thickness/edit-sump-thk-cml",
        headers: {
          Authorization: "Bearer " + JSON.parse(localStorage.getItem("token"))
        },
        data: e.data
      })
        .then(res => {
          console.log(res);
          if (res.status == 200 && res.data) {
            this.FETCH_CML();
            // this.FETCH_VIEW();
          }
        })
        .catch(error => {
          console.log(error);
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
    DELETE_CML(e) {
      console.log(e);
      this.isLoading = true;
      axios({
        method: "delete",
        url: "sump-thickness/delete-sump-thk-cml",
        headers: {
          Authorization: "Bearer " + JSON.parse(localStorage.getItem("token"))
        },
        data: {
          id_cml: e.key
        }
      })
        .then(res => {
          console.log(res.data);
          if (res.status == 200 && res.data) {
            this.FETCH_CML();
            this.FETCH_LAST_INSP_THK();
          }
        })
        .catch(error => {
          console.log(error);
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
    CREATE_TP(e) {
      e.data.id_cml = this.current_view_item.id_cml;
      e.data.id_tp = 0;
      console.log(e.data);
      this.isLoading = true;
      axios({
        method: "post",
        url: "sump-thickness/add-sump-thk-tp",
        headers: {
          Authorization: "Bearer " + JSON.parse(localStorage.getItem("token"))
        },
        data: e.data
      })
        .then(res => {
          console.log(res);
          if (res.status == 200 && res.data) {
            this.FETCH_TP();
            // this.FETCH_VIEW();
          }
        })
        .catch(error => {
          console.log(error);
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
    UPDATE_TP(e) {
      console.log(e.data);
      this.isLoading = true;
      axios({
        method: "put",
        url: "sump-thickness/edit-sump-thk-tp",
        headers: {
          Authorization: "Bearer " + JSON.parse(localStorage.getItem("token"))
        },
        data: e.data
      })
        .then(res => {
          console.log(res);
          if (res.status == 200 && res.data) {
            this.FETCH_TP();
            // this.FETCH_VIEW();
          }
        })
        .catch(error => {
          console.log(error);
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
    DELETE_TP(e) {
      console.log(e);
      axios({
        method: "delete",
        url: "sump-thickness/delete-sump-thk-tp",
        headers: {
          Authorization: "Bearer " + JSON.parse(localStorage.getItem("token"))
        },
        data: {
          id_tp: e.key
        }
      })
        .then(res => {
          console.log(res.data);
          if (res.status == 200 && res.data) {
            this.FETCH_TP();
            this.FETCH_LAST_INSP_THK();
          }
        })
        .catch(error => {
          console.log(error);
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
    CREATE_THK(e) {
      e.data.id_thk = 0;
      e.data.id_tp = this.current_view_item.id_tp;
      var date = this.inspRecordList.filter(function(v) {
        return v.id_inspection_record == e.data.id_inspection_record;
      });
      e.data.inspection_date = moment(date[0].inspection_date).format("L");
      console.log(e.data);
      this.isLoading = true;
      axios({
        method: "post",
        url: "sump-thickness/add-sump-thk-data",
        headers: {
          Authorization: "Bearer " + JSON.parse(localStorage.getItem("token"))
        },
        data: e.data
      })
        .then(res => {
          console.log(res);
          if (res.status == 200 && res.data) {
            this.FETCH_UTM();
            this.FETCH_LAST_INSP_THK();
          }
        })
        .catch(error => {
          console.log(error);
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
    UPDATE_THK(e) {
      console.log(e.data);
      var date = this.inspRecordList.filter(function(v) {
        return v.id_inspection_record == e.data.id_inspection_record;
      });
      e.data.inspection_date = moment(date[0].inspection_date).format("L");
      console.log(e.data);
      this.isLoading = true;
      axios({
        method: "put",
        url: "sump-thickness/edit-sump-thk-data",
        headers: {
          Authorization: "Bearer " + JSON.parse(localStorage.getItem("token"))
        },
        data: e.data
      })
        .then(res => {
          console.log(res.data);
          if (res.status == 200 && res.data) {
            this.FETCH_UTM();
            this.FETCH_LAST_INSP_THK();
          }
        })
        .catch(error => {
          console.log(error);
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
    DELETE_THK(e) {
      console.log(e);
      this.isLoading = true;
      axios({
        method: "delete",
        url: "sump-thickness/delete-sump-thk-data",
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
            this.FETCH_UTM();
            this.FETCH_LAST_INSP_THK();
          }
        })
        .catch(error => {
          console.log(error);
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
    SET_FORMAT_DATE(e) {
      // console.log(e);
      return moment(e.inspection_date).format("DD MMM yyyy");
    },
    SET_OCTUAL_OD(val) {
      if (val == 0.125) {
        return 10.3;
      } else if (val == 0.25) {
        return 13.7;
      } else if (val == 0.357) {
        return 17.1;
      } else if (val == 0.5) {
        return 21.3;
      } else if (val == 0.75) {
        return 26.7;
      } else if (val == 1) {
        return 33.4;
      } else if (val == 1.25) {
        return 42.2;
      } else if (val == 1.5) {
        return 48.3;
      } else if (val == 2) {
        return 60.3;
      } else if (val == 2.5) {
        return 73;
      } else if (val == 3) {
        return 88.9;
      } else if (val == 3.5) {
        return 101.6;
      } else if (val == 4) {
        return 114.3;
      } else if (val == 5) {
        return 141.3;
      } else if (val == 6) {
        return 168.3;
      } else if (val == 8) {
        return 219.1;
      } else if (val == 10) {
        return 273;
      } else if (val == 12) {
        return 323.8;
      } else if (val == 14) {
        return 355.6;
      } else if (val == 16) {
        return 406.4;
      } else if (val == 18) {
        return 457;
      } else if (val == 20) {
        return 508;
      } else if (val == 22) {
        return 559;
      } else if (val == 24) {
        return 610;
      } else if (val == 30) {
        return 762;
      } else if (val == 34) {
        return 864;
      } else if (val == 36) {
        return 914;
      } else if (val == 38) {
        return 965;
      } else if (val == 40) {
        return 1016;
      } else if (val == 42) {
        return 1097;
      }
    },
    UPLOAD_CML() {
      this.isLoading = true;
      var file = this.$refs.cml_upload_file.files[0];
      var id_tag = parseInt(this.$route.params.id_tag);
      if (
        file.type ==
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" &&
        this.$route.params.id_tag
      ) {
        axios({
          method: "post",
          url: "/sump-thickness/upload-sump-thk-cml?id_tag=" + id_tag,
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: "Bearer " + JSON.parse(localStorage.getItem("token"))
          },
          data: {
            file: file
          }
        })
          .then(res => {
            console.log(res);
            if (res.status == 204) {
              this.FETCH_LAST_INSP_THK();
            }
          })
          .catch(error => {
            this.$ons.notification.alert(
              error.code + " " + error.response.status + " " + error.message
            );
          })
          .finally(() => {
            this.isLoading = false;
            this.$ons.notification.alert("Upload Completed!");
          });
      } else {
        this.$ons.notification.alert(
          "Incorrect filetype. <br/> Only XLS/XLSX file can be uploaded."
        );
      }
    },
    UPLOAD_TP() {
      this.isLoading = true;
      var file = this.$refs.tp_upload_file.files[0];
      var id_tag = parseInt(this.$route.params.id_tag);
      if (
        file.type ==
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" &&
        this.$route.params.id_tag
      ) {
        axios({
          method: "post",
          url: "/sump-thickness/upload-sump-thk-tp?id_tag=" + id_tag,
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: "Bearer " + JSON.parse(localStorage.getItem("token"))
          },
          data: {
            file: file
          }
        })
          .then(res => {
            console.log(res);
            if (res.status == 204) {
              this.FETCH_LAST_INSP_THK();
            }
          })
          .catch(error => {
            this.$ons.notification.alert(
              error.code + " " + error.response.status + " " + error.message
            );
          })
          .finally(() => {
            this.isLoading = false;
            this.$ons.notification.alert("Upload Completed!");
          });
      } else {
        this.$ons.notification.alert(
          "Incorrect filetype. <br/> Only XLS/XLSX file can be uploaded."
        );
      }
    },
    TP_FLAGER() {
      this.tp_flag = true;
    },
    CML_FLAGER() {
      this.cml_flag = true;
    },
    SUMP_FLAGER() {
      this.sump_flag = true;
    },
    FETCH_FILE_SUMP() {
      console.log("in");
      var id_tag = parseInt(this.$route.params.id_tag);
      axios({
        method: "get",
        url: "sump-thickness/download-sump-thk?id_tag=" + id_tag,
        responseType: "blob",
        headers: {
          Authorization: "Bearer " + JSON.parse(localStorage.getItem("token"))
        }
      })
        .then(res => {
          const blob = res.data;
          this.downLoadFileExcel(blob, "Sump_TP_TEMPLATE");
        })
        .catch(error => {
          console.log(error);
        })
        .finally(() => {});
    },
    FETCH_FILE_CML() {
      //console.log("in");
      var id_tag = parseInt(this.$route.params.id_tag);
      axios({
        method: "get",
        url: "sump-thickness/download-sump-cml?id_tag=" + id_tag,
        responseType: "blob",
        headers: {
          Authorization: "Bearer " + JSON.parse(localStorage.getItem("token"))
        }
      })
        .then(res => {
          const blob = res.data;
          this.downLoadFileExcel(blob, "Sump_CML_TEMPLATE");
        })
        .catch(error => {
          console.log(error);
        })
        .finally(() => {});
    },
    downLoadFileExcel(data, filename) {
      console.log(data);
      const link = document.createElement("a");
      //const blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      //console.log(blob);
      link.setAttribute("href", window.URL.createObjectURL(new Blob([data])));
      link.setAttribute("download", filename + ".xlsx");
      link.style.visibility = "hidden";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    },
    VIEW_ITEM(item) {
      this.current_view = {};
      this.current_view = item;
      this.id_component = this.$route.params.id_component;
      this.id_inspection_record = item.id_inspection_record;
      this.FETCH_ADDITIONAL_REMARK();
    },
    FETCH_ADDITIONAL_REMARK() {
      //var id_tag = parseInt(this.$route.params.id_tag);
      const id_insp = this.id_inspection_record;
      axios({
        method: "get",
        url:
          "additional-remark/get-additional-remark-by-ir-id-type?id_inspection_record=" +
          id_insp +
          "&type=sump_thk",
        headers: {
          Authorization: "Bearer " + JSON.parse(localStorage.getItem("token"))
        }
      })
        .then(res => {
          if (res.status == 200) {
            console.warn("FETCH ADDITIONAL");
            console.log(res.data);
            this.additionalRemarkList = res.data;
          }
        })
        .catch(error => {
          console.log(error);
        })
        .finally(() => {});
    },
    CREATE_ADDITIONAL_REMARK(e) {
      console.log(e);
      var formData = new FormData();
      let user = JSON.parse(localStorage.getItem("user"));
      formData.append("id_inspection_record", this.id_inspection_record);
      formData.append("id_tag", this.$route.params.id_tag);
      formData.append("remark_type", "sump_thk");
      formData.append("remark_desc", e.data.remark_desc);
      formData.append("file", this.file);
      formData.append("created_by", user.id_account);
      formData.append("updated_by", user.id_account);

      axios({
        method: "post",
        url: "additional-remark/add-additional-remark",
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: "Bearer " + JSON.parse(localStorage.getItem("token"))
        },
        data: formData
      })
        .then(res => {
          //console.log("FETCH ATTACHMENTS :");
          if (res.status == 201 && res.data) {
            //console.log(res.data);
            this.FETCH_ADDITIONAL_REMARK();
          }
        })
        .catch(error => {
          console.log(error);
        })
        .finally(() => {
          //this.isLoading = false;
        });
    },
    DELETE_ADDITIONAL_REMARK(e) {
      console.log(e);
      axios({
        method: "delete",
        url: "additional-remark/delete-additional-remark?id=" + e.key,
        headers: {
          Authorization: "Bearer " + JSON.parse(localStorage.getItem("token"))
        },
        data: {
          id: e.key
        }
      })
        .then(res => {
          //console.log(res);
          if (res.status == 200 && res.data) {
            this.FETCH_ADDITIONAL_REMARK();
          }
        })
        .catch(error => {
          console.log(error);
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
    UPDATE_ADDITIONAL_REMARK(e) {
      console.log(e);
      let user = JSON.parse(localStorage.getItem("user"));
      var formData = new FormData();
      formData.append("id", e.key);
      formData.append("id_tag", this.$route.params.id_tag);
      formData.append("id_inspection_record", this.id_inspection_record);
      formData.append("file", this.file);
      formData.append("file_path", this.file_path);
      formData.append("remark_type", e.data.remark_type);
      formData.append("remark_desc", e.data.remark_desc);
      formData.append("created_time", e.data.created_time);
      formData.append("created_by", e.data.created_by);
      formData.append("updated_by", user.id_account);
      axios({
        method: "put",
        url: "additional-remark/edit-additional-remark?id=" + e.key,
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: "Bearer " + JSON.parse(localStorage.getItem("token"))
        },
        data: formData
      })
        .then(res => {
          //console.log(res);
          if (res.status == 204) {
            //console.log(res.data);
            this.FETCH_ADDITIONAL_REMARK();
          }
        })
        .catch(error => {
          console.log(error);
        })
        .finally(() => {
          this.isLoading = false;
          this.is_changed_dwg = 0;
        });
    },
    ON_ATTACHMENT_CHANGE(e) {
      console.log(e);
      this.isInitEdit = 1;
      let reader = new FileReader();
      reader.readAsDataURL(e.value[0]);
      reader.onload = () => {
        this.imgHolder = reader.result;
      };
      this.file = e.value[0];
    },
    EDITING_START_ADDITIONAL_REMARK(e) {
      console.warn("EDIT");
      console.log(e);
      this.file = [];
      this.isInitEdit = 0;
      this.file_path = e.data.file_path;
      this.dataIMGTemp = e;
    },
    SAVE(e) {
      console.log("save:");
      console.log(e);
      if (e.changes.length == 0) {
        this.UPDATE_ADDITIONAL_REMARK(this.dataIMGTemp);
      }
    },
    INIT_NEW_ROW_ADDITIONAL_REMARK() {
      this.imgHolder = "";
      this.file = [];
      this.isInitEdit = 1;
    },
    SHOW_HIDE_PANEL() {
      this.pagePanelHiding = !this.pagePanelHiding;
    },
    DATE_FORMAT(d) {
      return moment(d).format("LL");
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/style/main.scss";

.page-container {
  width: 100%;
  height: 100%;
  overflow-y: auto;
  .page-section {
    padding: 20px;
    height: fit-content;
    width: auto;
  }

  .overflow-x {
    height: calc(100% - 88px);
  }
}
.table-wrapper {
  margin-right: 20px;
}
.table-wrapper:last-child {
  margin-right: 0px;
}

.data-grid-style {
  height: 100%;
}
#toolbarBTN {
  margin-right: 10px;
  padding-left: 10px;
}
.download-btn {
  margin-right: 5px;
}
.page-container-A3 {
  width: 100%;
  height: 100%;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 201px calc(100% - 201px);
}
.list-page {
  overflow-y: auto;
  .list {
    margin: -20px -20px 20px -20px;
  }
}
</style>