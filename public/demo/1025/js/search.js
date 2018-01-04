var oWrap = document.getElementById('wrap');
var oSearch = document.querySelectorAll('#wrap .search');
var oInput = oWrap.getElementsByTagName('input')[0];
var oUl = oWrap.getElementsByTagName('ul')[0];

oInput.onfocus = function(){
	this.parentNode.style.boxShadow = '0 3px 10px rgba(0,0,0,.2)';
}

oInput.onblur = function(){
	var aLi = oUl.childNodes;
	this.parentNode.style.boxShadow = '0 1px 1px rgba(0,0,0,.4)';
	
}

oInput.onkeyup = function(){
	oUl.innerHTML = '';
	var val = this.value;
	if (val) {
		var oScript = document.createElement('script');
			oScript.src = 'https://sp0.baidu.com/5a1Fazu8AA54nxGko9WTAnF6hhy/su?wd='+ val +'&cb=fn';
		document.body.appendChild(oScript);
		oScript.onload = function(){
			this.parentNode.removeChild(this);
		}
	}else{
		this.parentNode.style.boxShadow = '0 1px 1px rgba(0,0,0,.4)';
	}
}

function fn( text ){
	for (var i = 0; i < text.s.length; i++) {
		oUl.innerHTML += '<li><a href="javascript:;">'+ text.s[i] +'</a></li>';
	}
}