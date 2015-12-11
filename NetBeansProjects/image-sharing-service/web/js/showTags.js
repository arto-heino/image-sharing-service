$(document).ready(function () {
    $.ajax({
        url: "http://127.0.0.1:8080/image-sharing-service/showTags",
        success: function (data) {
            var arr = data;
            for (i = 0; i < arr.length; i++) {
                $("#tags").append("<a href=\"#\">" + arr[i].tag + "</a></br>");
            }
        }

    });
}); 