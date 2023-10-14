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
  <h1>Projects</h1>
  <router-view />
</template>

<style scoped src="../assets/styles.css"></style>
