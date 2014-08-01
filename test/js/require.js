(function(root){
	var modules = {},
		cache = {},
		load = {},
		_ = {};
	_.mixin = function(source, dist){
		for(var k in dist){
			source[k] = dist[k];
		}
	};
	// 请求模块
	load.require = function(name){
		var path = name, module = cache[name], fn;
		if(module){
			return module.exports;
		}else{
			module = {id: path, exports: {} };
			fn = modules[path];
			if(fn){
				fn(module.exports, function(name){
					return load.require(name);
				}, module);
			}else{
				throw new Error('module ' + path + ' not found!');
			}
			return module.exports;
		}
	};
	// 定义模块
	load.define = function(name, fn){
		modules[name] = fn;
	};
	load._ = _;
	_.mixin(root, load);
	return load;
})(window || {});

