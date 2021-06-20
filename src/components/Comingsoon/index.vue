<template>
  <div class="movie_body" ref="movie_body">
    <Scroller :handleToScroll="handleToScroll" :handleToTouchEnd="handleToTouchEnd" v-if="datalist">
    <ul v-if="datalist">
      <li style="text-align:center;font-size:10px;color:red;display:block;border:none;transition:linear;" v-show="isPull" ref="topPull">{{pullDownMsg}}</li>
      <li v-for="data in datalist.coming" :key="data.id" @tap="handleToDetail">
        <div class="pic_show"><img :src="data.img" /></div>
        <div class="info_list">
          <h2>{{data.nm}}<img v-if="data.version" src="@/assets/maxs.png"></h2>
          <p><span class="person">{{data.wish}}</span> 人想看</p>
          <p>主演: {{data.star}}</p>
          <p>{{data.rt}}上映</p>
        </div>
        <div class="btn_pre">预售</div>
      </li>
    </ul>
   </Scroller>
  </div>
</template>

<script>
// https://m.maoyan.com/ajax/comingList?ci=10&token=&limit=10&optimus_uuid=9AB21B50C39111EB9BD35FB66045BAEE2943D17686244A79A25B62905721C15D&optimus_risk_level=71&optimus_code=10

export default {
  name: 'Comingsoon',
  data () {
    return {
      datalist: null,
      pullDownMsg: '',
      isPull: false,
      preCityId: -1

    }
  },
  methods: {
    handleImg (data) {
      for (let i = 0; i < data.coming.length; i++) {
        data.coming[i].img = data.coming[i].img.replace('/w.h', '') + '@1l_1e_1c_128w_180h'
      }
      return data
    },
    handleToDetail () {
      console.log('handleToDetail')
    },
    handleToScroll (pos) {
      if (pos.y > 10) {
        this.isPull = true
        this.pullDownMsg = '下拉更新'
        this.$refs.topPull.style.height = pos.y + 'px'
      }
      if (pos.y > 40) {
        this.$refs.topPull.style.height = 20 + 'px'
        this.pullDownMsg = '正在为您更新内容...'
      }
    },
    handleToTouchEnd (pos) {
      this.isPull = false
      if (pos.y > 40) {
        this.isPull = true
        this.axios({
          type: 'get',
          url: '/ajax/comingList?ci=10&token='
        }).then((res) => {
          console.log(res.data)
          this.pullDownMsg = '更新完毕'
          setTimeout(() => {
            this.isPull = false
            this.datalist = this.handleImg(res.data)
            console.log(this.datalist)
          }, 1000)
        })
      }
    }
  },
  activated () {
    this.axios({
      method: 'get',
      url: `/ajax/comingList?ci=${this.$store.state.city.id}&token=`
    }).then((res) => {
      console.log(res.data)

      this.datalist = this.handleImg(res.data)
      console.log(this.datalist)
      this.$hiddenLoading()
    })
  },
  beforeMount () {
    this.$showLoading()
  }
}
</script>

<style lang="scss" scoped>
.movie_body {
  flex: 1;
  overflow: auto;
  ul {
    margin: 0 12px;
    overflow: hidden;
    li {
      margin-top: 12px;
      display: flex;
      align-items: center;
      border-bottom: 1px #e6e6e6 solid;
      padding-bottom: 10px;
    }
  }
  .pic_show {
    width: 64px;
    height: 90px;
    img {
      width: 100%;
    }
  }
  .info_list {
    margin-left: 10px;
    flex: 1;
    position: relative;
    h2 {
      font-size: 17px;
      line-height: 24px;
      width: 150px;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
    p {
      font-size: 13px;
      color: #666;
      line-height: 22px;
      width: 200px;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
    .grade {
      font-weight: 700;
      color: #faaf00;
      font-size: 15px;
    }
    img {
      width: 50px;
      position: absolute;
      right: 10px;
      top: 5px;
    }
  }
  .btn_mall,
  .btn_pre {
    width: 47px;
    height: 27px;
    line-height: 28px;
    text-align: center;
    background-color: #f03d37;
    color: #fff;
    border-radius: 4px;
    font-size: 12px;
    cursor: pointer;
  }
  .btn_pre {
    background-color: #3c9fe6;
  }
}
</style>
