$(function () {

    getCommentList(1);

    //分页组件函数
    function loadPagination(totalPages, startPage) {
      //(1)先销毁上一次的分页数据
      $('#pagination').twbsPagination('destroy');
      //(2)加载分页插件
      $('#pagination').twbsPagination({
        totalPages: totalPages,
        startPage: startPage,
        visiblePages: 6,
        first: '首页',
        prev: '上一页',
        next: '下一页',
        last: '尾页',
        onPageClick: function (event, page) {
          //如果点击的页数与当前页数不一致，则发送ajax请求
          if (page != startPage) {
            getCommentList(page);
          };
        }
      });
    };

    //封装加载评论函数
    function getCommentList(currentPage) {
      $.ajax({
        url: BigNew.comment_list,
        type: 'get',
        dataType: 'json',
        data: {
          page: currentPage,
          perpage: 10,//每页返回10条数据
        },
        success: function (backData) {
          console.log(backData);
          //模板引擎渲染页面
          $('.table>tbody').html(template('comment_list', backData.data));
          //加载分页组件
          loadPagination(backData.data.totalPage, currentPage);
        }
      });
    };

    //评论审核通过
    $('.table>tbody').on("click", ".btn-pass", function () {
      //获取评论id
      var id = $(this).attr('data-id');
      $.ajax({
        url: BigNew.comment_pass,
        type: 'post',
        dataType: 'json',
        data: { id: id },
        success: function (backData) {
          console.log(backData);
          if (backData.code == 200) {
            alert('操作成功');
            window.location.reload();
          }
        }
      })
    })

    //评论拒绝
    $('.table>tbody').on("click", ".btn-reject", function () {
      //获取评论id
      var id = $(this).attr('data-id');
      $.ajax({
        url: BigNew.comment_reject,
        type: 'post',
        dataType: 'json',
        data: { id: id },
        success: function (backData) {
          console.log(backData);
          if (backData.code == 200) {
            alert('操作成功');
            window.location.reload();
          }
        }
      })
    })


    //评论删除
    $('body').on('click', '.btn-delete', function () {
      //获取评论id
      var id = $(this).attr('data-id');
      //ajax请求
      $.ajax({
        url: BigNew.comment_delete,
        type: 'post',
        dataType: 'json',
        data: { id: id },
        success: function (backData) {
          console.log(backData);
          if (backData.code == 200) {
            alert('删除通过');
            window.location.reload();
          }
        }
      });
    });
  })