<template>
  <div class="movie_body">
    <Scroller :handleToScroll="handleToScroll" :handleToTouchEnd="handleToTouchEnd" v-if="datalist">
      <ul>
      <li style="text-align:center;font-size:10px;color:red;display:block;border:none;transition:linear;" v-show="isPull" ref="topPull">{{pullDownMsg}}</li>
      <li v-for="data in datalist.movieList" :key="data.id" @tap="handleToDetail(data.id)" >
        <div class="pic_show"><img :src="data.img" alt="" /></div>
        <div class="info_list">
          <h2>
            {{ data.nm }}<img v-if="data.version" src="@/assets/maxs.png" />
          </h2>
          <p>
            观众评<span class="grade">{{ data.sc }}</span>
          </p>
          <p>主演：{{ data.star }}</p>
          <p>{{ data.showInfo }}</p>
        </div>
        <div class="btn_mall">购票</div>
      </li>
    </ul>
    </Scroller>

  </div>
</template>

<script>

export default {

  name: 'Nowplaying',
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
      for (let i = 0; i < data.movieList.length; i++) {
        data.movieList[i].img =
          data.movieList[i].img.replace('/w.h', '') + '@1l_1e_1c_128w_180h'
        // console.log(data.movieList[i].img)
      }
      return data
    },
    handleToDetail (id) {
      console.log('handleToDetail')
      this.$router.push({ name: 'detail', params: { id } })
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
      if (pos.y > 40) {
        this.isPull = true
        this.axios({
          method: 'get',
          url: '/ajax/movieOnInfoList?token=&optimus_uuid=2B9F7D60D17A11EBAEEF5DD8B7FCF8D161DDB3E0AB464F98882820B19B239436&optimus_risk_level=71&optimus_code=10'
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
    var cityId = this.$store.state.city.id
    if (this.preCityId === cityId) {
      return
    }
    this.$showLoading()
    var value = encodeURIComponent(window.localStorage.getItem('nowCityId')) + '%2C' + encodeURIComponent(window.localStorage.getItem('nowCityNm'))
    console.log(value)
    document.cookie = `selectci=true;path=/;expires=${new Date().setDate(7 + new Date().getDate())}`
    document.cookie = `ci=${value};path=/;expires=${new Date().setDate(7 + new Date().getDate())}`
    console.log(document.cookie)
    this.axios({
      method: 'get',
      url: '/ajax/movieOnInfoList?token=&optimus_uuid=2B9F7D60D17A11EBAEEF5DD8B7FCF8D161DDB3E0AB464F98882820B19B239436&optimus_risk_level=71&optimus_code=10'

    }).then((res) => {
      console.log(res.data)

      this.datalist = this.handleImg(res.data)
      console.log(this.datalist)
      this.preCityId = cityId
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
  }
}
</style>
