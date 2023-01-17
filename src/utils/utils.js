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
