<template>
  <div class="popup-wrapper">
    <div class="popup-card">
      <div class="popup-header">
        <label>Edit Tank Info</label>
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
              <p class="label">Site:</p>
              <!-- <label class="star-label"><i class="las la-asterisk"></i></label> -->
            </div>
            <DxSelectBox
              style="border: 0; font-size: 14px"
              v-model="formData.id_site"
              :data-source="formSelect.site"
              display-expr="site_name"
              value-expr="id"
            />
          </div>

          <div class="input-set">
            <div class="label-box">
              <p class="label">Description:</p>
              <!-- <label class="star-label"><i class="las la-asterisk"></i></label> -->
            </div>
            <input
              type="text"
              v-model="formData.description"
              placeholder="Description"
            />
          </div>
          <div class="input-set">
            <div class="label-box">
              <p class="label">Product:</p>
              <!-- <label class="star-label"><i class="las la-asterisk"></i></label> -->
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
              <p class="label">Installation Date:</p>
              <label class="star-label"><i class="las la-asterisk"></i></label>
            </div>
            <DxDateBox
              :value="formSelect.now"
              type="date"
              v-model="formData.installation_date"
              placeholder="Installation Date"
            />
          </div>
          <div class="input-set">
            <div class="label-box">
              <p class="label">In-service Date:</p>
              <label class="star-label"><i class="las la-asterisk"></i></label>
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
              <p class="label">Year of In-service (year):</p>
              <label class="star-label"><i class="las la-asterisk"></i></label>
            </div>
            <input
              type="text"
              v-model="formData.inservice_age_of_tank_yrs"
              placeholder="Year of In-service (year)"
            />
          </div>

          <hr style="grid-column: span 3" />
          <label class="section-text">Tank Specification</label>

          <div class="input-set">
            <div class="label-box">
              <p class="label">Material Type:</p>
              <label class="star-label"><i class="las la-asterisk"></i></label>
            </div>
            <DxSelectBox
              style="border: 0; font-size: 14px"
              v-model="formData.mat_type"
              :data-source="formSelect.mat_type"
              display-expr="code"
              value-expr="code"
            />
          </div>

          <div class="input-set">
            <div class="label-box">
              <p class="label">Construction Code:</p>
              <!-- <label class="star-label"><i class="las la-asterisk"></i></label> -->
            </div>
            <DxSelectBox
              style="border: 0; font-size: 14px"
              v-model="formData.id_construction_code"
              :data-source="formSelect.construction_code"
              display-expr="code"
              value-expr="id"
            />
          </div>
          <div class="input-set">
            <div class="label-box">
              <p class="label">Inspection Code:</p>
              <!-- <label class="star-label"><i class="las la-asterisk"></i></label> -->
            </div>
            <DxSelectBox
              style="border: 0; font-size: 14px"
              v-model="formData.id_inspection_code"
              :data-source="formSelect.inspection_code"
              display-expr="code"
              value-expr="id"
            />
          </div>
          <div class="input-set">
            <div class="label-box">
              <p class="label">Tank Capacity (Litre):</p>
              <label class="star-label"><i class="las la-asterisk"></i></label>
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
              <label class="star-label"><i class="las la-asterisk"></i></label>
            </div>
            <input
              type="text"
              v-model="formData.tank_height_m"
              placeholder="Tank Height (m)"
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
              <label class="star-label"><i class="las la-asterisk"></i></label>
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
              <p class="label">Annular Nominal Thk. (mm):</p>
              <!-- <label class="star-label"><i class="las la-asterisk"></i></label> -->
            </div>
            <input
              type="text"
              v-model="formData.annular_nominal_thk_mm"
              placeholder="Thickness (mm)"
            />
          </div>
          <div class="input-set">
            <div class="label-box">
              <p class="label">Roof Nominal Thk. (mm):</p>
              <!-- <label class="star-label"><i class="las la-asterisk"></i></label> -->
            </div>
            <input
              type="text"
              v-model="formData.roof_nominal_thk_mm"
              placeholder="Thickness (mm)"
            />
          </div>
          <div class="input-set">
            <div class="label-box">
              <p class="label">Diameter (m):</p>
              <label class="star-label"><i class="las la-asterisk"></i></label>
            </div>
            <input
              type="text"
              v-model="formData.diameter_m"
              placeholder="Diameter (m)"
            />
          </div>
          <div class="input-set">
            <div class="label-box">
              <p class="label">No. of Shell Course:</p>
              <!-- <label class="star-label"><i class="las la-asterisk"></i></label> -->
            </div>
            <input
              type="text"
              v-model="formData.no_of_shell_course"
              placeholder="No. of Shell Course"
            />
          </div>
          <div class="input-set">
            <div class="label-box">
              <p class="label">Tank Internal Pressure:</p>
              <!-- <label class="star-label"><i class="las la-asterisk"></i></label> -->
            </div>
            <DxSelectBox
              style="border: 0; font-size: 14px"
              v-model="formData.id_tank_internal_pressure"
              :data-source="formSelect.internal_pressure"
              display-expr="code"
              value-expr="id"
            />
          </div>
          <div class="input-set">
            <div class="label-box">
              <p class="label">Roof Type:</p>
              <!-- <label class="star-label"><i class="las la-asterisk"></i></label> -->
            </div>
            <DxSelectBox
              style="border: 0; font-size: 14px"
              v-model="formData.id_roof_type"
              :data-source="formSelect.roof_type"
              display-expr="code"
              value-expr="id"
            />
          </div>
          <div class="input-set">
            <div class="label-box">
              <p class="label">Roof Shape:</p>
              <!-- <label class="star-label"><i class="las la-asterisk"></i></label> -->
            </div>
            <DxSelectBox
              style="border: 0; font-size: 14px"
              v-model="formData.id_roof_shape"
              :data-source="formSelect.roof_shape"
              display-expr="code"
              value-expr="id"
            />
          </div>
          <div class="input-set">
            <div class="label-box">
              <p class="label">Bottom Type:</p>
              <!-- <label class="star-label"><i class="las la-asterisk"></i></label> -->
            </div>
            <DxSelectBox
              style="border: 0; font-size: 14px"
              v-model="formData.id_bottom_type"
              :data-source="formSelect.bottom_type"
              display-expr="code"
              value-expr="id"
            />
          </div>
          <div class="input-set">
            <div class="label-box">
              <p class="label">Insulation:</p>
              <label class="star-label"><i class="las la-asterisk"></i></label>
            </div>
            <DxSelectBox
              style="border: 0; font-size: 14px"
              v-model="formData.insulation"
              :data-source="formSelect.insulation"
              display-expr="code"
              value-expr="code"
            />
          </div>
          <div class="input-set">
            <div class="label-box">
              <p class="label">Insulation Thickness (mm):</p>
              <label class="star-label"><i class="las la-asterisk"></i></label>
            </div>
            <input
              type="text"
              v-model="formData.insulation_thk_mm"
              placeholder="Insulation Thickness (mm)"
            />
          </div>
          <div class="input-set">
            <div class="label-box">
              <p class="label">SG of Product:</p>
              <label class="star-label"><i class="las la-asterisk"></i></label>
            </div>
            <input
              type="text"
              v-model="formData.sg_of_product"
              placeholder="SG of Product"
            />
          </div>
          <div class="input-set">
            <div class="label-box">
              <p class="label">Design Pressure Shell (psig):</p>
              <!-- <label class="star-label"><i class="las la-asterisk"></i></label> -->
            </div>
            <input
              type="text"
              v-model="formData.design_pressure_shell_psi"
              placeholder="Design Pressure Shell (psig)"
            />
          </div>
          <div class="input-set">
            <div class="label-box">
              <p class="label">Operating Pressure Shell (psig):</p>
              <!-- <label class="star-label"><i class="las la-asterisk"></i></label> -->
            </div>
            <input
              type="text"
              v-model="formData.ope_pressure_shell_psi"
              placeholder="Operating Pressure Shell (psig)"
            />
          </div>
          <div class="input-set">
            <div class="label-box">
              <p class="label">Design Pressure Coil (psig):</p>
              <!-- <label class="star-label"><i class="las la-asterisk"></i></label> -->
            </div>
            <input
              type="text"
              v-model="formData.design_pressure_coil_psi"
              placeholder="Design Pressure Coil (psig)"
            />
          </div>
          <div class="input-set">
            <div class="label-box">
              <p class="label">Operating Pressure Coil (psig):</p>
              <!-- <label class="star-label"><i class="las la-asterisk"></i></label> -->
            </div>
            <input
              type="text"
              v-model="formData.ope_pressure_coil_psi"
              placeholder="Operating Pressure Coil (psig)"
            />
          </div>
          <div class="input-set" style="grid-column: span 3">
            <div class="label-box">
              <p class="label">Foundation:</p>
              <!-- <label class="star-label"><i class="las la-asterisk"></i></label> -->
            </div>
            <DxSelectBox
              style="border: 0; font-size: 14px"
              v-model="formData.id_foundation"
              :data-source="formSelect.foundation"
              display-expr="code"
              value-expr="id"
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
import moment from "moment";
import DxSelectBox from "devextreme-vue/select-box";
import DxDateBox from "devextreme-vue/date-box";
import clone from "just-clone";
// import { DxLookup, DxDropDownOptions } from "devextreme-vue/lookup";
import contentLoading from "@/components/app-structures/app-content-loading.vue";

