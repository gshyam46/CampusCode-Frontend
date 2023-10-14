<template>
  <div>
    <header id="header" class="sticky-header">
      <nav>
        <RouterLink to="/"
          ><img src="./assets/logo.svg" class="nav-logo"
        /></RouterLink>
        <div id="navbar">
          <ul>
            <li>
              <RouterLink
                to="/home"
                :class="{ active: $route.path === '/home' }"
                >Home</RouterLink
              >
            </li>
            <li>
              <RouterLink
                to="/about"
                :class="{ active: $route.path === '/about' }"
                >About</RouterLink
              >
            </li>
            <li>
              <RouterLink
                to="/blog"
                :class="{ active: $route.path === '/blog' }"
                >Blog</RouterLink
              >
            </li>
            <li>
              <RouterLink
                to="/contact"
                :class="{ active: $route.path === '/contact' }"
                >Contact</RouterLink
              >
            </li>
            <li v-if="isLoggedIn" class="account-menu">
              <div @click="toggleAccountMenu" class="account-button">
                <div class="account-image">
                  <img src="./assets/account.png" class="account-img" />
                </div>
              </div>
              <div class="dropdown" v-if="showAccountMenu">
                <button class="logout-button" @click="handleSignOut">
                  Log Out
                </button>
              </div>
            </li>
            <li v-else class="account-menu">
              <div @click="toggleAccountMenu" class="account-button">
                <div class="account-image">
                  <img src="./assets/account.png" class="account-img" />
                </div>
              </div>
              <div class="dropdown-logout" v-if="showAccountMenu">
                <a href="/login" class="drop-link">Log In</a>
                <a href="/signup" class="drop-link">Sign Up</a>
              </div>
            </li>
          </ul>
        </div>
      </nav>
    </header>

    <router-view />

    <FooterSection />
  </div>
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
      isLoggedIn: false,
      showAccountMenu: false,
    };
  },
  methods: {
    handleSignOut() {
      const auth = getAuth();
      signOut(auth)
        .then(() => {
          this.isLoggedIn = false;
          router.push("/");
        })
        .catch((error) => {
          console.error("Sign out error:", error);
        });
    },
    toggleAccountMenu() {
      this.showAccountMenu = !this.showAccountMenu;
    },
    closeDropdownOnClickOutside(event) {
      if (this.showAccountMenu && !event.target.closest(".account-menu")) {
        this.showAccountMenu = false;
      }
    },
  },
  beforeUnmount() {
    document.removeEventListener("click", this.closeDropdownOnClickOutside);
  },
};
</script>

<style scoped src="./assets/styles.css"></style>
