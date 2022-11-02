<template>
  <div class="popup-wrapper">
    <div class="popup-card">
      <div class="popup-header">
        <label>Edit Account</label>
      </div>
      <div class="popup-content form" v-if="all_form_select_loaded == true">
        <div class="form-item-container">
          <label class="section-text" style="grid-column: span 2; margin-top: 0"
            >Log-in Informations</label
          >
          <div class="input-set">
            <div class="label-box">
              <p class="label">Username:</p>
              <span class="star-label"><i class="las la-asterisk"></i></span>
            </div>
            <input
              type="text"
              placeholder="Username"
              v-model="formData.username"
            />
          </div>
          <div class="input-set">
            <div class="label-box">
              <p class="label">Password:</p>
              <!-- <label class="star-label"><i class="las la-asterisk"></i></label> -->
            </div>
            <input type="password" placeholder="**********" disabled />
          </div>

          <label class="section-text" style="grid-column: span 2"
            >Account Informations</label
          >
          <div style="display: grid; grid-template-columns: 120px auto">
            <div class="input-set" style="padding-right: 10px; width: unset">
              <div class="label-box">
                <p class="label">Prefix:</p>
                <span class="star-label"><i class="las la-asterisk"></i></span>
              </div>
              <DxSelectBox
                style="border: 0; font-size: 14px"
                :items="formSelect.prefixList"
                placeholder="Select Prefix"
                v-model="formData.id_prefix"
                display-expr="prefix_desc"
                value-expr="id_prefix"
              />
            </div>
            <div class="input-set">
              <div class="label-box">
                <p class="label">First Name:</p>
                <span class="star-label"><i class="las la-asterisk"></i></span>
              </div>
              <input
                type="text"
                placeholder="First Name"
                v-model="formData.first_name"
              />
            </div>
          </div>
          <div class="input-set">
            <p class="label">Last Name:</p>
            <input
              type="text"
              placeholder="Last Name"
              v-model="formData.last_name"
            />
          </div>
          <div class="input-set">
            <div class="label-box">
              <p class="label">Employee No:</p>
              <span class="star-label"><i class="las la-asterisk"></i></span>
            </div>
            <input
              type="text"
              placeholder="Employee No"
              v-model="formData.emp_no"
            />
          </div>
          <div class="input-set">
            <div class="label-box">
              <p class="label">Department:</p>
              <label class="star-label"><i class="las la-asterisk"></i></label>
            </div>
            <DxSelectBox
              style="border: 0; font-size: 14px"
              :items="formSelect.departmentList"
              placeholder="Select Department"
              v-model="formData.id_department"
              display-expr="department_desc"
              value-expr="id_department"
            />
          </div>
          <div class="input-set">
            <div class="label-box">
              <p class="label">Position:</p>
              <label class="star-label"><i class="las la-asterisk"></i></label>
            </div>
            <DxSelectBox
              style="border: 0; font-size: 14px"
              :items="formSelect.positionList"
              placeholder="Select Position"
              v-model="formData.id_position"
              display-expr="position_desc"
              value-expr="id_position"
            />
          </div>
          <div class="input-set">
            <div class="label-box">
              <p class="label">Role:</p>
              <label class="star-label"><i class="las la-asterisk"></i></label>
            </div>
            <DxSelectBox
              style="border: 0; font-size: 14px"
              :items="formSelect.roleList"
              placeholder="Select Role"
              v-model="formData.id_role"
              display-expr="role_desc"
              value-expr="id_role"
            />
          </div>
          <div class="input-set">
            <div class="label-box">
              <p class="label">Email:</p>
              <!-- <span class="star-label"><i class="las la-asterisk"></i></span> -->
            </div>
            <input type="email" placeholder="Email" v-model="formData.email" />
          </div>
          <div class="input-set">
            <div class="label-box">
              <p class="label">Phone No:</p>
              <!-- <span class="star-label"><i class="las la-asterisk"></i></span> -->
            </div>
            <input
              type="tel"
              placeholder="Phone No"
              v-model="formData.phone_no"
            />
          </div>
        </div>
      </div>
      <div
        class="popup-content loading-section"
        v-if="all_form_select_loaded == false"
      >
        <contentLoading text="Loading, please wait..." color="#fc9b21" />
      </div>
      <div class="popup-footer">
        <div class="button-set">
          <button
            class="blue"
            v-on:click="SAVE()"
            v-if="all_form_select_loaded == true"
          >
            <label>Save</label>
          </button>
          <button class="grey" v-on:click="CANCEL()">
            <label>Cancel</label>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "/axios.js";
