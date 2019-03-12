import { commafy } from './util'
/**
 * 匹配手机号首尾，以类似“134****8901”的形式输出
 * @param mobile 手机号
 * @returns  隐藏4-7位的手机号
 */
const formatMobile = (mobile) => {
  let result = ''
  if (mobile) result = mobile.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2')
  return result
}

/**
 * 格式化价格，通过逗号分割千分位
 * @param price 价格
 * @returns  逗号分割千分位的数字字符串  例如：89,811.11
 */
const formatPrice = price => commafy(price)

/**
 * 格式化银行卡卡号，通过星号隐藏前面位数，每四位通过空格分开
 * @param price 卡号 6225877777771456
 * @returns  **** **** **** 1456
 */
const formatCardNo = (cardNo) => {
  const surplus = cardNo.length % 4
  const lastLen = surplus || 4
  const first = cardNo.substr(0, cardNo.length - lastLen)
  const last = cardNo.substr(cardNo.length - lastLen, lastLen)
  let num = first.length / 4
  let star = ''
  while (num > 0) {
    star += '**** '
    num -= 1
  }
  return `${star}${last}`
}

const formatChinaDate = (date) => {
  const dateArr = date.split('-')
  let result = ''
  dateArr.forEach((item, index) => {
    switch (index) {
      case 0:
        result += `${item * 1}年`
        break
      case 1:
        result += `${item * 1}月`
        break
      case 2:
        result += `${item * 1}日`
        break
      default:
    }
  })
  return result
}

export {
  formatMobile, formatPrice, formatCardNo, formatChinaDate,
}
