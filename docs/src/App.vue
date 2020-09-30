<template>
  <div id="app">
    <h1>wcesium</h1>
    <p>cesium开发常用方法</p>
    <v-list>
      <v-list-item :list="list"></v-list-item>
    </v-list>
  </div>
</template>

<script>
export default {
  name: "app",
  data() {
    return {
      list: [
        {
          title: "文档",
          url: "#"
        },
        {
          title: "github",
          url: "https://github.com/wangchaoxu/wcesium"
        }
      ]
    };
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

h1,
h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
