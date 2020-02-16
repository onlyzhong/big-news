
//入口函数
$(function () {

    //图片预览
    $('#inputCover').on('change', function () {
        var fileIcon = this.files[0];
        var url = URL.createObjectURL(fileIcon);
        $(this).prev().attr('src', url);
    });

    //文章类别
    $.ajax({
        type: "get",
        url: BigNew.category_list,
        success: function (backData) {
            console.log(backData);
            if (backData.code == 200) {
                $("select.category").html(template("art_cate_temp", backData));
            }
        }
    });

    //编辑页使用日期插件 jeDate
    jeDate("#testico", {
        zIndex: 20999,
        isinitVal: true,
        format: "YYYY-MM-DD",
        isTime: false,
        minDate: "2014-09-19 00:00:00"
    })

    //富文本插件
    var E = window.wangEditor;
    var editor = new E('#editor');
    // 或者 var editor = new E( document.getElementById('editor') )
    editor.create()

    //发布文章
    $('.btn-release').on('click', function (e) {
        e.preventDefault();
        releaseArticle("已发布", "发布成功");
    })

    //发布文章存为草稿
    $('.btn-draft').on('click', function (e) {
        e.preventDefault();
        releaseArticle("草稿", "已存入草稿")
    })

    //函数封装
    function releaseArticle(state, result) {
        var fd = new FormData($("#form")[0]);
        // 追加富文本编辑器里面修改后的文章内容到fd对象中
        fd.append('content', editor.txt.html());
        //追加一个state键对应的值已发布到fd对象中
        fd.append('state', state);
        //发送ajax请求
        $.ajax({
            type: 'post',
            url: BigNew.article_publish,
            data: fd,
            contentType: false,
            processData: false,
            success: function (backData) {
                console.log(backData);
                if (backData.code == 200) {
                    alert(result);
                    window.history.back(); //回退回去.
                }
            }
        })
    }
})