import Cookies from 'js-cookie'
import store from '@/store'

/**
 * 获取url地址参数，返回对象
 * @returns { object }
 */
export function getQueryString() {
  const url = window.location.href
  // 通过split()分割为数组
  let urlArr = []
  const index = url.indexOf('?')
  if (index > -1 && index + 1 < url.length) {
    urlArr = url.substring(index + 1).split('&')
  }
  // 转换成对象
  const theRequest = {}
  for (let i = 0; i < urlArr.length; i += 1) {
    const paramsArr = urlArr[i].split('=')
    /* eslint-disable */
    theRequest[paramsArr[0]] = paramsArr[1]
  }
  return theRequest
}

/**
 * 获取两数范围内的随机数
 * @param min 最小值
 * @param max 最大值
 * @returns {number}
 */
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

/**
 * 打乱数组
 * @param arr 数组
 * @returns {Blob|ArrayBuffer|Array.<T>|string|*}
 */
export function shuffle(arr) {
  const arrResult = arr.slice();
  for (let i = 0; i < arrResult.length; i += 1) {
    const j = getRandomInt(0, i);
    const t = arrResult[i];
    arrResult[i] = arrResult[j];
    arrResult[j] = t;
  }
  return arrResult;
}

/**
 * 节流函数
 * @param func 调用函数
 * @param delay 节流时间间隔
 * @returns {Function}
 */
export function debounce(func, delay) {
  let timer;
  return (...args) => {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
}

/**
 * 对Date的扩展，将 Date 转化为指定格式的String
 * 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符，
 * 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)
 * 例子：
 * dateformat((new Date()),"yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423
 * dateformat((new Date()),"yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18
 * @param date 时间
 * @param fmt 格式
 * @returns {结果}
 */
export function formatDate(date, fmt) {
  const o = {
    'M+': date.getMonth() + 1, // month
    'd+': date.getDate(), // day
    'h+': date.getHours(), // hour
    'm+': date.getMinutes(), // minute
    's+': date.getSeconds(), // second
    'q+': Math.floor((date.getMonth() + 3) / 3), // quarter
    S: date.getMilliseconds(), // millisecond
  };

  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, `${date.getFullYear()}`.substr(4 - RegExp.$1.length));
  }
  Object.keys(o).forEach((k) => {
    if (new RegExp(`(${k})`).test(fmt)) {
      fmt = fmt.replace(RegExp.$1, RegExp.$1.length === 1 ? o[k] : `00${o[k]}`.substr(`${o[k]}`.length));
    }
  });
  return fmt;
}

/**
 * 解析日期，将20190827或2019-02-28解析为日期类型
 * @param date 日期字符串
 * @returns {Date}
 */
export function analysisDate(date) {
  let newDate = date.replace(/\s+/g, '')
  let datetime = new Date();
  if (newDate && newDate.indexOf('-') > 0) {
    datetime = new Date(`${newDate.substr(0, 4)}/${newDate.substr(5, 2)}/${newDate.substr(8, 2)}`);
  } else if (newDate && newDate.indexOf('年') > 0) {
    datetime = new Date(`${newDate.substr(0, 4)}/${newDate.substr(5, 2)}/${newDate.substr(8, 2)}`);
  } else if (newDate) {
    datetime = new Date(`${newDate.substr(0, 4)}/${newDate.substr(4, 2)}/${newDate.substr(6, 2)}`);
  }
  return datetime;
}

/**
 * 数字格式转换成千分位
 * @param num 数字
 * @returns {*}
 */
export function commafy(num) {
  if (`${num}`.replace(' ', '') === '') {
    return '';
  }

  if (Number.isNaN(num)) {
    return '';
  }
  num = `${num}`;
  if (/^.*\..*$/.test(num)) {
    const pointIndex = num.lastIndexOf('.');
    let intPart = num.substring(0, pointIndex);
    const pointPart = num.substring(pointIndex + 1, num.length);
    intPart = `${intPart}`;
    const re = /(-?\d+)(\d{3})/;
    while (re.test(intPart)) {
      intPart = intPart.replace(re, '$1,$2');
    }
    num = `${intPart}.${pointPart}`;
  } else {
    num = `${num}`;
    const re = /(-?\d+)(\d{3})/;
    while (re.test(num)) {
      num = num.replace(re, '$1,$2');
    }
  }
  return num;
}

