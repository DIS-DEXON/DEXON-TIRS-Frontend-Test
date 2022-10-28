<template>
  <div id="page-login" class="page-body">
    <div class="app-logo-login">
      <img src="/img/logo-dark.png" />
    </div>

    <!-- LOG IN -->
    <div class="login-panel" v-if="current_tab == 1">
      <div class="app-logo">
        <img :src="appIcon" alt="app icon" />
      </div>
      <h1>DEXON TIMS</h1>
      <label class="sub-title">Tank Inspection Management System</label>
      <div class="form-login">
        <div class="input-set">
          <input
            class="user"
            type="text"
            placeholder="Username"
            v-model="formData.signin.username"
            v-on:keyup.enter="SIGN_IN()"
          />
        </div>
        <div class="input-set">
          <input
            class="password"
            type="password"
            placeholder="Password"
            v-model="formData.signin.password"
            v-on:keyup.enter="SIGN_IN()"
          />
        </div>
        <div class="button-set" style="margin-top: 40px">
          <button class="blue" v-on:click="SIGN_IN()">
            <label>Sign In</label>
          </button>
        </div>
        <!-- <hr />
        <div class="button-set">
          <button class="outline-blue" v-on:click="SIGN_UP_BTN(2)">
            <label>Create Account</label>
          </button>
        </div> -->
        <div class="help-label">
          <label>Need helps? Visit <a>Help Center</a></label>
        </div>
      </div>
    </div>

    <!-- CREATE ACCOUNT
    <div class="login-panel" v-if="current_tab == 2">
      <h1 style="margin-bottom: 20px">Create Account</h1>
      <div class="form-login">
        <div class="input-set">
          <input
            class="first"
            type="text"
            placeholder="Username"
            v-model="formData.create_account.username"
          />
        </div>
        <div class="input-set">
          <input
            class="middle"
            type="password"
            placeholder="Password"
            v-model="formData.create_account.password"
          />
        </div>
        <div class="input-set">
          <input
            class="last"
            type="password"
            placeholder="confirm Password"
            v-model="formData.create_account.confirm_password"
          />
        </div>
        <div class="button-set" style="margin-top: 40px">
          <button class="blue" v-on:click="SIGN_UP_BTN(3)">
            <label>Create Account</label>
          </button>
        </div>
        <hr />
        <div class="button-set">
          <button class="outline-blue" v-on:click="SIGN_UP_BTN(1)">
            <label>Cancel</label>
          </button>
        </div>
      </div>
    </div>

    SET USER INFO
    <div class="login-panel" v-if="current_tab == 3">
      <h1 style="margin-bottom: 20px">User Information</h1>
      <div class="form-login">
        <div class="input-set">
          <input
            class="first"
            type="text"
            placeholder="First Name"
            v-model="formData.user_info.first_name"
          />
        </div>
        <div class="input-set">
          <input
            class="middle"
            type="text"
            placeholder="Middle Name"
            v-model="formData.user_info.middle_name"
          />
        </div>
        <div class="input-set">
          <input
            class="last"
            type="text"
            placeholder="Last Name"
            v-model="formData.user_info.last_name"
          />
        </div>
        <div class="input-set">
          <input
            class="first"
            type="text"
            placeholder="Last Name"
            v-model="formData.user_info.last_name"
          />
        </div>
        <div class="input-set">
          <input
            class="last"
            type="text"
            placeholder="Last Name"
            v-model="formData.user_info.last_name"
          />
        </div>
        <div class="button-set" style="margin-top: 40px">
          <button class="blue" v-on:click="SIGN_UP()">
            <label>Continue</label>
          </button>
        </div>
      </div>
    </div> -->

    <PageLoading v-if="isLoading == true" text="Logging In" />
    <div class="bg-filter"></div>
  </div>
</template>

<script>
//API
// import axios from "/axios.js";

//JS
// import { sha256 } from "js-sha256";

//UI
import ViewLayout from "@/layouts/non-sidebar-layout.vue";
import PageLoading from "@/components/app-structures/app-loading.vue";

