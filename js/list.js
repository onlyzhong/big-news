$(function () {
    //热门排行
    $.ajax({
        url: 'http://localhost:8080/api/v1/index/rank',
        success: function (backData) {
            //console.log(backData);
            if (backData.code == 200) {
                //遍历数据
                //找到数据要渲染的标签,分别渲染上. 
                for (var i = 0; i < backData.data.length; i++) {
                    $('.content_list>li').eq(i).children('a').text(backData.data[i].title);
                    $('.content_list>li').eq(i).children('a').attr('href',
                        './article.html?id=' + backData.data[i].id);
                }
            }
        }
    });


    //最新评论
    $.ajax({
        url: 'http://localhost:8080/api/v1/index/latest_comment',
        success: function (backData) {
            var month = new Date().getMonth() + 1; //当前的月份
            backData.month = month; //添加到backData数据中
            //console.log(backData);
            var resHtml = template('latestcomment_temp', backData);
            $('.comment_list').html(resHtml);
        }
    });

    //焦点关注
    $.ajax({
        url: 'http://localhost:8080/api/v1/index/attention',
        success: function (backData) {
            //console.log(backData);
            if (backData.code == 200) {
                var resHtml = template('attention_temp', backData);
                $('.guanzhu_list').html(resHtml);
            }
        }
    })
    //获取所有的文章类型
    $.ajax({
        url: 'http://localhost:8080/api/v1/index/category',
        success: function (backData) {
            //console.log(backData);
            if (backData.code == 200) {
                var resHtml = template('category_temp', backData);
                $('.level_two').html(resHtml);;
                //七.获取所有的文章类型2
                var resHtml2 = template('category_temp2', backData);
                $('.left_menu.fl').html(resHtml2);
            }
        }
    });




    //点击搜索按钮
    $(".search_btn").on("click", function () {
        var search_txt = $(".search_txt").val().trim();
        if (search_txt != "") {
            window.location.href = "./list.html?search=" + search_txt;
        }
    })

    //文本输入框设置键盘按下回车
    $('.search_txt').on('keydown', function (e) {
        if (e.keyCode == 13) {
            $('.search_btn').click();
        }
    })

    //获取通过url传递过来的文章类别id
    var typeId = window.location.search.split('=')[1];

    var type = window.location.search.split('=')[0];
    console.log(type);
    // 获取搜索文章带过来的关键字
    var searchTxt = window.location.search.split('=')[1];


    if (type == '') {
        window.location.href = "./index.html";
    } else if (type == "?id") {
        //根据id发送ajax请求获取文章
        $.ajax({
            url: 'http://localhost:8080/api/v1/index/search',
            data: {
                type: typeId
            },
            success: function (backData) {
                console.log(backData);
                if (backData.code == 200) {
                    if (backData.data.data.length == 0) {
                        $('div.left_con').html('<div class="list_title"> <h3>没有数据</h3></div>');
                        // return;
                    } else {
                        //通过模板引擎渲染到页面上. 
                        var resHtml = template('latest_temp', backData);
                        // console.log(resHtml);
                        $('div.left_con').html('<div class="list_title"> <h3>' + backData.data.data[0].category + '</h3></div>' + resHtml);
                    }
                }
            }

        });
    } else {

        searchTxt = decodeURI(searchTxt); //urlencode解码
        console.log(searchTxt);

        //发送ajax请求获取搜索数据
        $.ajax({
            url: 'http://localhost:8080/api/v1/index/search',
            data: {
                key: searchTxt
            },
            success: function (backData) {
                console.log(backData);
                if (backData.code == 200) {
                    if (backData.data.data.length == 0) {
                        $('div.left_con').html('<div class="list_title"> <h3>没有数据</h3></div>');
                        // return;
                    } else {
                        //通过模板引擎渲染到页面上. 
                        var resHtml = template('latest_temp', backData);
                        // console.log(resHtml);
                        $('div.left_con').html('<div class="list_title"> <h3>找到"' + searchTxt + '"相关</h3></div>' + resHtml);
                    }
                }
            }
        });
    }


})