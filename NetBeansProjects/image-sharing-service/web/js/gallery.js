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
            var arr1 = data1;
            $("#comments").empty();
            for (i = 0; i < arr1.length; i++) {
                $("#comments").append(''+arr1[i].date +' *' + arr1[i].userName + '* ' + arr1[i].comment + '</br>');
            }
        }
    });
};

function write_comment() {
    $("#commentForm").submit(function (e)
    {
        var user = sessionStorage.getItem('userId');
        if(!user)user = 4;
        var postData = $(this).serialize();
        
        var formURL = $(this).attr("action");
        var id = jQuery('input[name="id"]').val();
        $.ajax(
                {
                    method:"POST",
                    url: formURL,
                    type: "POST",
                    data: postData+ "&userId=" +user,
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
};

function makeAjaxRequest() {
    $("#searchTag").submit(function(e){
    $.ajax({
        url: 'http://127.0.0.1:8080/image-sharing-service/showImgByTag',
        type: 'post',
        data: {tag: $('input#tag').val()},
        success: function (data) {
            var arr = JSON.parse(data);
            var html = [];
            for (i = 0; i < arr.length; i++) {
                html.push('<div class="col-lg-3 col-md-4 col-xs-6"><a href="#" onclick="read_image(' + arr[i].id + ');return false;" class="thumbnail">');
                html.push('<img class="img-responsive" src="images/' + arr[i].path + '" /></a>');
                html.push('</div>');
            }
            $("#images").empty().append(html.join(''));
        }
        
    });
    e.preventDefault();
    });
    $("#searchTag").submit();
};

function show_images() {
    $.ajax({
        method:"POST",
        url: "http://127.0.0.1:8080/image-sharing-service/showImg",
        success: function (data) {
            var arr = data;
            var html = [];
            for (i = 0; i < arr.length; i++) {
                html.push('<div class="col-lg-3 col-md-4 col-xs-12"><a href="#" onclick="read_image(' + arr[i].id + ');return false;" class="thumbnail">');
                html.push('<img class="img-responsive imgSizing" src="images/' + arr[i].path + '" /></a>');
                html.push('</div>');
            }
            $("#images").empty().append(html.join(''));
        }
    });
};

function read_image(id) {
    $.ajax({
        method:"POST",
        url: "http://127.0.0.1:8080/image-sharing-service/image/" + id,
        success: function (data2) {
            var arr2 = JSON.parse(data2);
            var html = [];

            html.push('<div class="col-md-10"><img class="img-responsive center-block" src="images/' + arr2[0].path + '"/>');
            html.push('Uploaded by: '+arr2[0].username+'</div></div><div class="row"><div class="col-md-10">');
            html.push('<form class="form-horizontal" action="http://127.0.0.1:8080/image-sharing-service/writeComment/" id="commentForm"><input type="text" class="form-control" name="comment" value="" placeholder="Please add a comment."><input type="hidden" value="' + arr2[0].id + '" name="id"></form>');
            html.push('<button type="button" onclick="write_comment();" class="btn btn-primary">comment</button></div>');

            $("#images").empty().append(html.join(''));

            show_comments(id);
        }
    });
};
