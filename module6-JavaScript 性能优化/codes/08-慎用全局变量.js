// 采用全局变量的方式
var index, str = ''

for (index = 0; index < 1000; index++) {
  str+= index
}

// 采用局部变量的方式
for (let i = 0; i < 1000; i++) {
  let str = ''
  str+= i
}
