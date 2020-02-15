 //入口函数
 $(function () {
     //获取artile_list页面传递过来的文章id
     var articleId = window.location.href.split('=')[1];
     console.log(articleId);

     //根据文章id发送ajax请求获取该文章的详细信息
     setTimeout(function () {
         $.ajax({
             url: BigNew.article_search,
             data: {
                 id: articleId
             },
             success: function (backData) {
                 //console.log(backData);
                 if (backData.code == 200) {
                     //把对应的详细信息显示在对应的标签上. 
                     $('#inputTitle').val(backData.data.title); //文章标题   
                     $('.article_cover').attr('src', backData.data.cover); //文章预览图
                     $('select.category').val(backData.data.categoryId); //文章类别
                     $('#testico').val(backData.data.date); //文章发布时间
                     editor.txt.html(backData.data.content); //文章内容
                 }
             }
         });
     }, 0);

     //图片预览
     $('#inputCover').on('change', function () {
         var fileIcon = this.files[0];
         var url = URL.createObjectURL(fileIcon);
         $(this).prev().attr('src', url);
     });

     //发送ajax请求获取所有的文章类别
     $.ajax({
         type: 'get',
         url: BigNew.category_list,
         success: function (backData) {
             if (backData.code == 200) {
                 //模板引擎渲染数据
                 $('select.category').html(template('art_cate_temp', backData));
             }
         }
     });

     // 编辑页使用日期插件 jeDate
     jeDate("#testico", {
         zIndex: 20999,
         format: "YYYY-MM-DD",
         isTime: false,
         minDate: "2014-09-19 00:00"
     });

     //编辑页使用富文本编辑器  wangEditor
     var E = window.wangEditor;
     var editor = new E('#editor');
     // 或者 var editor = new E( document.getElementById('editor') )
     editor.create()


     // 发布按钮
     $('.btn-edit').click(function (e) {
         //禁用表单默认提交事件
         e.preventDefault();
         // 调用函数发送ajax请求
         editArticlie("已发布", "修改成功");
     });

     //存入草稿按钮
     $('.btn-draft').click(function (e) {
         //禁用表单默认提交事件
         e.preventDefault();
         //调用函数发送ajax请求
         editArticlie('草稿', "存入草稿成功");
     });

     //封装函数,精简代码
     function editArticlie(state, result) {
         var fd = new FormData($('#form')[0]);
         fd.append('content', editor.txt.html());
         //追加一个state键对应的值已发布到fd对象中
         fd.append('state', state);
         // 追加要编辑的文章的id到fd对象中
         fd.append('id', articleId);
         console.log(fd.get("state"));

         // 发送ajax请求
         $.ajax({
             type: "post",
             url: BigNew.article_edit,
             data: fd,
             contentType: false,
             processData: false,
             success: function (backData) {
                 console.log(backData);
                 if (backData.code == 200) {
                     alert(result);
                     window.history.back();
                 }
             }
         })
     }
 });