import { createRouter, createWebHistory } from "vue-router";
import HomePage from "@/components/HomePage.vue";
import StudyMaterial from "@/components/HomePage.vue";
import ProjectsPage from "@/components/ProjectsPage.vue";
import GroupStudy from "@/components/GroupStudy.vue";
import SignupPage from "@/components/SignupPage.vue";
import LoginPage from "@/components/LoginPage.vue";
import WelcomePage from "@/components/WelcomePage.vue";
import { getAuth, onAuthStateChanged } from "firebase/auth";

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
      path: "/projects",
      name: "Projetcs",
      component: ProjectsPage,
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: "/notes",
      name: "Notes",
      component: StudyMaterial,
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: "/groups",
      name: "Group Study",
      component: GroupStudy,
      meta: {
        requiresAuth: true,
      },
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
    //   path: "/subscription-plans",
    //   name: "SubscriptionPlans",
    //   component: SubscriptionPlans,
    // },
  ],
});

const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const removeListener = onAuthStateChanged(
      getAuth(),
      (user) => {
        removeListener();
        resolve(user);
      },
      reject
    );
  });
};
router.beforeEach(async (to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (await getCurrentUser()) {
      next();
    } else {
      alert("Please Login first!");
      next("/");
    }
  } else {
    next();
  }
});

export default router;
