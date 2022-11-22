<template>
  <div class="popup-wrapper">
    <div class="popup-card">
      <div class="popup-header">
        <label>Add New Tank</label>
      </div>
      <div class="popup-content form">
        <div class="form-item-container">
          <label class="section-text" style="margin-top: 0"
            >General Information</label
          >

          <div class="input-set">
            <div class="label-box">
              <p class="label">Tag No:</p>
              <label class="star-label"><i class="las la-asterisk"></i></label>
            </div>
            <input type="text" v-model="formData.tag_no" placeholder="Tag No" />
          </div>
          <div class="input-set">
            <div class="label-box">
              <p class="label">Tank No:</p>
              <label class="star-label"><i class="las la-asterisk"></i></label>
            </div>
            <input
              type="text"
              v-model="formData.tank_no"
              placeholder="Tank No"
            />
          </div>
          <div class="input-set">
            <div class="label-box">
              <p class="label">Location:</p>
              <label class="star-label"><i class="las la-asterisk"></i></label>
            </div>
            <input type="text" v-model="formData.tag_no" placeholder="Tag No" />
          </div>

          <div class="input-set" style="grid-row: span 2">
            <div class="label-box">
              <p class="label">Description:</p>
              <!-- <label class="star-label"><i class="las la-asterisk"></i></label> -->
            </div>
            <textarea
              type="text"
              v-model="formData.tag_no"
              placeholder="Description"
              style="height: calc(100% - 32px)"
            />
          </div>
          <div class="input-set">
            <div class="label-box">
              <p class="label">Product:</p>
              <label class="star-label"><i class="las la-asterisk"></i></label>
            </div>
            <DxSelectBox
              style="border: 0; font-size: 14px"
              v-model="formData.id_product"
              :data-source="formSelect.product"
              display-expr="code"
              value-expr="id"
            />
          </div>

          <div class="input-set">
            <div class="label-box">
              <p class="label">Tank Status:</p>
              <!-- <label class="star-label"><i class="las la-asterisk"></i></label> -->
            </div>
            <DxSelectBox
              style="border: 0; font-size: 14px"
              v-model="formData.id_tank_status"
              :data-source="formSelect.tank_status"
              display-expr="code"
              value-expr="id"
            />
          </div>
          <div class="input-set">
            <div class="label-box">
              <p class="label">In-service Date:</p>
              <!-- <label class="star-label"><i class="las la-asterisk"></i></label> -->
            </div>
            <DxDateBox
              :value="formSelect.now"
              type="date"
              v-model="formData.inservice_date"
              placeholder="In-service Date"
            />
          </div>

          <div class="input-set">
            <div class="label-box">
              <p class="label">Inspection Code:</p>
              <!-- <label class="star-label"><i class="las la-asterisk"></i></label> -->
            </div>
            <input
              type="text"
              v-model="formData.inspection_code"
              placeholder="Inspection Code"
            />
          </div>
          <label class="section-text">Tank Specification</label>

          <div class="input-set">
            <div class="label-box">
              <p class="label">Tank Capacity (Litre):</p>
              <!-- <label class="star-label"><i class="las la-asterisk"></i></label> -->
            </div>
            <input
              type="text"
              v-model="formData.tank_capacity_litre"
              placeholder="Capacity (Litre)"
            />
          </div>
          <div class="input-set">
            <div class="label-box">
              <p class="label">Tank Height (m):</p>
              <!-- <label class="star-label"><i class="las la-asterisk"></i></label> -->
            </div>
            <input
              type="text"
              v-model="formData.tank_height_m"
              placeholder="Height (m)"
            />
          </div>
          <div class="input-set">
            <div class="label-box">
              <p class="label">Joint Efficiency:</p>
              <!-- <label class="star-label"><i class="las la-asterisk"></i></label> -->
            </div>
            <input
              type="text"
              v-model="formData.joint_efficiency"
              placeholder="Joint Efficiency"
            />
          </div>
          <div class="input-set">
            <div class="label-box">
              <p class="label">Max. Liquid Level (m):</p>
              <!-- <label class="star-label"><i class="las la-asterisk"></i></label> -->
            </div>
            <input
              type="text"
              v-model="formData.max_liquid_level_m"
              placeholder="Liquid Level (m)"
            />
          </div>
          <div class="input-set">
            <div class="label-box">
              <p class="label">Bottom Nominal Thk. (mm):</p>
              <!-- <label class="star-label"><i class="las la-asterisk"></i></label> -->
            </div>
            <input
              type="text"
              v-model="formData.bottom_nominal_thk_mm"
              placeholder="Thickness (mm)"
            />
          </div>
          <div class="input-set">
            <div class="label-box">
              <p class="label">Diameter (m):</p>
              <!-- <label class="star-label"><i class="las la-asterisk"></i></label> -->
            </div>
            <input
              type="text"
              v-model="formData.diameter_m"
              placeholder="Diameter (m)"
            />
          </div>
          <div class="input-set">
            <div class="label-box">
              <p class="label">Diameter (m):</p>
              <!-- <label class="star-label"><i class="las la-asterisk"></i></label> -->
            </div>
            <input
              type="text"
              v-model="formData.diameter_m"
              placeholder="Diameter (m)"
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
// import { DxLookup, DxDropDownOptions } from "devextreme-vue/lookup";
import contentLoading from "@/components/app-structures/app-content-loading.vue";

export default {
  name: "popup-add-project",
  components: {
    DxSelectBox,
    DxDateBox,
    // DxLookup,
    // DxDropDownOptions,
    contentLoading,
  },
  data() {
    return {
      formData: {
        id_client: this.$route.params.id_company,
      },
      formSelect: {
        tank_status: [],
        product: [],
        now: [],
      },
    };
  },
  computed: {
    all_form_select_loaded() {
      if (
        this.formSelect.tank_status.length > 0 &&
        this.formSelect.product.length > 0
      ) {
        return true;
      } else return false;
    },
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
      this.FETCH_DROPDOWN_TANK_STATUS();
      this.FETCH_DROPDOWN_PRODUCT();
    },
    FETCH_DROPDOWN_TANK_STATUS() {
      axios({
        method: "get",
        url: "/MdTankStatus",
        headers: {
          Authorization: "Bearer " + JSON.parse(localStorage.getItem("token")),
        },
      }).then((res) => {
        if (res.data) {
          this.formSelect.tank_status = res.data;
        }
      });
    },
    FETCH_DROPDOWN_PRODUCT() {
      axios({
        method: "get",
        url: "/MdProduct",
        headers: {
          Authorization: "Bearer " + JSON.parse(localStorage.getItem("token")),
        },
      }).then((res) => {
        if (res.data) {
          this.formSelect.product = res.data;
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
  grid-template-columns: repeat(3, 300px);
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

.section-text {
  grid-column: span 3;
}
</style>