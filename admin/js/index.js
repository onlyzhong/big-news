$(function () {
    //个人信息
    $.ajax({
        type: "get",
        url: BigNew.user_info,
        dataType: "json",
        // headers: {'Authorization': localStorage.getItem("token")},
        success: function (backData) {
            console.log(backData);
            $('.user_info>img').attr('src', backData.data.userPic);
            $('.user_center_link>img').attr('src', backData.data.userPic);
            $('.user_info>span').text(backData.data.nickname);
        }
    })
    //用户登出
    $(".logout").click(function () {
        $(".modal-body").text("登出成功");
        $("#myModal").modal();
        localStorage.removeItem("token");
        $("#myModal").on("hidden.bs.modal", function (e) {
            //跳转登陆页面
            window.location.href = "./login.html";
        })
    })
    //点击右侧导航栏效果
    //一级列表
    $(".level01").click(function () {
        //排他思想修改样式
        $(this).addClass("active").siblings().removeClass("active");
        // 如果点击的是文章管理,则下滑二级列表ul
        //用next是因为ul是文章管理的下一个兄弟元素
        if ($(this).next().hasClass("level02")) {
            //滑入滑出切换  slideToggle()
            $(this).next().slideToggle();
            //遍历find()出b标签(即小箭头).旋转90度
            $(this).find('b').toggleClass("rotate0");
            //默认选择第一个
            $(".level02>li>a").eq(0)[0].click();
            console.log($(".level02>li>a").eq(0)[0]);
        } else {
            //如果点击的不是文章管理一级菜单列表，则移除二级列表的选中样式
            $('.level02>li').removeClass('active');

            // 下面代码表示是否要在点击其他菜单是收起文章管理????
            //滑入滑出切换  slideToggle()
            $(".level02").slideUp();
            $(".level02").prev().find('b').removeClass("rotate0");
        }
    })

    //二级列表
    $('.level02>li').click(function () {
        $(this).addClass('active').siblings().removeClass('active');
    });



})