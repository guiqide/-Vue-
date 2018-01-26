/* @flow */

import { warn } from 'core/util/index'
import { cached, isUndef } from 'shared/util'

// 使用了缓存:如果name已经标准化过，则直接返回
// 检查前缀：passive:& once:~ capture:!
const normalizeEvent = cached((name: string): {
  name: string,
  once: boolean,
  capture: boolean,
  passive: boolean
} => {
  const passive = name.charAt(0) === '&'
  name = passive ? name.slice(1) : name
  const once = name.charAt(0) === '~' // Prefixed last, checked first
  name = once ? name.slice(1) : name
  const capture = name.charAt(0) === '!'
  name = capture ? name.slice(1) : name
  return {
    name,
    once,
    capture,
    passive
  }
})

export function createFnInvoker (fns: Function | Array<Function>): Function {
  function invoker () {
    const fns = invoker.fns
    if (Array.isArray(fns)) {
      const cloned = fns.slice()
      for (let i = 0; i < cloned.length; i++) {
        cloned[i].apply(null, arguments) // 执行listeners内的每个函数
      }
    } else {
      // return handler return value for single handlers
      return fns.apply(null, arguments)
    }
  }
  invoker.fns = fns
  return invoker
}

export function updateListeners (
  on: Object,
  oldOn: Object,
  add: Function,
  remove: Function,
  vm: Component
) {
  let name, cur, old, event
  for (name in on) {
    cur = on[name] // listener的一项
    old = oldOn[name]
    // 进行标准化，删除前缀后，返回对象：name，once,passive,capture属性
    event = normalizeEvent(name)
    if (isUndef(cur)) {
      process.env.NODE_ENV !== 'production' && warn(
        `Invalid handler for event "${event.name}": got ` + String(cur),
        vm
      )
    } else if (isUndef(old)) { // 没有旧的说明要初始化listener，调用处：core/instance/event.js:19
      if (isUndef(cur.fns)) {
        cur = on[name] = createFnInvoker(cur) //TODO: 这里还没看明白，后面用一下看看是什么流程
      }
      add(event.name, cur, event.once, event.capture, event.passive)
    } else if (cur !== old) {
      old.fns = cur
      on[name] = old
    }
  }
  for (name in oldOn) {
    if (isUndef(on[name])) {
      event = normalizeEvent(name)
      remove(event.name, oldOn[name], event.capture)
    }
  }
}
