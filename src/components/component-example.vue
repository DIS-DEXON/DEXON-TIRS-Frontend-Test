<template>
  <div>
    <!-- HTML template lays in here. Always enclosed with only one tag set ex:<div></div>. -->
  </div>
</template>

<script>
export default {
  name: "AppInnerPageName", //component name
  props: {
    //props act like data() but are received from parent component parameters.
    user: Object,
    users: Array,
    name: String,
    age: Number,
  },
  data() {
    return {
      //data object or property must always be returned in data(). All data in this component must be declared in this function, except from props.
      userList: [],
      user: {
        name: "Weerawat",
        age: 30,
        isThai: true,
      },
      user_name: "Weerawat",
      user_age: 28,
      isLoading: false,
    };
  },
  created() {},
  mounted() {},
  computed: {},
  methods: {
    myFunction(param1, param2) {
      //any functions lie here
      //functions in method can be called anywhere in this component. created(), mounted(), <template></template> tag.
    },
  },
  watch: {
    total_accu(a, b) {
      //this function will be triggered whenever data name total_accu changes.
      answer = a + b;
      return answer;
    },
  },
};
</script>

<style lang="scss" scoped>
//css style lie in here.
//scoped <== css styles will be applied only in this component.
</style>