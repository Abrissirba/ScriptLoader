var scriptLoader = function(options){
 	var self = this,
 	async = (typeof options !== "undefined" && typeof options.async !== "undefined" && (options.async === "true" || options.async === true)) ? true : false,

 	_loadScript = function (path, callback) {
	    var script = document.createElement("script");
	    script.async = "true";
	    script.type = "text/javascript";
	    script.src = path;
	    script.onload = script.onreadystatechange = function (event, isAbort) {
	        if (!script.readyState || /loaded|complete/.test(script.readyState)) {
	            if (isAbort)
	                callback && callback("fail");
	            else
	                callback && callback("success");
	        }
	    };
	    script.onerror = function () { callback && callback("fail") };
	    (document.getElementsByTagName("head")[ 0 ]).appendChild( script );
	},

	_loadScripts = function(srcs, success, fail){
		if(toString.call(srcs) === "[object Array]" && srcs.length > 0){
			self.loadScript(srcs[0],
				function(){
					srcs.splice(0,1);
	   				self.loadScripts(srcs, success, fail);
				},
				fail);
		}
		else{
			success && success();
		}
	},

	_loadScriptsAsync = function(srcs, success, fail){
		if(toString.call(srcs) === "[object Array]" && srcs.length > 0){
			var idx = 0,
			length = srcs.length,
			scripts = [];
			for(;idx < length; idx += 1){
				scripts.push(srcs[idx]);
			}

			for(idx = 0;idx < length; idx += 1){
				self.loadScript(srcs[idx], 
					function(src)
					{
						scripts.remove(src);
						if(scripts.length === 0){
							success && success();
						}
					}, 
					fail);
			}
		}
	};

	this.loadScript = function(src, success, fail){
		if(typeof src == 'string')
		{
			_loadScript(src, function(status){
				if(status === "success"){
					success && success(src);
				}
				else{
					fail && fail(src);
				}

			});
		}
	};

	this.loadScripts = function(srcs, success, fail){
		if(async){
			_loadScriptsAsync(srcs, success, fail);
		}
		else{
			_loadScripts(srcs, success, fail);
		}
	};

	Array.prototype.remove = function(element){
		var index = this.indexOf(element);
		if(index > -1){
			this.splice(index, 1);
		}
	}
 };