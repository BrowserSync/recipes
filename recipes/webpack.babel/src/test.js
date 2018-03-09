(function() {
  console.log("this is test.js in src ");
  let root = this;
  //let previousUnderscore = root._;
  console.log("this",this);
  let _ = function(){

  }
  if (typeof exports !== 'undefined') {
    if(typeof module !== 'undefined' && module.exports){
      exports = module.exports = _;
    }
    exports._ = _;
  } else {
    root._ = _;
  }
  _.VERSION = '1.8.3';
  if (typeof define === 'function' && define.amd) {
    define('underscore', [], function() {
      return _;
    });
  }
}.call(this));
