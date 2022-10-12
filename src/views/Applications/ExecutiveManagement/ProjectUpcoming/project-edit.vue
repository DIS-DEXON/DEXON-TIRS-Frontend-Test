<template>
  <div class="popup-wrapper">
    <div class="popup-card">
      <div class="popup-header">
        <label>Edit Project Info</label>
      </div>
      <div class="popup-content form">
        <div class="form-item-container">
          <label class="section-text" style="grid-column: span 2"
            >Project Informations</label
          >

          <div class="input-set" style="grid-column: span 2">
            <div class="label-box">
              <p class="label">Project Name:</p>
              <label class="star-label"><i class="las la-asterisk"></i></label>
            </div>
            <input
              type="text"
              v-model="formData.project_name"
              placeholder="Project Name"
            />
          </div>
          <div class="input-set" style="grid-column: span 2">
            <p class="label">Description:</p>
            <textarea
              v-model="formData.note"
              placeholder="Visiting Note"
              style="height: 80px; max-height: 200px"
            />
          </div>
          <div class="input-set">
            <div class="label-box">
              <p class="label">Service Type:</p>
              <label class="star-label"><i class="las la-asterisk"></i></label>
            </div>
            <DxSelectBox
              style="border: 0; font-size: 14px"
              v-model="formData.id_service_type"
              :data-source="formSelect.jobTypeList"
              display-expr="service_type_desc"
              value-expr="id_service_type"
            />
          </div>
          <div class="input-set">
            <div class="label-box">
              <p class="label">Confident Level (%):</p>
              <!-- <label class="star-label"><i class="las la-asterisk"></i></label> -->
            </div>
            <input
              type="text"
              v-model="formData.confident_level"
              placeholder="Confident Level"
            />
          </div>
          <div class="input-set">
            <p class="label">Forecast Value (Baht):</p>
            <input
              type="text"
              v-model="formData.project_value"
              placeholder="Project Value"
            />
          </div>
          <div class="input-set">
            <p class="label">Priority:</p>
            <DxSelectBox
              style="border: 0; font-size: 14px"
              :items="formSelect.priority"
              placeholder="Select Priority"
              v-model="formData.priority_no"
            />
          </div>
          <div class="input-set">
            <p class="label">Submission Date:</p>
            <DxDateBox
              :value="formSelect.now"
              type="date"
              v-model="formData.submission_date"
              placeholder="Submission Date"
            />
          </div>
          <div class="input-set">
            <p class="label">Expired Date:</p>
            <DxDateBox
              :value="formSelect.now"
              type="date"
              v-model="formData.expired_date"
              placeholder="Expired Date"
            />
          </div>
          <div class="input-set" style="grid-column: span 2">
            <p class="label">Remark:</p>
            <textarea
              v-model="formData.remark"
              placeholder="Remark"
              style="height: 80px; max-height: 200px"
            />
          </div>

          <hr style="grid-column: span 2" />
          <label class="section-text" style="grid-column: span 2"
            >Client Informations</label
          >

          <div class="input-set">
            <div class="label-box">
              <p class="label">Client:</p>
              <label class="star-label"><i class="las la-asterisk"></i></label>
            </div>
            <DxSelectBox
              style="border: 0; font-size: 14px"
              :items="formSelect.clientList"
              placeholder="Select Client"
              v-model="formData.id_client"
              display-expr="client_name"
              value-expr="id_client"
              item-template="item"
            />
          </div>
          <!-- <div class="input-set">
            <p class="label">Contact Name:</p>
            <input
              type="text"
              v-model="formData.client_contact_name"
              placeholder="Contact Name"
            />
          </div>
          <div class="input-set">
            <p class="label">Phone No:</p>
            <input
              type="text"
              v-model="formData.client_contact_phone_no"
              placeholder="Contact Phone No"
            />
          </div>
          <div class="input-set">
            <p class="label">Email:</p>
            <input
              type="text"
              v-model="formData.client_contact_email"
              placeholder="Contact Email"
            />
          </div> -->
        </div>
      </div>
      <div class="popup-footer">
        <div class="button-set">
          <button class="blue" v-on:click="SAVE()">
            <label>Save Edit</label>
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
import DxDateBox from "devextreme-vue/date-box";
export default {
  name: "popup-edit-project",
  components: {
    DxSelectBox,
    DxDateBox,
  },
  props: {
    editInfo: Object,
  },
  data() {
    return {
      formData: {},
      formSelect: {
        jobTypeList: [],
        priority: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
        now: new Date(),
        clientList: [{}],
      },
    };
  },
  created() {
    this.formData = this.editInfo;
    this.FETCH_DROPDOWN();
  },
  methods: {
    SAVE() {
      if (this.formData.project_name) {
        if (this.formData.id_client) {
          this.$ons.notification.confirm("Confirm save?").then((res) => {
            if (res == 1) {
              const data = this.formData;

              axios({
                method: "put",
                url: "/forecast-sales/forecast-sales-edit",
                headers: {
                  Authorization:
                    "Bearer " + JSON.parse(localStorage.getItem("token")),
                },
                data: data,
              })
                .then((res) => {
                  // console.log(res.data[0]);
                  if (res.status == 200) {
                    this.$ons.notification.alert("Project Edit Successful");
                    this.$emit("closePopup");
                    this.$emit("refreshInfo");
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
          this.$ons.notification.alert('"Client" field cannot be empty');
        }
      } else {
        this.$ons.notification.alert('"Project Name" field cannot be empty');
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
    FETCH_DROPDOWN() {
      axios({
        method: "get",
        url: "/project-manager/client-list",
        headers: {
          Authorization: "Bearer " + JSON.parse(localStorage.getItem("token")),
        },
      }).then((res) => {
        if (res.data) {
          this.formSelect.clientList = res.data;
        }
      });
      axios({
        method: "get",
        url: "/service-type/service-type-list",
        headers: {
          Authorization: "Bearer " + JSON.parse(localStorage.getItem("token")),
        },
      }).then((res) => {
        if (res.data) {
          this.formSelect.jobTypeList = res.data;
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/style/main.scss";
// .popup-content {
//   // width: 100%;
// }
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

.form .form-item-container .section-text {
  margin-top: 0px !important;
}
</style>