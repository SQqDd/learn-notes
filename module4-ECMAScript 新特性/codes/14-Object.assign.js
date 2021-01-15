// Object.assign
const source1 = {
  a: 1,
  b: 2,
  data: {
    test: 2
  }
}

const source2 = {
  d: 5,
  b: 1
}

const target = {
  b: 4,
  c: 3,
  data: {
    value: 1,
    array: []
  }
}

const result = Object.assign(target, source1, source2)

console.log(result) // { b: 1, c: 3, data: { test: 2 }, a: 1, d: 5 }
// data 属性被覆盖掉了
console.log(result === target) // true
