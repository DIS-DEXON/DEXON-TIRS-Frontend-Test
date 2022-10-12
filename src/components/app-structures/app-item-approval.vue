<template>
  <div class="approval-box">
    <div class="message-box">
      <p class="message-title blue" v-if="this.status == 1">UNAPPROVED</p>
      <p class="message-title orange" v-if="this.status == 2">PENDING</p>
      <p class="message-title green" v-if="this.status == 3">APPROVED</p>
      <p class="message-title red" v-if="this.status == 4">REJECTED</p>
      <p class="message-title red" v-if="this.status == 5">REQUEST EDIT</p>
      <p class="message-text">{{ statusText }}</p>
    </div>

    <!-- UNAPPROVED -->
    <div
      class="button-set"
      v-if="status == 1 && this.$store.state.user.role == 'staff'"
    >
      <v-ons-toolbar-button
        class="blue"
        v-on:click="$emit('btnRequestApprove')"
      >
        <i class="las la-reply"></i>
        <span>Send Approve Request</span>
      </v-ons-toolbar-button>
    </div>

    <!-- PENDING -->
    <div
      class="button-set"
      v-if="status == 2 && this.$store.state.user.role == 'manager'"
    >
      <div class="double-button-set">
        <v-ons-toolbar-button class="green" v-on:click="$emit('btnApprove')">
          <i class="las la-check"></i>
          <span>Approve</span>
        </v-ons-toolbar-button>
        <v-ons-toolbar-button class="red" v-on:click="$emit('btnReject')">
          <i class="las la-times"></i>
          <span>Reject</span>
        </v-ons-toolbar-button>
      </div>
      <v-ons-toolbar-button class="blue" v-on:click="$emit('btnRequestEdit')">
        <i class="las la-reply-all"></i>
        <span>Request Edit</span>
      </v-ons-toolbar-button>
    </div>

    <!-- REQUEST EDIT -->
    <div
      class="button-set"
      v-if="status == 5 && this.$store.state.user.role == 'staff'"
    >
      <v-ons-toolbar-button
        v-if="status == 5"
        class="red"
        v-on:click="$emit('btnResendApprove')"
      >
        <i class="las la-reply-all"></i>
        <span> Resend Approve Request</span>
      </v-ons-toolbar-button>
    </div>
  </div>
</template>

<script>
export default {
  name: "app-approval-status",
  props: {
    status: Number,
  },
  created() {},
  computed: {
    statusText() {
      var role = this.$store.state.user.role;
      if (role == "staff") {
        if (this.status == 1)
          return "This record has not been sent to a section manager for an approval.";
        else if (this.status == 2)
          return "This record has been sent to a section manager for an approval.";
        else if (this.status == 3)
          return "This record is approved by a section manager. It cannot be edited or deleted.";
        else if (this.status == 4)
          return "This record is rejected by a section manager.";
        else if (this.status == 5)
          return "This record is requested review and edit by a section manager.";
        else return "N/A";
      } else if (role == "manager") {
        if (this.status == 1)
          return "This record has not been sent to a section manager for a review.";
        else if (this.status == 2)
          return "This record is waiting for an approval feedback from a section manager.";
        else if (this.status == 3) return "This record is approved.";
        else if (this.status == 4) return "This record is rejected.";
        else if (this.status == 5)
          return "This record has been request for editing. It is waiting for a new approval request.";
        else return "N/A";
      } else return "N/A";
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/style/main.scss";
.approval-box {
  padding: 20px;
  margin: 0 -20px;
  background-color: $web-theme-color-lightgrey;
  display: block;
  .message-title {
    // color: $web-font-color-black;
    font-size: 14px;
    font-weight: 700;
    text-transform: uppercase;
    margin: 0 0 4px 0 !important;
  }
  .blue {
    color: #0076ff;
  }
  .orange {
    color: #fbc121;
  }
  .green {
    color: #199d2d;
  }
  .red {
    color: #dd251d;
  }
  .message-text {
    color: $web-font-color-black;
    font-size: 14px;
    margin: 0 0 4px 0 !important;
  }
  .button-set {
    display: flex;
    flex-direction: column;
    margin-top: 10px;
    .double-button-set {
      display: flex;
      justify-content: space-between;
      .toolbar-button {
        width: 175px;
      }
      .toolbar-button:first-child {
        margin-top: 0;
      }
      .toolbar-button:last-child {
        margin-bottom: 0;
      }
    }
    .toolbar-button {
      width: 100%;
      background-color: #fff;
      border: 0.5px solid #fff;
      padding: 0;
      height: 34px;
      margin-bottom: 10px;
    }
    .toolbar-button:last-child {
      margin-bottom: 0px;
    }
    .green:hover {
      color: #199d2d;
      border: 0.5px solid #199d2d;
    }
    .blue:hover {
      color: #0076ff;
      border: 0.5px solid #0076ff;
    }
    .red:hover {
      color: #dd251d;
      border: 0.5px solid #dd251d;
    }
  }
}
</style>