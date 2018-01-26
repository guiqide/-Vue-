# 当使用Vue时初始化的流程

在实例Vue时，Vue类的整个代码已经构建完成，我们实例它时，其实是从一个被设定好的入口进入Vue，比如我们其实就是从Vue.constructor的入口进入，并进入Vue.prototype._init函数的一个过程。

``` javascript
    const vm = new Vue({
        el: '#app'，
    })
```

本项目的角度：从使用入口分析出发，反推出整个Vue的逻辑

## Vue.prototype._init的作用
合并父类和自身的options参数
进行父子类之间的关联
初始化
