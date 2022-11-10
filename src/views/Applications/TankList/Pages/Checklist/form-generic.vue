<template>
  <div class="report-sheet checklist-sheet">
    <div class="report-container">
      <div class="sheet-header">
        <div class="logo"><img src="/img/logo.png" /></div>
        <div class="title">Generic Checklist Form</div>
        <div class="docno"></div>
      </div>
      <div class="sheet-body" v-for="item in checklistInfo" :key="item.id">
        <div
          class="section-label header-label"
          style="grid-row: span 2; grid-column: span 2"
        >
          <label>{{ item.header_content }}</label>
        </div>
        <div class="section-label rating-label" style="grid-column: span 6">
          <label style="width: 100%; text-align: center">Rating</label>
        </div>
        <div class="section-label comment-label" style="grid-row: span 2">
          <label>Comments:</label>
        </div>
        <div class="section-label rating-option">
          <label style="padding-left: 5px">OK</label>
        </div>
        <div class="section-label rating-option">
          <label>Minor Observation</label>
        </div>
        <div class="section-label rating-option">
          <label>Evaluation Required</label>
        </div>
        <div class="section-label rating-option">
          <label>Monitoring Required</label>
        </div>
        <div class="section-label rating-option">
          <label>Not Acceptable</label>
        </div>
        <div class="section-label rating-option">
          <label>Not Applicable</label>
        </div>
        <!-- LOOP DISPLAY SUB HEADER -->
        <div
          v-for="item2 in item.sub_header"
          :key="item2.id"
          style="grid-column: span 9"
        >
          <div class="topic-label">
            <div
              class="section-label subheader-label"
              style="grid-column: span 2"
            >
              <label>{{ item2.subheader_content }}</label>
            </div>
          </div>
          <div class="topic-item" v-for="item3 in item2.topic" :key="item3.id">
            <div class="form-item-value label-align-center">
              <label>{{ item3.no }}</label>
            </div>
            <div class="form-item-value">
              <label>{{ item3.topic }}</label>
            </div>
            <div class="form-item-value">
              <input
                :id="item3.id"
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
                id="2"
                type="radio"
                value="Minor Observation"
                :name="item3.id"
                v-model="item3.result[0].result_desc"
                v-on:click="
                  UPDATE_RESULT(
                    item3.result[0],
                    'Minor Observation',
                    item3.result[0].comments
                  )
                "
              />
            </div>
            <div class="form-item-value">
              <input
                id="3"
                type="radio"
                value="Evaluation Required"
                :name="item3.id"
                v-model="item3.result[0].result_desc"
                v-on:click="
                  UPDATE_RESULT(
                    item3.result[0],
                    'Evaluation Required',
                    item3.result[0].comments
                  )
                "
              />
            </div>
            <div class="form-item-value">
              <input
                id="4"
                type="radio"
                value="Monitoring Required"
                :name="item3.id"
                v-model="item3.result[0].result_desc"
                v-on:click="
                  UPDATE_RESULT(
                    item3.result[0],
                    'Monitoring Required',
                    item3.result[0].comments
                  )
                "
              />
            </div>
            <div class="form-item-value">
              <input
                id="5"
                type="radio"
                value="Not Acceptable"
                :name="item3.id"
                v-model="item3.result[0].result_desc"
                v-on:click="
                  UPDATE_RESULT(
                    item3.result[0],
                    'Not Acceptable',
                    item3.result[0].comments
                  )
                "
              />
            </div>
            <div class="form-item-value">
              <input
                id="6"
                type="radio"
                value="Not Applicable"
                :name="item3.id"
                v-model="item3.result[0].result_desc"
                v-on:click="
                  UPDATE_RESULT(
                    item3.result[0],
                    'Not Applicable',
                    item3.result[0].comments
                  )
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
        <div class="topic-label" style="grid-column: span 9">
          <div
            class="section-label subheader-label"
            style="grid-column: span 2"
          >
            <label>Remarks and Recommendations:</label>
          </div>
        </div>
        <div class="form-item-textarea" style="grid-column: span 9">
          <textarea
            placeholder="Type remarks and recommendations here..."
            v-model="item.remark_desc"
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
</template>

<script>
//API
import axios from "/axios.js";

export default {
  name: "checklist-generic",
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
      formDataRemark: {
        id_header: null,
        remark_desc: null,
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
        url: "chk-generic/edit-chkgeneric",
        headers: {
          Authorization: "Bearer " + JSON.parse(localStorage.getItem("token")),
        },
        data: this.formData,
      })
        .then((res) => {
          if (res.status == 200 && res.data) {
            console.log("==> RESULT UPDATED (generic)");
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
    UPDATE_REMARK(item, new_remark) {
      console.log("==> REMARK UPDATE START");
      this.formDataRemark.id = item.id;
      this.formDataRemark.remark_desc = new_remark;
      axios({
        method: "put",
        url: "",
        headers: {
          Authorization: "Bearer " + JSON.parse(localStorage.getItem("token")),
        },
        data: this.formDataRemark,
      })
        .then((res) => {
          if (res.status == 200 && res.data) {
            console.log("==> REMARK UPDATED (generic)");
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
  grid-template-columns: 40px 40% 40px 40px 40px 40px 40px 40px auto !important;
  .topic-label {
    grid-template-columns: 40px auto;
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
    }
  }

  .topic-item {
    grid-template-columns: 40px 40% 40px 40px 40px 40px 40px 40px auto !important;
  }
}
</style>