<template>
  <div class="popup-wrapper">
    <div class="popup-card">
      <div class="popup-header">
        <label>Add New Record</label>
        <span style="font-size: 14px; padding-right: 20px"
          >{{ formData.doc_no }}
        </span>
      </div>
      <div class="popup-content form">
        <div class="form-item-container">
          <label class="section-text">Client Informations</label>

          <div class="input-set">
            <div class="label-box">
              <p class="label">Company:</p>
              <label class="star-label"><i class="las la-asterisk"></i></label>
            </div>
            <DxSelectBox
              style="border: 0; font-size: 14px"
              :items="formSelect.clientList"
              placeholder="Select Client"
              v-model="formData.id_client"
              display-expr="client_name"
              value-expr="id_client"
              item-template="item"
            />
          </div>
          <div class="input-set">
            <div class="label-box">
              <p class="label">Location/Address:</p>
              <label class="star-label"><i class="las la-asterisk"></i></label>
            </div>
            <input
              type="text"
              v-model="formData.client_location"
              placeholder="Location/Address"
            />
          </div>
          <div class="input-set">
            <div class="label-box">
              <p class="label">Contact Name:</p>
              <label class="star-label"><i class="las la-asterisk"></i></label>
            </div>
            <input
              type="text"
              v-model="formData.client_name"
              placeholder="Contact Name"
            />
          </div>
          <div class="input-set">
            <p class="label">Position:</p>
            <input
              type="text"
              v-model="formData.client_position"
              placeholder="Position"
            />
          </div>
          <div class="input-set">
            <p class="label">Email:</p>
            <input
              type="text"
              v-model="formData.client_email"
              placeholder="Email"
            />
          </div>
          <div class="input-set">
            <p class="label">Phone Number:</p>
            <input
              type="text"
              v-model="formData.client_phone_no"
              placeholder="Phone Number"
            />
          </div>

          <label class="section-text">Visiting Objective</label>

          <div class="checkbox-set">
            <v-ons-checkbox
              input-id="incountry"
              v-model="formData.obj_visiting"
            >
            </v-ons-checkbox>
            <label for="incountry">Visiting</label>
          </div>
          <div class="input-set">
            <input
              type="text"
              v-model="formData.obj_visiting_comment"
              placeholder="Objective detail"
              v-if="formData.obj_visiting == true"
            />
          </div>
          <div class="checkbox-set">
            <v-ons-checkbox
              input-id="obj_meeting"
              v-model="formData.obj_meeting"
            >
            </v-ons-checkbox>
            <label for="obj_meeting">Meeting</label>
          </div>
          <div class="input-set">
            <input
              type="text"
              v-model="formData.obj_meeting_comment"
              placeholder="Objective detail"
              v-if="formData.obj_meeting == true"
            />
          </div>
          <div class="checkbox-set">
            <v-ons-checkbox
              input-id="obj_saleandmarketing"
              v-model="formData.obj_saleandmarketing"
            >
            </v-ons-checkbox>
            <label for="obj_saleandmarketing">Sales and Marketing</label>
          </div>
          <div class="input-set">
            <input
              type="text"
              v-model="formData.obj_saleandmarketing_comment"
              placeholder="Objective detail"
              v-if="formData.obj_saleandmarketing == true"
            />
          </div>
          <div class="checkbox-set">
            <v-ons-checkbox
              input-id="submitdoc"
              v-model="formData.obj_submitdoc"
            >
            </v-ons-checkbox>
            <label for="submitdoc">Submit Document</label>
          </div>
          <div class="input-set">
            <input
              type="text"
              v-model="formData.obj_submitdoc_comment"
              placeholder="Objective detail"
              v-if="formData.obj_submitdoc == true"
            />
          </div>
          <div class="checkbox-set">
            <v-ons-checkbox
              input-id="receivedoc"
              v-model="formData.obj_receivedoc"
            >
            </v-ons-checkbox>
            <label for="receivedoc">Receive Document</label>
          </div>
          <div class="input-set">
            <input
              type="text"
              v-model="formData.obj_receivedoc_comment"
              placeholder="Objective detail"
              v-if="formData.obj_receivedoc == true"
            />
          </div>
          <div class="checkbox-set">
            <v-ons-checkbox input-id="obj_other" v-model="formData.obj_other">
            </v-ons-checkbox>
            <label for="obj_other">Other</label>
          </div>
          <div class="input-set">
            <input
              type="text"
              v-model="formData.obj_other_comment"
              placeholder="Objective detail"
              v-if="formData.obj_other == true"
            />
          </div>
          <label class="section-text">Visiting Note</label>
          <div class="input-set" style="margin-top: 10px">
            <textarea
              v-model="formData.note"
              placeholder="Visiting Note"
              style="height: 80px; max-height: 200px"
            />
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
import DxSelectBox from "devextreme-vue/select-box";
import clone from "just-clone";
import moment from "moment";
// import DxDateBox from "devextreme-vue/date-box";
// import { DxCheckBox } from "devextreme-vue/check-box";
export default {
  name: "popup-add-visiting-record",
  components: {
    DxSelectBox,
    // DxCheckBox,
    // DxDateBox,
  },
  data() {
    return {
      formData: {
        doc_seq: "",
        sign_dacon_id: JSON.parse(localStorage.getItem("user")).id_user,
      },
      formSelect: {
        jobType: ["H-N-RBI", "H-N-IDB"],
        visitObj: [
          "Visiting",
          "Meeting",
          "Sales and Marketing",
          "Submit Document",
          "Receive Document",
          "Other",
        ],
        now: new Date(),
        clientList: [{}],
      },
    };
  },
  created() {
    let id = JSON.parse(localStorage.getItem("user"));
    this.formData.id_user = id.id_user;
    this.GET_LAST_SEQ_NO();
    this.FETCH_DROPDOWN();
  },
  methods: {
    GET_LAST_SEQ_NO() {
      let tbname = "VisitRecord";
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
          this.$ons.notification.alert(
            error.code + " " + error.response.status + " " + error.message
          );
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
      this.formData.doc_no =
        "AI-CVR-" + monthyear + "-" + this.formData.doc_seq.toString();
    },
    SAVE() {
      if (this.formData.id_client || this.formData.id_client >= -1) {
        if (this.formData.client_location) {
          if (this.formData.client_name) {
            this.$ons.notification.confirm("Confirm save?").then((res) => {
              if (res == 1) {
                const data = clone(this.formData);
                // console.log("Adding formData");
                // console.log(data);

                axios({
                  method: "post",
                  url: "/visit-record/visit-record-add",
                  headers: {
                    Authorization:
                      "Bearer " + JSON.parse(localStorage.getItem("token")),
                  },
                  data: data,
                })
                  .then((res) => {
                    // console.log(res.data);
                    if (res.status == 200) {
                      this.$ons.notification.alert("New Record Add successful");
                      this.$emit("close-popup");
                      const id = res.data[0].id_visit;
                      if (id) {
                        this.$router.push("/record/visiting/" + id);
                      }
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
              '"Contact Name"</br>field cannot be empty'
            );
          }
        } else {
          this.$ons.notification.alert(
            '"Location/Address"</br>field cannot be empty'
          );
        }
      } else {
        this.$ons.notification.alert(
          '"Client Company"</br>field cannot be empty'
        );
      }
    },
    CANCEL() {
      if (this.formData != this.formData) {
        this.$ons.notification
          .confirm("Your unsaved changes will be lost")
          .then((res) => {
            if (res == 1) {
              this.$emit("closePopup");
            }
          });
      } else {
        this.$emit("closePopup");
      }
    },
    FETCH_DROPDOWN() {
      axios({
        method: "get",
        url: "/project-manager/client-list",
        headers: {
          Authorization: "Bearer " + JSON.parse(localStorage.getItem("token")),
        },
      })
        .then((res) => {
          if (res.data) {
            this.formSelect.clientList = res.data;
          }
        })
        .catch((error) => {
          console.log(error);
          this.formSelect.clientList = [
            { id_client: 9999, client_name: "No Data" },
          ];
        });
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/style/main.scss";
// .popup-content {
// }
.form-item-container {
  width: auto;
  display: grid;
  grid-template-columns: repeat(2, 300px);
  grid-gap: 10px;
}

.dx-icon {
  font-size: 24px;
  color: blue;
}

.form .form-item-container .checkbox-set {
  margin: 0;
  margin-left: 10px;
  height: 34px;
}

.section-text {
  grid-column: span 2;
}

textarea {
  min-width: 610px;
  max-width: 610px;
}
</style>