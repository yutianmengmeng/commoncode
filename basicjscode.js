//摘自<<javscript语言精粹>>

//给对象添加beget方法,创建一个使用原对象作为其原型的对象
if(typeof Object.beget !=="function"){
	Object.beget=function(o){
		var F=function(){};
		F.prototype=o;
		return new F();
	};
}

var another_stoo=Object.beget(stoo);
//原型连接在更新时是不起作用的,只有在检索值的时候才会被用到

//函数的4种调用模式:方法调用\函数模式调用\构造器调用\apply调用
//方法调用(作为一个对象的属性被调用)
var myObj={
	value:0,
	increment:function(inc){
		return this.value += typeof inc==="number" ? inc : 1;
	}
}
myObj.increment();
myObj.increment(2);
myObj.double=function(){
	var that=this;
	var helper=function(){
		that.value=add(that.value,that.value);
	}
	helper();
};
myObj.double();
console.log(myObj.getValue());
// 普通函数调用(一个函数不被作为对象的属性调用,这时候this绑定到全局对象)
 var sum=add(2,4);

 //构造器的调用
 //如果在一个函数前面加上new来调用,匿名将创建一个隐藏连接到该函数的prototype成员的新对象
 // 同时会将这this绑定到这个新对象
 var Quo=function(string){
 	this.status=string;
 }
 Quo.prototype.get_status=functon(){
 	return this.status;
 }
 var myquo=new Quo("confused");
 console.log(myquo.get_status());

 // Apply调用
 // apply方法构建一个参数数组并且用其去调用函数,
 //appyl接受2个参数,第一个是绑定的this的值,第二个是从那数数组

 var myarr=[2,4];
 var sum=add.apply(null,myarr);


 // 给类型增加方法
 Function.prototype.method=function(name,func){
 	if(!this.prototype[name]=func){
 		this.prototype[name]=func;
 	};
 	return this;
 };

 // 提取数字中的整数部分
 Number.method("integer",function(){
 	return Math[this <0 ? 'ceiling':'floor'](this);
 });
  
  console.log((-10/3).integer());//-3

  // 移除字符串末端空白的方法

  String.method('trim',function(){
  	return this.replace(/^\s+|s+$/g,'');
  });

  console.log("  neat  ".trim());


  // 递归操作DOM
  //定义一个walk_the_dom函数,从某个给定的节点开始,按照html中的顺序访问该树的每个节点
  var walk_the_dom=function walk(node,func){
  	func(node);
  	node=node.firstChild;
  	while(node){
  		walk(node,func);
  		node=node.nextSibling;
  	}
  };


var getElementsAttr=function(att,value){
	var result=[];
	walk_the_dom(document.body,functin(node){
		var actual=node.nodeType===1 && node.getAttribute(att);
		if(typeof actual==="string" && 
			(actual === value || typeof value !== "string")){
			result.push(node);
		}
	});
	return result;
}