/**
 * 去除千分位
 * @param num 有千分位逗号的数字
 * @returns { 结果}
 */
export function delcommafy(num) {
  if (`${num}`.replace(' ', '') === '') {
    return '';
  }
  num = num.replace(/,/gi, '');
  return num;
}

/**
 * 字符串部分用隐藏星代替  1231232132 => 1231****132
 * @param str 字符串
 * @param front 预留前几位
 * @param behind 预留后几位
 */
export function starReplace(str, front = 6, behind = 4) {
  const regStr = `^([\\W\\d]{${front}})[\\W\\d]+([\\W\\d]{${behind}})$`;
  const reg = new RegExp(regStr);
  const starLen = str.length - front - behind;
  return str.replace(reg, `$1${new Array(starLen + 1).join('*')}$2`);
}

/**
 * 数字加减乘除-解决JS的数字加减乘除的精度问题
 * @param origin 源数字
 * @param other 被操作数字
 * @param action 操作
 * @returns {结果}
 */
export function calculate(origin, other, action) {
  let sum = 0;
  let basic = 0;
  const nThis = origin.toString();
  const nOther = other.toString();
  let thisScale = 0;
  let otherScale = 0;

  try {
    thisScale = nThis.split('.')[1].length;
  } catch (e) {
    thisScale = 0;
  }
  try {
    otherScale = nOther.split('.')[1].length;
  } catch (e) {
    otherScale = 0;
  }
  let n;
  switch (action) {
    case '+':
      basic = 10 ** Math.max(thisScale, otherScale);
      sum = (calculate(origin, basic, '*') + calculate(other, basic, '*')) / basic;
      break;
    case '-':
      basic = 10 ** Math.max(thisScale, otherScale);
      n = (thisScale >= otherScale) ? thisScale : otherScale;
      sum = ((calculate(origin, basic, '*') - calculate(other, basic, '*')) / basic).toFixed(n);
      break;
    case '*':
      basic = thisScale + otherScale;
      sum = (Number(nThis.replace('.', '')) * Number(nOther.replace('.', ''))) / (10 ** basic);
      break;
    case '/':
      basic = otherScale - thisScale;
      sum = (Number(nThis.replace('.', '')) / Number(nOther.replace('.', ''))) * (10 ** basic);
      break;
    default:
      break;
  }
  return sum;
}

/**
 * 校验六位密码，六位密码不能一样，不能顺增，不能顺减
 * @param s 密码
 * @returns {boolean}
 */
export function isSixPwd(s) {
  if (!/^\d{6}$/.test(s)) return false; // 不是6位数字
  if (/^(\d)\1+$/.test(s)) return false; // 全一样

  let str = s.replace(/\d/g, ($0, pos) => parseInt($0, 10) - pos);
  if (/^(\d)\1+$/.test(str)) return false; // 顺增

  str = s.replace(/\d/g, ($0, pos) => parseInt($0, 10) + pos);
  if (/^(\d)\1+$/.test(str)) return false; // 顺减
  return true;
}

/**
 * 校验是否为手机号码
 * @param mobile 手机号
 * @returns {是为true，否为false}
 */
export function isMobile(mobile) {
  const regu = /^1(3|4|5|7|8)\d{9}$/;
  const re = new RegExp(regu);
  if (re.test(mobile)) {
    return true;
  }
  return false;
}

/**
 * 银行卡号Luhn校验算法
 * luhn校验规则：16位银行卡号（19位通用）
 * 1.将未带校验位的 15（或18）位卡号从右依次编号 1 到 15（18），位于奇数位号上的数字乘以 2。
 * 2.将奇位乘积的个十位全部相加，再加上所有偶数位上的数字。
 * 3.将加法和加上校验位能被 10 整除。
 * @param bankno 银行卡账号
 * @returns {boolean}
 */
