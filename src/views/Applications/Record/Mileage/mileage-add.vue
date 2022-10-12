<template>
  <div class="popup-wrapper">
    <div class="popup-card">
      <div class="popup-header">
        <label>Add New Record</label>
        <span style="font-size: 14px; padding-right: 20px"
          >{{ formData.record_no }}
        </span>
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
              <span class="star-label"><i class="las la-asterisk"></i></span>
            </div>
            <div class="picture-upload-box">
              <v-ons-toolbar-button
                class="btn-delete"
                v-on:click="PREVIEW_IMG_DELETE('start-img')"
                v-if="this.formData.start_file"
              >
                <i class="las la-trash"></i>
              </v-ons-toolbar-button>
              <div class="preview-box">
                <img id="preview_img_start" src="" alt="" />
              </div>
              <div class="upload-box" v-if="!this.formData.start_file">
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
                      ><i class="las la-plus"></i>Add Image</label
                    >
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
            </div>
            <div class="picture-upload-box">
              <div class="preview-box">
                <img id="preview_img_end" src="" alt="" />
                <v-ons-toolbar-button
                  class="btn-delete"
                  v-on:click="PREVIEW_IMG_DELETE('end-img')"
                  v-if="this.formData.end_file"
                >
                  <i class="las la-trash"></i>
                </v-ons-toolbar-button>
              </div>
              <div class="upload-box" v-if="!this.formData.end_file">
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
                      ><i class="las la-plus"></i>Add Image</label
                    >
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
import DxDateBox from "devextreme-vue/date-box";
import moment from "moment";
export default {
  name: "popup-add-maileage",
  components: { DxDateBox },
  data() {
    return {
      formData: {},
      formSelect: {
        now: new Date(),
      },
    };
  },
  created() {
    let id = JSON.parse(localStorage.getItem("user"));
    this.formData.id_user = id.id_user;
    this.GET_LAST_SEQ_NO();
  },
  methods: {
    GET_LAST_SEQ_NO() {
      let tbname = "MileRecord";
      axios({
        method: "post",
        url: "/global/last-doc-seq",
        headers: {
          Authorization: "Bearer " + JSON.parse(localStorage.getItem("token")),
        },
        data: {
          table_name: tbname,
        },
      })
        .then((res) => {
          if (res.status == 200 && res.data) {
            var curSeq = res.data[0].last_doc_seq;
            if (curSeq == null) {
              this.formData.doc_seq = 1;
            } else {
              this.formData.doc_seq = curSeq + 1;
            }
            if (this.formData.doc_seq < 10) {
              this.formData.doc_seq = "0" + this.formData.doc_seq.toString();
            }
            this.CAL_DOC_NO();
          }
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {});
    },
    CAL_DOC_NO() {
      var month = moment().month() + 1;
      var year = moment().year();
      var monthyear;

      var s_month = month.toString();
      var s_year = year.toString();

      if (s_month.length == 1) {
        s_month = "0" + s_month;
      }
      s_year = s_year.slice(2, 4);

      monthyear = s_month.toString() + "-" + s_year.toString();
      this.formData.record_no =
        "AI-MR-" + monthyear + "-" + this.formData.doc_seq.toString();
    },
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
            if (this.formData.start_file) {
              this.$ons.notification.confirm("Confirm save?").then((res) => {
                if (res == 1) {
                  const data = this.formData;
                  console.log(data);
                  axios({
                    method: "post",
                    url: "/mile-record/mile-record-add",
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
                          "Mileage Record Add successful"
                        );
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
              this.$emit("btn-cancel-add");
            }
          });
      } else {
        this.$emit("btn-cancel-add");
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