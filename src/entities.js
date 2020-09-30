/*
 * @Author: wangchaoxu
 * @Date: 2020-07-20 16:15:06
 * @LastEditors: wangchaoxu
 * @LastEditTime: 2020-09-30 17:40:28
 * @Description:实体的增删改查
 */
import { cloneDeep, isFunction } from './core';
import { leftSingleClick } from './mouse';
import { for2 } from './core';
/**
 * @description: 添加广告牌和label结合的标记
 * @param {Object} viewer对象
 * @return:{Object} entity 实体对象
 * @author: wangchaoxu
 */
export function addMarker(viewer, option) {
	let config = {
		position: Cesium.Cartesian3.fromDegrees(111.938902, 34.700877, 0),
		name: 'marker',
		billboard: {
			image: 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=706556033,4228383680&fm=26&gp=0.jpg',
			pixelOffset: new Cesium.Cartesian2(0, 0),
			eyeOffset: new Cesium.Cartesian3(0.0, 0.0, 0.0),
			horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
			verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
			width: 32,
			height: 32,
		},
		label: {
			text: 'Citizens Bank Park',
			font: '14pt monospace',
			style: Cesium.LabelStyle.FILL_AND_OUTLINE,
			outlineWidth: 2,
			verticalOrigin: Cesium.VerticalOrigin.TOP,
			pixelOffset: new Cesium.Cartesian2(0, 32),
		},
	};
	option = cloneDeep(config, option);
	let entity = viewer.entities.add(option);
	return entity;
}
/**
 * @description: 添加label标记
 * @param {Object} viewer对象
 * @param {Object} option label配置属性
 * @return:{Object} entity 实体对象
 * @author: wangchaoxu
 */
export function addLabel(viewer, option) {
	let config = {
		name: '标注',
		position: Cesium.Cartesian3.fromDegrees(111.938902, 33.700877, 0),
		label: {
			text: '测试',
			font: '15px sans-serif',
			// style: Cesium.LabelStyle.FILL_AND_OUTLINE,
			outlineWidth: 2,
			outlineColor: Cesium.Color.BLACK,
			fillColor: Cesium.Color.RED,
			showBackground: true,
			backgroundColor: Cesium.Color.BLACK,
		},
		width: 20, // default: undefined
		height: 20, // default: undefined
		pixelOffset: new Cesium.Cartesian2(0, 0), // default: (0, 0)
	};
	option = cloneDeep(config, option);
	let label = viewer.entities.add(option);
	return label;
}
/**
 * @description: 添加广告牌,广告牌是一种始终面向用户的标记
 * @param {Object}viewer 地图的viewer对象
 * @param {Object}option 配置属性
 * @return:
 * @author: wangchaoxu
 */
export function addBillboard(viewer, option) {
	let config = {
		name: 'billboard',
		data: '',
		position: Cesium.Cartesian3.fromDegrees(111.838902, 33.800877, 0),
		billboard: {
			// show: false,
			image: 'https://gitee.com/wangyoujin/picture/raw/master/img/20200806171509.png',
			// pixelOffset: new Cesium.Cartesian2(0, 0),
			// eyeOffset: new Cesium.Cartesian3(0.0, 0.0, 0.0),
			// horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
			// verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
			// width: 32,
			// height: 32,

			heightReference: Cesium.HeightReference.CLAMP_TO_GROUND,
			// verticalOrigin: 0,
			// width: 32,
			// height: 145,
			// pixelOffset: new Cesium.Cartesian2(0, -72)
			pixelOffset: new Cesium.Cartesian2(0, 0),
		},
	};
	option = cloneDeep(config, option);
	let billboard = viewer.entities.add(option);
	return billboard;
}
/**
 * @description: 添加圆形
 * @param {type}
 * @return:
 * @author: wangchaoxu
 */
export function addCircle(viewer, lng, lat, min, max, type) {
	// console.log(min, max, type);
	let entity = viewer.entities.add({
		position: Cesium.Cartesian3.fromDegrees(lng, lat, 0),
		name: '范围',
		type: type,
		show: true,
		ellipse: {
			semiMinorAxis: new Cesium.CallbackProperty(function() {
				//半径 两点间距离
				return min * 1000;
			}, false),
			semiMajorAxis: new Cesium.CallbackProperty(function() {
				return max * 1000;
			}, false),
			// 材质
			material: Cesium.Color.DODGERBLUE.withAlpha(0.2),
			// fill: false,
			heigh: 10,
			outline: true,
			outlineColor: Cesium.Color.DODGERBLUE,
			outlineWidth: 4,
		},
	});
	return entity;
}

