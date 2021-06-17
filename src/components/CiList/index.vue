<template>
  <div>
    <div class="cinema_body">
      <div
        class="cinema-list"
        data-cid="c_5ovvtlp2"
        style="margin-bottom: 55px;"
      >
        <div class="list-wrap" style="margin-top: 0px; min-height: 627px" v-html="cityInfo"></div>
      </div>
      <!-- <ul>
        <li>
          <div>
            <span>大地影院(澳东世纪店)</span>
            <span class="q"><span class="price">22.9</span> 元起</span>
          </div>
          <div class="address">
            <span>金州区大连经济技术开发区澳东世纪3层</span>
            <span>1763.5km</span>
          </div>
          <div class="card">
            <div>小吃</div>
            <div>折扣卡</div>
          </div>
        </li>
      </ul> -->
    </div>
  </div>
</template>

<script>
// /ajax/moreCinemas?day=2021-06-17&offset=0&limit=20&districtId=-1&lineId=-1&hallType=-1&brandId=-1&serviceId=-1&areaId=-1&stationId=-1&item=&updateShowDay=true&reqId=1623936381709&cityId=10&optimus_uuid=9AB21B50C39111EB9BD35FB66045BAEE2943D17686244A79A25B62905721C15D&optimus_risk_level=71&optimus_code=10
export default {
  name: 'CiList',
  data () {
    return {
      cityInfo: null
    }
  },
  methods: {},
  mounted () {
    this.axios({
      type: 'get',
      url: '/ajax/moreCinemas?cityId=10'
    }).then((res) => {
      // console.log(res.data)
      this.cityInfo = res.data
    })
  }
}
</script>

<style lang="scss" scoped>
.cinema_body {
  flex: 1;
  overflow: auto;
}
</style>
