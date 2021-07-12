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


  return {
    chunk: chunk,
    compact: compact,
    difference: difference,
    differenceBy: differenceBy,
    drop: drop,
  }
}()
