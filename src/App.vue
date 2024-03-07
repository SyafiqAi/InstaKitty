<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header>
    <div>
      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/feed">Feed</RouterLink>
        <RouterLink to="/register">Register</RouterLink>
        <RouterLink to="/sign-in">Sign In</RouterLink>
      </nav>
    </div>
  </header>

  <RouterView />
</template>

<style scoped lang="scss">
nav {
  * {
    padding: 1rem;
    display: inline-block;
    color: inherit;
    text-decoration: none;
  }
  :hover {
    text-decoration: underline;
  }
  text-align: center;
  margin-top: 4rem;
}
</style>
