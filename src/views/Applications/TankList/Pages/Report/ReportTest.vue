<template>
  <div
    class="page-container"
    :class="[
      pagePanelHiding == false ? 'page-container' : 'page-container-hide',
    ]"
  >
    <InspectionRecordPanel @showHidePanel="SHOW_HIDE_PANEL" @viewItem="VIEW_ITEM" />
    <div class="list-page" v-if="this.id_inspection_record != ''">
      <v-ons-list>
        <v-ons-list-header>
          Inspection Detail of
          <b>{{ DATE_FORMAT(current_view.inspection_date) }}</b>
        </v-ons-list-header>
      </v-ons-list>
      <div class="tab-wrapper">
        <vue-tabs-chrome v-model="tabCurrent" :tabs="tabs" />
      </div>

      <div v-if="tabCurrent == 'tab1'">
        <!-- <button type="button" class v-on:click="createGENERALDocx()">Create docx</button> -->
        <div class="dx-table-style">
          <div class="table-toolbar-set">
            <v-ons-toolbar-button
              class="table-toolbar-btn"
              id="ilast"
              @mouseover="isHovering=true"
              @mouseleave="isHovering=false"
              v-on:click="createGENERALDocx()"
            >
              <i class="las" :class="{'la-file-alt' : !isHovering, 'la-download' : isHovering}"></i>
              <span>GENERAL REPORT</span>
            </v-ons-toolbar-button>
          </div>
        </div>
      </div>
      <div v-if="tabCurrent == 'tab2'">
        <!-- <button type="button" class="table-toolbar-btn" v-on:click="createILASTDocx()">
          <i class="las la-file-alt"></i>
          <span>ILAST REPORT</span>
        </button>-->
        <div class="dx-table-style">
          <div class="table-toolbar-set">
            <v-ons-toolbar-button
              class="table-toolbar-btn"
              id="ilast"
              @mouseover="isHovering=true"
              @mouseleave="isHovering=false"
              v-on:click="createILASTDocx()"
            >
              <i class="las" :class="{'la-file-alt' : !isHovering, 'la-download' : isHovering}"></i>
              <span>ILAST REPORT</span>
            </v-ons-toolbar-button>
          </div>
        </div>
      </div>
      <div v-if="tabCurrent == 'tab3'">
        <button type="button" v-on:click="createILASTInter()">Create docx</button>
      </div>
      <PageLoading v-if="isLoading == true" text="Please wait. . ." />
    </div>
    <SelectInspRecord v-if="this.id_inspection_record == ''" />
  </div>
</template>
<script>
import { TemplateHandler } from "easy-template-x";
//import { createResolver } from "easy-template-x";
//import { createResolver } from "easy-template-x-angular-expressions";
import axios from "/axios.js";
import moment from "moment";
import InspectionRecordPanel from "@/views/Applications/TankList/Pages/inspection-record-panel.vue";
import SelectInspRecord from "@/components/select-insp-record.vue";
import VueTabsChrome from "vue-tabs-chrome";
import PageLoading from "@/components/app-structures/app-loading.vue";
//import { saveAs } from "@progress/kendo-file-saver";
//import { markup } from "./data.js";
//import { DxHtmlEditor, DxToolbar, DxItem } from "devextreme-vue/html-editor";

