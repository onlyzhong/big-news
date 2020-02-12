$(function () {
    //个人中心
    $.ajax({
        url: BigNew.user_detail,
        type: "get",
        dataType: "json",
        success: function (backData) {
            console.log(backData);
            // $("input.username").val(backData.data.username);
            // $("input.nickname").val(backData.data.nickname);
            // $("input.email").val(backData.data.email);
            // $("input.password").val(backData.data.password);
            // 渲染页面的表单元素类名与服务器返回的对象属性名一致
            for (var key in backData.data) {
                $("input." + key).val(backData.data[key])
            }
            $('img.user_pic').attr('src', backData.data.userPic);
        }
    });


    //2.文件预览
    //给file表单元素注册onchange事件
    $('#exampleInputFile').on("change", function () {
        //获取用户选择的图片
        var file = this.files[0];
        //将文件转为src路径
        var url = URL.createObjectURL(file);
        //将url路径赋值给img标签的src
        $('.user_pic').attr('src', url);
    });

    // 3.编辑个人信息
    $("#form").on("submit", function (e) {
        e.preventDefault();
        $.ajax({
            type: "post",
            url: BigNew.user_edit,
            dataType: "json",
            contentType: false,
            processData: false,
            data: new FormData(this),
            success: function (backData) {
                console.log(backData);
                $(".modal-body").text(backData.msg);
                $("#myModal").modal();
                $("#myModal").on("hidden.bs.modal", function () {
                    //此处有跨域问题
                    window.parent.location.reload();
                })
            }
        })
    })
})