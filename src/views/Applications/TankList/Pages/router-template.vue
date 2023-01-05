<template>
  <div class="pm-page">
    <toolbar
      :pageSubName="this.$store.state.currentPageName"
      @refreshInfo="FETCH_LIST()"
      :isBackPath="true"
      :isBack_specificPath="'/tank/client/' + infoTank.id_client"
      newBtnLabel="New Project Info"
      style="grid-column: span 3"
      :infoTank="infoTank"
      :isMoreBtn="true"
    />
    <sidebar />
    <div class="pm-page-container">
      <router-view></router-view>
    </div>
  </div>
</template> 

<script>
import axios from "/axios.js";
//Structures
import toolbar from "@/components/app-structures/app-toolbar.vue";
import sidebar from "@/views/Applications/TankList/sidebar.vue";

export default {
  name: "router-template-detail",
  components: {
    toolbar,
    sidebar,
  },
  created() {
    this.$store.commit("UPDATE_CURRENT_INAPP", {
      name: "Tank Management",
      icon: "/img/icon_menu/tank/tank.png",
    });
    if (this.$store.state.status.server == true) {
      this.FETCH_TANK_INFO();
    }
  },
  data() {
    return {
      infoTank: {},
    };
  },
  computed: {},
  methods: {
    FETCH_TANK_INFO() {
      this.isLoading = true;
      var id_tag = this.$route.params.id_tag;
      // console.log("ID CLIENT: " + id_company);
      axios({
        method: "post",
        url: "/tank-info/tank-info-by-id",
        headers: {
          Authorization: "Bearer " + JSON.parse(localStorage.getItem("token")),
        },
        data: {
          id_tag: id_tag,
        },
      })
        .then((res) => {
          // console.log(res);
          if (res.status == 200 && res.data) {
            this.infoTank = res.data[0];
            this.$store.commit("UPDATE_CURRENT_CLIENT", {
              name: this.infoTank.company_name,
              logo: this.infoTank.logo,
            });
          }
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.pm-page {
  display: grid;
  grid-template-columns: 200px calc(100vw - 200px);
  grid-template-rows: 51px calc(100vh - 119px);
  .pm-page-container {
    background-color: #fff;
    // padding: 20px;
  }
}

@media screen and (max-width: 1024px) {
  .pm-page {
    grid-template-columns: 54px calc(100vw - 54px);
    // grid-template-rows: 61px calc(100vh - 139px);
    .pm-page-container {
      background-color: #fff;
      // padding: 20px;
      .page-container {
      }
    }
  }
}
</style>