<template>
  <div id="app">
    <router-view/>
  </div>
</template>
<style lang="scss">
  .size {
    width: 100%;
    height: 100%;
  }
  html,body{
    @extend .size;
    min-height: 100vh;
    margin: 0;
    padding: 0;
  }
  #app {
    @extend .size;
  }
</style>
