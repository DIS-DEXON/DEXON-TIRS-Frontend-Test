<template>
  <div class="popup-wrapper">
    <div class="popup-card">
      <div class="popup-header">
        <label>Create New Circum</label>
      </div>
      <div class="popup-content form">
        <div class="form-item-container">
          <div class="input-set" style="grid-column: span 2">
            <div class="label-box">
              <p class="label">Points</p>
              <label class="star-label">
                <i class="las la-asterisk"></i>
              </label>
            </div>
            <input type="text" v-model="formData.points" placeholder="Amount of point" />
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

//import DxSelectBox from "devextreme-vue/select-box";

export default {
  name: "popup-create-roundness",
  components: {
    //DxSelectBox
  },
  props: {
    info: Number
  },
  data() {
    return {
      formData: {
        id_inspection_record: null,
        points: null,
        distance_above_bottom: null
      },
      formSelect: {
        points: [
          8,
          10,
          12,
          14,
          16,
          18,
          20,
          22,
          24,
          26,
          28,
          30,
          32,
          34,
          36,
          38,
          40,
          44,
          48,
          52,
          56,
          60,
          64,
          68,
          72,
          76,
          80
        ],
        ui_active: [1, 2]
      }
    };
  },
  computed: {},
  created() {
    this.formData.id_tag = parseInt(this.$route.params.id_tag);
    console.log("PACKAGE: ");
    console.log(this.formData);
  },
  methods: {
    SAVE() {
      if (this.formData.points) {
        this.$ons.notification.confirm("Confirm save?").then(res => {
          if (res == 1) {
            axios({
              method: "post",
              url:
                "roundness/add-all-roundness?id_circum=" +
                this.info +
                "&point=" +
                parseInt(this.formData.points),
              headers: {
                Authorization:
                  "Bearer " + JSON.parse(localStorage.getItem("token"))
              }
            })
              .then(res => {
                console.log(res);
                if (res.status == 201) {
                  this.$ons.notification.alert(
                    this.formData.points + " Points Created"
                  );
                  this.$emit("closePopup");
                }
              })
              .catch(error => {
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
      if (this.formData != this.formData) {
        this.$ons.notification
          .confirm("Your unsaved changes will be lost")
          .then(res => {
            if (res == 1) {
              this.$emit("closePopup");
            }
          });
      } else {
        this.$emit("closePopup");
      }
    }
  }
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

.dx-icon {
  font-size: 24px;
  color: blue;
}

hr {
  grid-column: span 4 / auto;
  margin-top: 10px;
}

.form .label-box {
  margin: 0 !important;
}

.loading-section {
  height: 100%;
  margin-top: -51px;
  padding: 0;
  width: 350px;
  .app-content-loading {
    top: 51px;
    left: 0;
    height: calc(100% - 51px);
  }
}

.popup-content {
  padding-top: 10px !important;
}
</style>