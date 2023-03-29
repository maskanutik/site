$(document).ready(function(){
    $(".filter_button").on("click",filtering);
    $(".clear_button").on("click",clearFilters);

    function filtering(){

        var genre = $("#filter_genre option:selected").text();
        if (genre != "Любой"){
            genre = genre.toUpperCase();
        }

        var year =  $("#filter_year option:selected").text();
        if (year != "Любой"){
            year = year.toUpperCase();
        }

        var member =  $("#filter_member option:selected").text();
        if (member != "Любой"){
            member = member.toUpperCase();
        }

        $(".block").each(function() {
            var text = $(this).contents().text().toUpperCase();
        
            if ( (text.indexOf(genre) > -1 || genre == "Любой")
                &&  (text.indexOf(year) > -1 || year == "Любой")
                &&  (text.indexOf(member) > -1 || member == "Любой")) {
                $(this).show();
            }
            else {
                $(this).hide();
            }
            });
            return false;

    }

    function showAll(){
        $(".block").each(function() {
            $(this).show();
        });
    }

    function clearFilters(){
        showAll();
        $('#filter_genre option').prop('selected', false);
        $('#filter_year option').prop('selected', false);
        $('#filter_member option').prop('selected', false);
    }
});