export function luhnCheck(bankno) {
  const lastNum = bankno.substr(bankno.length - 1, 1); // 取出最后一位（与luhm进行比较）

  const first15Num = bankno.substr(0, bankno.length - 1); // 前15或18位
  const newArr = [];
  // 前15或18位倒序存进数组
  for (let i = first15Num.length - 1; i > -1; i -= 1) {
    newArr.push(first15Num.substr(i, 1));
  }
  const arrJiShu = []; // 奇数位*2的积 <9
  const arrJiShu2 = []; // 奇数位*2的积 >9

  const arrOuShu = []; // 偶数位数组
  for (let j = 0; j < newArr.length; j += 1) {
    if ((j + 1) % 2 === 1) { // 奇数位
      if (parseInt(newArr[j], 10) * 2 < 9) {
        arrJiShu.push(parseInt(newArr[j], 10) * 2);
      } else {
        arrJiShu2.push(parseInt(newArr[j], 10) * 2);
      }
    } else { // 偶数位
      arrOuShu.push(newArr[j]);
    }
  }

  const jishuChild1 = []; // 奇数位*2 >9 的分割之后的数组个位数
  const jishuChild2 = []; // 奇数位*2 >9 的分割之后的数组十位数
  for (let h = 0; h < arrJiShu2.length; h += 1) {
    jishuChild1.push(parseInt(arrJiShu2[h], 10) % 10);
    jishuChild2.push(parseInt(arrJiShu2[h], 10) / 10);
  }

  let sumJiShu = 0; // 奇数位*2 < 9 的数组之和
  let sumOuShu = 0; // 偶数位数组之和
  let sumJiShuChild1 = 0;// 奇数位*2 >9 的分割之后的数组个位数之和
  let sumJiShuChild2 = 0; // 奇数位*2 >9 的分割之后的数组十位数之和
  let sumTotal = 0;
  for (let m = 0; m < arrJiShu.length; m += 1) {
    sumJiShu += parseInt(arrJiShu[m], 10);
  }

  for (let n = 0; n < arrOuShu.length; n += 1) {
    sumOuShu += parseInt(arrOuShu[n], 10);
  }

  for (let p = 0; p < jishuChild1.length; p += 1) {
    sumJiShuChild1 += parseInt(jishuChild1[p], 10);
    sumJiShuChild2 += parseInt(jishuChild2[p], 10);
  }
  // 计算总和
  sumTotal = parseInt(sumJiShu, 10)
            + parseInt(sumOuShu, 10)
            + parseInt(sumJiShuChild1, 10)
            + parseInt(sumJiShuChild2, 10);

  // 计算Luhm值
  const k = parseInt(sumTotal, 10) % 10 === 0 ? 10 : parseInt(sumTotal, 10) % 10;
  const luhm = 10 - k;

  // Luhm验证通过true 不通过false
  return lastNum.toString() === luhm.toString();
}

/**
 * 以0补全
 * @param num 需要补全的值
 * @param n 计算位数
 * @returns {还回补全之后的值}
 */
export function pad(num, n = 2) {
  let len = num.toString().length;
  while (len < n) {
    num = `0${num}`;
    len += 1;
  }
  return num;
}

/**
 * 获取accessToken，存在就返回 否则返回''
 * @param querys 页面query参数
 * @param isStorage 是否获取sessionstorage里token信息
 * @param callBack sdk里面通过桥获取token的回调函数
 * @returns {accessToken}
 */
export function getToken(querys, isStorage = false) {
  if (!querys) querys = getQueryString();
  const queryToen = querys.token // query获取
  const cookieToken = Cookies.get('token') // 从cookie中获取
  const sessionToken = sessionStorage.getItem('token') // 从seesionstorage中获取
  const key = queryToen || cookieToken || sessionToken
  if (typeof key !== 'undefined' && queryToen) store.dispatch('setToken', key);
  return key;
}
/**
 * 持久化：保存数据
 * @param name 保存数据名
 * @param data  数据内容
 * @returns {}
 */
export function savSession(name, data) {
  const result = typeof data === 'string' ? data : JSON.stringify(data)
  sessionStorage.setItem(name, result);
}
/**
 *  持久化：从seessionStorage取出数据
 * @param name 保存数据名
 * @param state 数据存放对象
 * @returns {}
 * */
export function getSession(name, state) {
  if (sessionStorage.getItem(name)) {
    // 如果存储的是字符串，不需要JSON.parse处理
    try{
      state[name] = JSON.parse(sessionStorage.getItem(name))
    } catch (error) {
      state[name] = sessionStorage.getItem(name)
    }
  }
}
/**
 * 分转换为元，保留两位小数
 * @param value 数值
 * @returns {number}
 * */
