/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


var xmlhttp = new XMLHttpRequest();
var url = "http://127.0.0.1:8080/image-sharing-service/showImg";
xmlhttp.onreadystatechange = function () {
    if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
        myFunction2(xmlhttp.responseText);
    }
};
xmlhttp.open("GET", url, true);
xmlhttp.send();
function myFunction2(response) {
    var arr = JSON.parse(response);
    var i;
    var starCounter;
    var out = "";
    for (i = 0; i < arr.length; i++) {
        out += "<div class=\"col-lg-3 col-md-4 col-xs-6\"><a href=\"#\" onclick=\"ReadImage(" + arr[i].id + ");return false;\"";
        out += "class=\"thumbnail\">";
        out += "<img class=\"img-responsive\" src='images/" + arr[i].path;
        out += "' />";
        out += "<div class=\"star-rating\">";
        out += "<div class=\"star-rating__wrap\">";
        for (starCounter = 1; starCounter < 6; starCounter++) {
            out += "<input class=\"star-rating__input\" id=\"star-rating-" + starCounter + "\" type=\"radio\" name=\"rating\" value=\"" + starCounter + "\">";
            out += "<label class=\"star-rating__ico fa fa-star-o fa-lg\" for=\"star-rating-" + starCounter + "\" title=\"5 out of 5 stars\"></label>";
        }
        out += "</div></div>";
        out += arr[i].rating;
        out += "</a></div>";
    }
    out += "";
    document.getElementById("images").innerHTML = out;
}

function ReadImage(id) {
    var xmlhttp = new XMLHttpRequest();
    var url = "http://127.0.0.1:8080/image-sharing-service/image/" + id;
    show_comments(id);
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
            myFunction(xmlhttp.responseText);
        }
    };
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
    function myFunction(response) {
        var arr = JSON.parse(response);
        var i;
        var out = "";
        out += "<div class=\"col-md-10\">";
        out += "<img class=\"img-responsive center-block\" src='images/" + arr[0].path;
        out += "' />";

        out += "</div></div>";
        out += "<div class=\"row\">";
        out += "<div class=\"col-md-10\">Comment:";
        out += "<form class=\"form-horizontal\" action=\"http://127.0.0.1:8080/image-sharing-service/writeComment/\" id=\"commentForm\"><input type=\"text\" class=\"form-control\" name=\"comment\" value=\"Write your comment here.\"><input type=\"hidden\" value=\""+arr[0].id+"\" name=\"id\"></form>";
        out += "<button type=\"button\" onclick=\"write_comment();\" class=\"btn btn-primary\">comment</button>";
        out += "</div>";
        write_comment();
        document.getElementById("images").innerHTML = out;
    }
}

function show_comments(id) {
         $.ajax({
            url:"http://127.0.0.1:8080/image-sharing-service/comment/" + id,
            success:function(data){
               var arr = data;
               $("#comments").empty();
               for (i = 0; i < arr.length; i++) {
                   $("#comments").append(arr[i].comment+"</br>");
               }
            }
         }); 
         };
         
function write_comment(){
    $("#commentForm").submit(function(e)
{
    var postData = $(this).serialize();
    var formURL = $(this).attr("action");
    var id = jQuery('input[name="id"]').val();
    $.ajax(
    {
        url : formURL,
        type: "POST",
        data : postData,
        success:function(data)
        {
        }
    }).always(function(){
        $("#comments").empty();
        show_comments(id);
        });
    e.preventDefault(); //STOP default action
});
$("#commentForm").submit();
};