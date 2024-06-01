// STEP 1
// ページ上で、特定のクラス名の要素を取ってくる
const table = document.querySelector('.tbl_search_roster');
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