export default {
  name: "popup-edit-tank",
  props: {
    editInfo: Object,
  },
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
        construction_code: [],
        inspection_code: [],
        mat_type: [{
          "code": "CS"
          },
        {
          "code": "SS"
        }],
        internal_pressure: [],
        roof_type: [],
        roof_shape: [],
        bottom_type: [],
        insulation: [],
        foundation: [],
        site: [],
        now: [],
      },
    };
  },
  computed: {
    all_form_select_loaded() {
      if (
        this.formSelect.tank_status.length > 0 &&
        this.formSelect.product.length > 0 &&
        this.formSelect.construction_code.length > 0 &&
        this.formSelect.inspection_code.length > 0 &&
        this.formSelect.internal_pressure.length > 0 &&
        this.formSelect.roof_type.length > 0 &&
        this.formSelect.roof_shape.length > 0 &&
        this.formSelect.bottom_type.length > 0 &&
        this.formSelect.insulation.length > 0 &&
        this.formSelect.foundation.length > 0 &&
        this.formSelect.mat_type.length > 0
      ) {
        return true;
      } else return false;
    },
  },
  created() {
    this.formData = clone(this.editInfo);
    this.FETCH_DROPDOWN();
  },
  methods: {
    SAVE() {
      console.log("PACKAGE: ");
      this.formData.installation_date = moment(this.formData.installation_date).format("L");
      this.formData.inservice_date = moment(this.formData.inservice_date).format("L");
      console.log(this.formData);
      if (this.formData.tag_no) {
        this.$ons.notification.confirm("Confirm save?").then((res) => {
          if (res == 1) {
            const data = this.formData;

            axios({
              method: "put",
              url: "/tank-info/edit-tank-info",
              headers: {
                Authorization:
                  "Bearer " + JSON.parse(localStorage.getItem("token")),
              },
              data: data,
            })
              .then((res) => {
                // console.log(res.data[0]);
                if (res.status == 200) {
                  this.$ons.notification.alert("Tank Edit successful");
                  this.$emit("closePopup");
                  // this.$router.go();
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
    FETCH_DROPDOWN() {
      this.FETCH_DROPDOWN_TANK_STATUS();
      this.FETCH_DROPDOWN_PRODUCT();
      this.FETCH_DROPDOWN_CONSTRUCTION_CODE();
      this.FETCH_DROPDOWN_INSPECTION_CODE();
      this.FETCH_DROPDOWN_INTERNAL_PRESSURE();
      this.FETCH_DROPDOWN_ROOF_TYPE();
      this.FETCH_DROPDOWN_ROOF_SHAPE();
      this.FETCH_DROPDOWN_BOTTOM_TYPE();
      this.FETCH_DROPDOWN_INSULATION();
      this.FETCH_DROPDOWN_FOUNDAION();
      this.FETCH_DROPDOWN_SITE();
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
    FETCH_DROPDOWN_CONSTRUCTION_CODE() {
      axios({
        method: "get",
        url: "/MdConstructionCode",
        headers: {
          Authorization: "Bearer " + JSON.parse(localStorage.getItem("token")),
        },
      }).then((res) => {
        if (res.data) {
          this.formSelect.construction_code = res.data;
        }
      });
    },
    FETCH_DROPDOWN_INSPECTION_CODE() {
      axios({
        method: "get",
        url: "/MdInspectionCode",
        headers: {
          Authorization: "Bearer " + JSON.parse(localStorage.getItem("token")),
        },
      }).then((res) => {
        if (res.data) {
          this.formSelect.inspection_code = res.data;
        }
      });
    },
    FETCH_DROPDOWN_INTERNAL_PRESSURE() {
      axios({
        method: "get",
        url: "/MdTankInternalPressure",
        headers: {
          Authorization: "Bearer " + JSON.parse(localStorage.getItem("token")),
        },
      }).then((res) => {
        if (res.data) {
          this.formSelect.internal_pressure = res.data;
        }
      });
    },
    FETCH_DROPDOWN_ROOF_TYPE() {
      axios({
        method: "get",
        url: "/MdRoofType",
        headers: {
          Authorization: "Bearer " + JSON.parse(localStorage.getItem("token")),
        },
      }).then((res) => {
        if (res.data) {
          this.formSelect.roof_type = res.data;
        }
      });
    },
    FETCH_DROPDOWN_ROOF_SHAPE() {
      axios({
        method: "get",
        url: "/MdRoofShape",
        headers: {
          Authorization: "Bearer " + JSON.parse(localStorage.getItem("token")),
        },
      }).then((res) => {
        if (res.data) {
          this.formSelect.roof_shape = res.data;
        }
      });
    },
    FETCH_DROPDOWN_BOTTOM_TYPE() {
      axios({
        method: "get",
        url: "/MdBottomType",
        headers: {
          Authorization: "Bearer " + JSON.parse(localStorage.getItem("token")),
        },
      }).then((res) => {
        if (res.data) {
          this.formSelect.bottom_type = res.data;
        }
      });
    },
    FETCH_DROPDOWN_INSULATION() {
      axios({
        method: "get",
        url: "/MdInsulation",
        headers: {
          Authorization: "Bearer " + JSON.parse(localStorage.getItem("token")),
        },
      }).then((res) => {
        if (res.data) {
          this.formSelect.insulation = res.data;
        }
      });
    },
    FETCH_DROPDOWN_FOUNDAION() {
      axios({
        method: "get",
        url: "/MdFoundation",
        headers: {
          Authorization: "Bearer " + JSON.parse(localStorage.getItem("token")),
        },
      }).then((res) => {
        if (res.data) {
          this.formSelect.foundation = res.data;
        }
      });
    },
    FETCH_DROPDOWN_SITE() {
      var id_client = this.formData.id_client;
      axios({
        method: "get",
        url: "/MdSite/get-md-site-by-client-id?id=" + id_client,
        headers: {
          Authorization: "Bearer " + JSON.parse(localStorage.getItem("token")),
        },
      }).then((res) => {
        if (res.data) {
          this.formSelect.site = res.data;
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/style/main.scss";
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
</style>