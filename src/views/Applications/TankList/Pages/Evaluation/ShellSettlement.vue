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

    <div class="list-page" v-if="this.id_inspection_record != ''">
      <v-ons-list>
        <v-ons-list-header>
          Inspection Detail of
          <b>
            {{ DATE_FORMAT(current_view.inspection_date) }}</b
          ></v-ons-list-header
        >
      </v-ons-list>

      <div class="tab-wrapper">
        <vue-tabs-chrome v-model="tabCurrent" :tabs="tabs" />
      </div>
      <div v-if="tabCurrent == 'data'" class="tab1-grid">
        <div class="content">
          <div class="table-wrapper">
            <DxDataGrid
              id="shell-settlement-point-table"
              key-expr="id_eval"
              :data-source="shellPointList"
              :element-attr="dataGridAttributes"
              :selection="{ mode: 'single' }"
              :hover-state-enabled="true"
              :allow-column-reordering="true"
              :show-borders="true"
              :show-row-lines="true"
              :row-alternation-enabled="false"
              :word-wrap-enabled="true"
              @row-updated="UPDATE"
              @row-removed="DELETE"
            >
              <DxFilterRow :visible="true" />
              <DxHeaderFilter :visible="true" />

              <DxEditing
                :allow-updating="true"
                :allow-deleting="true"
                :allow-adding="false"
                :use-icons="true"
                mode="row"
              />

              <DxToolbar>
                <DxItem location="before" template="table-header" />
                <DxItem location="after" template="table-header-button-set" />
              </DxToolbar>

              <DxColumn
                data-field="location"
                caption="Evaluation Location at the Tank (Mark on shell map)"
                :allow-editing="false"
              />

              <DxColumn
                data-field="ui_active"
                caption="UI Active"
                :allow-editing="false"
                :width="80"
              />

              <DxColumn
                data-field="maximum_space"
                caption="Distance Between Survey Location (mm)"
                format="#,##0.00"
                :allow-editing="false"
              />

              <DxColumn
                data-field="cumulative"
                caption="Cumulative Distance Around Tank (mm)"
                format="#,##0.00"
                :allow-editing="false"
              />

              <DxColumn
                data-field="relative_value"
                caption="Relative Level/Distance Above Datum Point (mm)"
                format="#,##0.00"
              />

              <DxColumn type="buttons">
                <!-- <DxButton hint="View CML" icon="search" :on-click="VIEW_CML" /> -->
                <DxButton name="edit" hint="Edit" icon="edit" />
                <DxButton name="delete" hint="Delete" icon="trash" />
              </DxColumn>

              <template #table-header>
                <div class="dx-table-style">
                  <div class="table-header-label">Evaluation Points</div>
                </div>
              </template>
              <template #table-header-button-set>
                <div class="dx-table-style">
                  <div class="table-toolbar-set">
                    <v-ons-toolbar-button
                      class="table-toolbar-btn"
                      v-on:click="OPEN_ADD()"
                      v-if="shellPointIsEmpty.length == 0"
                    >
                      <i class="las la-plus"></i>
                      <span>Create New Points</span>
                    </v-ons-toolbar-button>

                    <v-ons-toolbar-button
                      class="table-toolbar-btn"
                      v-on:click="DELETE_POINT()"
                      v-if="shellPointIsEmpty.length > 0"
                    >
                      <i class="las la-trash"></i>
                      <span>Delete All Points</span>
                    </v-ons-toolbar-button>

                    <v-ons-toolbar-button
                      class="table-toolbar-btn"
                      v-on:click="OPEN_EDIT()"
                      v-if="shellPointIsEmpty.length > 0"
                    >
                      <i class="las la-edit"></i>
                      <span>Edit UI Active</span>
                    </v-ons-toolbar-button>
                  </div>
                </div>
              </template>

              <!-- Configuration goes here -->
              <!-- <DxFilterRow :visible="true" /> -->
              <DxScrolling mode="standard" />
              <DxSearchPanel :visible="false" />
              <DxPaging :page-size="10" :page-index="0" />
              <DxPager
                :show-page-size-selector="true"
                :allowed-page-sizes="[5, 10, 20, 50]"
                :show-navigation-buttons="true"
                :show-info="true"
                info-text="Page {0} of {1} ({2} items)"
              />
              <!-- <DxExport :enabled="true" /> -->
            </DxDataGrid>
          </div>
        </div>
        <div class="app-instruction" style="padding-left: 20px">
          <appInstruction
            title="Measurement Conceptualization"
            desc="Measurements of Shell Settlement (External)"
          >
            <ol>
              <li>
                There must be at least 8 settlement points. The maximum spacing
                of settlement point is 32 ft. (9.7536 m) around the
                circumference.
              </li>
              <li>
                Points shall be equally spaced around the tank shell. There must
                be at least 4 equally spaced diametrical measurements.
              </li>
              <li>The spacing settlement and quantity of measurement points</li>
            </ol>
          </appInstruction>
          <appInstruction
            style="margin-top: 20px"
            title="The Maximum Spacing of Settlement Points"
          >
            <div class="img-box">
              <img src="/img/tank-shell-max-space-settlement.png" />
            </div>
          </appInstruction>
          <appInstruction style="margin-top: 20px" title="Datum Point Location">
          </appInstruction>
        </div>
      </div>
      <div v-if="tabCurrent == 'cal'" class="tab2-grid">
        <label v-show="false">ต้องมีอะไรที่แตกต่าง ตารางจะได้อัปเดต</label>
        <div
          class="content"
          style="
            width: 100%;
            display: grid;
            grid-template-columns: auto 240px;
            grid-gap: 20px;
          "
        >
          <div class="table-wrapper">
            <DxDataGrid
              id="settlement-2-grid"
              key-expr="id_eval"
              :data-source="settlementCalPointList"
              :element-attr="dataGridAttributes"
              :selection="{ mode: 'single' }"
              :hover-state-enabled="true"
              :allow-column-reordering="true"
              :show-borders="true"
              :show-row-lines="true"
              :row-alternation-enabled="false"
              :word-wrap-enabled="true"
            >
              <DxFilterRow :visible="true" />
              <DxHeaderFilter :visible="true" />

              <DxToolbar>
                <DxItem location="before" template="table-header" />
                <!-- <DxItem location="after" template="table-header-button-set" /> -->
              </DxToolbar>

              <DxColumn
                data-field="location"
                caption="Data Point"
                :allow-editing="false"
              />

              <DxColumn
                data-field="cumulative"
                caption="Circumferential Distance"
                format="#,##0.00"
                :allow-editing="false"
              />

              <DxColumn
                data-field="reduced_level"
                caption="Reduced Level"
                format="#,##0.00"
                :allow-editing="false"
              />

              <DxColumn
                data-field="theta_radians"
                caption="Theta Radians"
                format="#,##0.00"
              />

              <DxColumn
                data-field="theta_degrees"
                caption="Theta Degrees"
                format="#,##0.00"
              />

              <DxColumn
                data-field="relative_value"
                caption="Relative Level"
                format="#,##0.00"
              />

              <DxColumn
                data-field="y"
                caption="Y=A+B Cos(Theta-C)"
                format="#,##0.00"
              />

              <DxColumn
                data-field="difference_value"
                caption="Difference (Ui)"
                format="#,##0.00"
              />

              <DxColumn
                data-field="out_of_plane"
                caption="Out of Plane Deflection (Si)"
                format="#,##0.00"
              />

              <DxColumn
                data-field="deviation_value"
                caption="Deviation"
                format="#,##0.00"
              />

              <DxColumn
                data-field="difference_2_value"
                caption="Difference(2)"
                format="#,##0.00"
              />

              <DxColumn
                data-field="deviation_2_value"
                caption="Deviation(2)"
                format="#,##0.00"
              />

              <template #table-header>
                <div class="dx-table-style">
                  <div class="table-header-label">Settlement Calculation</div>
                </div>
              </template>
              <!-- <template #table-header-button-set>
                <div class="dx-table-style">
                  <div class="table-toolbar-set">
                    <v-ons-toolbar-button
                      class="table-toolbar-btn"
                      v-on:click="DELETE_POINT()"
                      v-if="shellPointIsEmpty.length > 0"
                    >
                      <i class="las la-trash"></i>
                      <span>Clear Input</span>
                    </v-ons-toolbar-button>
                  </div>
                </div>
              </template> -->

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
          <div class="report-sheet">
            <div class="custom-table-header">
              <label></label>
            </div>
            <div class="report-container">
              <div class="sheet-body">
                <div class="section-label" style="grid-column: span 4">
                  <label style="line-height: 34px"
                    >Y = A + B Cos(Theta - C)</label
                  >
                </div>
                <div class="section-label">
                  <label></label>
                </div>
                <div class="section-label">
                  <label>A</label>
                </div>
                <div class="section-label">
                  <label>B</label>
                </div>
                <div class="section-label">
                  <label>C</label>
                </div>
                <div class="form-item" style="grid-row: span 2">
                  <div class="form-item-label">
                    <label style="font-weight: 500">Calc.</label>
                  </div>
                  <div class="form-item-label">
                    <label style="font-weight: 500">Manual</label>
                  </div>
                </div>
                <div class="form-item" style="grid-row: span 2">
                  <div class="form-item-label">
                    <label
                      v-if="
                        settlementCalPointList.length == 0 ||
                        !settlementCalPointList[0].asv
                      "
                      >N/A</label
                    >
                    <label
                      v-if="
                        settlementCalPointList.length > 0 &&
                        this.settlementCalPointList[0].asv
                      "
                      >{{
                        this.settlementCalPointList[0].asv.toFixed(2)
                      }}</label
                    >
                  </div>
                  <div class="form-item-value">
                    <input />
                  </div>
                </div>
                <div class="form-item" style="grid-row: span 2">
                  <div class="form-item-label">
                    <label
                      v-if="
                        settlementCalPointList.length == 0 ||
                        !settlementCalPointList[0].bsv
                      "
                      >N/A</label
                    >
                    <label
                      v-if="
                        settlementCalPointList.length > 0 &&
                        this.settlementCalPointList[0].bsv
                      "
                      >{{
                        this.settlementCalPointList[0].bsv.toFixed(2)
                      }}</label
                    >
                  </div>
                  <div class="form-item-value">
                    <input />
                  </div>
                </div>
                <div class="form-item" style="grid-row: span 2">
                  <div class="form-item-label">
                    <label
                      v-if="
                        settlementCalPointList.length == 0 ||
                        !settlementCalPointList[0].csv
                      "
                      >N/A</label
                    >
                    <label
                      v-if="
                        settlementCalPointList.length > 0 &&
                        this.settlementCalPointList[0].csv
                      "
                      >{{
                        this.settlementCalPointList[0].csv.toFixed(2)
                      }}</label
                    >
                  </div>
                  <div class="form-item-value">
                    <input />
                  </div>
                </div>
              </div>
              <div class="sheet-body">
                <div class="section-label" style="grid-column: span 4">
                  <label>Sum of (Deviation)(Syy)</label>
                </div>
                <div class="form-item" style="grid-column: span 4">
                  <div class="form-item-label">
                    <label
                      style="line-height: 34px"
                      v-if="
                        settlementCalPointList.length > 0 &&
                        settlementCalPointList[0].syy
                      "
                      >{{
                        this.settlementCalPointList[0].syy.toFixed(2)
                      }}</label
                    >
                    <label
                      style="line-height: 34px"
                      v-if="
                        settlementCalPointList.length == 0 ||
                        !settlementCalPointList[0].syy
                      "
                      >N/A</label
                    >
                  </div>
                </div>
                <div class="section-label" style="grid-column: span 4">
                  <label>Sum of (Different)(SSE)</label>
                </div>
                <div class="form-item" style="grid-column: span 4">
                  <div class="form-item-label">
                    <label
                      style="line-height: 34px"
                      v-if="
                        settlementCalPointList.length > 0 &&
                        settlementCalPointList[0].sse
                      "
                      >{{
                        this.settlementCalPointList[0].sse.toFixed(2)
                      }}</label
                    >
                    <label
                      style="line-height: 34px"
                      v-if="
                        settlementCalPointList.length == 0 ||
                        !settlementCalPointList[0].sse
                      "
                      >N/A</label
                    >
                  </div>
                </div>
                <div class="section-label" style="grid-column: span 4">
                  <label>R = (Syy - SSE)/Syy</label>
                </div>
                <div class="form-item" style="grid-column: span 4">
                  <div class="form-item-label">
                    <label
                      style="line-height: 34px"
                      v-if="
                        settlementCalPointList.length > 0 &&
                        settlementCalPointList[0].r_2
                      "
                      >{{
                        this.settlementCalPointList[0].r_2.toFixed(2)
                      }}</label
                    >
                    <label
                      style="line-height: 34px"
                      v-if="
                        settlementCalPointList.length == 0 ||
                        !settlementCalPointList[0].r_2
                      "
                      >N/A</label
                    >
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <chartShellSettlement1 :current_view="this.current_view" />
        <chartShellSettlement2 :current_view="this.current_view" />
        <div class="app-instruction" style="margin-top: 20px">
          <appInstruction
            title="Instruction"
            desc="Local deviations from the theoretical shape (for example, weld discontinuities and flat spots) shall be limited as follows."
          >
            <ol>
              <li>
                Deviations (peaking) at vertical weld joints shall not exceed 13
                mm (1/2 in.). Peaking at vertical weld joints shall be
                determined using a horizontal sweep board 900 mm (36 in.) long.
                The sweep board shall be made to the nominal radius of the tank.
              </li>
              <li>
                Deviations (banding) at horizontal weld joints shall not exceed
                13 mm (1/2 in.). Banding at horizontal weld joints shall be
                determined using a straight edge vertical sweep board 900 mm (36
                in.) long.
              </li>
              <li>
                DFlat spots measured in the vertical plane shall not exceed
                1/200 of the total height.
              </li>
            </ol>
          </appInstruction>
        </div>
      </div>
      <div v-if="tabCurrent == 'ad'" class="tab3-grid">
        <div class="custom-table-header">
          <label>Acceptance Determination</label>
        </div>
        <div class="content">
          <div class="report-sheet report-sheet-left">
            <div class="report-container">
              <div class="sheet-body">
                <div class="section-label" style="grid-column: span 2">
                  <label style="line-height: 34px"
                    >API 653, Paragraph B.3 - Determination of Permissible
                    Out-of-Plane Settlement</label
                  >
                </div>
                <div class="section-label">
                  <label>The optimal cosine curve is valid</label>
                </div>
                <div class="section-label">
                  <label>The optimal cosine curve is invalid</label>
                </div>
                <div class="content-left">
                  <vue-mathjax :formula="formula"></vue-mathjax>
                </div>
                <div class="content-right"></div>
              </div>
            </div>
          </div>
          <div class="report-sheet report-sheet-right">
            <div class="report-container">
              <div class="sheet-body">
                <div class="section-label">
                  <label style="line-height: 34px"
                    >API 653, Paragraph B.3 - Determination of Permissible
                    Out-of-Plane Settlement</label
                  >
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <SelectInspRecord v-if="this.id_inspection_record == ''" />
    <popupAdd
      v-if="isAdd == true"
      @closePopup="CLOSE_ADD()"
      :info="this.current_view"
    />
    <popupEditUIActive
      v-if="isEdit == true"
      @closePopup="CLOSE_EDIT()"
      :info="this.shellPointList"
    />
    <!-- <contentLoading
      text="Loading, please wait..."
      v-if="isLoading == true"
      color="#fc9b21"
    /> -->
  </div>
