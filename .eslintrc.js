module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    'plugin:vue/vue3-essential',
    "standard"
  ],
  parserOptions: {
    parser: 'babel-eslint'
  },
  overrides:[
    {
      files:['*.vue','*.html'],
      rules: {
        'quotes':['warning','double']
      }
    },
  ],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    "quotes":['warning',"double"],
    "semi":[1,"never"],
    "vue/no-mutating-props": 0
  }
}
