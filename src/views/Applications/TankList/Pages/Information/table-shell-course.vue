<template>
  <div>
    <DxDataGrid
      id="data-grid-style"
      key-expr="id_tank_course"
      :data-source="courseList"
      :element-attr="dataGridAttributes"
      :selection="{ mode: 'single' }"
      :hover-state-enabled="true"
      :allow-column-reordering="true"
      :show-borders="true"
      :column-hiding-enabled="true"
      :show-row-lines="true"
      :row-alternation-enabled="false"
      :word-wrap-enabled="true"
      @row-inserted="CREATE_COURSE"
      @row-updated="UPDATE_COURSE"
      @row-removed="DELETE_COURSE"
    >
      <DxEditing
        :allow-updating="true"
        :allow-deleting="true"
        :allow-adding="true"
        :use-icons="true"
        mode="row"
      />
      <!-- <DxToolbar>
        <DxItem location="before" template="table-header" />
        <DxItem location="after" template="table-header-button-set" />
      </DxToolbar>-->
      <DxColumn data-field="created_time" :width="0" caption />
      <DxColumn data-field="course_no" caption="Course No" sort-order="asc" :width="80" />
      <DxColumn
        data-field="t_nom_plate_mm"
        caption="Nominal Shell Thk (mm)"
        format="#,##0.00"
        header-cell-template="headerTnom"
        :width="80"
      />
      <DxColumn
        data-field="height_of_course_m"
        caption="Height of course (m)"
        format="#,###0.000"
        header-cell-template="headerHofC"
        :width="80"
      />
      <DxColumn
        data-field="height_accumulate_course_m"
        caption="Accumulate Height (m)"
        format="#,###0.000"
        header-cell-template="headerAccuH"
        :allow-editing="false"
        :width="80"
      />
      <DxColumn data-field="id_material" caption="Tank Material">
        <DxLookup :data-source="matList" value-expr="id_material" display-expr="mat_spec" />
      </DxColumn>
      <DxColumn
        data-field="mat_type"
        caption="Material Type"
        :allow-editing="false"
        :width="80"
        alignment="center"
      />
      <DxColumn
        data-field="y_value"
        caption="Y"
        header-cell-template="headerY"
        :allow-editing="false"
        :width="70"
        alignment="center"
        format="#,##0"
      />
      <DxColumn
        data-field="t_value"
        caption="T"
        header-cell-template="headerT"
        :allow-editing="false"
        :width="70"
        alignment="center"
        format="#,##0"
      />
      <DxColumn
        data-field="height_of_course_hydro_m"
        caption="Height Hydro (m)"
        format="#,###0.000"
        header-cell-template="headerHhydro"
        :allow-editing="false"
        :width="70"
      />
      <DxColumn
        data-field="height_of_course_prod_m"
        caption="Height Prod (m)"
        format="#,###0.000"
        header-cell-template="headerHprod"
        :allow-editing="false"
        :width="70"
      />
      <DxColumn
        data-field="tmin_hydro_mm"
        caption="tretire Hydro (mm)"
        format="#,##0.00"
        header-cell-template="headerTrHydro"
        :allow-editing="false"
        :width="70"
      />
      <DxColumn
        data-field="tmin_prod_mm"
        caption="tretire Prod (mm)"
        format="#,##0.00"
        header-cell-template="headerTrProd"
        :allow-editing="false"
        :width="70"
      />
      <!-- <DxColumn :width="80" caption="" cell-template="cell-button-set" /> -->
      <template #headerTnom>
        <div>
          Nominal shell thk
          <BR />(mm)
        </div>
      </template>
      <template #headerHofC>
        <div>
          Height of course
          <BR />(m)
        </div>
      </template>
      <template #headerAccuH>
        <div>
          Accumulate height
          <BR />(m)
        </div>
      </template>
      <template #headerY>
        <div>
          Y
          <BR />(lbf/in
          <sup>2</sup>)
        </div>
      </template>
      <template #headerT>
        <div>
          T
          <BR />(lbf/in
          <sup>2</sup>)
        </div>
      </template>
      <template #headerHhydro>
        <div>
          Height hydro
          <BR />(m)
        </div>
      </template>
      <template #headerHprod>
        <div>
          Height prod
          <BR />(m)
        </div>
      </template>
      <template #headerTrHydro>
        <div>
          tmin hydro
          <BR />(mm)
        </div>
      </template>
      <template #headerTrProd>
        <div>
          tmin prod
          <BR />(mm)
        </div>
      </template>
      <!-- <template #cell-button-set="{ data }">
        <div class="table-btn-group">
          <div class="table-btn" v-on:click="EDIT_INFO(data)">
            <i class="las la-pen blue"></i>
          </div>
          <div class="table-btn" v-on:click="DELETE_INFO(data)">
            <i class="las la-trash red"></i>
          </div>
        </div>
      </template>-->
      <template #table-header>
        <div>
          <div class="page-section-label">Shell Course</div>
        </div>
      </template>
      <!-- <template #table-header-button-set>
        <div>
          <v-ons-toolbar-button>
            <i class="las la-plus"></i>
            <span>Add New Tank Course</span>
          </v-ons-toolbar-button>
        </div>
      </template>-->
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
      <DxExport :enabled="true" :fileName="'tank course'" />
    </DxDataGrid>
  </div>
