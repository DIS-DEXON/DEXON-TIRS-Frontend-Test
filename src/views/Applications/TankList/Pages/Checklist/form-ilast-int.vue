<template>
  <div class="report-sheet checklist-sheet">
    <div class="report-container">
      <div class="sheet-header">
        <div class="logo"><img src="/img/logo.png" /></div>
        <div class="title">ILAST Internal Inspection Checklist</div>
        <div class="docno"></div>
      </div>
      <div class="sheet-body" v-for="item in checklistInfo" :key="item.id">
        <div class="section-label">
          <label>{{ item.no + ".0" }}</label>
        </div>
        <div class="section-label header-label" style="grid-column: span 2">
          <label> {{ item.header_content }}</label>
        </div>
        <!-- <div class="section-label rating-label" style="grid-column: span 3">
          <label style="width: 100%; text-align: center">Rating</label>
        </div> -->

        <div class="section-label rating-option">
          <label style="padding-left: 5px">E</label>
        </div>
        <div class="section-label rating-option">
          <label>OK</label>
        </div>
        <div class="section-label rating-option">
          <label>NA</label>
        </div>
        <div class="section-label comment-label">
          <label>Comments:</label>
        </div>
        <!-- LOOP DISPLAY SUB HEADER -->
        <div
          v-for="item2 in item.sub_header"
          :key="item2.id"
          style="grid-column: span 7"
        >
          <div class="topic-label">
            <div class="section-label subheader-label label-align-center">
              <label>{{ item2.no }}</label>
            </div>
            <div class="section-label subheader-label">
              <label>{{ item2.subheader_content }}</label>
            </div>
          </div>
          <div class="topic-item" v-for="item3 in item2.topic" :key="item3.id">
            <div class="form-item-value">
              <label></label>
            </div>
            <div class="form-item-value label-align-center">
              <label>{{ item3.no }}</label>
            </div>
            <div class="form-item-value">
              <label>{{ item3.topic }}</label>
            </div>
            <div class="form-item-value">
              <input
                type="radio"
                value="E"
                :name="item3.id"
                v-model="item3.result[0].result_desc"
                v-on:click="
                  UPDATE_RESULT(item3.result[0], 'E', item3.result[0].comments)
                "
              />
            </div>
            <div class="form-item-value">
              <input
                type="radio"
                value="OK"
                :name="item3.id"
                v-model="item3.result[0].result_desc"
                v-on:click="
                  UPDATE_RESULT(item3.result[0], 'OK', item3.result[0].comments)
                "
              />
            </div>
            <div class="form-item-value">
              <input
                type="radio"
                value="
                NA"
                :name="item3.id"
                v-model="item3.result[0].result_desc"
                v-on:click="
                  UPDATE_RESULT(item3.result[0], 'NA', item3.result[0].comments)
                "
              />
            </div>
            <div class="form-item-value">
              <textarea
                placeholder="comment..."
                style="min-height: auto; padding: 0"
                v-model="item3.result[0].comments"
                @focusout="
                  UPDATE_RESULT(
                    item3.result[0],
                    item3.result[0].result_desc,
                    item3.result[0].comments
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
  name: "checklist-ilast-ext",
  props: {
    checklistInfo: Array,
  },
  data() {
    return {
      formData: {
        id: null,
        result_desc: null,
        comments: null,
      },
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
        url: "chk-ilast-in/edit-chkilastin",
        headers: {
          Authorization: "Bearer " + JSON.parse(localStorage.getItem("token")),
        },
        data: this.formData,
      })
        .then((res) => {
          if (res.status == 200 && res.data) {
            console.log("==> RESULT UPDATED (internal)");
          }
        })
        .catch((error) => {
          console.log(error);
          this.$ons.notification.alert(
            "Update Failed!<br/>Please try again later"
          );
        })
        .finally(() => {});
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/style/main.scss";
.sheet-body {
  grid-template-columns: 40px 40px 60% 40px 40px 40px auto !important;
  .topic-label {
    grid-template-columns: 40px auto;
  }
  .rating-option {
    height: auto;
    display: flex;
    justify-content: center;
    align-items: center;

    label {
      font-size: 12px !important;
      font-weight: 700 !important;
      position: unset;
      transform: unset;
    }
  }

  .topic-item {
    grid-template-columns: 40px 40px 60% 40px 40px 40px auto !important;
  }
}
</style>