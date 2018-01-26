# 从源码角度分析全局配置和方法的功能

全局的配置项在core/config.js下，可以看到Config对象下就是vue提供的配置参数及类型

全局的方法主要在core/global-api/下

Vue.extend()
文档上的介绍这里就不重复了，这里主要分析下是怎么实现的
创建一个类，这里我们叫E_Vue类，
将Vue.prototype._init执行一遍（在初始化章节中已经介绍过这个函数的用途）
将所有Vue.prototype下的字段拷贝给E_Vue.prototype
合并Vue的options到E_Vue的options
将所有的options.prop绑定在E_vue._prop
将所有的options.computed转换后绑定在E_vue.prototype下面
将Vue的extend、mixin、use合并到E_Vue
将E_Vue类缓存到数组中的cid下标中

从代码中还看出，它的父类就是this指向的，这个extend可以不止用于Vue。