<template>
  <div class="report-sheet checklist-sheet">
    <div class="report-container">
      <div class="sheet-header">
        <div class="logo">
          <img src="/img/logo.png" />
        </div>
        <div class="title">Checklist</div>
        <div class="docno"></div>
      </div>
      <div class="sheet-body">
        <!-- <div class="section-label label-align-center">
          <label></label>
        </div>-->
        <div
          class="section-label header-label"
          style="grid-column: span 2; grid-row: span 2; padding-left:50px"
        >
          <label>Anomalies</label>
        </div>
        <div class="section-label rating-label" style="grid-column: span 4">
          <label style="width: 100%; text-align: center; font-weight:700; font-size:13px">Status</label>
        </div>
        <div
          class="section-label comment-label"
          style="grid-row: span 2; font-weight:700; font-size:12px; display:flex: align-items:center;"
        >
          <label>Comments:</label>
        </div>
        <div class="section-label rating-option">
          <label style>Severe</label>
        </div>
        <div class="section-label rating-option">
          <label>Moderate</label>
        </div>
        <div class="section-label rating-option">
          <label>Slight</label>
        </div>
        <div class="section-label rating-option">
          <label>Normal</label>
        </div>

        <!-- <div class="section-label rating-option">
          <label>Severe</label>
        </div>
        <div class="section-label rating-option">
          <label>Moderate</label>
        </div>
        <div class="section-label rating-option">
          <label>Slight</label>
        </div>
        <div class="section-label rating-option">
          <label>Normal</label>
        </div>-->

        <div v-for="item in checklistInfo" :key="item.id" style="grid-column: span 7">
          <div class="topic-label">
            <div class="section-label subheader-label" style="grid-column:span 1">
              <label>{{ }}</label>
            </div>
            <div class="section-label subheader-label" style="grid-column:span 6">
              <label>{{ item.header_content }}</label>
            </div>
          </div>
          <div class="topic-item" v-for="item2 in item.sub_header" :key="item2.id">
            <div class="form-item-value label-align-center" style="grid-column:span 1">
              <label>{{ item.no+"."+item2.no }}</label>
            </div>
            <div class="form-item-value" style="grid-column:span 1">
              <label>{{ item2.subheader_content }}</label>
            </div>
            <div class="form-item-value chk-radio" style="grid-column:span 1">
              <input
                type="radio"
                value="Severe"
                :name="item2.id"
                v-model="item2.result[0].result_desc"
                v-on:click="
                  UPDATE_RESULT(item2.result[0], 'Severe', item2.result[0].comments)
                "
              />
            </div>
            <div class="form-item-value chk-radio" style="grid-column:span 1">
              <input
                type="radio"
                value="Moderate"
                :name="item2.id"
                v-model="item2.result[0].result_desc"
                v-on:click="
                  UPDATE_RESULT(item2.result[0], 'Moderate', item2.result[0].comments)
                "
              />
            </div>
            <div class="form-item-value chk-radio">
              <input
                type="radio"
                value="Slight"
                :name="item2.id"
                v-model="item2.result[0].result_desc"
                v-on:click="
                  UPDATE_RESULT(item2.result[0], 'Slight', item2.result[0].comments)
                "
              />
            </div>
            <div class="form-item-value chk-radio">
              <input
                type="radio"
                value="Normal"
                :name="item2.id"
                v-model="item2.result[0].result_desc"
                v-on:click="
                  UPDATE_RESULT(item2.result[0], 'Normal', item2.result[0].comments)
                "
              />
            </div>
            <div class="form-item-value" style="grid-column:span 1">
              <textarea
                placeholder="comment..."
                style="min-height: auto; padding: 0"
                v-model="item2.result[0].comments"
                @focusout="
                  UPDATE_RESULT(
                    item2.result[0],
                    item2.result[0].result_desc,
                    item2.result[0].comments
                  )
                "
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
//API
import axios from "/axios.js";

export default {
  name: "checklist-by-law-ii",
  props: {
    checklistInfo: Array
  },
  data() {
    return {
      formData: {
        id: null,
        result_desc: null,
        comments: null
      }
    };
  },
  methods: {
    UPDATE_RESULT(item, new_result_desc, comment) {
      console.log("==> RESULT UPDATE START");
      this.formData.id = item.id;
      this.formData.result_desc = new_result_desc;
      this.formData.comments = comment;
      axios({
        method: "put",
        url: "chk-by-law/edit-chkbylaw-2",
        headers: {
          Authorization: "Bearer " + JSON.parse(localStorage.getItem("token"))
        },
        data: this.formData
      })
        .then(res => {
          if (res.status == 200 && res.data) {
            console.log("==> RESULT UPDATED (by law ii)");
          }
        })
        .catch(error => {
          console.log(error);
          this.$ons.notification.alert(
            "Update Failed!<br/>Please try again later"
          );
        })
        .finally(() => {});
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/style/main.scss";
.sheet-body {
  grid-template-columns: 40px 50% 40px 40px 40px 40px auto !important;
  .topic-label {
    grid-template-columns: 40px 50% 40px 40px 40px 40px auto !important;
  }
  .rating-option {
    position: relative;
    height: 80px;

    label {
      position: absolute;
      bottom: 0;
      left: 50%;
      transform-origin: 0 50%;
      transform: rotate(270deg);
      font-size: 12px !important;
      font-weight: 700 !important;
    }
  }
  // .rating-option {
  //   height: auto;
  //   display: flex;
  //   justify-content: center;
  //   align-items: center;

  //   label {
  //     font-size: 12px !important;
  //     font-weight: 700 !important;
  //     position: unset;
  //     transform: unset;
  //   }
  // }

  .topic-item {
    grid-template-columns: 40px 50% 40px 40px 40px 40px auto !important;
  }
}
.chk-radio {
  justify-content: center !important;
}
</style>