</template>

<script>
//API
import axios from "/axios.js";
import moment from "moment";

//Components
import "devextreme/dist/css/dx.light.css";
import appInstruction from "@/components/app-structures/app-instruction-dialog.vue";
import InspectionRecordPanel from "@/views/Applications/TankList/Pages/inspection-record-panel.vue";
import VueTabsChrome from "vue-tabs-chrome";
import SelectInspRecord from "@/components/select-insp-record.vue";
import popupAdd from "@/views/Applications/TankList/Pages/Evaluation/ShellSettlement-add.vue";
import popupEditUIActive from "@/views/Applications/TankList/Pages/Evaluation/ShellSettlement-edit-ui-active.vue";
// import contentLoading from "@/components/app-structures/app-content-loading.vue";
import { VueMathjax } from "vue-mathjax";

//Charts
import chartShellSettlement1 from "@/views/Applications/TankList/Pages/Evaluation/charts/chart-shell-settlement-level-cosine-line.vue";
import chartShellSettlement2 from "@/views/Applications/TankList/Pages/Evaluation/charts/chart-shell-settlement-ofp_set-ofp_def-line.vue";

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
  DxToolbar,
  DxItem,
} from "devextreme-vue/data-grid";

export default {
  name: "ShellSettlementView",
  components: {
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
    DxToolbar,
    DxItem,
    appInstruction,
    InspectionRecordPanel,
    VueTabsChrome,
    SelectInspRecord,
    popupAdd,
    popupEditUIActive,
    // contentLoading,
    chartShellSettlement1,
    chartShellSettlement2,
    "vue-mathjax": VueMathjax,
  },
  created() {
    this.$store.commit("UPDATE_CURRENT_INAPP", {
      name: "Tank Management",
      icon: "/img/icon_menu/tank/tank.png",
    });
    this.$store.commit("UPDATE_CURRENT_PAGENAME", {
      subpageName: "Evaluation",
      subpageInnerName: "Shell Settlement",
    });
  },
  data() {
    return {
      id_inspection_record: "",
      current_view: "",
      shellPointList: [],
      settlementCalPointList: [],
      acceptDetInfo: {},
      isAdd: false,
      isEdit: false,
      isLoading: false,
      dataGridAttributes: {
        class: "data-grid-style",
      },
      pagePanelHiding: false,
      tabCurrent: "data",
      tabs: [
        {
          label: "Settlement Evaluation Data",
          key: "data",
          closable: false,
        },
        {
          label: "Settlement Calculation (API 653)",
          key: "cal",
          closable: false,
        },
        {
          label: "Acceptance Determination",
          key: "ad",
          closable: false,
        },
      ],
      formula: "$$x = {-b \\pm \\sqrt{b^2-4ac} \\over 2a}.$$",
    };
  },
  computed: {
    baseURL() {
      var mode = this.$store.state.mode;
      if (mode == "dev") return this.$store.state.modeURL.dev;
      else if (mode == "prod") return this.$store.state.modeURL.prod;
      else return console.log("develpment mode set up incorrect.");
    },
    shellPointIsEmpty() {
      return this.shellPointList;
    },
  },
  watch: {
    tabCurrent() {
      // if (this.tabCurrent == "data") this.VIEW_ITEM(this.current_view);
      // else if (this.tabCurrent == "cal") this.FETCH_CALC();
      // else if (this.tabCurrent == "ad") this.FETCH_ACPT_DET();
      // else console.log("select tab error");
    },
    current_view() {
      this.tabCurrent = "data";
      this.VIEW_ITEM(this.current_view);
      this.shellPointList = [];
      this.settlementCalPointList = [];
    },
  },
  mounted() {
    if (document.getElementById("my-datatable")) return; // was already loaded
    var scriptTag = document.createElement("script");
    scriptTag.src = "https://polyfill.io/v3/polyfill.min.js?features=es6";
    scriptTag.id = "my-datatable";
    document.getElementsByTagName("head")[0].appendChild(scriptTag);

    if (document.getElementById("my-datatable")) return; // was already loaded
    var scriptTag2 = document.createElement("script");
    scriptTag2.src =
      "https://cdn.jsdelivr.net/npm/mathjax@3.0.1/es5/tex-mml-chtml.js";
    scriptTag2.id = "my-datatable";
    document.getElementsByTagName("head")[0].appendChild(scriptTag2);
  },
  methods: {
    EXPORT_DATA(e) {
      const workbook = new Workbook();
      const worksheet = workbook.addWorksheet("Projects");
      exportDataGrid({
        worksheet: worksheet,
        component: e.component,
      }).then(function () {
        workbook.xlsx.writeBuffer().then(function (buffer) {
          saveAs(
            new Blob([buffer], { type: "application/octet-stream" }),
            "Projects.xlsx"
          );
        });
      });
      e.cancel = true;
    },
    VIEW_ITEM(item) {
      //FETCH EVA POINTS
      console.log("==> FETCH: Eva Points");
      this.isLoading = true;
      this.id_inspection_record = item.id_inspection_record;
      this.current_view = item;
      const id_tag = this.$route.params.id_tag;
      axios({
        method: "post",
        url: "shell-settlement/get-shell-settlement",
        headers: {
          Authorization: "Bearer " + JSON.parse(localStorage.getItem("token")),
        },
        data: {
          id_tag: id_tag,
          id_inspection_record: item.id_inspection_record,
        },
      })
        .then((res) => {
          console.log("==> RES: Eval Points");
          console.log(res.data);
          if (res.status == 200 && res.data) {
            console.log("==> SUCCESS: Eval Points");
            this.shellPointList = res.data;
          }
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
    FETCH_CALC() {
      console.log("==> FETCH: Calculation");
      this.isLoading = true;
      const id_tag = this.$route.params.id_tag;
      axios({
        method: "post",
        url: "shell-settlement/get-shell-settlement-cal",
        headers: {
          Authorization: "Bearer " + JSON.parse(localStorage.getItem("token")),
        },
        data: {
          id_tag: id_tag,
          id_inspection_record: this.id_inspection_record,
        },
      })
        .then((res) => {
          console.log("==> RES: Calculation");
          console.log(res.data);
          if (res.status == 200 && res.data) {
            console.log("==> SUCCESS: Calculation");
            this.settlementCalPointList = res.data;
          }
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
    FETCH_ACPT_DET() {
      console.log("==> FETCH: Acceptance Determination");
      this.isLoading = true;
      const id_tag = this.$route.params.id_tag;
      axios({
        method: "post",
        url: "shell-settlement/get-shell-settlement-accept",
        headers: {
          Authorization: "Bearer " + JSON.parse(localStorage.getItem("token")),
        },
        data: {
          id_tag: id_tag,
          id_inspection_record: this.id_inspection_record,
        },
      })
        .then((res) => {
          console.log("==> RES: Acceptance Determination");
          console.log(res.data);
          if (res.status == 200 && res.data) {
            console.log("==> SUCCESS: Calculation");
            this.acceptDetInfo = res.data;
          }
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
    OPEN_ADD() {
      this.isAdd = true;
    },
    CLOSE_ADD() {
      this.VIEW_ITEM(this.current_view);
      this.isAdd = false;
    },
    OPEN_EDIT() {
      this.isEdit = true;
    },
    CLOSE_EDIT() {
      this.VIEW_ITEM(this.current_view);
      this.isEdit = false;
    },
    UPDATE(e) {
      console.log(e);
      axios({
        method: "put",
        url: "shell-settlement/edit-shell-settlement",
        headers: {
          Authorization: "Bearer " + JSON.parse(localStorage.getItem("token")),
        },
        data: e.data,
      })
        .then((res) => {
          console.log(res);
          if (res.status == 200 && res.data) {
            console.log(res.data);
            this.VIEW_ITEM(this.current_view);
          }
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
    DELETE(e) {
      console.log(e);
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
    DELETE_POINT() {
      this.$ons.notification.confirm("Confirm delete?").then((res) => {
        if (res == 1) {
          axios({
            method: "delete",
            url: "/shell-settlement/delete-shell-settlement",
            headers: {
              Authorization:
                "Bearer " + JSON.parse(localStorage.getItem("token")),
            },
            data: {
              id_inspection_record: this.current_view.id_inspection_record,
            },
          })
            .then((res) => {
              console.log(res);
              if (res.status == 200) {
                this.$ons.notification.alert("Points Deleted");
                this.VIEW_ITEM(this.current_view);
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
  .content {
    width: 100%;
    // width: calc(100% - 20px);
    // display: grid;
    // grid-template-columns: 600px calc(100% - 600px);
    // grid-gap: 20px;
    display: block;
  }
}

.data-grid-style {
  height: 100%;
  border-radius: 6px;
}

.app-instruction {
  .img-box {
    width: auto;
    margin: 10px 0;
    border: 1px solid #f0f0d2;

    img {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
  }
}

.instruction-table {
  // width: 100%;
  margin-top: 10px;
}

.tab-wrapper {
  height: 48px;
  margin: -20px -20px 20px -20px;
}
.vue-tabs-chrome {
  padding-top: 10px;
  background-color: #d9d9d9;
  font-size: 12px;
  font-weight: 500;
}
.info-tab-display {
  display: flex;
}
.report-sheet {
  max-width: 100%;
  width: 100%;
  font-family: $web-default-font;
  box-shadow: none;
  padding: 0 !important;
  margin-top: 0;
  margin-bottom: 20px;
  .report-container {
    .header {
      .title {
        grid-column: span 4;
      }
    }
    .sheet-body {
      grid-template-columns: repeat(4, 25%);
      border-radius: 6px;
      overflow: hidden;
      margin-bottom: 20px;
      .section-label {
        text-align: center;
        label {
          font-size: 12px;
          text-transform: capitalize;
          user-select: text;
          cursor: text;
        }
      }
      .form-item {
        .form-item-label {
          padding: 0;
          height: 50px;
          background-color: #fff;
          border: 0.5px solid #000;
          label {
            user-select: text;
            cursor: text;
            font-weight: 700;
            width: 100%;
            text-align: center;
          }
        }
        .form-item-value {
          padding: 0;
          grid-column: span 1;
          border: 0.5px solid #000;
          background-color: rgba(255, 255, 0, 0.117);
          input {
            font-weight: 700;
            padding: 0;
            height: 50px;
            text-align: center;
            // margin-right: 20px;
            background-color: transparent;
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

.tab1-grid {
  display: flex;
  // display: grid;
  // grid-gap: 20px;
  // width: 100%;
  // grid-template-columns: auto 500px;
}

.tab2-grid {
}

.tab3-grid {
  .content {
    width: calc(100% - 40px);
    display: grid;
    grid-template-columns: repeat(3, 33.33%);
    grid-gap: 20px;
    .report-sheet-left {
      grid-column: span 2;
      .report-container {
        .header {
          .title {
            grid-column: span 4;
          }
        }
        .sheet-body {
          grid-template-columns: 50% 50%;

          .form-item {
            .form-item-label {
              padding: 0;
              height: 50px;
              background-color: #fff;
              border: 0.5px solid #000;
              label {
                user-select: text;
                cursor: text;
                font-weight: 700;
                width: 100%;
                text-align: center;
              }
            }
            .form-item-value {
              padding: 0;
              grid-column: span 1;
              border: 0.5px solid #000;
              background-color: rgba(255, 255, 0, 0.117);
              input {
                font-weight: 700;
                padding: 0;
                height: 50px;
                text-align: center;
                // margin-right: 20px;
                background-color: transparent;
              }
              label {
                margin: 0 auto;
                font-weight: 600;
              }
            }
          }
        }
      }
    }
    .report-sheet-right {
      .report-container {
        .header {
          .title {
            grid-column: span 4;
          }
        }
        .sheet-body {
          grid-template-columns: 100%;

          .form-item {
            .form-item-label {
              padding: 0;
              height: 50px;
              background-color: #fff;
              border: 0.5px solid #000;
              label {
                user-select: text;
                cursor: text;
                font-weight: 700;
                width: 100%;
                text-align: center;
              }
            }
            .form-item-value {
              padding: 0;
              grid-column: span 1;
              border: 0.5px solid #000;
              background-color: rgba(255, 255, 0, 0.117);
              input {
                font-weight: 700;
                padding: 0;
                height: 50px;
                text-align: center;
                // margin-right: 20px;
                background-color: transparent;
              }
              label {
                margin: 0 auto;
                font-weight: 600;
              }
            }
          }
        }
      }
    }
  }
}

.tab-top-page {
  background-color: #d9d9da;
}

.table-wrapper {
  height: 100%;
}

@media screen and (max-width: 1536px) {
  .tab1-grid {
    display: block;
  }
  .app-instruction {
    padding-left: 0 !important;
    padding-top: 20px;
  }
}
</style>