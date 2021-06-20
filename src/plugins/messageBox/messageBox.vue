<template>
  <div class="messageBox">
    <span>{{title}}</span>
    <p>您是否定位到{{content}}？</p>
    <div>
      <div class="cancel" @touchstart="handleCancel" v-if="cancel">{{cancel}}</div>
      <div class="transfor" @touchstart="handleOk" v-if="ok">{{ok}}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'messageBox',
  data () {
    return {

    }
  }
}
</script>

<style lang="scss" scoped>
.messageBox{
  width:200px;
  height: 120px;
  border: 1px rgb(245, 189, 189) solid;
  border-radius: 4px;
  background: white;
  box-shadow:4px 4px 10px 2px #ccc;
  position: absolute;
  left:50%;
  top:50%;
  margin: -70px 0 0 -100px;
  text-align: center;
  span{
    text-align: center;
    font-size:20px;
    line-height:30px;
    font-weight: bold;
  }
  p{
    text-align: center;
    font-size:14px;
    line-height:40px;
  }
}
.messageBox>div{
  display: flex;
  position: absolute;
  bottom: 0;
  width:100%;
  border-top:1px solid  rgb(245, 189, 189);
  div{
    flex:1;
    border-right:1px solid  rgb(245, 189, 189);
    text-align: center;
    line-height:30px;
    font-size:16px;
    background: white;
  }
  .cancel:hover {
    background-color:  rgb(241, 238, 238);
  }
  .transfor:hover {
    background-color:  rgb(241, 238, 238);
  }
  div:last-child{
    border:none
  }
}
</style>
