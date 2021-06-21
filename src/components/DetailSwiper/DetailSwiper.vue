<template>

    <div class="swiper-container">
      <div class="swiper-wrapper">
        <slot></slot>
      </div>
    </div>

</template>

<script>
import Swiper from 'swiper'
import 'swiper/dist/css/swiper.min.css'
export default {
  props: ['preview', 'myclassname'],
  mounted () {
    console.log('swiper-mounted')
    console.log(this.preview)
    // eslint-disable-next-line no-new
    new Swiper('.' + this.myclassname, {
      slidesPerView: this.preview,
      spaceBetween: this.myclassname === 'actorswiper' ? 10 : 20,
      freeMode: true
    })
  }
}
</script>
<style lang="scss" scoped>
.swiper-wrapper{
  img{
    width:100%;

  }
}

</style>
