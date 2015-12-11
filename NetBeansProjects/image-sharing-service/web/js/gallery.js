/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

function show_comments(id) {
    $.ajax({
        method:"POST",
        url: "http://127.0.0.1:8080/image-sharing-service/comment/" + id,
        success: function (data1) {
            var arr = data1;
            $("#comments").empty();
            for (i = 0; i < arr.length; i++) {
                $("#comments").append(arr[i].date + " <" + arr[i].user + "> " + arr[i].comment + "</br>");
            }
        }
    });
}
;

function write_comment() {
    $("#commentForm").submit(function (e)
    {
        var postData = $(this).serialize();
        var formURL = $(this).attr("action");
        var id = jQuery('input[name="id"]').val();
        $.ajax(
                {
                    method:"POST",
                    url: formURL,
                    type: "POST",
                    data: postData,
                    success: function (data)
                    {
                    }
                }).always(function () {
            $("#comments").empty();
            show_comments(id);
        });
        e.preventDefault(); //STOP default action
    });
    $("#commentForm").submit();
}
;

function findByTag() {
    $('.btnSearch').click(function () {
        makeAjaxRequest();
    });

    $('form').submit(function (e) {
        makeAjaxRequest();
    });

}
;

function makeAjaxRequest() {
    $.ajax({
        method:"POST",
        url: '/showImg',
        type: 'get',
        data: {name: $('input#name').val()},
        success: function (response) {
            $('table#resultTable tbody').html(response);
        }
    });
}
;

function show_images() {
    $.ajax({
        method:"POST",
        url: "http://127.0.0.1:8080/image-sharing-service/showImg",
        success: function (data) {
            var arr = data;
            var html = [];
            for (i = 0; i < arr.length; i++) {
                html.push('<div class="col-lg-3 col-md-4 col-xs-6"><a href="#" onclick="read_image(' + arr[i].id + ');return false;" class="thumbnail">');
                html.push('<img class="img-responsive" src="images/' + arr[i].path + '" /></a>');
                html.push('<select id="example' + arr[i].id + '">');
                html.push('<option value="1">1</option>');
                html.push('<option value="2">2</option>');
                html.push('<option value="3">3</option>');
                html.push('<option value="4">4</option>');
                html.push('<option value="5">5</option>');
                html.push('</select></div>');

                $(function () {
                    $('#example' + arr[i].id).barrating('show', {
                        theme: 'bootstrap-stars'
                    });
                });
            }
            $("#images").empty().append(html.join(''));
        }
    });
}
;

function read_image(id) {
    $.ajax({
        method:"POST",
        url: "http://127.0.0.1:8080/image-sharing-service/image/" + id,
        success: function (data2) {
            var arr2 = JSON.parse(data2);
            var html = [];

            html.push('<div class="col-md-10"><img class="img-responsive center-block" src="images/' + arr2[0].path + '"/>');
            html.push('</div></div><div class="row"><div class="col-md-10">Comment:');
            html.push('<form class="form-horizontal" action="http://127.0.0.1:8080/image-sharing-service/writeComment/" id="commentForm"><input type="text" class="form-control" name="comment" value="Write your comment here."><input type="hidden" value="' + arr2[0].id + '" name="id"></form>');
            html.push('<button type="button" onclick="write_comment();" class="btn btn-primary">comment</button></div>');

            $("#images").empty().append(html.join(''));

            show_comments(id);
        }
    });
}