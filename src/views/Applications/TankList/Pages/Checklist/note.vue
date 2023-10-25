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
            <div class="btn-undo" v-on:click="UNDO_CANVAS()">
              <i class="las la-undo"></i>
              <span>UNDO</span>
            </div>
            <div class="btn-clear" v-on:click="CLEAR_CANVAS()">
              <i class="las la-trash"></i>
              <span>CLEAR</span>
            </div>
            <div class="color-picker">
              <div class="select-border" :selected="selected_color == color" :key="color" v-for="color in color_list">
                <div class="color-btn" :style="`background-color: ${color};`" v-on:click="SELECT_COLOR(color)" />
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
      sign_pad: null,
      selected_color: "black",
      color_list: [
        "black",
        "red",
        "green", 
        "blue"
      ]
    };
  },
  props: {
    id: Number,
  },
  mounted() {
    // signature();
    this.sign_pad = this.CREATE_CANVAS()
  },
  methods: {
    SELECT_COLOR(color) {
      this.selected_color = color
      this.sign_pad.penColor = this.selected_color
    },
    CREATE_CANVAS() {
      const canvas = document.querySelector("canvas")
      const sign = new SignaturePad(canvas,  {
        velocityFilterWeight: 0.5,
        throttle: 0,
        backgroundColor: "white"
      })
      return sign
    },
    CLEAR_CANVAS() {
      this.sign_pad.clear()
    },
    UNDO_CANVAS() {
      const data = this.sign_pad.toData()
      data.pop()
      this.sign_pad.fromData(data)
    },
    SAVE() {
      const canvas = document.querySelector("canvas")
      canvas.toBlob((blob) => {
        const file = new File([blob], "sign.png")
        const form_data = new FormData()
        form_data.append("file", file)
        axios({
          method: "put",
          url: "/chk-generic/edit-chkgeneric-note?id=" + this.id,
          headers: {
            Authorization: "Bearer " + JSON.parse(localStorage.getItem("token"))
          },
          data: this.sign_pad.isEmpty() ? null : form_data
        }).then((res) => {
          if (res.status == 200) {
            this.$emit("closePopup")
            this.$ons.notification.alert("Save Successfully.")
            return
          }
          this.$ons.notification.alert(res.data)
        }).catch(() => {
          this.$ons.notification.alert("Unexpected error.")
        })
      })
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
    .btn-undo {
      position: absolute;
      top: 5px;
      right: 90px;
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
    .color-picker {
      position: absolute;
      display: flex;
      gap: 8px;
      bottom: 12px;
      right: 6px;
      .select-border {
        position: relative;
        aspect-ratio: 1 / 1;
        width: 34px;
        border-radius: 100%;
        &[selected] {
          background-color: lightgray;
        }
        .color-btn {
          position: absolute;
          aspect-ratio: 1 / 1;
          top: 3px;
          left: 3px;
          width: 28px;
          border-radius: 100%;
        }
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