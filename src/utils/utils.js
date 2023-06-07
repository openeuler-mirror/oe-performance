export const invalidNumberSymbol = -1

export function flattenObj(ob){
  let result = {};

  for (const i in ob) {
    if ((typeof ob[i]) === 'object' && !Array.isArray(ob[i])) {
      const temp = flattenObj(ob[i]);
      for (const j in temp) {
        result[`${i}.${j}`] = temp[j];
      }
    } else {
      result[i] = ob[i];
    }
  }
  return result;
};

export function formatDate(date, fmt) {
  if (typeof date === 'string') {
    return date;
  }

  if (!fmt) fmt = 'yyyy-MM-dd hh:mm:ss';

  if (!date || date === null) return null;
  let o = {
    'M+': date.getMonth() + 1, // 月份
    'd+': date.getDate(), // 日
    'h+': date.getHours(), // 小时
    'm+': date.getMinutes(), // 分
    's+': date.getSeconds(), // 秒
    'q+': Math.floor((date.getMonth() + 3) / 3), // 季度
    'S': date.getMilliseconds() // 毫秒
  }
  if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (`${date.getFullYear()}`).substr(4 - RegExp.$1.length))
  for (let k in o) {
    if (new RegExp(`(${k})`).test(fmt)){
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : ((`00${o[k]}`).substr((`${o[k]}`).length)))
    }
  }
  return fmt
}

/**
 * 判断两个array的内容是否一致，只进行第一层的元素对比。对比直接用等号进行判断。
 * 故本方法只适用于元素为基本数据类型的数组。
 * @returns 是否一致
 */
export function isArrayTheSame_l1(originArr, checkedArr) {
  let sameFlag = true
  if (originArr.length !== checkedArr.length) return false
  originArr.forEach((item, idx) => {
    if (item !== checkedArr[idx]) {
      sameFlag = false
    }
  })
  return sameFlag
}

/**
 * 计算平均值
 * @param {*} inputArr 
 * @returns 
 */
export const computeMean = (inputArr) => {
  let sum = 0
  let count = 0
  if (!Array.isArray(inputArr)) {
    return invalidNumberSymbol
  }
  inputArr.forEach(val => {
    if (isNaN(val)) {
      return
    }
    sum += Number(val)
    count += 1
  })
  // 无数据情况
  if (count === 0) {
    return invalidNumberSymbol // 特殊标识
  }
  return (sum / count).toFixed(3)
}
/**
 * 计算几何平均值
 */
export const computeGeoMean = (inputArr) =>{
  let testmentVal = 1
  let count = 0
  const tempArr = inputArr.filter(val => val >= 0) // 性能值应为正数
  if (tempArr.length < 1) {
    return invalidNumberSymbol // 无数据情况
  }
  tempArr.forEach(val => {
    testmentVal *= val
    count += 1
  })
  return Math.pow(testmentVal, 1/count).toFixed(3)
}

/**
 * 计算标准偏差
 *   def sample_variance
    avg = average
    sum = inject(0) { |acc, i| acc + (i - avg)**2 }
    1 / length.to_f * sum
  end

  def standard_deviation
    Math.sqrt(sample_variance)
  end

  def relative_stddev
    standard_deviation * 100 / average
  end
 */
export const computeStddev = (inputArr) => {
  const tempArr = inputArr.filter(val => val >= 0) // 性能值应为正数
  if (tempArr.length < 1) {
    return invalidNumberSymbol // 无数据情况
  }
  const avg = computeMean(inputArr)
  let sum = 0
  inputArr.forEach(num => {
    sum += Math.pow(num - avg, 2)
  })
  sum = sum / inputArr.length
  return (Math.sqrt(sum) / avg).toFixed(3)
}

/**
 * 
 */
export const formatterPercentage = (row,col,val) => {
  if (!val) return ''
  return `${(val * 100).toFixed(1)}%`
}