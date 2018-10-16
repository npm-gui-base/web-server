<style scoped rel="stylesheet/css">
  .dependencies {
    display: flex;
    flex: 1;
    flex-direction:column;

    position: relative;
  }

  .table-container {
    border: 1px solid #dfd7ca;
    border-radius: 2px;
    margin-bottom: 15px;
    margin-top: 15px;
    overflow: auto;

    flex: 1;
  }

  iframe {
    border: 0;
    height: 50px;
  }

  .right {
    float: right;
  }

  .label {
    border-radius: 2px;
    color: #fff;
    float: right;
    font-size: .8em;
    font-weight: bold;
    padding: .2em .4em;
  }
  .label--danger {
    background: #d9534f;
  }
  .label--warning {
    background: #ef5c0e;
  }

  .loading {
    margin-top: 10vh;
    text-align: center;
  }

  .column-action {
    width: 11em;
  }

  .column-nsp {
    width: 8em;
  }

  .column-version {
    width: 10%;
  }
</style>

<template>
  <div class="dependencies">
    <header>
      <npm-gui-search></npm-gui-search>
      <div class="right">
        <!-- <npm-gui-btn
          class="info small"
          icon="fork"
          title="Searches the local package tree and attempts to simplify the overall structure by moving dependencies further up the tree, where they can be more effectively shared by multiple dependent packages."
        >Dedupe
        </npm-gui-btn>
        <npm-gui-btn
          class="info small"
          icon="list"
          title="This command removes 'extraneous' packages."
        >Prune
        </npm-gui-btn>
        <npm-gui-btn
          class="info small"
          icon="lock-locked"
          disabled
        >Lock All
        </npm-gui-btn>
        <npm-gui-btn
          class="info small"
          icon="lock-unlocked"
          disabled
        >Unlock All
        </npm-gui-btn>
        <npm-gui-btn
          class="danger small"
        >All To Target
        </npm-gui-btn>
        <npm-gui-btn
          class="danger small"
        >All To Latest
        </npm-gui-btn> -->
        <npm-gui-btn
          class="danger small"
          icon="loop-circular"
        >Re/Install All
        </npm-gui-btn>
      </div>
    </header>
    <div class="table-container">
      <table v-show="!loading">
        <tr>
          <th>Name</th>
          <th>Version</th>
          <th>NSP</th>
          <th>Installed</th>
          <th>Wanted</th>
          <th>Latest</th>
          <th>Action</th>
        </tr>
        <tr v-for="dependency in dependencies">
          <td>
            {{ dependency.key }}
            <span class="label label--warning" v-if="dependency.repo === 'bower'">Bower</span>
            <span class="label label--danger" v-if="dependency.repo === 'npm'">npm</span>
          </td>
          <td class="column-version">{{ dependency.value }}</td>
          <td class="column-nsp">-</td>
          <td class="column-version">{{ dependency.version }}</td>
          <td class="column-version">{{ dependency.wanted }}</td>
          <td class="column-version">{{ dependency.latest }}</td>
          <td class="column-action">
            <npm-gui-btn icon="trash" class="danger" @click="onRemove(dependency)"></npm-gui-btn>
            <!-- <npm-gui-btn icon="lock-locked" class="primary"></npm-gui-btn>
            <npm-gui-btn icon="external-link" class="warning"></npm-gui-btn> -->
          </td>
        </tr>
      </table>
      <div v-show="loading" class="loading">loading...</div>
    </div>
    <iframe src="http://https://q-nick.github.io/npm-gui/"></iframe>
  </div>
</template>

<script>
  import axios from 'axios';

  import NpmGuiBtn from '../npm-gui-btn';
  import NpmGuiSearch from '../npm-gui-search';

  export default {
    components: {
      NpmGuiBtn,
      NpmGuiSearch,
    },
    data() {
      return {
        loading: false,
        error: null,
        dependencies: {},
      };
    },
    created() {
      this.loadDependencies();
    },
    watch: {
      $route(to) {
        if (to.name.includes('dependencies')) {
          this.loadDependencies();
        }
      },
    },
    methods: {
      loadDependencies() {
        this.loading = true;
        axios
          .get(`/api/project/test-project/${this.$root._route.meta.api}`) // eslint-disable-line
          .then((response) => {
            this.loading = false;
            this.error = null;
            this.dependencies = response.data;
          })
          .catch((error) => {
            this.loading = false;
            this.error = error;
          });
      },

      onRemove(dependency) {
        axios
          .delete(`/api/${this.$root._route.meta.api}/${dependency.repo}/${dependency.key}`) // eslint-disable-line
          .then(() => {
            this.loadDependencies();
          });
      },
    },
  };
</script>
