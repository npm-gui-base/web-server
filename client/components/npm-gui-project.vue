<style scoped rel="stylesheet/css">
  .container {
    display: inline-block;
    position: relative;
  }

  .explorer {
    position: absolute;
    background: #3e3f3a;
    right: 0;
    top: 100%;
    z-index: 1;
    max-height: 0;
    overflow: hidden;
    margin: 0;
    padding: 0;
    width: 200px;
  }

  .explorer--open {
    border-color: #dfd7ca;
    max-height: unset;
  }

  .folder {
    color: #fff;
    background: none;
    font-size: 12px;
    font-weight: 500;
    border: 0;
    display: inline-block;
    width: 100%;
    text-align: left;
    padding: 8px;
  }

  .file {
    color: #8e8c84;
    font-size: 12px;
    font-weight: 500;
    padding: 8px;
  }

  .folder:hover {
    text-decoration: underline;
    background: #8e8c84;
  }

  p {
    color: #dfd7ca;
    display: inline-block;
    font-size: 0.9em;
    font-weight: 400;
    line-height: 45px;
    margin: 0;
  }
</style>

<template>
  <div
    class="container"
  >
    <p>Current Project path: {{ selectedPath }}</p>
    <npm-gui-btn class="dark" icon="folder" @click="toggle"></npm-gui-btn>
    <ul
      class="explorer"
      v-bind:class="{'explorer--open': isOpen}"
    >
      <li>
        <button class="folder">../</button>
      </li>
      <li v-for="folderOrFile in explorer.ls" v-bind:key="folderOrFile.name">
        <button class="folder" v-if="folderOrFile.isDirectory"><span class="oi" data-glyph="folder"></span> {{ folderOrFile.name }}/</button>
        <span class="file" v-if="!folderOrFile.isDirectory"><span class="oi" data-glyph="file"></span> {{ folderOrFile.name }}</span>
      </li>
    </ul>
  </div>
</template>

<script>
  import axios from 'axios';
  import debounce from 'debounce';
  import NpmGuiBtn from './npm-gui-btn.vue';

  export default {
    components: {
      NpmGuiBtn,
    },
    data() {
      return {
        isOpen: false,
        selectedPath: '/var/www/html/workspace/npm-gui',
        explorer: {
          path: '/var/www/html',
          ls: [{
            name: 'any',
            isDirectory: false,
          }, {
            name: 'sfsegdsr',
            isDirectory: true,
          }, {
            name: 'sdrgsdsfsaefrg',
            isDirectory: false,
          }, {
            name: 'sdrasefgsdrg',
            isDirectory: true,
          }, {
            name: 'sdrgasefsdrg',
            isDirectory: false,
          }],
        },
      };
    },
    created() {
      this.onproject = debounce(this.onproject, 1000);
    },
    methods: {
      toggle() {
        this.isOpen = !this.isOpen;
      },

      onExplorer() {
        this.loading = true;
        this.projectResults = [];

        axios
          .post(`/api/project/${this.projectRepo}`, {
            query: this.projectQuery,
          })
          .then((response) => {
            this.loading = false;
            this.error = null;
            this.projectResults = response.data;
          })
          .catch((error) => {
            this.loading = false;
            this.error = error;
          });
      },
    },
  };
</script>
