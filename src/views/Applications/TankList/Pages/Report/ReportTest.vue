<template>
  <div class="page-container">
    <!-- <InspectionRecordPanel @showHidePanel="SHOW_HIDE_PANEL" @viewItem="VIEW_ITEM" /> -->
    <button type="button" v-on:click="createDocx()">Create docx</button>
  </div>
</template>
<script>
//import { TemplateHandler } from "easy-template-x";
//import { createResolver } from "easy-template-x-angular-expressions";
import axios from "/axios.js";
//import InspectionRecordPanel from "@/views/Applications/TankList/Pages/inspection-record-panel.vue";
//import { saveAs } from "@progress/kendo-file-saver";

export default {
  name: "report-test",

  components: {
    //InspectionRecordPanel
  },
  created() {
    if (this.$store.state.status.server == true) {
      this.FETCH_CHECKLIST_ILAST_EX();
      this.getImageData();
      this.FETCH_TANK_INFO();
      this.FETCH_SHELL_POINT();
      this.FETCH_SHELL_API();
      this.FETCH_BOTTOM_THK();
      this.FETCH_PLUMBNESS();
      this.FETCH_CRITICAL_THK();
      this.FETCH_ROOF_THK();
      this.FETCH_ROOFNZ_THK();
      this.FETCH_SHELL_COURSE();
      this.FETCH_SHELL_THK();
      console.log("data:");
      console.log(this.data1);
    }
  },
  data() {
    return {
      theTemplate: null,

      buffer: "",
      status: "",
      data1: [
        {
          suitability: [],
          shell_settlement_point: [],
          shell_settlement_api: [],
          plumbness: [],
          bottom_thk: [],
          critical_thk: [],
          shell_course: [{}],
          shell_thk: [],
          roof_thk: [],
          roofnz_thk: [],
          checklist: [],
          picture_log: [{}]
        }
      ]
    };
  },
  computed: {},
  methods: {
    async getTemplate() {
      if (this.theTemplate) return this.theTemplate;
      const request = await fetch(
        "/report_template/Inspection Report Template.docx"
      );
      console.log(request);
      this.theTemplate = await request.blob();
    },

    async createDocx() {
      console.log(this.data1);
      // try {
      //   this.status = "";

      //   // 1. read template file
      //   this.status = "Getting the template...";
      //   const templateFile = await this.getTemplate();
      //   console.log(templateFile);
      //   console.log("1");

      //   // 2. read json data
      //   this.status = "Parsing data...";
      //   // const jsonData = this.data1;
      //   // const data = JSON.parse(jsonData);
      //   const data = this.data1;
      //   console.log("2");

      //   // 3. process the template
      //   this.status = "Creating document...";
      //   const handler = new TemplateHandler();
      //   console.log("3.1");
      //   const docx = await handler.process(this.theTemplate, data);
      //   console.log("3.2");

      //   // 4. save output
      //   this.status = "Done!";
      //   this.saveFile("result.docx", docx);
      //   console.log("4");

      //   setTimeout(() => (this.status = ""), 1000);
      // } catch (e) {
      //   // error handling
      //   this.status = "Error: " + e.message;
      //   console.error(e);
      // }
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

    FETCH_CHECKLIST_ILAST_EX() {
      axios({
        method: "post",
        url: "chk-ilast-ex/get-chkilastex-by-insp-id",
        headers: {
          Authorization: "Bearer " + JSON.parse(localStorage.getItem("token"))
        },
        data: {
          id_insp_record: 18
        }
      })
        .then(res => {
          console.log("checklist ilast ex:");
          console.log(res);
          if (res.status == 200 && res.data) {
            console.log(res.data);
            this.data1.checklist = res.data;
          }
        })
        .catch(error => {
          console.log(error);
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
    FETCH_TANK_INFO() {
      const id_tag = this.$route.params.id_tag;

      console.log("id_tag (fetch_tank):" + id_tag);
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
          console.log(res);
          if (res.status == 200 && res.data) {
            console.log(res.data);
            this.data1 = res.data;
          }
        })
        .catch(error => {
          console.log(error);
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
    FETCH_SHELL_POINT() {
      const id_tag = this.$route.params.id_tag;
      axios({
        method: "post",
        url: "shell-settlement/get-shell-settlement",
        headers: {
          Authorization: "Bearer " + JSON.parse(localStorage.getItem("token"))
        },
        data: {
          id_tag: parseInt(id_tag),
          id_inspection_record: 18
        }
      })
        .then(res => {
          console.log("eval shell point:");
          console.log(res);
          if (res.status == 200 && res.data) {
            console.log(res.data);
            this.data1.shell_settlement_point = res.data;
          }
        })
        .catch(error => {
          console.log(error);
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
    FETCH_SHELL_API() {
      const id_tag = this.$route.params.id_tag;
      axios({
        method: "post",
        url: "shell-settlement/get-shell-settlement-cal",

        headers: {
          Authorization: "Bearer " + JSON.parse(localStorage.getItem("token"))
        },
        data: {
          id_tag: parseInt(id_tag),
          id_inspection_record: 18
        }
      })
        .then(res => {
          console.log("eval shell api:");
          console.log(res);
          if (res.status == 200 && res.data) {
            console.log(res.data);
            this.data1.shell_settlement_api = res.data;
          }
        })
        .catch(error => {
          console.log(error);
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
    FETCH_PLUMBNESS() {
      const id_tag = this.$route.params.id_tag;
      axios({
        method: "post",
        url: "plumbness/get-plumbness",

        headers: {
          Authorization: "Bearer " + JSON.parse(localStorage.getItem("token"))
        },
        data: {
          id_tag: parseInt(id_tag),
          id_inspection_record: 18
        }
      })
        .then(res => {
          console.log("plumness:");
          console.log(res);
          if (res.status == 200 && res.data) {
            console.log(res.data);
            this.data1.plumbness = res.data;
          }
        })
        .catch(error => {
          console.log(error);
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
    FETCH_BOTTOM_THK() {
      const id_tag = this.$route.params.id_tag;
      axios({
        method: "post",
        url: "bottom-thickness/bottom-thk-view-by-inspection-record-id",
        headers: {
          Authorization: "Bearer " + JSON.parse(localStorage.getItem("token"))
        },
        data: {
          id_tag: id_tag,
          id_inspection_record: 11
        }
      })
        .then(res => {
          console.log("BOTTOM THK:");
          console.log(res);
          if (res.status == 200 && res.data) {
            console.log(res.data);
            this.data1.bottom_thk = res.data;
          }
        })
        .catch(error => {
          console.log(error);
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
    FETCH_CRITICAL_THK() {
      const id_tag = this.$route.params.id_tag;
      axios({
        method: "post",
        url: "critical-thickness/critical-thk-view-by-inspection-record-id",
        headers: {
          Authorization: "Bearer " + JSON.parse(localStorage.getItem("token"))
        },
        data: {
          id_tag: id_tag,
          id_inspection_record: 11
        }
      })
        .then(res => {
          console.log("CRITICAL THK:");
          console.log(res);
          if (res.status == 200 && res.data) {
            console.log(res.data);
            this.data1.critical_thk = res.data;
          }
        })
        .catch(error => {
          console.log(error);
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
    FETCH_ROOF_THK() {
      const id_tag = this.$route.params.id_tag;
      axios({
        method: "post",
        url: "roof-thickness/roof-thk-view-by-inspection-record-id",
        headers: {
          Authorization: "Bearer " + JSON.parse(localStorage.getItem("token"))
        },
        data: {
          id_tag: id_tag,
          id_inspection_record: 11
        }
      })
        .then(res => {
          console.log("ROOF THK:");
          console.log(res);
          if (res.status == 200 && res.data) {
            console.log(res.data);
            this.data1.roof_thk = res.data;
          }
        })
        .catch(error => {
          console.log(error);
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
    FETCH_ROOFNZ_THK() {
      const id_tag = this.$route.params.id_tag;
      axios({
        method: "post",
        url: "roofnz-thickness/roofnz-thk-view-by-inspection-record-id",
        headers: {
          Authorization: "Bearer " + JSON.parse(localStorage.getItem("token"))
        },
        data: {
          id_tag: id_tag,
          id_inspection_record: 11
        }
      })
        .then(res => {
          console.log("ROOFNZ THK:");
          console.log(res);
          if (res.status == 200 && res.data) {
            console.log(res.data);
            this.data1.roofnz_thk = res.data;
          }
        })
        .catch(error => {
          console.log(error);
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
    FETCH_SHELL_THK() {
      const id_tag = this.$route.params.id_tag;
      axios({
        method: "post",
        url: "shell-thickness/shell-thk-view-by-inspection-record-id",
        headers: {
          Authorization: "Bearer " + JSON.parse(localStorage.getItem("token"))
        },
        data: {
          id_tag: id_tag,
          id_inspection_record: 11
        }
      })
        .then(res => {
          console.log("SHELL THK:");
          console.log(res);
          if (res.status == 200 && res.data) {
            console.log(res.data);
            this.data1.shell_thk = res.data;
          }
        })
        .catch(error => {
          console.log(error);
        })
        .finally(() => {
          this.isLoading = false;
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
          console.log("SHELL THK:");
          console.log(res);
          if (res.status == 200 && res.data) {
            console.log(res.data);
            this.data1.shell_course = res.data;
          }
        })
        .catch(error => {
          console.log(error);
        })
        .finally(() => {
          this.isLoading = false;
        });
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

    async getImageData() {
      console.log("in");
      const imagePath =
        "https://localhost:5001/wwwroot/attach/visual_report/MicrosoftTeams-image%20(28).png";
      const response = await fetch(imagePath);
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
      console.log(imageObject);
      this.data1.picture_log[0].findings = "Testtttttttttttttt";
      this.data1.picture_log[0].overview_pic = imageObject;
      //return imageObject;
    }
  }
};
</script>


