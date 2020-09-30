/*
 * @Author: wangchaoxu
 * @Date: 2020-07-16 16:47:59
 * @LastEditors: wangchaoxu
 * @LastEditTime: 2020-09-30 17:46:38
 * @Description:
 */
//需要安装@dvgis/cesium-map,然后在mian.js中引入 import('@dvgis/cesium-map/build/cesium-map/cesium-map.min');
import { config } from './config';
import { for2 } from './core';
/**
 * @description: 添加图层
 * @param {type}
 * @return:
 * @author: wangchaoxu
 */
function addLayer(viewer) {
	removeAllLayer(viewer);
	let imgLayer = {
		style: 'img',
		name: '图层',
		key: config.TIANDITU_KAY,
	};
	viewer.imageryLayers.addImageryProvider(new Cesium.TdtImageryProvider(imgLayer));
	let ciaLayer = {
		style: 'cia',
		key: config.TIANDITU_KAY,
	};
	viewer.imageryLayers.addImageryProvider(new Cesium.TdtImageryProvider(ciaLayer));
	let iboLayer = {
		style: 'ibo',
		key: config.TIANDITU_KAY,
	};
	viewer.imageryLayers.addImageryProvider(new Cesium.TdtImageryProvider(iboLayer));
}

/**
 * 添加图层
 * @param {Object } viewer
 * @param {String } 图片 base||imgURl
 * @param {Object } boundary 最大最小经纬度范围
 * @param {Number } alpha    透明度
 * @param {Number } tier     层级
 * @return:
 * @author: wangchaoxu
 */

function addImageryProvider(viewer, img, boundary, alpha, tier, name = '色斑图', type = '图片') {
	let coordinates = Cesium.Rectangle.fromDegrees(boundary.minlng, boundary.minlat, boundary.maxlng, boundary.maxlat);
	let imageryProvider = new Cesium.SingleTileImageryProvider({
		url: img,
		rectangle: coordinates, //Cesium.Rectangle.fromDegrees(datejson[i].Xmin, datejson[i].Ymin, datejson[i].Xmax, datejson[i].Ymax);
		baseLayerPicker: false,
	});
	// 层级
	let layer = viewer.imageryLayers.addImageryProvider(imageryProvider, tier);
	layer.alpha = alpha;
	layer.name = name;
	layer.type = type;
}

/**
 * @description: 获取所有图层
 * @param {Object}  viewer对象
 * @return: {Array} 图层集合
 * @author: wangchaoxu
 */
function getAllLayer(viewer) {
	return viewer.imageryLayers._layers;
}
/**
 * @description: 根据属性获取图层
 * @param {Object}  viewer对象
 * @param {String}  attr 参照属性
 * @param {String}  vval 参照属性值
 * @return:{Array}  符合属性的图层
 * @author: wangchaoxu
 */
function getLayerByAttr(viewer, attr, val) {
	const layers = getAllLayer(viewer);
	return layers.filter((item) => item[attr] == val);
}

/**
 * @description: 删除所有图层
 * @param {type}
 * @return:
 * @author: wangchaoxu
 */
function removeAllLayer(viewer) {
	viewer.imageryLayers.removeAll();
}
/**
 * @description:根据属性删除图层
 * @param {type}
 * @return:
 * @author: wangchaoxu
 */
function removeLayerByAttr(viewer, attr, val) {
	const layers = getAllLayer(viewer);
	for2(layers, (item) => {
		if (item[attr] === val) viewer.imageryLayers.remove(item);
	});
}

export { addLayer, addImageryProvider, getAllLayer, getLayerByAttr, removeAllLayer, removeLayerByAttr };
