require('babel-register')({
  presets: ['es2015', 'react']
});

const router = require('./sitemap-routers').default;
const Sitemap = require('react-router-sitemap').default;
function generateSitemap() {
  return new Sitemap(router).build('http://gangala.in').save('../public/sitemap.xml');
}

generateSitemap();
