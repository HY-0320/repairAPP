//获取cookie、
export const get = name => {
  var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
  if (arr = document.cookie.match(reg))
    return (arr[2]);
  else
    return null;
}

//设置cookie,增加到vue实例方便全局调用
// 过期时间为n分钟
export const set = (c_name, value, expiredays) => {
  var exdate = new Date();
  exdate = new Date(exdate.getTime() + 60 * 1000 * expiredays);
  document.cookie = c_name + "=" + escape(value) + ((expiredays == null) ? "" : ";expires=" + exdate.toGMTString());
};

//删除cookie
export const del = name => {
  var exp = new Date();
  exp.setTime(exp.getTime() - 1);
  var cval = get(name);
  if (cval != null)
    document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
};