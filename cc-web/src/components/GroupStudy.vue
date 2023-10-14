<template>
  <header id="header" class="home-sticky-header">
    <nav>
      <div id="navbar">
        <ul>
          <li>
            <RouterLink to="/home" :class="{ active: $route.path === '/home' }"
              >Feed</RouterLink
            >
          </li>
          <li>
            <RouterLink
              to="/groups"
              :class="{ active: $route.path === '/groups' }"
              >Group Study</RouterLink
            >
          </li>
          <li>
            <RouterLink
              to="/projects"
              :class="{ active: $route.path === '/projects' }"
              >Projects</RouterLink
            >
          </li>
          <li>
            <RouterLink
              to="/notes"
              :class="{ active: $route.path === '/notes' }"
              >Study Materials</RouterLink
            >
          </li>
        </ul>
      </div>
    </nav>
  </header>
  <h1>Group Study Classes</h1>
  <button
    v-if="!meetingVisible"
    @click="startMeeting"
    class="google-signin-button"
  >
    Start Meeting
  </button>
  <button
    v-if="meetingVisible"
    @click="endMeeting"
    class="google-signin-button"
  >
    End Meeting
  </button>
  <div v-if="meetingVisible" id="jitsi-container"></div>
  <router-view />
</template>
<script>
export default {
  data() {
    return {
      meetingVisible: false,
      api: null,
    };
  },
  methods: {
    async startMeeting() {
      this.meetingVisible = true;
      const domain = "meet.jit.si"; // Replace with your Jitsi domain
      const roomName =
        "vpaas-magic-cookie-dba9dcef08d64ae290884553a84655ec/SampleAppToyOfficesPioneerDown"; // Replace with your desired room name

      const options = {
        roomName,
        width: "100%",
        height: 500,
        parentNode: document.querySelector("#jitsi-container"), // Replace with your container element
      };

      this.api = new JitsiMeetExternalAPI(domain, options);

      this.api.addEventListener("videoConferenceJoined", () => {
        console.log("Meeting started!");
      });
    },
    endMeeting() {
      if (this.api) {
        this.api.dispose(); // Dispose of the Jitsi API instance to stop the meeting
      }
      this.meetingVisible = !this.meetingVisible;
    },
  },
};
</script>
<style scoped src="../assets/styles.css"></style>
