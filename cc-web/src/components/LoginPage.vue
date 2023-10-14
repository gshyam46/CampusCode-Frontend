<template>
  <div class="container">
    <div v-if="displayAlert" class="custom-toast" role="alert">
      {{ customMessage }}
    </div>
    <div class="form">
      <div class="form-container">
        <img src="../assets/logo.svg" alt="Campus Code" class="logo-img" />
        <form
          @submit.prevent="login"
          id="signupform"
          class="signupform"
          name="signupform"
        >
          <div class="form-group">
            <label class="form-label" for="formEmail">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Enter email"
              tabindex="1"
              v-model="email"
              class="input-field"
              required
            />
          </div>
          <div class="form-group">
            <label class="form-label" for="formPassword">Password</label>
            <div class="password-input">
              <input
                type="password"
                name="password"
                placeholder="Enter password"
                tabindex="1"
                class="input-field"
                id="password"
                v-model="password"
                required
              />
            </div>
          </div>

          <button class="submit-button">Sign Up</button>
          <div class="bottom-links">
            <div class="signup-text">
              Don't have an account?
              <router-link
                class="sign-in"
                :to="{
                  path: '/signup',
                }"
                >Sign in</router-link
              >
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

export default {
  data() {
    return {
      email: "",
      password: "",
      displayAlert: false,
      customMessage: "",
    };
  },
  methods: {
    login() {
      const auth = getAuth();

      signInWithEmailAndPassword(auth, this.email, this.password)
        .then(() => {
          console.log("Successfully logged in!");
          this.customMessage = "Successfully logged in!";
          this.displayAlert = true;
          setTimeout(() => {
            this.displayAlert = false;
          }, 1000);
          setTimeout(() => {
            this.$router.push({
              path: "/home/feed",
            });
          }, 1000);
        })
        .catch((error) => {
          console.error(error.code);

          switch (error.code) {
            case "auth/invalid-email":
              this.customMessage = "Invalid email address.";
              break;
            case "auth/user-not-found":
              this.customMessage = "User not found. Please sign up.";
              break;
            case "auth/wrong-password":
              this.customMessage = "Incorrect password. Please try again.";
              break;
            case "auth/user-disabled":
              this.customMessage = "Your account has been disabled.";
              break;
            default:
              this.customMessage = "An error occurred. Please try again later.";
              this.displayAlert = true;
              setTimeout(() => {
                this.displayAlert = false;
              }, 1000);
          }
        });
    },
  },
};
</script>
<style scoped src="../assets/styles.css"></style>
