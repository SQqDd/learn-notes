// 纯函数
function checkAge(min, age) {
  return age >= min
}

console.log(checkAge(18, 20)) // true

// 柯里化
function checkAgeCurry(min) {
  return function (age) {
    return age >= min
  }
}

const checkAge18 = checkAgeCurry(18)

console.log(checkAge18(20)) // true

// ES6
const checkAgeWithEs = (min) => (age => age >= min)

const checkAgeWithEs18 = checkAgeWithEs(18)

console.log(checkAgeWithEs18(20)) // true
