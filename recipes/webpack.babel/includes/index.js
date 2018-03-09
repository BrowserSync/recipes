;(function(){
window.VERSION = "#VERSION#";
window.PROTOCOL = "http";
if(window.location.href.indexOf("https:")>-1){
  //window.location.href = window.location.href.replace(/https/, "http");
  window.PROTOCOL = "https";
  window.ISHTTPS = true;
}else{
  window.ISHTTPS = false;
}
function loadJs(src){
  var body = document.getElementsByTagName('body')[0];
  var script= document.createElement('script');
  script.type= 'text/javascript';
  script.src= src;
  body.appendChild(script);
}
//loadJs(window.PROTOCOL+"://localhost:8000/CLodopfuncs.js");
//测试环境
if(window.location.href.indexOf("doc.mding.org")>-1){
  window.HOSTNAME = window.PROTOCOL+'://dev.mding.org/gym';
  window.PUSHNAME = window.PROTOCOL+'://dev.push.mding.org';
}
else if(window.location.href.indexOf("localhost")>-1||
  window.location.href.indexOf("127.0.0.1")>-1 ||
  window.location.href.indexOf("192.168.")>-1){
  if(window.ISHTTPS == true){
    window.HOSTNAME = '';
    window.PUSHNAME = '';
    //window.PUSHNAME = window.PROTOCOL+'://localhost:3000';//连接本地,local.app.js
  }else{
    window.HOSTNAME = window.PROTOCOL+'://dev.mding.org/gym';
    window.PUSHNAME = window.PROTOCOL+'://dev.push.mding.org';
  }
}
else{
  window.HOSTNAME = window.PROTOCOL+'://tea.api.mding.org/gym';
  window.PUSHNAME = window.PROTOCOL+'://tea.push.mding.org';
}
window.PRINT_PREVIEW = false;
//window.HOSTNAME = window.PROTOCOL+'://10.1.23.162:8080/gym';

//window.PUSHNAME = window.PROTOCOL+'://dev.push.mding.org:80';
//window.PUSHNAME = window.PROTOCOL+'://127.0.0.1:3000';
window.RESOURCE = {
  "access.login":[
    "scripts/controllers/access/login.min.js",
  ],
  "access.signUp":[
    "scripts/controllers/access/signUp.min.js",
  ],
  "common.setting":["scripts/controllers/common/setting.min.js"],
  "common.blocks":["scripts/controllers/common/blocks.min.js"],
  "common.update":["scripts/controllers/common/update.min.js"],
  "common.user":[
    "scripts/controllers/common/user.min.js",
    "views/common/user/modal.all.html"
  ],
  "fonter.modal":[
    "views/fonter/modal.all.html",
    "scripts/controllers/fonter/modals.min.js"
  ],
  "fonter.goods":[
    "scripts/controllers/fonter/goods.min.js",
    "views/fonter/goods/modal.all.html"
  ],
  "fonter.courses":["scripts/controllers/fonter/courses.min.js"],
  "fonter.member":[
    "scripts/controllers/fonter/member.min.js",
    "views/fonter/member/modal.all.html"
  ],
  "fonter.sign":[
    "scripts/controllers/fonter/sign.min.js",
    "views/fonter/sign/modal.all.html"
  ],
  "fonter.accountGather":["scripts/controllers/fonter/accountGather.min.js"],
  "fonter.bracelet":["scripts/controllers/fonter/bracelet.min.js"],
  "fonter.deposit":["scripts/controllers/fonter/deposit.min.js"],
  "fonter.reserve":["scripts/controllers/fonter/reserve.min.js"],
  "finance.home":[
    "scripts/controllers/finance/home.min.js",
    "views/finance/home/modal.all.html"
  ],
  "finance.member":[
    "scripts/controllers/finance/member.min.js",
    "views/finance/member/modal.all.html"
  ],
  "finance.bill":[
    "scripts/controllers/finance/bill.min.js",
    "views/finance/bill/modal.all.html"
  ],
  "chainFinance.member":[
    "scripts/controllers/chainFinance/member.min.js",
    "views/chainFinance/member/modal.all.html"
  ],
  "chainFinance.bill":[
    "scripts/controllers/chainFinance/bill.min.js",
    "views/chainFinance/bill/modal.all.html"
  ],
  "chainFinance.home":["scripts/controllers/chainFinance/home.min.js"],
  "fonter.accountLog":[
    "scripts/controllers/fonter/accountLog.min.js",
    "views/fonter/accountLog/modal.all.html"
  ],
  "admin.shopInfos":[
    "scripts/controllers/admin/shopInfos.min.js",
    "views/admin/shopInfos/modal.all.html"
  ]
}
//获取设备列表
window.MEDIA_DEVICE_INOFS = [];
navigator.mediaDevices.enumerateDevices().then(function(d) {
  var a = _.where(d,{kind:'videoinput'});
  _.each(a,function(t,i){
    var o = {text:t.label || '摄像头 ' + (i + 1),value:t.deviceId}
    window.MEDIA_DEVICE_INOFS.push(o);
  });
}).catch(function(error){console.log('navigator.getUserMedia error: ', error);});

})();
