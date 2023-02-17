<template>
    <div class="page-section">
        <div class="report-sheet">
            <div class="report-container">
                <table>
                    <thead>
                        <th></th>
                    </thead>
                </table>
          <!-- <div class="sheet-body" style="grid-template-columns: 50% 50%">
            <div class="section-label" style="grid-column: span 2">
              <label>tank specification</label>
            </div>
            <div class="form-item" v-for="item in dataAddi" :key="item.desc">
              <div class="form-item-label">
                <label>{{ item.desc }}</label>
              </div>
              <div class="form-item-value">
                <label>{{ item.value }}</label>
              </div>
            </div>
          </div> -->
            </div>
        </div>
    </div>
</template>
<script>
//API
// import axios from "/axios.js";
// import moment from "moment";

export default {
    name: "info-additional",
    components: {

    },
    created() {
        this.TEST();
    },
    props: {
        infoAddi: Array,
    },
    data() {
        return {
            dataAddi: {},
        };
    },
    computed: {},
    methods: {
        TEST() {
            console.log(this.infoAddi);
            this.dataAddi = this.infoAddi;
        }
    },
}
</script>