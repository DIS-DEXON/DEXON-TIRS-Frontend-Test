<template>
  <div class="pm-page">
    <toolbar
      pageName="Tank List"
      @refreshInfo="FETCH_LIST()"
      @newBtnFn="TOGGLE_POPUP()"
      :isBackPath="true"
      isBack_specificPath="/"
      newBtnLabel="New Tank"
      :isNewBtn="true"
      style="grid-column: span 2"
    />
    <div class="pm-page-container">
      <div class="page-container">
        <DxDataGrid
          id="data-grid-style"
          :data-source="tankList"
          :selection="{ mode: 'single' }"
          :hover-state-enabled="true"
          :allow-column-reordering="true"
          :show-borders="true"
          :show-row-lines="true"
          :row-alternation-enabled="false"
          @exporting="EXPORT_DATA"
        >
          <DxColumn
            data-field="created_time"
            :width="0"
            caption=""
            sort-order="asc"
          />
          <DxColumn data-field="tag_no" caption="Tag No" />
          <DxColumn data-field="tank_no" caption="Tank No" />
          <DxColumn data-field="site_desc" caption="Site" />

          <DxColumn :width="50" caption="" cell-template="cell-button-set" />
          <template #cell-button-set="{ data }">
            <div class="table-btn-group">
              <div class="table-btn" v-on:click="VIEW_INFO(data)">
                <i class="las la-search blue"></i>
              </div>
            </div>
          </template>
          <!-- Configuration goes here -->
          <!-- <DxFilterRow :visible="true" /> -->
          <DxScrolling mode="standard" />
          <DxSearchPanel :visible="true" />
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
      <contentLoading
        text="Loading, please wait..."
        v-if="isLoading == true"
        color="#fc9b21"
      />
    </div>
    <popupAdd v-if="isAdd == true" @closePopup="TOGGLE_POPUP()" />
  </div>
</template> 

<script>
//DataGrid
import "devextreme/dist/css/dx.light.css";
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
  DxExport,
} from "devextreme-vue/data-grid";

//Structures
import contentLoading from "@/components/app-structures/app-content-loading.vue";
import toolbar from "@/components/app-structures/app-toolbar.vue";
import popupAdd from "@/views/Applications/TankList/popup-add.vue";

//API
import axios from "/axios.js";

export default {
  name: "ViewProjectList",
  components: {
    DxDataGrid,
    DxSearchPanel,
    DxPaging,
    DxPager,
    DxScrolling,
    DxColumn,
    DxExport,
    toolbar,
    contentLoading,
    popupAdd,
  },
  created() {
    this.$store.commit("UPDATE_CURRENT_INAPP", {
      name: "Tank Management",
      icon: "/img/icon_menu/tank/tank.png",
    });
    this.$store.commit("UPDATE_CURRENT_CLIENT", {
      name: this.infoClient.company_name,
      logo: this.infoClient.logo,
    });

    if (this.$store.state.status.server == true) this.FETCH_LIST();
  },
  data() {
    return {
      projectList: "",
      isAdd: false,
      isEdit: false,
      isLoading: false,
      errorMessage: "",
      editInfo: "",
      infoClient: {
        id_client: 1,
        logo: "/img/mockup/client.png",
        company_name: "PTT LNG Company Limited",
      },
      tankList: [],
    };
  },
  computed: {},
  methods: {
    VIEW_INFO(e) {
      const rowID = e.data.id_tank;
      if (rowID != null) {
        this.$router.push("/tank/info/info/" + rowID);
      }
    },
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
    TOGGLE_POPUP() {
      this.isAdd = !this.isAdd;
    },
    FETCH_LIST() {
      this.isLoading = true;
      var id_client = this.$route.params.id_client;
      console.log("ID CLIENT: " + id_client);
      axios({
        method: "post",
        url: "/tank-info/tank-info-by-client",
        headers: {
          Authorization: "Bearer " + JSON.parse(localStorage.getItem("token")),
        },
        data: {
          id_client: id_client,
        },
      })
        .then((res) => {
          console.log(res);
          if (res.status == 200 && res.data) {
            this.tankList = res.data;
          }
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.pm-page {
  border: 1px solid #e6e6e6;
  border-width: 0;
  background-color: #ffffff;
  height: 100%;

  .pm-page-container {
    background-color: #ffffff;
    padding: 20px 20px 0px 20px;
    height: calc(100vh - 159px);
    overflow-y: scroll;

    .page-container {
      width: 100%;
      height: 100%;
      margin: 0 auto;
    }
  }
}
#data-grid {
  height: 100%;
}
</style>