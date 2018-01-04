
// banner部分鼠标时间
(function(){
	var oCarousel = document.querySelectorAll("#carousel .container")[0];
    oCarousel.onmouseenter = function () {
        oCarousel.style.cssText = 'transition: 4000ms cubic-bezier(0.03, 0.98, 0.52, 0.99);';
        styleCtrl();
        this.onmousemove = function(e){
            e = e || window.event;
            var xMid = this.offsetLeft+this.offsetWidth/2;
            var yMid = this.offsetTop+this.offsetHeight/2;
            var x = e.clientX;
            var y = e.clientY;
            if (x > xMid || y > yMid) {
                x -= xMid;
                x *= -.03;
                y -= yMid;
                y *= .03;
            }else{
                x = (this.offsetWidth/2-(x-this.offsetLeft))*.03;
                y = -(this.offsetHeight/2-(y-this.offsetTop))*.03;
            };
            console.log(x,y);
            this.style.transform = 'rotateY('+x+'deg) rotateX('+y+'deg)';
        };
        this.onmouseleave = function(){
            this.style.cssText = 'transform:rotate(0,0,0);transition: 4000ms cubic-bezier(0.03, 0.98, 0.52, 0.99);';
            styleCtrl();
        };
    };
    function styleCtrl() {
		setTimeout(function(){
            oCarousel.style.cssText = "transform:rotate(0,0,0);";
		},4000)
    }
})();


// 鼠标移入icon图标
(function(){
	var $iconImg = $('#subNav .container .row .icon img');
	$iconImg.each(function(i){
		$iconImg.eq(i).hover(function(){
			$(this).css({
				animation : 'icon 10s linear infinite'
			});
		},function(){
			$(this).css({
				animation : 'none',
				transform: 'rotateZ(0deg)'
			});
		});
	});
})();


// 瀑布流
(function(){
    var $backTop = $('#backTop');
    var $row = $('#content .container .row');
// 鼠标滚轮监听
	$(document).scroll(function(){
		var pageH = $row.offset().top+$row.height()-$(document).scrollTop();
		var winH = $(window).height();
		if ( pageH < winH-200 ) {
			show();
		}
		if ($(document).scrollTop() > 20) {
			$backTop.stop().fadeIn();
		}else{
			$backTop.stop().fadeOut();
		}
	});
// 点击回到顶部
    $backTop.on('click',function(){
        $('html,body').stop().animate({
            scrollTop : 0,
        });
    });
// 瀑布流ajsx函数
    function show(){
        var $article = $("#content .container .row .article");
        $.ajax({
            url : "/",
            type:"post",
            dataType:"json",
            data:{
                num :$article.length
            },
            success(data){
                for( var i in data.data){
                    $row.append(`
						<div class="article col-lg-3 col-md-3 col-sm-3 col-xs-6">
							<div class="detail" style="display: block; transition: 0.3s linear;">
								<div class="img">
									<a href="/detail/${data.data[i].id}.html">
										<img class="img-responsive" src="${data.data[i].src}" alt="案例">
									</a>
								</div>
								<div class="info">
									<a href="/detail/${data.data[i].id}.html">${data.data[i].de}</a>
									<p>${data.data[i].time}</p>
									<button class="btn btn-primary pull-right">Like</button>
								</div>
							</div>
						</div>
					`);
                };
            },
        });
        $row.find(".article").stop().fadeIn();
    };
})();
// 瀑布流结束
// 判断浏览器版本

(function(){
	if (checkBrower().ie) {
		if ( checkBrower().ie == '8.0' ) {
			alert( '抱歉，此博客暂不支持IE'+checkBrower().ie+'及以下浏览器，请升级。' )
		}else if(checkBrower().ie == '7.0'){
			alert( '抱歉，此博客暂不支持IE'+checkBrower().ie+'、IE8.0及以下浏览器，请升级。' )
		}
	}
	
	function checkBrower() {
	    var Sys = {};
	    var ua = navigator.userAgent.toLowerCase();
	    if (window.ActiveXObject) {
	        Sys.ie = ua.match(/msie ([\d.]+)/)[1];
	        //获取版本
	        var ie_version = 6;
	        if (Sys.ie.indexOf("7") > -1) {
	            ie_version = 7;
	        }
	        if (Sys.ie.indexOf("8") > -1) {
	            ie_version = 8;
	        }
	        // if (Sys.ie.indexOf("9") > -1) {
	        //     ie_version = 9;
	        // }
	        // if (Sys.ie.indexOf("10") > -1) {
	        //     ie_version = 10;
	        // }
	        // if (Sys.ie.indexOf("11") > -1) {
	        //     ie_version = 11;
	        // }
	    }
	    // else if (ua.indexOf("firefox") > -1)
	    //     Sys.firefox = ua.match(/firefox\/([\d.]+)/)[1];
	    // else if (ua.indexOf("chrome") > -1)
	    //     Sys.chrome = ua.match(/chrome\/([\d.]+)/)[1];
	    // else if (window.opera)
	    //     Sys.opera = ua.match(/opera.([\d.]+)/)[1];
	    // else if (window.openDatabase)
	    //     Sys.safari = ua.match(/version\/([\d.]+)/)[1];
	     return Sys;
	}
})();
	