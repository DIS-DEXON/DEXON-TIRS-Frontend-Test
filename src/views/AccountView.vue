<template>
  <div class="page-wrapper">
    <div class="page-toolbar">
      <toolbar pageSubName="My Account" :isBack="true" />
    </div>
    <div class="page-content">
      <!-- 
      <div class="form">
        <div class="page-section-button">
          <h2 class="page-section-label">Profile Photo</h2>
          <v-ons-toolbar-button
            class="button"
            v-on:click="BTN_EDIT('photo')"
            v-if="isEdit.photo == false"
          >
            <i class="las la-edit"></i>
            <span>Edit</span>
          </v-ons-toolbar-button>
        </div>
        <div class="form-item-container profile-box">
          <div class="profile-photo">
            <div class="btn-pic-change" v-if="isEdit.photo == true">
              <label for="pic-upload-btn"><i class="las la-edit"></i></label>
            </div>
            <input
              type="file"
              id="pic-upload-btn"
              style="display: none"
              ref="file"
              @change="UPLOAD_PIC()"
            />
             <img :src="user.profile_picture" v-if="user.profile_picture" /> 
            <img src="/img/default_profile_picture.png" />
          </div>
        </div> 
        <div class="form-button-container" v-if="isEdit.photo == true">
          <div class="button-set">
            <button class="grey" v-on:click="BTN_CANCEL()">
              <label>Cancel</label>
            </button>
          </div>
        </div>
      </div> -->
      <div class="form">
        <div class="page-section-button">
          <h2 class="page-section-label">Personal Informations</h2>
          <v-ons-toolbar-button
            class="button"
            v-on:click="BTN_EDIT('info')"
            v-if="isEdit.info == false"
          >
            <i class="las la-edit"></i>
            <span>Edit</span>
          </v-ons-toolbar-button>
        </div>
        <div class="form-item-container">
          <div class="input-set">
            <p class="label">Name:</p>
            <p class="info" v-if="isEdit.info == false">
              {{ user.first_name }} {{ user.last_name }}
            </p>
            <input
              placeholder="Firstname"
              v-model="formData.first_name"
              v-if="isEdit.info == true"
              style="border-radius: 6px 0 0 6px; grid-column: span 1"
            />
            <input
              placeholder="Lastname"
              v-model="formData.last_name"
              v-if="isEdit.info == true"
              style="
                border-radius: 0 6px 6px 0;
                border-width: 1px 1px 1px 0;
                grid-column: span 1;
              "
            />
          </div>
          <div class="input-set">
            <p class="label">Role:</p>
            <p class="info">
              {{ user.role_desc }}
            </p>
          </div>
          <div class="input-set">
            <p class="label">Employee No:</p>
            <p class="info">
              {{ user.emp_no }}
            </p>
          </div>
          <div class="input-set">
            <p class="label">Email:</p>
            <p class="info" v-if="isEdit.info == false">
              {{ user.email }}
            </p>
            <input
              placeholder="Email"
              v-model="formData.email"
              v-if="isEdit.info == true"
            />
          </div>
          <div class="input-set">
            <p class="label">Phone No:</p>
            <p class="info" v-if="isEdit.info == false">
              {{ user.phone_no }}
            </p>
            <input
              placeholder="Phone No"
              v-model="formData.phone_no"
              v-if="isEdit.info == true"
            />
          </div>
        </div>
        <div class="form-button-container" v-if="isEdit.info == true">
          <div class="button-set">
            <button class="blue" v-on:click="SAVE_EDIT_INFO()">
              <label>Save</label>
            </button>
            <button class="grey" v-on:click="BTN_CANCEL()">
              <label>Cancel</label>
            </button>
          </div>
        </div>
      </div>
      <div class="form">
        <div class="page-section-button">
          <h2 class="page-section-label">Account Setting</h2>
          <v-ons-toolbar-button
            class="button"
            v-on:click="BTN_EDIT('account')"
            v-if="isEdit.account == false"
          >
            <i class="las la-edit"></i>
            <span>Edit</span>
          </v-ons-toolbar-button>
        </div>
        <div class="form-item-container">
          <div class="input-set">
            <p class="label">Username:</p>
            <p class="info">
              {{ user.username }}
            </p>
          </div>
          <div class="input-set" v-if="isEdit.account == true">
            <p class="label">Old Password:</p>
            <input
              placeholder="Old Password"
              v-model="formData.oldPassword"
              v-if="isEdit.account == true"
              type="password"
            />
          </div>
          <div class="input-set" v-if="isEdit.account == false">
            <p class="label">Password:</p>
            <p class="info">
              {{ invisiblePassword }}
            </p>
          </div>
          <div class="input-set" v-if="isEdit.account == true">
            <p class="label">New Password:</p>
            <input
              placeholder="New Password"
              v-model="formData.newPassword"
              type="password"
            />
          </div>
          <div
            class="input-set"
            v-if="formData.newPassword && this.isEdit.account == true"
          >
            <p class="label">Confirm Password:</p>
            <input
              placeholder="Confirm Password"
              v-model="formData.confirmPassword"
              v-if="isEdit.account == true"
              type="password"
              v-on:keyup.enter="SAVE_EDIT_ACCOUNT()"
            />
          </div>
        </div>
        <div class="form-button-container" v-if="isEdit.account == true">
          <div class="button-set">
            <button class="blue" v-on:click="SAVE_EDIT_ACCOUNT()">
              <label>Save</label>
            </button>
            <button class="grey" v-on:click="BTN_CANCEL()">
              <label>Cancel</label>
            </button>
          </div>
        </div>
      </div>
    </div>
    <PageLoading v-if="isLoading == true" text="Loading" />
  </div>
