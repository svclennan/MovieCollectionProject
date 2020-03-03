(function ($) {
    function processForm(e) {
        var dict = {
<<<<<<< HEAD
            Title : this["title"].value,
=======
            Title: this["title"].value,
>>>>>>> 755c85ed220065292373d1dd01b843a67ed23f70
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
        //convert to using .get instead of .ajax
        $.ajax({
            url: 'https://localhost:44325/api/movie',
            dataType: 'json',
            type: 'get',
            // success: function(data){
            //     $('#movies').html("<tr><td>" + data[0].Title + "</td><td>" + data[0].Genre + "</td><td>" + data[0].Director + "</td></tr>");
            // }
            success: function (data) {
                var list = data == null ? [] : (data instanceof Array ? data : [data]);

                $('#movies tbody').remove();
                var movieTable = "";
                $.each(list, function (index, movie) {
                    movieTable += '<tr>';
                    movieTable += '<td>' + movie.title + '</td>';
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
