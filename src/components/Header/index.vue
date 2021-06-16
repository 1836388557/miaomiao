<template>
  <div id="header">
    <h1>{{title}}</h1>
  </div>
</template>

<script>
export default {
  name: 'Header',
  props: {
    title: {
      type: String,
      default: '喵喵影院'
    }
  }
}
</script>

<style lang="scss" scoped>
#header{
  width:100%;
  height:50px;
  color: #fff;
  background: #e54847;
  border-bottom: #e54847 1px solid;
  position: relative;
  h1{
    font-size:18px;
    text-align: center;
    line-height: 50px;
    font-weight: normal;
  }
  i{
    position: absolute;
    top: 50%;
    left:5px;
    margin-top:-13px;
    font-size:26px;
  }
}
</style>
