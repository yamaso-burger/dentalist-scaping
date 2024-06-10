const request = require('request');
const {JSDOM} = require('jsdom');


const hospitalList = [];
const headURL = "https://www.jos.gr.jp/page/";
const tailURL = "?post_type=roster&s&member_area_code=13&pref=2";
for(let i = 1; i < 10; i++) {
    const URL = `${headURL}${i}${tailURL}`;
    const DOM = getDOM(URL);
    // console.log(getHospitalList(DOM));
}

function getDOM(url) {
    request(url, (e, response, body) => {
      if (e) { console.error(e); }
      try {
        // console.log(body);
        const dom = new JSDOM(body);
        console.log(dom.window.document);
        return body;
        
      } catch (e) {
        console.error(e);
      }
    });
}


function getHospitalList(doc) {
    // STEP 1
    // ページ上で、特定のクラス名の要素を取ってくる
    const table = doc.querySelector('.tbl_search_roster');
    // <tbody>
    const tableBody = table.firstElementChild;
    
    const hospitalList = [];
    for (const row of Array.from(tableBody.children)) {
    
        if (row.children.item(7) && row.children.item(7).textContent.includes('東京都')) {
            // ここにコード追加
            // console.log(row.children.item(9).textContent);
            hospitalList.push({
                'hostpital': row.children.item(9).textContent,
                'address': row.children.item(7).textContent
            });
        }
        
        
    }

}