$(document).ready(function(){
	var $btn = $('#wrap .btn li');
	var $con = $('#wrap .con li');
	var $list = $('#wrap .btn');
	var $up = $('#wrap .btn .up');

	// 点击滚动指定区域
	$btn.click(function(){
		$(this).addClass('on').siblings().removeClass('on').css({background : '#f6f9fa'});
		$('body').animate({
			scrollTop : $(this).index()*300
		})
	})

	// 滚轮监听

	$(document).bind('scroll',function(){
		var leng = $(document).scrollTop();
		if (leng < 300) {
			$up.fadeOut();
		}else{
			$up.fadeIn();
		}
	})

	// 点击返回顶部

	$up.click(function(){
		$('body').animate({
			scrollTop : 0
		})
	})

	// 鼠标移入事件
	$btn.hover(function(){
		$(this).css({background : '#00a0d0'});
	},function(){
		$(this).attr('class') == 'on'?$(this).css({background : '#00a0d0'}):$(this).css({background : '#f6f9fa'});
	});
})