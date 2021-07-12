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
      return function (item) {
        return item[iteratee]
      }
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
    let myset = new Set()
    let res = []
    for (let value of array) {
      if (!myset.has(value)) {
        res.push(value)
        myset.add(value)
      }
    }
    return res
  }

  // 依赖 iteratee 的结果，对 array 数组去重
  function uniqBy(array, iteratee) {
    let myset = new Set()
    let fun = transType(iteratee)
    let res = []
    for (let value of array) {
      let fea = fun(value)
      if (!myset.has(fea)) {
        res.push(value)
        myset.add(fea)
      }
    }
    return res
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


  return {
    chunk: chunk,
    compact: compact,
    difference: difference,
    flatten: flatten,
    flattenDeep: flattenDeep,
    flattenDepth: flattenDepth,
    concat: concat,
    uniq: uniq,
    uniqBy: uniqBy,
    groupBy: groupBy,
    keyBy: keyBy,
    forEach: forEach,
    map: map,
    isObject: isObject,
    isObjectLike: isObjectLike,
    isFunction: isFunction,
    isString: isString,
    keys: keys,
    values: values,
  }
}()
