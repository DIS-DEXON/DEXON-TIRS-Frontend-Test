<template>
  <div class="client-info-panel">
    <div class="wrapper">
      <div class="client-info">
        <div class="form">
          <div class="form-item-container">
            <div class="input-set">
              <div class="client-logo">
                <img :src="baseURL + clientInfo.logo" v-if="clientInfo.logo" />
              </div>
            </div>
            <div class="input-set">
              <p class="label">Company Name</p>
              <p class="info">
                {{ clientInfo.company_name }}
              </p>
            </div>
            <div class="input-set">
              <p class="label">Address</p>
              <p class="info">
                {{ clientInfo.address }}
              </p>
            </div>
            <div class="input-set">
              <p class="label">Contact Number</p>
              <p class="info">
                {{ clientInfo.phone_no }}
              </p>
            </div>
            <div class="input-set">
              <p class="label">Location</p>
              <p class="info">
                {{ clientInfo.location }}
              </p>
            </div>
            <div class="input-set">
              <p class="label">Location</p>
              <p class="info" v-if="clientInfo.is_domestic == true">
                Located in Thailand
              </p>
              <p class="info" v-else>Located out Thailand</p>
            </div>
          </div>
          <!-- <div class="form-button-container">
            <div class="button-set info-button-set">
              <v-ons-toolbar-button v-on:click="TOGGLE_POPUP('edit')">
                <i class="las la-phone"></i>
                <span>Edit</span>
              </v-ons-toolbar-button>
            </div>
          </div> -->
        </div>
      </div>
    </div>
    <contentLoading
      text="Loading, please wait..."
      v-if="isLoading == true"
      color="#fc9b21"
    />
  </div>
</template>

<script>
//Structures
import contentLoading from "@/components/app-structures/app-content-loading.vue";
export default {
  name: "client-info-panel",
  props: {
    clientInfo: Object,
  },
  components: {
    contentLoading,
  },
  data() {
    return {
      isLoading: false,
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
};
</script>

<style lang="scss" scoped>
@import "@/style/main.scss";
@import "@/style/form.scss";
.client-info-panel {
  width: 100%;
  height: 100%;
  position: relative;
  .wrapper {
    width: auto;
    height: calc(100% - 40px);
    padding: 20px;
    background-color: #fff;
    border: 1px solid #e6e6e6;
    border-width: 0 1px 0 0px;
    overflow-y: auto;
  }

  .client-logo {
    width: 100%;
    height: 80px;
    padding: 10px 0 20px 0;
    img {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
  }

  .client-info {
    .form {
      .form-item-container {
        display: block;
        padding-bottom: 20px;
        .info {
          border: 0;
          text-indent: 0;
          text-align: left;
          padding: 10px;
          font-size: 12px;
        }
      }
    }
  }
}
</style>