function sumbitBasicQuery(){
    
    //alert("Basic Query Submitted!");
    var dialog = document.getElementById("dialog"); 
    dialog.innerHTML = "Basic Query Submitted!";
    $('#dialog').dialog();
    
    $( ".progressbar" ).progressbar({
      value: 37
    });
}

function sumbitAdvancedQuery(){
    
    //alert("Advanced Query Submitted!");
    var dialog = document.getElementById("dialog"); 
    dialog.innerHTML = "Advanced Query Submitted!";
    $('#dialog').dialog();
    
    $( ".progressbar" ).progressbar({
      value: 37
    });
}