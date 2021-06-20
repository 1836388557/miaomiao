<template>
  <div class="search_body">
    <div class="search_input">
      <div class="search_input_wrapper">
        <i class="iconfont icon-sousuo"></i>
        <input type="text" v-model="message" />
      </div>
    </div>
    <div class="search_result">
      <h3>电影/电视剧/综艺</h3>
      <ul>
        <li v-for="data in moviesList" :key="data.id">
          <div class="img"><img :src="data.img | handleImg" /></div>
          <div class="info">
            <p>
              <span>{{ data.nm }}</span
              ><span>{{ data.wish }}想看</span>
            </p>
            <p>{{ data.emn }}</p>
            <p>{{ data.cat }} </p>
            <div class="btn_pre">想看</div>
            <p>{{ data.rt }}</p>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
// https://i.maoyan.com/apollo/ajax/search?kw=1&cityId=10&stype=-1

export default {
  name: 'Search',
  data () {
    return {
      message: '',
      moviesList: []
    }
  },
  methods: {
    cancelRequest () {
      if (typeof this.source === 'function') {
        this.source('终止请求')
      }
    }
  },
  watch: {
    message (newVal) {
      console.log(newVal)
      this.cancelRequest()
      var that = this
      var cityId = this.$store.state.city.id
      this.axios({
        type: 'get',
        url: `/apollo/ajax/search?kw=${newVal}&cityId=${cityId}&stype=-1`,
        cancelToken: new this.axios.CancelToken(function executor (c) {
          // eslint-disable-next-line no-undef
          that.source = c
        })
      })
        .then((res) => {
          console.log(res.data)

          var movies = res.data.movies
          if (movies) {
            this.moviesList = res.data.movies.list
          }
          console.log(this.moviesList)
        })
        .catch((err) => {
          if (this.axios.isCancel(err)) {
            console.log('Resquest canceled', err.message) // 请求如果被取消，这里是返回取消的message
          } else {
            console.log(err)
          }
        })
    }
  }
}
</script>

<style lang="scss" scoped>
.search_body {
  flex: 1;
  overflow: auto;
  .search_input {
    padding: 8px 10px;
    background-color: #f5f5f5;
    border-bottom: 1px solid #e5e5e5;
  }
  .search_input_wrapper {
    padding: 0 10px;
    border: 1px solid #e6e6e6;
    border-radius: 5px;
    background-color: #fff;
    display: flex;
    line-height: 20px;
    i {
      font-size: 16px;
      padding: 4px 0;
    }
    input {
      border: none;
      font-size: 13px;
      color: #333;
      padding: 4px 0;
      outline: none;
      margin-left: 5px;
      width: 100%;
    }
  }
  .search_result {
    h3 {
      font-size: 15px;
      color: #999;
      padding: 9px 15px;
      border-bottom: 1px solid #e6e6e6;
    }
    li {
      border-bottom: 1px #c9c9c9 dashed;
      padding: 10px 15px;
      box-sizing: border-box;
      display: flex;
    }
    .img {
      width: 60px;
      float: left;
      img {
        width: 100%;
      }
    }
    .info {
      float: left;
      margin-left: 15px;
      flex: 1;
      position: relative;
      p {
        height: 22px;
        display: flex;
        line-height: 22px;
        font-size: 12px;
      }
      p:nth-of-type(1) span:nth-of-type(1) {
        font-size: 18px;
        flex: 1;
      }
      p:nth-of-type(1) span:nth-of-type(2) {
        font-size: 16px;
        color: #fc7103;
      }
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
    position: absolute;
    top:40px;
    right: 0px;

  }
  .btn_pre {
    background-color: #faaf00;
  }
}
</style>
