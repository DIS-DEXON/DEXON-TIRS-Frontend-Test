<template>
  <div class="popup-wrapper">
    <div class="popup-card">
      <div class="popup-header">
        <label>Edit Record</label>
      </div>
      <div class="popup-content form">
        <div class="form-item-container">
          <label class="section-text">Start Mile</label>
          <div class="input-set">
            <div class="label-box">
              <p class="label">Start Date:</p>
              <span class="star-label"><i class="las la-asterisk"></i></span>
            </div>
            <DxDateBox
              :value="formSelect.now"
              type="date"
              v-model="formData.start_date"
              placeholder="Start Date"
            />
          </div>

          <div class="input-set">
            <div class="label-box">
              <p class="label">Mile Number:</p>
              <span class="star-label"><i class="las la-asterisk"></i></span>
            </div>
            <input
              type="text"
              placeholder="Mile Number"
              v-model="formData.start_mile"
            />
          </div>
          <div class="input-set">
            <div class="label-box">
              <p class="label">ODO Image:</p>
              <!-- <span class="star-label"><i class="las la-asterisk"></i></span> -->
            </div>
            <div class="picture-upload-box">
              <div class="preview-box">
                <img id="preview_img_start" src="" alt="" />
              </div>
              <div class="upload-box">
                <div class="upload-btn-wrapper">
                  <input
                    type="file"
                    id="preview_input_img_start"
                    style="display: none"
                    ref="file_start_img"
                    @change="PREVIEW_IMG_UPLOAD('start-img')"
                  />
                  <v-ons-toolbar-button>
                    <label for="preview_input_img_start"
                      ><i class="las la-image"></i>Select File</label
                    >
                  </v-ons-toolbar-button>
                  <v-ons-toolbar-button
                    class="btn-delete"
                    v-on:click="PREVIEW_IMG_DELETE('start-img')"
                  >
                    <i class="las la-trash"></i>
                  </v-ons-toolbar-button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="hr-verticle"></div>
        <div class="form-item-container">
          <label class="section-text">End Mile</label>
          <div class="input-set">
            <div class="label-box">
              <p class="label">End Date:</p>
            </div>
            <DxDateBox
              :value="formSelect.now"
              type="date"
              v-model="formData.end_date"
              placeholder="End Date"
            />
          </div>

          <div class="input-set">
            <div class="label-box">
              <p class="label">Mile Number:</p>
            </div>
            <input
              type="text"
              placeholder="Mile Number"
              v-model="formData.end_mile"
            />
          </div>
          <div class="input-set">
            <div class="label-box">
              <p class="label">ODO Image:</p>
              <!-- <span class="star-label"><i class="las la-asterisk"></i></span> -->
            </div>
            <div class="picture-upload-box">
              <div class="preview-box">
                <img id="preview_img_end" src="" alt="" />
              </div>
              <div class="upload-box">
                <div class="upload-btn-wrapper">
                  <input
                    type="file"
                    id="preview_input_img_end"
                    style="display: none"
                    ref="file_end_img"
                    @change="PREVIEW_IMG_UPLOAD('end-img')"
                  />
                  <v-ons-toolbar-button>
                    <label for="preview_input_img_end"
                      ><i class="las la-image"></i>Select File</label
                    >
                  </v-ons-toolbar-button>
                  <v-ons-toolbar-button
                    class="btn-delete"
                    v-on:click="PREVIEW_IMG_DELETE('end-img')"
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
export default {
  name: "popup-edit-mileage",
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
    if (this.formData.start_img != null) {
      document.getElementById("preview_img_start").src =
        this.baseURL + this.formData.start_img;
    }
    if (this.formData.end_img != null) {
      document.getElementById("preview_img_end").src =
        this.baseURL + this.formData.end_img;
    }
  },
  methods: {
    PREVIEW_IMG_UPLOAD(option) {
      if (option == "start-img") {
        this.formData.start_file = this.$refs.file_start_img.files[0];
        var img_start = this.formData.start_file;
        if (img_start) {
          if (img_start.type == "image/png" || img_start.type == "image/jpeg") {
            if (img_start.size < 20000000) {
              document.getElementById("preview_img_start").src =
                window.URL.createObjectURL(img_start);
            } else {
              this.$ons.notification.alert("File size too large. (20 MB max)");
              this.PREVIEW_IMG_FORM_CLEAR("start-img");
            }
          } else {
            this.$ons.notification.alert(
              "Incorrect filetype. <br/> Only PNG/JPG/JPEG file can be uploaded."
            );
            this.PREVIEW_IMG_FORM_CLEAR("start-img");
          }
        }
      } else if (option == "end-img") {
        this.formData.end_file = this.$refs.file_end_img.files[0];
        var img_end = this.formData.end_file;

        if (img_end) {
          if (img_end.type == "image/png" || img_end.type == "image/jpeg") {
            if (img_end.size < 20000000) {
              document.getElementById("preview_img_end").src =
                window.URL.createObjectURL(img_end);
            } else {
              this.$ons.notification.alert("File size too large. (20 MB max)");
              this.PREVIEW_IMG_FORM_CLEAR("start-img");
            }
          } else {
            this.$ons.notification.alert(
              "Incorrect filetype. <br/> Only PNG/JPG/JPEG file can be uploaded."
            );
            this.PREVIEW_IMG_FORM_CLEAR("end-img");
          }
        }
      }
    },
    PREVIEW_IMG_DELETE(option) {
      if (option == "start-img") {
        this.formData.start_file = "";
        document.getElementById("preview_img_start").src = "";
      } else if (option == "end-img") {
        this.formData.end_file = "";
        document.getElementById("preview_img_end").src = "";
      }
    },
    PREVIEW_IMG_FORM_CLEAR(option) {
      if (option == "start-img") {
        const file = document.getElementById("preview_input_img_start");
        file.val = "";
        this.formData.start_file = "";
      } else if (option == "end-img") {
        const file = document.getElementById("preview_input_img_end");
        this.formData.end_file = "";
        file.val = "";
      }
    },
    SAVE() {
      if (this.formData.start_date) {
        if (this.formData.start_mile) {
          let isInt = isNaN(this.formData.start_mile);
          if (isInt == false) {
            if (this.formData.start_file || this.formData.start_img) {
              this.$ons.notification.confirm("Confirm save?").then((res) => {
                if (res == 1) {
                  if (this.formData.start_file) this.formData.start_img = null;
                  if (this.formData.end_file) this.formData.end_img = null;
                  const data = this.formData;
                  console.log(data);
                  axios({
                    method: "put",
                    url: "/mile-record/mile-record-edit",
                    headers: {
                      "Content-Type": "multipart/form-data",
                      Authorization:
                        "Bearer " + JSON.parse(localStorage.getItem("token")),
                    },
                    data: data,
                  })
                    .then((res) => {
                      if (res.status == 200) {
                        this.$ons.notification.alert(
                          "Edit Mileage Record successful"
                        );
                        this.$emit("btn-cancel-edit");
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
              this.$ons.notification.alert(
                '"Start Mile Image" field cannot be empty'
              );
            }
          } else {
            this.$ons.notification.alert(
              '"Start Mile Number" should be numberic input only'
            );
          }
        } else {
          this.$ons.notification.alert(
            '"Start Mile Number" field cannot be empty'
          );
        }
      } else {
        this.$ons.notification.alert('"Start Date" field cannot be empty');
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
  display: flex;
  column-gap: 20px;
}
.form-item-container {
  width: 300px;
  display: block;
}
textarea {
  max-width: 610px;
  min-width: 610px;
}
.hr-verticle {
  height: auto;
}
</style>