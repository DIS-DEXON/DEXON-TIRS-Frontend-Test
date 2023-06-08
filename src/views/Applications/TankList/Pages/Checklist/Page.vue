<template>
  <div
    class="page-container"
    :class="[
      pagePanelHiding == false ? 'page-container' : 'page-container-hide',
    ]"
  >
    <InspectionRecordPanel @showHidePanel="SHOW_HIDE_PANEL" @viewItem="VIEW_ITEM" />
    <div id="page-container-view" class="list-page" v-if="this.id_inspection_record">
      <v-ons-list>
        <v-ons-list-header>
          Inspection Details of
          <b>{{ DATE_FORMAT(current_view.inspection_date) }}</b>
        </v-ons-list-header>
      </v-ons-list>
      <div v-if="isLoading == false">
        <div v-if="this.checklistList_existance.general == true">
          <checklistGeneric
            :checklistInfo="this.checklistList.generic"
            :record="this.current_view"
            v-if="this.checklistList.generic.length > 0"
          />
        </div>
        <div v-if="this.checklistList_existance.ilast_ext == true">
          <checklistIlastExt
            :checklistInfo="this.checklistList.ilast_ext"
            v-if="this.checklistList.ilast_ext.length > 0"
          />
        </div>
        <div v-if="this.checklistList_existance.ilast_int == true">
          <checklistIlastInt
            :checklistInfo="this.checklistList.ilast_int"
            v-if="this.checklistList.ilast_int.length > 0"
          />
        </div>
        <div v-if="this.checklistList_existance.by_law_i == true">
          <checklistByLawI :checklistInfo="this.chk_bylaw_i" />
        </div>
        <div v-if="this.checklistList_existance.by_law_ii == true">
          <checklistByLawII :checklistInfo="this.chk_bylaw_ii" />
        </div>
        <div
          class="center-box-wrapper"
          v-if="
            this.id_inspection_record != '' &&
            this.checklistList_existance.general == false &&
            this.checklistList_existance.ilast_ext == false &&
            this.checklistList_existance.ilast_int == false &&
            this.checklistList_existance.by_law_i == false &&
            this.checklistList_existance.by_law_ii == false
          "
        >
          <v-ons-toolbar-button v-on:click="CREATE_CHECKLIST()">
            <i class="las la-plus"></i>
            <span>Create New Checklist Form</span>
          </v-ons-toolbar-button>
        </div>
        <div class="center-box-wrapper" v-if="this.id_inspection_record == ''">
          <div class="page-content-message-wrapper">
            <i class="las la-search"></i>
            <span>
              Select inspection record
              <br />to view checklist sheet
            </span>
          </div>
        </div>
        <div
          class="hover-button-wrapper"
          v-if="
            this.checklistList.generic.length > 0 ||
            this.checklistList.ilast_ext.length > 0 ||
            this.checklistList.ilast_int.length > 0 ||
            this.chk_bylaw_i.length > 0 ||
            this.chk_bylaw_ii.length > 0
          "
        >
          <div class="btn-panel">
            <v-ons-toolbar-button class="btn" v-on:click="DELETE_CHECKLIST()">
              <i class="las la-trash"></i>
            </v-ons-toolbar-button>
            <v-ons-toolbar-button class="btn">
              <i class="las la-download"></i>
            </v-ons-toolbar-button>
          </div>
        </div>
      </div>
      <Loading v-if="isLoading == true" text="Loading" />
    </div>
    <SelectInspRecord v-if="this.id_inspection_record == ''" />
  </div>
</template> 

<script>
//API
import axios from "/axios.js";
import moment from "moment";

//Components
import Loading from "@/components/app-structures/app-loading.vue";
import "devextreme/dist/css/dx.light.css";
import checklistGeneric from "@/views/Applications/TankList/Pages/Checklist/form-generic.vue";
import checklistIlastExt from "@/views/Applications/TankList/Pages/Checklist/form-ilast-ext.vue";
import checklistIlastInt from "@/views/Applications/TankList/Pages/Checklist/form-ilast-int.vue";
import checklistByLawI from "@/views/Applications/TankList/Pages/Checklist/form-by-law-i.vue";
import checklistByLawII from "@/views/Applications/TankList/Pages/Checklist/form-by-law-ii.vue";
import InspectionRecordPanel from "@/views/Applications/TankList/Pages/inspection-record-panel.vue";
import SelectInspRecord from "@/components/select-insp-record.vue";

