$(document).ready(function(){

    // Navbar active
    const currentPage = location.pathname.split("/").pop();

    $(".nav-link").each(function(){
        if($(this).attr("href") === currentPage){
            $(this).addClass("active");
        }
    });

    // Profile dropdown
    $("#profileBtn").click(function(e){
        e.stopPropagation();
        $("#profileMenu").toggle();
    });

    $(document).click(function(){
        $("#profileMenu").hide();
    });

});