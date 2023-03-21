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
          key-expr="id_thk"
          :element-attr="dataGridAttributes"
          :data-source="dataList.view"
          :focused-row-enabled="false"
          :hover-state-enabled="true"
          :allow-column-reordering="true"
          :show-borders="true"
          :show-row-lines="true"
          :row-alternation-enabled="false"
          :word-wrap-enabled="true"
          style="margin-top: 20px"
        >
          <DxFilterRow :visible="true" />
          <DxHeaderFilter :visible="true" />

          <DxColumn data-field="bottom_no" caption="Plate No." sort-order="asc" />

          <DxColumn data-field="bottom_row" caption="Row" />

          <DxColumn data-field="bottom_column" caption="Column" />

          <DxColumn data-field="tp_name" caption="TP name" />

          <DxColumn
            data-field="inservice_date"
            caption="In-service date"
            data-type="date"
            format="dd MMM yyyy"
          />

          <DxColumn data-field="t_nom" caption="tnom (mm)" format="#,##0.00" />

          <DxColumn data-field="t_req" caption="treq (mm)" format="#,##0.00" />

          <DxColumn
            data-field="first_insp_date"
            caption="First date"
            data-type="date"
            format="dd MMM yyyy"
          />

          <DxColumn data-field="first_t_actual" caption="First thickness (mm)" format="#,##0.00" />

          <DxColumn
            data-field="previous_insp_date"
            caption="Previous date"
            data-type="date"
            format="dd MMM yyyy"
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
          />

          <DxColumn data-field="t_actual" caption="Last thickness (mm)" format="#,##0.00" />

          <DxColumn data-field="crs" caption="ST_CR (mm/yr)" format="#,##0.00" />

          <DxColumn data-field="crl" caption="LT_CR (mm/yr)" format="#,##0.00" />

          <DxColumn data-field="rl" caption="RL (yrs)" format="#,##0.00" />

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
          <DxExport :enabled="true" />
        </DxDataGrid>
      </div>
    </div>
    <div id="x-page" class="page-section overflow-x" v-if="tabCurrent == 'A2'">
      <div class="table-wrapper">
        <div class="table-header-toolbar" style="width: calc(100% - 82px)">
          <div class="left">
            <label>CML</label>
          </div>
          <div class="right">
            <v-ons-toolbar-button>
              <label for="cml-upload-btn">
                <i class="las la-file-import"></i>Import Excel
              </label>
            </v-ons-toolbar-button>
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
          :element-attr="dataGridAttributes"
          :data-source="dataList.cml"
          :hover-state-enabled="true"
          :focused-row-enabled="false"
          :allow-column-reordering="true"
          :show-borders="true"
          :show-row-lines="true"
          :row-alternation-enabled="false"
          :word-wrap-enabled="true"
          @row-inserted="CREATE_CML"
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
            :allow-adding="true"
            :use-icons="true"
            mode="row"
          />

          <DxColumn
            data-field="bottom_no"
            caption="Plate No."
            sort-order="asc"
            :allow-editing="false"
            :width="100"
          />
          <DxColumn data-field="bottom_row" caption="Row" :width="80" />
          <DxColumn data-field="bottom_column" caption="Column" :width="80" />

          <DxColumn data-field="t_nom" caption="tnom (mm)" format="#,##0.00" :width="100" />

          <DxColumn
            data-field="t_req"
            caption="tretire (mm)"
            format="#,##0.00"
            :allow-editing="false"
            :width="100"
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
          <DxExport :enabled="true" />
        </DxDataGrid>
      </div>
      <div class="table-wrapper">
        <div class="table-header-toolbar" :style="px">
          <div class="left">
            <label>TP</label>
          </div>
          <div class="right">
            <div class="dx-table-style">
              <div class="table-toolbar-set">
                <div class="download-btn">
                  <v-ons-toolbar-button id="toolbarBTN" v-on:click="FETCH_FILE_BOTTOM()">
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
          :element-attr="dataGridAttributes"
          :data-source="dataList.tp"
          :focused-row-enabled="false"
          :hover-state-enabled="true"
          :allow-column-reordering="true"
          :show-borders="true"
          :show-row-lines="true"
          :row-alternation-enabled="false"
          :word-wrap-enabled="true"
          @row-inserted="CREATE_TP"
          @row-updated="UPDATE_TP"
          @row-removed="DELETE_TP"
          @selection-changed="VIEW_THK"
          @row-click="TP_FLAGER"
        >
          <DxFilterRow :visible="true" />
          <DxHeaderFilter :visible="true" />
          <DxSelection mode="single" />

          <DxEditing
            :allow-updating="true"
            :allow-deleting="true"
            :allow-adding="SELECTION_CML"
            :use-icons="true"
            mode="row"
          />

          <DxColumn data-field="tp_name" caption="TP Name" :width="100" />

          <DxColumn data-field="tp_desc" caption="TP Desc" :width="200" />

          <DxColumn type="buttons">
            <!-- <DxButton hint="View TP" icon="search" :on-click="VIEW_THK" /> -->

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
            info-text="Page {0} of {1} ({2} i tems)"
          />
          <DxExport :enabled="true" />
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
          :element-attr="dataGridAttributes"
          :data-source="dataList.thk"
          :focused-row-enabled="false"
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
          <DxFilterRow :visible="true" />
          <DxHeaderFilter :visible="true" />

          <DxEditing
            :allow-updating="true"
            :allow-deleting="true"
            :allow-adding="SELECTION"
            :use-icons="true"
            mode="row"
          />

          <DxColumn data-field="id_inspection_record" caption="Inspection date" :width="150">
            <DxLookup
              :data-source="inspRecordList"
              :display-expr="SET_FORMAT_DATE"
              value-expr="id_inspection_record"
            />
          </DxColumn>

          <DxColumn data-field="t_actual" caption="tactual (mm)" format="#,##0.00" :width="150" />

          <DxColumn type="buttons">
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
          <DxExport :enabled="true" />
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
  //DxToolbar,
  //DxItem,
  DxEditing,
  DxLookup,
  DxButton,
  DxHeaderFilter,
  DxFilterRow,
  DxSelection
} from "devextreme-vue/data-grid";

