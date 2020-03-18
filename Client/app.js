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
            success: function(data){
                resetTable(data);
            }
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
            movieTable += '<td>' + '<a ' + 'onclick = editMovie(' + movie["movieId"] + ')' + ' href="#">' + movie.title + '</a></td>';
            movieTable += '<td>' + movie.genre + '</td>';
            movieTable += '<td>' + movie.director + '</td>';
            movieTable += '</tr>'
        });
        $('#movies').append(movieTable);
    }
    
    function submitEditChanges(e){
        var dict = {
            Title: this["title"].value,
            Genre: this["genre"].value,
            Director: this["director"].value,
            ImageUrl: this["imageUrl"].value,
            Id: this["movieId"].value
        };

        $.ajax({
            url: 'https://localhost:44325/api/movie?id=' + dict.Id,
            dataType: 'text',
            type: 'put',
            contentType: 'application/json',
            data: JSON.stringify(dict),
            success: function () {
                makeTable();
            },
            error: function (jqXhr, textStatus, errorThrown) {
                console.log(errorThrown);
            }
        });
        e.preventDefault();
    }

    function clearForm(){
        var form = document.getElementById("my-form");
        form.reset();
    }

    $(document).ready(makeTable);
    $('#my-form').submit(processForm);
    $('#my-edit-form').submit(submitEditChanges);
})(jQuery); 

function editMovie(id){
    $.get(("https://localhost:44325/api/movie/"+id), function(data){
        changeDetails(data["title"], data["genre"], data["director"], data["imageUrl"], data["movieId"])
    });
}

//This whole function is for the modal functionality
function changeDetails(title, genre, director, image, id){
    var modal = document.getElementById("myModal");
    var span = document.getElementsByClassName("close")[0];
    var closeButton = document.getElementById("closeButton");
    var saveButton = document.getElementById("submitButton");
    var titleInput = document.getElementById("titleInput");
    var genreInput = document.getElementById("genreInput");
    var directorInput = document.getElementById("directorInput");
    var movieImage = document.getElementById("movieImage");
    var imageInput = document.getElementById("imageInput");
    var idInput = document.getElementById("idInput");
    modal.style.display = "block";

    movieImage.src = image;
    idInput.value = id;
    titleInput.value = title;
    genreInput.value = genre;
    directorInput.value = director;
    imageInput.value = image;

    saveButton.onclick = function () {
        modal.style.display = "none";
    }

    span.onclick = function () {
        modal.style.display = "none";
    }

    closeButton.onclick = function () {
        modal.style.display = "none";
    }
}