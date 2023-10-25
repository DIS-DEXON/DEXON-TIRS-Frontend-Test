<template>
  <div class="popup-wrapper">
    <!-- v-closable="{handler:'hide'}" -->
    <div class="popup-card" style="max-width: 90%;">
      <div class="popup-header" style="justify-content: space-between;padding-right:20px">
        <label>Picture Log</label>
        <v-ons-toolbar-button @click="CANCEL">
          <i class="fa-solid fa-x" style="font-size:14px"></i>
        </v-ons-toolbar-button>
      </div>
      <div class="popup-content form" style>
        <div class="form-item-container">
          <!--<label>{{ insp_record.id_inspection_record }}</label>-->
          <div style="grid-column:span 3">
            <DxDataGrid
              id="data-grid-pic-log"
              key-expr="id_visual"
              :data-source="dataList"
              :element-attr="dataGridAttributes"
              :hover-state-enabled="true"
              :allow-column-reordering="true"
              :show-borders="true"
              :show-row-lines="true"
              :row-alternation-enabled="false"
              @row-inserted="CREATE_DWG"
              @row-updated="UPDATE_DWG"
              @editing-start="EDITING_START_DWG"
              @init-new-row="INIT_NEW_ROW_DWG"
              @row-removing="REMOVING"
              @saved="SAVE"
            >
              <DxEditing :allow-updating="true" :allow-adding="true" :use-icons="true" mode="form">
                <DxForm label-location="top">
                  <DxItem :col-count="2" :col-span="2" item-type="group">
                    <DxItem data-field="file_path_1" :col-span="1" />
                    <DxItem data-field="file_path_2" :col-span="1" />
                    <DxItem data-field="finding" editor-type="dxTextArea" :col-span="2" />
                    <DxItem data-field="recommendation" editor-type="dxTextArea" :col-span="2" />
                  </DxItem>
                </DxForm>
              </DxEditing>

              <DxColumn
                data-field="file_path_1"
                caption="Overview"
                cell-template="dwg-img"
                edit-cell-template="dwg-img-editor1"
                :visible="0"
              />
              <DxColumn
                data-field="file_path_2"
                caption="Close-up view"
                cell-template="dwg-img"
                edit-cell-template="dwg-img-editor2"
                :visible="0"
              />

              <DxColumn
                data-field="finding"
                caption="Finding"
                cell-template="dxTextArea"
                :editor-options="findingInputOptions"
                :visible="0"
              />

              <DxColumn
                data-field="recommendation"
                caption="Recommendation"
                cell-template="dxTextArea"
                :editor-options="recInputOptions"
                :visible="0"
              />

              <DxColumn caption="Picture Log" cell-template="picture-log-template" />

              <template #picture-log-template="{ data }">
                <div>
                  <div style="display: flex;">
                    <div>
                      <div class="header-custom-field">Overview</div>
                      <a
                        :href="baseURL + data.data.file_path_1"
                        download="dwg"
                        target="_blank"
                        v-if="data.data.file_path_1 != ''"
                      >
                        <img
                          :src="baseURL + data.data.file_path_1"
                          width="300"
                          height="200"
                          style="border: 1px solid #140a4b;"
                        />
                      </a>

                      <img
                        src="http://tmt-solution.com/public/image-empty.png"
                        width="300"
                        height="200"
                        v-if="data.data.file_path_1 == ''"
                      />
                    </div>
                    <div style="margin-left: 10px;">
                      <div class="header-custom-field">Close-up view</div>
                      <a
                        :href="baseURL + data.data.file_path_2"
                        download="dwg"
                        target="_blank"
                        v-if="data.data.file_path_2 != ''"
                      >
                        <img
                          :src="baseURL + data.data.file_path_2"
                          width="300"
                          height="200"
                          style="border: 1px solid #140a4b;"
                        />
                      </a>

                      <img
                        src="http://tmt-solution.com/public/image-empty.png"
                        width="300"
                        height="200"
                        v-if="data.data.file_path_2 == ''"
                      />
                    </div>
                  </div>

                  <div>
                    <div>
                      <div class="header-custom-field">Finding</div>
                      <DxTextArea
                        height="100%"
                        :width="610"
                        :read-only="true"
                        :value="data.data.finding"
                      />
                    </div>
                    <div style="margin-top: 5px;">
                      <div class="header-custom-field">Recommendation</div>
                      <DxTextArea
                        height="100%"
                        :width="610"
                        :read-only="true"
                        :value="data.data.recommendation"
                      />
                    </div>
                  </div>
                </div>
              </template>

              <template #dwg-img="{ data }">
                <div style="position: relative">
                  <a
                    :href="baseURL + data.value"
                    download="dwg"
                    target="_blank"
                    v-if="data.value != ''"
                  >
                    <img :src="baseURL + data.value" width="300" height="200" />
                    <br />
                  </a>

                  <img
                    src="http://tmt-solution.com/public/image-empty.png"
                    width="300"
                    height="200"
                    v-if="data.value == ''"
                  />
                </div>
              </template>

              <template #dwg-img-editor1="{ data }">
                <div>
                  <img
                    :src="baseURL + data.value"
                    width="300"
                    height="200"
                    v-if="imgDwg1 != '' && isInitEdit_1 == 0"
                  />
                  <img
                    :src="imgDwg1"
                    width="300"
                    height="200"
                    v-if="imgDwg1 != '' && isInitEdit_1 == 1"
                  />
                  <img
                    src="http://tmt-solution.com/public/image-empty.png"
                    width="300"
                    height="200"
                    v-if="imgDwg1 == ''"
                  />
                  <div style="position:relative;">
                    <DxFileUploader
                      select-button-text="Select photo"
                      label-text
                      accept="image/*"
                      upload-mode="useForm"
                      :showFileList="false"
                      @value-changed="ON_DWG_CHANGE_1"
                      style="position:absolute;"
                    />

                    <DxButtons
                      :width="120"
                      text="Delete"
                      type="normal"
                      styling-mode="contained"
                      @click="DEL_PIC(1)"
                      style="position:absolute; left:130px;"
                    />
                  </div>
                </div>
              </template>
              <template #dwg-img-editor2="{ data }">
                <div>
                  <img
                    :src="baseURL + data.value"
                    width="300"
                    height="200"
                    v-if="imgDwg2 != '' && isInitEdit_2 == 0"
                  />

                  <img
                    :src="imgDwg2"
                    width="300"
                    height="200"
                    v-if="imgDwg2 != '' && isInitEdit_2 == 1"
                  />

                  <img
                    src="http://tmt-solution.com/public/image-empty.png"
                    width="300"
                    height="200"
                    v-if="imgDwg2 == ''"
                  />

                  <div style="position:relative; height:50px;">
                    <DxFileUploader
                      select-button-text="Select photo"
                      label-text
                      accept="image/*"
                      upload-mode="useForm"
                      :showFileList="false"
                      @value-changed="ON_DWG_CHANGE_2"
                      style="position:absolute;"
                    />

                    <DxButtons
                      :width="120"
                      text="Delete"
                      type="normal"
                      styling-mode="contained"
                      @click="DEL_PIC(2)"
                      style="position:absolute; left:130px;"
                    />
                  </div>
                </div>
              </template>

              <template #dxTextArea="{ data }">
                <div>
                  <DxTextArea :height="200" :read-only="true" :value="data.value" />
                </div>
              </template>
              <DxColumn type="buttons">
                <DxButton name="edit" hint="Edit" icon="edit" />
                <DxButton name="delete" hint="Delete" icon="trash" @click="DEL_ONCLICK" />
                <DxButton name="info" hint="Delete" icon="trash" :on-click="DEL_ONCLICK" />
              </DxColumn>
              <!-- Configuration goes here -->
              <!-- <DxFilterRow :visible="true" /> -->
              <DxScrolling mode="standard" />
              <DxSearchPanel :visible="true" />
              <DxPaging :page-size="10" :page-index="0" />
              <DxPager
                :show-page-size-selector="true"
                :allowed-page-sizes="[5, 10, 20]"
                :show-navigation-buttons="true"
                :show-info="true"
                info-text="Page {0} of {1} ({2} items)"
              />
              <DxExport :enabled="false" />
            </DxDataGrid>
          </div>
        </div>
      </div>
      <div class="popup-content loading-section">
        <contentLoading text="Loading, please wait..." color="#fc9b21" v-if="false" />
      </div>
      <div class="popup-footer" style="z-index:999">
        <div class="button-set">
          <!-- <button class="blue" v-on:click="SAVE()">
            <label>Save</label>
          </button>-->
          <button class="grey" v-on:click="CANCEL()">
            <label>Close</label>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

  <script>
