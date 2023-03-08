<template>
  <div class="page-container">
    <div class="tab-wrapper">
      <vue-tabs-chrome v-model="tabCurrent" :tabs="tabs" />
    </div>
    <div class="page-section info-tab-display" v-if="tabCurrent == 'info'">
      <div class="report-sheet report-sheet-info" style="grid-row: span 2">
        <div class="report-container">
          <div class="sheet-body" style="grid-template-columns: 50% 50%">
            <div class="section-label" style="grid-column: span 2">
              <label>tank specification</label>
            </div>
            <div class="form-item" v-for="item in generalInfo" :key="item.desc">
              <div class="form-item-label">
                <label>{{ item.desc }}</label>
              </div>
              <div class="form-item-value">
                <label>{{ item.value }}</label>
              </div>
            </div>
            <div class="form-item" style="grid-column: span 2; grid-row: span 2; height: 49px">
              <div class="form-item-label" style="height: 36px">
                <label>Foundation</label>
              </div>
              <div class="form-item-value" style="height: 36px">
                <label>{{ infoTank.foundation }}</label>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="report-sheet">
        <div class="report-container">
          <div class="sheet-body">
            <div>
              <div class="section-label">
                <label>overview picture</label>
              </div>

              <div class="form-item-picture-log">
                <div class="img-box">
                  <div class="btn-panel">
                    <v-ons-toolbar-button
                      class="pic-toolbar-btn"
                      v-on:click="PREVIEW_PIC(infoTank.overview_img_path)"
                      v-if="infoTank.overview_img_path"
                    >
                      <i class="las la-eye"></i>
                    </v-ons-toolbar-button>
                    <v-ons-toolbar-button
                      class="pic-toolbar-btn"
                      v-on:click="DELETE_PIC(infoTank.overview_img_path, 1)"
                      v-if="infoTank.overview_img_path"
                    >
                      <i class="las la-trash"></i>
                    </v-ons-toolbar-button>
                    <v-ons-toolbar-button>
                      <label
                        class="pic-toolbar-btn"
                        for="pic-upload-btn"
                        v-if="!infoTank.overview_img_path"
                      >
                        <i class="las la-plus"></i>
                      </label>
                    </v-ons-toolbar-button>
                  </div>
                  <img
                    :src="baseURL + infoTank.overview_img_path"
                    v-if="infoTank.overview_img_path"
                  />
                  <input
                    type="file"
                    id="pic-upload-btn"
                    style="display: none"
                    ref="pic_upload_ov"
                    @change="UPLOAD_PIC(1)"
                  />

                  <div class>
                    <i class="las la-image" v-if="!infoTank.overview_img_path"></i>
                    <label v-if="!infoTank.overview_img_path">No Image</label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="report-sheet">
        <div class="report-container">
          <div class="sheet-body">
            <div>
              <div class="section-label">
                <label>name plate picture</label>
              </div>

              <div class="form-item-picture-log">
                <div class="img-box">
                  <div class="btn-panel">
                    <v-ons-toolbar-button
                      class="pic-toolbar-btn"
                      v-on:click="PREVIEW_PIC(infoTank.name_plate_img_path)"
                      v-if="infoTank.name_plate_img_path"
                    >
                      <i class="las la-eye"></i>
                    </v-ons-toolbar-button>
                    <v-ons-toolbar-button
                      class="pic-toolbar-btn"
                      v-on:click="DELETE_PIC(infoTank.name_plate_img_path, 2)"
                      v-if="infoTank.name_plate_img_path"
                    >
                      <i class="las la-trash"></i>
                    </v-ons-toolbar-button>
                    <v-ons-toolbar-button v-if="!infoTank.name_plate_img_path">
                      <label
                        class="pic-toolbar-btn"
                        for="pic-upload-btn-2"
                        v-if="!infoTank.name_plate_img_path"
                      >
                        <i class="las la-plus"></i>
                      </label>
                    </v-ons-toolbar-button>
                  </div>
                  <img
                    :src="baseURL + infoTank.name_plate_img_path"
                    v-if="infoTank.name_plate_img_path"
                  />
                  <input
                    type="file"
                    id="pic-upload-btn-2"
                    style="display: none"
                    ref="pic_upload_np"
                    @change="UPLOAD_PIC(2)"
                  />
                  <i class="las la-image" v-if="!infoTank.name_plate_img_path"></i>
                  <label v-if="!infoTank.name_plate_img_path">No Image</label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <shellCourse v-if="tabCurrent == 'info'" style="grid-column: span 2" />
    </div>
    <div v-if="tabCurrent == 'additional'">
      <infoAdditional :infoAddi="generalInfo" />
    </div>
    <div v-if="tabCurrent == 'drawing'">
      <drawingTable />
      <pidTable />
    </div>
    <div v-if="tabCurrent == 'doc'">
      <generalDocTable />
    </div>
    <contentLoading text="Loading, please wait..." v-if="isLoading == true" color="#fc9b21" />
    <previewImage :imageURL="previewImg" v-if="previewImg" @close-preview="PREVIEW_PIC_CLOSE()" />
  </div>
