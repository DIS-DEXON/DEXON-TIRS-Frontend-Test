<template>
  <div class="popup-wrapper">
    <div class="popup-card">
      <div class="popup-header">
        <label>Add New Client Info</label>
      </div>
      <div class="popup-content form">
        <div class="form-item-container">
          <div class="input-set">
            <div class="label-box">
              <p class="label">Clint Name:</p>
              <span class="star-label"><i class="las la-asterisk"></i></span>
            </div>
            <input
              type="text"
              placeholder="Client Name"
              v-model="formData.client_name"
            />
          </div>
          <div class="input-set">
            <p class="label">Location:</p>
            <input
              type="text"
              placeholder="Location"
              v-model="formData.location"
            />
          </div>

          <div class="input-set">
            <p class="label">Phone No:</p>
            <input
              type="text"
              placeholder="Phone No"
              v-model="formData.phone_no"
            />
          </div>
          <div class="input-set">
            <p class="label">Email:</p>
            <input type="email" placeholder="Email" v-model="formData.email" />
          </div>
          <div class="input-set" style="grid-column: span 2">
            <p class="label">Address:</p>
            <textarea
              type="text"
              placeholder="Address"
              style="height: 60px; width: 610px; max-height: 610px"
              v-model="formData.address"
            />
          </div>
          <div class="checkbox-set">
            <v-ons-checkbox input-id="incountry" v-model="formData.is_domestic">
            </v-ons-checkbox>
            <label for="incountry">Client is located in Thailand</label>
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
export default {
  name: "popup-add-client",
  components: {},
  data() {
    return {
      formData: {
        client_name: "",
        location: "",
        is_domestic: true,
        phone_no: "",
        email: "",
        address: "",
      },
    };
  },
  methods: {
    SAVE() {
      if (this.formData.client_name) {
        this.$ons.notification.confirm("Confirm save?").then((res) => {
          if (res == 1) {
            const data = this.formData;
            axios({
              method: "post",
              url: "/contact-client/client-add",
              headers: {
                Authorization:
                  "Bearer " + JSON.parse(localStorage.getItem("token")),
              },
              data: data,
            })
              .then((res) => {
                if (res.status == 200) {
                  this.$ons.notification.alert("Client Add successful");
                  this.$emit("btn-cancel-add");
                  this.$emit("refreshList");
                }
              })
              .catch((error) => {
                this.$ons.notification.alert(
                  error.code + " " + error.response.status + " " + error.message
                );
              })
              .finally(() => {});
          }
        });
      } else {
        this.$ons.notification.alert('"Client name" field cannot be empty');
      }
    },
    CANCEL() {
      console.log(this.formData);
      let form = this.formData;
      console.log(form);
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
</style>