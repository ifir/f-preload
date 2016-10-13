/*!
 * f-preload v0.0.1
 * 原生无依赖, 实现图片预加载
 * Repo: https://github.com/ifir/f-preload
 */
;(function(global, factory){
	//AMD || CMD
	if(typeof define === 'function' && define.amd === 'object' && define.amd){
		define([], factory);
	}else if(typeof module === "object" && typeof module.exports === "object" && module.exports){
		module.exports = factory();
	}else{
		global.Fpreload = factory();
	}
})(typeof window !== 'undefined' ? window : this, function(){
	'use strict';
	function Fpreload(opts){
		this.init(opts);
	}

	Fpreload.prototype = {
		//修正constructor
		constructor: Fpreload,
		//初始化
		init:function(opts){
			var _this = this;
			_this.source = opts.source || [];
			_this.callback = opts.callback || null;
			_this.debug = opts.debug || false;
			//资源总数量
			_this.length = opts.source.length;
			//加载失败的数量
			_this.errNum = 0;
			//加载成功的数量
			_this.sucNum = 0;
			//错误的数组
			_this.errArr = [];

			_this.imgloader();
		},
		imgloader:function(){
			var _this = this,
				img = [],
				source = _this.source,
				sucNum = _this.sucNum;
			_this.asyncNum = 0;//计数器
			for(var i = 0; i < _this.length; i++){
				//实例
				img[i] = new Image();
				//加载
				img[i].src = source[i];
				//if(img[i].complete)
				//加载完成
				img[i].onload = function(){
					_this.sucNum++;
					_this.asyncNum++;
					if(_this.sucNum == _this.length){
	                    if(typeof _this.callback === 'function'){
	                    	_this.callback();
	                    }else{
	                    	console.log('Preloader Complete');
	                    }
					}
					//log打印
					if(_this.debug) _this.msglog();
	            };
	            //加载失败
	            img[i].onerror = function(){
	            	_this.errNum++;
	            	_this.asyncNum++;
	                _this.errArr.push(this.src);
	                //log打印
					if(_this.debug) _this.msglog();
	            }
			}
		},
		//debug打印信息
		msglog:function(){
			var _this = this;
			if(_this.asyncNum === _this.length){
				console.group('Preloader debug');
				console.time('加载时间');
				console.info('总数='+_this.length);
				console.info('成功数量='+_this.sucNum);
				console.warn('失败数量='+_this.errNum);
				if(_this.errArr.length > 0){
					console.warn('请求失败的图片数组');
					console.error(_this.errArr);
				}
				console.timeEnd('加载时间');
				console.groupEnd();
			}
		}
	}

	return Fpreload;
})