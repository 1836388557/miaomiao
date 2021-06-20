import Loading from './Loading'

export default {

  install: function (Vue, Options) {
    const LoadingConstructor = Vue.extend(Loading)

    const LoadingInstance = new LoadingConstructor()

    const oDiv = document.createElement('div')

    document.body.appendChild(oDiv)

    LoadingInstance.$mount(oDiv)

    if (Options && Options.title !== null && Options.title !== undefined) {
      LoadingInstance.title = Options.title
    }

    Vue.showLoading = function () {
      LoadingInstance.isShow = true
    }
    Vue.hiddenLoading = function () {
      LoadingInstance.isShow = false
    }

    Vue.prototype.$showLoading = function () {
      LoadingInstance.isShow = true
    }
    Vue.prototype.$hiddenLoading = function () {
      LoadingInstance.isShow = false
    }
  }
}
