/*
 * @Author: wangchaoxu
 * @Date: 2020-08-06 17:25:04
 * @LastEditors: wangchaoxu
 * @LastEditTime: 2020-09-30 17:39:04
 * @Description:
 */
/**
 * 创建HTML模块
 */

export class Popup {
	constructor(info) {
		this.viewer = info.viewer; //弹窗创建的viewer
		this.geometry = info.geometry; //弹窗挂载的位置
		this.info = info;
		this.id = 'popup_' + this.randomId();
		this.eventListener = null;
		this.node = this.info.html;
	}
	randomId() {
		return Number(
			Math.random()
				.toString()
				.substr(3, length) + Date.now()
		).toString(36);
	}
	createDom(el, id) {
		this.viewer.container.appendChild(this.info.html);
		this.render(this.geometry, this.info.html);
		this.eventListener = this.viewer.clock.onTick.addEventListener((clock) => {
			this.render(this.geometry);
		});
	}
	render(geometry, node) {
		var position = Cesium.SceneTransforms.wgs84ToWindowCoordinates(this.viewer.scene, geometry);
		node.style.position.left = position.x - node.offsetWidth / 2;
		node.style.position.left = position.y - node.offsetHeight - 10;
	}
	close() {
		this.viewer.container.removeChild(this.node);
		this.viewer.clock.onTick.removeEventListener(this.eventListener);
	}
}
