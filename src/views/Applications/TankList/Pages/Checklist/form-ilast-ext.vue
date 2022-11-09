<template>
  <div class="report-sheet checklist-sheet">
    <div class="report-container">
      <div class="sheet-header">
        <div class="logo"><img src="/img/logo.png" /></div>
        <div class="title">ILAST External Inspection Checklist Form</div>
        <div class="docno"></div>
      </div>
      <div class="sheet-body" v-for="item in checklistInfo" :key="item.id">
        <div class="section-label header-label">
          <label>{{ item.no }}.0 {{ item.header_content }}</label>
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
          style="grid-column: span 5"
        >
          <div class="section-label subheader-label">
            <label>{{ item2.subheader_content }}</label>
          </div>
          <div class="topic-item" v-for="item3 in item2.topic" :key="item3.id">
            <div class="form-item-value">
              <label>{{ item3.topic }}</label>
            </div>
            <div class="form-item-value">
              <input type="radio" value="E" :name="item3.id" />
            </div>
            <div class="form-item-value">
              <input type="radio" value="OK" :name="item3.id" />
            </div>
            <div class="form-item-value">
              <input
                type="radio"
                value="
                NA"
                :name="item3.id"
              />
            </div>
            <div class="form-item-value">
              <textarea
                placeholder="comment..."
                style="min-height: auto; padding: 0"
              />
            </div>
          </div>
        </div>
        <div class="section-label subheader-label" style="grid-column: span 5">
          <label>Remarks and Recommendations:</label>
        </div>
        <div class="form-item-textarea" style="grid-column: span 5">
          <textarea placeholder="Type remarks and recommendations here..." />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "checklist-ilast-ext",
  props: {
    checklistInfo: Array,
  },
};
</script>

<style lang="scss" scoped>
@import "@/style/main.scss";
.sheet-body {
  grid-template-columns: 60% 40px 40px 40px auto !important;
  .rating-option {
    height: auto;
    display: flex;
    justify-content: center;
    align-items: center;

    label {
      position: unset;
      transform: unset;
    }
  }

  .topic-item {
    grid-template-columns: 60% 40px 40px 40px auto !important;
  }
}
</style>