export function changeMoneyFloat(value) {
  value = Math.round(parseFloat(value) * 100) / 10000;
  const xsd = value.toString().split('.');
  let result;
  if (xsd.length === 1) {
    value = `${value}.00`;
    result = value;
  }
  if (xsd.length > 1) {
    if (xsd[1].length < 2) {
      value = `${value}0`;
    }
    result = value;
  }
  return result;
}
/**
 * 将当前日期转化格式为 年-月-日
 * @returns {string}
 */
export function changeDate() {
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  let now = '';
  now += `${year}-`;
  if (month >= 10) {
    now += `${month}-`;
  } else {
    now += `0${month}-`;
  }
  if (day >= 10) {
    now += day;
  } else {
    now += `0${day}`;
  }
  return now;
}
/**
 * 解决接口传参有数组的方法，把数组参数拼接到url后面
 * @param params 参数数组
 * @returns {stirng}
 */
export function changParams(params) {
  const arr = [];
  let str = '';
  let flag = false;
  let result;
  Object.keys(params).forEach((key) => {
    if (params[key] instanceof Array) {
      const newArry = params[key];
      const len = newArry.length;
      for (let i = 0; i < len; i += 1) {
        str += `?sorts[${i}].name=${newArry[i].name}&sorts[${i}].order=${newArry[i].order}`;
      }
      arr[0] = encodeURI(str);
      delete params[key];
      arr[1] = params;
      flag = true;
      result = arr;
    }
  });
  if (!flag) {
    result = ['', params];
  }
  return result;
}

/**
 * rem 初始化设置
 */
export function remInit() {
  // lib-flexbile 开始
  const docEl = document.documentElement;
  function setRemUnit() {
    const minWidth = Math.min(document.documentElement.clientWidth, window.innerWidth || 0);
    const rem = minWidth / 10;
    docEl.style.fontSize = `${rem}px`;
  }
  setRemUnit();
  window.addEventListener('resize', setRemUnit);
  window.addEventListener('pageshow', (e) => {
    if (e.persisted) {
      setRemUnit();
    }
  });

  // detect 0.5px supports
  if (window.devicePixelRatio >= 2) {
    const fakeBody = document.createElement('body');
    const testElement = document.createElement('div');
    testElement.style.border = '.5px solid transparent';
    fakeBody.appendChild(testElement);
    docEl.appendChild(fakeBody);
    if (testElement.offsetHeight === 1) {
      docEl.classList.add('hairlines');
    }
    docEl.removeChild(fakeBody);
  }
//  lib-flexbile end
}

/**
 * 协议页面填充数据
 * @param data 数据对象
 */
export function replaceKeyToValue(data) {
  Object.keys(data).forEach((key) => {
    const $keys = document.getElementsByClassName(key)
    let keyVal = data[key]
    if (keyVal && key.toString() === '001') { // 系统时间
      keyVal = formatDate(analysisDate(keyVal), 'yyyy年MM月dd日')
    } else if (keyVal && key.toString() === '102') { // 证件号码
      keyVal = starReplace(keyVal, 1, 1)
    } else if (keyVal && (key.toString() === '103' || key.toString() === '302' || key.toString() === '305')) { // 姓名
      keyVal = starReplace(keyVal, 0, 1)
    } else if (keyVal && key.toString() === '104') { // 手机号
      keyVal = starReplace(keyVal.substring(0, 11), 0, 4)
    } else if (keyVal && (key.toString() === '301' || key.toString() === '304')) { // 账号
      keyVal = starReplace(keyVal, 0, 4)
    }
    if (!keyVal) {
      keyVal = '&nbsp;&nbsp;&nbsp;&nbsp;'
      if (key.toString() === '001') {
        keyVal = '&nbsp;&nbsp;年&nbsp;&nbsp;月&nbsp;&nbsp;日'
      }
    }

    for (let i = 0; i < $keys.length; i += 1) {
      const $key = $keys[i]
      $key.setAttribute('style', '')
      $key.innerHTML = `<u>${keyVal}</u>`
    }
  })
}

/**
 * 根据对象属性sort排序回调方法
 * @param property 对象属性
 */
export function compare(property) {
  return function(a, b){
    var value1 = a[property];
    var value2 = b[property];
    return value1 - value2;
  }
}
