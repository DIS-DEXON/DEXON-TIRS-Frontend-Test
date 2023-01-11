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
        <v-ons-list-header
          >Inspection Details of
          <b>
            {{ DATE_FORMAT(current_view.inspection_date) }}</b
          ></v-ons-list-header
        >
      </v-ons-list>
      <DxDataGrid
        id="mfl-grid"
        key-expr="id_thk"
        :data-source="mflBottom"
        :element-attr="dataGridAttributes"
        :selection="{ mode: 'single' }"
        :hover-state-enabled="true"
        :allow-column-reordering="true"
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

        <DxColumn data-field="plate_no" caption="Plate no" />

        <DxColumn data-field="t_nom" caption="tnom (mm)" />

        <DxColumn
          data-field="metal_loss_top"
          caption="%Metal loss (top side)"
        />

        <DxColumn
          data-field="metal_loss_bottom"
          caption="%Metal loss (bottom side)"
        />

        <DxColumn
          data-field="lowest_remaining_thk_top"
          caption="Remaining thk top side (mm)"
          :allow-editing="false"
        />

        <DxColumn
          data-field="lowest_remaining_thk_bottom"
          caption="Remaining thk bottom side (mm)"
          :allow-editing="false"
        />

        <DxColumn data-field="defect_x" caption="X (mm)" />

        <DxColumn data-field="defect_y" caption="Y (mm)" />

        <DxColumn data-field="type_of_repair" caption="Type of repair" />

        <DxColumn data-field="repair_width" caption="Width" />

        <DxColumn data-field="repair_length" caption="Length" />

        <DxColumn data-field="repair_thick" caption="Thick" />

        <DxColumn data-field="repair_radius" caption="Radius" />

        <DxColumn data-field="repair_status" caption="Repair status" />

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
import InspectionRecordPanel from "@/views/Applications/TankList/Pages/inspection-record-panel.vue";

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
  },
  created() {
    this.$store.commit("UPDATE_CURRENT_INAPP", {
      name: "Tank Management",
      icon: "/img/icon_menu/tank/tank.png",
    });
    this.$store.commit("UPDATE_CURRENT_PAGENAME", {
      subpageName: "Thickness Messurement",
      subpageInnerName: "MFL - Bottom",
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
        class: "data-grid-style",
      },
      pagePanelHiding: false,
      current_view: {},
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
      this.id_inspection_record = item.id_inspection_record;
      axios({
        method: "post",
        url: "mfl-bottom-thickness/get-mfl-bottom-data-by-insp-id",
        headers: {
          Authorization: "Bearer " + JSON.parse(localStorage.getItem("token")),
        },
        data: {
          id_inspection_record: item.id_inspection_record,
        },
      })
        .then((res) => {
          console.log("mfl:");
          console.log(res.data);
          if (res.status == 200 && res.data) {
            this.mflBottom = res.data;
          }
        })
        .catch((error) => {
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
      var date = this.inspRecordList.filter(function (v) {
        return v.id_inspection_record == e.data.id_inspection_record;
      });
      e.data.inspection_date = moment(date[0].inspection_date).format("L");
      console.log(e.data);
      axios({
        method: "post",
        url: "mfl-bottom-thickness/add-mfl-bottom-data",
        headers: {
          Authorization: "Bearer " + JSON.parse(localStorage.getItem("token")),
        },
        data: e.data,
      })
        .then((res) => {
          console.log(res);
          if (res.status == 200 && res.data) {
            console.log(res.data);
            this.VIEW_ITEM(this.id_inspection_record);
          }
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
    UPDATE_MFL(e) {
      var date = this.inspRecordList.filter(function (v) {
        return v.id_inspection_record == e.data.id_inspection_record;
      });
      e.data.inspection_date = moment(date[0].inspection_date).format("L");
      console.log(e.data);
      axios({
        method: "put",
        url: "mfl-bottom-thickness/edit-mfl-bottom-data",
        headers: {
          Authorization: "Bearer " + JSON.parse(localStorage.getItem("token")),
        },
        data: e.data,
      })
        .then((res) => {
          console.log(res);
          if (res.status == 200 && res.data) {
            console.log(res.data);
            this.VIEW_ITEM(this.id_inspection_record);
          }
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
    DELETE_MFL(e) {
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
}

#data-grid-style {
  width: 100%;
}
</style>