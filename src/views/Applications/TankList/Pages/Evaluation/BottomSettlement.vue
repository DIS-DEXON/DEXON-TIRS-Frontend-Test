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
              <label>Line</label>
            </div>
            <div class="right"></div>
          </div>
          <DxDataGrid
            id="bottom-set-line-grid"
            key-expr="id_line"
            :data-source="bottomSetLine"
            :element-attr="dataGridAttributes"
            :selection="{ mode: 'single' }"
            :hover-state-enabled="true"
            :allow-column-reordering="true"
            :show-borders="true"
            :show-row-lines="true"
            :row-alternation-enabled="false"
            :word-wrap-enabled="true"
            @row-inserted="CREATE_LINE"
            @row-updated="UPDATE_LINE"
            @row-removed="DELETE_LINE"
            @selection-changed="VIEW_POINT"
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

            <DxColumn data-field="direction_from" caption="Direction From" />

            <DxColumn data-field="direction_to" caption="Direction To" />

            <DxColumn data-field="degree_from" caption="Degree From  (x°)" format="#,##0.00" />

            <DxColumn data-field="degree_to" caption="Degree To (x°)" format="#,##0.00" />

            <DxColumn data-field="remark" caption="Remark" />

            <DxColumn type="buttons">
              <!-- <DxButton hint="View CML" icon="search" :on-click="VIEW_CML" /> -->
              <DxButton name="edit" hint="Edit" icon="edit" />
              <DxButton name="delete" hint="Delete" icon="trash" />
            </DxColumn>

            <!-- Configuration goes here -->
            <!-- <DxFilterRow :visible="true" /> -->
            <DxScrolling mode="standard" />
            <DxSearchPanel :visible="false" />
            <DxPaging :page-size="5" :page-index="0" />
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
        <div class="table-wrapper">
          <div class="table-header-toolbar" style="width: calc(100% - 82px)">
            <div class="left">
              <label>Point</label>
            </div>
            <div class="right"></div>
          </div>
          <DxDataGrid
            id="bottom-set-point-grid"
            key-expr="id_point"
            :data-source="bottomSetPoint"
            :element-attr="dataGridAttributes"
            :selection="{ mode: 'single' }"
            :hover-state-enabled="true"
            :allow-column-reordering="true"
            :show-borders="true"
            :show-row-lines="true"
            :row-alternation-enabled="false"
            :word-wrap-enabled="true"
            @row-inserted="CREATE_POINT"
            @row-updated="UPDATE_POINT"
            @row-removed="DELETE_POINT"
          >
            <DxFilterRow :visible="true" />
            <DxHeaderFilter :visible="true" />

            <DxEditing
              :allow-updating="true"
              :allow-deleting="true"
              :allow-adding="true"
              :use-icons="true"
              mode="row"
            />

            <DxColumn data-field="point_no" caption="Direction From" />

            <DxColumn data-field="distance_m" caption="Distance (m)" format="#,##0.00" />

            <DxColumn data-field="value" caption="Value" format="#,##0.00" />

            <DxColumn type="buttons">
              <!-- <DxButton hint="View CML" icon="search" :on-click="VIEW_CML" /> -->
              <DxButton name="edit" hint="Edit" icon="edit" />
              <DxButton name="delete" hint="Delete" icon="trash" />
            </DxColumn>

            <!-- Configuration goes here -->
            <!-- <DxFilterRow :visible="true" /> -->
            <DxScrolling mode="standard" />
            <DxSearchPanel :visible="false" />
            <DxPaging :page-size="5" :page-index="0" />
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
          <chart :floorGradientData="bottomSetGraph" :key="bottomSetGraph" />
        </div>
        <div class="upload-graph">
          <DxFileUploader
            select-button-text="Select File"
            label-text="or Drop an image here"
            upload-mode="useForm"
            :allowed-file-extensions="['.jpg', '.jpeg', '.gif', '.png']"
            ready-to-upload-message="UPLOAD SUCCESSFULLY"
            @value-changed="VALUE_CHANGE"
          />
        </div>
        <div class="table-wrapper" style="grid-column: span 2; margin-top: 30px;">
          <DxDataGrid
            id="bulge-depression-grid"
            key-expr="id_eval"
            :data-source="bulgeList"
            :element-attr="dataGridAttributes"
            :selection="{ mode: 'single' }"
            :hover-state-enabled="true"
            :allow-column-reordering="true"
            :show-borders="true"
            :show-row-lines="true"
            :row-alternation-enabled="false"
            :word-wrap-enabled="true"
            @row-inserted="CREATE_BULGE"
            @row-updated="UPDATE_BULGE"
            @row-removed="DELETE_BULGE"
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

            <DxColumn data-field="no" caption="No." width="100" />

            <DxColumn data-field="bulge_depression" caption="Bulge or Depression" />

            <DxColumn data-field="bbm_mm" caption="BBM (mm)" format="#,##0.00" width="100" />

            <DxColumn data-field="bbm_inch" caption="BBM (inch)" format="#,##0.00" width="100" />

            <DxColumn data-field="radius_mm" caption="R (mm)" format="#,##0.00" width="100" />

            <DxColumn data-field="radius_ft" caption="R (ft)" format="#,##0.00" width="100" />

            <DxColumn data-field="bb_inch" caption="BB (inch)" format="#,##0.00" width="100" />

            <DxColumn data-field="result" caption="Result" />

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

        <div class="app-instruction" style="grid-column: span 2; margin-top: 30px;">
          <appInstruction title="Instruction" desc="Floor Gradient Survey">
            <ol>
              <li>
                The number of radials is based on the number specified in table
                below.
              </li>
              <li>
                Spacing between evaluation locations to be determined following
                table below.
              </li>
            </ol>
            <table class="instruction-table">
              <tr>
                <th>Tank Diameter (m)</th>
                <th>Number of Radials</th>
                <th>Distance Between Measurements</th>
              </tr>
              <tr>
                <td>1-5</td>
                <td>4</td>
                <td>0.75 m</td>
              </tr>
              <tr>
                <td>6-15</td>
                <td>4</td>
                <td>1.0 m</td>
              </tr>
              <tr>
                <td>16-45</td>
                <td>8</td>
                <td>1.5 m</td>
              </tr>
              <tr>
                <td>> 45</td>
                <td>16</td>
                <td>2.0 m</td>
              </tr>
            </table>
          </appInstruction>
        </div>
      </div>
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
// import innerPageName from "@/components/app-structures/app-inner-pagename.vue";
import appInstruction from "@/components/app-structures/app-instruction-dialog.vue";
import chart from "@/views/Applications/TankList/Pages/Evaluation/charts/chart-floor-gradient-line.vue";
import InspectionRecordPanel from "@/views/Applications/TankList/Pages/inspection-record-panel.vue";
import SelectInspRecord from "@/components/select-insp-record.vue";

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
  DxFilterRow
} from "devextreme-vue/data-grid";

