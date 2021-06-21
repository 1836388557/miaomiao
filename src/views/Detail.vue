<template>
  <div id="main">
    <Header title="影片详情">
      <i class="iconfont icon-right" @touchstart="handleToBack"></i>
    </Header>
    <Scroller v-if="detailMovie">
    <div id="content" class="contentDetail" v-if="detailMovie">
      <div class="detail_list">
        <div class="detail_list_bg"></div>
        <div
          class="detail_list_filter"
          :style="{
            'background-image':
              'url(' + detailMovie.img.replace('/w.h', '') + ')',
          }"
        ></div>
        <div class="detail_list_content">
          <div class="detail_list_img">
            <img :src="detailMovie.img | handleImg" alt="" />
          </div>
          <div class="detail_list_info">
            <h2>{{ detailMovie.nm }}</h2>
            <p>{{ detailMovie.enm }}</p>
            <p style="font-weight: 700; color: #fc0; font-size: 18px">
              {{ detailMovie.sc }}
              <span style="font-size: 12px; color: #fff; opacity: 0.8"
                >（{{ detailMovie.snum }}人评）</span
              >
            </p>
            <p style="margin-top:0;">{{ detailMovie.cat }}</p>
            <p>{{ detailMovie.src }} / {{ detailMovie.dur }}分钟</p>
            <p>{{ detailMovie.pubDesc }}</p>
          </div>
        </div>
      </div>
      <!-- <div class="detail_intro">
        <p>
          {{ detailMovie.dra }}
        </p>
      </div> -->
      <!-- <div class="detail_player swiper-container" ref="detail_player">
        <ul class="swiper-wrapper">
          <li
            v-for="(item, index) in detailMovie.photos"
            :key="index"
            class="swiper-slide">
            <div>
              <img :src="item | handleImg" alt="" />
            </div>
          </li>
        </ul>
      </div> -->
      <!-- <swiper preview="4" class="photoswiper" myclassname="photoswiper" style="padding-left:15px">
          <div class="swiper-slide juz" v-for="(item,index) in detailMovie.photos" :key="index" style="display:flex;">
            <img :src="item | handleImg2" alt="" style="align-items:center;">
          </div>
        </swiper> -->
    <Ciheader :class="isFixed?'fix':''" />
    <CiList2 />
    </div>
    </Scroller>
  </div>
</template>

<script>
import Header from '@/components/Header'
import Ciheader from '@/components/Ciheader'
import CiList2 from '@/components/CiList2'
// import swiper from '@/components/DetailSwiper/DetailSwiper'
export default {
  name: 'Detail',
  data () {
    return {
      detailMovie: null,
      id: null,
      isFixed: false
    }
  },
  components: {
    Header,
    Ciheader,
    CiList2
    // swiper
  },
  methods: {
    handleToBack () {
      this.$router.back()
    },
    handleScroll () {
      if (document.documentElement.scrollTop >= 210) {
        this.isFixed = true
      } else {
        this.isFixed = false
      }
    }
  },
  activated () {
    this.id = this.$route.params.id
    this.$store.state.movieId = this.id
    // https://m.maoyan.com/api/mtrade/mmdb/movie/v5/1250676.json
    console.log(this.id)
    this.axios.get(`/api/mtrade/mmdb/movie/v5/${this.id}.json`).then((res) => {
      if (res.data) {
        this.detailMovie = res.data.data.movie
        console.log(this.detailMovie)
        this.$nextTick(() => {
          // eslint-disable-next-line no-new
          // new Swiper(this.$refs.detail_player, {
          //   slidesPerView: 'auto',
          //   freeMode: true,
          //   freeModeSticky: true
          // })
        })
      }
    })
    window.onscroll = this.handleScroll
  },
  beforeDestroy () {
    window.onscroll = null
  },
  filters: {
    handleImg2: function (data) {
      data = data.replace('/w.h', '')
      return data
    }
  }
}
</script>

<style lang="scss" scoped>
#main {
  height: 100%;
  display: flex;
  flex-direction: column;
}
#content.contentDetail {
  display: block;
  margin-bottom: 0;
}
#content .detail_list {
  height: 200px;
  width: 100%;
  position: relative;
  overflow: hidden;
}
.detail_list .detail_list_bg {
  position: absolute;
  z-index: -1;
  width: 100%;
  height: 100%;
  background-color: #333;
}
.detail_list .detail_list_filter {
  width: 100%;
  height: 100%;
  z-index: -1;
  overflow: hidden;
  position: absolute;
  -webkit-filter: blur(1.2rem);
  filter: blur(1.2rem);
  background-size: cover;
  background-repeat: no-repeat;
  opacity: 0.55;
}
.detail_list .detail_list_content {
  display: flex;
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  z-index: 2;

}
.detail_list .detail_list_img {
  width: 108px;
  height: 150px;
  border: solid 1px #f0f2f3;
  margin: 20px;
}
.detail_list .detail_list_img img {
  width: 100%;
  height: 100%;
}
.detail_list .detail_list_info {
  margin-top: 20px;
}
.detail_list .detail_list_info h2 {
  font-size: 20px;
  color: white;
  font-weight: bold;
  line-height: 20px;
}
.detail_list .detail_list_info p {
  color: #fff;
  line-height: 18px;
  font-size: 12px;
  opacity:0.8;
  margin-top:10px;

}
#content .detail_intro {
  padding: 10px;
}
#content .detail_player {
  margin: 20px;
}
.detail_player .swiper-slide {
  width: 70px;
  margin-right: 20px;
  text-align: center;
  font-size: 14px;
}
.detail_player .swiper-slide img {
  width: 100%;
  margin-bottom: 5px;
}
.detail_player .swiper-slide p:nth-of-type(2) {
  color: #999;
}
</style>
