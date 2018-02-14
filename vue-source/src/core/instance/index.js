import { initMixin } from './init'
import { stateMixin } from './state'
import { renderMixin } from './render'
import { eventsMixin } from './events'
import { lifecycleMixin } from './lifecycle'
import { warn } from '../util/index'

function Vue (options) {
  if (process.env.NODE_ENV !== 'production' &&
    !(this instanceof Vue)
  ) {
    warn('Vue is a constructor and should be called with the `new` keyword')
  }
  this._init(options)
}

initMixin(Vue)
stateMixin(Vue) // Vue.prototype.$data  Vue.prototype.$props  Vue.prototype.$set  Vue.prototype.$delete Vue.prototype.$watch
eventsMixin(Vue) // Vue.prototype.$on Vue.prototype.$once Vue.prototype.$off Vue.prototype.$emit
lifecycleMixin(Vue) // Vue.prototype._update
renderMixin(Vue) // Vue.prototype.$nextTick Vue.prototype._render

export default Vue