// import Vue from "vue";
// let handleOutsideClick;
// Vue.directive("closable", {
//   bind(el, binding, vnode) {
//     // Here's the click/touchstart handler
//     // (it is registered below)
//     handleOutsideClick = e => {
//       e.stopPropagation();
//       // Get the handler method name and the exclude array
//       // from the object used in v-closable

//       const { handler } = binding.value;

//       if (!el.contains(e.target)) {
//         // If the clicked element is outside the dialog
//         // then call the outside-click handler
//         // from the same component this directive is used in
//         vnode.context[handler](e);
//       }
//     };
//     // Register click/touchstart event listeners on the whole page
//     setTimeout(() => {
//       document.addEventListener("click", handleOutsideClick);
//       document.addEventListener("touchstart", handleOutsideClick);
//     }, 1000);
//   },
//   unbind() {
//     // If the element that has v-closable is removed, then
//     // unbind click/touchstart listeners from the whole page
//     document.removeEventListener("click", handleOutsideClick);
//     document.removeEventListener("touchstart", handleOutsideClick);
//   }
// });

//FileUpload
// import Vue from "vue";
import { DxFileUploader } from "devextreme-vue/file-uploader";
//import { DxButton } from 'devextreme-vue/button';
import { DxItem } from "devextreme-vue/form";
import axios from "/axios.js";
import contentLoading from "@/components/app-structures/app-content-loading.vue";
// import moment from "moment";
import "devextreme/dist/css/dx.light.css";
import DxTextArea from "devextreme-vue/text-area";
import DxButtons from "devextreme-vue/button";
import {
  DxDataGrid,
  DxSearchPanel,
  DxPaging,
  DxPager,
  DxScrolling,
  DxColumn,
  DxExport,
  DxEditing,
  // DxPopup,
  DxForm,
  DxButton
} from "devextreme-vue/data-grid";

