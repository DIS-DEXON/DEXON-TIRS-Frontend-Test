<template>
  <div class="page-container">
    <button type="button" v-on:click="createDocx()">Create docx</button>
  </div>
</template>
<script>
import { TemplateHandler } from "easy-template-x";
//import { createResolver } from "easy-template-x-angular-expressions";
import axios from "/axios.js";

export default {
  name: "report-test",
  components: {},
  created() {
    if (this.$store.state.status.server == true) {
      this.FETCH_CHECKLIST_ILAST_EX();
    }
  },
  data() {
    return {
      theTemplate: null,
      status: "",
      data1: {
        tank_no: "T-001",
        company_name: "PTTLNG PLC",
        terminal: "Terminal 1",
        location: "Rayong, Thailand",
        insp_date: "Jan 01, 2023",
        header: "Tank Report Management",
        shell_settlement_point: [
          { location: 1, cumulative: 5001, relative_level: 3001 },
          { location: 2, cumulative: 5002, relative_level: 3002 },
          { location: 3, cumulative: 5003, relative_level: 3003 },
          { location: 4, cumulative: 5004, relative_level: 3004 },
          { location: 5, cumulative: 5005, relative_level: 3005 },
          { location: 6, cumulative: 5006, relative_level: 3006 },
          { location: 7, cumulative: 5007, relative_level: 3007 },
          { location: 8, cumulative: 5008, relative_level: 3008 },
          { location: 9, cumulative: 5009, relative_level: 3009 },
        ],
        checklist: "",
        picture_log: [
          {
            findings: "testttttttttttt",
            overview_pic: {
              source: this.convertURLtoFile(
                "https://localhost:5001/wwwroot/attach/visual_report/MicrosoftTeams-image%20(28).png"
              ),
            },
          },
        ],
      },
      // filename: "example.txt",
      // blob: new Blob(["example text"])
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
        const docx = await handler.process(this.theTemplate, data);
        console.log("3.2");

        // 4. save output
        this.status = "Done!";
        this.saveFile("result.docx", docx);
        console.log("4");

        setTimeout(() => (this.status = ""), 1000);
      } catch (e) {
        // error handling
        this.status = "Error: " + e.message;
        console.error(e);
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
    FETCH_CHECKLIST_ILAST_EX() {
      axios({
        method: "post",
        url: "chk-ilast-ex/get-chkilastex-by-insp-id",
        headers: {
          Authorization: "Bearer " + JSON.parse(localStorage.getItem("token")),
        },
        data: {
          id_insp_record: 17,
        },
      })
        .then((res) => {
          console.log("checklist ilast ex:");
          console.log(res);
          if (res.status == 200 && res.data) {
            console.log(res.data);
            this.data1.checklist = res.data;
          }
        })
        .catch((error) => {
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
    async convertURLtoFile(url) {
      console.log("convertURLtoFile");
      const response = await fetch(url);
      const data = await response.blob();
      // const filename = url.split("/").pop();
      // const metadata = { type: `image/jpeg` };
      console.log(data);
      // const file = new File([data]);
      // console.log(file);
      return data;
    },
  },
};
</script>


