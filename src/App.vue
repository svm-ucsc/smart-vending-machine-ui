<template>
  <div class="container-fluid app_container">
    <div class="row p-0">
      <search-bar />
    </div>
    <div>
      <store-menu />
    </div>
  </div>
</template>

<style lang="scss">
  @import'~bootstrap/dist/css/bootstrap.css';
  @import'../src/styles/_variables.scss';

  .app_container{
    background: $summer-yellow;
    height: 100%;
    width: 100%;

  }
  .app_title{
    font-size: 45px;
  }

  .row{
    padding: 20px 0;
  }

</style>