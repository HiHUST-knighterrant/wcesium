/*
 * @Author: zulezhe
 * @Date: 2020-07-20 17:46:37
 * @LastEditors: zulezhe
 * @LastEditTime: 2020-08-07 11:41:05
 * 鼠标事件
 */
import { isFunction } from "./core.js";
/**
 *  左键点击获取实体对象
 * @param {type}
 * @return:
 * @author: zulezhe
 */
function leftSingleClick(viewer, callback) {
  var handler = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas);
  var scene = viewer.scene;
  handler.setInputAction(function(click) {
    var cartesian = viewer.camera.pickEllipsoid(click.position, viewer.scene.globe.ellipsoid);
    if (cartesian) {
      var pickdObject = scene.pick(click.position);
      if (Cesium.defined(pickdObject)) {
        if (isFunction(callback)) {
          callback(pickdObject);
        }
      }
    }
  }, Cesium.ScreenSpaceEventType.LEFT_CLICK);
  return handler;
}
function mouseMove(viewer, callback) {
  var handler = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas);
  var scene = viewer.scene;
  handler.setInputAction(function(event) {
    let ellipsoid = scene.globe.ellipsoid;
    let cartesian = viewer.camera.pickEllipsoid(event.endPosition, ellipsoid);
    if (cartesian) {
      //能获取，显示坐标
      let cartographic = ellipsoid.cartesianToCartographic(cartesian);
      if (isFunction(callback)) {
        callback(cartographic);
      }
    }
  }, Cesium.ScreenSpaceEventType.MOUSE_MOVE);

  return handler;
}
/**
 *  清楚鼠标事件
 * @param {object}handle  点击事件或者移动事件的返回值
 * @param {Number}method   Cesium.ScreenSpaceEventType.LEFT_CLICK鼠事件标类型
 * @return:
 * @author: zulezhe
 */
function removeHandle(handle, method) {
  handle.removeInputAction(method);
}
export { leftSingleClick, mouseMove, removeHandle };
