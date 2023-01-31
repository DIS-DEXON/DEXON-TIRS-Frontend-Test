<template>
  <div class="popup-wrapper">
    <div class="popup-card">
      <div class="popup-header">
        <label>Edit UI Active</label>
      </div>
      <div class="popup-content form">
        <div class="form-item-container">
          <div class="input-set" style="grid-column: span 2">
            <div class="label-box">
              <p class="label">UI Active</p>
              <label class="star-label"><i class="las la-asterisk"></i></label>
            </div>

            <DxSelectBox
              style="border: 0; font-size: 14px"
              v-model="formData.ui_active"
              :data-source="formSelect.ui_active"
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

import DxSelectBox from "devextreme-vue/select-box";

export default {
  name: "popup-create-point",
  components: {
    DxSelectBox,
  },
  props: {
    info: Object,
  },
  data() {
    return {
      formData: {
        id_inspection_record: null,
        ui_active: null,
      },
      formSelect: {
        ui_active: [1, 2],
      },
    };
  },
  computed: {},
  created() {
    this.formData.id_inspection_record = this.info[0].id_inspection_record;
    console.log("PACKAGE: ");
    console.log(this.formData);
    console.log("PROPS: ");
    console.log(this.info[0]);
    this.formData.ui_active = this.info[0].ui_active;
  },
  methods: {
    SAVE() {
      if (this.formData.ui_active) {
        this.$ons.notification.confirm("Confirm save?").then((res) => {
          if (res == 1) {
            axios({
              method: "put",
              url: "/shell-settlement/edit-ui-shell-settlement",
              headers: {
                Authorization:
                  "Bearer " + JSON.parse(localStorage.getItem("token")),
              },
              data: this.formData,
            })
              .then((res) => {
                console.log(res);
                if (res.status == 200) {
                  this.$ons.notification.alert("UI Actived Edited");
                  this.$emit("closePopup");
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
      if (this.formData != this.formData) {
        this.$ons.notification
          .confirm("Your unsaved changes will be lost")
          .then((res) => {
            if (res == 1) {
              this.$emit("closePopup");
            }
          });
      } else {
        this.$emit("closePopup");
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
  grid-template-columns: repeat(2, 220px);
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