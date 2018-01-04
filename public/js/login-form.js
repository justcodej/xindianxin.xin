$(function(){
    var $pwd=$('#psw'),
        $uid = $('#uid'),
        $regsubmit = $("#formWarp .buttons .submit");
    //账户输入框失去焦点
    (function login_validate(){
        $uid.blur(function(){
            if( $(this).val()=="" || $(this).val().length>16 || $(this).val().length<6 )
            {
                $regsubmit.css({
                    backgroundColor:"#bbb",
                    cursor:"not-allowed"
                });
                $regsubmit.attr('disabled','ture');
            }else{
                $regsubmit.removeAttr('disabled').css({
                    cursor:"pointer",
                    backgroundColor:"#3c6db0"
                });
            }
        });
        /*密码输入框失去焦点*/
        $pwd.blur(function(){
            if($(this).val() == "" || $(this).val().length < 6|| $(this).val().length > 20){
                $regsubmit.css({
                    backgroundColor:"#bbb",
                    cursor:"not-allowed"
                });
                $regsubmit.attr('disabled','ture');
            }else{
                $regsubmit.removeAttr('disabled').css({
                    cursor:"pointer",
                    backgroundColor:"#3c6db0"
                });
            }
        });
    })();
    //回车登陆
    $(document).keydown(function (e) {
        if(e.keyCode == 13){
            loginAjax();
        }
    });
    // ajax提交登陆数据
    $regsubmit.click(function () {
        loginAjax();
    });
    // 登陆ajax函数
    function loginAjax() {
        if( $regsubmit.attr('disabled') != 'disabled' ){
            $.ajax({
                url:"/login",
                type:"post",
                dataType:"json",
                data:{
                    user:$uid.val(),
                    pass:$pwd.val()
                },
                success(data){
                    if( data.data == '密码错误' ){
                        $('#formWarp').html('<div style="font-size: 14px; text-align: center; margin-top:-8px;">密码错误 <a href="/login">返回</a></div>');
                    }else if(data.data == '用户名不存在'){
                        $('#formWarp').html('<div style="font-size: 14px; text-align: center; margin-top:-8px;">用户名不存在 <a href="/login">返回</a></div>');
                    }else {
                        $('#formWarp').html('<div style="font-size: 14px; text-align: center; margin-top:-8px;">登陆成功 3秒后<a href="/">返回首页</a></div>');
                        setTimeout(function () {
                            location.href="/";
                        },3000);
                    }
                }
            })
        }
    }
});