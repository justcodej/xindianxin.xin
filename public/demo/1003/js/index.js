// title开始
	(function(){
		var $topbarHover = $('.site-topbar .container .hover');
		var $topbarUl = $('.site-topbar .container .topbar-cart ul');
		var $topbarA = $('.site-topbar .container .topbar-cart a');
		$topbarHover.hover(function(){
			$topbarA.css({
				'background':'#fff',
				'color':'#f60',
			})
			 $topbarUl.stop().slideDown(300);
		},function(){
			$topbarA.css({
				'background':'#424242',
				'color':'#b0b0b0'
			})
			 $topbarUl.stop().slideUp(200);
		});
	})();
// title结束
// header开始
	(function(){
		var $headerMenu = $('.site-header .container .header_list ul li');
		var $headerA = $('.site-header .container .header_list ul li a');
		var $headerList = $('.site-header .container .header_list .show');
		var $J_navMenu = $('#J_navMenu');
		var $J_navMenuUl = $('#J_navMenu .container ul');
		$headerMenu.hover(function(){
			var index = $(this).index();
			$headerA.eq(index).css('color','#f60')
		},function(){
			$headerA.css('color','#333');
		})
// hide开始
		$headerList.hover(function(){
			var index = $(this).index();
			$J_navMenu.stop().slideDown(200);
			$J_navMenuUl.eq(index).show().siblings().hide();
		},function(){
			$J_navMenu.stop().slideUp(300);
		});
		$J_navMenu.hover(function(){
			$J_navMenu.stop().slideDown(200);
		},function(){
			$J_navMenu.stop().slideUp(300);
		})
// hide结束
// header结束
// banner start
	})();
	(function(){
		var $banner_Img = $('#banner_wrap .banner ul li');
		var $banner_Tab = $('#banner_wrap .banner ol li');
		var $banner_Tab_Span = $('#banner_wrap .banner ol li span');
		var $btn = $('#banner_wrap .banner .btn p');
		var $banner = $('#banner_wrap .banner');
		var index = 0;
		var timer = null;
		var nowTime = 0;
		var leng = $banner_Tab.length;
		


		

//初始化导航
		$banner_Img.eq(0).css('display','block');
		$banner_Tab.eq(0).addClass('on');
// tab部分
		$banner_Tab.click(function(){
			index = $(this).index();
			$(this).addClass('on').siblings().removeClass();
			$banner_Img.eq(index).show().siblings().css('display','none');
		});
		$banner_Tab.hover(function(){
			var index = $(this).index();
			$banner_Tab_Span.eq(index).css('display','block');
			$banner_Tab_Span.eq(index).stop().fadeIn().siblings().stop().fadeOut();
		},function(){
			$banner_Tab_Span.stop().fadeOut();
		});
// btn部分
		$btn.hover(function(){
			if ($(this).index()) {
				$btn.eq(1).css('backgroundPosition','124px 0');
			}else{
				$btn.eq(0).css('backgroundPosition','164px 0');
			}
		},function(){
			if ($(this).index()) {
				$btn.eq(1).css('backgroundPosition','42px 0');
			}else{
				$btn.eq(0).css('backgroundPosition','80px 0');
			}
		});
		$btn.click(function(){
			if (new Date() - nowTime > 800) {
				nowTime = new Date();
				if ($(this).index()) {
					index++;
					index %= leng;
				}else{
					index--;
					index %= leng;
				};
				$banner_Img.eq(index).stop().fadeIn().siblings().fadeOut();
				$banner_Tab.eq(index).addClass('on').siblings().removeClass();
			};
		});
// 自动轮播
		$banner.mouseenter(function(){
			clearInterval(timer);
		});
		$banner.mouseleave(function(){
			autoPlay();
		});
		autoPlay();
		function autoPlay(){
			timer = setInterval(function(){
				index++;
				index %= leng;
				$banner_Img.eq(index).stop().fadeIn().siblings().fadeOut();
				$banner_Tab.eq(index).addClass('on').siblings().removeClass();
			},2000)
		};
	})();

// b_menu
	(function(){
		var $firstLi = $('#banner_wrap .b_menu ul .firstLi');
		var $Info = $('#banner_wrap .b_menu ul .firstLi .info');
		$Info.each(function(i){
			var $Info_Li = $Info.eq(i).find('li'); 
			var width =  $Info_Li.width();
			var leng = $Info_Li.length;
			var row = Math.ceil( leng /6 );
			$(this).width(row * width);
			$Info_Li.each(function(i){
				var l = Math.floor( i / 6 );
				var t = i % 6;
				var Height = $Info_Li.height();
				$(this).css({
					'left':l*width,
					'top':t*Height
				});
			})
		});

		$firstLi.hover(function(){
			var index = $(this).index();
			$Info.eq(index).css('display','block');
		},function(){
			$Info.css('display','none');
		});
	})();
