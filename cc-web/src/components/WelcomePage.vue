<template>
  <h1>Welcome to CampusCode</h1>
  <button @click="register">SignUp</button>
  <button @click="login">Login</button>
</template>
<script setup>
import { useRouter } from "vue-router";
const router = useRouter();
const register = () => {
  router.push("/signup");
};
const login = () => {
  router.push("/login");
};
</script>
