var oBanner = document.getElementById('wrap');
var aLi = oBanner.getElementsByTagName('ul')[0].getElementsByTagName('li');
var aTab = oBanner.getElementsByTagName('ol')[0].getElementsByTagName('li');
var aBtn = document.getElementById('btn').getElementsByTagName('p');
// aLi[0].style.display = 'block';
// aTab[0].className = 'on';
// for (var i = 0; i < length; i++) {
// 	aTab[i].i = i;
// 	aTab[i].onclick = function(){
// 		var This = this;
// 		change(function(){
// 			index = This.i;
// 		})
// 	}
// }
// for (var i = 0; i < aBtn.length; i++) {
// 	aBtn[i].i = i;
// 	aBtn[i].onclick = function(){
// 		var This = this;
// 		change(function(){
// 			if (This.i) {
// 				index++;
// 				index %= length;
// 			}else{
// 				index--;
// 				if (index < 0) index = length-1;
// 			}
// 		});
// 	}
// }
// aotuPlay();
// function aotuPlay(){
// 	timer = setInterval(function(){
// 		change(function(){
// 			index++;
// 			index%=length;
// 		});
// 	},2000);
// }


// function change( fn ){
// 	aLi[index].style.display = 'none';
// 	aTab[index].className = '';
// 	fn();
// 	aLi[index].style.display = 'block'
// 	aTab[index].className = 'on';
// }
	
// oBanner.onmouseover = function(){
// 	clearInterval(timer);
// }
// oBanner.onmouseout = aotuPlay;

function Banner( banner,li,tab,btn ){
	this.banner = banner;
	this.li = li;
	this.tab = tab;
	this.btn = btn;
	this.length = this.li.length;
	this.index = 0;
	this.timer = null;
	this.init();
	this.tabClick();
	this.btnClick();
	this.autoPlay();
	this.onmouse();
}
// 初始化
Banner.prototype.init = function(){
	this.li[0].style.display = 'block';
	this.tab[0].className = 'on';
}
// 发生的变化
Banner.prototype.change = function(fn){
	this.li[this.index].style.display = 'none';
	this.tab[this.index].className = '';
	fn();
	this.li[this.index].style.display = 'block'
	this.tab[this.index].className = 'on';
}
// 点击tab
Banner.prototype.btnClick = function(){
	for (var i = 0; i < this.btn.length; i++) {
		var bThis = this;
		this.btn[i].i = i;
		this.btn[i].onclick = function(){
			var This = this;
			if (This.i) {
				bThis.change(function(){
					bThis.index++;
					bThis.index %= bThis.length;
				})
			}else{
				bThis.change(function(){
					bThis.index--;
					if (bThis.index < 0){
						bThis.index = bThis.length-1;
					};
				})
			}
		}
	}
}
// 点击小圆点
Banner.prototype.tabClick = function(){
	var bThis = this;
	for (var i = 0; i < this.length; i++) {
		this.tab[i].i = i;
		this.tab[i].onclick = function(){
			var This = this;
			bThis.change(function(){
				bThis.index = This.i;
			});
		}
	}
}
// 自动轮播
Banner.prototype.autoPlay = function(){
	var bThis = this;
	bThis.timer = setInterval(function(){
		bThis.change(function(){
			bThis.index++;
			bThis.index %= bThis.length;
		})
	},2000);
}
// 鼠标移动
Banner.prototype.onmouse = function(){
	var bThis = this;
	this.banner.onmouseover = function(){
		clearInterval(bThis.timer);
	}
	this.banner.onmouseout = function(){
		bThis.autoPlay();
	}
};

new Banner( oBanner,aLi,aTab,aBtn );