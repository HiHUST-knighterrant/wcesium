/*
 * @Author: zulezhe
 * @Date: 2020-09-30 17:30:59
 * @LastEditors: zulezhe
 * @LastEditTime: 2021-01-30 18:02:46
 *  In User Settings Edit
 * @FilePath: \wcesium\build\rollup.config.browser.js
 */
import base from "./rollup.config.base";
import uglify from "rollup-plugin-uglify-es";

const config = Object.assign({}, base, {
  output: {
    exports: "named",
    name: "wcesium",
    file: "dist/wcesium.min.js",
    format: "iife",
  },
});

config.plugins.push(uglify());

export default config;
