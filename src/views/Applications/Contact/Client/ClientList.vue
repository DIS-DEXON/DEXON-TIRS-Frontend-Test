<template>
  <div class="pm-page">
    <div class="pm-toolbar">
      <toolbar
        pageName="Client Contact"
        @refreshInfo="FETCH_LIST()"
        :isNewBtn="true"
        newBtnLabel="New Client Info"
        @newBtnFn="TOGGLE_POPUP('add')"
      />
    </div>
    <div class="pm-page-container">
      <div class="page-content page-list">
        <DxDataGrid
          id="contact-client-list"
          :data-source="clientList"
          :selection="{ mode: 'single' }"
          :hover-state-enabled="true"
          :allow-column-reordering="false"
          :show-borders="true"
          :show-row-lines="false"
          :row-alternation-enabled="true"
          @exporting="EXPORT_DATA"
        >
          <DxColumn data-field="client_name" caption="Client Name" />
          <DxColumn data-field="location" caption="Location" />
          <DxColumn data-field="phone_no" caption="Phone No" />
          <DxColumn :width="50" caption="" cell-template="option-btn-set" />
          <template #option-btn-set="{ data }">
            <div class="table-btn-group">
              <div class="table-btn" v-on:click="VIEW_INFO(data)">
                <i class="las la-search blue"></i>
              </div>
              <!-- <div class="table-btn" v-on:click="TOGGLE_POPUP('edit', data)">
                <i class="las la-pen green"></i>
              </div>
              <div class="table-btn" v-on:click="DELETE_CLIENT(data)">
                <i class="las la-trash red"></i>
              </div> -->
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
      <div class="page-content page-info border-left">
        <div class="pm-info-sidebar form">
          <p class="pm-section-label">Details</p>
          <!-- <div class="pm-sidebar-close-btn" v-on:click="$emit('close-infobar')">
      <i class="las la-times"></i>
    </div> -->
          <div class="form-item-container">
            <div class="input-set">
              <p class="label">Client Name:</p>
              <p class="info">
                {{ currentViewRow.client_name }}
              </p>
            </div>
            <div class="input-set">
              <p class="label">Address:</p>
              <p class="info">
                {{ currentViewRow.address }}
              </p>
            </div>
            <div class="input-set">
              <p class="label">Location:</p>
              <p class="info">
                {{ currentViewRow.location }}
              </p>
            </div>
            <div class="input-set">
              <p class="label">Domestic:</p>
              <p class="info" v-if="currentViewRow.is_domestic == true">Yes</p>
              <p class="info" v-if="currentViewRow.is_domestic == false">No</p>
            </div>
            <div class="input-set">
              <p class="label">Phone:</p>
              <p class="info">
                {{ currentViewRow.phone_no }}
              </p>
            </div>
            <div class="input-set">
              <p class="label">Email:</p>
              <p class="info">
                {{ currentViewRow.email }}
              </p>
            </div>
          </div>
          <div class="form-button-container">
            <div class="button-set info-button-set">
              <v-ons-toolbar-button v-on:click="TOGGLE_POPUP('edit')">
                <i class="las la-pen"></i>
                <span>Edit</span>
              </v-ons-toolbar-button>
              <v-ons-toolbar-button class="red" v-on:click="DELETE_CLIENT()">
                <i class="las la-trash"></i>
                <span>Delete</span>
              </v-ons-toolbar-button>
            </div>
          </div>
        </div>
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
} from "devextreme-vue/data-grid";

//API
import axios from "/axios.js";

//Pages & Structures
import toolbar from "@/components/app-structures/app-toolbar.vue";
import popupAdd from "@/views/Applications/Contact/Client/client-add.vue";
import popupEdit from "@/views/Applications/Contact/Client/client-edit.vue";
import contentLoading from "@/components/app-structures/app-content-loading.vue";
import clone from "just-clone";

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
  },
  created() {
    this.$store.commit("UPDATE_CURRENT_INAPP", {
      name: "Client Contact",
      icon: "/img/icon_menu/contact/client.png",
    });
    if (this.$store.state.status.server == true) this.FETCH_LIST();
  },
  data() {
    return {
      clientList: [],
      isAdd: false,
      isEdit: false,
      isLoading: false,
      currentViewRow: {},
      errorMessage: "",
      editInfo: "",
    };
  },
  computed: {},
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
    VIEW_INFO(e) {
      this.currentViewRow = e.data;
    },
    TOGGLE_POPUP(m) {
      if (m == "add") {
        if (this.isAdd == true) this.isAdd = false;
        else this.isAdd = true;
      } else if (m == "edit") {
        if (this.isEdit == true) this.isEdit = false;
        else {
          this.editInfo = clone(this.currentViewRow);
          this.isEdit = true;
        }
      }
    },
    FETCH_LIST() {
      this.isLoading = true;
      axios({
        method: "get",
        url: "/contact-client/client-list",
        headers: {
          Authorization: "Bearer " + JSON.parse(localStorage.getItem("token")),
        },
      })
        .then((res) => {
          // console.log(res);
          if (res.data) {
            this.clientList = res.data;
            this.currentViewRow = this.clientList[0];
          }
        })
        .catch((error) => {
          console.log(error);
          this.$ons.notification.alert(
            error.code +
              " " +
              error.response.status +
              " " +
              error.response.statusText
          );
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
    DELETE_CLIENT() {
      let rowID = this.currentViewRow.id_client;
      this.$ons.notification.confirm("Confirm delete?").then((res) => {
        if (res == 1) {
          axios({
            method: "delete",
            url: "/contact-client/client-delete",
            headers: {
              Authorization:
                "Bearer " + JSON.parse(localStorage.getItem("token")),
            },
            data: { id_client: rowID },
          })
            .then((res) => {
              if (res.status == 200) {
                this.$ons.notification.alert(
                  "Client contact delete successful"
                );
                this.FETCH_LIST();
              }
            })
            .catch((error) => {
              this.$ons.notification.alert(
                error.code + " " + error.response.status
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
    height: calc(100vh - 180px);
    display: flex;

    .page-content {
      width: 100%;
      height: 100%;
      margin: 0 auto;
    }
    .page-nodata {
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .page-list {
      width: auto;
      padding: 20px 20px 0 20px;
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
.pm-info-sidebar {
  width: 360px;
  height: 100%;
  background: #fff;
  padding: 0 20px;
  overflow-y: scroll;
  position: relative;
  .pm-section-label {
    font-style: normal;
    font-weight: 600;
    font-size: 1.75em;
    line-height: 16px;
    letter-spacing: -0.08px;
    color: $web-font-color-black;
    padding: 20px 0 10px 0;
    margin: 0;
    user-select: text;
  }
  .form-item-container {
    display: block;
  }
  .pm-sidebar-close-btn {
    width: 40px;
    height: 20px;
    position: absolute;
    top: 20px;
    right: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #f3f0f0;
    border-radius: 20px;
    cursor: pointer;
    i {
      font-size: 1.75em;
    }
  }

  .pm-sidebar-close-btn:hover {
    background: #f6f6f6;
  }
  .pm-sidebar-close-btn:active {
    background: #f3f0f0;
  }
}

.pm-info-sidebar::-webkit-scrollbar {
  display: none;
}

.form-item-container:last-child {
  margin-bottom: 40px;
}
</style>