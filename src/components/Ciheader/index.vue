<template>
      <div class="cinema_menu" ref="menu">
        <div class="city_switch">
          全城 <i class="iconfont icon-lower-triangle"></i>
        </div>
        <div class="brand_swtich">
          品牌 <i class="iconfont icon-lower-triangle"></i>
        </div>
        <div class="feature_switch">
          特色 <i class="iconfont icon-lower-triangle"></i>
        </div>
      </div>

</template>

<script>

export default {
  name: 'Ciheader',
  methods: {

  }
}
</script>

<style lang="scss" scoped>
.cinema_menu {
  width: 100%;
  height: 45px;
  border-bottom: 1px solid #e6e6e6;
  display: flex;
  justify-content: space-around;
  align-items: center;
  background: white;
  z-index: 99;
}
.cinema_menu > div {
  line-height: 48px;
}
.fix{
  top:0px;
  position: fixed;
}
</style>
