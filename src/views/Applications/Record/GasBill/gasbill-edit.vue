<template>
  <div class="popup-wrapper">
    <div class="popup-card">
      <div class="popup-header">
        <label>Edit Record</label>
      </div>
      <div class="popup-content form">
        <div class="form-item-container">
          <div class="input-set">
            <div class="label-box">
              <p class="label">Record No:</p>
            </div>
            <p class="info">
              {{ formData.record_no }}
            </p>
          </div>
          <div class="input-set">
            <div class="label-box">
              <p class="label">Bill Date:</p>
              <span class="star-label"><i class="las la-asterisk"></i></span>
            </div>
            <DxDateBox
              :value="formSelect.now"
              type="date"
              v-model="formData.bill_date"
              placeholder="Bill Date"
            />
          </div>
          <div class="input-set">
            <div class="label-box">
              <p class="label">Price:</p>
              <span class="star-label"><i class="las la-asterisk"></i></span>
            </div>
            <input type="text" placeholder="Price" v-model="formData.price" />
          </div>
        </div>
        <div class="form-item-container">
          <div class="input-set">
            <div class="label-box">
              <p class="label">Receipt Image:</p>
              <!-- <span class="star-label"><i class="las la-asterisk"></i></span> -->
            </div>
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
import clone from "just-clone";
import DxDateBox from "devextreme-vue/date-box";
// import moment from "moment";
export default {
  name: "popup-edit-gasbill",
  components: { DxDateBox },
  props: {
    editInfo: Object,
  },
  data() {
    return {
      formData: {},
      formSelect: {
        now: new Date(),
      },
    };
  },
  computed: {
    baseURL() {
      var mode = this.$store.state.mode;
      if (mode == "dev") return this.$store.state.modeURL.dev;
      else if (mode == "prod") return this.$store.state.modeURL.prod;
      else return console.log("develpment mode set up incorrect.");
    },
  },
  created() {
    this.formData = clone(this.editInfo);
    let id = JSON.parse(localStorage.getItem("user"));
    this.formData.id_user = id.id_user;
    this.formData.doc_seq = parseInt(this.formData.doc_seq);
  },
  mounted() {
    if (this.formData.receipt_img != null) {
      document.getElementById("preview_img").src =
        this.baseURL + this.formData.receipt_img;
    }
  },
  methods: {
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
      this.formData.file = null;
      this.formData.receipt_img = null;
      document.getElementById("preview_img").src = "";
    },
    PREVIEW_IMG_FORM_CLEAR() {
      const file = document.getElementById("preview_input_img");
      file.val = "";
      this.formData.file = null;
    },
    SAVE() {
      if (this.formData.bill_date) {
        if (this.formData.price) {
          this.$ons.notification.confirm("Confirm save?").then((res) => {
            if (res == 1) {
              const data = this.formData;
              axios({
                method: "put",
                url: "/fuel-bill/fuel-bill-edit",
                headers: {
                  "Content-Type": "multipart/form-data",
                  Authorization:
                    "Bearer " + JSON.parse(localStorage.getItem("token")),
                },
                data: data,
              })
                .then((res) => {
                  // console.log(res.data);
                  if (res.status == 200) {
                    this.$ons.notification.alert("Bill Record Edit successful");
                    this.$emit("btn-cancel-edit");
                    this.$emit("refreshList");
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
          this.$ons.notification.alert('"Price" field cannot be empty');
        }
      } else {
        this.$ons.notification.alert('"Bill Date" field cannot be empty');
      }
    },
    CANCEL() {
      // console.log(this.formData);
      let form = this.formData;
      // console.log(form);
      if (this.formData != form) {
        this.$ons.notification
          .confirm("Your unsaved changes will be lost")
          .then((res) => {
            if (res == 1) {
              this.$emit("btn-cancel-edit");
            }
          });
      } else {
        this.$emit("btn-cancel-edit");
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/style/main.scss";
.popup-content {
  display: grid;
  grid-template-columns: 300px 300px;
  grid-gap: 20px;
}
.form-item-container {
  width: auto;
  display: block;
  // grid-gap: 10px;
}

textarea {
  max-width: 610px;
  min-width: 610px;
}

p.info {
  margin-bottom: 0 !important;
}
</style>