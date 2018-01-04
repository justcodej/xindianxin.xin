(function(){
var w = $(window).width();
var h = $(window).height();
var $pic = $('#wrap .pic');
var $btn = $('#wrap .nav span');
var index = 0;

$btn.eq(1).click(function(){
	change(function(){
		move(index);
		index++;
		index %= $pic.length;
	});
});

$btn.eq(0).click(function(){
	change(function(){
		moveR(index);
		index--;
		if (index < 0)index = $pic.length-1;
	});
});
function change(fn){
	$pic.find('.bg').css({transfrom : 'none',webkitTransform : 'none'});
	$pic.eq(index).css('zIndex','2').siblings().css('zIndex','0');
	fn && fn();
	$pic.eq(index).css('zIndex','1').addClass('on').siblings().removeClass('on');
}
function move(index){
	$pic.eq(index).find('.bg').eq(0).css({
		transfrom : 'translateY('+(h/2+10)+'px)',
		webkitTransform : 'translateY('+(h/2+10)+'px)'
	});
	$pic.eq(index).find('.bg').eq(1).css({
		transfrom : 'translateX(-'+(w/2+10)+'px)',
		webkitTransform : 'translateX(-'+(w/2+10)+'px)'
	});
	$pic.eq(index).find('.bg').eq(2).css({
		transfrom : 'translateX('+(w/2+10)+'px)',
		webkitTransform : 'translateX('+(w/2+10)+'px)'
	});
	$pic.eq(index).find('.bg').eq(3).css({
		transfrom : 'translateY(-'+(h/2+10)+'px)',
		webkitTransform : 'translateY(-'+(h/2+10)+'px)'
	});
	
};
function moveR(index){
	$pic.eq(index).find('.bg').eq(0).css({
		transfrom : 'translateX('+(w/2+10)+'px)',
		webkitTransform : 'translateX('+(w/2+10)+'px)'
	});
	$pic.eq(index).find('.bg').eq(1).css({
		transfrom : 'translateY('+(w/2+10)+'px)',
		webkitTransform : 'translateY('+(w/2+10)+'px)'
	});
	$pic.eq(index).find('.bg').eq(2).css({
		transfrom : 'translateY(-'+(w/2+10)+'px)',
		webkitTransform : 'translateY(-'+(w/2+10)+'px)'
	});
	$pic.eq(index).find('.bg').eq(3).css({
		transfrom : 'translateX(-'+(w/2+10)+'px)',
		webkitTransform : 'translateX(-'+(w/2+10)+'px)'
	});
	
};
})();