<template>
  <div id="page-visit-record">
    <div class="pm-page">
      <div class="pm-toolbar">
        <toolbar
          pageName="Visiting Record"
          @refreshInfo="FETCH_LIST()"
          :isNewBtn="true"
          newBtnLabel="New Visit Record"
          @newBtnFn="TOGGLE_POPUP()"
        />
      </div>
      <div class="pm-page-container">
        <div class="page-container">
          <DxDataGrid
            id="record-visiting-list"
            :data-source="visitRecordList"
            :selection="{ mode: 'single' }"
            :hover-state-enabled="true"
            :allow-column-reordering="true"
            :show-borders="true"
            :show-row-lines="false"
            :row-alternation-enabled="true"
            :word-wrap-enabled="true"
            @exporting="EXPORT_DATA"
          >
            <DxColumn data-field="doc_no" caption="Record No." :width="150" />
            <DxColumn data-field="client_company_name" caption="Client Name" />
            <DxColumn data-field="client_name" caption="Client Contact Name" />
            <DxColumn data-field="objective" caption="Objective" />
            <DxColumn
              data-field="sign_client_signed"
              data-type="boolean"
              caption="Sign Status"
              trueText="Signed"
              falseText="Unsigned"
              :show-editor-always="false"
              :width="120"
            />
            <DxColumn
              data-field="create_at"
              data-type="date"
              format="dd MMM, yyyy"
              caption="Create Date"
              sort-order="desc"
              :width="120"
            />

            <DxColumn :width="60" caption="" cell-template="cell-button-set" />
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
      </div>
      <popupAdd v-if="isAdd == true" @closePopup="TOGGLE_POPUP()" />

      <contentLoading
        text="Loading, please wait..."
        v-if="isLoading == true"
        color="#fbcb04"
      />
    </div>
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
import popupAdd from "@/views/Applications/Record/Visiting/visiting-add.vue";

//API
import axios from "/axios.js";

export default {
  name: "ViewVisitingList",
  components: {
    toolbar,
    contentLoading,
    popupAdd,
    DxDataGrid,
    DxSearchPanel,
    DxPaging,
    DxPager,
    DxScrolling,
    DxColumn,
    DxExport,
  },
  created() {
    this.$store.commit("UPDATE_CURRENT_INAPP", {
      name: "Visiting Record",
      icon: "/img/icon_menu/record/visit.png",
    });
    if (this.$store.state.status.server == true) this.FETCH_LIST();
  },
  data() {
    return {
      visitRecordList: [{}],
      isAdd: false,
      isEdit: false,
      isLoading: false,
      errorMessage: "",
      editInfo: "",
    };
  },
  methods: {
    VIEW_INFO(item) {
      const rowID = item.data.id_visit;
      if (rowID != null) {
        this.$router.push("/record/visiting/" + rowID);
      }
    },
    TOGGLE_POPUP() {
      this.isAdd = !this.isAdd;
    },
    FETCH_LIST() {
      this.isLoading = true;
      const user = JSON.parse(localStorage.getItem("user"));
      const id_user = user.id_user;

      axios({
        method: "post",
        url: "/visit-record/visit-record-list",
        headers: {
          Authorization: "Bearer " + JSON.parse(localStorage.getItem("token")),
        },
        data: { id_user },
      })
        .then((res) => {
          if (res.status == 200 && res.data) {
            // console.log(res);
            this.visitRecordList = res.data;
          }
        })
        .catch((error) => {
          this.$ons.notification.alert(
            error.code + " " + error.response.status + " " + error.message
          );
        })
        .finally(() => {
          this.isLoading = false;
        });
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
  },
};
</script>

<style lang="scss" scoped>
.pm-page {
  border: 1px solid #e6e6e6;
  border-width: 0 0 0 1px;
  background-color: #ffffff;
  height: 100%;

  .pm-page-container {
    background-color: #ffffff;
    padding: 20px 20px 0px 20px;
    height: calc(100vh - 180px);

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