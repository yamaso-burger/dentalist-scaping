var fs = require("fs");

var text = "テスト出力";

// 非同期で行う場合
fs.writeFile('out.txt', text, (err, data) => {
  if(err) console.log(err);
  else console.log('write end');
});

// 同期で行う場合
try {
  fs.writeFileSync("テストoutput2.txt", text);
  console.log('write end');
}catch(e){
  console.log(e);
}