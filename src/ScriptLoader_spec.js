var getFile = function(fileName, s){
  return "http://localhost:1337/src/test/" + fileName + ".js?s=" + s;
};

describe("ScriptLoader", function() {
  var _scriptLoader;
  var _scriptLoaderAsync;

  beforeEach(function(){
      _scriptLoader = new scriptLoader();
      _scriptLoaderAsync = new scriptLoader({async: true});
  });

  it("should be defined", function() {
    expect(_scriptLoader).toBeDefined();
  });

  it("async is defined", function() {
    expect(_scriptLoader.async).toBeDefined();
  });

  it("async is false as default", function() {
    expect(_scriptLoader.async).toEqual(false);
  });

  it("async is true if passed in as constructor option", function() {
    expect(_scriptLoaderAsync.async).toEqual(true);
  });
});

describe("ScriptLoader load one file", function() {
  var _scriptLoader;
  beforeEach(function(){
      _scriptLoader = new scriptLoader();
  });


  it("Load one script and check that the success callback is called", function(done) {
    var _src = getFile("one", "test1");

    _scriptLoader.loadScript(_src,function(src){
      expect(src).toEqual(_src);
      done();
    });

  });

  it("shoul check if the fail callback is called when a script fails to load", function(done) {
    var _src = "http://localhost:1337/fail.js";
    _scriptLoader.loadScript(_src, function(){}, function(){
      expect(true).toEqual(true);
      done();
    });
  });

});

describe("ScriptLoader load multiple files synchrounus", function() {
  var _scriptLoader;

  beforeEach(function(){
      _scriptLoader = new scriptLoader();
  });

  it("Load multiple scripts and check that the success callback is called", function(done) {
    var _src = [getFile("one", "test2"), getFile("two", "test2"), getFile("three", "test2")];
    _scriptLoader.loadScripts(_src,function(src){
      expect(test2).toBeDefined();
      expect(test2).toEqual("onetwotghree");
      done();
    });
  });

  /*it("should check if the fail callback is called when a script fails to load", function(done) {
    var _src = ["one.js", "fail.js"];
    scriptLoader.loadScripts(_src, function(){}, function(){
      done();
    });
  });*/

});

describe("ScriptLoader load multiple files asynchronus", function() {
  var _scriptLoader;

  beforeEach(function(){
      _scriptLoader = new scriptLoader({async: true});
  });

  it("Load multiple scripts and check that the success callback is called", function(done) {
    var _src = [getFile("one", "test3"), getFile("two", "test3"), getFile("three", "test3")];
    _scriptLoader.loadScripts(_src,function(src){
      expect(test3).toBeDefined();
      expect(test3).toEqual("threeonetwo");
      done();
    });
  });

  /*it("should check if the fail callback is called when a script fails to load", function(done) {
    var _src = ["asyncOne.js", "fail.js"];
    scriptLoader.loadScripts(_src, function(){}, function(){
      done();
    });
  });*/

});