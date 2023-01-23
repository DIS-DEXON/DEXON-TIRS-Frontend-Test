<template>
  <div class="page-container">
    <button type="button"  v-on:click="createDocx()">Create docx</button>
  </div>
</template>
<script>
import { TemplateHandler } from "easy-template-x";

export default {
  name: "report-test",
  components: {
  },
  created() {},
  data() {
    return {
      theTemplate: null,
      status: "",
      data1: {
              "Beers": [
                { "Brand": "Carlsberg", "Price": 1 },
                { "Brand": "Leaf Blonde", "Price": 2 },
                { "Brand": "Weihenstephan", "Price": 1.5 }
              ],
              "header": "Tank Report Management",
            },
      // filename: "example.txt",
      // blob: new Blob(["example text"])
    }
  },
  computed: {},
  methods: {
    async getTemplate() {
      if (this.theTemplate) return this.theTemplate;
      const request = await fetch("/report_template/template.docx");
      console.log(request);
      this.theTemplate = await request.blob();
    },
    async createDocx() {
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

        setTimeout(() => this.status = "", 1000);
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
    }
  },
};

</script>


