/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var printed = false;
function login() {
    $("#login").submit(function (e) {
        var postData = $(this).serialize();
        var formURL = $(this).attr("action");
        var logged = "no";

        $.ajax(
                {
                    url: formURL,
                    type: "POST",
                    data: postData,
                    success: function (data)
                    {

                        parsedData = null;
                        parsedData = JSON.parse(data);


                        if (parsedData[0] === "no") {

                            $('#username').val('');
                            $('#password').val('');
                            if (!printed) {
                                $("#after").append("<p>Wrong username or password</p>");
                                printed = true;
                            }
                        } else {

                            sessionStorage.setItem('user', parsedData[0]);
                            sessionStorage.setItem('role', parsedData[1]);
                            sessionStorage.setItem('userId', parsedData[2]);

                            logged = "yes";
                            window.location.replace('index.html');
                            //alert("Kirjautuneena: "+ parsedData);
                        }

                        sessionStorage.setItem('loggedIn', logged);

                    }
                });
        e.preventDefault(); //STOP default action
    });
    $("#login").submit();
}
;



function logout() {
    sessionStorage.setItem('loggedIn', 'no');
    //$("#logout").load();
    //$("#login1").load();
    //$( "#user" ).load();
}
function onLoad() {

    var status = sessionStorage.getItem('loggedIn');
    if (!status) {
        sessionStorage.setItem('loggedIn', 'no');
        status = sessionStorage.getItem('loggedIn');
    }

    if (status === "no") {//out
        $("#logout").hide();
        $("#user").empty();

    }
    else {//in
        $("#login1").hide();
        $("#user").empty();
        $("#user").append(sessionStorage.getItem('user'));

    }

}