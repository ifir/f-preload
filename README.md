# f-perload
原生无依赖，预加载插件

```
实现的主要功能:
1、批量预加载多个图片
2、支持debug打印加载信息
3、支持加载完执行自定义回调函数
```

### 安装依赖

> npm install

### 开发

> gulp dev 浏览器自动打开localhost:3000

### 打包

> gulp build 查看dist目录


### 如何使用

1、页面引入
```
<script src="youpath/f-preload.js"></script>

var Fpreload = new Fpreload({
	soucre: Array,  //图片src数组(required)
	debug : Boolean,  //默认false
	callback : Function //默认null
});
```
###or:

2、npm安装

> npm install --save f-preload

```
var Flazyload = require('f-preload');
var preload = new Fpreload({
	soucre: Array,  //图片src数组(required)
	debug : Boolean,  //默认false
	callback : Function //默认null
});
```

