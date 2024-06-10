const request = require('request');
const {JSDOM} = require('jsdom');

request('https://www.jos.gr.jp/page/1?post_type=roster&s&member_area_code=13&pref=2', (e, response, body) => {
  if (e) { console.error(e); }
  try {
    const dom = new JSDOM(body);
    console.log(body);
    var pageTitle=dom.window.document.title;
    console.log(pageTitle);
  } catch (e) {
    console.error(e);
  }
})