(function ($) {
    function processForm(e) {
        var dict = {
            Title: this["title"].value,
            Genre: this["genre"].value,
            Director: this["director"].value
        };

        $.ajax({
            url: 'https://localhost:44325/api/movie',
            dataType: 'text',
            type: 'post',
            contentType: 'application/json',
            data: JSON.stringify(dict),
            success: function (data, textStatus, jQxhr) {
                makeTable();
                clearForm();
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

    function resetTable(data) {
        if (data == null) {
            var list = [];
        }
        else if (data instanceof Array) {
            list = data;
        }
        else {
            list = [data];
        }
        $('#movies tbody').remove();
        var movieTable = "";
        $.each(list, function (index, movie) {
            movieTable += '<tr>';
            movieTable += '<td>' + '<a ' + 'onclick = editMovie(' + movie["movieId"] + ')' + ' href=#' + ' id=myBtn>' + movie.title + '</a></td>';
            movieTable += '<td>' + movie.genre + '</td>';
            movieTable += '<td>' + movie.director + '</td>';
            movieTable += '</tr>'
        });
        $('#movies').append(movieTable);
    }

    function clearForm() {
        var form = document.getElementById("my-form");
        form.reset();
    }

    $(document).ready(makeTable);
    $('#my-form').submit(processForm);
})(jQuery);

function editMovie(id) {
    $.get(("https://localhost:44325/api/movie/" + id), function (data) {
        changeDetails(data["title"], data["genre"], data["director"])
    });
}

function changeDetails(title, genre, director) {
    var modal = document.getElementById("myModal");
    var span = document.getElementsByClassName("close")[0];
    var btn = document.getElementById("myBtn");
    var closeButton = document.getElementById("closeButton");
    var titleInput = document.getElementById("titleInput");
    var genreInput = document.getElementById("genreInput");
    var directorInput = document.getElementById("directorInput");
    modal.style.display = "block";

    titleInput.value = title;
    genreInput.value = genre;
    directorInput.value = director;
    span.onclick = function () {
        modal.style.display = "none";
    }

    closeButton.onclick = function () {
        modal.style.display = "none";
    }

    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
}