const manifest = require('./public/manifest.json');

pwaArgs = {
	msTileColor: manifest.background_color,
	name: manifest.short_name,
	themeColor: manifest.theme_color
};

module.exports = {
	publicPath: '/launchpad',
	chainWebpack: config => {
		config.plugin('pwa').tap(() => {
			return [pwaArgs];
		});
	}
};