export default {
  name: "report-test",

  components: {
    InspectionRecordPanel,
    SelectInspRecord,
    VueTabsChrome,
    PageLoading
  },
  created() {
    if (this.$store.state.status.server == true) {
      // console.log("data:");
      // console.log(this.data1);
    }
    this.$store.commit("UPDATE_CURRENT_PAGENAME", {
      subpageName: "Report",
      subpageInnerName: null
    });
  },
  data() {
    return {
      theTemplate: null,
      isLoading: false,
      isHovering: false,
      imgpath: [],
      repairList: [],
      drawingList: [],
      current_view: {},
      buffer: "",
      status: "",
      pagePanelHiding: false,
      tabCurrent: "tab2",
      id_inspection_record: "",
      tabs: [
        {
          label: "Generic",
          key: "tab1",
          closable: false
        },
        {
          label: "ILAST",
          key: "tab2",
          closable: false
        },
        // {
        //   label: "ILAST Internal",
        //   key: "tab3",
        //   closable: false
        // }
      ],
      data1: {
        new_page: {
          _type: "rawXml",
          xml: '<w:br w:type="page"/>'
        },
        company_name: "",
        overview_img_path: "",
        overview_pic: "",
        name_plate_img_path: "",
        tank_no: "",
        tank_status: "",
        insp_date: "",
        insp_campaign: "",
        location: "",
        inservice_date: "",
        inspection_code: "",
        diameter_m: "",
        tank_height_m: "",
        tank_capacity_litre: "",
        max_liquid_level_m: "",
        max_liquid_level_ft: "",
        roof_shape: "",
        diameter_ft: "",
        tank_height_ft: "",
        product_code: "",
        g: "",
        insulation: "",
        foundation: "",
        name_api_653: "",
        name_inspection_engineer: "",
        name_ndt_examiner: "",
        cert_no: "",
        site_name: "",
        joint_efficiency: "",
        component_bottom: "",
        component_shell: "",
        component_manways: "",
        component_fixed_roof: "",
        component_access: "",
        component_drain: "",
        component_vents: "",
        component_floating_roof: "",
        component_type: "",
        component_material_and_style: "",
        component_primary_seal: "",
        component_secondary_seal: "",
        component_anti_rotation_device: "",
        component_gauge_pipe: "",
        fei_last_inspected: "",
        fei_last_coated: "",
        fei_last_cleaned: "",
        fei_recommended_next: "",
        fii_last_inspected: "",
        fii_last_coated: "",
        fii_last_cleaned: "",
        fii_recommended_next: "",
        coating_ext_bottom: "",
        coating_ext_shell: "",
        coating_ext_fixed_roof: "",
        coating_ext_floating_roof: "",
        coating_int_bottom: "",
        coating_int_shell: "",
        coating_int_fixed_roof: "",
        coating_int_floating_roof: "",
        desc_cond_visual_finding: "",
        misc_pressure: "",
        misc_temp: "",
        misc_venting: "",
        misc_flow_rate: "",
        misc_suction_line: "",
        misc_receipt: "",
        installation_date: "",
        roof_type: "",
        applicable_status: "",
        roof_nominal_thk_mm: "",
        annular_nominal_thk_mm: "",
        bottom_nominal_thk_mm: "",
        accept: [],
        mrt: [],
        roundness: [],
        local_deviation: [],
        shell_buckling: [],
        grounding: [],
        grounding_detail: [],
        annular: [],
        bottom: [],
        coil: [],
        critical_zone: [],
        piping: [],
        roof: [],
        roof_nozzle: [],
        sump: [],
        shell: [],
        shell_nozzle: [],
        projection_plate: [],
        bottom_thk: [],
        critical_thk: [],
        checklist: [],
        checklist_generic: [],
        plumbness: [],
        roof_thk: [],
        roofnz_thk: [],
        shellnz_thk: [],
        annular_thk: [],
        projection_thk: [],
        piping_thk: [],
        coil_thk: [],
        sump_thk: [],
        mfl_bottom: [],
        mfl_annular: [],
        shell_course: [{}],
        tank_course: [],
        shell_settlement_point: [],
        shell_settlement_api: [],
        shell_settlement_api_sum: [],
        shell_thk: [],
        picture_log: [{}],
        shell_settlement_1: "",
        shell_settlement_2: "",
        shell_roundness: "",
        bottom_settlement: {},
        repair: [{}]
      }
    };
  },
  computed: {
    baseURL() {
      var mode = this.$store.state.mode;
      if (mode == "dev") return this.$store.state.modeURL.dev;
      else if (mode == "prod") return this.$store.state.modeURL.prod;
      else return console.log("develpment mode set up incorrect.");
    }
  },
  methods: {
    async getTemplate() {
      if (this.theTemplate) return this.theTemplate;
      const request = await fetch(
        "/report_template/Inspection Report Template.docx"
      );
      //console.log(request);
      this.theTemplate = await request.blob();
    },
    async getTemplateGeneral() {
      if (this.theTemplate) return this.theTemplate;
      const request = await fetch(
        "/report_template/General_Report_Template.docx"
      );
      //console.log(request);
      this.theTemplate = await request.blob();
    },
    async createILASTDocx() {
      console.log("CREATED DOCX: ");
      const myTimeout = setTimeout(this.alertTimeOUT, 20000); //after 20 second loading screen will be false and alert POPUP
      this.data1.picture_log.shift();
      console.log(this.data1);
      this.isLoading = true;
      try {
        this.status = "";

        // 1. read template file
        this.status = "Getting the template...";
        const templateFile = await this.getTemplate();
        console.log(templateFile);
        console.log("1");

        // 2. read json data
        this.status = "Parsing data...";
        // const jsonData = this.data1;
        // const data = JSON.parse(jsonData);
        const data = this.data1;
        console.log("2");

        // 3. process the template
        this.status = "Creating document...";
        const handler = new TemplateHandler();
        console.log("3.1");
        let docx = await handler.process(this.theTemplate, data);
        console.log("3.2:" + docx);

        // 4. save output
        this.status = "Done!";
        this.saveFile("ILAST_REPORT.docx", docx);
        console.log("4");
        this.isLoading = false;
        //this.$ons.notification.alert("Completed!");
        clearTimeout(myTimeout); // cancel timeout popup
        this.theTemplate = null;
      } catch (e) {
        // error handling
        this.status = "Error: " + e.message;
        console.error(e);
      }
    },
    async createGENERALDocx() {
      console.log("CREATED DOCX: ");
      this.data1.picture_log.shift();
      const myTimeout = setTimeout(this.alertTimeOUT, 20000); //after 20 second loading screen will be false and alert POPUP
      console.log(this.data1);
      this.isLoading = true;
      try {
        this.status = "";

        // 1. read template file
        this.status = "Getting the template...";
        const templateFile = await this.getTemplateGeneral();
        console.log(templateFile);
        console.log("1");

        // 2. read json data
        this.status = "Parsing data...";
        // const jsonData = this.data1;
        // const data = JSON.parse(jsonData);
        const data = this.data1;
        console.log("2");

        // 3. process the template
        this.status = "Creating document...";
        const handler = new TemplateHandler();
        console.log("3.1");
        let docx = await handler.process(this.theTemplate, data);
        console.log("3.2:" + docx);

        // 4. save output
        this.status = "Done!";
        this.saveFile("General_REPORT.docx", docx);
        console.log("4");
        this.isLoading = false;

        clearTimeout(myTimeout); // cancel timeout popup
        this.theTemplate = null;
      } catch (e) {
        // error handling
        this.status = "Error: " + e.message;
        console.error(e);
      }
    },
    DATE_FORMAT(d) {
      return moment(d).format("LL");
    },
    DATE_FOR_SHELL_THK(obj) {
      //console.log("DATE FOR DOCX:!");
      for (let i = 0; i < obj.length; i++) {
        const date = obj[i].inspection_date;
        this.data1.shell_thk[i].inspection_date = moment(date).format(
          "DD MMM YYYY"
        );
      }
    },
    DATE_FOR_ROOF_THK(obj) {
      //console.log("DATE FOR DOCX:!");
      for (let i = 0; i < obj.length; i++) {
        const date = obj[i].inspection_date;
        this.data1.roof_thk[i].inspection_date = moment(date).format(
          "DD MMM YYYY"
        );
      }
    },
    DATE_FOR_ROOFNZ_THK(obj) {
      //console.log("DATE FOR DOCX:!");
      for (let i = 0; i < obj.length; i++) {
        const date = obj[i].inspection_date;
        this.data1.roofnz_thk[i].inspection_date = moment(date).format(
          "DD MMM YYYY"
        );
      }
    },
    DATE_FOR_BOTTOM_THK(obj) {
      for (let i = 0; i < obj.length; i++) {
        const date = obj[i].inspection_date;
        this.data1.bottom_thk[i].inspection_date = moment(date).format(
          "DD MMM YYYY"
        );
      }
    },
    DATE_FOR_CRIT_ZONE(obj) {
      for (let i = 0; i < obj.length; i++) {
        const date = obj[i].inspection_date;
        this.data1.critical_thk[i].inspection_date = moment(date).format(
          "DD MMM YYYY"
        );
      }
    },
    NUMBER_ROUNDING_ROOF_THK(obj) {
      for (let i = 0; i < obj.length; i++) {
        const scr = obj[i].scr;
        const rl = obj[i].rl;
        this.data1.roof_thk[i].scr = scr.toFixed(2);
        this.data1.roof_thk[i].rl = rl.toFixed(2);
      }
    },
    NUMBER_ROUNDING_ROOFNZ_THK(obj) {
      for (let i = 0; i < obj.length; i++) {
        const scr = obj[i].scr;
        const rl = obj[i].rl;
        this.data1.roofnz_thk[i].scr = scr.toFixed(2);
        this.data1.roofnz_thk[i].rl = rl.toFixed(2);
      }
    },
    NUMBER_ROUNDING_SHELLNZ_THK(obj) {
      for (let i = 0; i < obj.length; i++) {
        const scr = obj[i].scr;
        const rl = obj[i].rl;
        const date = obj[i].inspection_date;
        this.data1.shellnz_thk[i].inspection_date = moment(date).format(
          "DD MMM YYYY"
        );
        this.data1.shellnz_thk[i].scr = scr.toFixed(2);
        this.data1.shellnz_thk[i].rl = rl.toFixed(2);
      }
    },
    NUMBER_ROUNDING_ANNULAR_THK(obj) {
      for (let i = 0; i < obj.length; i++) {
        const scr = obj[i].scr;
        const rl = obj[i].rl;
        const date = obj[i].inspection_date;
        this.data1.annular_thk[i].inspection_date = moment(date).format(
          "DD MMM YYYY"
        );
        this.data1.annular_thk[i].scr = scr.toFixed(2);
        this.data1.annular_thk[i].rl = rl.toFixed(2);
        this.data1.annular_thk[i].t_req = obj[i].t_req.toFixed(2);
      }
    },
    NUMBER_ROUNDING_PIPING_THK(obj) {
      for (let i = 0; i < obj.length; i++) {
        const scr = obj[i].scr;
        const rl = obj[i].rl;
        const date = obj[i].inspection_date;
        this.data1.piping_thk[i].inspection_date = moment(date).format(
          "DD MMM YYYY"
        );
        this.data1.piping_thk[i].scr = scr.toFixed(2);
        this.data1.piping_thk[i].rl = rl.toFixed(2);
      }
    },
    NUMBER_ROUNDING_COIL_THK(obj) {
      for (let i = 0; i < obj.length; i++) {
        const scr = obj[i].scr;
        const rl = obj[i].rl;
        const date = obj[i].inspection_date;
        this.data1.coil_thk[i].inspection_date = moment(date).format(
          "DD MMM YYYY"
        );
        this.data1.coil_thk[i].scr = scr.toFixed(2);
        this.data1.coil_thk[i].rl = rl.toFixed(2);
      }
    },
    NUMBER_ROUNDING_PROJECTION_THK(obj) {
      for (let i = 0; i < obj.length; i++) {
        const scr = obj[i].scr;
        const rl = obj[i].rl;
        const date = obj[i].inspection_date;
        this.data1.projection_thk[i].inspection_date = moment(date).format(
          "DD MMM YYYY"
        );
        this.data1.projection_thk[i].scr = scr.toFixed(2);
        this.data1.projection_thk[i].rl = rl.toFixed(2);
      }
    },
    NUMBER_ROUNDING_SUMP_THK(obj) {
      for (let i = 0; i < obj.length; i++) {
        const scr = obj[i].scr;
        const rl = obj[i].rl;
        const date = obj[i].inspection_date;
        this.data1.sump_thk[i].inspection_date = moment(date).format(
          "DD MMM YYYY"
        );
        this.data1.sump_thk[i].scr = scr.toFixed(2);
        this.data1.sump_thk[i].rl = rl.toFixed(2);
      }
    },
    NUMBER_ROUNDING_MFLANNULAR_THK(obj) {
      for (let i = 0; i < obj.length; i++) {
        const date = obj[i].inspection_date;
        this.data1.mfl_annular[i].inspection_date = moment(date).format(
          "DD MMM YYYY"
        );
        this.data1.mfl_annular[i].scr = obj[
          i
        ].lowest_remaining_thk_bottom.toFixed(2);
        this.data1.mfl_annular[i].rl = obj[i].lowest_remaining_thk_top.toFixed(
          2
        );
      }
    },
    NUMBER_ROUNDING_MFLBOTTOM_THK(obj) {
      for (let i = 0; i < obj.length; i++) {
        const date = obj[i].inspection_date;
        this.data1.mfl_bottom[i].inspection_date = moment(date).format(
          "DD MMM YYYY"
        );
        this.data1.mfl_bottom[i].scr = obj[
          i
        ].lowest_remaining_thk_bottom.toFixed(2);
        this.data1.mfl_bottom[i].rl = obj[i].lowest_remaining_thk_top.toFixed(
          2
        );
      }
    },
    NUMBER_ROUNDING_SHELL_SETTLE_API(obj) {
      for (let i = 0; i < obj.length; i++) {
        const rad = obj[i].theta_radians;
        const degree = obj[i].theta_degrees;
        const y = obj[i].y;
        const out_of_plane = obj[i].out_of_plane;
        const deviation_value = obj[i].deviation_value;
        const difference_2_value = obj[i].difference_2_value;
        const deviation_2_value = obj[i].deviation_2_value;
        const difference_value = obj[i].difference_value;
        this.data1.shell_settlement_api[i].theta_radians = rad.toFixed(2);
        this.data1.shell_settlement_api[i].theta_degrees = degree.toFixed(2);

        this.data1.shell_settlement_api[i].y = y.toFixed(2);
        this.data1.shell_settlement_api[
          i
        ].difference_value = difference_value.toFixed(2);
        this.data1.shell_settlement_api[i].out_of_plane = out_of_plane.toFixed(
          2
        );
        this.data1.shell_settlement_api[
          i
        ].deviation_value = deviation_value.toFixed(2);

        this.data1.shell_settlement_api[
          i
        ].difference_2_value = difference_2_value.toFixed(2);
        this.data1.shell_settlement_api[
          i
        ].deviation_2_value = deviation_2_value.toFixed(2);
      }
    },
    NUMBER_ROUNDING_BOTTOM_THK(obj) {
      for (let i = 0; i < obj.length; i++) {
        const scr = obj[i].scr;
        const rl = obj[i].rl;
        this.data1.bottom_thk[i].scr = scr.toFixed(2);
        this.data1.bottom_thk[i].rl = rl.toFixed(2);
      }
    },
    NUMBER_ROUNDING_CRIT_ZONE(obj) {
      for (let i = 0; i < obj.length; i++) {
        const scr = obj[i].scr;
        const rl = obj[i].rl;
        this.data1.critical_thk[i].scr = scr.toFixed(2);
        this.data1.critical_thk[i].rl = rl.toFixed(2);
      }
    },
    NUMBER_ROUNDING_ACCEPT(obj) {
      this.data1.accept[0].angle_degrees = obj.angle_degrees.toFixed(2);
      this.data1.accept[0].deflection_ft = obj.deflection_ft.toFixed(2);
      this.data1.accept[0].deflection_mm = obj.deflection_mm.toFixed(2);
      this.data1.accept[0].direction_degrees_cw_pi = obj.direction_degrees_cw_pi.toFixed(
        2
      );
      this.data1.accept[0].l_value = obj.l_value.toFixed(2);
      this.data1.accept[0].predicted_tilt = obj.predicted_tilt.toFixed(2);
      this.data1.accept[0].r_2 = obj.r_2.toFixed(2);
      this.data1.accept[0].s_max_in = obj.s_max_in.toFixed(2);
      this.data1.accept[0].s_max_mm = obj.s_max_mm.toFixed(2);
      this.data1.accept[0].s_value = obj.s_value.toFixed(2);
      this.data1.accept[0].st_value = obj.st_value.toFixed(2);
      this.data1.accept[0].ui_before_max = obj.ui_before_max.toFixed(2);
      this.data1.accept[0].ui_max = obj.ui_max.toFixed(2);
      this.data1.accept[0].ui_next_max = obj.ui_next_max.toFixed(2);
    },
    NUMBER_ROUNDING_TANK_COURSE(obj) {
      for (let i = 0; i < obj.length; i++) {
        //const scr = obj[i].scr;
        const min_rl = obj[i].min_rl;
        //this.data1.tank_course[i].scr = scr.toFixed(2)
        this.data1.tank_course[i].min_rl = min_rl.toFixed(2);
      }
    },
    saveFile(filename, blob) {
      // get downloadable url from the blob
      const blobUrl = URL.createObjectURL(blob);

      // create temp link element
      let link = document.createElement("a");
      link.download = filename;
      link.href = blobUrl;

      // use the link to invoke a download
      document.body.appendChild(link);
      link.click();

      // remove the link
      setTimeout(() => {
        link.remove();
        window.URL.revokeObjectURL(blobUrl);
        link = null;
      }, 0);
    },
    FETCH_MARKUP_ANNULAR(item) {
      axios({
        method: "post",
        url: "layout-drawing/layout-drawing-by-comp-id",
        headers: {
          Authorization: "Bearer " + JSON.parse(localStorage.getItem("token"))
        },
        data: {
          id_component: 1,
          id_inspection_record: item.id_inspection_record
        }
      })
        .then(res => {
          console.log("DWG annular:");
          //console.log(res.data);

          if (res.status == 200 && res.data) {
            this.drawingList.annular = res.data;
            this.getImgDWG_Annular();
          }
        })
        .catch(error => {
          console.log(error);
        })
        .finally(() => {
          //this.isLoading = false;
        });
    },
    FETCH_MARKUP_BOTTOM(item) {
      axios({
        method: "post",
        url: "layout-drawing/layout-drawing-by-comp-id",
        headers: {
          Authorization: "Bearer " + JSON.parse(localStorage.getItem("token"))
        },
        data: {
          id_component: 2,
          id_inspection_record: item.id_inspection_record
        }
      })
        .then(res => {
          console.log("DWG bottom:");
          //console.log(res.data);
          if (res.status == 200 && res.data) {
            this.drawingList.bottom = res.data;
            this.getImgDWG_Bottom();
          }
        })
        .catch(error => {
          console.log(error);
        })
        .finally(() => {
          // this.isLoading = false;
          // console.log("DWG bottom:");
          // console.log(this.drawingList);
        });
    },
    FETCH_MARKUP_COIL(item) {
      axios({
        method: "post",
        url: "layout-drawing/layout-drawing-by-comp-id",
        headers: {
          Authorization: "Bearer " + JSON.parse(localStorage.getItem("token"))
        },
        data: {
          id_component: 3,
          id_inspection_record: item.id_inspection_record
        }
      })
        .then(res => {
          console.log("DWG coil:");
          //console.log(res.data);
          if (res.status == 200 && res.data) {
            this.drawingList.coil = res.data;
            this.getImgDWG_Coil();
          }
        })
        .catch(error => {
          console.log(error);
        })
        .finally(() => {
          //this.isLoading = false;
        });
    },
    FETCH_MARKUP_CRITICAL_ZONE(item) {
      axios({
        method: "post",
        url: "layout-drawing/layout-drawing-by-comp-id",
        headers: {
          Authorization: "Bearer " + JSON.parse(localStorage.getItem("token"))
        },
        data: {
          id_component: 4,
          id_inspection_record: item.id_inspection_record
        }
      })
        .then(res => {
          console.log("DWG CRITICAL:");
          //console.log(res.data);
          if (res.status == 200 && res.data) {
            this.drawingList.critical_zone = res.data;
            this.getImgDWG_Critical_zone();
          }
        })
        .catch(error => {
          console.log(error);
        })
        .finally(() => {
          //this.isLoading = false;
        });
    },
    FETCH_MARKUP_PIPING(item) {
      axios({
        method: "post",
        url: "layout-drawing/layout-drawing-by-comp-id",
        headers: {
          Authorization: "Bearer " + JSON.parse(localStorage.getItem("token"))
        },
        data: {
          id_component: 5,
          id_inspection_record: item.id_inspection_record
        }
      })
        .then(res => {
          console.log("DWG PIPING:");
          //console.log(res.data);
          if (res.status == 200 && res.data) {
            this.drawingList.piping = res.data;
            this.getImgDWG_Piping();
          }
        })
        .catch(error => {
          console.log(error);
        })
        .finally(() => {
          //this.isLoading = false;
        });
    },
    FETCH_MARKUP_ROOF(item) {
      axios({
        method: "post",
        url: "layout-drawing/layout-drawing-by-comp-id",
        headers: {
          Authorization: "Bearer " + JSON.parse(localStorage.getItem("token"))
        },
        data: {
          id_component: 6,
          id_inspection_record: item.id_inspection_record
        }
      })
        .then(res => {
          console.log("DWG Roof:");
          //console.log(res.data);
          if (res.status == 200 && res.data) {
            this.drawingList.roof = res.data;
            this.getImgDWG_Roof();
          }
        })
        .catch(error => {
          console.log(error);
        })
        .finally(() => {
          //this.isLoading = false;
        });
    },
    FETCH_MARKUP_ROOFNZ(item) {
      axios({
        method: "post",
        url: "layout-drawing/layout-drawing-by-comp-id",
        headers: {
          Authorization: "Bearer " + JSON.parse(localStorage.getItem("token"))
        },
        data: {
          id_component: 7,
          id_inspection_record: item.id_inspection_record
        }
      })
        .then(res => {
          console.log("DWG Roof nozzle:");
          //console.log(res.data);
          if (res.status == 200 && res.data) {
            this.drawingList.roof_nozzle = res.data;
            this.getImgDWG_Roofnz();
          }
        })
        .catch(error => {
          console.log(error);
        })
        .finally(() => {
          //this.isLoading = false;
        });
    },
    FETCH_MARKUP_SUMP(item) {
      axios({
        method: "post",
        url: "layout-drawing/layout-drawing-by-comp-id",
        headers: {
          Authorization: "Bearer " + JSON.parse(localStorage.getItem("token"))
        },
        data: {
          id_component: 8,
          id_inspection_record: item.id_inspection_record
        }
      })
        .then(res => {
          console.log("DWG SUMP:");
          //console.log(res.data);
          if (res.status == 200 && res.data) {
            this.drawingList.sump = res.data;
            this.getImgDWG_Sump();
          }
        })
        .catch(error => {
          console.log(error);
        })
        .finally(() => {
          //this.isLoading = false;
        });
    },
    FETCH_MARKUP_SHELL(item) {
      axios({
        method: "post",
        url: "layout-drawing/layout-drawing-by-comp-id",
        headers: {
          Authorization: "Bearer " + JSON.parse(localStorage.getItem("token"))
        },
        data: {
          id_component: 9,
          id_inspection_record: item.id_inspection_record
        }
      })
        .then(res => {
          console.log("DWG SHELL:");
          //console.log(res.data);
          if (res.status == 200 && res.data) {
            this.drawingList.shell = res.data;
            this.getImgDWG_Shell();
          }
        })
        .catch(error => {
          console.log(error);
        })
        .finally(() => {
          //this.isLoading = false;
        });
    },
    FETCH_MARKUP_SHELLNZ(item) {
      axios({
        method: "post",
        url: "layout-drawing/layout-drawing-by-comp-id",
        headers: {
          Authorization: "Bearer " + JSON.parse(localStorage.getItem("token"))
        },
        data: {
          id_component: 10,
          id_inspection_record: item.id_inspection_record
        }
      })
        .then(res => {
          console.log("DWG SHELL NOZZLE:");
          //console.log(res.data);
          if (res.status == 200 && res.data) {
            this.drawingList.shell_nozzle = res.data;
            this.getImgDWG_Shellnz();
          }
        })
        .catch(error => {
          console.log(error);
        })
        .finally(() => {
          //this.isLoading = false;
        });
    },
    FETCH_MARKUP_PROJECTION_PLATE(item) {
      axios({
        method: "post",
        url: "layout-drawing/layout-drawing-by-comp-id",
        headers: {
          Authorization: "Bearer " + JSON.parse(localStorage.getItem("token"))
        },
        data: {
          id_component: 11,
          id_inspection_record: item.id_inspection_record
        }
      })
        .then(res => {
          console.log("DWG PROJECTION PLATE:");
          //console.log(res.data);
          if (res.status == 200 && res.data) {
            this.drawingList.projection_plate = res.data;
            this.getImgDWG_Projection_plate();
          }
        })
        .catch(error => {
          console.log(error);
        })
        .finally(() => {
          //this.isLoading = false;
        });
    },
    FETCH_CHECKLIST_ILAST_EX() {
      const id_insp = this.id_inspection_record;
      axios({
        method: "post",
        url: "chk-ilast-ex/get-chkilastex-by-insp-id",
        headers: {
          Authorization: "Bearer " + JSON.parse(localStorage.getItem("token"))
        },
        data: {
          id_insp_record: id_insp
        }
      })
        .then(res => {
          console.log("checklist ilast ex:");
          //console.log(res);
          if (res.status == 200 && res.data) {
            //console.log(res.data);
            this.data1.checklist = res.data;
          }
        })
        .catch(error => {
          console.log(error);
        })
        .finally(() => {
          //this.isLoading = false;
        });
    },
    FETCH_CHECKLIST_GENERIC() {
      const id_insp = this.id_inspection_record;
      axios({
        method: "post",
        url: "chk-generic/get-chkgeneric-by-insp-id",
        headers: {
          Authorization: "Bearer " + JSON.parse(localStorage.getItem("token"))
        },
        data: {
          id_insp_record: id_insp
        }
      })
        .then(res => {
          console.log("checklist generic :");
          //console.log(res);
          if (res.status == 200 && res.data) {
            //console.log(res.data);
            this.data1.checklist_generic = res.data;
          }
        })
        .catch(error => {
          console.log(error);
        })
        .finally(() => {
          //this.isLoading = false;
        });
    },
    FETCH_TANK_INFO() {
      const id_tag = this.$route.params.id_tag;
      //console.log("id_insp:" + id_insp_record);
      axios({
        method: "post",
        url: "tank-info/tank-info-by-id",
        headers: {
          Authorization: "Bearer " + JSON.parse(localStorage.getItem("token"))
        },
        data: {
          id_tag: id_tag
          //id_inspection_record: 18
        }
      })
        .then(res => {
          console.log("tank info:");
          //console.log(res);
          if (res.status == 200) {
            //console.log(res.data);
            //this.data1 = res.data[0];
            this.data1.company_name = res.data[0].company_name;
            this.data1.overview_img_path = res.data[0].overview_img_path;
            this.data1.name_plate_img_path = res.data[0].name_plate_img_path;
            this.data1.tank_no = res.data[0].tank_no;
            this.data1.tank_status = res.data[0].tank_status;
            this.data1.location = res.data[0].location;
            this.data1.inservice_date = res.data[0].inservice_date;
            this.data1.inspection_code = res.data[0].inspection_code;
            this.data1.diameter_m = res.data[0].diameter_m;
            this.data1.tank_height_m = res.data[0].tank_height_m;
            this.data1.tank_capacity_litre = res.data[0].tank_capacity_litre;
            this.data1.max_liquid_level_m = res.data[0].max_liquid_level_m;
            this.data1.max_liquid_level_ft = res.data[0].max_liquid_level_ft;
            this.data1.roof_shape = res.data[0].roof_shape;
            this.data1.diameter_ft = res.data[0].diameter_ft;
            this.data1.tank_height_ft = res.data[0].tank_height_ft;
            this.data1.product_code = res.data[0].product_code;
            this.data1.g = res.data[0].sg_of_product;
            this.data1.site_name = res.data[0].site_name;
            this.data1.joint_efficiency = res.data[0].joint_efficiency;
            this.data1.foundation = res.data[0].foundation;
            this.data1.insulation = res.data[0].insulation;
            this.data1.component_bottom = res.data[0].component_bottom;
            this.data1.component_shell = res.data[0].component_shell;
            this.data1.component_manways = res.data[0].component_manways;
            this.data1.component_fixed_roof = res.data[0].component_fixed_roof;
            this.data1.component_access = res.data[0].component_access;
            this.data1.component_drain = res.data[0].component_drain;
            this.data1.component_vents = res.data[0].component_vents;
            this.data1.component_manways = res.data[0].component_manways;
            this.data1.component_floating_roof =
              res.data[0].component_floating_roof;
            this.data1.component_type = res.data[0].component_type;
            this.data1.component_material_and_style =
              res.data[0].component_material_and_style;
            this.data1.component_primary_seal =
              res.data[0].component_primary_seal;
            this.data1.component_secondary_seal =
              res.data[0].component_secondary_seal;
            this.data1.component_anti_rotation_device =
              res.data[0].component_anti_rotation_device;
            this.data1.component_gauge_pipe = res.data[0].component_gauge_pipe;
            this.data1.fei_last_inspected = moment(
              res.data[0].fei_last_inspected
            ).format("DD MMM YYYY");
            this.data1.fei_last_coated = moment(
              res.data[0].fei_last_coated
            ).format("DD MMM YYYY");
            this.data1.fei_last_cleaned = moment(
              res.data[0].fei_last_cleaned
            ).format("DD MMM YYYY");
            this.data1.fei_recommended_next = moment(
              res.data[0].fei_recommended_next
            ).format("DD MMM YYYY");
            this.data1.fii_last_inspected = moment(
              res.data[0].fii_last_inspected
            ).format("DD MMM YYYY");
            this.data1.fii_last_coated = moment(
              res.data[0].fii_last_coated
            ).format("DD MMM YYYY");
            this.data1.fii_last_cleaned = moment(
              res.data[0].fii_last_cleaned
            ).format("DD MMM YYYY");
            this.data1.fii_recommended_next = moment(
              res.data[0].fii_recommended_next
            ).format("DD MMM YYYY");
            this.data1.coating_ext_bottom = res.data[0].coating_ext_bottom;
            this.data1.coating_ext_shell = res.data[0].coating_ext_shell;
            this.data1.coating_ext_fixed_roof =
              res.data[0].coating_ext_fixed_roof;
            this.data1.coating_ext_floating_roof =
              res.data[0].coating_ext_floating_roof;
            this.data1.coating_int_bottom = res.data[0].coating_int_bottom;
            this.data1.coating_int_shell = res.data[0].coating_int_shell;
            this.data1.coating_int_fixed_roof =
              res.data[0].coating_int_fixed_roof;
            this.data1.coating_int_floating_roof =
              res.data[0].coating_int_floating_roof;
            this.data1.desc_cond_visual_finding =
              res.data[0].desc_cond_visual_finding;
            this.data1.misc_pressure = res.data[0].misc_pressure;
            this.data1.misc_temp = res.data[0].misc_temp;
            this.data1.misc_venting = res.data[0].misc_venting;
            this.data1.misc_flow_rate = res.data[0].misc_flow_rate;
            this.data1.misc_suction_line = res.data[0].misc_suction_line;
            this.data1.misc_receipt = res.data[0].misc_receipt;
            this.data1.installation_date = moment(
              res.data[0].installation_date
            ).format("DD MMM YYYY");
            this.data1.roof_type = res.data[0].roof_type;
            this.data1.applicable_status = res.data[0].applicable_status;
            this.data1.bottom_nominal_thk_mm =
              res.data[0].bottom_nominal_thk_mm;
            this.data1.annular_nominal_thk_mm =
              res.data[0].annular_nominal_thk_mm;
            this.data1.roof_nominal_thk_mm = res.data[0].roof_nominal_thk_mm;
            this.getImgTankInfo();
          }
        })
        .catch(error => {
          console.log(error);
        })
        .finally(() => {
          //this.isLoading = false;
          const temp = this.data1.inservice_date;
          this.data1.inservice_date = moment(temp).format("DD MMM YYYY");
        });
    },
    FETCH_EVAL_MRT() {
      const id_tag = this.$route.params.id_tag;
      const id_insp = this.id_inspection_record;
      axios({
        method: "post",
        url: "mrt/get-mrt",
        headers: {
          Authorization: "Bearer " + JSON.parse(localStorage.getItem("token"))
        },
        data: {
          id_tag: parseInt(id_tag),
          id_inspection_record: id_insp
        }
      })
        .then(res => {
          console.log("FETCH EVAL MRT :");
          //console.log(res);
          if (res.status == 200) {
            //console.log(res.data);
            this.data1.mrt = res.data;
            this.data1.mrt[0].an_tmin = this.data1.mrt[0].an_tmin.toFixed(2);
          }
        })
        .catch(error => {
          console.log(error);
        })
        .finally(() => {
          //this.isLoading = false;
        });
    },
    FETCH_SHELL_POINT() {
      const id_tag = this.$route.params.id_tag;
      const id_insp = this.id_inspection_record;
      axios({
        method: "post",
        url: "shell-settlement/get-shell-settlement",
        headers: {
          Authorization: "Bearer " + JSON.parse(localStorage.getItem("token"))
        },
        data: {
          id_tag: parseInt(id_tag),
          id_inspection_record: id_insp
        }
      })
        .then(res => {
          console.log("eval shell point:");
          //console.log(res);
          if (res.status == 200) {
            //console.log(res.data);
            this.data1.shell_settlement_point = res.data;
          }
        })
        .catch(error => {
          console.log(error);
        })
        .finally(() => {
          //this.isLoading = false;
        });
    },
    FETCH_SHELL_API() {
      const id_tag = this.$route.params.id_tag;
      const id_insp = this.id_inspection_record;
      axios({
        method: "post",
        url: "shell-settlement/get-shell-settlement-cal",
        headers: {
          Authorization: "Bearer " + JSON.parse(localStorage.getItem("token"))
        },
        data: {
          id_tag: parseInt(id_tag),
          id_inspection_record: id_insp
        }
      })
        .then(res => {
          console.log("eval shell api:");
          //console.log(res);
          if (res.status == 200) {
            //console.log(res.data);
            this.data1.shell_settlement_api = res.data;
            const temp = this.data1.shell_settlement_api;
            this.NUMBER_ROUNDING_SHELL_SETTLE_API(temp);
            this.data1.shell_settlement_api_sum.push(
              this.data1.shell_settlement_api[0]
            );
            this.data1.shell_settlement_api_sum[0].syy.toFixed(2);
            this.data1.shell_settlement_api_sum[0].r_2 = this.data1.shell_settlement_api_sum[0].r_2.toFixed(
              2
            );
            this.data1.shell_settlement_api_sum[0].sse = this.data1.shell_settlement_api_sum[0].sse.toFixed(
              2
            );
          }
        })
        .catch(error => {
          console.log(error);
        })
        .finally(() => {
          //this.isLoading = false;
        });
    },
    FETCH_EVAL_BUCKLING() {
      const id_tag = this.$route.params.id_tag;
      const id_insp = this.id_inspection_record;
      axios({
        method: "post",
        url: "buckling/get-buckling",
        headers: {
          Authorization: "Bearer " + JSON.parse(localStorage.getItem("token"))
        },
        data: {
          id_tag: id_tag,
          id_inspection_record: id_insp
        }
      })
        .then(res => {
          console.log("EVAL SHELL BUCKLING :");
          //console.log(res);
          if (res.status == 200) {
            //console.log(res.data);
            this.data1.shell_buckling = res.data;
          }
        })
        .catch(error => {
          console.log(error);
        })
        .finally(() => {
          //this.isLoading = false;
        });
    },
    FETCH_EVAL_DEVIATION() {
      const id_tag = this.$route.params.id_tag;
      const id_insp = this.id_inspection_record;
      axios({
        method: "post",
        url: "local-deviation/get-local-deviation",
        headers: {
          Authorization: "Bearer " + JSON.parse(localStorage.getItem("token"))
        },
        data: {
          id_tag: id_tag,
          id_inspection_record: id_insp
        }
      })
        .then(res => {
          console.log("EVAL LOCAL DEVIATION :");
          //console.log(res);
          if (res.status == 200) {
            //console.log(res.data);
            this.data1.local_deviation = res.data;
          }
        })
        .catch(error => {
          console.log(error);
        })
        .finally(() => {
          //this.isLoading = false;
        });
    },
    FETCH_EVAL_ROUNDNESS() {
      const id_tag = this.$route.params.id_tag;
      const id_insp = this.id_inspection_record;
      axios({
        method: "post",
        url: "roundness/get-roundness",
        headers: {
          Authorization: "Bearer " + JSON.parse(localStorage.getItem("token"))
        },
        data: {
          id_tag: id_tag,
          id_inspection_record: id_insp
        }
      })
        .then(res => {
          console.log("EVAL ROUNDNESS :");
          //console.log(res);
          if (res.status == 200) {
            //console.log(res.data);
            this.data1.roundness = res.data;
          }
        })
        .catch(error => {
          console.log(error);
        })
        .finally(() => {
          //this.isLoading = false;
        });
    },
    FETCH_EVAL_GROUNDING() {
      //const id_tag = this.$route.params.id_tag;
      const id_insp = this.id_inspection_record;
      axios({
        method: "post",
        url: "grounding-connection/grounding-connection-by-insp-id",
        headers: {
          Authorization: "Bearer " + JSON.parse(localStorage.getItem("token"))
        },
        data: {
          id_inspection_record: id_insp
        }
      })
        .then(res => {
          console.log("EVAL GROUNDING :");
          //console.log(res);
          if (res.status == 200) {
            //console.log(res.data);
            this.data1.grounding = res.data;
          }
        })
        .catch(error => {
          console.log(error);
        })
        .finally(() => {
          //this.isLoading = false;
        });
    },
    FETCH_EVAL_GROUNDING_DETAIL() {
      //const id_tag = this.$route.params.id_tag;
      const id_insp = this.id_inspection_record;
      axios({
        method: "post",
        url: "grounding-connection/grounding-connection-detail-by-insp-id",
        headers: {
          Authorization: "Bearer " + JSON.parse(localStorage.getItem("token"))
        },
        data: {
          id_inspection_record: id_insp
        }
      })
        .then(res => {
          console.log("EVAL GROUNDING DETAL :");
          //console.log(res);
          if (res.status == 200) {
            //console.log(res.data);
            this.data1.grounding_detail = res.data;
          }
        })
        .catch(error => {
          console.log(error);
        })
        .finally(() => {
          //this.isLoading = false;
        });
    },
    FETCH_PLUMBNESS() {
      const id_tag = this.$route.params.id_tag;
      const id_insp = this.id_inspection_record;
      axios({
        method: "post",
        url: "plumbness/get-plumbness",

        headers: {
          Authorization: "Bearer " + JSON.parse(localStorage.getItem("token"))
        },
        data: {
          id_tag: parseInt(id_tag),
          id_inspection_record: id_insp
        }
      })
        .then(res => {
          console.log("plumness:");
          //console.log(res);
          if (res.status == 200) {
            //console.log(res.data);
            this.data1.plumbness = res.data;
          }
        })
        .catch(error => {
          console.log(error);
        })
        .finally(() => {
          //this.isLoading = false;
        });
    },
    FETCH_BOTTOM_THK() {
      const id_tag = this.$route.params.id_tag;
      const id_insp = this.id_inspection_record;
      axios({
        method: "post",
        url: "bottom-thickness/bottom-thk-view-by-inspection-record-id",
        headers: {
          Authorization: "Bearer " + JSON.parse(localStorage.getItem("token"))
        },
        data: {
          id_tag: id_tag,
          id_inspection_record: id_insp
        }
      })
        .then(res => {
          console.log("BOTTOM THK:");
          //console.log(res);
          if (res.status == 200) {
            //console.log(res.data);
            this.data1.bottom_thk = res.data;
            const temp = this.data1.bottom_thk;
            this.DATE_FOR_BOTTOM_THK(temp);
            this.NUMBER_ROUNDING_BOTTOM_THK(temp);
          }
        })
        .catch(error => {
          console.log(error);
        })
        .finally(() => {
          //this.isLoading = false;
        });
    },
    FETCH_CRITICAL_THK() {
      const id_tag = this.$route.params.id_tag;
      const id_insp = this.id_inspection_record;
      axios({
        method: "post",
        url: "critical-thickness/critical-thk-view-by-inspection-record-id",
        headers: {
          Authorization: "Bearer " + JSON.parse(localStorage.getItem("token"))
        },
        data: {
          id_tag: id_tag,
          id_inspection_record: id_insp
        }
      })
        .then(res => {
          console.log("CRITICAL THK:");
          //console.log(res);
          if (res.status == 200) {
            //console.log(res.data);
            this.data1.critical_thk = res.data;
            const temp = this.data1.critical_thk;
            this.DATE_FOR_CRIT_ZONE(temp);
            this.NUMBER_ROUNDING_CRIT_ZONE(temp);
          }
        })
        .catch(error => {
          console.log(error);
        })
        .finally(() => {
          //this.isLoading = false;
        });
    },
    FETCH_ROOF_THK() {
      const id_tag = this.$route.params.id_tag;
      const id_insp = this.id_inspection_record;
      axios({
        method: "post",
        url: "roof-thickness/roof-thk-view-by-inspection-record-id",
        headers: {
          Authorization: "Bearer " + JSON.parse(localStorage.getItem("token"))
        },
        data: {
          id_tag: id_tag,
          id_inspection_record: id_insp
        }
      })
        .then(res => {
          console.log("ROOF THK:");
          //console.log(res);
          if (res.status == 200) {
            //console.log(res.data);
            this.data1.roof_thk = res.data;
            const s = this.data1.roof_thk;
            this.DATE_FOR_ROOF_THK(s);
            const obj = this.data1.roof_thk;
            this.NUMBER_ROUNDING_ROOF_THK(obj);
          }
        })
        .catch(error => {
          console.log(error);
        })
        .finally(() => {
          //this.isLoading = false;
        });
    },
    FETCH_ROOFNZ_THK() {
      const id_tag = this.$route.params.id_tag;
      const id_insp = this.id_inspection_record;
      axios({
        method: "post",
        url: "roofnz-thickness/roofnz-thk-view-by-inspection-record-id",
        headers: {
          Authorization: "Bearer " + JSON.parse(localStorage.getItem("token"))
        },
        data: {
          id_tag: id_tag,
          id_inspection_record: id_insp
        }
      })
        .then(res => {
          console.log("ROOFNZ THK:");
          //console.log(res);
          if (res.status == 200) {
            //console.log(res.data);
            this.data1.roofnz_thk = res.data;
            const s = this.data1.roofnz_thk;
            this.DATE_FOR_ROOFNZ_THK(s);
            const obj = this.data1.roofnz_thk;
            this.NUMBER_ROUNDING_ROOFNZ_THK(obj);
          }
        })
        .catch(error => {
          console.log(error);
        })
        .finally(() => {
          //this.isLoading = false;
        });
    },
    FETCH_SHELL_THK() {
      const id_tag = this.$route.params.id_tag;
      const id_insp = this.id_inspection_record;
      axios({
        method: "post",
        url: "shell-thickness/shell-thk-view-by-inspection-record-id",
        headers: {
          Authorization: "Bearer " + JSON.parse(localStorage.getItem("token"))
        },
        data: {
          id_tag: id_tag,
          id_inspection_record: id_insp
        }
      })
        .then(res => {
          console.log("SHELL THK:");
          //console.log(res);
          if (res.status == 200) {
            //console.log(res.data);
            this.data1.shell_thk = res.data;
            const s = this.data1.shell_thk;
            this.DATE_FOR_SHELL_THK(s);
          }
        })
        .catch(error => {
          console.log(error);
        })
        .finally(() => {
          //this.isLoading = false;
        });
    },
    FETCH_SHELLNZ_THK() {
      const id_tag = this.$route.params.id_tag;
      const id_insp = this.id_inspection_record;
      axios({
        method: "post",
        url: "shellnz-thickness/shellnz-thk-view-by-inspection-record-id",
        headers: {
          Authorization: "Bearer " + JSON.parse(localStorage.getItem("token"))
        },
        data: {
          id_tag: id_tag,
          id_inspection_record: id_insp
        }
      })
        .then(res => {
          console.log("SHELLNZ THK:");
          //console.log(res);
          if (res.status == 200) {
            //console.log(res.data);
            this.data1.shellnz_thk = res.data;
            this.NUMBER_ROUNDING_SHELLNZ_THK(this.data1.shellnz_thk);
            // const s = res.data.shell_thk;
            // this.DATE_FOR_DOCX(s);
          }
        })
        .catch(error => {
          console.log(error);
        })
        .finally(() => {
          //this.isLoading = false;
        });
    },
    FETCH_ANNULAR_THK() {
      const id_tag = this.$route.params.id_tag;
      const id_insp = this.id_inspection_record;
      axios({
        method: "post",
        url: "annular-thickness/annular-thk-view-by-inspection-record-id",
        headers: {
          Authorization: "Bearer " + JSON.parse(localStorage.getItem("token"))
        },
        data: {
          id_tag: id_tag,
          id_inspection_record: id_insp
        }
      })
        .then(res => {
          console.log("ANNULAR THK:");
          //console.log(res);
          if (res.status == 200) {
            //console.log(res.data);
            this.data1.annular_thk = res.data;
            this.NUMBER_ROUNDING_ANNULAR_THK(this.data1.annular_thk);
          }
        })
        .catch(error => {
          console.log(error);
        })
        .finally(() => {
          //this.isLoading = false;
        });
    },
    FETCH_MFLANNULAR_THK() {
      const id_insp = this.id_inspection_record;
      axios({
        method: "post",
        url: "mfl-annular-thickness/get-mfl-annular-data-by-insp-id",
        headers: {
          Authorization: "Bearer " + JSON.parse(localStorage.getItem("token"))
        },
        data: {
          id_inspection_record: id_insp
        }
      })
        .then(res => {
          console.log("MFL ANNULAR THK:");
          //console.log(res);
          if (res.status == 200) {
            //console.log(res.data);
            this.data1.mfl_annular = res.data;
            this.NUMBER_ROUNDING_MFLANNULAR_THK(this.data1.mfl_annular);
            // const s = res.data.shell_thk;
            // this.DATE_FOR_DOCX(s);
          }
        })
        .catch(error => {
          console.log(error);
        })
        .finally(() => {
          //this.isLoading = false;
        });
    },
    FETCH_MFLBOTTOM_THK() {
      const id_insp = this.id_inspection_record;
      axios({
        method: "post",
        url: "mfl-bottom-thickness/get-mfl-bottom-data-by-insp-id",
        headers: {
          Authorization: "Bearer " + JSON.parse(localStorage.getItem("token"))
        },
        data: {
          id_inspection_record: id_insp
        }
      })
        .then(res => {
          console.log("MFL BOTTOM THK:");
          //console.log(res);
          if (res.status == 200) {
            //console.log(res.data);
            this.data1.mfl_bottom = res.data;
            this.NUMBER_ROUNDING_MFLBOTTOM_THK(this.data1.mfl_bottom);
            // const s = res.data.shell_thk;
            // this.DATE_FOR_DOCX(s);
          }
        })
        .catch(error => {
          console.log(error);
        })
        .finally(() => {
          //this.isLoading = false;
        });
    },
    FETCH_PIPING_THK() {
      const id_tag = this.$route.params.id_tag;
      const id_insp = this.id_inspection_record;
      axios({
        method: "post",
        url: "piping-thickness/piping-thk-view-by-inspection-record-id",
        headers: {
          Authorization: "Bearer " + JSON.parse(localStorage.getItem("token"))
        },
        data: {
          id_tag: id_tag,
          id_inspection_record: id_insp
        }
      })
        .then(res => {
          console.log("PIPING THK:");
          //console.log(res);
          if (res.status == 200) {
            //console.log(res.data);
            this.data1.piping_thk = res.data;
            this.NUMBER_ROUNDING_PIPING_THK(this.data1.piping_thk);
            // const s = res.data.shell_thk;
            // this.DATE_FOR_DOCX(s);
          }
        })
        .catch(error => {
          console.log(error);
        })
        .finally(() => {
          //this.isLoading = false;
        });
    },
    FETCH_PROJECTION_PLATE_THK() {
      const id_tag = this.$route.params.id_tag;
      const id_insp = this.id_inspection_record;
      axios({
        method: "post",
        url:
          "projection-plate-thickness/projection-plate-thk-view-by-inspection-record-id",
        headers: {
          Authorization: "Bearer " + JSON.parse(localStorage.getItem("token"))
        },
        data: {
          id_tag: id_tag,
          id_inspection_record: id_insp
        }
      })
        .then(res => {
          console.log("PROJECTION THK:");
          //console.log(res);
          if (res.status == 200) {
            //console.log(res.data);
            this.data1.projection_thk = res.data;
            this.NUMBER_ROUNDING_PROJECTION_THK(this.data1.projection_thk);
            // const s = res.data.shell_thk;
            // this.DATE_FOR_DOCX(s);
          }
        })
        .catch(error => {
          console.log(error);
        })
        .finally(() => {
          //this.isLoading = false;
        });
    },
    FETCH_SUMP_THK() {
      const id_tag = this.$route.params.id_tag;
      const id_insp = this.id_inspection_record;
      axios({
        method: "post",
        url: "sump-thickness/sump-thk-view-by-inspection-record-id",
        headers: {
          Authorization: "Bearer " + JSON.parse(localStorage.getItem("token"))
        },
        data: {
          id_tag: id_tag,
          id_inspection_record: id_insp
        }
      })
        .then(res => {
          console.log("PIPING THK:");
          //console.log(res);
          if (res.status == 200) {
            //console.log(res.data);
            this.data1.sump_thk = res.data;
            this.NUMBER_ROUNDING_SUMP_THK(this.data1.sump_thk);
            // const s = res.data.shell_thk;
            // this.DATE_FOR_DOCX(s);
          }
        })
        .catch(error => {
          console.log(error);
        })
        .finally(() => {
          //this.isLoading = false;
        });
    },
    FETCH_COIL_THK() {
      const id_tag = this.$route.params.id_tag;
      const id_insp = this.id_inspection_record;
      axios({
        method: "post",
        url: "coil-thickness/coil-thk-view-by-inspection-record-id",
        headers: {
          Authorization: "Bearer " + JSON.parse(localStorage.getItem("token"))
        },
        data: {
          id_tag: id_tag,
          id_inspection_record: id_insp
        }
      })
        .then(res => {
          console.log("PIPING THK:");
          //console.log(res);
          if (res.status == 200) {
            //console.log(res.data);
            this.data1.coil_thk = res.data;
            this.NUMBER_ROUNDING_COIL_THK(this.data1.coil_thk);
            // const s = res.data.shell_thk;
            // this.DATE_FOR_DOCX(s);
          }
        })
        .catch(error => {
          console.log(error);
        })
        .finally(() => {
          //this.isLoading = false;
        });
    },
    FETCH_SHELL_COURSE() {
      const id_tag = this.$route.params.id_tag;
      axios({
        method: "post",
        url: "tank-course/tank-course-by-tank-id",
        headers: {
          Authorization: "Bearer " + JSON.parse(localStorage.getItem("token"))
        },
        data: {
          id_tag: id_tag
        }
      })
        .then(res => {
          console.log("SHELL COURSE:");
          //console.log(res);
          if (res.status == 200) {
            //console.log(res.data);
            this.data1.shell_course = res.data;
          }
        })
        .catch(error => {
          console.log(error);
        })
        .finally(() => {
          //this.isLoading = false;
        });
    },
    FETCH_TANK_COURSE() {
      const id_tag = this.$route.params.id_tag;
      axios({
        method: "post",
        url: "tank-course/tank-course-for-report-by-tank-id",
        headers: {
          Authorization: "Bearer " + JSON.parse(localStorage.getItem("token"))
        },
        data: {
          id_tag: id_tag
        }
      })
        .then(res => {
          console.log("TANK COURSE:");
          //console.log(res);
          if (res.status == 200) {
            //console.log(res.data);
            this.data1.tank_course = res.data;
            this.NUMBER_ROUNDING_TANK_COURSE(this.data1.tank_course);
          }
        })
        .catch(error => {
          console.log(error);
        })
        .finally(() => {
          //this.isLoading = false;
        });
    },
    FETCH_GRAPH_IMG() {
      axios({
        method: "get",
        url:
          "chart-image-file/get-chart-image-file-by-ir-id?id=" +
          this.id_inspection_record,
        headers: {
          Authorization: "Bearer " + JSON.parse(localStorage.getItem("token"))
        },
        data: {}
      })
        .then(res => {
          console.log("FETCH GRAPH :");
          //console.log(res.data);
          if (res.status == 200 && res.data) {
            this.graph = res.data;
            console.log(this.graph);
            this.getImgGraph();
          }
        })
        .catch(error => {
          console.log(error);
        })
        .finally(() => {
          //this.isLoading = false;
        });
    },
    FETCH_REPAIR_RECORD() {
      axios({
        method: "get",
        url:
          "repair-record/get-repair-record-by-ir-id?id_inspection_record=" +
          this.id_inspection_record,
        headers: {
          Authorization: "Bearer " + JSON.parse(localStorage.getItem("token"))
        },
        data: {}
      })
        .then(res => {
          console.log("repair record:");
          console.log(res.data);
          if (res.status == 200) {
            this.repairList = res.data;
            this.getImgRepair();
          }
        })
        .catch(error => {
          console.log(error);
        })
        .finally(() => {
          //this.isLoading = false;
        });
    },
    FETCH_ACCPT() {
      //console.log("==> FETCH: Acceptance Determination");
      //this.isLoading = true;
      const id_tag = this.$route.params.id_tag;
      axios({
        method: "post",
        url: "shell-settlement/get-shell-settlement-accept",
        headers: {
          Authorization: "Bearer " + JSON.parse(localStorage.getItem("token"))
        },
        data: {
          id_tag: id_tag,
          id_inspection_record: this.id_inspection_record
        }
      })
        .then(res => {
          console.log("FETCH ACCEPTANCE: ");
          //console.log(res.data[0]);
          if (res.status == 200 && res.data) {
            //console.log("==> SUCCESS: Acceptance Determination");
            this.data1.accept = res.data;
            this.NUMBER_ROUNDING_ACCEPT(this.data1.accept[0]);
          }
        })
        .catch(error => {
          console.log(error);
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
    VIEW_ITEM(item) {
      this.isLoading = true;
      console.clear();
      this.current_view = item;
      console.log("records:");
      console.log(item);
      console.log("view item insp id :" + item.id_inspection_record);
      this.id_inspection_record = item.id_inspection_record;
      this.data1.insp_campaign = item.campaign_desc;
      this.data1.insp_date = moment(item.inspection_date).format(
        "MMM DD, YYYY"
      );
      this.data1.name_api_653 = item.name_api_653;
      this.data1.name_inspection_engineer = item.name_inspection_engineer;
      this.data1.name_ndt_examiner = item.name_ndt_examiner;
      this.data1.cert_no = item.cert_no;

      this.FETCH_MARKUP_ANNULAR(this.current_view);
      this.FETCH_MARKUP_BOTTOM(this.current_view);
      this.FETCH_MARKUP_COIL(this.current_view);
      this.FETCH_MARKUP_CRITICAL_ZONE(this.current_view);
      this.FETCH_MARKUP_PIPING(this.current_view);
      this.FETCH_MARKUP_ROOF(this.current_view);
      this.FETCH_MARKUP_ROOFNZ(this.current_view);
      this.FETCH_MARKUP_SUMP(this.current_view);
      this.FETCH_MARKUP_SHELL(this.current_view);
      this.FETCH_MARKUP_SHELLNZ(this.current_view);
      this.FETCH_MARKUP_PROJECTION_PLATE(this.current_view);
      this.FETCH_IMAGE();
      this.FETCH_CHECKLIST_ILAST_EX();
      this.FETCH_CHECKLIST_GENERIC();
      this.FETCH_TANK_INFO();
      this.FETCH_SHELL_POINT();
      this.FETCH_SHELL_API();
      this.FETCH_TANK_COURSE();
      this.FETCH_BOTTOM_THK();
      this.FETCH_PLUMBNESS();
      this.FETCH_CRITICAL_THK();
      this.FETCH_ROOF_THK();
      this.FETCH_ROOFNZ_THK();
      this.FETCH_SHELL_COURSE();
      this.FETCH_SHELL_THK();
      this.FETCH_ANNULAR_THK();
      this.FETCH_SHELLNZ_THK();
      this.FETCH_COIL_THK();
      this.FETCH_MFLANNULAR_THK();
      this.FETCH_MFLBOTTOM_THK();
      this.FETCH_SUMP_THK();
      this.FETCH_PROJECTION_PLATE_THK();
      this.FETCH_PIPING_THK();
      this.FETCH_GRAPH_IMG();
      this.FETCH_EVAL_MRT();
      this.FETCH_EVAL_BUCKLING();
      this.FETCH_EVAL_DEVIATION();
      this.FETCH_EVAL_ROUNDNESS();
      this.FETCH_EVAL_GROUNDING();
      this.FETCH_EVAL_GROUNDING_DETAIL();
      this.FETCH_REPAIR_RECORD();
      this.FETCH_ACCPT(); //FETCH_ACCPT need to be last api, loading screen flag is in here
    },
    SHOW_HIDE_PANEL() {
      this.pagePanelHiding = !this.pagePanelHiding;
    },
    readFile(e) {
      console.log("readFile");
      console.log(e);
      let reader = new FileReader();

      reader.readAsDataURL(e);
      reader.onload = () => {
        return reader.result;
      };
    },
    FETCH_IMAGE() {
      const id_insp = this.id_inspection_record;
      axios({
        method: "post",
        url: "visual-report/layout-visual-report-by-insp-id",
        headers: {
          Authorization: "Bearer " + JSON.parse(localStorage.getItem("token"))
        },
        data: {
          id_inspection_record: id_insp
        }
      })
        .then(res => {
          //console.log("GET IMAGE");
          //console.log(res.data);
          if (res.status == 200 && res.data) {
            this.imgpath = res.data;
          }
        })
        .catch(error => {
          console.log(error);
        })
        .finally(() => {
          //this.isLoading = false;
          // console.log("image:");
          // console.log(this.imgpath);
          this.getImageData();
        });
    },
    alertTimeOUT() {
      this.isLoading = false;
      this.$ons.notification.alert(
        "Something went wrong ! Please try again later"
      );
    },
    async getImageData() {
      console.log("create image obj:");
      //const imagePath = "https://localhost:5001/wwwroot/attach/visual_report/MicrosoftTeams-image%20(28).png";
      const o = this.imgpath;
      //console.log(encodeURI(this.baseURL + o[1].file_path_2));

      for (let j = 0; j < o.length; j++) {
        const response = await fetch(
          encodeURI(this.baseURL + o[j].file_path_1)
        );

        const imageData = await response.arrayBuffer();
        const mimeType = response.headers.get("content-type");
        const imageBlob = new Blob([imageData], { type: mimeType });
        const imageObject = {
          _type: "image",
          source: imageBlob,
          format: mimeType,
          width: 300,
          height: 200
        };
        const response2 = await fetch(
          encodeURI(this.baseURL + o[j].file_path_2)
        );
        const imageData2 = await response2.arrayBuffer();
        const imageBlob2 = new Blob([imageData2], { type: mimeType });
        const imageObject2 = {
          _type: "image",
          source: imageBlob2,
          format: mimeType,
          width: 300,
          height: 200
        };
        this.data1.picture_log.push({
          overview_pic: imageObject,
          close_up_view_pic: imageObject2,
          findings: o[j].finding,
          recommendation: o[j].recommendation
        });
      }
    },
    async getImgRepair() {
      const o = this.repairList;
      for (let j = 0; j < o.length; j++) {
        const response = await fetch(encodeURI(this.baseURL + o[j].file_path));
        const imageData = await response.arrayBuffer();
        const mimeType = response.headers.get("content-type");
        const imageBlob = new Blob([imageData], { type: mimeType });
        const imageObject = {
          _type: "image",
          source: imageBlob,
          format: mimeType,
          width: 500,
          height: 300
        };
        this.data1.repair.push({
          img: imageObject,
          part: o[j].part,
          recommendation: o[j].recommendation
        });
      }
      this.data1.repair.shift();
    },
    async getImgDWG_Annular() {
      const o = this.drawingList.annular;
      for (let j = 0; j < o.length; j++) {
        const response = await fetch(encodeURI(this.baseURL + o[j].file_path));
        const imageData = await response.arrayBuffer();
        const mimeType = response.headers.get("content-type");
        const imageBlob = new Blob([imageData], { type: mimeType });
        const imageObject = {
          _type: "image",
          source: imageBlob,
          format: mimeType,
          width: 600,
          height: 400
        };
        this.data1.annular.push({
          marked_up_drawing: imageObject
        });
      }
    },
    async getImgDWG_Bottom() {
      const o = this.drawingList.bottom;
      for (let j = 0; j < o.length; j++) {
        const response = await fetch(encodeURI(this.baseURL + o[j].file_path));
        const imageData = await response.arrayBuffer();
        const mimeType = response.headers.get("content-type");
        const imageBlob = new Blob([imageData], { type: mimeType });
        const imageObject = {
          _type: "image",
          source: imageBlob,
          format: mimeType,
          width: 600,
          height: 400
        };
        this.data1.bottom.push({
          marked_up_drawing: imageObject
        });
      }
    },
    async getImgDWG_Coil() {
      const o = this.drawingList.coil;
      for (let j = 0; j < o.length; j++) {
        const response = await fetch(encodeURI(this.baseURL + o[j].file_path));
        const imageData = await response.arrayBuffer();
        const mimeType = response.headers.get("content-type");
        const imageBlob = new Blob([imageData], { type: mimeType });
        const imageObject = {
          _type: "image",
          source: imageBlob,
          format: mimeType,
          width: 600,
          height: 400
        };
        this.data1.coil.push({
          marked_up_drawing: imageObject
        });
      }
    },
    async getImgDWG_Critical_zone() {
      const o = this.drawingList.critical_zone;
      for (let j = 0; j < o.length; j++) {
        const response = await fetch(encodeURI(this.baseURL + o[j].file_path));
        const imageData = await response.arrayBuffer();
        const mimeType = response.headers.get("content-type");
        const imageBlob = new Blob([imageData], { type: mimeType });
        const imageObject = {
          _type: "image",
          source: imageBlob,
          format: mimeType,
          width: 600,
          height: 400
        };
        this.data1.critical_zone.push({
          marked_up_drawing: imageObject
        });
      }
    },
    async getImgDWG_Piping() {
      const o = this.drawingList.piping;
      for (let j = 0; j < o.length; j++) {
        const response = await fetch(encodeURI(this.baseURL + o[j].file_path));
        const imageData = await response.arrayBuffer();
        const mimeType = response.headers.get("content-type");
        const imageBlob = new Blob([imageData], { type: mimeType });
        const imageObject = {
          _type: "image",
          source: imageBlob,
          format: mimeType,
          width: 600,
          height: 400
        };
        this.data1.piping.push({
          marked_up_drawing: imageObject
        });
      }
    },
    async getImgDWG_Roof() {
      const o = this.drawingList.roof;
      for (let j = 0; j < o.length; j++) {
        const response = await fetch(encodeURI(this.baseURL + o[j].file_path));
        const imageData = await response.arrayBuffer();
        const mimeType = response.headers.get("content-type");
        const imageBlob = new Blob([imageData], { type: mimeType });
        const imageObject = {
          _type: "image",
          source: imageBlob,
          format: mimeType,
          width: 600,
          height: 400
        };
        this.data1.roof.push({
          marked_up_drawing: imageObject
        });
      }
    },
    async getImgDWG_Roofnz() {
      const o = this.drawingList.roof_nozzle;
      for (let j = 0; j < o.length; j++) {
        const response = await fetch(encodeURI(this.baseURL + o[j].file_path));
        const imageData = await response.arrayBuffer();
        const mimeType = response.headers.get("content-type");
        const imageBlob = new Blob([imageData], { type: mimeType });
        const imageObject = {
          _type: "image",
          source: imageBlob,
          format: mimeType,
          width: 600,
          height: 400
        };
        this.data1.roof_nozzle.push({
          marked_up_drawing: imageObject
        });
      }
    },
    async getImgDWG_Sump() {
      const o = this.drawingList.sump;
      for (let j = 0; j < o.length; j++) {
        const response = await fetch(encodeURI(this.baseURL + o[j].file_path));
        const imageData = await response.arrayBuffer();
        const mimeType = response.headers.get("content-type");
        const imageBlob = new Blob([imageData], { type: mimeType });
        const imageObject = {
          _type: "image",
          source: imageBlob,
          format: mimeType,
          width: 600,
          height: 400
        };
        this.data1.sump.push({
          marked_up_drawing: imageObject
        });
      }
    },
    async getImgDWG_Shell() {
      const o = this.drawingList.shell;
      for (let j = 0; j < o.length; j++) {
        const response = await fetch(encodeURI(this.baseURL + o[j].file_path));
        const imageData = await response.arrayBuffer();
        const mimeType = response.headers.get("content-type");
        const imageBlob = new Blob([imageData], { type: mimeType });
        const imageObject = {
          _type: "image",
          source: imageBlob,
          format: mimeType,
          width: 600,
          height: 400
        };
        this.data1.shell.push({
          marked_up_drawing: imageObject
        });
      }
    },
    async getImgDWG_Shellnz() {
      const o = this.drawingList.shell_nozzle;
      for (let j = 0; j < o.length; j++) {
        const response = await fetch(encodeURI(this.baseURL + o[j].file_path));
        const imageData = await response.arrayBuffer();
        const mimeType = response.headers.get("content-type");
        const imageBlob = new Blob([imageData], { type: mimeType });
        const imageObject = {
          _type: "image",
          source: imageBlob,
          format: mimeType,
          width: 600,
          height: 400
        };
        this.data1.shell_nozzle.push({
          marked_up_drawing: imageObject
        });
      }
    },
    async getImgDWG_Projection_plate() {
      const o = this.drawingList.projection_plate;
      for (let j = 0; j < o.length; j++) {
        const response = await fetch(encodeURI(this.baseURL + o[j].file_path));
        const imageData = await response.arrayBuffer();
        const mimeType = response.headers.get("content-type");
        const imageBlob = new Blob([imageData], { type: mimeType });
        const imageObject = {
          _type: "image",
          source: imageBlob,
          format: mimeType,
          width: 600,
          height: 400
        };
        this.data1.projection_plate.push({
          marked_up_drawing: imageObject
        });
      }
    },
    async getImgGraph() {
      const o = this.graph;
      // console.log(o)
      if (o.length != 0) {
        console.warn("graph image");
        for (let j = 0; j < o.length; j++) {
          if (o[j].type == "shell_settlement_1") {
            const response = await fetch(
              encodeURI(this.baseURL + o[j].file_path)
            );
            const imageData = await response.arrayBuffer();
            const mimeType = response.headers.get("content-type");
            const imageBlob = new Blob([imageData], { type: mimeType });
            const imageObject = {
              _type: "image",
              source: imageBlob,
              format: mimeType,
              width: 600,
              height: 300
            };
            this.data1.shell_settlement_1 = imageObject;
          }
          if (o[j].type == "shell_settlement_2") {
            const response = await fetch(
              encodeURI(this.baseURL + o[j].file_path)
            );
            const imageData = await response.arrayBuffer();
            const mimeType = response.headers.get("content-type");
            const imageBlob = new Blob([imageData], { type: mimeType });
            const imageObject = {
              _type: "image",
              source: imageBlob,
              format: mimeType,
              width: 600,
              height: 300
            };
            this.data1.shell_settlement_2 = imageObject;
          }
          if (o[j].type == "shell_roundness") {
            const response = await fetch(
              encodeURI(this.baseURL + o[j].file_path)
            );
            const imageData = await response.arrayBuffer();
            const mimeType = response.headers.get("content-type");
            const imageBlob = new Blob([imageData], { type: mimeType });
            const imageObject = {
              _type: "image",
              source: imageBlob,
              format: mimeType,
              width: 600,
              height: 300
            };
            this.data1.shell_roundness = imageObject;
          }
          if (o[j].type == "bottom_settlement") {
            const response = await fetch(
              encodeURI(this.baseURL + o[j].file_path)
            );
            const imageData = await response.arrayBuffer();
            const mimeType = response.headers.get("content-type");
            const imageBlob = new Blob([imageData], { type: mimeType });
            const imageObject = {
              _type: "image",
              source: imageBlob,
              format: mimeType,
              width: 600,
              height: 400
            };
            this.data1.bottom_settlement = imageObject;
          }
        }
      }
    },
    async getImgTankInfo() {
      if (this.data1.overview_img_path != null) {
        console.warn("TANK IMAGE");
        const response = await fetch(
          encodeURI(this.baseURL + this.data1.overview_img_path)
        );
        const imageData = await response.arrayBuffer();
        const mimeType = response.headers.get("content-type");
        const imageBlob = new Blob([imageData], { type: mimeType });
        const imageObject = {
          _type: "image",
          source: imageBlob,
          format: mimeType,
          width: 200,
          height: 200
        };
        this.data1.overview_pic = imageObject;
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.page-container {
  width: 100%;
  height: 100%;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 201px calc(100% - 201px);
}

.list-page {
  position: relative;
  overflow-y: auto;
  .list {
    margin: -20px -20px 20px -20px;
  }
  .content {
    width: 100%;
    // width: calc(100% - 20px);
    // display: grid;
    // grid-template-columns: 600px calc(100% - 600px);
    // grid-gap: 20px;
    display: block;
  }
}
.tab-wrapper {
  height: 48px;
  margin: -20px -20px 20px -20px;
}
.vue-tabs-chrome {
  padding-top: 10px;
  background-color: #d9d9d9;
  font-size: 12px;
  font-weight: 500;
}
.value-content {
  margin-top: 20px;
  overflow: auto;
  height: 110px;
  width: 100%;
  white-space: pre-wrap;
}
#ilast {
  background-color: #f6f6f6;
  border: 1px solid #303030;
  i {
    color: #303030;
  }
  span {
    color: #303030;
  }
}
#ilast:hover,
#ilast:active {
  background-color: #140a4b;
  i {
    color: #ffffff;
  }
  span {
    color: #ffffff;
  }
}
</style>

