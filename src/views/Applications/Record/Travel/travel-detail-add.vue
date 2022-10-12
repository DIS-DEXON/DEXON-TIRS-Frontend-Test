<template>
  <div class="popup-wrapper">
    <div class="popup-card">
      <div class="popup-header">
        <label>Select Visit Record</label>
        <span style="font-size: 14px; padding-right: 20px"
          >{{ formData.record_no }}
        </span>
      </div>
      <div class="popup-content form">
        <div class="form-item-container">
          <div class="input-set">
            <p class="label">Travel Date:</p>
            <p class="info">
              {{ travel_date }}
            </p>
          </div>
          <div class="input-set">
            <p class="label">Visit Record:</p>
            <DxSelectBox
              style="border: 0; font-size: 14px"
              :items="formSelect.jobType"
              placeholder="Select Visit Record"
              v-model="formData.job_type"
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
// import DxDateBox from "devextreme-vue/date-box";
import moment from "moment";
export default {
  name: "popup-add-travel-detail",
  components: { DxSelectBox },
  props: {
    travelDate: String,
  },
  data() {
    return {
      formData: {
        id_user: "",
        record_no: "",
        bill_date: "",
        price: "",
        doc_seq: "",
        file: "",
      },
      formSelect: {
        visit_record_list: [
          {
            id_visit: 0,
            visit_record_no: "AI-CVR-22-09-01",
            client_name: "PTTEP LNG",
            distance: 24,
          },
        ],
      },
    };
  },
  created() {
    let id = JSON.parse(localStorage.getItem("user"));
    this.formData.id_user = id.id_user;
  },
  computed: {
    travel_date() {
      if (this.travelDate) return moment(this.travelDate).format("LL");
      return null;
    },
  },
  methods: {
    SAVE() {
      if (this.formData.bill_date) {
        if (this.formData.price) {
          this.$ons.notification.confirm("Confirm save?").then((res) => {
            if (res == 1) {
              const data = this.formData;
              axios({
                method: "post",
                url: "/fuel-bill/fuel-bill-add",
                headers: {
                  "Content-Type": "multipart/form-data",
                  Authorization:
                    "Bearer " + JSON.parse(localStorage.getItem("token")),
                },
                data: data,
              })
                .then((res) => {
                  if (res.status == 200) {
                    this.$ons.notification.alert("Bill Record Add successful");
                    this.$emit("btn-cancel-add");
                    this.$emit("refreshList");
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
          this.$ons.notification.alert('"Price" field cannot be empty');
        }
      } else {
        this.$ons.notification.alert('"Bill Date" field cannot be empty');
      }
    },
    CANCEL() {
      // console.log(this.formData);
      let form = this.formData;
      // console.log(form);
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
.popup-content {
  // display: grid;
  // grid-template-columns: 300px;
  // grid-gap: 20px;
  display: block;
  padding-bottom: 40px !important;
}
.form-item-container {
  width: auto;
  display: block;
  // grid-gap: 10px;
}

p.info {
  margin-bottom: 0 !important;
}
</style>