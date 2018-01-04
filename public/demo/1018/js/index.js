var aUl = document.getElementsByTagName('ul');
var aImg = document.getElementsByTagName('img');
var aLi = document.getElementsByTagName('li');
var n = 0;
for (var i = 1; i <= aImg.length; i++) {
	aImg[i-1].src = 'images/'+i+'.jpg';
};

setInterval(fn,500)
function fn(){
	n = Math.round( Math.random()*8 );
	var newPos = parseInt( getStyle( aUl[n],'top' ) );
	if (newPos == -134 || newPos == 0) {
		if ( newPos > -134 ){
			Move(aUl[n],'top',2,-134);
		}else{
			Move(aUl[n],'top',2,0);
		}
	};
}
	
function Move( obj,attr,speed,target,endFn ){
	clearInterval( obj.timer );
	speed = parseInt( getStyle( obj,attr ) ) > target? -speed:speed;
	obj.timer = setInterval(function(){
		var n = 0;
		n = parseInt( getStyle( obj,attr ) ) ;
		if (n >= target && speed > 0 || n <= target && speed < 0) {
			n = target;
		}
		if (n != target){
			obj.style[attr] = n+ speed + 'px';
		}else{
			clearInterval( obj.timer );
			endFn && endFn.call(obj);
		}
	},13);
}
function getStyle( obj,attr ){
	return obj.currentStyle?obj.currentStyle[attr]:getComputedStyle(obj)[attr];
};