export function addCircleByPrimitives(viewer, lng, lat, min, max, type) {
	var scene = viewer.scene;
	//GeometryInstance是Geometry的一个容器
	var instance = new Cesium.GeometryInstance({
		geometry: new Cesium.EllipseGeometry({
			center: Cesium.Cartesian3.fromDegrees(lng, lat, 0),
			semiMajorAxis: max * 1000,
			semiMinorAxis: max * 1000,
			// rotation: Cesium.Math.toRadians(60.0)
		}),
	});
	//使用抽象的Primitive而不是RectanglePrimitive
	let primitives = scene.primitives.add(
		new Cesium.Primitive({
			geometryInstances: instance,
			//使用该外观，可以使矩形覆盖在地球表面，或者悬浮一定的高度
			appearance: new Cesium.EllipsoidSurfaceAppearance({
				material: Cesium.Material.fromType('Color', {
					color: Cesium.Color.DODGERBLUE.withAlpha(0.2),
				}),
			}),
		})
	);
	return primitives;
}
/**
 * @description: 删除primitives集合实体
 * @param {Object}  primitives 实体集合
 * @return {type}
 * @author: wangchaoxu
 */
export function removePrimitives(viewer, primitives) {
	viewer.scene.primitives.remove(primitives);
}
/**
 * @description: 获取所有实体
 * @param {Object} viewer viewer对象
 * @return: {Object} entities实体对象
 * @author: wangchaoxu
 */
export function getAllEntities(viewer) {
	var entitys = viewer.entities._entities._array;
	return entitys;
}
/**
 * @description: 根据属性获取实体
 * @param {Object} viewer viewer对象
 * @param {String} attr   获取时的参照属性
 * @param {String} val    获取时的参照属性值
 * @return:
 * @author: wangchaoxu
 */
export function getEntitiesByAttr(viewer, attr, val) {
	// console.log(arguments);
	if (!attr) throw '请设置删除时的参照属性';
	if (!val) throw '请设置删除时的参照属性值';
	let entities = getAllEntities(viewer);
	return entities.filter((item) => item[attr] == val);
}
/**
 * @description:
 * @param {type}
 * @return:
 * @author: wangchaoxu
 */
export function removeAllEntities(viewer) {
	viewer.entities.removeAll();
}

/**
 * @description:
 * @param {type}
 * @return:
 * @author: wangchaoxu
 */
export function removeEntitiesByAttr(viewer, attr, val) {
	const layers = getAllEntities(viewer);
	for2(layers, (item) => {
		if (item[attr] === val) viewer.entities.remove(item);
	});
}

export function clickGetEntitties(viewer, callback) {
	leftSingleClick(viewer, function(pickdObject) {
		if (isFunction(callback)) {
			callback(pickdObject.id);
		}
	});
}

export function clickRemoveEntities(viewer) {
	leftSingleClick(viewer, function(pickdObject) {
		viewer.entities.removeById(pickdObject.id._id);
	});
}
export function addBoundary(viewer, url) {
	let promise = viewer.dataSources.add(
		Cesium.GeoJsonDataSource.load(url, {
			stroke: Cesium.Color.YELLOW,
			fill: Cesium.Color.YELLOW,
			strokeWidth: 3,
			markerSymbol: '?',
			clampToGround: true, //贴地
		})
	);
	promise.then(function(dataSource) {
		var entities = dataSource.entities.values;
		let length = entities.length;
		for (var o = 0; o < length; o++) {
			//这样循环添加的方法,数据打了会慢,没有找到其他什么好的方法,建议对json数据进行优化
			var r = entities[o];
			r.polyline.width = 10; //添加默认样式
			r.polyline.material = new Cesium.PolylineGlowMaterialProperty({
				glowPower: 0.1, //一个数字属性，指定发光强度，占总线宽的百分比。
				color: Cesium.Color.DODGERBLUE.withAlpha(0.9),
			});
		}
	});
	viewer.flyTo(promise);
}
