<template>
  <div class="popup-wrapper">
    <div class="popup-card">
      <div class="popup-header">
        <label>Create New Account</label>
      </div>
      <div class="popup-content form">
        <div class="form-item-container">
          <label class="section-text" style="grid-column: span 2; margin-top: 0"
            >Account Informations</label
          >

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
              v-model="formData.employee_no"
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
              v-model="formData.department"
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

          <label class="section-text" style="grid-column: span 2"
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
              <p class="label">Role:</p>
              <label class="star-label"><i class="las la-asterisk"></i></label>
            </div>
            <DxSelectBox
              style="border: 0; font-size: 14px"
              :items="formSelect.roleList"
              placeholder="Select Role"
              v-model="formData.role"
            />
          </div>
        </div>
      </div>
      <div class="popup-footer">
        <div class="button-set">
          <button class="blue" v-on:click="SAVE()">
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
// import clone from "just-clone";
import DxSelectBox from "devextreme-vue/select-box";

export default {
  name: "popup-add-account",
  components: {
    DxSelectBox,
  },
  data() {
    return {
      formData: {
        password: "dex0n7845",
      },
      formSelect: {
        roleList: ["staff", "admin"],
        departmentList: ["OPS", "DPS", "Management"],
      },
    };
  },
  methods: {
    SAVE() {
      if (this.formData.client_name) {
        this.$ons.notification.confirm("Confirm save?").then((res) => {
          if (res == 1) {
            const data = this.formData;
            axios({
              method: "post",
              url: "/contact-client/client-add",
              headers: {
                Authorization:
                  "Bearer " + JSON.parse(localStorage.getItem("token")),
              },
              data: data,
            })
              .then((res) => {
                if (res.status == 200) {
                  this.$ons.notification.alert("Client Add successful");
                  this.$emit("btn-cancel-add");
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
        this.$ons.notification.alert('"Client name" field cannot be empty');
      }
    },
    CANCEL() {
      console.log(this.formData);
      let form = this.formData;
      console.log(form);
      if (this.formData != form) {
        this.$ons.notification
          .confirm("Your unsaved changes will be lost")
          .then((res) => {
            if (res == 1) {
              this.$emit("btn-cancel-add");
            }
          });
      } else {
        this.$emit("btn-cancel-add");
      }
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
</style>