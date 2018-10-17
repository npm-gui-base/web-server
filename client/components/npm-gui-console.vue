<style scoped rel="stylesheet/css">
  .console {
    display: flex;
    flex-direction:column;
    flex: 1;
    position: relative;
  }

  pre {
    border: 1px solid #dfd7ca;
    border-radius: 2px;
    color: #8e8c84;
    font-family: Menlo, Monaco, Consolas, "Courier New", monospace;
    font-size: .8em;
    margin-bottom: 0;
    margin-top: 15px;
    overflow: auto;
    padding: 7px;
    position: relative;
    word-break: break-all;
    word-wrap: break-word;

    flex: 1;
  }

  p {
    left: 7px;
    position: absolute;
    top: 7px;
  }

  header p {
    display: inline-block;
    margin: 0;
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
  import NpmGuiBtn from './npm-gui-btn.vue';

  export default {
    components: {
      NpmGuiBtn,
    },
    created() {
      this.connectConsole();
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
      connectConsole() {
        const consoleSocket = new WebSocket(`ws://${location.host}/api/console`);// eslint-disable-line
        consoleSocket.onmessage = (msg) => {
          this.log += msg.data;
        };
        consoleSocket.onclose = (msg) => {
          setTimeout(() => this.connectConsole(), 1000);
        };
      }
    },
  };
</script>
