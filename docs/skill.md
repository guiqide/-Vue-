# 优雅的编程思想

#### 如何避免过渡变量之间的数据一致

写代码时，经常为了转换数据，新建一个临时变量，如果变量里存的是基本类型，那么当需要重新赋值新数据时，老是忘记把所有存这个数据的变量都改了，这样会造成有一个数据有两个不同的版本存在不同的变量上，很容易踩坑。看了vue的源码，尤雨溪会用连等的方式将数据一起修改，这是一个非常好的习惯！比如：

```javascript
const cur = data.name
data.name = cur = cur + 1 // 最好的
cur = cur + 1 // data.name的数据就是旧数据，谁知道以后什么时候会用到这个变量，或者别人开发你的代码时。

```

#### （忘了专业术语，就是传入参数相同时，结果一定相同的编程范式）
这种函数的缓存方式：
```javascript
/**
 * 直接缓存存储结果，如果已经有，则直接返回结果
 */
function cached(fn) {
  const cache = Object.create(null)
  
  return (function cachedFn (str) {
      const hit = cache[str]
      return hit || (cache[str] = fn(str))    
  })
}
const normalize = cached((name) => {
  console.log('cached fun name:', name)
  return `name:${name}`
})

// 使用方法
normalize('a')
normalize('b')
```