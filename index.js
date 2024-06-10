const Nightmare = require('nightmare')

!(async () => {
    try {
        // TODO：値をここに入れる
        const pagenum = 80;
        // https://www.jos.gr.jp/page/2?post_type=roster&s&member_type_code_34=3
        const headURL = "https://www.jos.gr.jp/page/";
        // const tailURL = "?post_type=roster&s&member_type_code_34=3";
        const tailURL = "?post_type=roster&s&member_area_code=13&pref=2";
        let hospitalList = [];
        const n = new Nightmare({
            show: false // trueにするとブラウザが表示されます。
        })
        for (let i = 1; i < pagenum; i++) {
            const URL = `${headURL}${i}${tailURL}`;
            console.log(`now page ${i}...`)
            const list = await getHospitalList(n, URL);
            if(list){
                hospitalList = hospitalList.concat(list);
            }
        }
        // console.log(JSON.stringify(hospitalList));
        console.log(hospitalList);
        if (hospitalList.length !== 0) {
            console.log("outputting data...");
            const outputData = convertToCSV(JSON.stringify(hospitalList));
            var fs = require("fs");
    
            // 非同期で行う場合
            fs.writeFile('hospital_list.csv', outputData, (err, data) => {
                if (err) console.log(err);
                else console.log('write end');
            });
        }


        n.halt()
    } catch (e) {
        console.error(e)
    }
})()


async function getHospitalList(n, url) {
    n.goto(url); // ページへ移動
    // 任意のJavaScriptを実行
    return n.evaluate(() => {
        try {

            // STEP 1
            // ページ上で、特定のクラス名の要素を取ってくる
            const table = document.querySelector('.tbl_search_roster');
            // <tbody>
            const tableBody = table.firstElementChild;
            const hospitalList = [];
            for (const row of Array.from(tableBody.children)) {
    
                // TODO: 検索ワード入れる
                if (row.children.item(7) && row.children.item(7).textContent.includes("赤坂")) {
                    // ここにコード追加
                    // console.log(row.children.item(9).textContent);
                    hospitalList.push({
                        'hostpital': row.children.item(9).textContent,
                        'address': row.children.item(7).textContent
                    });
                }
    
    
            }
            return hospitalList;
        } catch(e) {
            console.log("maybe it's end.")
        }
    });
}

/** Object の配列を受け取り CSV形式の文字列に変換する Func */
const convertToCSV = (objArray) => {
    const array = typeof objArray !== "object" ? JSON.parse(objArray) : objArray;

    /** 1. Objectの Key を headerとして取り出す */
    let str =
        `${Object.keys(array[0])
            .map((value) => `"${value}"`)
            .join(",")}` + "\r\n";

    // 2. 各オブジェクトの値をCSVの行として追加する
    return array.reduce((str, next) => {
        str +=
            `${Object.values(next)
                .map((value) => `"${value}"`)
                .join(",")}` + "\r\n";
        return str;
    }, str);
};

/** Download・処理 */
const downloadCSV = (data, name) => {
    /** Blob Object を作成する Type. CSV */
    const blob = new Blob([data], { type: "text/csv" });
    console.log("blob", blob);
    const url = window.URL.createObjectURL(blob);
    console.log("url", url);
    const a = document.createElement("a");
    a.setAttribute("href", url);
    a.setAttribute("download", `${name}.csv`);
    a.click();
    a.remove();
};