export default {
  name: "Login-View",
  components: { PageLoading },
  data() {
    return {
      appIcon: this.$store.state.appIcon,
      isLoggedIn: localStorage.getItem("user"),
      isLoading: false,
      loginInfo: {
        user: {
          id_user: 1,
          username: "ditt001",
          first_name: "Admin",
          middle_name: "Super",
          last_name: "User",
          role: "admin",
          phone_no: "+6698123456",
          email: "admin@dexon-technology.com",
          employee_no: "001",
          profile_picture: null,
        },
        token: "test1234",
      },
      current_tab: 1,
      formData: {
        signin: {
          username: "",
          password: "",
        },
        create_account: {
          username: "",
          password: "",
          confirm_password: "",
          isActive: false,
        },
        user_info: {
          prefix: "",
          first_name: "",
          middle_name: "",
          last_name: "",
          role: "staff",
          phone_no: "",
          email: "",
          employee_no: null,
          profile_picture: null,
        },
      },
    };
  },
  created() {
    this.$emit(`update:layout`, ViewLayout);
    this.$store.commit("CLEAR_CURRENT_INAPP");
    if (this.isLoggedIn) this.$router.push("/");
  },
  methods: {
    // SIGN_IN() {
    //   if (this.formData.username) {
    //     if (this.formData.password) {
    //       this.isLoading = true;
    //       setTimeout(() => {
    //         var password = sha256(this.formData.password);
    //         var username = this.formData.username.toLowerCase();

    //         axios({
    //           method: "post",
    //           url: "/user/login",
    //           data: { username, password },
    //         })
    //           .then((res) => {
    //             if (res.data.user && res.data.token) {
    //               localStorage.setItem("user", JSON.stringify(res.data.user));
    //               localStorage.setItem("token", JSON.stringify(res.data.token));
    //               console.log(res.data.user);
    //               if (res.data.user.role == "ceo") {
    //                 this.$router.push("/executive-report");
    //               } else this.$router.push("/");
    //             }
    //           })
    //           .catch((error) => {
    //             if (error.response) {
    //               if (error.response.data) {
    //                 this.$ons.notification.alert(error.response.data.message);
    //               }
    //               if (error.response.status == 0) {
    //                 this.$ons.notification.alert(
    //                   "Cannot connect to a server.<br/> Please try again later."
    //                 );
    //               }
    //             } else {
    //               console.log(error);
    //             }
    //           })
    //           .finally(() => {
    //             this.isLoading = false;
    //           });
    //       }, 500);
    //     } else {
    //       this.$ons.notification.alert('"Password" cannot be empty');
    //     }
    //   } else {
    //     this.$ons.notification.alert('"Username" cannot be empty');
    //   }
    // },
    SIGN_IN() {
      localStorage.setItem("user", JSON.stringify(this.loginInfo.user));
      localStorage.setItem("token", JSON.stringify(this.loginInfo.token));
      // if (this.loginInfo.user.role == "ceo") {
      //   this.$router.push("/executive-report");
      // } else this.$router.push("/");
      this.$router.push("/");
    },
    SIGN_UP() {},
    SIGN_UP_BTN(opt) {
      this.current_tab = opt;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/style/main.scss";

#page-login {
  background-image: url("/public/img/main-bg.jpg");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  width: 100vw;
  height: 100vh;
  overflow: hidden;

  .bg-filter {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 0;
    background: linear-gradient(180deg, #2759a8 0%, rgba(39, 89, 168, 0) 100%);
  }
}
.page-container {
  position: relative;
  height: 100%;
}
.login-panel {
  width: 360px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 30px 20px;
  border-radius: 6px;
  background: #fff;
  box-shadow: 0px 2px 25px 2px rgba(0, 0, 0, 0.06);
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1;
  h1 {
    font-size: 2.5em;
    font-style: normal;
    font-weight: 510;
    line-height: 30px;
    color: $web-font-color-black;
    text-align: center;
    margin: 0;
    margin-top: 20px;
    text-transform: uppercase;
    letter-spacing: 1px;
  }
  label.sub-title {
    font-size: 14px;
    color: $web-font-color-black;
    margin: 2px 0 20px 0;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 1px;
    text-align: center;
  }
  .content-wrapper {
    width: 100%;
    max-width: 300px;
    margin: 0 auto;
  }
}
.app-logo {
  width: 94px;
  height: 94px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 24px;

  img {
    height: 100%;
    object-fit: contain;
    -webkit-mask: url(data:image/svg+xml;charset=utf8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22100%25%22%20height%3D%22100%25%22%20fill-rule%3D%22evenodd%22%20stroke-linejoin%3D%22round%22%20stroke-miterlimit%3D%221.41%22%20clip-rule%3D%22evenodd%22%20version%3D%221.1%22%20viewBox%3D%220%200%20460%20460%22%20xml%3Aspace%3D%22preserve%22%3E%3Cpath%20d%3D%22M460%20316.1c0%205.5%200%2010.99-.04%2016.48-.03%204.63-.08%209.26-.2%2013.88a201.73%20201.73%200%200%201-2.66%2030.21c-1.71%2010-4.9%2019.68-9.47%2028.73a96.6%2096.6%200%200%201-42.23%2042.23%20101.86%20101.86%200%200%201-28.71%209.46c-10%201.65-20.1%202.54-30.22%202.66a649%20649%200%200%201-13.88.21c-5.5.03-10.99.03-16.48.03H143.89c-5.49%200-10.98%200-16.48-.03a648.8%20648.8%200%200%201-13.88-.2%20201.46%20201.46%200%200%201-30.22-2.67c-9.99-1.7-19.67-4.9-28.71-9.46a96.61%2096.61%200%200%201-42.23-42.22%20101.96%20101.96%200%200%201-9.47-28.74%20201.6%20201.6%200%200%201-2.66-30.2c-.12-4.63-.18-9.26-.2-13.89C0%20327.08%200%20321.6%200%20316.1V143.9c0-5.5%200-11%20.04-16.5.02-4.62.08-9.25.2-13.87a201.64%20201.64%200%200%201%202.66-30.2c1.71-10%204.9-19.68%209.47-28.74A96.6%2096.6%200%200%201%2054.6%2012.36%20101.96%20101.96%200%200%201%2083.3%202.9c10-1.64%2020.1-2.53%2030.22-2.66%204.63-.12%209.26-.18%2013.88-.2%205.5-.03%2011-.03%2016.48-.03H316.1c5.5%200%2011%200%2016.49.03a649%20649%200%200%201%2013.88.2c10.12.13%2020.22%201.02%2030.21%202.66%2010%201.71%2019.67%204.9%2028.72%209.46a96.58%2096.58%200%200%201%2042.24%2042.23%20101.92%20101.92%200%200%201%209.46%2028.73%20201.7%20201.7%200%200%201%202.66%2030.21c.12%204.63.18%209.26.2%2013.88.04%205.5.04%2010.99.04%2016.48V316.1z%22%2F%3E%3C%2Fsvg%3E%0A)
      center/100% 100% no-repeat;
    mask: url(data:image/svg+xml;charset=utf8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22100%25%22%20height%3D%22100%25%22%20fill-rule%3D%22evenodd%22%20stroke-linejoin%3D%22round%22%20stroke-miterlimit%3D%221.41%22%20clip-rule%3D%22evenodd%22%20version%3D%221.1%22%20viewBox%3D%220%200%20460%20460%22%20xml%3Aspace%3D%22preserve%22%3E%3Cpath%20d%3D%22M460%20316.1c0%205.5%200%2010.99-.04%2016.48-.03%204.63-.08%209.26-.2%2013.88a201.73%20201.73%200%200%201-2.66%2030.21c-1.71%2010-4.9%2019.68-9.47%2028.73a96.6%2096.6%200%200%201-42.23%2042.23%20101.86%20101.86%200%200%201-28.71%209.46c-10%201.65-20.1%202.54-30.22%202.66a649%20649%200%200%201-13.88.21c-5.5.03-10.99.03-16.48.03H143.89c-5.49%200-10.98%200-16.48-.03a648.8%20648.8%200%200%201-13.88-.2%20201.46%20201.46%200%200%201-30.22-2.67c-9.99-1.7-19.67-4.9-28.71-9.46a96.61%2096.61%200%200%201-42.23-42.22%20101.96%20101.96%200%200%201-9.47-28.74%20201.6%20201.6%200%200%201-2.66-30.2c-.12-4.63-.18-9.26-.2-13.89C0%20327.08%200%20321.6%200%20316.1V143.9c0-5.5%200-11%20.04-16.5.02-4.62.08-9.25.2-13.87a201.64%20201.64%200%200%201%202.66-30.2c1.71-10%204.9-19.68%209.47-28.74A96.6%2096.6%200%200%201%2054.6%2012.36%20101.96%20101.96%200%200%201%2083.3%202.9c10-1.64%2020.1-2.53%2030.22-2.66%204.63-.12%209.26-.18%2013.88-.2%205.5-.03%2011-.03%2016.48-.03H316.1c5.5%200%2011%200%2016.49.03a649%20649%200%200%201%2013.88.2c10.12.13%2020.22%201.02%2030.21%202.66%2010%201.71%2019.67%204.9%2028.72%209.46a96.58%2096.58%200%200%201%2042.24%2042.23%20101.92%20101.92%200%200%201%209.46%2028.73%20201.7%20201.7%200%200%201%202.66%2030.21c.12%204.63.18%209.26.2%2013.88.04%205.5.04%2010.99.04%2016.48V316.1z%22%2F%3E%3C%2Fsvg%3E%0A)
      center/100% 100% no-repeat;
  }
}

.app-logo-login {
  width: 150px;
  position: absolute;
  top: 20px;
  right: 30px;
  z-index: 999;
  img {
    width: 100%;
    object-fit: contain;
  }
}

.form-login {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  .input-set {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;

    input {
      width: -webkit-fill-available;
      background: #ffffff;
      border: 1px solid #cecece;
      box-sizing: border-box;
      height: 44px;
      text-indent: 10px;
      font-size: 1.75em;
      line-height: 30px;
      font-style: normal;
      font-weight: 400;
      border-radius: 6px;
    }
    .user,
    .first {
      border-radius: 6px 6px 0px 0px;
    }
    .middle {
      border-radius: 0px;
      border-width: 0px 1px 1px 1px;
    }
    .password,
    .last {
      border-radius: 0px 0px 6px 6px;
      border-width: 0px 1px 1px 1px;
    }

    .password:focus {
      border-width: 0px 1px 1px 1px;
    }
  }
  .save-password-set {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 20px;
    label {
      font-style: normal;
      font-weight: 400;
      font-size: 1.75em;
      line-height: 30px;
      color: $web-font-color-grey;
      margin-left: 10px;
    }
  }
}
.button-set {
  margin: 20px 0;
  button {
    height: 44px;
  }
}
h1 {
  font-weight: 800 !important;
  margin: 20px 0 20px 0;
}
.help-label {
  font-size: 12px;
  color: $web-font-color-grey;
  a {
    color: $web-font-color-blue;
    text-decoration: underline;
    cursor: pointer;
  }
}
</style>