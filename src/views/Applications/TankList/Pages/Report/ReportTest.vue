<template>
  <div class="page-container">
    <button type="button" v-on:click="createDocx()">Create docx</button>
  </div>
</template>
<script>
import { TemplateHandler } from "easy-template-x";
//import { createResolver } from "easy-template-x-angular-expressions";
import axios from "/axios.js";
//import { saveAs } from "@progress/kendo-file-saver";

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
      buffer: "",
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
          { location: 9, cumulative: 5009, relative_level: 3009 }
        ],
        checklist: "",
        picture_log: [
          {
            findings: "testttttttttttt",
            overview_pic: this.getImageData()
          }
        ]
      }
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
    // saveImage() {
    //   const base64Image =
    //     "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAApgAAAKYB3X3/OAAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAANCSURBVEiJtZZPbBtFFMZ/M7ubXdtdb1xSFyeilBapySVU8h8OoFaooFSqiihIVIpQBKci6KEg9Q6H9kovIHoCIVQJJCKE1ENFjnAgcaSGC6rEnxBwA04Tx43t2FnvDAfjkNibxgHxnWb2e/u992bee7tCa00YFsffekFY+nUzFtjW0LrvjRXrCDIAaPLlW0nHL0SsZtVoaF98mLrx3pdhOqLtYPHChahZcYYO7KvPFxvRl5XPp1sN3adWiD1ZAqD6XYK1b/dvE5IWryTt2udLFedwc1+9kLp+vbbpoDh+6TklxBeAi9TL0taeWpdmZzQDry0AcO+jQ12RyohqqoYoo8RDwJrU+qXkjWtfi8Xxt58BdQuwQs9qC/afLwCw8tnQbqYAPsgxE1S6F3EAIXux2oQFKm0ihMsOF71dHYx+f3NND68ghCu1YIoePPQN1pGRABkJ6Bus96CutRZMydTl+TvuiRW1m3n0eDl0vRPcEysqdXn+jsQPsrHMquGeXEaY4Yk4wxWcY5V/9scqOMOVUFthatyTy8QyqwZ+kDURKoMWxNKr2EeqVKcTNOajqKoBgOE28U4tdQl5p5bwCw7BWquaZSzAPlwjlithJtp3pTImSqQRrb2Z8PHGigD4RZuNX6JYj6wj7O4TFLbCO/Mn/m8R+h6rYSUb3ekokRY6f/YukArN979jcW+V/S8g0eT/N3VN3kTqWbQ428m9/8k0P/1aIhF36PccEl6EhOcAUCrXKZXXWS3XKd2vc/TRBG9O5ELC17MmWubD2nKhUKZa26Ba2+D3P+4/MNCFwg59oWVeYhkzgN/JDR8deKBoD7Y+ljEjGZ0sosXVTvbc6RHirr2reNy1OXd6pJsQ+gqjk8VWFYmHrwBzW/n+uMPFiRwHB2I7ih8ciHFxIkd/3Omk5tCDV1t+2nNu5sxxpDFNx+huNhVT3/zMDz8usXC3ddaHBj1GHj/As08fwTS7Kt1HBTmyN29vdwAw+/wbwLVOJ3uAD1wi/dUH7Qei66PfyuRj4Ik9is+hglfbkbfR3cnZm7chlUWLdwmprtCohX4HUtlOcQjLYCu+fzGJH2QRKvP3UNz8bWk1qMxjGTOMThZ3kvgLI5AzFfo379UAAAAASUVORK5CYII=";
    //   const binaryImage = atob(base64Image);
    //   const arrayBuffer = new ArrayBuffer(binaryImage.length);
    //   const uint8Array = new Uint8Array(arrayBuffer);
    //   for (let i = 0; i < binaryImage.length; i++) {
    //     uint8Array[i] = binaryImage.charCodeAt(i);
    //   }
    //   file = new Blob([arrayBuffer], { type: "image/png" });
    //   saveAs(file, "image.png");
    //   return file;
    // },
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
          Authorization: "Bearer " + JSON.parse(localStorage.getItem("token"))
        },
        data: {
          id_insp_record: 17
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
    readFile(e) {
      console.log("readFile");
      console.log(e);
      let reader = new FileReader();

      reader.readAsDataURL(e);
      reader.onload = () => {
        return reader.result;
      };
    },
    // imageDataUrl(imageUrl) {
    //   return new Promise((resolve, reject) => {
    //     const xhr = new XMLHttpRequest();
    //     xhr.open("GET", imageUrl, true);
    //     xhr.responseType = "blob";
    //     xhr.onload = () => {
    //       if (xhr.status === 200) {
    //         const reader = new FileReader();
    //         reader.onload = () => {
    //           resolve(reader.result);
    //         };
    //         reader.readAsDataURL(xhr.response);
    //       } else {
    //         reject(new Error(`Failed to load image: ${imageUrl}`));
    //       }
    //     };
    //     xhr.send();
    //   });
    // },
    // renderedTemplate() {
    //   const template = `<html><head><title>{{title}}</title></head><body><h1>{{heading}}</h1><img src="{{imageDataUrl}}" alt="My Image"></body></html>`;
    //   const options = {
    //     template,
    //     data: {
    //       title: this.title,
    //       heading: this.heading,
    //       imageDataUrl: this.imageDataUrl
    //     }
    //   };
    //   console.log("aaa" + this.imageDataUrl);
    //   console.log(TemplateHandler.render(options));
    //   console.log("op:" + options);
    //   return TemplateHandler.render(options);
    // },
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
        format: mimeType.Png,
        width: 200,
        height: 200
      };
      console.log(imageObject);
      return imageObject;
    }
    // async convertURLtoFile(url) {
    //   // console.log("convertURLtoFile");
    //   // const response = await fetch(url);
    //   // //const data = await response.blob();
    //   // const buffer = await response.arrayBuffer();
    //   // //const base64Image = Buffer.from(buffer).toString("base64");
    //   // console.log(base64Image);
    //   // return `data:image/jpeg;base64,${base64Image}`;
    // }
  }
};
</script>


