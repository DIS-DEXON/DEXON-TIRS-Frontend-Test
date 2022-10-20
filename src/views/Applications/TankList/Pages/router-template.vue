<template>
  <div class="pm-page">
    <toolbar
      :pageName="infoTank.tag_no"
      @refreshInfo="FETCH_LIST()"
      :isBack="true"
      newBtnLabel="New Project Info"
      style="grid-column: span 2"
    />
    <sidebar />
    <div class="pm-page-container">
      <router-view></router-view>
      <contentLoading
        text="Loading, please wait..."
        v-if="isLoading == true"
        color="#fc9b21"
      />
    </div>
  </div>
</template> 

<script>
//Structures
import toolbar from "@/components/app-structures/app-toolbar.vue";
import sidebar from "@/views/Applications/TankList/sidebar.vue";

export default {
  name: "ViewProjectList",
  components: {
    toolbar,
    sidebar,
  },
  created() {},
  data() {
    return {
      tankInfo: {
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
</style>