<template>
  <div class="pm-page">
    <toolbar
      :pageName="infoTank.tag_no"
      @refreshInfo="FETCH_LIST()"
      :isBackPath="true"
      :isBack_specificPath="'/tank/list/' + this.$store.state.currentViewClient"
      newBtnLabel="New Project Info"
      style="grid-column: span 2"
    />
    <sidebar />
    <div class="pm-page-container">
      <router-view></router-view>
    </div>
  </div>
</template> 

<script>
//Structures
import toolbar from "@/components/app-structures/app-toolbar.vue";
import sidebar from "@/views/Applications/TankList/sidebar-tank.vue";

export default {
  name: "ViewProjectList",
  components: {
    toolbar,
    sidebar,
  },
  created() {},
  data() {
    return {
      infoTank: {
        id_tank: 1,
        plant: "MUDA-01",
        tag_no: "MUDA-FA-001",
        int_status: "normal",
        app_status: "in-service",
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
}
</style>