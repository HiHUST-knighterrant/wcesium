/*
 * @Author: zulezhe
 * @Date: 2020-07-21 11:39:35
 * @LastEditors: zulezhe
 * @LastEditTime: 2021-01-30 17:42:08
 *  场景操作
 */
/**
 *  天空盒子
 * @param {type}
 * @return:
 * @author: zulezhe
 */
function addSkyBox() {}

/**
 *  显示隐藏天空盒
 * @param {Object}  viewer 对象
 * @param {Boolean}  isShow 是否显示
 * @author: zulezhe
 */
function skyBoxIsShow(viewer, isShow) {
  viewer.scene.skyBox.show = isShow;
  viewer.scene.requestRender(); //重新渲染
}
/**
 * 设置场景的背景颜色
 * @param {Object} cesium的color new Cesium.color(r,g,b,a); Cesium.color.RED
 * @return:
 * @author: zulezhe
 */
function setColor(viewer, color) {
  viewer.scene.skyBox.show = false;
  viewer.scene.backgroundColor = color;
}
