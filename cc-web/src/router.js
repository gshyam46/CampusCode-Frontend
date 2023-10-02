import { createRouter, createWebHistory } from "vue-router";
import HomePage from "@/components/HomePage.vue";
import SignupPage from "@/components/SignupPage.vue";
import LoginPage from "@/components/LoginPage.vue";
import WelcomePage from "@/components/WelcomePage.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "Welcome",
      component: WelcomePage,
    },
    {
      path: "/home",
      name: "Home",
      component: HomePage,
    },
    {
      path: "/signup",
      name: "Signup",
      component: SignupPage,
    },
    {
      path: "/login",
      name: "Login",
      component: LoginPage,
    },
    // {
    //   path: "/forgot-password",
    //   name: "ForgotPassword",
    //   component: ForgotPassword,
    // },
    // {
    //   path: "/reset-password",
    //   name: "ResetPassword",
    //   component: ResetPassword,
    // },
    // {
    //   path: "/email-verification",
    //   name: "EmailVerification",
    //   component: EmailVerification,
    // },
    // {
    //   path: "/subscription-plans",
    //   name: "SubscriptionPlans",
    //   component: SubscriptionPlans,
    // },
  ],
});

export default router;
