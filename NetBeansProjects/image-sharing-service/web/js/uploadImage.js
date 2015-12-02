/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var data = new FormData();
jQuery.each(jQuery('#file')[0].files, function(i, file) {
    data.append('file-'+i, file);
});

jQuery.ajax({
    url: 'uploadImg',
    data: data,
    cache: false,
    contentType: false,
    processData: false,
    type: 'POST',
    success: function(data){
        alert("Picture saved: "+data);
    }
});