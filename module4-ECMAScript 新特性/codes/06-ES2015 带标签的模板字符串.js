const name = 'ZS'
const gender = true

// 要在字符串前定义模板函数
// 接收的参数，第一个为变量分割的字符串数组，之后的都是插入的变量值
function tagFunc(strings, name, gender) {
  console.log(strings) // [ '', ', is a ', '.' ]
  console.log(name) // ZS
  console.log(gender) // true

  const sex = gender ? 'man' : 'women'

  return strings[0] + name + strings[1] + sex + strings[2]

}

const result = tagFunc`${name}, is a ${gender}.`

console.log(result) // ZS, is a man.

const gender2 = false
const result2 = tagFunc`${name}, is a ${gender2}.`

console.log(result2) // ZS, is a women.
