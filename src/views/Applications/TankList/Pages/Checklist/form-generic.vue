<template>
  <div class="report-sheet checklist-sheet">
    <div class="report-container">
      <div class="sheet-header">
        <div class="logo">
          <img src="/img/logo.png" />
        </div>
        <div class="title">Generic Checklist</div>
        <div class="docno"></div>
      </div>
      <div class="sheet-body" v-for="item in checklistInfo" :key="item.id">
        <div class="section-label header-label" style="grid-row: span 2; grid-column: span 2">
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
        <div v-for="item2 in item.sub_header" :key="item2.id" style="grid-column: span 9">
          <div class="topic-label">
            <div class="section-label subheader-label" style="grid-column: span 2">
              <label>{{ item2.subheader_content }}</label>
            </div>
          </div>
          <div class="topic-item" v-for="item3 in item2.topic" :key="item3.id">
            <div class="form-item-value label-align-center">
              <label>{{ item3.no }}</label>
            </div>
            <div class="form-item-value">
              <label style="grid-column: span 2;">{{ item3.topic }}</label>
            </div>
            <div class="form-item-value chk-radio">
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
            <div class="form-item-value chk-radio">
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
            <div class="form-item-value chk-radio">
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
            <div class="form-item-value chk-radio">
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
            <div class="form-item-value chk-radio">
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
            <div class="form-item-value chk-radio">
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
                style="min-height: auto; padding: 0;width:100%"
                v-model="item3.result[0].comments"
                @focusout="
                  UPDATE_RESULT(
                    item3.result[0],
                    item3.result[0].result_desc,
                    item3.result[0].comments
                  )
                "
              />
              <div class="item-wrapper">
                <v-ons-toolbar-button
                  class="item"
                  style="padding:0;width:20px"
                  @click="TOGGLE_POPUP(item3)"
                >
                  <img src="/img/icon_sidebar/tank/checklist_visual.png" />
                </v-ons-toolbar-button>
                <v-ons-toolbar-button
                  class="item"
                  style="padding:0;width:20px"
                  @click="TOGGLE_POPUP_NOTE(item3.result[0])"
                >
                  <i class="fa-solid fa-pen-to-square" style="color:rgb(20,14,64);font-size:14px"></i>
                </v-ons-toolbar-button>
              </div>
            </div>
          </div>
        </div>
        <div class="topic-label" style="grid-column: span 9">
          <div class="section-label subheader-label" style="grid-column: span 2">
            <label>Remarks and Recommendations:</label>
          </div>
        </div>
        <div class="form-item-textarea" style="grid-column: span 9">
          <textarea
            placeholder="Type remarks and recommendations here..."
            v-model="item.remark_desc[0].remark"
            @focusout="
              UPDATE_REMARK(
                item.remark_desc[0],
                item.remark_desc[0].remark
              )
            "
          />
        </div>
      </div>
    </div>
    <pictureLog
      v-if="this.isPopupOpen"
      :id_result="this.id_result"
      :insp_record="this.record"
      :chk_type="'generic'"
      @close-popup="TOGGLE_POPUP"
    />
    <note v-if="this.isNoteOpen" :url="'/chk-generic/edit-chkgeneric-note?id='" @refresh="refresh" :item="note_item" :id="note_id" @closePopup="TOGGLE_POPUP_NOTE" />
  </div>
</template>

<script>
//API
import axios from "/axios.js";
import pictureLog from "@/views/Applications/TankList/Pages/Checklist/picturelog.vue";
import note from "@/views/Applications/TankList/Pages/Checklist/note.vue";
export default {
  name: "checklist-generic",
  components: {
    pictureLog,
    note
  },
  props: {
    checklistInfo: Array,
    refresh: Function,
    record: Object
  },
  data() {
    return {
      id_result: 0,
      isPopupOpen: false,
      isNoteOpen: false,
      note_id: 0,
      note_item: null,
      formData: {
        id: null,
        result_desc: null,
        comments: null
      },
      formDataRemark: {
        id_header: null,
        remark: null
      }
    };
  },
  created() {
    // console.warn(this.checklistInfo);
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
          Authorization: "Bearer " + JSON.parse(localStorage.getItem("token"))
        },
        data: this.formData
      })
        .then(res => {
          if (res.status == 200 && res.data) {
            console.log("==> RESULT UPDATED (generic)");
          }
        })
        .catch(error => {
          console.log(error);
          this.$ons.notification.alert(
            "Update Failed!<br/>Please try again later"
          );
        })
        .finally(() => {});
    },
    UPDATE_REMARK(item, new_remark) {
      console.log("==> REMARK UPDATE START");
      console.warn(item);
      this.formDataRemark.id_remark = item.id_remark;
      this.formDataRemark.id_header = item.id_header;
      this.formDataRemark.remark = new_remark;
      this.formDataRemark.id_insp_record = item.id_insp_record;
      axios({
        method: "put",
        url: "chk-generic/edit-remark",
        headers: {
          Authorization: "Bearer " + JSON.parse(localStorage.getItem("token"))
        },
        data: this.formDataRemark
      })
        .then(res => {
          if (res.status == 200 && res.data) {
            console.log("==> REMARK UPDATED (generic)");
          }
        })
        .catch(error => {
          console.log(error);
          this.$ons.notification.alert(
            "Update Failed!<br/>Please try again later"
          );
        })
        .finally(() => {});
    },
    TOGGLE_POPUP(i) {
      // console.warn(item3);
      this.id_result = i !== undefined ? i.result[0].id : 0;
      this.isPopupOpen = !this.isPopupOpen;
    },
    TOGGLE_POPUP_NOTE(item) {
      if (item) {
        this.note_id = item.id
        this.note_item = item
      } else {
        this.note_id = 0
        this.note_item = null
      }
      this.isNoteOpen = !this.isNoteOpen;
      // console.log(this.note_id)
    }
  }
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
.chk-radio {
  justify-content: center !important;
}
img {
  width: 18px;
  max-height: 18px;
  object-fit: contain;
}
.item-wrapper {
  display: flex !important;
  width: 100%;
  margin-left: 10px;
  justify-content: center !important;
  align-items: center;
}

.form-item-value {
  display: grid !important;
  grid-template-columns: 70% auto !important;
}
</style>