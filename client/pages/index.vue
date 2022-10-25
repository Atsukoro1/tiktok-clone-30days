<template>
  <h1>Ahoj</h1>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'IndexPage',
  middleware: 'auth',
})
</script>