export default {
  // directives: {
  //   "click-outside": {
  //     bind(el, binding, vnode) {
  //       handleOutsideClick = e => {
  //         e.stopPropagation();
  //         const { handler } = binding.value;

  //         if (!el.contains(e.target)) {
  //           vnode.context[handler]();
  //         }
  //       };
  //       document.addEventListener("click", handleOutsideClick);
  //       document.addEventListener("touchstart", handleOutsideClick);
  //     },
  //     unbind() {
  //       document.removeEventListener("click", handleOutsideClick);
  //       document.removeEventListener("touchstart", handleOutsideClick);
  //     }
  //   }
  // },

  name: "pictureLog",
  components: {
    contentLoading,
    DxButtons,
    DxDataGrid,
    DxSearchPanel,
    DxPaging,
    DxPager,
    DxScrolling,
    DxColumn,
    DxExport,
    DxEditing,
    DxForm,
    DxTextArea,
    DxButton,
    DxFileUploader,
    // DxPopup,
    DxItem
  },
  props: {
    insp_record: Object,
    id_result: Number,
    chk_type: String
  },
  created() {
    this.VIEW_ITEM();
    this.opened = true;
    console.log("popup pictureLog created");
    console.log(this.id_result);
  },
  // mounted() {
  //   setTimeout(() => {
  //     document.addEventListener("click", this.CLICK_OUTSIDE);
  //     document.addEventListener("touchstart", this.CLICK_OUTSIDE);
  //   }, 1000);
  // },
  // beforeDestroy() {
  //   document.removeEventListener("click", this.CLICK_OUTSIDE);
  //   document.removeEventListener("touchstart", this.CLICK_OUTSIDE);
  // },

  data() {
    return {
      opened: false,
      dataList: [],
      isLoading: false,
      imgDwg1: "",
      imgDwg2: "",
      file_path_1: "",
      file_path_2: "",
      file_path_1_tmp: "",
      file_path_2_tmp: "",
      file1: [],
      file2: [],
      isInitEdit_1: 0,
      isInitEdit_2: 0,
      id_inspection_record: this.insp_record.id_inspection_record,
      isAdd: 0,
      isRemove: 0,
      current_view: {},
      inspection_date: "",
      dataGridAttributes: {
        class: "data-grid-custom-style"
      },
      popUpWidth: 0,
      pictureLog: "",
      pagePanelHiding: false,
      findingInputOptions: { placeholder: "Enter finding ..." },
      recInputOptions: { placeholder: "Enter recommendation ..." },
      is_changed_dwg_1: 0,
      is_changed_dwg_2: 0
    };
  },
  computed: {
    baseURL() {
      var mode = this.$store.state.mode;
      if (mode == "dev") return this.$store.state.modeURL.dev;
      else if (mode == "prod") return this.$store.state.modeURL.prod;
      else return console.log("develpment mode set up incorrect.");
    }
  },
  methods: {
    hide() {
      if (this.opened) {
        console.log("inhide");
        this.$emit("close-popup");
      }
    },
    handle(event) {
      console.log("clicked out side");
      const popupWrapper = this.$el.querySelector(".popup-wrapper");
      const popupCard = this.$el.querySelector(".popup-card");
      // Check if the click event target is outside the popup container
      if (
        !popupCard.contains(event.target) &&
        popupWrapper.contains(event.target)
      ) {
        this.$emit("close-popup");
      }
    },
    CLICK_OUTSIDE(e) {
      // const popupWrapper = this.$el.querySelector(".popup-wrapper");
      const popupCard = this.$el.querySelector(".popup-card");
      // const dxTable = this.$el.querySelector(".dx-overlay-wrapper");
      console.log(this.dxElement);
      // console.log(popupCard);
      console.warn(e.target);
      if (!popupCard.contains(e.target)) {
        return this.$emit("close-popup");
      }

      // if (
      //   !popupCard.contains(event.target) &&
      //   popupWrapper.contains(event.target)
      // ) {
      //   console.log("clicked out side");
      // }
    },
    VIEW_ITEM() {
      // const item = this.insp_record;
      axios({
        method: "get",
        url:
          "visual-report/get-visual-report-by-chk-id?id_chk=" +
          this.id_result +
          "&chk_type=" +
          this.chk_type,
        headers: {
          Authorization: "Bearer " + JSON.parse(localStorage.getItem("token"))
        },
        data: {}
      })
        .then(res => {
          if (res.status == 200 && res.data) {
            this.dataList = res.data;
          }
        })
        .catch(error => {
          console.log(error);
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
    CREATE_DWG(e) {
      console.log("CREATE_DWG");
      const user = JSON.parse(localStorage.getItem("user"));
      var formData = new FormData();
      formData.append("id_visual", 0);
      formData.append("id_tag", this.$route.params.id_tag);
      formData.append("id_inspection_record", this.id_inspection_record);
      formData.append("id_chk", this.id_result);
      formData.append("chk_type", this.chk_type);
      formData.append(
        "inspection_date",
        this.current_view.inspection_date ?? ""
      );
      formData.append("finding", e.data.finding ?? "");
      formData.append("recommendation", e.data.recommendation ?? "");
      formData.append("file_1", this.file1);
      formData.append("file_2", this.file2);
      formData.append("file_path_1", "");
      formData.append("file_path_2", "");
      formData.append("created_by", user.id_account ?? 0);
      formData.append("updated_by", user.id_account ?? 0);

      axios({
        method: "post",
        url: "visual-report/add-visual-record",
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: "Bearer " + JSON.parse(localStorage.getItem("token"))
        },
        data: formData
      })
        .then(res => {
          if (res.status == 201 && res.data) {
            this.VIEW_ITEM(this.current_view);
          }
        })
        .catch(error => {
          console.log(error);
        })
        .finally(() => {
          this.isLoading = false;
          this.is_changed_dwg_1 = 0;
          this.is_changed_dwg_2 = 0;
        });
    },
    UPDATE_DWG(e) {
      const user = JSON.parse(localStorage.getItem("user"));
      var formData = new FormData();
      formData.append("id_visual", e.data.id_visual);
      formData.append("id_tag", this.$route.params.id_tag);
      formData.append("id_chk", e.data.id_chk);
      formData.append("chk_type", e.data.chk_type);
      formData.append(
        "id_inspection_record",
        this.insp_record.id_inspection_record
      );
      formData.append(
        "inspection_date",
        this.insp_record.inspection_date ?? ""
      );
      formData.append("finding", e.data.finding ?? "");
      formData.append("recommendation", e.data.recommendation ?? "");
      formData.append("file_1", this.file1);
      formData.append("file_2", this.file2);
      formData.append("file_path_1", this.file_path_1_tmp ?? "");
      formData.append("file_path_2", this.file_path_2_tmp ?? "");
      formData.append("created_by", e.data.created_by);
      formData.append("updated_by", user.id_account);
      axios({
        method: "put",
        url: "visual-report/" + e.data.id_visual,
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: "Bearer " + JSON.parse(localStorage.getItem("token"))
        },
        data: formData
      })
        .then(res => {
          if (res.status == 204) {
            this.file_path_1 = "";
            this.file_path_2 = "";
            this.VIEW_ITEM(this.current_view);
          }
        })
        .catch(error => {
          console.log(error);
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
    DELETE_DWG(e) {
      console.log(e);
      axios({
        method: "delete",
        url: "visual-report/delete-visual-report",
        headers: {
          Authorization: "Bearer " + JSON.parse(localStorage.getItem("token"))
        },
        data: {
          id_visual: e.row.key
        }
      })
        .then(res => {
          console.log(res);
          if (res.status == 200 && res.data) {
            console.log(res.data);
            // this.VIEW_DWG(this.id_inspection_record, this.inspection_date);
            this.VIEW_ITEM(this.current_view);
            this.opened = true;
          }
        })
        .catch(error => {
          console.log(error);
        })
        .finally(() => {
          this.opened = true;
          this.isLoading = false;
        });
    },
    ON_DWG_CHANGE_1(e) {
      console.log(e);
      let reader = new FileReader();
      reader.readAsDataURL(e.value[0]);
      reader.onload = () => {
        this.imgDwg1 = reader.result;
      };
      this.file1 = e.value[0];
      //this.file_path_1 = this.file_path_1_tmp;
      this.isInitEdit_1 = 1;
      this.is_changed_dwg_1 = 1;
    },
    ON_DWG_CHANGE_2(e) {
      console.log(e);
      let reader = new FileReader();
      reader.readAsDataURL(e.value[0]);
      reader.onload = () => {
        this.imgDwg2 = reader.result;
      };
      this.file2 = e.value[0];
      //this.file_path_2 = this.file_path_2_tmp;
      this.isInitEdit_2 = 1;
      this.is_changed_dwg_2 = 1;
    },
    EDITING_START_DWG(e) {
      console.log("EDITING_START_DWG");
      console.log(e);
      this.pictureLog = e;
      this.imgDwg1 = e.data.file_path_1;
      this.imgDwg2 = e.data.file_path_2;
      this.file_path_1_tmp = e.data.file_path_1;
      this.file_path_2_tmp = e.data.file_path_2;
      this.file1 = [];
      this.file2 = [];
      this.isInitEdit_1 = 0;
      this.isInitEdit_2 = 0;
      this.isAdd = 0;
      this.isRemove = 0;
      this.popUpWidth = this.CHECK_SCREEN("w");
    },
    INIT_NEW_ROW_DWG(e) {
      console.log("INIT_NEW_ROW_DWG");
      console.log(e);
      this.imgDwg1 = "";
      this.imgDwg2 = "";
      this.file1 = [];
      this.file2 = [];
      this.isInitEdit_1 = 1;
      this.isInitEdit_2 = 1;
      this.isAdd = 1;
      this.popUpWidth = this.CHECK_SCREEN("w");
    },
    REMOVING() {
      this.isRemove = 1;
    },
    DEL_ONCLICK(e) {
      this.opened = false;
      this.$ons.notification
        .confirm("Are you sure you want to delete this record?")
        .then(res => {
          if (res == 1) {
            this.DELETE_DWG(e);
          } else {
            this.opened = true;
          }
        });
    },
    IS_VISIBLE_ADD() {
      if (this.id_inspection_record == 0) {
        return false;
      } else {
        return true;
      }
    },
    CHECK_SCREEN(e) {
      if (e == "w") {
        var sc_width = window.innerWidth;
        if (sc_width <= 500) {
          return sc_width / 1.1;
        } else {
          return sc_width / 1.1;
        }
      } else if (e == "h") {
        var sc_height = window.innerHeight;
        return sc_height / 1.1;
      }
    },
    DEL_PIC(seq) {
      if (seq == 1) {
        this.imgDwg1 = "";
        this.file_path_1_tmp = "";
        this.is_changed_dwg_1 = 1;
        //this.file_path_1 = this.file_path_1_tmp;
      } else if (seq == 2) {
        this.imgDwg2 = "";
        this.file_path_2_tmp = "";
        this.is_changed_dwg_2 = 1;
        //this.file_path_2 = this.file_path_2_tmp;
      }
    },
    SAVE(e) {
      console.log(e);
      if (e.changes.length >= 0 && this.isAdd == 0 && this.isRemove == 0) {
        this.UPDATE_DWG(this.pictureLog);
      }
    },
    CANCEL() {
      this.$emit("close-popup");
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/style/main.scss";

.form-item-container {
  width: auto;
  display: grid;
  grid-template-columns: repeat(3, 300px);
  grid-gap: 10px;
  height: 100%;
}

.dx-icon {
  font-size: 24px;
  color: blue;
}

hr {
  grid-column: span 4 / auto;
  margin-top: 10px;
}

.form .label-box {
  margin: 0 !important;
}

.section-text {
  grid-column: span 3;
}

.loading-section {
  height: 100%;
  margin-top: -51px;
  padding: 0;
  width: 350px;
  .app-content-loading {
    top: 51px;
    left: 0;
    height: calc(100% - 51px);
  }
}

.tab-wrapper {
  margin: -20px -20px 10px -20px;
}
.vue-tabs-chrome .tabs-footer {
  height: 0;
  background-color: #fff;
}
</style>