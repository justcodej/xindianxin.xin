var oWrap = document.getElementById('wrap');
var aList = oWrap.getElementsByClassName('list');
var length = aList.length;


// 鼠标移入

for (var i = 0; i < length; i++) {
	aList[i].index = i;
	aList[i].onmouseover = function(){
		this.children[0].style.height = '20px';
		this.children[0].style.lineHeight = '20px'
		this.children[1].style.height = '20px';
		this.children[1].style.lineHeight = '20px'
		for (var i = 0; i < length; i++) {
			aList[i].style.width = '25px';
			aList[i].style.zIndex = '0';
			if (aList[i].index < this.index) {
				aList[i].style.left = aList[i].index*27+'px';
			}else{
				aList[i].style.left = aList[i].index*27+565+'px';
			}
			this.style.left = this.index*27+'px';
			
		}
		this.style.width = '590px';
		this.style.zIndex = '2';
	}
	aList[i].onmouseout = function(){
		this.children[0].style.height = '170px';
		this.children[0].style.lineHeight = '170px'
		this.children[1].style.height = '170px';
		this.children[1].style.lineHeight = '170px'
		for (var i = 0; i < length; i++) {
			aList[i].style.width = '120px';
			aList[i].style.left = aList[i].index*122+'px';
		}
	}
}
