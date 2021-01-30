/*
 * @Author: zulezhe
 * @Date: 2020-07-20 17:39:35
 * @LastEditors: zulezhe
 * @LastEditTime: 2021-01-30 18:09:53
 * 公用核心代码库
 */
/**
 *  判断数据类型和数据是否为真
 * @param {type}
 * @return:
 * @author: zulezhe
 */
function type(value) {
  let type = typeof value;
  if (type !== "object") {
    return type;
  }
  return Object.prototype.toString.call(value).replace(/^\[object (\S+)\]$/, "$1");
}
export const isString = (value) => type(value) === "String";
export const isNumber = (value) => type(value) === "Number";
export const isObject = (value) => type(value) === "Object";
export const isFunction = (value) => type(value) === "function";
export const isArray = (value) => type(value) === "Array";
export const isNull = (value) => type(value) === "Null";
export const isUndefined = (value) => type(value) === "Undefined";
export const isTrue = (value) => type(value) !== "Null" && type(value) !== "Undefined";

/**
 *  深克隆
 * @param {Object} obj1 对象1
 * @param {Object} obj2 对象2
 * @return:
 * @author: zulezhe
 */
export function cloneDeep(obj1, obj2) {
  for (var key in obj2) {
    obj1[key] = obj1[key] && obj1[key].toString() === "[object Object]" ? cloneDeep(obj1[key], obj2[key]) : (obj1[key] = obj2[key]);
  }
  return obj1;
}
/**
 *  避免数组漏删for循环
 * @param {Array} arr 数组
 * @param {Function} callback 回调函数
 * @author: zulezhe
 */
export function for2(arr, callback) {
  for (let i = arr.length; i > 0; ) {
    i--;
    const item = arr[i];
    if (isFunction(callback)) {
      callback(item);
    }
  }
}
