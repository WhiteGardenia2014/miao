whitegardenia2014 = function () {


  function chunk(array, size = 1) {
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





  return {
    chunk: chunk,
  }
}()
