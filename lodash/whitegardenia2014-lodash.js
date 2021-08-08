var whitegardenia2014 = function () {

  //***** 类型判断 *****//

  // 判断 value 是不是 String
  function isString(value) {
    return typeof value === "string"
  }

  // 判断 value 是不是 Function
  function isFunction(value) {
    return typeof value === "function"
  }

  // 判断 value 是不是 Array
  function isArray(value) {
    return Array.isArray(value)
  }

  // 判断 value 是不是 ObjectLike，如果 typeof value 为 "object" 并且 value 不是 null，那么 value 是 ObjectLike
  function isObjectLike(value) {
    return typeof value === "object" && value !== null
  }

  // 判断 value 是不是 Object，(e.g. arrays, functions, objects, regexes, new Number(0), and new String(''))
  function isObject(value) {
    return value !== null && (typeof value === "object" || typeof value === "function")
  }


  // 对 iteratee 进行类型转换
  function transType(iteratee) {
    if (isFunction(iteratee)) {
      return iteratee
    }
    if (isString(iteratee)) {
      return property(iteratee)
    }
    if (isArray(iteratee)) {
      let path = iteratee[0]
      let srcValue = iteratee[1]
      return matchesProperty(path, srcValue)
    }
    if (isObjectLike(iteratee)) {
      return matches(iteratee)
    }
  }

  //***** Array *****//

  // array 按照 size 进行分组
  function chunk(array, size = 1) {
    if (!array) {
      return []
    }
    if (array.length == 0) {
      return []
    }
    let length = array.length
    let res = []
    let index = 0
    while (index < length) {
      res.push(array.slice(index, index + size))
      index += size
    }
    return res
  }

  // 去掉 array 中的 falsy 值
  function compact(array) {
    if (!array) {
      return []
    }
    let res = []
    for (let i = 0; i < array.length; i++) {
      if (array[i]) {
        res.push(array[i])
      }
    }
    return res
  }

  // 去掉 array 中，values内的值
  function difference(array, ...values) {
    let dif = [].concat(...values)
    return array.filter(item => !dif.includes(item))
  }

  // array 数组去重
  function uniq(array) {
    return Array.from(new Set(array))
  }
  /* function uniq(array) 不使用集合的方法
  function uniq(array) {
    var result = []
    for (let i = 0; i < array.length; i++) {
      if (!result.includes(ary[i])) {
        result.push(ary[i])
      }
    }
    return result
  }
*/


  // 依赖 iteratee 的结果，对 array 数组去重，iteratee 会调用每个元素，得到每个元素需要比较去重的特征
  function uniqBy(array, iteratee) {
    let myset = new Set()
    let predicate = transType(iteratee)
    let res = []
    for (let value of array) {
      let computed = predicate(value)
      if (!myset.has(computed)) {
        res.push(value)
        myset.add(computed)
      }
    }
    return res
  }
  /* function uniqBy(array, iteratee) 不使用集合的方法
    function uniqBy(array, iteratee) {
      var result = []
      var seen = []
      let predicate = transType(iteratee)
      for (let i = 0; i < array.length; i++) {
        let computed = predicate(array[i], i, array)
        if (!seen.includes(computed)) {
          result.push(ary[i])
          seen.push(computed)
        }
      }
      return result
    }
    */


  // 接受 comparator(aryVal, othVal) 作为比较器，比较器用来判断两个元素，是否是重复的
  function uniqWith(array, comparator) {
    let result = []
    for (let i = 0; i < array.length; i++) {
      if (!result.some(it => comparator(it, array[i]))) {
        result.push(array[i])
      }
    }
    return result
  }


  // 创建一个新数组，将 array 和剩下的值或数组拼接起来
  function concat(array, ...values) {
    let res = array.slice()
    for (let item of values) {
      if (Array.isArray(item)) {
        res = res.concat(item)
      } else {
        res.push(item)
      }
    }
    return res
  }

  // 在数组的 start 下标，和 end 下标之间，填充 value（不包括 end）
  function fill(array, value, start = 0, end = array.length) {
    for (let i = start; i < end; i++) {
      array[i] = value
    }
    return array
  }

  //高维数组展开一层
  function flatten(array) {
    return [].concat(...array)
  }

  //高维数组展开成一维数组
  function flattenDeep(array) {
    let result = []
    for (let i = 0; i < array.length; i++) {
      result = result.concat(Array.isArray(array[i]) ? flattenDeep(array[i]) : array[i])
    }
    return result
  }

  //高维数组展开 depth 深度
  function flattenDepth(array, depth = 1) {
    if (depth == 0) {
      return array.slice()
    }
    let res = []
    for (let i = 0; i < array.length; i++) {
      let item = array[i]
      if (Array.isArray(item)) {
        item = flattenDepth(item, depth - 1)
        res = res.concat(item)
      } else {
        res.push(item)
      }
    }
    return res
  }

  //数组 forEach 方法
  function arrayEach(array, iteratee) {
    let length = array.length
    for (let i = 0; i < length; i++) {
      if (iteratee(array[i], i, array) === false) {
        break
      }
    }
    return array
  }

  //对象 forEach 方法
  function objectEach(collection, iteratee) {
    for (let key in collection) {
      if (iteratee(collection[key], key, collection) === false) {
        break
      }
    }
    return collection
  }

  // forEach 遍历方法，可以通过显式的返回 false 退出遍历
  function forEach(collection, iteratee) {
    let fun = Array.isArray(collection) ? arrayEach : objectEach;
    return fun(collection, iteratee)
  }

  // map 遍历方法
  function map(collection, iteratee) {
    let predicate = transType(iteratee)
    let res = []
    if (Array.isArray(collection)) {
      collection.forEach((item, index, collection) => {
        res.push(predicate(item, index, collection))
      })
      return res
    }
    if (isObject(collection)) {
      for (let key in collection) {
        let value = collection[key]
        res.push(predicate(value, key, collection))
      }
      return res
    }
  }

  // 依赖 iteratee 的结果，对 collection 进行分组
  function groupBy(collection, iteratee) {
    let fun = transType(iteratee)
    return collection.reduce((map, item) => {
      let key = fun(item)
      if (!(key in map)) {
        map[key] = []
      }
      map[key].push(item)
      return map
    }, {})
  }

  // 对 collection 中的元素执行 iteratee ，得到的值作为键，元素作为值，建立新的映射表
  function keyBy(collection, iteratee) {
    let fun = transType(iteratee)
    return collection.reduce((map, item) => {
      let key = fun(item)
      map[key] = item
      return map
    }, {})
  }

  // 返回一个由对象的可枚举属性名组成的数组
  function keys(object) {
    return Object.keys(object)
  }

  // 返回一个由对象的可枚举属性值组成的数组
  function values(object) {
    return Object.values(object)
  }

  // 深度对比
  function isEqual(a, b) {
    if (a === b) {
      return true
    }
    if (typeof a !== typeof b) {
      return false
    }
    if (isObject(a) && isObject(b)) {
      if (Object.keys(a).length != Object.keys(b).length) {
        return false
      }
      for (let key in a) {
        if (key in b) {
          if (!isEqual(a[key], b[key])) {
            return false
          }
        } else {
          return false
        }
      }
      return true
    }
    return false
  }

  // 将路径字符串转换为路径数组
  function toPath(value) {
    if (isArray(value)) {
      return value
    } else {
      return value.match(/\w+/g)
    }
  }

  // 根据路径返回一个对象中路径对应的值，如果值为 undefined，返回 defaultValue 作为替代
  function get(object, path, defaultValue = undefined) {
    path = toPath(path)

    for (let i = 0; i < path.length; i++) {
      if (object == undefined) {
        return defaultValue
      } else {
        object = object[path[i]]
      }
    }
    return object

    // path.reduce((obj, curPath) => {
    //   return obj[curPath]
    // }, object)
  }
  /* function get() 递归写法
 function get(object, path, defaultValue = undefined) {
    if (object == undefined) {
      return defaultValue
    } else if (path.length == 0) {
      return object
    } else {
      return get(object[path[0]], path.slice(1))
    }
  }
  */


  // 返回 func 的绑定函数，bind 可以接受占位符，实现跳跃的参数绑定，占位符由 bind.placeholder 决定
  function bind(func, thisArg, ...fixedArgs) {
    return function (...args) {
      let ary = fixedArgs.slice()
      let j = 0
      // 根据 fixedArgs 和 args 生成新的参数列表，再传递给 func
      for (let i = 0; i < ary.length; i++) {
        if (Object.is(ary[i], bind.placeholder)) {
          if (j < args.length) {
            ary[i] = args[j++]
          } else {
            ary[i] = undefined
          }
        }
      }
      while (j < args.length) {
        ary.push(args[j++])
      }
      return func.apply(thisArg, ary)
    }
  }
  bind.placeholder = "_"


  // 对 object 和 source 进行部分深度比较，判断 object 是否包含与 source 等价的值
  function isMatch(object, source) {
    if (object === source) {
      return true
    }
    if (typeof object !== "object" || typeof source !== "object") {
      return false
    }
    for (let key in source) {
      if (key in object) {
        if (source[key] && typeof source[key] !== "object") { // 原始值直接进行比较
          if (object[key] !== source[key]) {
            return false
          }
        } else {
          if (!isMatch(object[key], source[key])) { // 对象值进行深度比较
            return false
          }
        }
      } else {
        return false
      }
    }
    return true
  }

  // 返回一个函数，该函数接受一个对象参数，判断该对象是否和 src 匹配（即包含 src）
  function matches(src) {
    return bind(isMatch, null, "_", src)
  }

  // 返回一个函数，该函数接受一个对象参数，判断该对象的 path 路径对应的值，是否深度等于 srcValue
  function matchesProperty(path, srcValue) {
    return function (obj) {
      return isEqual(get(obj, path), srcValue)
    }
  }

  // 返回一个函数，该函数接受一个对象参数，返回对象的 path 路径对应的值
  function property(path) {
    return bind(get, null, "_", path)
  }

  // 计算数组中值的和，接受 iteratee 参数，对每个元素执行 iteratee，得到的结果作为需要累加的值
  function sumBy(ary, iteratee = it => it) {
    let predicate = transType(iteratee)
    return ary.reduce((sum, item) => {
      return sum += predicate(item)
    }, 0)
  }

  // 计算数组中值的和
  function sum(ary) {
    return sumBy(ary)
  }

  // 判断 val 是不是 NaN
  function isNaN(val) {
    if (isObject(val)) {
      return val.valueOf() !== val.valueOf()
    }
    return val !== val
  }

  // 判断 val 是不是 null
  function isNull(val) {
    return val === null
  }

  // 判断 val 是不是 undefined
  function isUndefined(val) {
    return val === undefined
  }

  // 判断 val 是不是 null 或者 undefined
  function isNil(val) {
    return val === null || val === undefined
  }

  // parseJson 将 JSON 字符串转换为 JS 对象
  var parseJson = function () {
    // var str = `[1,"fooo",[1,2,3],{"a":1,"b":[1,2,3],"c":{"x":1,"yyy":false}},5,null]`
    // var i = 0

    return function parseJSON(input) {
      // str 和 i 为函数内的全局变量
      str = input
      i = 0
      return parseValue()
    }

    // 递归下降：解析表示递归结构的字符串
    // 每个函数的作用都是从 i 开始解析出对应的内容并返回，并将 i 指向解析完成后的下一个位置，以供之后的函数继续解析

    function parseValue() {
      var c = str[i]

      if (c == '[') {
        return parseArray()
      }
      if (c == '{') {
        return parseObject()
      }
      if (c == '"') {
        return parseString()
      }
      if (c == 't') {
        return parseTrue()
      }
      if (c == 'f') {
        return parseFalse()
      }
      if (c == 'n') {
        return parseNull()
      }
      return parseNumber()
    }

    // 从 i 指向的位置解析出一个 true，并将 i 指向 true 的下一个位置
    function parseTrue() {
      i += 4
      return true
    }

    // 从 i 指向的位置解析出一个 false，并将 i 指向 false 的下一个位置
    function parseFalse() {
      i += 5
      return false
    }

    // 从 i 指向的位置解析出一个 null，并将 i 指向 null 的下一个位置
    function parseNull() {
      i += 4
      return null
    }

    // 从 i 指向的位置（此时为 "）解析出一个字符串，并将 i 指向字符串的下一个位置
    function parseString() {
      i++ // 跳过当前的双引号
      var result = ''
      while (str[i] !== '"') { // 没有遇到结束的双引号，就不断拼接字符串
        result += str[i++]
      }
      i++ // 跳过最后一个双引号
      return result
    }

    // 从 i 指向的位置解析出一个数值，并将 i 指向数值的下一个位置
    function parseNumber() {
      var numStr = ''
      while (str[i] >= '0' && str[i] <= '9') { // 如果遇到的数字，就拼接到字符串中
        numStr += str[i++]
      }
      return Number(numStr)
    }

    // 从 i 指向的位置（此时为 [）解析出一个数组，并将 i 指向数组的下一个位置
    function parseArray() {
      i++ // 跳过当前的 [
      var result = []

      while (str[i] !== ']') { // 如果遇到了 ] ，就退出循环
        var val = parseValue() // 解析出一个值，并放入 result 中
        result.push(val)

        if (str[i] == ',') { // 如果遇到了逗号，就跳过这个逗号
          i++
        }
      }
      i++ // 跳过最后一个 ]
      return result
    }

    // 从 i 指向的位置（此时为 {）解析出一个对象，并将 i 指向对象的下一个位置
    function parseObject() {
      i++ // 跳过当前的 {
      var result = {}

      while (str[i] !== '}') { // 如果遇到了 } ，就退出循环
        var key = parseString() // 解析出一个字符串，作为 key
        i++ // 跳过 key 后面的 :
        var val = parseValue() // 解析出一个值，作为 val

        result[key] = val // 将键值对添加到 result 中

        if (str[i] == ',') { // 如果遇到了逗号，就跳过这个逗号
          i++
        }
      }
      i++ // 跳过最后一个 }
      return result
    }
  }()

  // stringifyJson 将 JS 对象转换为 JSON 字符串
  function stringifyJson(value) {
    // 转换数组类型
    if (Array.isArray(value)) {
      let str = "["
      for (let i = 0; i < value.length; i++) {
        str = str + stringify(value[i]) + ","
      }
      str = str.slice(0, -1) // 去掉最后一个逗号
      str = str + "]"
      return str
    }

    // 转换对象类型
    if (typeof value == "object") {
      let str = "{"
      for (let key in value) {
        let val = value[key]
        str = str + '"' + key + '":' + stringify(val) + ","
      }
      str = str.slice(0, -1) // 去掉最后一个逗号
      str = str + "}"
      return str
    }

    // 转换数值类型
    if (typeof value == "number") {
      return String(value)
    }

    // 转换字符串类型
    if (typeof value == "string") {
      return '"' + value + '"' // 字符串两端要加上双引号
    }

    // 转换布尔类型
    if (typeof value == "boolean") {
      if (value) {
        return "true"
      } else {
        return "false"
      }
    }
  }

  return {
    chunk: chunk,
    compact: compact,
    difference: difference,
    flatten: flatten,
    flattenDeep: flattenDeep,
    flattenDepth: flattenDepth,
    concat: concat,
    fill: fill,
    uniq: uniq,
    uniqBy: uniqBy,
    uniqWith: uniqWith,
    groupBy: groupBy,
    keyBy: keyBy,
    sum: sum,
    sumBy: sumBy,
    forEach: forEach,
    map: map,
    get: get,
    property: property,
    toPath: toPath,
    isMatch: isMatch,
    matches: matches,
    matchesProperty: matchesProperty,
    isObject: isObject,
    isObjectLike: isObjectLike,
    isFunction: isFunction,
    isArray: isArray,
    isString: isString,
    isEqual: isEqual,
    isNaN: isNaN,
    isNull: isNull,
    isUndefined: isUndefined,
    isNil: isNil,
    keys: keys,
    values: values,
    bind: bind,
    parseJson: parseJson,
    stringifyJson: stringifyJson,
  }
}()
