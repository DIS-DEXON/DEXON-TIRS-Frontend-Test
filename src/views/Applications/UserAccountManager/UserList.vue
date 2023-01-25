<template>
  <div class="page-wrapper">
    <div class="page-toolbar">
      <toolbar
        pageSubName="User Account"
        @refreshInfo="FETCH_LIST()"
        :isNewBtn="true"
        newBtnLabel="New Account"
        @newBtnFn="TOGGLE_POPUP('add')"
        :isBack="true"
      />
    </div>
    <div class="page-content">
      <DxDataGrid
        id="user-account-table"
        :element-attr="dataGridAttributes"
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
          <div class="table-btn-group" v-if="data.data.id_role != 5">
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
          <div class="table-btn-group" v-if="data.data.id_role != 5">
            <!-- <div class="table-btn" v-on:click="VIEW_INFO(data)">
                <i class="las la-search blue"></i>
              </div> -->
            <div class="table-btn" v-on:click="TOGGLE_POPUP('edit', data)">
              <i class="las la-pen green"></i>
            </div>
            <div class="table-btn" v-on:click="DELETE_ACCOUNT(data)">
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
import toolbar from "@/components/app-structures/app-navbar-toolbar.vue";
import popupAdd from "@/views/Applications/UserAccountManager/account-add.vue";
import popupEdit from "@/views/Applications/UserAccountManager/account-edit.vue";
import contentLoading from "@/components/app-structures/app-content-loading.vue";

//JS
import clone from "just-clone";
import { sha256 } from "js-sha256";

export default {
  name: "User-Account-List",
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
    this.$store.commit("CLEAR_CURRENT_CLIENT");
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
      errorMessage: "",
      editInfo: "",
      dataGridAttributes: {
        class: "data-grid-style",
      },
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
    DELETE_ACCOUNT(data) {
      this.$ons.notification.confirm("Confirm delete?").then((res) => {
        if (res == 1) {
          axios({
            method: "put",
            url: "/account-user/delete-dexon-account",
            headers: {
              Authorization:
                "Bearer " + JSON.parse(localStorage.getItem("token")),
            },
            data: { id_account: data.data.id_account },
          })
            .then((res) => {
              if (res.status == 200) {
                this.$ons.notification.alert("Account delete successful");
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
</style>