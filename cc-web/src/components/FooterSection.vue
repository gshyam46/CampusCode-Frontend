<template>
  <footer class="footer">
    <div class="footer-column">
      <img class="logo" src="@/assets/logo.svg" alt="CampusCode logo" />
    </div>

    <div class="footer-column about-column">
      <h4>About</h4>
      <router-link
        to="/account"
        class="footer-link"
        :class="{ active: $route.path === '/account' }"
        >Account</router-link
      >
      <router-link
        to="/about"
        class="footer-link"
        :class="{ active: $route.path === '/about' }"
        >About us</router-link
      >
      <router-link
        to="/privacy"
        class="footer-link"
        :class="{ active: $route.path === '/privacy' }"
        >Privacy Policy</router-link
      >
      <router-link
        to="/terms"
        class="footer-link"
        :class="{ active: $route.path === '/terms' }"
        >Terms & Conditions</router-link
      >
      <router-link
        to="/contact"
        class="footer-link"
        :class="{ active: $route.path === '/contact' }"
        >Contact Us</router-link
      >
      <router-link
        to="/help"
        class="footer-link"
        :class="{ active: $route.path === '/help' }"
        >Help</router-link
      >
    </div>

    <div class="footer-column newsletter-column">
      <div class="newsletter">
        <h4>Sign-up for Newsletters</h4>
        <p>
          Get E-mail updates for new groups and <span>special offers.</span>
        </p>
        <form @submit.prevent="subscribe">
          <input
            type="email"
            placeholder="Your e-mail address"
            class="email"
            v-model="email"
          />
          <button type="submit" class="subscribe-button">Sign-up</button>
        </form>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  data() {
    return {
      email: "",
    };
  },
  methods: {
    subscribe() {
      // Implement your subscribe logic here
      // You can use the email stored in this.email
    },
  },
};
</script>

<style scoped src="../assets/styles.css"></style>
