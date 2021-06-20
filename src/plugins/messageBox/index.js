import Vue from 'vue'
import messageBox from './messageBox'

export var MessageBox = (function () {
  return function (opts) { // 配置参数
    var defaults = { // 默认值
      title: '',
      content: '',
      cancel: '',
      ok: '',
      handleCancel: null,
      handleOk: null
    }

    var MyComponent = Vue.extend(messageBox)

    for (var attr in opts) {
      defaults[attr] = opts[attr]
    }

    var vm = new MyComponent({
      el: document.createElement('div'),
      data: {
        title: defaults.title,
        content: defaults.content,
        cancel: defaults.cancel,
        ok: defaults.ok
      },
      methods: {
        handleCancel () {
          defaults.handleCancel && defaults.handleCancel.call(this)
          document.body.removeChild(vm.$el)
        },
        handleOk () {
          defaults.handleOk && defaults.handleOk.call(this)
          document.body.removeChild(vm.$el)
        }
      }
    })

    document.body.appendChild(vm.$el)
  }
})()