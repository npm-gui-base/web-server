<style scoped lang="scss" rel="stylesheet/scss">
  @import "../../variables";

  $height: 45px;

  h1 {
    color: $npm-gui-color-light;
    display: inline-block;
    font-size: 1em;
    font-weight: 400;
    line-height: $height;
    margin: 0 ($npm-gui-gutter / 2) 0 0;
  }

  nav {
    background: $npm-gui-color-dark;
    height: $height;
    padding-left: $npm-gui-gutter / 2;
    padding-right: $npm-gui-gutter / 2;

    @include flex-basis($height);
  }

  .right-section {
    float: right;
  }

  p {
    color: $npm-gui-color-gray;
    display: inline-block;
    font-size: .9em;
    font-weight: 400;
    line-height: $height;
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
  import NpmGuiBtn from '../npm-gui-btn';

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
            route: 'global-dependencies',
            title: '',
          },
          {
            text: 'Dependencies',
            route: 'dependencies',
            title: '',
          },
          {
            text: 'Dev Dependencies',
            route: 'dev-dependencies',
            title: '',
          },
          {
            text: 'Tasks',
            route: 'tasks',
            title: '',
          },
//          {
//            text: 'Webpack GUI',
//            route: 'webpack-gui',
//            title: '',
//          },
//          {
//            text: 'Command Builder',
//            route: 'command-builder',
//            title: '',
//          },
        ],
        currentProject: {
          name: 'npm-gui',
        },
      };
    },
  };
</script>