// AD
	(function(){
		var $tip_Div = $('#bannerAD .tip .tip_all div');

		$tip_Div.each(function(){
			var $tip_A = $(this).find('a');
			var $tip_icon = $tip_A.find('span');
			var $tip_text = $tip_A.find('p');
			var className = $tip_icon.attr('class')
			$tip_A.hover(function(){
				$tip_icon.addClass('hover')
				$tip_text.addClass('hover')
			},function(){
				$tip_icon.removeClass();
				$tip_icon.addClass(className);
				$tip_text.removeClass();
			})
		})
	})();
// AD
// banner end
// 明星单品开始
	(function(){
		var $start = $('#start');
		var $start1 = $('#main_page .start');
		var $start_content = $('#start .content');
		var $start_Ul = $('#start .content ul');
		var $start_Ul1 = $('#main_page .start .content ul');
		var $btn = $('#start .title .btn p');
		var $btn1 = $('#main_page .start .title .btn p');
		var timer = null;
		var time = null;
		var nowTime = 0;
		var nowtime = 0;
		var width = $start_content.width();

		aotu($start,$start_Ul,$btn,timer,width);
		aotu($start1,$start_Ul1,$btn1,time,width);

		function aotu($start,$start_Ul,$btn,timer,width){
			$btn.eq(0).css('color','#bbb');
			$btn.click(function(){
				if (new Date() - nowTime > 800) {
					nowTime = new Date();
					if ($(this).index()) {
						$start_Ul.animate({
							left : -width+'px',
						});
						$(this).css('color','#bbb').siblings().css('color','#ddd');
					}else{
						$start_Ul.animate({
							left : 0+'px',
						});
						$(this).css('color','#bbb').siblings().css('color','#ddd');
					}
				}
			});	
			timer = setInterval(autoPlay,7000);
			$start.hover(function(){
				clearInterval(timer)
			},function(){
				timer = setInterval(autoPlay,7000);
			})
			function autoPlay(){
				if (parseInt($start_Ul.css('left')) == 0) {
					$start_Ul.animate({
						left : -width+'px',
					});
					$btn.eq(1).css('color','#bbb').siblings().css('color','#ddd');
				}else{
					$start_Ul.animate({
						left : 0+'px',
					});
					$btn.eq(0).css('color','#bbb').siblings().css('color','#ddd');
				};
			};
		}
	})();


// 鼠标移动 对应的列表出来 添加className;
	(function(){
		var $dapei = $('#main_page .dapei_copy');
		 
		 	$dapei.each(function(i){
		 		mouse( $dapei.eq(i) );
		 	})
		 function mouse( obj ){
			var $dapei_Pos_ul = obj.find('.c_right ul');
			var $onLi = obj.find('.title ul li');
			$dapei_Pos_ul.eq(0).css('display','block');
			$onLi.eq(0).addClass('hover');
			$onLi.hover(function(){
				var index = $(this).index();
				$dapei_Pos_ul.css('display','none');
				$onLi.removeClass();
				$onLi.eq(index).addClass('hover');
				$dapei_Pos_ul.eq(index).css('display','block');
				
			},function(){
				var index = $(this).index();
				$dapei_Pos_ul.eq(index).css('display','block').siblings().css('display','none');
				$onLi.eq(index).addClass('hover').siblings().removeClass();
			});
		 };
	})();
// 内容
(function(){
	var $liList = $('#main_page .con .list ul li.liList');
	var $ul = $('#main_page .con .list ul li.liList ul');

	$liList.each(function(i){
		play( $liList.eq(i).find('.btn'), $ul.eq(i), $liList.eq(i) );
	})

	$liList.hover(function(){
		$(this).css({
			 transition: '.6s'
		});
		$(this).find('a.btn').stop().fadeIn();
	},function(){
		$(this).find('a.btn').stop().fadeOut();
	});

	function play( btn , ul , liList ){
		var index = 0;
		btn.on('click',function(){
			if( $(this).index()-2 ){
				index++;
				if (index >= ul.find('li').length) index = ul.find('li').length-1;
			}else{
				index--;
				if (index <= 0) index =0;
			}
		liList.find('ol li').eq(index).find('span').addClass('on').parent().siblings().find('span').removeClass();
			ul.stop().animate({left : -index*$liList.width()+'px'});
		})
		liList.find('ol li').click(function(){
			var n = $(this).index();
			ul.stop.animate({
				left : n*liList.width()
			})
		});
	}
})();






























