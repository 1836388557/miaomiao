<template>
  <div id="main">
    <Header title="喵喵电影" />
    <div id="content">
      <div class="movie_menu">
        <router-link
          class="city_name"
          tag="div"
          to="/movie/city"
          active-class="c_active"
        >
          <span>大连</span><i class="iconfont icon-lower-triangle"></i>
        </router-link>
        <div class="hot_switch">
          <router-link
            class="hot_item"
            tag="div"
            to="/movie/nowplaying"
            active-class="s_active"
            >正在热映</router-link
          >
          <router-link
            class="hot_item"
            tag="div"
            to="/movie/comingsoon"
            active-class="s_active"
            >即将上映</router-link
          >
        </div>
        <router-link
          class="search_entry"
          tag="div"
          to="/movie/search"
          active-class="c_active"
        >
          <i class="iconfont icon-sousuo"></i>
        </router-link>
      </div>
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </div>

    <TabBar />
  </div>
</template>

<script>
import Header from '@/components/Header'
import TabBar from '@/components/TabBar'
export default {
  name: 'Movie',
  methods: {},
  components: {
    Header,
    TabBar
  }
}
</script>

<style lang="scss" scoped>
.s_active {
  color: #ef4238;
  border-bottom: 2px #ef4238 solid;
}
.c_active {
  color: #ef4238;

}
#content .movie_menu {
  width: 100%;
  height: 45px;
  border-bottom: 1px solid #e6e6e6;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: white;
  z-index: 10;
  .city_name {
    margin-left: 20px;
    height: 100%;
    line-height: 45px;
  }

  .hot_switch {
    display: flex;
    height: 100%;
    line-height: 45px;
    .hot_item {
      font-size: 15px;
      color: #666;
      width: 80px;
      text-align: center;
      margin: 0 12px;
      font-weight: 700;
    }
  }
  .search_entry {
    margin-right: 20px;
    height: 100%;
    line-height: 45px;
    i {
      font-size: 24px;
    }
  }
}
</style>
