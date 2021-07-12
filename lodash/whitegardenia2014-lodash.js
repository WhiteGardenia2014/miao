whitegardenia2014 = function () {


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


  function difference(array, ...values) {
    let dif = [].concat(...values)
    return array.filter(item => !dif.includes(item))
  }


  function uniq(array) {
    let myset = new Set()
    let res = []
    for (let value of array) {
      if (!myset.has(value)) {
        res.push(value)
      }
      myset.add(value)
    }
    return res
  }


  function uniqBy(array, predicate) {
    let myset = new Set()
    let res = []
    for (let value of array) {
      let fea = predicate(value)
      if (!myset.has(fea)) {
        res.push(value)
      }
      myset.add(fea)
    }
    return res
  }


  function flattenDeep(array) {
    let result = []
    for (let i = 0; i < array.length; i++) {
      result = result.concat(Array.isArray(array[i]) ? flattenDeep(array[i]) : array[i])
    }
    return result
  }


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


  function groupBy(array, )



  return {
    chunk: chunk,
    compact: compact,
    difference: difference,
    flattenDeep: flattenDeep,
    flattenDepth: flattenDepth,
    uniq: uniq,
    uniqBy: uniqBy,
    groupBy: groupBy,
  }
}()
