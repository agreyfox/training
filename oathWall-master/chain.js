window.wordsArrs = [{ username: "石头", words: '致天下有情人：链上的誓言，海枯石烂，天荒地老，永生不变！' }];
var spcUrl = "https://dapi.sparkchain.cn";

//var chainCode = "moacTest"
//var tokenCode = "MOAC" //MOAC
// var moacTestSrcAddr = "0x58bfc0c19b60343cc00a52c2f7bd2e4108ee7a02";
// var moacTestSrcSecret = "71a31f2e8ea013fe230e9c37059c7fbc0569a45b278602990997ee032e0f4d6c";
// var moacTestDestAddr = "0x2f273309e60c84faae14e74e02364a6673276506";
// var moacTestDestSecret = "";

// var chainCode = "jingtumTest"
// var tokenCode = "SWT" //MOAC

// var moacTestSrcAddr = "jE4uC8MJwxfvDbEswL17oTfP85tiNCmTMC";
// var moacTestSrcSecret = "sn3rahjyJ8Y1oemTCBWG1ftSwHWQy";
// var moacTestDestAddr = "j9G3DeMh1AbW2Tpup1Rhpx7nkgEuPWjcna";
 var moacTestDestSecret = "";

//1:初始化应用
//http://dapi.sparkchain.cn/v1/app/init/?appcode=moacDappMineScann&appname=moac扫雷

//2:先通过postman调用http://dapi.sparkchain.cn/v1/account/creatAccount/?chainCode=moacTest创建两个账户

var appId = "1006694357115338752";
var appsecret = "01a68a2b-191d-48ad-93bc-28b2745c71f0"
var accessToken = null;

//http://explorer.moac.io/tx/0xf4e21e6eb7569bb42d559825579ba2c0c79c35927e3180571185508642828ae5
var chainCode = "moacTest"
var tokenCode = "MOAC"
var moacTestSrcAddr = "0xae07963a925be66de4226bde3d89019698c31a18";
var moacTestSrcSecret = "2ddb3bc551cefe569a5518ed239a7a84e9a37edc550e444f4035da3d17d67cb7";
var moacTestDestAddr = "0xa3dc87fc8f05cf9fe1ae0676a93583eb3d42454f";
var moacTestDestSecret = "";


window.wordslist = function (cb) {
  var url = spcUrl + "/v1/account/transInfoList";
  var data = {
    "account": moacTestSrcAddr,
    "pagesize": 100,
  };
  $.post(url, data, function (res) {
    console.log(res.data)
    // var data = JSON.parse(res.data);
    var data = res.data;
    if (res.success && !!data.results) {
      for (var i = 0; i < data.results.length; i++) {
        var memos = data.results[i]["memos"];
        if (!memos) continue;
        var memosJson = eval('(' + memos + ')');// JSON.parse(memos);

        var words = memosJson["words"];
        if (!words) continue;
        var username = memosJson["username"];
        // alert(words);
        // window.wordsArrs = window.wordsArrs || [];
        window.wordsArrs.push({
          "username": username,
          "words": words
        });

      }
      cb();

    }

  })
}

//wordslist  wordsArrs   upchain

// 3:上链 调用  http://dapi.sparkchain.cn/v1/account/transfer进行文本上链
window.upchain = function (username, words) {
  var url = spcUrl + "/v1" + "/account/record";
  var data = {
    "srcAccount": moacTestSrcAddr,
    "srcPrivateKey": moacTestSrcSecret,
    "destAccount": moacTestDestAddr,
    "amount": 0,
    "chainCode": chainCode,
    "tokenCode": tokenCode,
    "bizId": Math.floor(Math.random() * 100000000) + "",
    "memo": "{ \"username\" :\"" + username + "\",\"words\":\"" + words + "\"}"
  };

  $.post(url, data, function (res) {
    console.log(res)
    
    // var data = JSON.parse(res.data);
    var data = res.data;
    if (res.success) {
      console.log(data)
      alert("您的誓言已经永久保存在公链");
    }
  });


}

