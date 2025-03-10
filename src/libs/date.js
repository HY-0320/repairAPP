export const format = (date, fmt) => {
  date = new Date(date)
  // var fmt = "yyyy-MM-dd hh:mm:ss"
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
  }
  let o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds()
  }
  for (let k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      let str = o[k] + ''
      fmt = fmt.replace(RegExp.$1, RegExp.$1.length === 1 ? str : padLeftZero(str))
    }
  }
  return fmt
}

function padLeftZero (str) {
  return ('00' + str).substr(str.length)
}

// function formatTimeTwo(number, format) {

//   var formateArr = ['Y', 'M', 'D', 'h', 'm', 's'];
//   var returnArr = [];

//   var date = new Date(number * 1);
//   returnArr.push(date.getFullYear());
//   returnArr.push(formatNumber(date.getMonth() + 1));
//   returnArr.push(formatNumber(date.getDate()));

//   returnArr.push(formatNumber(date.getHours()));
//   returnArr.push(formatNumber(date.getMinutes()));
//   returnArr.push(formatNumber(date.getSeconds()));

//   for (var i in returnArr) {
//     format = format.replace(formateArr[i], returnArr[i]);
//   }
//   return format;
// }