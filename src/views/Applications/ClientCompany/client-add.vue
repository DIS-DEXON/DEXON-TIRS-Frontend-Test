<template>
  <div class="popup-wrapper">
    <div class="popup-card">
      <div class="popup-header">
        <label>Create New Client</label>
      </div>
      <div class="popup-content form">
        <div class="form-item-container">
          <label class="section-text" style="grid-column: span 2; margin-top: 0"
            >Company Informations</label
          >
          <div class="input-set" style="grid-column: span 2">
            <div class="label-box">
              <p class="label">Company Name:</p>
              <span class="star-label"><i class="las la-asterisk"></i></span>
            </div>
            <input
              type="text"
              placeholder="Company Name"
              v-model="formData.company_name"
            />
          </div>
          <div class="input-set" style="grid-column: span 2">
            <div class="label-box">
              <p class="label">Address:</p>
              <!-- <label class="star-label"><i class="las la-asterisk"></i></label> -->
            </div>
            <textarea
              type="text"
              style="height: 60px; width: 610px; max-height: 610px"
              v-model="formData.address"
              placeholder="Address"
            />
          </div>
          <div class="input-set">
            <div class="label-box">
              <p class="label">Location:</p>
              <!-- <span class="star-label"><i class="las la-asterisk"></i></span> -->
            </div>
            <input
              type="text"
              placeholder="Location"
              v-model="formData.location"
            />
          </div>
          <div class="input-set">
            <div class="label-box">
              <p class="label">Phone No:</p>
              <!-- <span class="star-label"><i class="las la-asterisk"></i></span> -->
            </div>
            <input
              type="tel"
              placeholder="Phone No"
              v-model="formData.phone_no"
            />
          </div>
          <div class="checkbox-set">
            <v-ons-checkbox input-id="incountry" v-model="formData.is_domestic">
            </v-ons-checkbox>
            <label for="incountry">Client company is located in Thailand</label>
          </div>
          <label class="section-text" style="grid-column: span 2"
            >Company Logo</label
          >
          <div class="input-set" style="grid-column: span 2">
            <div class="picture-upload-box">
              <div class="preview-box">
                <img id="preview_img" src="" alt="" />
              </div>
              <div class="upload-box">
                <div class="upload-btn-wrapper">
                  <input
                    type="file"
                    id="preview_input_img"
                    style="display: none"
                    ref="file_img"
                    @change="PREVIEW_IMG_UPLOAD()"
                  />
                  <v-ons-toolbar-button>
                    <label for="preview_input_img"
                      ><i class="las la-image"></i>Select File</label
                    >
                  </v-ons-toolbar-button>
                  <v-ons-toolbar-button
                    class="btn-delete"
                    v-on:click="PREVIEW_IMG_DELETE()"
                    v-if="this.formData.file"
                  >
                    <i class="las la-trash"></i>
                  </v-ons-toolbar-button>
                </div>
              </div>
            </div>
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
// import clone from "just-clone";
// import DxSelectBox from "devextreme-vue/select-box";

//JS

export default {
  name: "popup-add-client-company",
  components: {
    // DxSelectBox,
  },
  created() {},
  data() {
    return {
      formData: {
        is_active: true,
        is_domestic: true,
        file: "",
      },
      formSelect: {},
    };
  },
  methods: {
    SAVE() {
      if (this.formData.company_name) {
        this.$ons.notification.confirm("Confirm save?").then((res) => {
          if (res == 1) {
            const data = this.formData;
            // console.log(data);
            axios({
              method: "post",
              url: "/MdClientCompany/create-client",
              headers: {
                "Content-Type": "multipart/form-data",
                Authorization:
                  "Bearer " + JSON.parse(localStorage.getItem("token")),
              },
              data: data,
            })
              .then((res) => {
                if (res.status == 201) {
                  this.$ons.notification.alert("Add successful");
                  this.$emit("btn-cancel-add");
                  this.$emit("refreshList");
                }
              })
              .catch((error) => {
                console.log(error);
              })
              .finally(() => {});
          }
        });
      } else {
        this.$ons.notification.alert("Please fill all required fields.");
      }
    },
    CANCEL() {
      let form = this.formData;
      if (this.formData != form) {
        this.$ons.notification
          .confirm("Your unsaved changes will be lost")
          .then((res) => {
            if (res == 1) {
              this.$emit("btn-cancel-add");
            }
          });
      } else {
        this.$emit("btn-cancel-add");
      }
    },
    PREVIEW_IMG_UPLOAD() {
      this.formData.file = this.$refs.file_img.files[0];
      var img = this.formData.file;
      if (img) {
        if (img.type == "image/png" || img.type == "image/jpeg") {
          if (img.size < 20000000) {
            document.getElementById("preview_img").src =
              window.URL.createObjectURL(img);
          } else {
            this.$ons.notification.alert("File size too large. (20 MB max)");
            this.PREVIEW_IMG_FORM_CLEAR();
          }
        } else {
          this.$ons.notification.alert(
            "Incorrect filetype. <br/> Only PNG/JPG/JPEG file can be uploaded."
          );
          this.PREVIEW_IMG_FORM_CLEAR();
        }
      }
    },
    PREVIEW_IMG_DELETE() {
      this.formData.file = "";
      document.getElementById("preview_img").src = "";
    },
    PREVIEW_IMG_FORM_CLEAR() {
      const file = document.getElementById("preview_input_img");
      file.val = "";
      this.formData.file = "";
    },
  },
  computed: {},
};
</script>

<style lang="scss" scoped>
@import "@/style/main.scss";
.form-item-container {
  width: auto;
  display: grid;
  grid-template-columns: repeat(2, 300px);
  grid-gap: 10px;
}

textarea {
  max-width: 610px;
  min-width: 610px;
}

.loading-section {
  height: 222px;
  margin-top: -51px;
  padding: 0;
  width: 350px;
  .app-content-loading {
    top: 51px;
    left: 0;
    height: 211px;
  }
}
</style>