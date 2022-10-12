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
          <!-- <div class="input-set">
            <div class="label-box">
              <p class="label">Record No:</p>
            </div>
            <p class="info">
              {{ formData.record_no }}
            </p>
          </div> -->

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
import DxDateBox from "devextreme-vue/date-box";
import moment from "moment";
export default {
  name: "popup-add-gasbill",
  components: { DxDateBox },
  data() {
    return {
      formData: {
        id_user: "",
        record_no: "",
        bill_date: "",
        price: "",
        doc_seq: "",
        file: "",
      },
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
      let tbname = "FuelBillRecord";
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
        "AI-GBR-" + monthyear + "-" + this.formData.doc_seq.toString();
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
    SAVE() {
      if (this.formData.bill_date) {
        if (this.formData.price) {
          this.$ons.notification.confirm("Confirm save?").then((res) => {
            if (res == 1) {
              const data = this.formData;
              axios({
                method: "post",
                url: "/fuel-bill/fuel-bill-add",
                headers: {
                  "Content-Type": "multipart/form-data",
                  Authorization:
                    "Bearer " + JSON.parse(localStorage.getItem("token")),
                },
                data: data,
              })
                .then((res) => {
                  if (res.status == 200) {
                    this.$ons.notification.alert("Bill Record Add successful");
                    this.$emit("btn-cancel-add");
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