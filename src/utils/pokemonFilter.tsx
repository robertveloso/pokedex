export default function pokemonFilter(arr, searchString) {
  if (arr) {
    var result = []
    if (/^\w+$/.test(searchString)) {
      searchString = searchString.toLowerCase()
      arr.forEach(function (item) {
        if (item.indexOf(searchString) >= 0) {
          result.push(item)
        }
      })
    }
    if (/^\d+$/.test(searchString)) {
      searchString = +searchString
      if (searchString < 751 && searchString > 0) {
        result.push(arr[searchString - 1])
      }
    }
    return result
  }
}