import clone from "just-clone";
import DxSelectBox from "devextreme-vue/select-box";
import contentLoading from "@/components/app-structures/app-content-loading.vue";

export default {
  name: "popup-edit-account",
  components: {
    DxSelectBox,
    contentLoading,
  },
  props: {
    editInfo: Object,
  },
  created() {
    this.formData = clone(this.editInfo);
    this.FETCH_DROPDOWN_LIST();
  },
  data() {
    return {
      formData: {},
      formSelect: {
        roleList: [],
        departmentList: [],
        positionList: [],
        prefixList: [],
      },
    };
  },
  methods: {
    SAVE() {
      if (
        this.formData.username &&
        this.formData.id_prefix &&
        this.formData.first_name &&
        this.formData.emp_no &&
        this.formData.id_department &&
        this.formData.id_position &&
        this.formData.id_role
      ) {
        this.$ons.notification.confirm("Confirm save?").then((res) => {
          if (res == 1) {
            const data = this.formData;
            axios({
              method: "put",
              url: "/account-user/edit-dexon-account",
              headers: {
                Authorization:
                  "Bearer " + JSON.parse(localStorage.getItem("token")),
              },
              data: data,
            })
              .then((res) => {
                if (res.status == 200) {
                  this.$ons.notification.alert("Edit successful");
                  this.$emit("btn-cancel-edit");
                  this.$emit("refreshList");
                }
              })
              .catch((error) => {
                this.$ons.notification.alert(
                  error.code + " " + error.response.status + " " + error.message
                );
              })
              .finally(() => {});
          }
        });
      } else {
        this.$ons.notification.alert("Please fill all required fields.");
      }
    },
    CANCEL() {
      let form = this.formData;
      if (this.formData != form) {
        this.$ons.notification
          .confirm("Your unsaved changes will be lost")
          .then((res) => {
            if (res == 1) {
              this.$emit("btn-cancel-edit");
            }
          });
      } else {
        this.$emit("btn-cancel-edit");
      }
    },
    FETCH_DROPDOWN_LIST() {
      this.FETCH_DROPDOWN_DEXON_DEPARTMENT();
      this.FETCH_DROPDOWN_DEXON_POSITION();
      this.FETCH_DROPDOWN_ROLE();
      this.FETCH_DROPDOWN_PREFIX();
    },
    FETCH_DROPDOWN_DEXON_DEPARTMENT() {
      axios({
        method: "get",
        url: "/MdDexonDepartment",
        headers: {
          Authorization: "Bearer " + JSON.parse(localStorage.getItem("token")),
        },
      })
        .then((res) => {
          if (res.status == 200) {
            this.formSelect.departmentList = res.data;
          }
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {});
    },
    FETCH_DROPDOWN_DEXON_POSITION() {
      axios({
        method: "get",
        url: "/MdDexonPosition",
        headers: {
          Authorization: "Bearer " + JSON.parse(localStorage.getItem("token")),
        },
      })
        .then((res) => {
          if (res.status == 200) {
            this.formSelect.positionList = res.data;
          }
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {});
    },
    FETCH_DROPDOWN_ROLE() {
      axios({
        method: "get",
        url: "/account-user/role-list",
        headers: {
          Authorization: "Bearer " + JSON.parse(localStorage.getItem("token")),
        },
      })
        .then((res) => {
          if (res.status == 200) {
            this.formSelect.roleList = res.data;
          }
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {});
    },
    FETCH_DROPDOWN_PREFIX() {
      axios({
        method: "get",
        url: "/MdPrefix",
        headers: {
          Authorization: "Bearer " + JSON.parse(localStorage.getItem("token")),
        },
      })
        .then((res) => {
          if (res.status == 200) {
            this.formSelect.prefixList = res.data;
          }
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {});
    },
  },
  computed: {
    all_form_select_loaded() {
      if (
        this.formSelect.roleList.length > 0 &&
        this.formSelect.departmentList.length > 0 &&
        this.formSelect.positionList.length > 0 &&
        this.formSelect.prefixList.length > 0
      ) {
        return true;
      } else return false;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/style/main.scss";
.form-item-container {
  width: auto;
  display: grid;
  grid-template-columns: repeat(2, 300px);
  grid-gap: 10px;
}

textarea {
  max-width: 610px;
  min-width: 610px;
}

.loading-section {
  height: 222px;
  margin-top: -51px;
  padding: 0;
  width: 350px;
  .app-content-loading {
    top: 51px;
    left: 0;
    height: 211px;
  }
}
</style>