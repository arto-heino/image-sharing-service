/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var printed = false;
function login() {
    $("#login").submit(function(e){
    var postData = $(this).serialize();
    var formURL = $(this).attr("action");
    var logged = false;
    
    $.ajax(
    {
        url : formURL,
        type: "POST",
        data : postData,
        success:function(data)
        {
            parsedData = null;
            parsedData = JSON.parse(data);
           
            if (parsedData[0]=="False"){
               
                $('#username').val('');
                $('#password').val('');
                if (!printed){
                    $( "#after" ).append( "<p>Wrong username or password</p>" );
                    printed = true;
                }
            }else{
            
            sessionStorage.setItem('user', parsedData[0]);
            sessionStorage.setItem('role', parsedData[1]);
            logged = true;
            window.location.replace('http://192.168.56.1:8080/image-sharing-service/');
            //alert("Kirjautuneena: "+ parsedData);
            }
            
         sessionStorage.setItem('loggedIn', logged);
         
        }
    })
    e.preventDefault(); //STOP default action
});
$("#login").submit();
};
   
    

function logout() {
    sessionStorage.setItem('loggedIn', "false")
}

function onLoad(){
    var status = sessionStorage.getItem('loggedIn');
            console.log(status);
            if (!status){//out
                var divOne = document.getElementById('logout');
                divOne.style.display='none';
                
            }
            else{//in
                var divOne = document.getElementById('login1');
                divOne.style.display='none';
                var theDiv = document.getElementById('user');
                var content = document.createTextNode(sessionStorage.getItem('user'));
                console.log(sessionStorage.getItem('user'));
                theDiv.append(content);
            }
}




