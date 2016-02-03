(function(window) {
    'use strict';
    
    window.scriptLoader = function scriptLoader(options){
        var self = this;
        
        this.async = (options && options.async && (options.async === "true" || options.async === true)) ? true : false;

        // load a javascript file from the given url, callback is called with the download status
        function _loadScript(url, callback) {
            var script = document.createElement("script");
            script.async = true;
            script.type = "text/javascript";
            script.src = url;
            
            // listen for when the script has finished downloading and call the callback
            script.onload = script.onreadystatechange = function (event) {
                if (!script.readyState || /loaded|complete/.test(script.readyState)) {
                    if(callback){
                        callback("success");
                    }
                }
            };
            
            // listen for any errors during download of the script
            script.onerror = function () { 
                if(callback){
                    callback("fail");
                } 
            };
            
            (document.getElementsByTagName("head")[0]).appendChild( script );
        };

        // loads and array of sources synchronously
        function _loadScripts(srcs, success, fail){
            if(toString.call(srcs) === "[object Array]" && srcs.length > 0){
                self.loadScript(srcs[0], function(){
                    srcs.splice(0,1);
                    _loadScripts(srcs, success, fail);
                }, fail);
            }
            else if(success){
                success();
            }
        };

        // loads and array of sources asynchronously
        function _loadScriptsAsync(srcs, success, fail){
            if(toString.call(srcs) === "[object Array]" && srcs.length > 0){
                var length = srcs.length,
                scripts = [];
                for(var idx = 0 ;idx < length; idx += 1){
                    scripts.push(srcs[idx]);
                }

                var done = function(src){
                    scripts.remove(src);
                    if(scripts.length === 0 && success){
                        success();
                    }
                };

                for(idx = 0;idx < length; idx += 1){
                    self.loadScript(srcs[idx], done, fail);
                }
            }
        };

        this.loadScript = function loadScript(src, success, fail){
            if(typeof src == 'string')
            {
                _loadScript(src, function(status){
                    if(status === "success" && success){
                        success(src);
                    }
                    else if(fail){
                        fail(src);
                    }

                });
            }
            else if(toString.call(src) === "[object Array]" && src.length > 0){
                if(this.async){
                    _loadScriptsAsync(src, success, fail);
                }
                else{
                    _loadScripts(src, success, fail);
                }
            }
        };

        this.loadScripts = this.loadScript;
    };
    
    var toString = window.toString;
    if(toString !== Object.prototype.toString){
        toString = ({}).toString;
    }
    
    Array.prototype.remove = function(element){
        var index = this.indexOf(element);
        if(index > -1){
            
            this.splice(index, 1);
        }
    };
})(window);

