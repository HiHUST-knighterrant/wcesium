import base from './rollup.config.base'

const config = Object.assign({}, base, {
  output: {
    name: 'wcesium',
    file: 'dist/wcesium.esm.js',
    format: 'es',
  },
})

export default config
