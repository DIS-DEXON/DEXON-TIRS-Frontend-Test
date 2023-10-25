<template>
  <div class="popup-wrapper-note">
    <div class="popup-card">
      <div class="popup-header">
        <label>Note</label>
      </div>
      <div class="popup-content">
        <div id="signature-pad" class="signature-pad">
          <div class="signature-pad--body">
            <canvas
              id="sign-canvas"
              width="800"
              style="touch-action: none; user-select: none; width: 800px; height: 400px"
              height="400"
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
      var signature = canvas.toBlob((s) => {
        console.log(s);
      },
        "image/jpeg",
        0.5
      );
      console.log(signature);
      return;
      // id_result , base64  Add
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
    width: 100%;
    height: 400px;
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
.popup-wrapper-note {
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999;
  background-color: rgba(0, 0, 0, 0.5);

  .popup-card {
    background-color: #fff;
    // padding: 20px;
    width: 840px;
    height: fit-content;
    max-height: calc(100vh - 140px);
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border-radius: 6px;
    overflow: hidden;

    .popup-header {
      // border: 1px solid #303030;
      // border-width: 0 0 1px 0px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 50px;
      background-color: #fbfbfb;
      border-radius: 6px 6px 0 0;
      border: 1px solid #e6e6e6;
      border-width: 0 0 1px 0;
      padding-left: 20px;

      label {
        height: fit-content;
        font-size: 2em;
        font-style: normal;
        font-weight: 600;
        letter-spacing: -0.08px;
        color: $web-font-color-black;
        display: -webkit-box;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
        overflow: hidden;
        user-select: text;
      }

      .toolbar-button {
        background-color: transparent;
        padding: 0;
        height: 34px;
        border: 0px;

        i {
          font-size: 20px;
          color: $web-font-color-black;
        }

        span {
          font-size: 14px;
          font-weight: 500;
          color: $web-font-color-black;
        }
      }

      .toolbar-button:hover {
        background-color: #fbfbfb;

        i {
          color: #fc9b21;
        }
      }
    }

    .popup-content {
      padding: 20px;
      width: -webkit-fill-available;
      max-height: calc(100vh - 300px);
      min-height: 100%;
      overflow: auto;
    }

    .popup-footer {
      border: 1px solid #e6e6e6;
      border-width: 1px 0 0 0;
      background-color: #fbfbfb;
      height: 60px;
      display: flex;
      justify-content: center;
      align-items: center;

      .button-set {
        display: flex;
        justify-content: center;
        align-items: center;

        button {
          width: 160px;
          margin: 0 10px;
        }
      }
    }
  }
}
</style>