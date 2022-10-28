<template>
  <div class="pm-page">
    <toolbar
      :pageSubName="'Tag No. ' + infoTank.tag_no"
      @refreshInfo="FETCH_LIST()"
      :isBackPath="true"
      :isBack_specificPath="'/tank/list/' + infoTank.id_client"
      :isEdit="true"
      newBtnLabel="New Project Info"
      style="grid-column: span 3"
      :infoTank="infoTank"
    />
    <sidebar />
    <!-- <sidebarInfo /> -->
    <div class="pm-page-container">
      <router-view></router-view>
    </div>
  </div>
</template> 

<script>
//Structures
import toolbar from "@/components/app-structures/app-toolbar.vue";
import sidebar from "@/views/Applications/TankList/sidebar.vue";

// import sidebarInfo from "@/views/Applications/TankList/sidebar-info.vue";

export default {
  name: "router-template-detail",
  components: {
    toolbar,
    sidebar,
    // sidebarInfo,
  },
  created() {
    this.$store.commit("UPDATE_CURRENT_INAPP", {
      name: "Tank Management",
      icon: "/img/icon_menu/project_manager/project.png",
    });
    this.$store.commit("UPDATE_CURRENT_CLIENT", {
      name: this.infoTank.company_name,
      logo: this.infoTank.logo,
    });
  },
  data() {
    return {
      infoTank: {
        id_tank: 1,
        id_client: 1,
        company_name: "PTT LNG Company Limited",
        logo: "/img/mockup/client.png",
        location: "Rayong",
        plant: "MUDA-01",
        tag_no: "MUDA-FA-001",
        int_status: "normal",
        app_status: "in-service",
        construction_code: "API 650",
        inspection_code: "API 653 & Thai Law",
        tank_status: "Operational",
        tank_capacity: 1660103.0,
        tank_height: 10.973,
        joint_efficiency: 1.0,
        max_liquid_level: 10.97,
        bottom_nominal_thk: 6.35,
        diameter: 14.63,
        annualar_nonimal_thk: 9.53,
        no_of_shell_course: 6,
        roof_nominal_thk: 4.76,
        tank_internal_pressure: "Atmospheric",
        design_pressure_shell: 14.7,
        roof_type: "Fixed",
        roof_shape: "Coned",
        bottom: "Coned down",
        insulation: "Not Insulated",
        insulation_thk: null,
        product: "Crude Oil",
        sg_of_product: 1.0,
        operating_pressure_shell: 14.7,
        design_pressure_coil: null,
        operating_pressure_coil: null,
        installation_date: "2022-10-09",
        inservice_date: "2022-10-01",
        prev_inspection_date: "2022-11-02",
        inservice_age_of_tank: 5,
        foundation: null,
      },
    };
  },
  computed: {},
  methods: {},
};
</script>

<style lang="scss" scoped>
.pm-page {
  display: grid;
  grid-template-columns: 240px calc(100vw - 240px);
  grid-template-rows: 61px calc(100vh - 139px);
  .pm-page-container {
    background-color: #fff;
    // padding: 20px;
    .page-container {
    }
  }
}
</style>