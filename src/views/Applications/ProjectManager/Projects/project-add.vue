<template>
  <div class="popup-wrapper">
    <div class="popup-card">
      <div class="popup-header">
        <label>Add New Project Info</label>
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
          <div class="input-set">
            <div class="label-box">
              <p class="label">Project No:</p>
              <label class="star-label"><i class="las la-asterisk"></i></label>
            </div>
            <input
              type="text"
              v-model="formData.project_no"
              placeholder="Project Number"
            />
          </div>
          <div class="input-set">
            <div class="label-box">
              <p class="label">Project Value (Baht):</p>
              <label class="star-label"><i class="las la-asterisk"></i></label>
            </div>
            <input
              type="text"
              v-model="formData.project_value"
              placeholder="Project Value (Baht)"
            />
          </div>

          <div class="input-set">
            <p class="label">Purchase Order No:</p>
            <input
              type="text"
              v-model="formData.po_no"
              placeholder="Purchase Order No"
            />
          </div>
          <div class="input-set">
            <p class="label">Quotation No:</p>
            <input
              type="text"
              v-model="formData.quotation_no"
              placeholder="Quotation No"
            />
          </div>

          <div class="input-set">
            <div class="label-box">
              <p class="label">Job Start Date:</p>
              <label class="star-label"><i class="las la-asterisk"></i></label>
            </div>
            <DxDateBox
              :value="formSelect.now"
              type="date"
              v-model="formData.job_start_date"
              placeholder="Job Start Date"
            />
          </div>
          <div class="input-set">
            <div class="label-box">
              <p class="label">Job End Date:</p>
              <label class="star-label"><i class="las la-asterisk"></i></label>
            </div>
            <DxDateBox
              :value="formSelect.now"
              type="date"
              v-model="formData.job_end_date"
              placeholder="Job End Date"
            />
          </div>
          <div class="input-set">
            <p class="label">Job Type:</p>
            <input
              type="text"
              v-model="formData.job_type"
              placeholder="Ex: H-N-D-RBI"
            />
          </div>
          <div class="input-set">
            <div class="label-box">
              <p class="label">Service Type:</p>
              <label class="star-label"><i class="las la-asterisk"></i></label>
            </div>
            <DxSelectBox
              style="border: 0; font-size: 14px"
              v-model="formData.service_type"
              :data-source="formSelect.serviceTypeList"
              display-expr="service_type_desc"
              value-expr="id_service_type"
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
            <!-- <DxSelectBox
              style="border: 0; font-size: 14px"
              :items="formSelect.clientList"
              placeholder="Select Client"
              v-model="formData.id_client"
              display-expr="client_name"
              value-expr="id_client"
              item-template="item"
            /> -->
            <DxLookup
              :items="formSelect.clientList"
              v-model="formData.id_client"
              formSelect.clientList
              value="Select Client"
              value-expr="id_client"
              display-expr="client_name"
            >
              <DxDropDownOptions :show-title="false" />
            </DxLookup>
          </div>
          <div class="input-set">
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
import DxDateBox from "devextreme-vue/date-box";
import { DxLookup, DxDropDownOptions } from "devextreme-vue/lookup";
export default {
  name: "popup-add-project",
  components: {
    DxSelectBox,
    DxDateBox,
    DxLookup,
    DxDropDownOptions,
  },
  data() {
    return {
      formData: {
        project_no: "",
        project_name: "",
        po_no: "",
        quotation_no: "",
        job_type: "",
        job_confirm_date: "",
        job_start_date: "",
        job_end_date: "",
        job_start_hour: "",
        job_end_hour: "",
        est_work_finish: "",
        id_client: "",
        client_contact_name: "",
        client_contact_phone_no: "",
        client_contact_email: "",
      },
      formSelect: {
        jobType: [],
        serviceTypeList: [],
        now: new Date(),
        clientList: [{}],
      },
    };
  },
  created() {
    this.FETCH_DROPDOWN();
  },
  methods: {
    SAVE() {
      if (this.formData.project_name) {
        if (this.formData.project_no) {
          if (isNaN(this.formData.project_no) == false) {
            if (this.formData.id_client) {
              if (this.formData.project_value) {
                if (this.formData.service_type) {
                  if (
                    this.formData.job_start_date &&
                    this.formData.job_end_date
                  ) {
                    this.$ons.notification
                      .confirm("Confirm save?")
                      .then((res) => {
                        if (res == 1) {
                          const data = this.formData;

                          axios({
                            method: "post",
                            url: "/project-manager/project-add",
                            headers: {
                              Authorization:
                                "Bearer " +
                                JSON.parse(localStorage.getItem("token")),
                            },
                            data: data,
                          })
                            .then((res) => {
                              console.log(res.data[0]);
                              if (res.status == 200) {
                                this.$ons.notification.alert(
                                  "Project Add successful"
                                );
                                this.$emit("close-popup");
                                const id = res.data[0].id_project;
                                if (id) {
                                  this.$router.push(
                                    "/projectmanager/projects/" + id
                                  );
                                }
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
                    this.$ons.notification.alert(
                      '"Job Start Date and End Date" field cannot be empty'
                    );
                  }
                } else {
                  this.$ons.notification.alert(
                    '"Service Type" field cannot be empty'
                  );
                }
              } else {
                this.$ons.notification.alert(
                  '"Project Value" field cannot be empty'
                );
              }
            } else {
              this.$ons.notification.alert('"Client" field cannot be empty');
            }
          } else {
            this.$ons.notification.alert('"Project No" must be a number.');
          }
        } else {
          this.$ons.notification.alert('"Project No" field cannot be empty.');
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
          this.formSelect.serviceTypeList = res.data;
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