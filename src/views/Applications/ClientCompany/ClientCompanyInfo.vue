<template>
  <div class="pm-page">
    <div class="pm-toolbar">
      <toolbar
        :pageSubName="companyInfo.company_name"
        @refreshInfo="FETCH_LIST()"
        :isNewBtn="false"
        newBtnLabel="New Client"
        @newBtnFn="TOGGLE_POPUP('add')"
        :isBack="true"
      />
    </div>
    <div class="pm-page-container">
      <div class="page-content page-list">
        <DxDataGrid
          id="data-grid-style"
          key-expr="id"
          :data-source="siteList"
          :selection="{ mode: 'single' }"
          :hover-state-enabled="true"
          :allow-column-reordering="false"
          :show-borders="true"
          :show-row-lines="false"
          :row-alternation-enabled="true"
          @exporting="EXPORT_DATA"
          @row-inserted="CREATE_STATUS"
          @row-updated="UPDATE_STATUS"
          @row-removed="DELETE_STATUS"
        >
          <DxColumn data-field="site_name" caption="Site Name" />
          <DxColumn data-field="site_desc" caption="Site Description" />
          <DxEditing
            :allow-updating="true"
            :allow-deleting="true"
            :allow-adding="true"
            mode="row"
          />
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
    </div>
    <popupAdd
      v-if="isAdd == true"
      @btn-cancel-add="TOGGLE_POPUP('add')"
      @refreshList="FETCH_LIST()"
    />
    <popupEdit
      v-if="isEdit == true"
      @btn-cancel-edit="TOGGLE_POPUP('edit')"
      @refreshList="FETCH_LIST()"
      v-bind:editInfo="editInfo"
    />
    <contentLoading
      text="Loading, please wait..."
      v-if="isLoading == true"
      color="#fc9b21"
    />
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
  DxEditing,
} from "devextreme-vue/data-grid";

//API
import axios from "/axios.js";

//Pages & Structures
import toolbar from "@/components/app-structures/app-toolbar.vue";
import popupAdd from "@/views/Applications/ClientCompany/client-add.vue";
import popupEdit from "@/views/Applications/ClientCompany/client-edit.vue";
import contentLoading from "@/components/app-structures/app-content-loading.vue";

//JS
// import clone from "just-clone";
// import { sha256 } from "js-sha256";

export default {
  name: "ViewClientList",
  components: {
    toolbar,
    DxDataGrid,
    DxSearchPanel,
    DxPaging,
    DxPager,
    DxScrolling,
    DxColumn,
    DxExport,
    contentLoading,
    popupAdd,
    popupEdit,
    DxEditing,
  },
  created() {
    this.$store.commit("UPDATE_CURRENT_INAPP", {
      name: "Client Company Manager",
      icon: "/img/icon_menu/client/client.png",
    });
    if (this.$store.state.status.server == true) {
      this.FETCH_COMPANY_INFO();
      this.FETCH_SITE_LIST();
    }
  },
  data() {
    return {
      siteList: [],
      companyInfo: {},
      isAdd: false,
      isEdit: false,
      isLoading: false,
      currentViewRow: {},
      errorMessage: "",
      editInfo: "",
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
      const worksheet = workbook.addWorksheet("Clients");
      exportDataGrid({
        worksheet: worksheet,
        component: e.component,
      }).then(function () {
        workbook.xlsx.writeBuffer().then(function (buffer) {
          saveAs(
            new Blob([buffer], { type: "application/octet-stream" }),
            "Clients.xlsx"
          );
        });
      });
      e.cancel = true;
    },
    FETCH_COMPANY_INFO() {
      this.isLoading = true;
      var id_client = this.$route.params.id_client;
      axios({
        method: "get",
        url: "/MdClientCompany/" + id_client,
        headers: {
          Authorization: "Bearer " + JSON.parse(localStorage.getItem("token")),
        },
      })
        .then((res) => {
          console.log(res);
          if (res.data) {
            this.companyInfo = res.data;
          }
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
    FETCH_SITE_LIST() {
      this.isLoading = true;
      var id_client = this.$route.params.id_client;
      axios({
        method: "get",
        url: "/MdSite/get-md-site-by-client-id?id=" + id_client,
        headers: {
          Authorization: "Bearer " + JSON.parse(localStorage.getItem("token")),
        },
      })
        .then((res) => {
          console.log(res);
          if (res.data) {
            this.siteList = res.data;
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
@import "@/style/main.scss";
.pm-page {
  border: 1px solid #e6e6e6;
  border-width: 0 0 0 1px;
  background-color: #ffffff;
  height: 100%;
  // display: grid;
  // grid-template-rows: 61px auto;
  // grid-template-columns: auto 360px;

  .pm-page-container {
    background-color: #ffffff;
    // padding: 20px 20px 0px 20px;
    height: calc(100vh - 119px);
    display: flex;
    overflow-y: auto;

    .page-content {
      width: 100%;
      height: fit-content;
      margin: 0 auto;
      padding: 20px;
    }
    .page-nodata {
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .page-info {
      width: auto;
    }
  }
}

.pm-toolbar {
  grid-column: span 2;
}
.border-left {
  border: 1px solid #e6e6e6;
  border-width: 0 0 0 1px;
  padding: 0 !important;
  height: calc(100vh - 139px) !important;
}

.client-logo {
  width: 85px;
  height: 85px;
  display: flex;
  justify-content: center;
  align-items: center;
  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
}

.dx-datagrid-content .dx-datagrid-table .dx-row > td,
.dx-datagrid-content .dx-datagrid-table .dx-row > tr > td {
  vertical-align: middle !important;
}
</style>