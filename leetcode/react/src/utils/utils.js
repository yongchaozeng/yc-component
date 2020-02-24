export function isString(params) {
  return Object.prototype.toString.call(params) === "[object String]";
}

export function judgeClient() {
  let u = navigator.userAgent;
  let isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1;   //判断是否是 android终端
  let isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);     //判断是否是 iOS终端
  if(isAndroid){
    return 'Android';
  }else if(isIOS){
    return 'IOS';
  }else{
    return 'PC';
  }
}

export function timestampGetDate(timestamp) {
  let year = new Date(timestamp * 1000).getFullYear();
  let month = new Date(timestamp * 1000).getMonth() + 1;
  let day = new Date(timestamp * 1000).getDate();
  return `${year}.${month}.${day}`;
}
export const groupDict = {
  GroupA:'a',
  GroupB:'b',
  GroupC:'c',
  GroupD:'d',
  final:'f',
}
export const voteDict = {
  A组:'a',
  B组:'b',
  C组:'c',
  D组:'d',
}

export function setArray(array, newArray) {
  if (array.length > 12) {
    newArray.push(array.splice(0, 12));
    if(array.length > 12){
      setArray(array, newArray);
    }else{
      newArray.push(array);
    }
  }
}