</template> 

<script>
//API
import axios from "/axios.js";
import moment from "moment";

//Components
import VueTabsChrome from "vue-tabs-chrome";
import shellCourse from "@/views/Applications/TankList/Pages/Information/table-shell-course.vue";
import drawingTable from "@/views/Applications/TankList/Pages/Information/table-drawing.vue";
import pidTable from "@/views/Applications/TankList/Pages/Information/table-pid.vue";
import generalDocTable from "@/views/Applications/TankList/Pages/Information/table-generalDoc.vue";
import contentLoading from "@/components/app-structures/app-content-loading.vue";
import previewImage from "@/components/image-preview.vue";
import infoAdditional from "@/views/Applications/TankList/Pages/Information/table-infoAdditional.vue";

//DataGrid

export default {
  name: "ViewTankInformation",
  components: {
    VueTabsChrome,
    shellCourse,
    drawingTable,
    pidTable,
    generalDocTable,
    contentLoading,
    previewImage,
    infoAdditional
  },
  created() {
    this.$store.commit("UPDATE_CURRENT_INAPP", {
      name: "Tank Management",
      icon: "/img/icon_menu/tank/tank.png"
    });
    this.$store.commit("UPDATE_CURRENT_PAGENAME", {
      subpageName: "Tank Information",
      subpageInnerName: null
    });
    if (this.$store.state.status.server == true) {
      this.FETCH_TANK_INFO();
      this.FETCH_CLIENT_INFO();
    }
  },
  data() {
    return {
      infoTank: {},
      infoClient: {},
      file_pic_upload: "",
      tabCurrent: "info",
      tabs: [
        {
          label: "General Information",
          key: "info",
          closable: false
        },
        {
          label: "Additional Information",
          key: "additional",
          closable: false
        },
        {
          label: "Drawing and P&ID",
          key: "drawing",
          closable: false
        },
        {
          label: "General Document",
          key: "doc",
          closable: false
        }
      ],
      previewImg: "",
      isLoading: false
    };
  },
  computed: {
    generalInfo() {
      var info = [
        {
          desc: "Construction Code",
          value: this.infoTank.construction_code
        },
        {
          desc: "Tank Status",
          value: this.infoTank.tank_status
        },
        {
          desc: "Inspection Code",
          value: this.infoTank.inspection_code
        },
        {
          desc: "Tank Capacity (Litre)",
          value: this.infoTank.tank_capacity_litre
        },
        {
          desc: "Tank Height (m)",
          value: this.infoTank.tank_height_m
        },
        {
          desc: "Joint Efficiency",
          value: this.infoTank.joint_efficiency
        },
        {
          desc: "Max. Liquid Level (m)",
          value: this.infoTank.max_liquid_level_m
        },
        {
          desc: "Bottom Nominal Thk. (mm)",
          value: this.infoTank.bottom_nominal_thk_mm
        },
        {
          desc: "Diameter (m)",
          value: this.infoTank.diameter_m
        },
        {
          desc: "Annular Nominal Thk. (mm)",
          value: this.infoTank.annular_nominal_thk_mm
        },
        {
          desc: "No. of Shell Course",
          value: this.infoTank.no_of_shell_course
        },
        {
          desc: "Roof Nominal Thk. (mm)",
          value: this.infoTank.roof_nominal_thk_mm
        },
        {
          desc: "Tank Internal Pressure ",
          value: this.infoTank.tank_internal_pressure
        },
        {
          desc: "Design Pressure Shell (psig)",
          value: this.infoTank.design_pressure_shell_psi
        },
        {
          desc: "Roof Type",
          value: this.infoTank.roof_type
        },
        {
          desc: "Operating Pressure Shell (psig)",
          value: this.infoTank.ope_pressure_shell_psi
        },
        {
          desc: "Roof Shape",
          value: this.infoTank.roof_shape
        },
        {
          desc: "Design Pressure Coil (psig)",
          value: this.infoTank.design_pressure_coil_psi
        },
        {
          desc: "Bottom",
          value: this.infoTank.bottom_type
        },
        {
          desc: "Operating Pressure Coil (psig)",
          value: this.infoTank.ope_pressure_coil_psi
        },
        {
          desc: "Insulation ",
          value: this.infoTank.insulation
        },
        {
          desc: "Installation Date ",
          value: moment(this.infoTank.installation_date).format("LL")
        },
        {
          desc: "Insulation Thickness (mm)",
          value: this.infoTank.insulation_thk_mm
        },
        {
          desc: "In-service Date ",
          value: moment(this.infoTank.inservice_date).format("LL")
        },
        {
          desc: "Product",
          value: this.infoTank.product_code
        },
        {
          desc: "Previous Inspection Date",
          value: moment(this.infoTank.last_inspection_date).format("LL")
        },
        {
          desc: "Specific Gravity",
          value: this.infoTank.sg_of_product
        },
        {
          desc: "In-service Age of Tank",
          value: this.infoTank.inservice_age_of_tank_yrs
        }
      ];
      return info;
    },
    componentInfo() {
      var info = [
        {
          desc: "Bottom",
          value: this.infoTank.component_bottom
        },
        {
          desc: "Shell",
          value: this.infoTank.component_shell
        },
        {
          desc: "Manways",
          value: this.infoTank.component_manways
        },
        {
          desc: "Fixed Roof",
          value: this.infoTank.component_fixed_roof
        },
        {
          desc: "Access",
          value: this.infoTank.component_access
        },
        {
          desc: "Drain",
          value: this.infoTank.component_drain
        },
        {
          desc: "Vents",
          value: this.infoTank.component_vents
        },
        {
          desc: "Floating Roof",
          value: this.infoTank.floating_roof
        },
        {
          desc: "Type",
          value: this.infoTank.component_type
        },
        {
          desc: "Material and Style",
          value: this.infoTank.component_material_and_style
        },
        {
          desc: "Primary Seal",
          value: this.infoTank.component_primary_seal
        },
        {
          desc: "Secondary Seal",
          value: this.infoTank.component_secondary_seal
        },
        {
          desc: "Anti Rotation Device",
          value: this.infoTank.component_anti_rotation_device
        },
        {
          desc: "Gauge Pipe",
          value: this.infoTank.component_gauge_pipe
        }
      ];
      return info;
    },
    feiInfo() {
      var info = [
        {
          desc: "FEI Last Inspected",
          value: this.infoTank.fei_last_inspected
        },
        {
          desc: "FEI Last Coated",
          value: this.infoTank.fei_last_coated
        },
        {
          desc: "FEI Last Cleaned",
          value: this.infoTank.fei_last_cleaned
        },
        {
          desc: "FEI Recommended Next",
          value: this.infoTank.fei_recommended_next
        }
      ];
      return info;
    },
    fiiInfo() {
      var info = [
        {
          desc: "FII Last Inspected",
          value: this.infoTank.fii_last_inspected
        },
        {
          desc: "FII Last Coated",
          value: this.infoTank.fii_last_coated
        },
        {
          desc: "FII Last Cleaned",
          value: this.infoTank.fii_last_cleaned
        }
      ];
      return info;
    },
    coatingInfo() {
      var info = [
        {
          desc: "Ext Bottom",
          value: this.infoTank.coating_ext_bottom
        },
        {
          desc: "Ext Shell",
          value: this.infoTank.coating_ext_shell
        },
        {
          desc: "Ext Fixed Roof",
          value: this.infoTank.coating_ext_fixed_roof
        },
        {
          desc: "Ext Floating Roof",
          value: this.infoTank.coating_ext_floating_roof
        },
        {
          desc: "Int Bottom",
          value: this.infoTank.coating_int_bottom
        },
        {
          desc: "Int Shell",
          value: this.infoTank.coating_int_shell
        },
        {
          desc: "Int Fixed Roof",
          value: this.infoTank.coating_int_fixed_roof
        },
        {
          desc: "Int Floating Roof",
          value: this.infoTank.coating_int_floating_roof
        }
      ];
      return info;
    },
    miscInfo() {
      var info = [
        {
          desc: "Pressure (operating/design)",
          value: this.infoTank.misc_pressure
        },
        {
          desc: "Temperature (operating/design)",
          value: this.infoTank.misc_temp
        },
        {
          desc: "Venting",
          value: this.infoTank.misc_venting
        },
        {
          desc: "Flow Rates",
          value: this.infoTank.misc_flow_rate
        },
        {
          desc: "Suction Line",
          value: this.infoTank.misc_suction_line
        },
        {
          desc: "Receipt",
          value: this.infoTank.misc_receipt
        }
      ];
      return info;
    },
    secondContInfo() {
      var info = [
        {
          desc: "Description/Condition/Visual Findings",
          value: this.infoTank.desc_cond_visual_finding
        }
      ];
      return info;
    },
    baseURL() {
      var mode = this.$store.state.mode;
      if (mode == "dev") return this.$store.state.modeURL.dev;
      else if (mode == "prod") return this.$store.state.modeURL.prod;
      else return console.log("develpment mode set up incorrect.");
    }
  },
  methods: {
    FETCH_TANK_INFO() {
      console.log("==> FETCH TANK INFO: START");
      this.isLoading = true;
      var id_tag = this.$route.params.id_tag;
      console.log("==> FETCH TANK INFO: ID TAG (TANK): " + id_tag);
      axios({
        method: "post",
        url: "tank-info/tank-info-by-id",
        headers: {
          Authorization: "Bearer " + JSON.parse(localStorage.getItem("token"))
        },
        data: {
          id_tag: id_tag
        }
      })
        .then(res => {
          console.log("==> FETCH TANK INFO: DONE");
          console.log(res);
          if (res.status == 200 && res.data) {
            this.infoTank = res.data[0];
          }
        })
        .catch(error => {
          console.log(error);
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
    FETCH_CLIENT_INFO() {
      console.log("==> FETCH CLIENT INFO: START");
      this.isLoading = true;
      var id_company = this.$route.params.id_company;
      console.log("ID COMPANY: " + id_company);
      axios({
        method: "get",
        url: "/MdClientCompany/" + id_company,
        headers: {
          Authorization: "Bearer " + JSON.parse(localStorage.getItem("token"))
        }
      })
        .then(res => {
          console.log("==> FETCH CLIENT INFO: DONE");
          console.log(res);
          if (res.status == 200 && res.data) {
            this.infoClient = res.data;
            this.$store.commit("UPDATE_CURRENT_CLIENT", {
              name: this.infoClient.company_name,
              logo: this.infoClient.logo
            });
          }
        })
        .catch(error => {
          console.log(error);
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
    UPLOAD_PIC(pic_type) {
      this.isLoading = true;
      console.log("==> TANK INFO IMG UPLOAD: START");
      var id_tag = this.$route.params.id_tag;
      console.log("==> ID TAG (TANK): " + id_tag);

      if (pic_type == 1) {
        this.file_pic_upload = this.$refs.pic_upload_ov.files[0];
      } else {
        this.file_pic_upload = this.$refs.pic_upload_np.files[0];
      }

      console.log(this.file_pic_upload);
      console.log("==> TANK INFO IMG UPLOAD: TYPE " + pic_type);
      if (
        (this.file_pic_upload && this.file_pic_upload.type == "image/jpeg") ||
        this.file_pic_upload.type == "image/png"
      ) {
        if (this.file_pic_upload.size < 20000000) {
          axios({
            method: "post",
            url: "/tank-info/attach-pic",
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization:
                "Bearer " + JSON.parse(localStorage.getItem("token"))
            },
            data: {
              id_tag: id_tag,
              file: this.file_pic_upload,
              type: pic_type
            }
          })
            .then(res => {
              console.log(res);

              if (res.status == 200) {
                this.FETCH_TANK_INFO();
                console.log("==> TANK INFO IMG UPLOAD: DONE");
                this.isLoading = false;
              }
            })
            .catch(error => {
              this.isLoading = false;
              this.$ons.notification.alert(
                error.code + " " + error.response.status + " " + error.message
              );
            })
            .finally(() => {});
        } else {
          this.$ons.notification.alert("File size too large. (20 MB max)");
          const file = document.getElementById("pic-upload-btn");
          file.val = "";
          this.isLoading = false;
        }
      } else {
        this.$ons.notification.alert(
          "Incorrect filetype. <br/> Only JPEG/PNG file can be uploaded."
        );
        const file = document.getElementById("pic-upload-btn");
        file.val = "";
        this.isLoading = false;
      }
    },
    DELETE_PIC(file_path, pic_type) {
      this.$ons.notification.confirm("Confirm delete?").then(res => {
        if (res == 1) {
          this.isLoading = true;
          console.log("==> TANK INFO IMG DELETE: START");
          var id_tag = this.$route.params.id_tag;
          console.log("==> ID TAG (TANK): " + id_tag);
          axios({
            method: "delete",
            url: "/tank-info/delete-pic",
            headers: {
              Authorization:
                "Bearer " + JSON.parse(localStorage.getItem("token"))
            },
            data: {
              id_tag: id_tag,
              file_path: file_path,
              type: pic_type
            }
          })
            .then(res => {
              console.log(res);

              if (res.status == 200) {
                this.FETCH_TANK_INFO();
                console.log("==> TANK INFO IMG DELETE: DONE");
                this.isLoading = false;
              }
            })
            .catch(error => {
              this.isLoading = false;
              this.$ons.notification.alert(
                error.code + " " + error.response.status + " " + error.message
              );
            })
            .finally(() => {
              this.FETCH_TANK_INFO();
            });
        }
      });
    },
    PREVIEW_PIC(img) {
      if (img) {
        this.previewImg = img;
      }
    },
    PREVIEW_PIC_CLOSE() {
      this.previewImg = "";
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/style/main.scss";

.page-container {
  width: 100%;
  height: 100%;

  overflow-y: auto;
}
.report-sheet {
  max-width: 100%;
  width: 100%;
  font-family: $web-default-font;
  box-shadow: none;
  padding: 0 !important;
  margin-top: 0;
  margin-bottom: 0;
  .report-container {
    .header {
      .title {
        grid-column: span 4;
      }
    }
    .sheet-body {
      grid-template-columns: 100%;
      border-radius: 6px;
      overflow: hidden;
      .form-item {
        display: grid;
        grid-template-columns: 180px calc(100% - 180px);
        grid-template-rows: 35px;
        .form-item-label {
          label {
            // text-transform: capitalize;
          }
        }
        .form-item-value {
          grid-column: span 1;
          label {
            margin: 0 auto;
            font-weight: 600;
          }
        }
      }
      .form-item-picture-log .img-box {
        height: 244px;
      }
    }
  }
}

.page-section {
  padding: 20px;
}

.page-section:last-child {
  padding-bottom: 20px;
}
.section-label {
  label {
    font-size: 12px !important;
  }
}

.info-tab-display {
  width: calc(100% - 60px);
  display: grid;
  grid-gap: 20px;
  grid-template-columns: calc(100% - 500px) 500px;
  grid-template-rows: 273px 273px;
}

@media (max-width: 1400px) {
  .info-tab-display {
    display: grid;
    grid-gap: 20px;
    grid-template-columns: 50% 50%;
    grid-template-rows: 273px 273px;
  }
  .report-sheet-info {
    grid-column: span 2;
  }
}

.pic-toolbar-btn {
  cursor: pointer;
  border-radius: 6px;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 32px;
  width: 44px;
  margin: 0 !important;
  padding: 0 !important;
  background-color: #fff;
  border: 1px solid #e6e6e6;
  margin-top: 10px !important;
}
.toolbar-button {
  padding: 0;
}
</style>