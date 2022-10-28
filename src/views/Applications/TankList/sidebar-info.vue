<template>
  <div class="pm-project-info-sidebar form">
    <p class="pm-section-label">General Informations</p>
    <div class="form-item-container">
      <div class="input-set">
        <p class="label">Tag No.</p>
        <p class="info">
          {{ infoTank.tag_no }}
        </p>
      </div>
      <div class="input-set">
        <p class="label">Tank No.</p>
        <p class="info">
          {{ infoTank.tank_no }}
        </p>
      </div>
      <div class="input-set col-2">
        <p class="label" style="grid-column: span 2">Plant / Site</p>
        <p class="info">
          {{ infoTank.plant_abbr }}
        </p>
        <p class="info">
          {{ infoTank.plant }}
        </p>
      </div>
      <div class="input-set">
        <p class="label">Description</p>
        <p class="info textarea">
          {{ infoTank.desc }}
        </p>
      </div>
      <div class="input-set">
        <p class="label">Product</p>
        <p class="info">
          {{ infoTank.product }}
        </p>
      </div>
      <div class="input-set">
        <p class="label">P&ID No.</p>
        <p class="info textarea">
          {{ infoTank.pid_no }}
        </p>
      </div>
      <div class="input-set">
        <p class="label">Drawing No.</p>
        <p class="info textarea">
          {{ infoTank.drawing_no }}
        </p>
      </div>
      <div class="input-set">
        <p class="label">In-service Date</p>
        <p class="info">
          {{ infoTank.inservice_date }}
        </p>
      </div>
      <div class="input-set">
        <p class="label">Corrosion Loop Tag</p>
        <p class="info">
          {{ infoTank.corrosion_loop_tag }}
        </p>
      </div>
      <div class="input-set">
        <p class="label">Corrosion Loop No.</p>
        <p class="info">
          {{ infoTank.corrosion_loop_no }}
        </p>
      </div>
      <div class="input-set">
        <p class="label">Risk</p>
        <p class="info">
          {{ infoTank.risk_ranking }}
        </p>
      </div>

      <hr style="margin-top: 20px" />

      <p class="pm-section-label pm-section-label-center">Integrity Status</p>
      <div class="input-set">
        <p
          class="info info-status"
          :style="'background-color:' + infoTank.int_status_color"
        >
          {{ infoTank.int_status }}
        </p>
      </div>
      <p class="pm-section-label pm-section-label-center">Applicable Status</p>
      <div class="input-set">
        <p
          class="info info-status"
          :style="'background-color:' + infoTank.app_status_color"
        >
          {{ infoTank.app_status }}
        </p>
      </div>

      <hr style="margin-bottom: 0" />

      <p class="pm-section-label">Inspection Date</p>
      <div class="input-set">
        <p class="label">Last Inspection Date</p>
        <p class="info">
          {{ infoTank.date_last_insp }}
        </p>
      </div>
      <div class="input-set">
        <p class="label">Next Inspection Date</p>
        <p class="info">
          {{ infoTank.date_next_insp }}
        </p>
      </div>
      <div class="input-set">
        <p class="label">Inspection Interval (years)</p>
        <p class="info">
          {{ infoTank.insp_interval }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "app-sidebar-info",
  mounted() {},
  props: {
    id_tank: Number,
  },
  data() {
    return {
      infoTank: {
        id_tank: 1,
        plant: "Flow Station",
        plant_abbr: "FSTN",
        tag_no: "MUDA-FA-001",
        tank_no: "FA-001",
        desc: "Crude oil storage tank",
        inservice_date: "2022-10-15",
        pid_no: "AA123456789",
        drawing_no: "SDK-120, 10, 11, 12",
        product: "Crude Oil",
        corrosion_loop_tag: null,
        corrosion_loop_no: null,
        risk_ranking: null,
        date_last_insp: "2022-01-12",
        date_next_insp: "2022-01-12",
        insp_interval: 5,
        int_status: "Low",
        int_status_color: "#2ac6007a",
        app_status: "Dismantled",
        app_status_color: "#EA7961",
      },
    };
  },
  computed: {},
};
</script>

<style lang="scss" scoped>
@import "@/style/main.scss";

.pm-project-info-sidebar {
  width: auto;
  height: calc(100vh - 139px);
  background: #fff;
  padding: 0 20px;
  overflow-y: scroll;

  border: 1px solid #e6e6e6;
  border-width: 0 1px 0 0px;
  grid-row: span 2;
  @media screen and (max-width: 1024px) {
    display: none;
  }

  .pm-section-label {
    font-style: normal;
    font-weight: 700;
    font-size: 1.75em;
    line-height: 16px;
    color: $web-font-color-grey;
    padding: 20px 0 10px 0;
    margin: 0;
    user-select: text;
    text-transform: uppercase;
  }

  .pm-section-label-center {
    text-align: center;
    font-weight: 700;
    font-size: 14px;
    line-height: 16px;
    color: $web-font-color-grey;
    padding: 0px 0 10px 0;
    margin: 0;
    user-select: text;
    text-transform: uppercase;
    grid-column: span 2;
  }
  .form-item-container {
    display: block;
    padding-bottom: 40px;
  }
}

.pm-project-info-sidebar::-webkit-scrollbar {
  // display: none;
}

.input-set:last-child {
  margin-bottom: 40px;
}

.form .form-item-container .info {
  font-weight: 500;
}

hr {
  margin: 20px 0;
  grid-column: span 2;
}

.info-status {
  color: $web-font-color-black !important;
  border: 0 !important;
  text-transform: uppercase;
  font-size: 14px !important;
  font-weight: 800 !important;
  letter-spacing: 1pt;
  line-height: 28px !important;
}

.form {
  .form-item-container {
  }
  .col-2 {
    display: grid;
    grid-template-columns: 50% 50%;
    .info:nth-child(2) {
      border-radius: 6px 0 0 6px;
    }
    .info:last-child {
      border-radius: 0 6px 6px 0;
    }
  }
}
</style>