<template>
  <div class="report-sheet checklist-sheet">
    <div class="report-container">
      <div class="sheet-header">
        <div class="logo"><img src="/img/logo.png" /></div>
        <div class="title">Generic Checklist Form</div>
        <div class="docno"></div>
      </div>
      <div class="sheet-body" v-for="item in checklistInfo" :key="item.id">
        <div class="section-label header-label" style="grid-row: span 2">
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
          style="grid-column: span 8"
        >
          <div class="section-label subheader-label">
            <label>{{ item2.subheader_content }}</label>
          </div>
          <div class="topic-item" v-for="item3 in item2.topic" :key="item3.id">
            <div class="form-item-value">
              <label>{{ item3.topic }}</label>
            </div>
            <div class="form-item-value">
              <input type="radio" value="OK" :name="item3.id" />
            </div>
            <div class="form-item-value">
              <input type="radio" value="Minor Observation" :name="item3.id" />
            </div>
            <div class="form-item-value">
              <input
                type="radio"
                value="Evaluation Required"
                :name="item3.id"
              />
            </div>
            <div class="form-item-value">
              <input
                type="radio"
                value="Monitoring Required"
                :name="item3.id"
              />
            </div>
            <div class="form-item-value">
              <input type="radio" value="Not Acceptable" :name="item3.id" />
            </div>
            <div class="form-item-value">
              <input type="radio" value="Not Applicable" :name="item3.id" />
            </div>
            <div class="form-item-value">
              <textarea
                placeholder="comment..."
                style="min-height: auto; padding: 0"
              />
            </div>
          </div>
        </div>
        <div class="section-label subheader-label" style="grid-column: span 8">
          <label>Remarks and Recommendations:</label>
        </div>
        <div class="form-item-textarea" style="grid-column: span 8">
          <textarea placeholder="Type remarks and recommendations here..." />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "checklist-generic",
  props: {
    checklistInfo: Array,
  },
};
</script>

<style lang="scss" scoped>
@import "@/style/main.scss";
.sheet-body {
  grid-template-columns: 40% 40px 40px 40px 40px 40px 40px auto !important;
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
    grid-template-columns: 40% 40px 40px 40px 40px 40px 40px auto !important;
  }
}
</style>