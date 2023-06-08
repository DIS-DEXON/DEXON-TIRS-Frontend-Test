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
          <DxDataGrid
            id="roundness-grid"
            key-expr="id_eval"
            :data-source="bucklingList"
            :element-attr="dataGridAttributes"
            :selection="{ mode: 'single' }"
            :hover-state-enabled="true"
            :allow-column-reordering="true"
            :show-borders="true"
            :show-row-lines="true"
            :row-alternation-enabled="false"
            :word-wrap-enabled="true"
            @row-inserted="CREATE_BUCKLING"
            @row-updated="UPDATE_BUCKLING"
            @row-removed="DELETE_BUCKLING"
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

            <DxColumn data-field="plate" caption="Course - Plate No." />

            <DxColumn
              data-field="measured_height_m"
              caption="Measured Height (m)"
              format="#,###0.000"
            />

            <DxColumn
              data-field="shape_dia_mm"
              caption="Theoretical Shape Diameter (mm)"
              format="#,##0.00"
            />

            <DxColumn data-field="deviation_mm" caption="Deviation (mm)" format="#,##0.00" />

            <DxColumn
              data-field="radious_tolerance"
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
      <div class="app-instruction">
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
//import { DxFileUploader } from "devextreme-vue/file-uploader";
//import { DxButton } from 'devextreme-vue/button';
//import { DxItem } from "devextreme-vue/form";

export default {
  name: "BucklingView",
  components: {
    //VueTabsChrome,
    //DxList,
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
    appInstruction,
    InspectionRecordPanel,
    SelectInspRecord
  },
  created() {
    this.$store.commit("UPDATE_CURRENT_PAGENAME", {
      subpageName: "Evaluation",
      subpageInnerName: "Buckling"
    });
  },
  data() {
    return {
      bucklingList: {},
      isLoading: false,
      id_inspection_record: "",
      current_view: "",
      dataGridAttributes: {
        class: "data-grid-style"
      },
      pagePanelHiding: false
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
      axios({
        method: "post",
        url: "buckling/get-buckling",
        headers: {
          Authorization: "Bearer " + JSON.parse(localStorage.getItem("token"))
        },
        data: {
          id_tag: id_tag,
          id_inspection_record: item.id_inspection_record
        }
      })
        .then(res => {
          console.log("get buckling list:");
          console.log(res.data);
          if (res.status == 200 && res.data) {
            this.bucklingList = res.data;
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
    CREATE_BUCKLING(e) {
      this.isLoading = true;
      var id_tag = this.$route.params.id_tag;
      e.data.id_eval = 0;
      e.data.id_tag = id_tag;
      e.data.id_inspection_record = this.id_inspection_record;

      console.log(e.data);
      axios({
        method: "post",
        url: "buckling/add-buckling",
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
    UPDATE_BUCKLING(e) {
      console.log(e.data);
      axios({
        method: "put",
        url: "buckling/edit-buckling",
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
    DELETE_BUCKLING(e) {
      console.log(e.data);
      axios({
        method: "delete",
        url: "buckling/delete-buckling",
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
  .content {
    width: 100%;
    // width: calc(100% - 20px);
    // display: grid;
    // grid-template-columns: 600px calc(100% - 600px);
    // grid-gap: 20px;
    display: block;
  }
}

.dx-list-item-content::before {
  content: none;
}

.data-grid-style {
  height: 100%;
  border-radius: 6px;
}

.app-instruction {
  padding-top: 20px;
}

.table-wrapper {
  height: 100%;
}

.instruction-table {
  // width: 100%;
  margin-top: 10px;
}
</style>