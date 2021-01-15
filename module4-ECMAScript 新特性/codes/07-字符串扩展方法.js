const message = "TypeError: Assignment to constant variable."

// 是否包含某个字符串
console.log(message.includes('t')) // true
console.log(message.includes('to')) // true
console.log(message.includes('to ')) // true

// 是否以某个字符串开头
console.log(message.startsWith('TypeError')) // true

// 是否以某个字符串结尾
console.log(message.endsWith('variable')) // false
console.log(message.endsWith('variable.')) // true
