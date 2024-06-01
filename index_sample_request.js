const request = require('request');
const {JSDOM} = require('jsdom');

request('https://news.mynavi.jp/techplus/series/natonakucommand/', (e, response, body) => {
  if (e) { console.error(e); }
  try {
    const dom = new JSDOM(body);
    var pageTitle=dom.window.document.title;
    console.log(pageTitle);
  } catch (e) {
    console.error(e);
  }
})