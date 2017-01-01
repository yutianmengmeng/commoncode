(function(){
	var ex01=document.querySelector("#ex-01");
	var oLi=ex01.querySelectorAll("li");
	for(var i=0;i<oLi.length;i++){
		oLi[i].onmouseover=function(){
			this.className="current";
		};
		oLi[i].onmouseout=function(){
			this.className='';
		};
	};
	var oClock=document.querySelectorAll(".myclock")[0];
	// oClock.addEventstar_litener("click", function(){}, false);
	var target_time=new Date("01 01,2017 00:00:00");
	var myday=document.querySelector("#time_day");
	var myhour=document.querySelector("#time_hour");
	var mymin=document.querySelector("#time_min");
	var mysec=document.querySelector("#time_sec");
	var flag=1;
	var timer;
	oClock.onclick=function(){
		if(flag){
			timer=setInterval(function(){
			var now_time=new Date();
			var mytime=target_time-now_time;
			myday.value=Math.floor(mytime/(60*60*1000*24));
			myhour.value=Math.floor(mytime/(60*60*1000)%24);
			mymin.value=Math.floor(mytime/(60*1000)%60);
			mysec.value=Math.floor(mytime/1000%60);
		}, 10);
			flag=0;
			oClock.innerText='暂停';
		}else{
			clearInterval(timer);
			oClock.innerText='启动';
			flag=1;
		}

	};

	var ex03=document.querySelector("#ex-03");
	var star_li=ex03.querySelectorAll("li");
	var num=finalnum = tempnum= 0;
	//num:传入点亮星星的个数
	//finalnum:最终点亮星星的个数
	//tempnum:一个中间值
	function fnShow(num) {
	 finalnum= num || tempnum;
	 for (var i = 0; i < star_li.length; i++) {
	  star_li[i].querySelector("a").className = i < finalnum? "curr_star" : "";
	 }
	}
	for (var i = 1; i <= star_li.length; i++) {
	 star_li[i - 1].index = i;
	 star_li[i - 1].onmouseover = function() {
	  fnShow(this.index);
	  this.querySelector("div").style.display="block";
	 }
	 star_li[i - 1].onmouseout = function() {
	  fnShow(0);
	  this.querySelector("div").style.display="none";
	 }
	 star_li[i - 1].onclick = function() {
	  tempnum= this.index;
	  
	 }
	};

	var keybox=document.querySelector("#keybox");
	document.onkeyup=function(e) {
		var keyNum=window.event?e.keyCode:e.which;
		switch(keyNum){
			case 37:
				// console.log(111);
				keybox.style.left=keybox.offsetLeft-10+"px";
				break;
			case 38:
				// console.log(222);
				keybox.style.top=keybox.offsetTop-10+"px";
				break;
			case 39:
				// console.log(333);
				keybox.style.left=keybox.offsetLeft+10+"px";
				break;
			case 40:
				// console.log(444);
				keybox.style.top=keybox.offsetTop+10+"px";
				break;
		}
	};
    document.onkeydown=function(e){
    	var keyNum=window.event?e.keyCode:e.which;
    	ctrlkey=e.ctrlKey;

    	switch(true){
    		case ctrlkey&& keyNum==49:
    			keybox.style.backgroundColor="green";
    			break;
    		case ctrlkey&& keyNum==50:
    			keybox.style.backgroundColor="yellow";
    			break;
    		case ctrlkey&& keyNum==51:
    			keybox.style.backgroundColor="blue";
    			break;
    		case ctrlkey&& keyNum==38:
    			keybox.style.width=keybox.offsetWidth*1.5+"px";
    			keybox.style.height=keybox.offsetHeight*1.5+"px";
    			break;
    		case ctrlkey&& keyNum==40:
    			keybox.style.width=keybox.offsetWidth*0.75+"px";
    			keybox.style.height=keybox.offsetHeight*0.75+"px";
    			break;
    		
    		}
    	
    };
    //防止溢出
    function limit(){
    	var doc=[document.documentElement.clientWidth,document.documentElement.clientHeight];
    	keybox.offsetLeft<=0 && (keybox.style.left=0);
    	keybox.offsetTop<=0 && (keybox.style.top=0);
    	//防止右侧溢出
    	doc[0]-keybox.offsetLeft-keybox.offsetWidth<=0 && (keybox.style.left=doc[0]-keybox.offsetWidth+'px');
    	// 防止底部溢出
    	doc[1]-keybox.offsetTop-keybox.offsetHeight<=0 && (keybox.style.top=doc[1] -keybox.offsetHeight+'px');
    }
})();