//DataGrid

export default {
  name: "ViewChecklistList",
  components: {
    checklistGeneric,
    checklistIlastExt,
    checklistIlastInt,
    Loading,
    InspectionRecordPanel,
    SelectInspRecord,
    checklistByLawI,
    checklistByLawII
  },
  data() {
    return {
      id_tag: this.$route.params.id_tag,
      id_checklist: this.$route.params.id_checklist,
      id_inspection_record: "",
      checklistList: {
        generic: [],
        ilast_ext: [],
        ilast_int: []
      },
      checklistList_existance: {
        general: false,
        ilast_ext: false,
        ilast_int: false,
        by_law_i: false,
        by_law_ii: false
      },
      inspRecordList: {},
      isLoading: false,
      campaignList: {},
      pagePanelHiding: false,
      current_view: {},
      chk_bylaw_i: [],
      chk_bylaw_ii: []
    };
  },
  computed: {
    currentPage() {
      var current_page = this.$route.params.id_checklist;
      if (current_page == 1) return "Generic Form";
      else if (current_page == 2) return "ILAST External Form";
      else if (current_page == 3) return "ILAST Internal Form";
      else if (current_page == 4) return "By Law I Form";
      else if (current_page == 5) return "By Law II Form";
      else return "";
    }
  },
  created() {
    this.$store.commit("UPDATE_CURRENT_PAGENAME", {
      subpageName: "Checklist",
      subpageInnerName: this.currentPage
    });
  },
  mounted() {},
  watch: {
    //triggered whenever the route path changes
    $route() {
      this.CLEAR_CURRENT_VIEW();
      this.id_checklist = this.$route.params.id_checklist;
      this.id_inspection_record = "";
      this.current_view = {};
      this.$store.commit("UPDATE_CURRENT_PAGENAME", {
        subpageName: "Checklist",
        subpageInnerName: this.currentPage
      });
    }
  },
  methods: {
    VIEW_ITEM(item) {
      // this.SCROLL_TOP("page-container-view");
      this.current_view = item;
      console.log("VIEW_ITEM: ");
      console.log(item);
      this.CLEAR_CURRENT_VIEW();
      this.id_inspection_record = item.id_inspection_record;
      this.checklistList_existance.by_law_i = false;
      this.checklistList_existance.by_law_ii = false;
      if (this.id_checklist == 1) {
        this.CHECK_EXIST_RESULT_GENERIC(item.id_inspection_record);
      } else if (this.id_checklist == 2) {
        this.CHECK_EXIST_RESULT_ILAST_EXT(item.id_inspection_record);
      } else if (this.id_checklist == 3) {
        this.CHECK_EXIST_RESULT_ILAST_INT(item.id_inspection_record);
      } else if (this.id_checklist == 4) {
        this.CHECK_EXIST_RESULT_BY_LAW(item.id_inspection_record);
      } else if (this.id_checklist == 5) {
        this.CHECK_EXIST_RESULT_BY_LAW_2(item.id_inspection_record);
      } else console.log("view checklist failed");
    },

    CREATE_CHECKLIST() {
      console.log(
        "==> CREATE NEW CHECKLIST SHEET: id_insp: " + this.id_inspection_record
      );
      var form = this.id_checklist;
      if (form == 1) {
        this.isLoading = true;
        axios({
          method: "post",
          url: "chk-generic/add-all-chkgeneric",
          headers: {
            Authorization: "Bearer " + JSON.parse(localStorage.getItem("token"))
          },
          data: {
            id_insp_record: this.id_inspection_record
          }
        })
          .then(res => {
            if (res.status == 200) {
              console.log(res.data);
              console.log("NEW CHECKLIST SHEET CREATED (generic)");
              this.VIEW_ITEM(this.current_view);
            }
          })
          .catch(error => {
            console.log(error);
          })
          .finally(() => {
            this.isLoading = false;
          });
      } else if (form == 2) {
        this.isLoading = true;
        axios({
          method: "post",
          url: "chk-ilast-ex/add-all-chkilastex",
          headers: {
            Authorization: "Bearer " + JSON.parse(localStorage.getItem("token"))
          },
          data: {
            id_insp_record: this.id_inspection_record
          }
        })
          .then(res => {
            if (res.status == 200) {
              console.log(res.data);
              console.log("NEW CHECKLIST SHEET CREATED (ilast ext)");
              this.VIEW_ITEM(this.current_view);
            }
          })
          .catch(error => {
            console.log(error);
          })
          .finally(() => {
            this.isLoading = false;
          });
      } else if (form == 3) {
        this.isLoading = true;
        axios({
          method: "post",
          url: "chk-ilast-in/add-all-chkilastin",
          headers: {
            Authorization: "Bearer " + JSON.parse(localStorage.getItem("token"))
          },
          data: {
            id_insp_record: this.id_inspection_record
          }
        })
          .then(res => {
            if (res.status == 200) {
              console.log(res.data);
              console.log("NEW CHECKLIST SHEET CREATED (ilast int)");
              this.VIEW_ITEM(this.current_view);
            }
          })
          .catch(error => {
            console.log(error);
          })
          .finally(() => {
            this.isLoading = false;
          });
      } else if (form == 4) {
        this.isLoading = true;
        axios({
          method: "post",
          url: "chk-by-law/add-all-chkbylaw-1",
          headers: {
            Authorization: "Bearer " + JSON.parse(localStorage.getItem("token"))
          },
          data: {
            id_insp_record: this.id_inspection_record
          }
        })
          .then(res => {
            if (res.status == 200) {
              console.log(res.data);
              console.log("NEW CHECKLIST SHEET CREATED (By Law )");
              this.VIEW_ITEM(this.current_view);
            }
          })
          .catch(error => {
            console.log(error);
          })
          .finally(() => {
            this.isLoading = false;
          });
      } else if (form == 5) {
        this.isLoading = true;
        axios({
          method: "post",
          url: "chk-by-law/add-all-chkbylaw-2",
          headers: {
            Authorization: "Bearer " + JSON.parse(localStorage.getItem("token"))
          },
          data: {
            id_insp_record: this.id_inspection_record
          }
        })
          .then(res => {
            if (res.status == 200) {
              console.log(res.data);
              console.log("NEW CHECKLIST SHEET CREATED (By Law II)");
              this.VIEW_ITEM(this.current_view);
            }
          })
          .catch(error => {
            console.log(error);
          })
          .finally(() => {
            this.isLoading = false;
          });
      } else {
        console.log("err: wrong form parameter");
      }
    },
    DELETE_CHECKLIST() {
      this.$ons.notification
        .confirm(
          "Confirm delete checklist sheet? <br/> This operation cannot be undone"
        )
        .then(res => {
          if (res == 1) {
            console.log("DELETE CHECKLIST SHEET: " + this.id_inspection_record);
            var form = this.id_checklist;
            if (form == 1) {
              this.isLoading = true;
              axios({
                method: "delete",
                url: "chk-generic/delete-chkgeneric-by-insp-id",
                headers: {
                  Authorization:
                    "Bearer " + JSON.parse(localStorage.getItem("token"))
                },
                data: {
                  id_insp_record: this.id_inspection_record
                }
              })
                .then(res => {
                  if (res.status == 200) {
                    console.log(res.data);
                    console.log("CHECKLIST SHEET DELETED (generic)");
                    this.CLEAR_CURRENT_VIEW();
                  }
                })
                .catch(error => {
                  console.log(error);
                })
                .finally(() => {
                  this.isLoading = false;
                });
            } else if (form == 2) {
              this.isLoading = true;
              axios({
                method: "delete",
                url: "chk-ilast-ex/delete-chkilastex-by-insp-id",
                headers: {
                  Authorization:
                    "Bearer " + JSON.parse(localStorage.getItem("token"))
                },
                data: {
                  id_insp_record: this.id_inspection_record
                }
              })
                .then(res => {
                  if (res.status == 200) {
                    console.log(res.data);
                    console.log("CHECKLIST SHEET DELETED (ilast ext)");
                    this.CLEAR_CURRENT_VIEW();
                  }
                })
                .catch(error => {
                  console.log(error);
                })
                .finally(() => {
                  this.isLoading = false;
                });
            } else if (form == 3) {
              this.isLoading = true;
              axios({
                method: "delete",
                url: "chk-ilast-in/delete-chkilastin-by-insp-id",
                headers: {
                  Authorization:
                    "Bearer " + JSON.parse(localStorage.getItem("token"))
                },
                data: {
                  id_insp_record: this.id_inspection_record
                }
              })
                .then(res => {
                  if (res.status == 200) {
                    console.log(res.data);
                    console.log("CHECKLIST SHEET DELETED (ilast int)");
                    this.CLEAR_CURRENT_VIEW();
                  }
                })
                .catch(error => {
                  console.log(error);
                })
                .finally(() => {
                  this.isLoading = false;
                });
            } else if (form == 4) {
              this.isLoading = true;
              axios({
                method: "delete",
                url: "chk-by-law/delete-chkbylaw-1-by-insp-id",
                headers: {
                  Authorization:
                    "Bearer " + JSON.parse(localStorage.getItem("token"))
                },
                data: {
                  id_insp_record: this.id_inspection_record
                }
              })
                .then(res => {
                  if (res.status == 200) {
                    console.log(res.data);
                    console.log("CHECKLIST SHEET DELETED (By Law)");
                    this.CLEAR_CURRENT_VIEW();
                  }
                })
                .catch(error => {
                  console.log(error);
                })
                .finally(() => {
                  this.isLoading = false;
                });
            } else if (form == 5) {
              this.isLoading = true;
              axios({
                method: "delete",
                url: "chk-by-law/delete-chkbylaw-2-by-insp-id",
                headers: {
                  Authorization:
                    "Bearer " + JSON.parse(localStorage.getItem("token"))
                },
                data: {
                  id_insp_record: this.id_inspection_record
                }
              })
                .then(res => {
                  if (res.status == 200) {
                    console.log(res.data);
                    console.log("CHECKLIST SHEET DELETED (By Law II)");
                    this.CLEAR_CURRENT_VIEW();
                  }
                })
                .catch(error => {
                  console.log(error);
                })
                .finally(() => {
                  this.isLoading = false;
                });
            } else {
              console.log("err: wrong form parameter");
            }
          }
        });
    },

    //GENERIC
    CHECK_EXIST_RESULT_GENERIC(id_inspection_record) {
      console.log("CHECK RESULT EXIST (General): " + id_inspection_record);
      this.isLoading = true;
      axios({
        method: "post",
        url: "chk-generic/check-chkgeneric",
        headers: {
          Authorization: "Bearer " + JSON.parse(localStorage.getItem("token"))
        },
        data: {
          id_insp_record: id_inspection_record
        }
      })
        .then(res => {
          console.log(res);
          if (res.data == true) {
            this.checklistList_existance.general = true;
            this.FETCH_CHECKLIST_GENERIC(id_inspection_record);
          } else {
            this.checklistList_existance.general = false;
            console.log("CHECK RESULT EXIST (General): FALSE");
          }
        })
        .catch(error => {
          console.log(error);
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
    FETCH_CHECKLIST_GENERIC(id_inspection_record) {
      console.log("FECTH INSPECTION RECORD: " + id_inspection_record);
      this.isLoading = true;
      axios({
        method: "post",
        url: "chk-generic/get-chkgeneric-by-insp-id",
        headers: {
          Authorization: "Bearer " + JSON.parse(localStorage.getItem("token"))
        },
        data: {
          id_insp_record: id_inspection_record
        }
      })
        .then(res => {
          console.log("FETCH_CHECKLIST_GENERAL: id = " + id_inspection_record);
          console.log(res);
          if (res.status == 200 && res.data) {
            this.checklistList.generic = res.data;
          }
        })
        .catch(error => {
          console.log(error);
        })
        .finally(() => {
          this.isLoading = false;
        });
    },

    //ILAST_EXT
    CHECK_EXIST_RESULT_ILAST_EXT(id_inspection_record) {
      console.log("CHECK RESULT EXIST (ilast ext): " + id_inspection_record);
      this.isLoading = true;
      axios({
        method: "post",
        url: "chk-ilast-ex/check-chkilastex",
        headers: {
          Authorization: "Bearer " + JSON.parse(localStorage.getItem("token"))
        },
        data: {
          id_insp_record: id_inspection_record
        }
      })
        .then(res => {
          if (res.data == true) {
            this.checklistList_existance.ilast_ext = true;
            this.FETCH_CHECKLIST_ILAST_EXT(id_inspection_record);
          } else {
            this.checklistList_existance.ilast_ext = false;
            console.log("CHECK RESULT EXIST(ilast ext): FALSE");
          }
        })
        .catch(error => {
          console.log(error);
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
    FETCH_CHECKLIST_ILAST_EXT(id_inspection_record) {
      this.isLoading = true;
      axios({
        method: "post",
        url: "chk-ilast-ex/get-chkilastex-by-insp-id",
        headers: {
          Authorization: "Bearer " + JSON.parse(localStorage.getItem("token"))
        },
        data: {
          id_insp_record: id_inspection_record
        }
      })
        .then(res => {
          console.log("FETCH_CHECKLIST_ILAST_EXT:");
          console.log(res);
          if (res.status == 200 && res.data) {
            this.checklistList.ilast_ext = res.data;
          }
        })
        .catch(error => {
          console.log(error);
        })
        .finally(() => {
          this.isLoading = false;
        });
    },

    //ILAST_INT
    CHECK_EXIST_RESULT_ILAST_INT(id_inspection_record) {
      console.log("CHECK RESULT EXIST (ilast ext): " + id_inspection_record);
      this.isLoading = true;
      axios({
        method: "post",
        url: "chk-ilast-in/check-chkilastin",
        headers: {
          Authorization: "Bearer " + JSON.parse(localStorage.getItem("token"))
        },
        data: {
          id_insp_record: id_inspection_record
        }
      })
        .then(res => {
          if (res.data == true) {
            this.checklistList_existance.ilast_int = true;
            this.FETCH_CHECKLIST_ILAST_INT(id_inspection_record);
          } else {
            this.checklistList_existance.ilast_int = false;
            console.log("CHECK RESULT EXIST(ilast int): FALSE");
          }
        })
        .catch(error => {
          console.log(error);
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
    FETCH_CHECKLIST_ILAST_INT(id_inspection_record) {
      this.isLoading = true;
      axios({
        method: "post",
        url: "chk-ilast-in/get-chkilastin-by-insp-id",
        headers: {
          Authorization: "Bearer " + JSON.parse(localStorage.getItem("token"))
        },
        data: {
          id_insp_record: id_inspection_record
        }
      })
        .then(res => {
          console.log("FETCH_CHECKLIST_ILAST_INT:");
          console.log(res);
          if (res.status == 200 && res.data) {
            this.checklistList.ilast_int = res.data;
          }
        })
        .catch(error => {
          console.log(error);
        })
        .finally(() => {
          this.isLoading = false;
        });
    },

    //By Law I
    CHECK_EXIST_RESULT_BY_LAW(id_inspection_record) {
      console.log("CHECK RESULT EXIST (by law i): " + id_inspection_record);

      this.isLoading = true;
      axios({
        method: "post",
        url: "chk-by-law/check-chkbylaw-1",
        headers: {
          Authorization: "Bearer " + JSON.parse(localStorage.getItem("token"))
        },
        data: {
          id_insp_record: id_inspection_record
        }
      })
        .then(res => {
          if (res.data == true) {
            this.checklistList_existance.by_law_i = true;
            this.FETCH_CHECKLIST_BY_LAW(id_inspection_record);
          } else {
            this.checklistList_existance.by_law_i = false;
            console.log("CHECK RESULT EXIST(By Law i): FALSE");
          }
        })
        .catch(error => {
          console.log(error);
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
    FETCH_CHECKLIST_BY_LAW(id_inspection_record) {
      this.isLoading = true;
      axios({
        method: "post",
        url: "chk-by-law/get-chkbylaw-1-by-insp-id",
        headers: {
          Authorization: "Bearer " + JSON.parse(localStorage.getItem("token"))
        },
        data: {
          id_insp_record: id_inspection_record
        }
      })
        .then(res => {
          console.log("FETCH_CHECKLIST_BY_LAW:");
          //console.log(res);
          if (res.status == 200 && res.data) {
            this.chk_bylaw_i = res.data;
          }
        })
        .catch(error => {
          console.log(error);
        })
        .finally(() => {
          this.isLoading = false;
        });
    },

    //By Law II
    CHECK_EXIST_RESULT_BY_LAW_2(id_inspection_record) {
      console.log("CHECK RESULT EXIST (by law ii): " + id_inspection_record);
      this.isLoading = true;
      axios({
        method: "post",
        url: "chk-by-law/check-chkbylaw-2",
        headers: {
          Authorization: "Bearer " + JSON.parse(localStorage.getItem("token"))
        },
        data: {
          id_insp_record: id_inspection_record
        }
      })
        .then(res => {
          if (res.data == true) {
            this.checklistList_existance.by_law_ii = true;
            this.FETCH_CHECKLIST_BY_LAW_2(id_inspection_record);
          } else {
            this.checklistList_existance.by_law_i = false;
            console.log("CHECK RESULT EXIST(By Law ii): FALSE");
          }
        })
        .catch(error => {
          console.log(error);
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
    FETCH_CHECKLIST_BY_LAW_2(id_inspection_record) {
      this.isLoading = true;
      axios({
        method: "post",
        url: "chk-by-law/get-chkbylaw-2-by-insp-id",
        headers: {
          Authorization: "Bearer " + JSON.parse(localStorage.getItem("token"))
        },
        data: {
          id_insp_record: id_inspection_record
        }
      })
        .then(res => {
          console.log("FETCH_CHECKLIST_BY_LAW II:");
          //console.log(res);
          if (res.status == 200 && res.data) {
            this.chk_bylaw_ii = res.data;
            console.log(this.chk_bylaw_ii);
          }
        })
        .catch(error => {
          console.log(error);
        })
        .finally(() => {
          this.isLoading = false;
        });
    },

    CLEAR_CURRENT_VIEW() {
      this.checklistList = {
        generic: [],
        ilast_ext: [],
        ilast_int: []
      };
      this.checklistList_existance = {
        general: false,
        ilast_ext: false,
        ilast_int: false
      };
    },
    SCROLL_TOP(container_id) {
      document
        .getElementById(container_id)
        .scroll({ top: 0, behavior: "smooth" });
    },
    SHOW_HIDE_PANEL() {
      this.pagePanelHiding = !this.pagePanelHiding;
    },
    DATE_FORMAT(d) {
      return moment(d).format("LL");
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/style/main.scss";

.page-container {
  width: 100%;
  height: 100%;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 201px calc(100% - 201px);
}

.page-container-hide {
  grid-template-columns: 41px calc(100% - 41px);
}

.list-page {
  padding: 20px;
  overflow-y: auto;
  position: relative;
  .list {
    margin: -20px -20px 20px -20px;
  }
  @media screen and (max-width: 1600px) {
    padding: 10px;
    padding-top: 50px;
  }
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

.app-loading {
  background-color: rgba(0, 0, 0, 0) !important;
}

.inner-pagename {
  border: 1px solid #000000;
  border-width: 0 0 1px 0px;
}
#page-container-view {
  padding-top: 20px;
}
</style>