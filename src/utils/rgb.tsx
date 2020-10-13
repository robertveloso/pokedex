export function rgb(r, g, b) {
  return `rgb(${r}, ${g}, ${b})`
}

export function getRGB(str) {
  var vals = str.substring(str.indexOf('(') + 1, str.length - 1).split(', ')
  return {
    r: Number(vals[0]),
    g: Number(vals[1]),
    b: Number(vals[2])
  }
}
