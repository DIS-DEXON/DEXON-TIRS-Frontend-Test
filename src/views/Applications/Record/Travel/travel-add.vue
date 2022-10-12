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
          <div class="input-set">
            <div class="label-box">
              <p class="label">Create Record for(Date):</p>
              <span class="star-label"><i class="las la-asterisk"></i></span>
            </div>
            <DxDateBox
              :value="formSelect.now"
              type="date"
              v-model="formData.bill_date"
              placeholder="Select Date"
            />
          </div>
          <div class="input-set" style="margin-top: 10px">
            <div class="label-box">
              <p class="label">Notes:</p>
              <!-- <span class="star-label"><i class="las la-asterisk"></i></span> -->
            </div>
            <textarea
              v-model="formData.note"
              placeholder="Note"
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
// import clone from "just-clone";
import DxDateBox from "devextreme-vue/date-box";
import moment from "moment";
export default {
  name: "popup-add-travel",
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
      let tbname = "TravelRecord";
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
        "AI-TRR-" + monthyear + "-" + this.formData.doc_seq.toString();
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
  // display: grid;
  // grid-template-columns: 300px;
  // grid-gap: 20px;
  display: block;
}
.form-item-container {
  width: auto;
  display: block;
  // grid-gap: 10px;
}

p.info {
  margin-bottom: 0 !important;
}
</style>