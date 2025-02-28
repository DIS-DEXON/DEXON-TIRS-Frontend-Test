<template>
  <div class="pm-page">
    <div class="pm-toolbar">
      <toolbar
        pageName="User Account"
        @refreshInfo="FETCH_LIST()"
        :isNewBtn="true"
        newBtnLabel="New Account"
        @newBtnFn="TOGGLE_POPUP('add')"
        :isBack="true"
      />
    </div>
    <div class="pm-page-container">
      <div class="page-content page-list">
        <DxDataGrid
          id="data-grid-style"
          :data-source="accountList"
          :selection="{ mode: 'single' }"
          :hover-state-enabled="true"
          :allow-column-reordering="false"
          :show-borders="true"
          :show-row-lines="false"
          :row-alternation-enabled="true"
          @exporting="EXPORT_DATA"
        >
          <DxColumn
            data-field="id_account"
            alignment="center"
            :width="50"
            caption="ID"
          />
          <DxColumn data-field="emp_no" caption="Employee No" />
          <DxColumn data-field="prefix_desc" caption="Prefix" :width="80" />
          <DxColumn data-field="first_name" caption="First Name" />
          <DxColumn data-field="last_name" caption="Last Name" />
          <DxColumn data-field="role_desc" caption="Role" />
          <DxColumn data-field="username" caption="Username" />
          <DxColumn data-field="position_desc" caption="Position" />
          <DxColumn data-field="department_desc" caption="Department" />
          <DxColumn
            caption="Password"
            :width="150"
            cell-template="option-btn-password"
          />
          <DxColumn :width="90" caption="" cell-template="option-btn-set" />
          <template #option-btn-password="{ data }">
            <div
              class="table-btn-group"
              v-if="data.data.role_desc != 'super user'"
            >
              <div
                class="table-btn table-btn-none"
                v-on:click="RESET_PASSWORD(data)"
              >
                <i class="las la-undo-alt red"></i>
                <span class="red">reset password</span>
              </div>
            </div>
          </template>
          <template #option-btn-set="{ data }">
            <div
              class="table-btn-group"
              v-if="data.data.role_desc != 'super user'"
            >
              <!-- <div class="table-btn" v-on:click="VIEW_INFO(data)">
                <i class="las la-search blue"></i>
              </div> -->
              <div class="table-btn" v-on:click="TOGGLE_POPUP('edit', data)">
                <i class="las la-pen green"></i>
              </div>
              <div class="table-btn" v-on:click="DELETE_CLIENT(data)">
                <i class="las la-trash red"></i>
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
import popupAdd from "@/views/Applications/UserAccountManager/account-add.vue";
import popupEdit from "@/views/Applications/UserAccountManager/account-edit.vue";
import contentLoading from "@/components/app-structures/app-content-loading.vue";

//JS
import clone from "just-clone";
import { sha256 } from "js-sha256";

export default {
  name: "ViewAccountList",
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
      name: "User Account Manager",
      icon: "/img/icon_menu/account/account.png",
    });
    if (this.$store.state.status.server == true) this.FETCH_LIST();
  },
  data() {
    return {
      accountList: [],
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
    TOGGLE_POPUP(m, data) {
      if (m == "add") {
        if (this.isAdd == true) this.isAdd = false;
        else this.isAdd = true;
      } else if (m == "edit") {
        if (this.isEdit == true) this.isEdit = false;
        else {
          this.editInfo = clone(data.data);
          this.isEdit = true;
        }
      }
    },
    FETCH_LIST() {
      this.isLoading = true;
      axios({
        method: "get",
        url: "/account-user/account-list",
        headers: {
          Authorization: "Bearer " + JSON.parse(localStorage.getItem("token")),
        },
      })
        .then((res) => {
          // console.log(res);
          if (res.data) {
            this.accountList = res.data;
          }
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
    DELETE_ACCOUNT() {
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
    RESET_PASSWORD(row_data) {
      // console.log(row_data);
      // console.log("Reset account id: " + row_data.data.id_account);
      this.$ons.notification.confirm("Confirm password reset?").then((res) => {
        if (res == 1) {
          axios({
            method: "put",
            url: "/account-user/change-password",
            headers: {
              Authorization:
                "Bearer " + JSON.parse(localStorage.getItem("token")),
            },
            data: {
              id_account: row_data.data.id_account,
              password: sha256("dex0n7845"),
            },
          })
            .then((res) => {
              if (res.status == 200) {
                this.$ons.notification.alert("Password reset successful");
              }
              this.FETCH_LIST();
            })
            .catch((error) => {
              console.log(error);
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
    height: calc(100vh - 119px);
    display: flex;
    overflow-y: scroll;

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
      padding: 20px;
      margin-bottom: 80px;
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