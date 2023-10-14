<template>
  <div class="container">
    <div v-if="display_alert" class="custom-toast" role="alert">
      {{ custom_message }}
    </div>
    <div class="form">
      <div class="form-container">
        <img src="../assets/logo.svg" alt="Campus Code" class="logo-img" />
        <form
          @submit.prevent="signup"
          id="signupform"
          class="signupform"
          name="signupform"
        >
          <div class="form-group">
            <label for="formEmail" class="form-label">Full Name</label>
            <input
              type="text"
              name="formEmail"
              id="formEmail"
              placeholder="Enter your full name "
              v-model="userName"
              tabindex="1"
              class="input-field"
              required
            />
          </div>
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
              @input="clearAllErrors"
            />
          </div>
          <div class="form-group">
            <div class="hover-fcn">
              <label class="form-label" for="formPassword">Password</label>
              <img src="../assets/i.png" class="p-icon" />
              <div class="tooltiptext">
                <ul>
                  Password Requirements:
                </ul>

                <li class="pass-info">8+ characters long</li>
                <li class="pass-info">
                  Must contain at least one letter (uppercase or lowercase), one
                  digit, and one symbol character (e.g., !, @, #, $, etc.)
                </li>
                <li class="pass-info">
                  Should not be easily guessable or commonly used (e.g.,
                  "password123")
                </li>
                <li class="pass-info">
                  Should be unique and not reused across multiple accounts
                </li>
                <p class="pass-info">
                  Avoid using personal information or easily identifiable
                  details in the password (e.g., names, birthdates)
                </p>
                <p class="pass-info">
                  Regular password updates and changes are recommended to
                  enhance security.
                </p>
              </div>
            </div>
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
                @input="clearAllErrors"
              />
              <span @click="togglePasswordVisibility" class="password-icon">
                <!-- Change the icon class based on the 'showPassword' data property -->
                <i
                  :class="showPassword ? 'fa fa-eye-slash' : 'fa fa-eye'"
                  aria-hidden="true"
                  id="eye"
                ></i>
              </span>
            </div>
            <p v-if="password" class="text-danger">
              {{ getPasswordPolicyMessage() }}
            </p>
          </div>

          <button class="submit-button">Sign Up</button>
          <p v-if="error" class="text-danger error-message">{{ error }}</p>
          <div class="bottom-links">
            <div class="signup-text">
              Already have an account?
              <router-link
                class="sign-in"
                :to="{
                  path: '/login',
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
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import axios from "axios";
export default {
  data() {
    return {
      password: "",
      showPassword: false,
      isPasswordValid: false,
      isEmailValid: false,
      email: "",
      emailError: "",
      passwordError: "",
      error: "",
      responseCode: null,
      responseMessage: "",
      custom_message: "",
      display_alert: false,
      userName: "",
    };
  },
  computed: {
    hasErrors() {
      return (
        this.emailError ||
        this.passwordError ||
        this.getPasswordPolicyMessage() ||
        this.isPasswordValid ||
        this.isEmailValid
      );
    },
  },
  methods: {
    togglePasswordVisibility() {
      this.showPassword = !this.showPassword;
      // Get the password input element
      const passwordInput = document.getElementById("password");
      // Change the input type to show or hide the password
      passwordInput.type = this.showPassword ? "text" : "password";
    },
    async signup() {
      console.log("Sending signup request...");
      console.log("Email:", this.email);

      // Perform email validation
      if (!this.validateEmail()) {
        return; // Exit signup method if email is not valid
      }

      // Perform password validation
      if (!this.validatePassword()) {
        return; // Exit signup method if the password is not valid
      }

      const userData = {
        username: this.userName, // Replace with the actual username field
        email: this.email,
      };

      try {
        // Send the user registration data to your backend endpoint
        axios
          .post("http://localhost:5000/auth/register", userData)
          .then((response) => {
            console.log(response);
            // Check if the backend registration was successful
            if (response.status === 200) {
              // Now, create the user in Firebase Authentication
              createUserWithEmailAndPassword(
                getAuth(),
                this.email,
                this.password
              )
                .then((userCredential) => {
                  const user = userCredential.user;
                  // Redirect to the desired page after successful registration
                  this.$router.push({
                    path: "/home/feed",
                  });
                })
                .catch((error) => {
                  console.error("Firebase registration error:", error);
                  // Handle Firebase registration error here
                });
            } else if (response.status === 202) {
              alert("You've registered already please login.");
              this.$router.push({
                path: "/login",
              });
              console.log("User exists in database");
            } else {
              // Handle backend registration error here
              console.error("Backend registration failed.");
            }
          })
          .catch((error) => {
            // Handle error and display a message to the user
            console.error(error);
            alert(
              "An error occurred while registering. Please try again later."
            );
          });
      } catch (error) {
        console.error("HTTP request error:", error);
        // Handle HTTP request error here
      }
    },
    getPasswordPolicyMessage() {
      if (!this.password) {
        return "Password is required.";
      } else if (this.password.length < 8) {
        return "Password must be at least 8 characters long.";
      } else if (!/[a-z]/.test(this.password)) {
        return "Password must contain at least one lowercase letter.";
      } else if (!/[A-Z]/.test(this.password)) {
        return "Password must contain at least one uppercase letter.";
      } else if (!/\d/.test(this.password)) {
        return "Password must contain at least one digit.";
      } else if (!/[\W_]/.test(this.password)) {
        return "Password must contain at least one non-alphanumeric character.";
      } // Empty string if all password policy requirements are met
    },

    validateEmail() {
      if (!this.email) {
        this.emailError = "Email is required.";
        return false;
      }
      this.emailError = "";
      this.error = "";
      this.clearAllErrors();
      this.isEmailValid = true;
      return true;
    },
    validatePassword() {
      if (!this.password) {
        this.passwordError = "Password is required.";
        return false;
      } else if (
        !/^(?=.*[A-Za-z])(?=.*\d)(?=.*[\W_])[A-Za-z\d\W_]{8,}$/.test(
          this.password
        )
      ) {
        this.passwordError =
          "Invalid password. The password must contain at least one alphabetic character (lowercase or uppercase), one digit, and one non-alphanumeric character, and be at least 8 characters long.";
        return false;
      }
      this.passwordError = "";
      this.error = "";
      this.clearPasswordPolicyMessage();
      this.isPasswordValid = true;
      this.clearAllErrors();
      return true;
    },
    clearEmailError() {
      // Clear email error message
      this.emailError = "";
    },
    clearPasswordError() {
      // Clear password error message
      this.passwordError = "";
    },
    clearError() {
      // Clear error message
      this.error = "";
    },
    clearForm() {
      // Clear form
      this.email = "";
      this.password = "";
    },
    clearAllErrors() {
      // Clear all error messages
      this.clearEmailError();
      this.clearPasswordError();
      this.clearError();
      this.clearPasswordPolicyMessage();
    },
    clearAll() {
      // Clear form and all error messages
      this.clearForm();
      this.clearAllErrors();
    },
    clearPasswordPolicyMessage() {
      this.passwordPolicyMessage = "";
    },
  },
};
</script>

<style scoped src="../assets/styles.css"></style>
