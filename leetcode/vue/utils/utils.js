export function isString(params) {
  return Object.prototype.toString.call(params) === "[object String]";
}

// 证件类型
export const papersType = [
  { label: "身份证", value: 1 },
  { label: "护照", value: 2 },
  { label: "台胞证", value: 3 },
  { label: "港澳通行证", value: 4 },
  { label: "其他证件", value: 5 }
];

// 根据身份证获取信息
export function getPapersInfo(identityCard) {
  if (!isString(identityCard)) {
    identityCard = identityCard.toString();
  }
  var len = (identityCard + "").length;
  var gender = 0,
    year = "",
    month = "",
    day = "";
  var strBirthday = "";
  if (len == 18) {
    //处理18位的身份证号码从号码中得到生日和性别代码
    strBirthday =
      identityCard.substr(6, 4) +
      "/" +
      identityCard.substr(10, 2) +
      "/" +
      identityCard.substr(12, 2);
    gender = identityCard[16] % 2 === 0 ? 2 : 1;
    year = identityCard.substring(6, 10);
    month = identityCard.substring(10, 12);
    day = identityCard.substring(12, 14);
  }
  if (len == 15) {
    var birthdayValue = "";
    birthdayValue = identityCard.charAt(6) + identityCard.charAt(7);
    if (parseInt(birthdayValue) < 10) {
      strBirthday =
        "20" +
        identityCard.substr(6, 2) +
        "/" +
        identityCard.substr(8, 2) +
        "/" +
        identityCard.substr(10, 2);
    } else {
      strBirthday =
        "19" +
        identityCard.substr(6, 2) +
        "/" +
        identityCard.substr(8, 2) +
        "/" +
        identityCard.substr(10, 2);
    }
    gender = identityCard[14] % 2 === 0 ? 2 : 1;
  }
  //时间字符串里，必须是“/”
  var birthDate = new Date(strBirthday);
  var nowDateTime = new Date();
  var age = nowDateTime.getFullYear() - birthDate.getFullYear();
  //再考虑月、天的因素;.getMonth()获取的是从0开始的，这里进行比较，不需要加1
  if (
    nowDateTime.getMonth() < birthDate.getMonth() ||
    (nowDateTime.getMonth() == birthDate.getMonth() &&
      nowDateTime.getDate() < birthDate.getDate())
  ) {
    age--;
  }
  return { age: age, gender: gender, year: year, month: month, day: day };
}

// 滚动条高度
function getScrollTop() {
  var scrollTop = 0,
    bodyScrollTop = 0,
    documentScrollTop = 0;
  if (document.body) {
    bodyScrollTop = document.body.scrollTop;
  }
  if (document.documentElement) {
    documentScrollTop = document.documentElement.scrollTop;
  }
  scrollTop =
    bodyScrollTop - documentScrollTop > 0 ? bodyScrollTop : documentScrollTop;
  return scrollTop;
}

//文档的总高度
function getScrollHeight() {
  var scrollHeight = 0,
    bodyScrollHeight = 0,
    documentScrollHeight = 0;
  if (document.body) {
    bodyScrollHeight = document.body.scrollHeight;
  }
  if (document.documentElement) {
    documentScrollHeight = document.documentElement.scrollHeight;
  }
  scrollHeight =
    bodyScrollHeight - documentScrollHeight > 0
      ? bodyScrollHeight
      : documentScrollHeight;
  return scrollHeight;
}

//浏览器视口的高度
function getWindowHeight() {
  var windowHeight = 0;
  if (document.compatMode == "CSS1Compat") {
    windowHeight = document.documentElement.clientHeight;
  } else {
    windowHeight = document.body.clientHeight;
  }
  return windowHeight;
}

// 对象转url
function formateObjToParamStr(paramObj) {
  const sdata = [];
  for (let attr in paramObj) {
    sdata.push(`${attr}=${filter(paramObj[attr])}`);
  }
  return sdata.join("&");
}

function filter(str) {
  // 特殊字符转义
  str += ""; // 隐式转换
  str = str.replace(/%/g, "%25");
  str = str.replace(/\+/g, "%2B");
  str = str.replace(/ /g, "%20");
  str = str.replace(/\//g, "%2F");
  str = str.replace(/\?/g, "%3F");
  str = str.replace(/&/g, "%26");
  str = str.replace(/\=/g, "%3D");
  str = str.replace(/#/g, "%23");
  return str;
}

// cookieurl 转 cookie对象
export function getcookies(cookie, name) {
  var Cookies = {};
  cookie &&
    cookie.split(";").forEach(function(e) {
      var parts = e.split("=");
      Cookies[parts[0].trim()] = (parts[1] || "").trim();
    });
  if (Cookies[name.trim()] === "null") {
    return null;
  }
  return Cookies[name.trim()];
}
// 设置cookie
export function setCookie(cname, cvalue, exdays) {
  var d = new Date();
  d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
  var expires = "expires=" + d.toUTCString();
  document.cookie = cname + "=" + cvalue + "; " + expires;
}
// 清除cookie
export function clearCookie(name) {
  setCookie(name, "", -1);
}

export function getDateStr(AddDayCount) {
  var dd = new Date();
  dd.setDate(dd.getDate() + AddDayCount); //获取AddDayCount天后的日期
  var y = dd.getFullYear();
  var m =
    dd.getMonth() + 1 < 10 ? "0" + (dd.getMonth() + 1) : dd.getMonth() + 1; //获取当前月份的日期，不足10补0
  var d = dd.getDate() < 10 ? "0" + dd.getDate() : dd.getDate(); //获取当前几号，不足10补0
  return m + "月" + d + "日";
}

export default {
  getScrollTop: getScrollTop,
  getScrollHeight: getScrollHeight,
  getWindowHeight: getWindowHeight,
  formateObjToParamStr: formateObjToParamStr
};
