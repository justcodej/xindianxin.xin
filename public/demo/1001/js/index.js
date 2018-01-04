var $box = $('#box');
var $ad = $('#box .ad');
var oFlyAudio = document.getElementById('fly');
var oCrashAudio = document.getElementById('crash');
var oStartAudio = document.getElementById('start');
var oGoldAudio = document.getElementById('gold');
var $bird = $('#box .bird');
var $infinite = $('#box .infinite');
var $gameover = $('#box .over');
var $tip = $('#box .tip');
var $play = $('#box .start');
var $score = $('#box>.score');
var $tipScore = $('#box .tip .score');
var $best = $('#box .tip .best');
var $pass = $('#box .pass');
var $li = $('#box .pass li');
var $up = $('#box .pass li .guandao_up');
var $down = $('#box .pass li .guandao_down');
var timer = null;
var passM = null;
var onOff = true;
var num = 0;
var best = 0;
// 开始
init();
// 事件原型添加方法
HTMLAudioElement.prototype.stop = function(){
	this.pause();
	this.currentTime = 0.0;
};
// 初始化
function init(){
	num = 0;
	$score.html('0');
	$tipScore.html('0');
	document.onkeydown = down;
	document.onkeyup = up;
	$bird.css({background : 'url(images/bird.gif)',top : '230px',left : '100px',animation: 'bird 1s linear infinite'});
	$gameover.css({top: '100px',opacity: 0})
	$tip.css({bottom: '-162px'})
	$play.css({display : 'none'	})
	$score.stop().fadeOut();
	var $zzc = $('#box .zzc');
	$zzc.stop().fadeOut(function(){$(this).remove()});
	$score.stop().fadeIn();
	$ad.stop().fadeIn();
	$infinite.css({animation : 'inf 2s linear infinite'});
	$pass.css({
		left : '390px'
	})
	onOff = true;
}
// 键盘向下
function down(e){
	e = e || event;
	cancelAnimationFrame( timer );
	if (onOff) {
		setTimeout(move,1500);
		onOff = false;
	};
	if (e.keyCode == 32) {
		oFlyAudio.stop();
		oFlyAudio.play();
		$ad.stop().fadeOut('fast');
		$bird.css({animation : 'none'}).stop().animate({
			top : $bird.position().top -  50 + 'px'
		},'fast');
	};
};
// 键盘向上
function up(){
	cancelAnimationFrame( timer )
	timer = requestAnimationFrame( up );
	$bird.css({top : $bird.position().top + 3  + 'px'});
	$li.each(function(i){
		if( pz($bird,$li.eq(i).find('.guandao_up')) || pz($bird,$li.eq(i).find('.guandao_down')) || pz($bird,$li.eq(i).find('.guandao_down .down_header')) || pz($bird,$li.eq(i).find('.guandao_up .up_header')) ){
			Gameover();
			setTimeout(function(){
				$bird.animate({
					top : '488px'
				},'slow');
			},500);
		};
	})
	if ($bird.position().top >= 488 )Gameover();
};

// 游戏结束
function Gameover(){
	oCrashAudio.stop()
	oCrashAudio.play();
	$bird.css({background : 'url(images/bird.png)'}).stop(); 
	$infinite.css({animation : 'none'})
	$pass.stop();
	cancelAnimationFrame( timer );
	$gameover.stop().animate({top : '144px',opacity : 1},'fast');
	$score.stop().fadeOut();
	setTimeout(function(){
		oStartAudio.stop();
		oStartAudio.play();
		$tip.stop().animate({
			bottom : '230px'
		},300,function(){
			$play.stop().fadeIn();
		});
	},800);
	$pass.stop();
	document.onkeydown = null;
	document.onkeyup = null;
}
// 重新开始
$play.click(function(){
	oStartAudio.stop();
	oStartAudio.play();
	$box.append( $('<div></div>').addClass('zzc').stop().fadeIn(function(){
		init();
	}));
});

// 管道移动
function move(){
	$pass.animate({
		left : 390-$box.width()+'px'
	},3000,'linear',function(){
		passMove();
	})
	$up.each(function(i){
		$up.eq(i).css({height : Math.round( Math.random()*(200-20)+20 )});
	});
	$down.each(function(i){
		$down.eq(i).css({height : $pass.height()-$up.eq(i).height()-35*2-134+'px'});
	});
};
// 随机管道长短
function passMove(){
	oGoldAudio.stop();
	oGoldAudio.play();
	num++;
	$score.html(num);
	$tipScore.html(num);
	if ( num > $best.html()*1 ) {
		$best.html(num);
	}
	$pass.animate({
		left : -$pass.width()/4+'px'
	},1700,'linear',function(){
		var $li = $('#box .pass li');
		passMove();
		var $Li = $li.eq(0);
		$li.eq(0).remove();
		$Li.find('.guandao_up').css({
			height : Math.round( Math.random()*(200-20)+20 )
		}).siblings().css({
			height : $pass.height()-$Li.find('.guandao_up').height()-35*2-134+'px'
		})
		$pass.append($Li);
		$(this).css({left : 0});
	});
};

// 碰撞检测
function pz(obj1,obj2){
	var L1 = obj1.offset().left;
	var T1 = obj1.offset().top;
	var R1 = obj1.offset().left+obj1.width();
	var B1 = obj1.offset().top+obj1.height();

	var L2 = obj2.offset().left;
	var T2 = obj2.offset().top;
	var R2 = obj2.offset().left+obj2.width();
	var B2 = obj2.offset().top+obj2.height();

	return R1<L2||B1<T2||L1>R2||T1>B2?false:true;
}

	


























