(function ($) {
    function processForm(e) {
        var dict = {
            Title: this["title"].value,
            Genre: this["genre"].value,
            Director: this["director"].value
        };

        $.ajax({
            url: 'https://localhost:44325/api/movie',
            dataType: 'json',
            type: 'post',
            contentType: 'application/json',
            data: JSON.stringify(dict),
            success: function (data, textStatus, jQxhr) {
                $('#response pre').html(data);
            },
            error: function (jqXhr, textStatus, errorThrown) {
                console.log(errorThrown);
            }
        });

        e.preventDefault();
    }
    
    function makeTable() {
        $.ajax({
            url: 'https://localhost:44325/api/movie',
            dataType: 'json',
            type: 'get',
            success: resetTable
        })
    }

    function resetTable(data){
        if(data == null){
            var list = [];
        }
        else if(data instanceof Array){
            list = data;
        }
        else{
            list = [data];
        }
        $('#movies tbody').remove();
        var movieTable = "";
        $.each(list, function (index, movie) {
            movieTable += '<tr>';
            movieTable += '<td>' + '<a onclick= stuff() href="#" id="myBtn">' + movie.title + '</a></td>';
            movieTable += '<td>' + movie.genre + '</td>';
            movieTable += '<td>' + movie.director + '</td>';
            movieTable += '</tr>'
        });
        $('#movies').append(movieTable);
    }

    $(document).ready(makeTable);
    $('#my-form').submit(processForm);
    $('#submit').on("click", makeTable)
})(jQuery); 


function stuff(title){
    var modal = document.getElementById("myModal");
    var span = document.getElementsByClassName("close")[0];
    var btn = document.getElementById("myBtn");
    var closeButton = document.getElementById("closeButton");
    var titleInput = document.getElementById("titleInput");

    modal.style.display = "block";

    span.onclick = function() {
        modal.style.display = "none";
    }

    closeButton.onclick = function() {
        modal.style.display = "none";
    }

    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
}