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
            // success: function(data){
            //     $('#movies').html("<tr><td>" + data[0].Title + "</td><td>" + data[0].Genre + "</td><td>" + data[0].Director + "</td></tr>");
            // }
            success: function (data) {
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
<<<<<<< HEAD
                    movieTable += '<td>' + '<a type = "button" class = "btn" title "" data-container = "body" data-toggle="popover" data-placement="right" data-content="<form id="edit-form"><input type="text" name="title" placeholder="'+ movie.Title +'"/><input type="text" name="genre" placeholder="'+ movie.Genre +'" /><input type="text" name="director" placeholder="'+ movie.Director +'" /><button type="submit">Submit</button></form>" data-original-title = "Edit"' + movie.title + '</td>';
=======
                    movieTable += '<td>' + '<a href="#" id="myBtn">' + movie.title + '</a>' + '</td>';
>>>>>>> 35f3d6bcf5e6ae45b2a87620cb7d62b7b575af70
                    movieTable += '<td>' + movie.genre + '</td>';
                    movieTable += '<td>' + movie.director + '</td>';
                    movieTable += '</tr>'
                });
                $('#movies').append(movieTable);
            }
        })
    }
    $(document).ready(makeTable);
    $('#my-form').submit(processForm);
    $('#my-form').submit(makeTable);
})(jQuery); 
