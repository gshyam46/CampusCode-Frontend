<template>
  <div class="welcome-page">
    <h1>Welcome to CampusCode</h1>
    <div class="buttons">
      <button class="signup-button" @click="register">Sign up</button>
      <p>or</p>
      <button class="login-button" @click="login">Sign in</button>
    </div>
    <div class="divider">
      <span class="beforeSpan"> </span>
      <span class="orSpan">or</span>
    </div>
    <p>
      <button @click="signInWithGoogle" class="google-signin-button">
        Sign In with Google
      </button>
    </p>
  </div>
</template>
<script>
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
export default {
  methods: {
    register() {
      this.$router.push({
        path: "/signup",
      });
    },

    login() {
      this.$router.push({
        path: "/login",
      });
    },
    signInWithGoogle() {
      const provider = new GoogleAuthProvider();
      signInWithPopup(getAuth(), provider)
        .then((result) => {
          alert("successful");
          this.$router.push({
            path: "/home/feed",
          });
        })
        .catch((error) => {
          alert(error);
        });
    },
  },
};
</script>
<style scoped src="../assets/styles.css"></style>
