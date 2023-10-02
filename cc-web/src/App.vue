<template>
  <img alt="CampusCode logo" src="./assets/logo.png" />
  <nav>
    <RouterLink to="/"> Welcome</RouterLink>
    <RouterLink to="/signup"> Signup</RouterLink>
    <RouterLink to="/login"> Login</RouterLink>
    <button @click="handleSignOut" v-if="isLoggedIn">Log out</button>
  </nav>
  <router-view />
  <FooterSection />
</template>

<script>
import FooterSection from "./components/FooterSection.vue";
import { onMounted, ref } from "vue";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import router from "./router";

export default {
  name: "App",
  components: {
    FooterSection,
  },
  data() {
    return {
      isLoggedIn: false, // Initialize isLoggedIn as false
    };
  },
  methods: {
    handleSignOut() {
      const auth = getAuth(); // Get auth instance here

      // Sign out and handle the promise
      signOut(auth)
        .then(() => {
          // Update isLoggedIn and navigate to the home page
          this.isLoggedIn = false;
          router.push("/");
        })
        .catch((error) => {
          console.error("Sign out error:", error);
        });
    },
  },
  mounted() {
    const auth = getAuth();

    // Listen for authentication state changes
    onAuthStateChanged(auth, (user) => {
      if (user) {
        this.isLoggedIn = true; // User is logged in
      } else {
        this.isLoggedIn = false; // User is logged out
      }
    });
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
