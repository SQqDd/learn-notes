const str1 = 'hello'
const str2 = 'world'

// 自动换行，无需输入 \n
console.log(`hello

world
`)

// 要想使用 ` 符号，直接在前面加入 \
console.log(`hello \`world\``) // hello `world`

// 可以使用变量差值
console.log(`hello ${str2}`) // hello world

// 可以使用任务标准的 JS 语句
console.log(`${Math.random()}`)
console.log(`${1 + 2}`) // 3
