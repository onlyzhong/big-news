$(function () {
    $('.input_sub').click(function (e) {

        //2.阻止默认跳转事件（表单submit会自动跳转页面）
        e.preventDefault();
        //3.获取用户名和密码
        let username = $(".input_txt").val().trim();
        let password = $(".input_pass").val().trim();
        //4.非空判断
        if (username == '' || password == '') {
            $(".modal-body").text("用户名或密码不能为空");
            $("#myModal").modal();
        }
        //5.ajax发送请求
        $.ajax({
            type: "post",
            dataType: "json",
            url: BigNew.user_login,
            data: {
                username: username,
                password: password
            },
            success: function (backData) {
                console.log(backData);
                //6.处理响应结果  a.成功：跳转管理系统首页  b.失败：提示用户
                if (backData.code == 200) {
                    $(".modal-body").text(backData.msg);
                    $("#myModal").modal();
                    $("#myModal").on("hidden.bs.modal", function (e) {
                        localStorage.setItem("token", backData.token);
                        //跳转首页
                        window.location.href = "./index.html";
                    })
                } else {
                    $(".modal-body").text(backData.msg);
                    $("#myModal").modal()
                }
            }
        })

    })
})