</template>

<script>
//JS
import clone from "just-clone";
import { sha256 } from "js-sha256";
// import moment from "moment";

//API
import axios from "/axios.js";

//UI Components

import ViewLayout from "@/layouts/non-sidebar-layout.vue";
// import DxDateBox from "devextreme-vue/date-box";
// import DxSelectBox from "devextreme-vue/select-box";
import PageLoading from "@/components/app-structures/app-loading.vue";
import toolbar from "@/components/app-structures/app-navbar-toolbar.vue";

export default {
  name: "AccountView",
  components: { PageLoading, toolbar },
  data() {
    return {
      user: "",
      formData: "",
      invisiblePassword: "********",
      isEdit: {
        info: false,
        account: false,
        photo: false,
      },
      picUpload: "",
      isLoading: false,
    };
  },
  created() {
    this.$emit(`update:layout`, ViewLayout);
    this.$store.commit("CLEAR_CURRENT_CLIENT");
    this.$store.commit("UPDATE_CURRENT_INAPP", {
      name: "My Account",
      icon: "",
    });
    if (this.$store.state.status.server == true) this.FETCH_USER_INFO();
  },
  mounted() {},
  methods: {
    FETCH_USER_INFO() {
      this.isLoading = true;
      setTimeout(() => {
        var id_account = JSON.parse(localStorage.getItem("user")).id_account;
        axios({
          method: "post",
          url: "/account-user/get-info",
          headers: {
            Authorization:
              "Bearer " + JSON.parse(localStorage.getItem("token")),
          },
          data: { id_account },
        })
          .then((res) => {
            // console.log(res);
            if (res.status == 200) {
              var user = res.data[0];
              this.user = user;
              // if (user.profile_picture == null) {
              //   this.user.profile_picture = null;
              // } else {
              //   this.user.profile_picture =
              //     this.baseURL + this.user.profile_picture;
              // }
              console.log("==> Fetch User Info : Account View <==");
            }
          })
          .catch((error) => {
            console.log(error);
          })
          .finally(() => {
            this.isLoading = false;
          });
      }, 500);
    },
    UPLOAD_PIC() {
      console.log("  ==> UPLOAD PIC");
      this.picUpload = this.$refs.file.files[0];
      // console.log(this.picUpload);
      if (
        (this.picUpload && this.picUpload.type == "image/jpeg") ||
        this.picUpload.type == "image/png"
      ) {
        if (this.picUpload.size < 20000000) {
          axios({
            method: "post",
            url: "/user/upload-pic",
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization:
                "Bearer " + JSON.parse(localStorage.getItem("token")),
            },
            data: {
              id_user: this.user.id_user,
              file: this.picUpload,
            },
          })
            .then((res) => {
              console.log("  ==> UPLOAD DONE");

              if (res.status == 200) {
                // this.$router.go();
                this.isEdit.photo = false;
                this.$router.go();
              }
            })
            .catch((error) => {
              this.$ons.notification.alert(
                error.code + " " + error.response.status + " " + error.message
              );
            })
            .finally(() => {});
        } else {
          this.$ons.notification.alert("File size too large. (20 MB max)");
          const file = document.getElementById("pic-upload-btn");
          file.val = "";
        }
      } else {
        this.$ons.notification.alert(
          "Incorrect filetype. <br/> Only JPEG/PNG file can be uploaded."
        );
        const file = document.getElementById("pic-upload-btn");
        file.val = "";
      }
    },
    BTN_EDIT(opt) {
      if (
        this.isEdit.info == true ||
        this.isEdit.account == true ||
        this.isEdit.photo == true
      ) {
        this.$ons.notification
          .confirm("Unsaved changes will be lost.")
          .then((res) => {
            if (res == 1) {
              this.isEdit.info = false;
              this.isEdit.account = false;
              this.formData = clone(this.user);
              if (opt == "info") this.isEdit.info = true;
              else if (opt == "account") this.isEdit.account = true;
            }
          });
      } else {
        this.formData = clone(this.user);
        if (opt == "info") this.isEdit.info = true;
        else if (opt == "account") this.isEdit.account = true;
        else if (opt == "photo") this.isEdit.photo = true;
      }
    },
    BTN_CANCEL() {
      this.$ons.notification
        .confirm("Unsaved changes will be lost.")
        .then((res) => {
          if (res == 1) {
            this.formData = {};
            this.isEdit.info = false;
            this.isEdit.account = false;
            this.isEdit.photo = false;
          }
        });
    },
    SAVE_EDIT_INFO() {
      this.$ons.notification.confirm("Confirm Save").then((res) => {
        if (res == 1) {
          const data = this.formData;
          // data.username = "ditt" + data.employee_no;
          axios({
            method: "put",
            url: "/user/update-info",
            headers: {
              Authorization:
                "Bearer " + JSON.parse(localStorage.getItem("token")),
            },
            data: data,
          })
            .then((res) => {
              if (res.status == 200 && res.data) {
                this.$ons.notification
                  .alert("Update user information successful")
                  .then((respone) => {
                    if (respone == 0) {
                      this.isEdit.user = false;
                      // this.$router.go();
                      this.isEdit.info = false;
                      this.FETCH_USER_INFO();
                    }
                  });
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
    },
    SAVE_EDIT_ACCOUNT() {
      if (this.formData.oldPassword) {
        if (this.formData.newPassword) {
          if (this.formData.confirmPassword) {
            if (this.formData.newPassword == this.formData.confirmPassword) {
              if (sha256(this.formData.oldPassword) == this.user.password) {
                this.$ons.notification.confirm("Confirm Save").then((res) => {
                  if (res == 1) {
                    axios({
                      method: "put",
                      url: "account-user/change-password",
                      headers: {
                        Authorization:
                          "Bearer " + JSON.parse(localStorage.getItem("token")),
                      },
                      data: {
                        id_account: this.formData.id_account,
                        password: sha256(this.formData.confirmPassword),
                      },
                    })
                      .then((res) => {
                        if (res.status == 200 && res.data) {
                          this.$ons.notification
                            .alert("Account password changed")
                            .then((respone) => {
                              if (respone == 0) {
                                this.isEdit.account = false;
                                this.FETCH_USER_INFO();
                              }
                            });
                        }
                      })
                      .catch((error) => {
                        this.$ons.notification.alert(
                          error.code +
                            " " +
                            error.response.status +
                            " " +
                            error.message
                        );
                      })
                      .finally(() => {});
                  }
                });
              } else {
                this.$ons.notification.alert("Old password is incorrect.");
              }
            } else {
              this.$ons.notification.alert("Confirm password mismatch.");
            }
          } else {
            this.$ons.notification.alert(
              '"Confirm Password" field cannot be empty.'
            );
          }
        } else {
          this.$ons.notification.alert('"Password" field cannot be empty.');
        }
      } else {
        this.$ons.notification.alert('"Old Password" field cannot be empty.');
      }
    },
  },
  computed: {
    baseURL() {
      var mode = this.$store.state.mode;
      if (mode == "dev") return this.$store.state.modeURL.dev;
      else if (mode == "prod") return this.$store.state.modeURL.prod;
      else return console.log("develpment mode set up incorrect.");
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/style/main.scss";
@import "@/style/form.scss";
.page-content {
  display: block;
}

.form {
  margin: 0 auto;
  margin-top: 40px;
  // padding: 0 20px;
  width: 100%;
  .page-section-button {
    width: 500px;
    padding-bottom: 20px;
    margin: 0 auto;
  }
  .form-item-container {
    display: block !important;
    margin: auto;
    .input-set {
      display: grid;
      grid-template-columns: 100px 200px 200px;
      .label {
        height: 20px;
      }
      .info {
        height: 20px;
        padding: 6px 0;
        text-align: left;
        grid-column: span 2;
        text-indent: 10px;
        margin: 10px 0 5px 0;
      }
      input {
        height: 36px;
        padding: 6px 0;
        margin: 10px 0 5px 0;
        grid-column: span 2;
        font-weight: 500;
        line-height: 20px;
      }
    }
  }

  .form-button-container {
    width: 500px;
    margin: 0 auto;
    padding: 20px 0;
  }
  .profile-box {
    margin: 0 auto;
    padding: 20px 0;
    width: 500px;
  }
}
.form:first-child {
  margin-top: 0;
}

@media screen and (max-width: 768px) {
  .form {
    .page-section-button {
      width: 100%;
      padding-bottom: 20px;
      margin: 0 !important;
    }
    .form-item-container {
      .input-set {
        grid-template-columns: 50% 50%;
        .label {
          height: 20px;
          grid-column: span 2;
        }
        .info {
          grid-column: span 2;
          height: 36px;
          line-height: 36px;
          padding: 0;
          text-align: left;
          text-indent: 10px;
          margin: 0;
        }
        input {
          height: 36px;
          padding: 6px 0;
          margin: 0;
          grid-column: span 2;
          font-weight: 500;
          line-height: 20px;
        }
      }
    }

    .form-button-container {
      width: 100%;
      margin: 0;
      .button-set {
        width: calc(100% - 10px);
        display: grid;
        grid-gap: 10px;
        grid-template-columns: 50% 50%;
        button {
          padding: 0;
          margin: 0;
        }
      }
    }
  }
}

.btn-pic-change {
  label {
    width: 100px;
    height: 100px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    border-radius: 100px;
  }
}
</style>