//List
// import { DxList } from "devextreme-vue/list";

//FileUpload
import { DxFileUploader } from "devextreme-vue/file-uploader";
//import { DxButton } from 'devextreme-vue/button';
//import { DxItem } from "devextreme-vue/form";

export default {
  name: "BottomSettlementView",
  components: {
    //VueTabsChrome,
    //DxList,
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
    InspectionRecordPanel,
    SelectInspRecord,
    chart
  },
  created() {
    this.$store.commit("UPDATE_CURRENT_INAPP", {
      name: "Tank Management",
      icon: "/img/icon_menu/tank/tank.png"
    });
    this.$store.commit("UPDATE_CURRENT_PAGENAME", {
      subpageName: "Evaluation",
      subpageInnerName: "Bottom Settlement"
    });
  },
  data() {
    return {
      bottomSetLine: {},
      bottomSetPoint: {},
      bottomSetGraph: {},
      bulgeList: {},
      inspRecordList: {},
      campaignList: {},
      isLoading: false,
      id_inspection_record: "",
      current_view: {},
      dataGridAttributes: {
        class: "data-grid-style"
      },
      pagePanelHiding: false,
      id_line: 0
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
      this.id_inspection_record = item.id_inspection_record;
      this.current_view = item;
      const id_tag = this.$route.params.id_tag;
      //floor gradient
      axios({
        method: "post",
        url: "bottom-settlement/get-bottom-settlement-line",
        headers: {
          Authorization: "Bearer " + JSON.parse(localStorage.getItem("token"))
        },
        data: {
          id_tag: id_tag,
          id_inspection_record: item.id_inspection_record
        }
      })
        .then(res => {
          console.log("get-bottom-settlement-line:");
          console.log(res.data);
          if (res.status == 200 && res.data) {
            this.bottomSetLine = res.data;
            this.FETCH_GRAPH();
          }
        })
        .catch(error => {
          console.log(error);
        })
        .finally(() => {
          this.isLoading = false;
        });

      //bulge
      axios({
        method: "post",
        url: "bottom-settlement/get-bulge-depression",
        headers: {
          Authorization: "Bearer " + JSON.parse(localStorage.getItem("token"))
        },
        data: {
          id_tag: id_tag,
          id_inspection_record: item.id_inspection_record
        }
      })
        .then(res => {
          console.log("get bulge list:");
          console.log(res.data);
          if (res.status == 200 && res.data) {
            this.bulgeList = res.data;
          }
        })
        .catch(error => {
          console.log(error);
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
    CREATE_LINE(e) {
      this.isLoading = true;
      var id_tag = this.$route.params.id_tag;
      e.data.id_line = 0;
      e.data.id_tag = id_tag;
      e.data.id_inspection_record = this.id_inspection_record;
      console.log(e.data);
      axios({
        method: "post",
        url: "bottom-settlement/add-bottom-settlement-line",
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
    UPDATE_LINE(e) {
      console.log(e.data);
      axios({
        method: "put",
        url: "bottom-settlement/edit-bottom-settlement-line",
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
    DELETE_LINE(e) {
      console.log(e.data);
      axios({
        method: "delete",
        url: "bottom-settlement/delete-bottom-settlement-line",
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
    VIEW_POINT(e) {
      console.log(e);
      this.id_line = e.selectedRowKeys[0];
      this.FETCH_POINT();
    },
    FETCH_POINT() {
      axios({
        method: "post",
        url: "bottom-settlement/get-bottom-settlement-point",
        headers: {
          Authorization: "Bearer " + JSON.parse(localStorage.getItem("token"))
        },
        data: {
          id_line: this.id_line
        }
      })
        .then(res => {
          console.log("get-bottom-settlement-point:");
          console.log(res.data);
          if (res.status == 200 && res.data) {
            this.bottomSetPoint = res.data;
          }
        })
        .catch(error => {
          console.log(error);
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
    CREATE_POINT(e) {
      if (this.id_line > 0) {
        e.data.id_point = 0;
        e.data.id_line = this.id_line;
        console.log(e.data);
        axios({
          method: "post",
          url: "bottom-settlement/add-bottom-settlement-point",
          headers: {
            Authorization: "Bearer " + JSON.parse(localStorage.getItem("token"))
          },
          data: e.data
        })
          .then(res => {
            console.log(res);
            if (res.status == 200 && res.data) {
              console.log(res.data);
              this.FETCH_POINT();
              this.FETCH_GRAPH();
            }
          })
          .catch(error => {
            console.log(error);
          })
          .finally(() => {
            this.isLoading = false;
          });
      }
    },
    UPDATE_POINT(e) {
      console.log(e.data);
      axios({
        method: "put",
        url: "bottom-settlement/edit-bottom-settlement-point",
        headers: {
          Authorization: "Bearer " + JSON.parse(localStorage.getItem("token"))
        },
        data: e.data
      })
        .then(res => {
          console.log(res);
          if (res.status == 200 && res.data) {
            console.log(res.data);
            this.FETCH_POINT();
          }
        })
        .catch(error => {
          console.log(error);
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
    DELETE_POINT(e) {
      console.log(e.data);
      axios({
        method: "delete",
        url: "bottom-settlement/delete-bottom-settlement-point",
        headers: {
          Authorization: "Bearer " + JSON.parse(localStorage.getItem("token"))
        },
        data: e.data
      })
        .then(res => {
          console.log(res);
          if (res.status == 200 && res.data) {
            console.log(res.data);
            this.FETCH_POINT();
          }
        })
        .catch(error => {
          console.log(error);
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
    FETCH_GRAPH() {
      var id_tag = this.$route.params.id_tag;
      var id_inspection_record = this.current_view.id_inspection_record;
      axios({
        method: "post",
        url: "bottom-settlement/get-bottom-settlement-graph",
        headers: {
          Authorization: "Bearer " + JSON.parse(localStorage.getItem("token"))
        },
        data: {
          id_tag: id_tag,
          id_inspection_record: id_inspection_record
        }
      })
        .then(res => {
          console.log("get-bottom-settlement-graph:");
          console.log(res.data);
          if (res.status == 200 && res.data) {
            this.bottomSetGraph = res.data;
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
    CREATE_BULGE(e) {
      this.isLoading = true;
      var id_tag = this.$route.params.id_tag;
      e.data.id_eval = 0;
      e.data.id_tag = id_tag;
      e.data.id_inspection_record = this.id_inspection_record;

      console.log(e.data);
      axios({
        method: "post",
        url: "bottom-settlement/add-bulge-depression",
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
    UPDATE_BULGE(e) {
      console.log(e.data);
      axios({
        method: "put",
        url: "bottom-settlement/edit-bulge-depression",
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
    DELETE_BULGE(e) {
      console.log(e.data);
      axios({
        method: "delete",
        url: "bottom-settlement/delete-bulge-depression",
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
    SHOW_HIDE_PANEL() {
      this.pagePanelHiding = !this.pagePanelHiding;
    },
    DATE_FORMAT(d) {
      return moment(d).format("LL");
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
    VALUE_CHANGE(e) {
      //console.log("fileReader e data:");
      //console.log(e);
      let reader = new FileReader();
      reader.readAsDataURL(e.value[0]);
      reader.onload = () => {};
      this.file = e.value[0];
      this.file_name = e.value[0].name;
      this.UPLOAD_CHART("bottom_settlement");
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
    grid-template-columns: 60% 40%;
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
  height: 100%;
}

.instruction-table {
  // width: 100%;
  margin-top: 10px;
  text-align: center;
}
</style>