</template> 

<script>
//API
import axios from "/axios.js";
//import moment from "moment";

//Components

//DataGrid
import "devextreme/dist/css/dx.light.css";
import {
  DxDataGrid,
  DxSearchPanel,
  DxPaging,
  DxPager,
  DxScrolling,
  DxColumn,
  DxExport,
  //DxToolbar,
  //DxItem,
  DxEditing,
  DxLookup
} from "devextreme-vue/data-grid";

export default {
  name: "info-shell-course",
  components: {
    DxDataGrid,
    DxSearchPanel,
    DxPaging,
    DxPager,
    DxScrolling,
    DxColumn,
    DxExport,
    //DxToolbar,
    //DxItem,
    DxEditing,
    DxLookup
  },
  created() {
    if (this.$store.state.status.server == true) {
      this.FETCH_MAT();
      this.FETCH_TANK_COURSE();
    }
  },
  data() {
    return {
      courseList: {},
      matList: {},
      dataGridAttributes: {
        class: "data-grid-style"
      }
    };
  },
  computed: {},
  methods: {
    FETCH_TANK_COURSE() {
      this.isLoading = true;
      var id_tag = this.$route.params.id_tag;
      // console.log("ID TAG: " + id_tag);
      axios({
        method: "post",
        url: "tank-course/tank-course-by-tank-id",
        headers: {
          Authorization: "Bearer " + JSON.parse(localStorage.getItem("token"))
        },
        data: {
          id_tag: id_tag
        }
      })
        .then(res => {
          // console.log("tank course:");
          // console.log(res);
          if (res.status == 200 && res.data) {
            this.courseList = res.data;
          }
        })
        .catch(error => {
          console.log(error);
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
    FETCH_MAT() {
      axios({
        method: "get",
        url: "MdTankMaterial",
        headers: {
          Authorization: "Bearer " + JSON.parse(localStorage.getItem("token"))
        }
      })
        .then(res => {
          // console.log("material:");
          // console.log(res);
          if (res.status == 200 && res.data) {
            this.matList = res.data;
          }
        })
        .catch(error => {
          console.log(error);
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
    CREATE_COURSE(e) {
      e.data.id_tag = parseInt(this.$route.params.id_tag);
      e.data.id_tank_course = 0;
      console.log(e.data);
      axios({
        method: "post",
        url: "/tank-course/add-tank-course",
        headers: {
          Authorization: "Bearer " + JSON.parse(localStorage.getItem("token"))
        },
        data: e.data
      })
        .then(res => {
          if (res.status == 200) {
            console.log("create success");
            this.FETCH_TANK_COURSE();
          }
        })
        .catch(error => {
          this.$ons.notification.alert(
            error.code + " " + error.response.status + " " + error.message
          );
        })
        .finally(() => {});
    },
    UPDATE_COURSE(e) {
      axios({
        method: "put",
        url: "/tank-course/edit-tank-course",
        headers: {
          Authorization: "Bearer " + JSON.parse(localStorage.getItem("token"))
        },
        data: e.data
      })
        .then(res => {
          if (res.status == 200) {
            console.log("update success");
            this.FETCH_TANK_COURSE();
          }
        })
        .catch(error => {
          this.$ons.notification.alert(
            error.code + " " + error.response.status + " " + error.message
          );
        })
        .finally(() => {});
    },
    DELETE_COURSE(e) {
      axios({
        method: "delete",
        url: "/tank-course/delete-tank-course",
        headers: {
          Authorization: "Bearer " + JSON.parse(localStorage.getItem("token"))
        },
        data: e.data
      })
        .then(res => {
          if (res.status == 200) {
            console.log("delete success");
            this.FETCH_TANK_COURSE();
          }
        })
        .catch(error => {
          this.$ons.notification.alert(
            error.code + " " + error.response.status + " " + error.message
          );
        })
        .finally(() => {});
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/style/main.scss";

.toolbar-button {
  background-color: $web-theme-color-background;
  padding: 0;
  padding-right: 15px;
  height: 34px;
  border: 0px;
  border: 1px solid $web-font-color-black;

  i {
    font-size: 20px;
    color: $web-font-color-black;
  }
  span {
    font-size: 14px;
    font-weight: 500;
    color: $web-font-color-black;
  }
}
.toolbar-button:hover,
.toolbar-button:active {
  background-color: $dexon-primary-blue;

  i {
    color: $web-font-color-white;
  }
  span {
    color: $web-font-color-white;
  }
}
</style>