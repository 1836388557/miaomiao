<template>
  <!-- <div class="movie_body">
    <ul>
      <li v-for="data in datalist" :key="data.index">
        <div class="pic_show"><img :src="data.url" alt="" /></div>
        <div class="info_list">
          <h2>{{ data.name }}</h2>
          <p>
            观众评<span class="grade">{{ data.grade }}</span>
          </p>
          <p>主演：{{ data.actors }}</p>
          <p>今天{{ data.home }}家电影院放映{{ data.c }}场</p>
        </div>
        <div class="btn_mall">购票</div>
      </li>
    </ul>
  </div> -->
  <div class="movie_body">
    <ul v-if="datalist">
      <li v-for="data in datalist.movieList" :key="data.id">
        <div class="pic_show"><img :src="data.img" alt="" /></div>
        <div class="info_list">
          <h2>{{ data.nm }}<img v-if="data.version" src="@/assets/maxs.png"></h2>
          <p>
            观众评<span class="grade">{{ data.sc }}</span>
          </p>
          <p>主演：{{ data.star }}</p>
          <p>{{ data.showInfo }}</p>
        </div>
        <div class="btn_mall">购票</div>
      </li>
    </ul>
  </div>
</template>

<script>
// https://m.maoyan.com/ajax/movieOnInfoList?token=
export default {
  name: 'Nowplaying',
  data () {
    return {
      datalist: null
    }
  },
  methods: {
    handleImg (data) {
      for (let i = 0; i < data.movieList.length; i++) {
        data.movieList[i].img = data.movieList[i].img.replace('/w.h', '') + '@1l_1e_1c_128w_180h'
        // console.log(data.movieList[i].img)
      }
      return data
    }
  },
  mounted () {
    this.axios({
      type: 'get',
      url: '/ajax/movieOnInfoList?token='
    }).then((res) => {
      console.log(res.data)

      this.datalist = this.handleImg(res.data)
      console.log(this.datalist)
    })
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
