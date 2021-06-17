<template>
  <div class="city_body">
    <div class="city_list" ref="city_list">
      <div class="city_hot" >
        <h2>热门城市</h2>
        <ul class="clearfix">
          <li v-for="city in hotlist" :key="city.id">{{city.nm}}</li>
        </ul>
      </div>
      <div class="city_sort" ref="city_sort">
        <div v-for="letterCity in citylist" :key="letterCity.index">
          <h2 >{{ letterCity.index }}</h2>
          <ul>
            <li v-for="city in letterCity.list" :key="city.id">
              {{ city.nm }}
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="city_index">
      <ul>
        <li v-for="(letterCity,index) in citylist" :key="letterCity.index" @touchstart="handleToIndex(index)">
          {{ letterCity.index }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
// https://show.maoyan.com/maoyansh/myshow/ajax/config/maoyan-show-m-web.frontEnd.config.cities?sellChannel=13&cityId=1&lng=0&lat=0
export default {
  name: 'City',
  data () {
    return {
      citylist: [],
      hotlist: []
    }
  },
  methods: {
    handleCity (data) {
      var letterArr = []
      var hotArr = []
      for (let i = 0; i < data.length; i++) {
        if (data[i].id <= 50) {
          hotArr.push(data[i])
        }
      }

      for (let i = 65; i <= 90; i++) {
        letterArr.push(String.fromCharCode(i))
      }
      var newlist = []
      for (let j = 0; j < letterArr.length; j++) {
        var arr = data.filter(
          (item) => item.py.substring(0, 1) === letterArr[j].toLowerCase()
        )
        if (arr.length > 0) {
          newlist.push({
            index: letterArr[j],
            list: arr
          })
        }
      }
      return { newlist, hotArr }
    },
    handleToIndex (index) {
      var h2 = this.$refs.city_sort.getElementsByTagName('h2')
      this.$refs.city_list.scrollTop = h2[index].offsetTop
    }
  },
  mounted () {
    this.axios({
      url: '/maoyansh/myshow/ajax/config/maoyan-show-m-web.frontEnd.config.cities',
      type: 'get'
    }).then((res) => {
      console.log(res.data.data)
      var data = JSON.parse(res.data.data)
      var citydata = this.handleCity(data)
      this.citylist = citydata.newlist
      this.hotlist = citydata.hotArr
      console.log(this.citylist)
      console.log(this.hotlist)
    })
  }
}
</script>

<style lang="scss" scoped>
.city_body {
  margin-top: 45px;
  display: flex;
  width: 100%;
  position: absolute;
  top: 0;
  bottom: 0;
  .city_list {
    flex: 1;
    overflow: auto;
    background: #fff5f0;
  }
  .city_list::-webkit-scrollbar {
    background-color: transparent;
    width: 0;
  }
  .city_hot {
    margin-top: 20px;
    h2 {
      padding-left: 15px;
      line-height: 30px;
      font-size: 14px;
      background: #f0f0f0;
      font-weight: normal;
    }
    ul li {
      float: left;
      background: #fff;
      width: 29%;
      height: 33px;
      margin-top: 15px;
      margin-left: 3%;
      padding: 0 4px;
      border: 1px solid #e6e6e6;
      border-radius: 3px;
      line-height: 33px;
      text-align: center;
      box-sizing: border-box;
    }
  }
  .city_sort {
    div {
      margin-top: 20px;
    }
    h2 {
      padding-left: 15px;
      line-height: 30px;
      font-size: 14px;
      background: #f0f0f0;
      font-weight: normal;
    }
    ul {
      padding-left: 10px;
      margin-top: 10px;
      li {
        line-height: 30px;
        line-height: 30px;
      }
    }
  }
  .city_index {
    width: 20px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: center;
    border-left: 1px #e6e6e6 solid;
  }
}
</style>
