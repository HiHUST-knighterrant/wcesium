import base from './rollup.config.base';
import uglify from 'rollup-plugin-uglify-es';

const config = Object.assign({}, base, {
	output: {
		exports: 'named',
		name: 'wcesium',
		file: 'dist/wcesium.min.js',
		format: 'iife',
	},
});

config.plugins.push(uglify());

export default config;
