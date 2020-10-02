module.exports = {
    chainWebpack: config => {
        config.plugin('html').tap(args => {
            args[0].title = 'Магазин канцелярских товаров';

            return args;
        });
    },
};
