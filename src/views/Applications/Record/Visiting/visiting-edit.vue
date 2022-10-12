<template>
  <div class="popup-wrapper">
    <div class="popup-card">
      <div class="popup-header">
        <label>Edit Record</label>
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
// import moment from "moment";
export default {
  name: "popup-edit-visiting-record",
  components: {
    DxSelectBox,
  },
  props: {
    editInfo: Object,
  },
  data() {
    return {
      formData: {},
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
    this.FETCH_DROPDOWN();
    this.formData = clone(this.editInfo);
  },
  methods: {
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
                  method: "put",
                  url: "/visit-record/visit-record-update",
                  headers: {
                    Authorization:
                      "Bearer " + JSON.parse(localStorage.getItem("token")),
                  },
                  data: data,
                })
                  .then((res) => {
                    // console.log(res.data);
                    if (res.status == 200) {
                      this.$ons.notification.alert("Record Edit successful");
                      this.$emit("closePopup");
                      this.$emit("fetchInfo");
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