<template>
  <div id="app">
  <Header />
  <main class="main container mx-auto">
    <Reservoir />
  </main>
  </div>
</template>

<script>
import Reservoir from "@/components/Reservoir"
import Header from "@/components/Header"
export default {
  name: 'App',
  components: {
    Reservoir,
    Header
}
}
</script>


