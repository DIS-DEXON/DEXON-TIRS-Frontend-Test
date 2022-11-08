<template>
  <div class="page-container">
    <div class="list-panel">
      <div class="column-header">Inspection Record</div>
      <DxList :data-source="inspRecordList">
        <template #item="{ data: item }">
          <div class="list-item-wrapper">
            <div class="contents">
              {{ DATE_FORMAT(item.inspection_date) }}<br />
              ID Campaign: {{ item.id_campaign }}
            </div>
            <div class="contents">
              <v-ons-toolbar-button
                class="btn"
                v-on:click="VIEW_CHECKLIST(item.id_inspection_record)"
                style="
                  width: 50px;
                  background-color: #f6f6f6;
                  color: #303030;
                  padding: 5px 0;
                  text-align: right;
                "
              >
                <i class="las la-search"></i>
              </v-ons-toolbar-button>
            </div>
          </div>
        </template>
      </DxList>
    </div>
    <div class="page-section">
      <div id="report-sheet">
        <div class="report-container">
          <div class="sheet-header">
            <div class="logo"><img src="/img/logo.png" /></div>
            <div class="title">Generic Checklist Form</div>
            <div class="docno"></div>
          </div>
          <div class="sheet-body" v-for="item in genericList" :key="item.id">
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
              <div
                class="topic-item"
                v-for="item3 in item2.topic"
                :key="item3.id"
              >
                <div class="form-item-value">
                  <label>{{ item3.topic }}</label>
                </div>
                <div class="form-item-value">
                  <input type="radio" value="OK" :name="item3.id" />
                </div>
                <div class="form-item-value">
                  <input
                    type="radio"
                    value="Minor Observation"
                    :name="item3.id"
                  />
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
            <div
              class="section-label subheader-label"
              style="grid-column: span 8"
            >
              <label>Remarks and Recommendations:</label>
            </div>
            <div class="form-item-textarea" style="grid-column: span 8">
              <textarea
                placeholder="Type remarks and recommendations here..."
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
import moment from "moment";

//Components

import "devextreme/dist/css/dx.light.css";
//DataGrid

//List
import { DxList } from "devextreme-vue/list";

export default {
  name: "ViewProjectList",
  components: {
    DxList,
  },
  created() {
    if (this.$store.state.status.server == true) {
      this.FETCH_INSP_RECORD();
      this.FETCH_GENERIC();
    }
  },
  data() {
    return {
      genericList: {},
      inspRecordList: {},
      tabCurrent: "generic",
      tabs: [
        {
          label: "Generic",
          key: "generic",
          closable: false,
        },
        {
          label: "ILAST External",
          key: "ilast-ext",
          closable: false,
        },
        {
          label: "ILAST Internal",
          key: "ilast-in",
          closable: false,
        },
      ],
      isLoading: false,
      rating_radio: "OK2",
    };
  },
  computed: {},
  methods: {
    FETCH_GENERIC() {
      this.isLoading = true;
      //var id_tag = this.$route.params.id_tag;
      axios({
        method: "post",
        url: "chk-generic/get-chkgeneric-by-insp-id",
        headers: {
          Authorization: "Bearer " + JSON.parse(localStorage.getItem("token")),
        },
        data: {
          id_insp_record: 0,
        },
      })
        .then((res) => {
          console.log("generic:");
          console.log(res);
          if (res.status == 200 && res.data) {
            this.genericList = res.data;
          }
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
    FETCH_INSP_RECORD() {
      this.isLoading = true;
      var id_tag = this.$route.params.id_tag;
      axios({
        method: "post",
        url: "insp-record/insp-record-by-tank-id",
        headers: {
          Authorization: "Bearer " + JSON.parse(localStorage.getItem("token")),
        },
        data: {
          id_tag: id_tag,
        },
      })
        .then((res) => {
          console.log("insp record:");
          console.log(res.data);
          if (res.status == 200 && res.data) {
            this.inspRecordList = res.data;
          }
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
    VIEW_CHECKLIST(id) {
      console.log(id);
    },
    DATE_FORMAT(d) {
      return moment(d).format("LL");
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/style/main.scss";

.page-container {
  height: calc(100vh - 139px);
  overflow-y: hidden;
  display: grid;
  grid-template-columns: 300px calc(100% - 300px);
  width: 100%;
  background-color: #d9d9d9;
}

.page-section {
  padding: 20px;
  overflow-y: scroll;
}
.page-section:last-child {
  padding-bottom: 20px;
}

.tab-wrapper {
  height: 48px;
}
.vue-tabs-chrome {
  padding-top: 10px;
  background-color: #d9d9d9;
  font-size: 14px;
}

.insp-record-header {
  font-size: 16px;
  padding: 10px;
  background-color: #140a4b;
  color: #fff;
}

.dx-list-item-content::before {
  content: none;
}

.page-section-label {
  font-size: 16px;
  padding: 10px;
  background-color: #140a4b;
  color: #fff;
  border: 1px solid #000;
}

#report-sheet {
  width: 100%;
  margin: 0 auto;
  border: 1px solid #000;
  box-shadow: none;
  .report-container {
    .sheet-header {
      padding-bottom: 0px;
      .logo {
        width: 120px;
        margin-left: 10px;
        img {
          width: 100%;
          height: 100%;
          object-fit: contain;
        }
      }
    }
    .sheet-body {
      grid-template-columns: 40% 40px 40px 40px 40px 40px 40px auto;
      .rating-option {
        position: relative;
        height: 70px;
        label {
          position: absolute;
          bottom: 0;
          left: 50%;
          transform-origin: 0 50%;
          transform: rotate(270deg);
          font-size: 10px;
          text-transform: capitalize;
          font-weight: 500;
        }
      }
      .header-label {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        label {
          font-size: 16px;
        }
      }
      .rating-label,
      .comment-label,
      .subheader-label {
        display: flex;
        justify-content: center;
        align-items: center;
        label {
          font-size: 12px;
          text-transform: capitalize;
        }
      }
      .comment-label {
        justify-content: flex-start;
      }

      .subheader-label {
        background-color: #d5d5d5;
        justify-content: flex-start;
        label {
          color: $web-font-color-black;
        }
      }

      .topic-item {
        display: grid;
        grid-template-columns: 40% 40px 40px 40px 40px 40px 40px auto;
        .form-item-value {
          grid-column: auto;
          border-width: 0.5px;
          label {
            text-transform: none;
          }
        }
      }
      // .section-label {
      //   background-color: #cbcbcb;
      //   label {
      //     color: #000;
      //   }
      // }
    }
  }
}
</style>