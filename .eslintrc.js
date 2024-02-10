module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/vue3-essential',
    'eslint:recommended'
  ],
  parserOptions: {
    parser: 'babel-eslint'
  },
  overrides:[
    {
      files:['*.vue','*.html'],
      rules: {
        'quotes':['error','double']
      }
    },
  ],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    "semi": ['error', "always"],
    "quotes":['error',"double"],
    "vue/no-mutating-props":0
  }
}
