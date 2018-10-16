<style scoped lang="scss" rel="stylesheet/scss">
  @import "../../variables.scss";

  $hover-darken: 7%;
  $padding: 10px;

  @mixin button($name, $color) {
    &.#{$name} {
      background-color: $color;

      &:hover {
        background-color: darken($color, $hover-darken);
      }

      &:active {
        background-color: darken($color, $hover-darken * 2);
      }

      &:disabled {
        background-color: lighten($color, $hover-darken * 2);
      }
    }
  }

  button {
    border: 0;
    border-radius: $npm-gui-radius;
    color: $npm-gui-color-light;
    font-family: inherit;
    font-size: 11px;
    font-weight: 500;
    outline: none;
    padding: $padding;
    text-transform: uppercase;
    transition: background-color 200ms;

    @include button('primary', $npm-gui-color-primary);
    @include button('dark', $npm-gui-color-dark);
    @include button('warning', $npm-gui-color-warning);
    @include button('danger', $npm-gui-color-danger);
    @include button('success', $npm-gui-color-success);
    @include button('info', $npm-gui-color-info);

    &.small {
      font-size: 9.5px;
      padding: $padding * .6;
    }

    &:first-child {
      margin-left: 0;
    }

    &:last-child {
      margin-right: 0;
    }

    .oi {
      font-size: inherit;
      margin-right: 3px;
    }
  }
</style>

<template>
  <button
    v-on:click="onClick"
    type="button"
  >
    <span></span>
    <span v-if="icon" class="oi" :data-glyph="icon"></span>
    <slot></slot>
  </button>
</template>

 <script lang="babel" type="text/babel">
 export default {
   props: ['icon', 'route'],
   methods: {
     onClick: function wtf(event) {
       if (this.route) {
         this.$root._router.replace(this.route); // eslint-disable-line
       } else {
         this.$emit('click', event);
       }
     },
   },
 };
</script>
