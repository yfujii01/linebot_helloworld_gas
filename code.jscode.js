var access_token = PropertiesService.getScriptProperties().getProperty('Access_Token');

//----------------------------------------------------------------------------------------------------------
//言葉を受けたらそのまま返す
//----------------------------------------------------------------------------------------------------------
function doPost(e) {
  //ログは監視対象のプロジェクトに設定した上でStackdriverのログを見ることで確認できる
  console.log('HelloWorldが実行されましたstart');
  
  //トークンの確認
  var reply_token = JSON.parse(e.postData.contents).events[0].replyToken;
  if (typeof reply_token === 'undefined') {
    return;
  }
  
  var user_message = JSON.parse(e.postData.contents).events[0].message.text;
  console.log('入力文字は「' + user_message + '」でした');
  console.log(e.postData.contents);
  
  var rep_message = user_message;
    
  //replyモードで返却
  var url = 'https://api.line.me/v2/bot/message/reply';
  UrlFetchApp.fetch(url, {
    'headers': {
      'Content-Type': 'application/json; charset=UTF-8',
      'Authorization': 'Bearer ' + access_token,
    },
    'method': 'post',
    'payload': JSON.stringify({
      'replyToken': reply_token,
      'messages': [{ 'type': 'text', 'text': rep_message }],
    }),
  });
  
  var ret = ContentService.createTextOutput(JSON.stringify({ 'content': 'post ok' }))
  .setMimeType(ContentService.MimeType.JSON);

  console.log('HelloWorldが実行されましたend');
  
  return ret;
}
