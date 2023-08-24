<template>
  <div class="popup-wrapper">
    <div class="popup-card">
      <div class="popup-header">
        <label>Note</label>
      </div>
      <div class="popup-content">
        <div id="signature-pad" class="signature-pad">
          <div class="signature-pad--body">
            <canvas
              id="sign-canvas"
              width="600"
              style="touch-action: none; user-select: none"
              height="200"
            >
              <h1>test</h1>
            </canvas>
            <!-- <div class="signature-line"></div> -->
            <div class="btn-clear" v-on:click="CLEAR_CANVAS()">
              <i class="las la-undo-alt"></i>
              <span>clear</span>
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
/* eslint-disable */
import axios from "/axios.js";
import clone from "just-clone";
import signature from "@/js/signaturePad";
import SignaturePad from "signature_pad";
import moment from "moment";
export default {
  name: "popup-note",
  components: {},
  data() {
    return {
      formData: {}
    };
  },
  props: {
    title: String,
    signer: String,
    info: Object
  },
  mounted() {
    signature();
    this.formData = clone(this.info);
  },
  methods: {
    CLEAR_CANVAS() {
      var canvas = document.querySelector("canvas");
      var signaturePad = new SignaturePad(canvas);
      signaturePad.clear();
    },
    SAVE() {
      var canvas = document.querySelector("canvas");
      var signature = canvas.toDataURL();
      console.log(signature);
      return;
      if (signature) {
        this.$ons.notification.confirm("Confirm SAVE?").then(res => {
          if (res == 1) {
            axios({
              method: "put",
              url: "/",
              headers: {
                Authorization:
                  "Bearer " + JSON.parse(localStorage.getItem("token"))
              },
              data: this.formData
            })
              .then(res => {
                if (res.status == 200) {
                  console.log(res);
                  if (this.signer == "dexon") {
                    this.$ons.notification.alert("Dexon Signed");
                  } else {
                    this.$ons.notification.alert("Client Signed");
                  }
                  this.$emit("closePopup");
                  this.$emit("FETCH_INFO");
                }
              })
              .catch(error => {
                this.$ons.notification.alert(
                  error.code + " " + error.response.status + " " + error.message
                );
              })
              .finally(() => {});
          }
        });
      }
    },
    CANCEL() {
      this.$emit("closePopup");
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/style/main.scss";
.section-text {
  grid-column: span 2;
}
.signature-pad {
  canvas {
    border: 1px solid #000;
  }

  .signature-pad--body {
    position: relative;
    .signature-line {
      width: 80%;
      height: 1px;
      position: absolute;
      bottom: 60px;
      left: 50%;
      transform: translate(-50%);
      border: 1px solid #000;
      border-width: 0 0 1px 0;
    }
    .btn-clear {
      position: absolute;
      top: 5px;
      right: 5px;
      background-color: transparent;
      padding: 4px 6px;
      width: fit-content;
      display: flex;
      justify-content: center;
      align-items: center;
      border: 0px;
      cursor: pointer;

      i {
        font-size: 18px;
        color: $web-font-color-blue;
      }

      span {
        font-size: 14px;
        font-weight: 500;
        color: $web-font-color-blue;
        padding-left: 6px;
      }
    }
  }
}
</style>