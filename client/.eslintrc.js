module.exports = {
    root: true,
    env: {
        browser: true,
        node: true,
    },
    extends: [
        'eslint:recommended',
        '@vue/prettier',
        'plugin:vue/vue3-essential',
        'plugin:prettier/recommended',
    ],
    plugins: ['prettier', 'vue'],
    parserOptions: {
        ecmaVersion: 2020,
        parser: 'babel-eslint',
    },
    rules: {
        'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
        'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
        'prettier/prettier': 'off',
    },
};