export default {
  name: "ViewThicknessBottom",
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
    //DxToolbar,
    //DxItem,
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
      subpageInnerName: "Bottom"
    });
    if (this.$store.state.status.server == true) {
      this.FETCH_INSP_RECORD();
      this.FETCH_CML();
      this.FETCH_VIEW();
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
      px: "width: calc(100% - 41px)",
      cml_flag: false,
      tp_flag: false,
      dataList: {
        cml: [],
        tp: [],
        thk: [],
        view: []
      },
      isLoading: false,
      id_cml: 0,
      id_tp: 0,
      inspRecordList: {},
      dataGridAttributes: {
        class: "data-grid-style"
      },
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
        console.warn(this.tp_flag);
        return true;
      }
      return false;
    },
    SELECTION_CML() {
      if (this.cml_flag) {
        console.warn(this.cml_flag);
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
    FETCH_CML() {
      this.isLoading = true;
      var id_tag = this.$route.params.id_tag;
      axios({
        method: "post",
        url: "bottom-thickness/bottom-thk-cml-by-tank-id",
        headers: {
          Authorization: "Bearer " + JSON.parse(localStorage.getItem("token"))
        },
        data: {
          id_tag: id_tag
        }
      })
        .then(res => {
          console.log("cml:");
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
      console.log(this.id_cml);

      axios({
        method: "post",
        url: "bottom-thickness/bottom-thk-tp-by-cml",
        headers: {
          Authorization: "Bearer " + JSON.parse(localStorage.getItem("token"))
        },
        data: {
          id_cml: this.id_cml
        }
      })
        .then(res => {
          console.log("tp:");
          console.log(res.data);
          if (res.status == 200 && res.data) {
            this.dataList.tp = res.data;
          }
        })
        .catch(error => {
          console.log(error);
        })
        .finally(() => {});
    },
    FETCH_THK() {
      console.log(this.id_tp);

      axios({
        method: "post",
        url: "bottom-thickness/bottom-thk-data-by-tp",
        headers: {
          Authorization: "Bearer " + JSON.parse(localStorage.getItem("token"))
        },
        data: {
          id_tp: this.id_tp
        }
      })
        .then(res => {
          console.log("thk:");
          console.log(res.data);
          if (res.status == 200 && res.data) {
            this.dataList.thk = res.data;
          }
        })
        .catch(error => {
          console.log(error);
        })
        .finally(() => {});
    },
    FETCH_VIEW() {
      var id_tag = this.$route.params.id_tag;
      axios({
        method: "post",
        url: "bottom-thickness/bottom-thk-view-last-insp",
        headers: {
          Authorization: "Bearer " + JSON.parse(localStorage.getItem("token"))
        },
        data: {
          id_tag: id_tag
        }
      })
        .then(res => {
          console.log("view:");
          console.log(res.data);
          if (res.status == 200 && res.data) {
            this.dataList.view = res.data;
          }
        })
        .catch(error => {
          console.log(error);
        })
        .finally(() => {});
    },
    FETCH_INSP_RECORD() {
      this.isLoading = true;
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
    CREATE_CML(e) {
      console.log(e);
      var id_tag = this.$route.params.id_tag;
      e.data.id_tag = id_tag;
      e.data.id_cml = 0;
      e.data.inservice_date = moment(e.data.inservice_date).format("L");
      console.log(e);
      axios({
        method: "post",
        url: "bottom-thickness/add-bottom-thk-cml",
        headers: {
          Authorization: "Bearer " + JSON.parse(localStorage.getItem("token"))
        },
        data: e.data
      })
        .then(res => {
          console.log(res);
          if (res.status == 200 && res.data) {
            this.FETCH_CML();
            this.FETCH_VIEW();
          }
        })
        .catch(error => {
          console.log(error);
        })
        .finally(() => {});
    },
    UPDATE_CML(e) {
      console.log(e);
      this.isLoading = true;
      axios({
        method: "put",
        url: "bottom-thickness/edit-bottom-thk-cml",
        headers: {
          Authorization: "Bearer " + JSON.parse(localStorage.getItem("token"))
        },
        data: e.data
      })
        .then(res => {
          console.log(res);
          if (res.status == 200 && res.data) {
            this.FETCH_CML();
            this.FETCH_VIEW();
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
        url: "bottom-thickness/delete-bottom-thk-cml",
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
            this.FETCH_VIEW();
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
      e.data.id_cml = this.id_cml;
      e.data.id_tp = 0;
      console.log(e.data);
      this.isLoading = true;
      axios({
        method: "post",
        url: "bottom-thickness/add-bottom-thk-tp",
        headers: {
          Authorization: "Bearer " + JSON.parse(localStorage.getItem("token"))
        },
        data: e.data
      })
        .then(res => {
          console.log(res);
          if (res.status == 200 && res.data) {
            this.FETCH_TP();
            this.FETCH_VIEW();
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
        url: "bottom-thickness/edit-bottom-thk-tp",
        headers: {
          Authorization: "Bearer " + JSON.parse(localStorage.getItem("token"))
        },
        data: e.data
      })
        .then(res => {
          console.log(res);
          if (res.status == 200 && res.data) {
            this.FETCH_TP();
            this.FETCH_VIEW();
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
        url: "bottom-thickness/delete-bottom-thk-tp",
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
            this.FETCH_VIEW();
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
      e.data.id_tp = this.id_tp;
      var date = this.inspRecordList.filter(function(v) {
        return v.id_inspection_record == e.data.id_inspection_record;
      });
      e.data.inspection_date = date[0].inspection_date;
      console.log(e.data);
      this.isLoading = true;
      axios({
        method: "post",
        url: "bottom-thickness/add-bottom-thk-data",
        headers: {
          Authorization: "Bearer " + JSON.parse(localStorage.getItem("token"))
        },
        data: e.data
      })
        .then(res => {
          console.log(res);
          if (res.status == 200 && res.data) {
            this.FETCH_THK();
            this.FETCH_VIEW();
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
      var date = this.inspRecordList.filter(function(v) {
        return v.id_inspection_record == e.data.id_inspection_record;
      });
      e.data.inspection_date = date[0].inspection_date;
      console.log(e.data);
      this.isLoading = true;
      axios({
        method: "put",
        url: "bottom-thickness/edit-bottom-thk-data",
        headers: {
          Authorization: "Bearer " + JSON.parse(localStorage.getItem("token"))
        },
        data: e.data
      })
        .then(res => {
          console.log(res.data);
          if (res.status == 200 && res.data) {
            this.FETCH_TP();
            this.FETCH_VIEW();
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
        url: "bottom-thickness/delete-bottom-thk-data",
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
            this.FETCH_THK();
            this.FETCH_VIEW();
          }
        })
        .catch(error => {
          console.log(error);
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
    VIEW_TP(e) {
      console.log(e);
      this.id_cml = e.selectedRowKeys[0];
      this.FETCH_TP();
      this.dataList.thk = [];
      this.tp_flag = false;
    },
    VIEW_THK(e) {
      console.log(e);
      this.id_tp = e.selectedRowKeys[0];
      this.FETCH_THK();
    },
    SET_FORMAT_DATE(e) {
      console.log(e);
      return moment(e.inspection_date).format("DD MMM yyyy");
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
          url: "/bottom-thickness/upload-bottom-thk-cml?id_tag=" + id_tag,
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
              this.FETCH_CML();
              this.FETCH_VIEW();
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
          url: "/bottom-thickness/upload-bottom-thk-tp?id_tag=" + id_tag,
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
              this.FETCH_TP();
              this.FETCH_VIEW();
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
      this.px = "width: calc(100% - 82px)";
    },
    FETCH_FILE_BOTTOM() {
      console.log("in");
      var id_tag = parseInt(this.$route.params.id_tag);
      axios({
        method: "get",
        url: "bottom-thickness/download-bottom-thk?id_tag=" + id_tag,
        responseType: "blob",
        headers: {
          Authorization: "Bearer " + JSON.parse(localStorage.getItem("token"))
        }
      })
        .then(res => {
          const blob = res.data;
          this.downLoadFileExcel(blob, "Bottom_TEMPLATE");
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
          "&type=bottom_thk",
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
      formData.append("remark_type", "bottom_thk");
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