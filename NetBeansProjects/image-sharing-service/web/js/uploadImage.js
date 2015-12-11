/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */



function upload_image(){
    $("#upload").submit(function(e){
        var fileSelect = document.getElementById('file');
        var files = fileSelect.files;
        var formData = new FormData();
        var user = sessionStorage.getItem('userId');
        

        if(!user)user = 4;
                  
        formData.append('user', user);
        
        
        for (var i = 0; i < files.length; i++) {
        var file = files[i];

  // Check the file type.
  if (!file.type.match('image.*')) {
    continue;
  }

  // Add the file to the request.
  formData.append('file', file, file.name);
  $("#uploadFile").append(file.name);
}
        

jQuery.ajax({
    url: $(this).attr("action"),
    data: formData,
    cache: false,
    contentType: false,
    processData: false,
    type: 'POST',
    success: function(data){
        $("#uploadFile").empty().append(data);
    }
});

e.preventDefault();
    });
$("#upload").submit();
};
