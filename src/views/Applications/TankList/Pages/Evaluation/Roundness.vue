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
      <div class="content">
        <div class="table-wrapper">
          <div class="table-header-toolbar" style="width: calc(100% - 82px)">
            <div class="left">
              <label>Circumference</label>
            </div>
            <div class="right"></div>
          </div>
          <div>
            <DxDataGrid
              id="circum-grid"
              :ref="gridRefName"
              key-expr="id_circum"
              :data-source="circumList"
              :element-attr="dataGridAttributes"
              :selection="{ mode: 'single' }"
              :hover-state-enabled="true"
              :allow-column-reordering="true"
              :show-borders="true"
              :show-row-lines="true"
              :row-alternation-enabled="false"
              :word-wrap-enabled="true"
              @row-inserted="CREATE_CIRCUM"
              @row-updated="UPDATE_CIRCUM"
              @row-removed="DELETE_CIRCUM"
              @selection-changed="SELECTED_CIRCUM"
            >
              <DxFilterRow :visible="true" />
              <DxHeaderFilter :visible="false" />

              <DxEditing
                :allow-updating="true"
                :allow-deleting="true"
                :allow-adding="true"
                :use-icons="true"
                mode="row"
              />
              <!-- <DxToolbar>
              <DxItem location="before" template="table-header" />
              </DxToolbar>-->
              <DxColumn data-field="circum_no" caption="Circumference No." />

              <DxColumn
                data-field="distance_above_bottom"
                caption="Distance Above Bottom (m)"
                format="#,##0.00"
              />

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
        </div>
        <div class="table-wrapper">
          <DxDataGrid
            id="roundness-grid"
            key-expr="id_eval"
            :data-source="roundnessList"
            :element-attr="dataGridAttributes"
            :selection="{ mode: 'single' }"
            :hover-state-enabled="true"
            :allow-column-reordering="true"
            :show-borders="true"
            :show-row-lines="true"
            :row-alternation-enabled="false"
            :word-wrap-enabled="true"
            @row-inserted="CREATE_ROUNDNESS"
            @row-updated="UPDATE_ROUNDNESS"
            @row-removed="DELETE_ROUNDNESS"
          >
            <DxFilterRow :visible="true" />
            <DxHeaderFilter :visible="true" />

            <DxEditing
              :allow-updating="true"
              :allow-deleting="false"
              :allow-adding="false"
              :use-icons="true"
              mode="row"
            />
            <DxToolbar>
              <DxItem location="before" template="table-header" />
              <DxItem location="after" template="table-header-button-set" />
            </DxToolbar>
            <DxColumn data-field="point_no" caption="Point No." :allow-editing="false" />

            <DxColumn
              data-field="angle_degree"
              caption="Angle (degree)"
              format="#,##0.00"
              :allow-editing="false"
            />

            <DxColumn
              data-field="measure_value"
              caption="Radius Meassured Value (mm)"
              format="#,##0.00"
            />

            <DxColumn
              data-field="relative_to_nom"
              caption="Relative to nom. (mm)"
              format="#,##0.00"
              :allow-editing="false"
            />

            <DxColumn
              data-field="radius_tolerance"
              caption="Radius Tolerance (mm)"
              format="#,##0.00"
              :allow-editing="false"
            />

            <DxColumn data-field="result" caption="Inspection Result" :allow-editing="false" />

            <DxColumn type="buttons">
              <!-- <DxButton hint="View CML" icon="search" :on-click="VIEW_CML" /> -->
              <DxButton name="edit" hint="Edit" icon="edit" />
              <DxButton name="delete" hint="Delete" icon="trash" />
            </DxColumn>

            <template #table-header>
              <div class="dx-table-style">
                <div class="table-header-label">
                  <label>Point</label>
                </div>
              </div>
            </template>
            <template #table-header-button-set>
              <div class="dx-table-style">
                <div class="table-toolbar-set">
                  <v-ons-toolbar-button
                    class="table-toolbar-btn"
                    v-on:click="DELETE_POINT()"
                    v-if="roundnessList.length > 0"
                  >
                    <i class="las la-trash"></i>
                    <span>Delete All Points</span>
                  </v-ons-toolbar-button>
                  <v-ons-toolbar-button
                    class="table-toolbar-btn"
                    v-on:click="OPEN_ADD()"
                    v-if="isCircumSelected==true && roundnessList.length == 0 && circumList.length!=0"
                  >
                    <i class="las la-plus"></i>
                    <span>Create New Points</span>
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
              :allowed-page-sizes="[5, 10, 20]"
              :show-navigation-buttons="true"
              :show-info="true"
              info-text="Page {0} of {1} ({2} items)"
            />
            <!-- <DxExport :enabled="true" /> -->
          </DxDataGrid>
        </div>
        <div class="chart-wrapper" style="grid-column: span 2;">
          <chart :roundnessData="dataList_graph" :key="dataList_graph" />
        </div>
        <div class="upload-graph" style="margin-top:0px">
          <DxFileUploader
            select-button-text="Select File"
            label-text="or Drop an image here"
            upload-mode="useForm"
            :allowed-file-extensions="['.jpg', '.jpeg', '.gif', '.png']"
            accept="image/*"
            ready-to-upload-message="UPLOAD SUCCESSFULLY"
            @value-changed="VALUE_CHANGE"
            v-if="chart_id==0"
          />
          <div
            class="chart-img"
            v-if="chart_id!=0"
            style="margin-top: 10px; border: 1px solid #000; border-radius: 6px; position: relative;"
          >
            <img :src="baseURL + chart_img_1" width="100%" height="200" style="margin-top: 5px;" />
            <button style="position:absolute; top: 5px; right: 5px;" v-on:click="DELETE_CHART()">
              <i class="las la-trash"></i>
            </button>
          </div>
        </div>
        <div class="app-instruction" style="grid-column: span 2;">
          <appInstruction
            title="Instruction"
            desc="Radii measured at 1 ft (0.3048 m) above the shell-to-bottom weld and Radius tolerances measured higher than one foot [>1 ft (0.3048m)] above the shell-to-bottom weld shall not exceed the tolerances show in Table."
          >
            <table class="instruction-table">
              <tr>
                <th>Tank Diameter m (ft)</th>
                <th>
                  Radius Tolerance mm (in)
                  <br />(≤ 0.3048 m)
                </th>
                <th>
                  Radius Tolerance mm (in)
                  <br />(> 0.3048 m)
                </th>
              </tr>
              <tr>
                <td>&lt; 12 (40)</td>
                <td>±13 (&#189;)</td>
                <td>±39 (3&#189;)</td>
              </tr>
              <tr>
                <td>from 12 (40) to &lt; 45 (150)</td>
                <td>±19 (¾)</td>
                <td>±57 (3¾)</td>
              </tr>
              <tr>
                <td>from 45 (150) to &lt; 75 (250)</td>
                <td>±25 (1)</td>
                <td>±75 (3)</td>
              </tr>
              <tr>
                <td>≥ 75 (250)</td>
                <td>±32 (1¼)</td>
                <td>±96 (3¼)</td>
              </tr>
            </table>
          </appInstruction>
        </div>
      </div>
    </div>
    <SelectInspRecord v-if="this.id_inspection_record == ''" />
    <popupAdd v-if="isAdd == true" @closePopup="CLOSE_ADD()" :info="this.id_circum" />
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
import chart from "@/views/Applications/TankList/Pages/Evaluation/charts/chart-roundness-line.vue";
import InspectionRecordPanel from "@/views/Applications/TankList/Pages/inspection-record-panel.vue";
import SelectInspRecord from "@/components/select-insp-record.vue";
import { DxFileUploader } from "devextreme-vue/file-uploader";
import popupAdd from "@/views/Applications/TankList/Pages/Evaluation/Roundness-add.vue";
//import popupSelect from "@/views/Applications/TankList/Pages/Evaluation/Roundness-select.vue";
//import DxSelectBox from "devextreme-vue/select-box";

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
  DxItem
} from "devextreme-vue/data-grid";

//List
// import { DxList } from "devextreme-vue/list";

//FileUpload
//import { DxFileUploader } from "devextreme-vue/file-uploader";
//import { DxButton } from 'devextreme-vue/button';
//import { DxItem } from "devextreme-vue/form";

export default {
  name: "RoundnessView",
  components: {
    //VueTabsChrome,
    //DxList,
    //DxSelectBox,
    popupAdd,
    DxDataGrid,
    DxFileUploader,
    DxSearchPanel,
    DxPaging,
    DxPager,
    DxScrolling,
    DxColumn,
    DxEditing,
    DxButton,
    DxHeaderFilter,
    DxFilterRow,
    appInstruction,
    chart,
    InspectionRecordPanel,
    DxToolbar,
    DxItem,
    SelectInspRecord
  },
  created() {
    this.$store.commit("UPDATE_CURRENT_INAPP", {
      name: "Tank Management",
      icon: "/img/icon_menu/tank/tank.png"
    });
    this.$store.commit("UPDATE_CURRENT_PAGENAME", {
      subpageName: "Evaluation",
      subpageInnerName: "Roundness"
    });
  },
  data() {
    return {
      gridRefName: "grid",
      id_circum: 0,
      isCircumSelected: false,
      circumList: [],
      roundnessList: [],
      dataList_graph: null,
      inspRecordList: {},
      campaignList: {},
      isLoading: false,
      id_inspection_record: "",
      current_view: "",
      dataGridAttributes: {
        class: "data-grid-style"
      },
      pagePanelHiding: false,
      isAdd: false,
      isEdit: false,
      chart_id: 0,
      chart_img_1: ""
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
      console.clear();
      //const id_tag = this.$route.params.id_tag;
      this.isCircumSelected = false;
      this.roundnessList = [];
      this.circumList = [];
      // const dataGrid = this.$refs[this.gridRefName].instance;
      // dataGrid.clearSelection();
      this.id_inspection_record = item.id_inspection_record;
      this.current_view = item;
      this.FETCH_CIRCUM(item);
      this.FETCH_GRAPH(item);
      this.FETCH_CHART();
    },
    FETCH_GRAPH(item) {
      axios({
        method: "get",
        url:
          "roundness/get-roundness-by-insp?id_insp=" +
          item.id_inspection_record,
        headers: {
          Authorization: "Bearer " + JSON.parse(localStorage.getItem("token"))
        },
        data: {}
      })
        .then(res => {
          if (res.status == 200 && res.data) {
            console.log("FETCH GRAPH:");
            this.dataList_graph = res.data;
            console.log(this.dataList_graph);
          }
        })
        .catch(error => {
          console.log(error);
        })
        .finally(() => {
          //this.isLoading = false;
        });
    },
    FETCH_CIRCUM(item) {
      axios({
        method: "get",
        url:
          "roundness/get-roundness-circum-insp-id?id_insp_record=" +
          item.id_inspection_record,
        headers: {
          Authorization: "Bearer " + JSON.parse(localStorage.getItem("token"))
        },
        data: {}
      })
        .then(res => {
          console.log("get circum list:");
          console.log(res.data);
          if (res.status == 200 && res.data) {
            this.circumList = res.data;
          }
        })
        .catch(error => {
          console.log(error);
        })
        .finally(() => {
          //this.isLoading = false;
        });
    },
    CREATE_CIRCUM(e) {
      //console.log(e);
      const distance_above_bottom = e.data.distance_above_bottom;
      const id_tag = this.$route.params.id_tag;
      axios({
        method: "post",
        url: "roundness/add-roundness-circum",
        headers: {
          Authorization: "Bearer " + JSON.parse(localStorage.getItem("token"))
        },
        data: {
          circum_no: e.data.circum_no,
          distance_above_bottom: distance_above_bottom,
          id_inspection_record: this.id_inspection_record,
          id_tag: id_tag
        }
      })
        .then(res => {
          console.log(res);
          if (res.status == 200 && res.data) {
            console.log(res.data);
            this.VIEW_ITEM(this.current_view);
          }
        })
        .catch(error => {
          console.log(error);
        })
        .finally(() => {
          //this.isLoading = false;
        });
    },
    UPDATE_CIRCUM(e) {
      //console.log(e.data);
      axios({
        method: "put",
        url: "roundness/edit-roundness-circum",
        headers: {
          Authorization: "Bearer " + JSON.parse(localStorage.getItem("token"))
        },
        data: e.data
      })
        .then(res => {
          console.log(res);
          if (res.status == 200 && res.data) {
            console.log(res.data);
            this.VIEW_ITEM(this.current_view);
          }
        })
        .catch(error => {
          console.log(error);
        })
        .finally(() => {
          //this.isLoading = false;
        });
    },
    DELETE_CIRCUM(e) {
      console.log(e.data);
      axios({
        method: "delete",
        url: "roundness/delete-roundness-circum?id=" + e.data.id_circum,
        headers: {
          Authorization: "Bearer " + JSON.parse(localStorage.getItem("token"))
        },
        data: null
      })
        .then(res => {
          console.log(res);
          if (res.status == 200 && res.data) {
            console.log(res.data);
            this.FETCH_CIRCUM(this.current_view);
          }
        })
        .catch(error => {
          console.log(error);
        })
        .finally(() => {
          //this.isLoading = false;
        });
    },
    SELECTED_CIRCUM(e) {
      //console.log(e);
      this.id_circum = e.selectedRowKeys[0];
      this.isCircumSelected = true;
      this.FETCH_GRAPH(this.current_view);
      this.FETCH_ROUNDNESS();
    },
    FETCH_ROUNDNESS() {
      axios({
        method: "get",
        url: "roundness/get-roundness-by-circum?id_circum=" + this.id_circum,
        headers: {
          Authorization: "Bearer " + JSON.parse(localStorage.getItem("token"))
        },
        data: {}
      })
        .then(res => {
          console.log("get roundness list:");
          console.log(res.data);
          if (res.status == 200 && res.data) {
            this.roundnessList = res.data;
          }
        })
        .catch(error => {
          console.log(error);
        })
        .finally(() => {
          //this.isLoading = false;
        });
    },
    CREATE_ROUNDNESS(e) {
      this.isLoading = true;
      var id_tag = this.$route.params.id_tag;
      e.data.id_eval = 0;
      e.data.id_tag = id_tag;
      e.data.id_inspection_record = this.id_inspection_record;

      console.log(e.data);
      axios({
        method: "post",
        url: "roundness/add-roundness",
        headers: {
          Authorization: "Bearer " + JSON.parse(localStorage.getItem("token"))
        },
        data: e.data
      })
        .then(res => {
          console.log(res);
          if (res.status == 200 && res.data) {
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
    UPDATE_ROUNDNESS(e) {
      console.log(e.data);
      axios({
        method: "put",
        url: "roundness/edit-roundness",
        headers: {
          Authorization: "Bearer " + JSON.parse(localStorage.getItem("token"))
        },
        data: e.data
      })
        .then(res => {
          console.log(res);
          if (res.status == 200 && res.data) {
            console.log(res.data);
            this.FETCH_ROUNDNESS();
            this.FETCH_GRAPH(this.current_view);
          }
        })
        .catch(error => {
          console.log(error);
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
    DELETE_ROUNDNESS(e) {
      console.log(e.data);
      axios({
        method: "delete",
        url: "roundness/delete-roundness?id_circum=" + e.data.id_circum,
        headers: {
          Authorization: "Bearer " + JSON.parse(localStorage.getItem("token"))
        },
        data: null
      })
        .then(res => {
          console.log(res);
          if (res.status == 200 && res.data) {
            console.log(res.data);
            this.FETCH_ROUNDNESS(this.id_circum);
          }
        })
        .catch(error => {
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
    FETCH_CHART() {
      console.log("==> FETCH: Chart");
      var id = this.current_view.id_inspection_record;
      this.isLoading = true;
      axios({
        method: "get",
        url:
          "chart-image-file/get-chart-image-file-by-ir-id-type?id=" +
          id +
          "&type=roundness",
        headers: {
          Authorization: "Bearer " + JSON.parse(localStorage.getItem("token"))
        }
      })
        .then(res => {
          console.log("==> RES: Chart 1");
          console.log(res.data);
          if (res.status == 200 && res.data) {
            this.chart_id = res.data[0].id_chart;
            this.chart_img_1 = res.data[0].file_path;
          }
        })
        .catch(error => {
          console.log(error);
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
    UPLOAD_CHART(type) {
      var formData = new FormData();
      formData.append(
        "id_inspection_record",
        this.current_view.id_inspection_record
      );
      formData.append("type", type);
      formData.append("created_by", this.$store.state.user.id_account);
      formData.append("file", this.file);
      axios({
        method: "post",
        url: "chart-image-file/add-chart-image-file",
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: "Bearer " + JSON.parse(localStorage.getItem("token"))
        },
        data: formData
      })
        .then(res => {
          //console.log(res);
          if (res.status == 201) {
            //console.log("in");
            //console.log(res.data);
            //this.$ons.notification.alert("UPLOAD COMPLETED");
            this.FETCH_CHART();
            console.log("UPLOAD COMPLETED");
          }
        })
        .catch(error => {
          console.log(error);
          this.$ons.notification.alert(
            "Only image files are allowed. [ jpg, jpeg, png, gif, bmp ]"
          );
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
    DELETE_CHART() {
      this.$ons.notification.confirm("Confirm delete?").then(res => {
        if (res == 1) {
          const id = this.chart_id;
          console.log(id);
          axios({
            method: "delete",
            url: "/chart-image-file/delete-chart-image-file?id=" + id,
            headers: {
              Authorization:
                "Bearer " + JSON.parse(localStorage.getItem("token"))
            }
          })
            .then(res => {
              console.log(res);
              if (res.status == 200) {
                this.chart_id = 0;
                //this.FETCH_CHART_1();
              }
            })
            .catch(error => {
              this.isLoading = false;
              this.$ons.notification.alert(
                error.code + " " + error.response.status + " " + error.message
              );
            })
            .finally(() => {});
        }
      });
    },
    VALUE_CHANGE(e) {
      //console.log("fileReader e data:");
      //console.log(e);
      let reader = new FileReader();
      reader.readAsDataURL(e.value[0]);
      reader.onload = () => {};
      this.file = e.value[0];
      this.file_name = e.value[0].name;
      this.UPLOAD_CHART("roundness");
    },
    OPEN_ADD() {
      this.isAdd = true;
    },
    CLOSE_ADD() {
      this.FETCH_ROUNDNESS(this.id_circum);
      this.isAdd = false;
    },
    DELETE_POINT() {
      this.$ons.notification.confirm("Are you sure?").then(res => {
        if (res == 1) {
          axios({
            method: "delete",
            url: "roundness/delete-roundness?id_circum=" + this.id_circum,
            headers: {
              Authorization:
                "Bearer " + JSON.parse(localStorage.getItem("token"))
            },
            data: null
          })
            .then(res => {
              console.log(res);
              if (res.status == 200 && res.data) {
                console.log(res.data);
                this.FETCH_ROUNDNESS(this.id_circum);
              }
            })
            .catch(error => {
              console.log(error);
            })
            .finally(() => {
              this.isLoading = false;
            });
        }
      });
    },
    OPEN_EDIT() {
      this.isEdit = true;
    },
    CLOSE_EDIT() {
      this.VIEW_ITEM(this.current_view);
      this.isEdit = false;
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
  // padding: 20px;
  display: grid;
  grid-template-columns: 201px calc(100% - 201px);
  // grid-auto-rows: 27px auto;
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
    width: calc(100% - 20px);
    display: grid;
    grid-template-columns: 30% 70%;
    grid-template-rows: auto 400px;
    grid-gap: 20px;
  }

  @media (max-width: 1219px) {
    .content {
      display: inline;
    }
    .table-wrapper {
      height: auto;
    }
  }
}

.data-grid-style {
  height: 100%;
  border-radius: 6px;
}

.table-wrapper {
  height: auto;
}

.instruction-table {
  // width: 100%;
  margin-top: 10px;
  text-align: center;
}
.chart-wrapper {
  height: auto;
}
</style>