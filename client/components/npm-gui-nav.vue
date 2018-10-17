<style scoped rel="stylesheet/css">
  h1 {
    color: #fff;
    display: inline-block;
    font-size: 1em;
    font-weight: 400;
    line-height: 45px;
    margin: 0 15px 0 0;
  }

  nav {
    background: #3e3f3a;
    height: 45px;
    padding-left: 15px;
    padding-right: 15px;
    flex-basis: 45px;
  }

  .right-section {
    float: right;
  }

  p {
    color: #dfd7ca;
    display: inline-block;
    font-size: .9em;
    font-weight: 400;
    line-height: 45px;
    margin: 0;
  }
</style>

<template>
  <nav>
    <h1>npm-gui</h1>
    <npm-gui-btn v-for="button in buttons" class="dark" v-bind:route="button.route">{{ button.text }}</npm-gui-btn>
    <div class="right-section">
      <p>Current Project: {{ currentProject.name }}</p>
      <npm-gui-btn class="dark" icon="folder"></npm-gui-btn>
    </div>
  </nav>
</template>

<script>
  import NpmGuiBtn from './npm-gui-btn.vue';

  export default {
    components: {
      NpmGuiBtn,
    },
    data() {
      return {
        msg: 'Hello world!',
        buttons: [
          {
            text: 'Global Dependencies',
            route: '/dependencies/global',
            title: '',
          },
          {
            text: 'Dependencies',
            route: '/dependencies/regular',
            title: '',
          },
          {
            text: 'Dev Dependencies',
            route: '/dependencies/dev',
            title: '',
          },
          {
            text: 'Tasks',
            route: 'tasks',
            title: '',
          },
        ],
        currentProject: {
          name: 'npm-gui',
        },
      };
    },
  };
</script>
