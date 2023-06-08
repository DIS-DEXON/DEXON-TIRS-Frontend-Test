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
        <div class="section-label header-label">
          <label>No.</label>
        </div>
        <div class="section-label header-label">
          <label>Description</label>
        </div>
        <!-- <div class="section-label rating-label" style="grid-column: span 3">
          <label style="width: 100%; text-align: center">Rating</label>
        </div>-->

        <div class="section-label rating-option">
          <label>ผ่าน</label>
        </div>
        <div class="section-label rating-option">
          <label>ไม่ผ่าน</label>
        </div>
        <div class="section-label rating-option">
          <label>N/A</label>
        </div>
        <div class="section-label comment-label">
          <label>Comments:</label>
        </div>
        <!-- LOOP DISPLAY SUB HEADER -->
        <div
          class="topic-item"
          v-for="item3 in checklistInfo"
          :key="item3.id"
          style="grid-column:span 6"
        >
          <div class="form-item-value label-align-center">
            <label>{{ item3.no }}</label>
          </div>
          <div class="form-item-value">
            <label>{{ item3.header_content }}</label>
          </div>
          <div class="form-item-value chk-radio">
            <input
              type="radio"
              value="Pass"
              :name="item3.id"
              v-model="item3.result[0].result_desc"
              v-on:click="
                  UPDATE_RESULT(item3.result[0], 'Pass', item3.result[0].comments)
                "
            />
          </div>
          <div class="form-item-value chk-radio">
            <input
              type="radio"
              value="NotPass"
              :name="item3.id"
              v-model="item3.result[0].result_desc"
              v-on:click="
                  UPDATE_RESULT(item3.result[0], 'NotPass', item3.result[0].comments)
                "
            />
          </div>
          <div class="form-item-value chk-radio">
            <input
              type="radio"
              value="NA"
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
              style="min-height: auto; padding: 0;width:100%"
              v-model="item3.result[0].comments"
              @focusout="UPDATE_RESULT(
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
</template>

<script>
//API
import axios from "/axios.js";
import "@fortawesome/fontawesome-free/css/all.css";

export default {
  name: "checklist-by-law",
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
  created() {},
  methods: {
    UPDATE_RESULT(item, new_result_desc, comment) {
      console.log("==> RESULT UPDATE START");
      this.formData.id = item.id;
      this.formData.result_desc = new_result_desc;
      this.formData.comments = comment;
      axios({
        method: "put",
        url: "chk-by-law/edit-chkbylaw-1",
        headers: {
          Authorization: "Bearer " + JSON.parse(localStorage.getItem("token"))
        },
        data: this.formData
      })
        .then(res => {
          if (res.status == 200 && res.data) {
            console.log("==> RESULT UPDATED (by law)");
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
  grid-template-columns: 40px 60% 40px 40px 40px auto !important;
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
    grid-template-columns: 40px 60% 40px 40px 40px auto !important;
  }
}
.chk-radio {
  justify-content: center !important;
}
</style>