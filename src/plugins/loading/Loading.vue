<template>
  <div class="container" v-show="isShow">
    <div class="loading"></div>
    <p class="title">{{ title }}</p>
  </div>
</template>

<script>
export default {
  name: 'Loading',
  data () {
    return {
      title: '正在加载...',
      isShow: false
    }
  }
}
</script>

<style scoped lang="scss">
.container {
  width: 100px;
  height: 100px;
  border-radius: 10px;
  background-color: rgba(218, 211, 211, 0.4);
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}

.loading {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 4px solid #fff;
  margin: 10px auto;
  border-right-color: rgb(224, 77, 57);
  animation: loading 2s linear infinite;
}

@keyframes loading {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.title {
  text-align: center;
  font-size: 8px;
  color: rgb(223, 122, 122);
}
</style>
