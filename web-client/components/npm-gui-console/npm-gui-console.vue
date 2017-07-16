<style scoped lang="scss" rel="stylesheet/scss">
  @import "../../variables.scss";

  .console {
    @include flexbox();
    @include flex-direction(column);
    @include flex();
  }

  pre {
    border: 1px solid $npm-gui-color-gray;
    border-radius: $npm-gui-radius;
    color: $npm-gui-color-gray-deep;
    font-family: Menlo, Monaco, Consolas, "Courier New", monospace;
    font-size: .8em;
    margin-bottom: 0;
    margin-top: $npm-gui-gutter / 2;
    overflow: auto;
    padding: $npm-gui-gutter / 4;
    position: relative;
    word-break: break-all;
    word-wrap: break-word;

    @include flex();

    p {
      bottom: $npm-gui-gutter / 4;
      left: $npm-gui-gutter / 4;
      position: absolute;
      right: $npm-gui-gutter / 4;
      top: $npm-gui-gutter / 4;
    }
  }

  header {
    p {
      display: inline-block;
      margin: 0;
    }
  }

  .right {
    float: right;
  }
</style>

<template>
  <div class="console">
    <header>
      <p><span class="oi" data-glyph="terminal"></span> Console</p>
      <div class="right">
        <npm-gui-btn
          class="danger small"
          icon="delete"
          v-on:click="clear()"
        >Clear
        </npm-gui-btn>
      </div>
    </header>
    <pre><p>{{log}}</p></pre>
  </div>
</template>

<script>
  import NpmGuiBtn from '../npm-gui-btn';

  export default {
    components: {
      NpmGuiBtn,
    },
    created() {
      const consoleSocket = new WebSocket(`ws://${location.host}/api/console`);// eslint-disable-line
      consoleSocket.onmessage = (msg) => {
        this.log += msg.data;
      };
    },
    data() {
      return {
        log: '',
      };
    },
    methods: {
      clear() {
        this.log = '';
      },
    },
  };
</script>
