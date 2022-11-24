<template>
  <div class="page-container">
    <innerPageName
      pageName="Thickness Messurement"
      breadcrumb1="MFL Bottom"
      style="grid-column: span 2"
    />
    <div class="list-panel">
      <div class="column-header">Inspection Record</div>
      <DxList :data-source="inspRecordList">
        <template #item="{ data: item }">
          <div
            class="list-item-wrapper"
            :class="{
              active: item.id_inspection_record == id_inspection_record,
            }"
          >
            <div class="contents">
              {{ DATE_FORMAT(item.inspection_date) }}<br />
              {{ SET_CAMPAIGN(item.id_campaign) }}
            </div>
            <div class="contents">
              <v-ons-toolbar-button
                class="btn"
                v-on:click="VIEW_MLF(item.id_inspection_record)"
              >
                <i class="las la-search"></i>
              </v-ons-toolbar-button>
            </div>
          </div>
        </template>
      </DxList>
    </div>
    <div class="list-page" style="overflow-y: scroll">
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
            :allow-adding="true"
            :use-icons="true"
            mode="row"
          />

          <DxColumn 
            data-field="plate_no" 
            caption="Plate no"
          />

          <DxColumn 
            data-field="t_nom" 
            caption="tnom (mm)"
          />

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
          />

          <DxColumn 
            data-field="lowest_remaining_thk_bottom" 
            caption="Remaining thk bottom side (mm)"
          />

          <DxColumn 
            data-field="defect_x" 
            caption="X (mm)"
          />

          <DxColumn 
            data-field="defect_y" 
            caption="Y (mm)"
          />

          <DxColumn 
            data-field="type_of_repair" 
            caption="Type of repair"
          />

          <DxColumn 
            data-field="repair_width" 
            caption="Width"
          />

          <DxColumn 
            data-field="repair_length" 
            caption="Length"
          />

          <DxColumn 
            data-field="repair_thick" 
            caption="Thick"
          />

          <DxColumn 
            data-field="repair_radius" 
            caption="Radius"
          />

          <DxColumn 
            data-field="repair_status" 
            caption="Repair status"
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
</template> 

<script>
//API
import axios from "/axios.js";
import moment from "moment";

//Components
import "devextreme/dist/css/dx.light.css";
import innerPageName from "@/components/app-structures/app-inner-pagename.vue";

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

//List
import { DxList } from "devextreme-vue/list";

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
    DxList,
    DxDataGrid,
    DxSearchPanel,
    DxPaging,
    DxPager,
    DxScrolling,
    DxColumn,
    DxEditing,
    DxButton,
    innerPageName,
    DxHeaderFilter,
  DxFilterRow,
  },
  created() {
    this.$store.commit("UPDATE_CURRENT_INAPP", {
      name: "Tank Management",
      icon: "/img/icon_menu/tank/tank.png",
    });
    this.$store.commit("UPDATE_CURRENT_PAGENAME", "Marked-Up Drawing");
    if (this.$store.state.status.server == true) {
      this.FETCH_CAMPAIGN();
      this.FETCH_INSP_RECORD();
    }
  },
  data() {
    return {
      drawingList: [],
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
    DATE_FORMAT(d) {
      return moment(d).format("LL");
    },
    VIEW_MLF(id_inspection_record) {
      this.id_inspection_record = id_inspection_record;
      axios({
        method: "post",
        url: "mfl-bottom-thickness/get-mfl-bottom-data-by-insp-id",
        headers: {
          Authorization: "Bearer " + JSON.parse(localStorage.getItem("token")),
        },
        data: {
          id_inspection_record: id_inspection_record,
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
            this.VIEW_MLF(this.id_inspection_record);
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
            this.VIEW_MLF(this.id_inspection_record);
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
    FETCH_CAMPAIGN() {
      this.isLoading = true;
      axios({
        method: "get",
        url: "/insp-record/campaign-list",
        headers: {
          Authorization: "Bearer " + JSON.parse(localStorage.getItem("token")),
        },
      })
        .then((res) => {
          console.log(res);
          if (res.status == 200 && res.data) {
            this.campaignList = res.data;
          }
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
    SET_CAMPAIGN(id) {
      if (this.campaignList) {
        var data = this.campaignList.filter(function (e) {
          return e.id_campaign == id;
        });
        console.log(data);
        return data[0].campaign_desc;
      }
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
  grid-template-columns: 250px calc(100% - 250px);
  grid-auto-rows: 41px auto;
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

.info-tab-display {
  display: flex;
}

.dx-list-item-content::before {
  content: none;
}
#data-grid-style {
  width: 100%;
}

.btn-view-dwg {
  padding: 8px;
  text-align: center;
  background-color: #eb1851;
  color: #fff;
  border-radius: 8px;
  position: absolute;
  bottom: 10px;
  right: 10px;
}
</style>