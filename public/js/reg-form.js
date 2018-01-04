$(function(){
    var $pwd1=$('#psw1'),
        $pwd2=$('#psw2'),
        $uid = $('#uid'),
        $divuser = $('#div-username'),
        $regsubmit = $("#reg-form .submit"),
        $password = $('#div-password'),
        $password2=$('#div-password2');
    //注册页面的提示文字
   (function register(){
       $uid.blur(function(){
           const reg=/^[a-zA-Z][a-zA-Z\u4E00-\u9FA5]{6,16}$/; //验证用户名
           $divuser.find('.text').text("用户名必须为6—16位的英文字母或数字");
           $.ajax({
               url:"/reg/info",
               type:"post",
               dataType:"json",
               data:{
                   user:$(this).val()
               },
               success(data){
                   if(data.data[0] && data.data[0].username != '')
                   {
                       $divuser.find('.text').text(`${data.data[0].username} 已存在`);
                       $regsubmit.css({
                           backgroundColor:"#bbb",
                           cursor:"not-allowed"
                       });
                       $regsubmit.attr('disabled','ture');
                       $divuser.css("display","block");
                   }
               }
           });
           if( $(this).val()=="" || $(this).val().length>16 || $(this).val().length<6 )
           {
               $divuser.css("display", "block");
               $regsubmit.css({
                   backgroundColor:"#bbb",
                   cursor:"not-allowed"
               });
               $regsubmit.attr('disabled','ture');
           }
           else
           {
               $divuser.css("display","none");
               $regsubmit.removeAttr('disabled').css({
                   cursor:"pointer",
                   backgroundColor:"#3c6db0"
               });
           }
       });
       //密码栏失去焦点
       $pwd1.blur(function(){
           const reg=/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/;
           if(!reg.test($pwd1.val()))
           {
               $password.css("display","block");
               $regsubmit.css({
                   backgroundColor:"#bbb",
                   cursor:"not-allowed"
               });
               $regsubmit.attr('disabled','ture');
           }else if($pwd2.val() == '')
           {
               $regsubmit.css({
                   backgroundColor:"#bbb",
                   cursor:"not-allowed"
               });
               $regsubmit.attr('disabled','ture');
           }
           else if($pwd1.val()!=$pwd2.val())
           {
               $password2.css('display','block');
               $regsubmit.css({
                   backgroundColor:"#bbb",
                   cursor:"not-allowed"
               });
               $regsubmit.attr('disabled','ture');
           }
           else
           {
               $password.css("display","none");
               $regsubmit.removeAttr('disabled').css({
                   cursor:"pointer",
                   backgroundColor:"#3c6db0"
               });
           }
       });
        /*确认密码失去焦点*/
       $pwd2.blur(function(){
            if( $pwd1.val() == "" && $pwd2.val() == "" )
            {
                $password.css("display","block");
                $password2.css("display","block");
                $regsubmit.css({
                    backgroundColor:"#bbb",
                    cursor:"not-allowed"
                });
                $regsubmit.attr('disabled','ture');
            } else if( $pwd1.val() == "" )
            {
                $regsubmit.css({
                    backgroundColor:"#bbb",
                    cursor:"not-allowed"
                });
                $regsubmit.attr('disabled','ture');
            }
            else if( $pwd2.val() == "" )
            {
                $password2.css("display","block");
                $regsubmit.css({
                    backgroundColor:"#bbb",
                    cursor:"not-allowed"
                });
                $regsubmit.attr('disabled','ture');
            }
            else if( $pwd1.val()!=$pwd2.val() )
            {
                $password2.css('display','block');
                $regsubmit.css({
                    backgroundColor:"#bbb",
                    cursor:"not-allowed"
                });
                $regsubmit.attr('disabled','ture');
            }
            else
            {
                $password.css('display','none');
                $password2.css("display","none");
                $regsubmit.removeAttr('disabled').css({
                    cursor:"pointer",
                    backgroundColor:"#3c6db0"
                });
            }
        });
   })();
});