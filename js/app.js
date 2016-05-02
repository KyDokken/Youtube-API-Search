$(document).ready(function () {
    $('#search').hide();
    $('#startedbutton').show();
    $('#startedbutton').on('click', function () {
        $('#startedbutton').hide();
        $('#search').show();

    });
});
// Search submit

$("#search").submit(function (event) {
    event.preventDefault();
    getRequest($("#query").val());
});
// Get request

function getRequest(searchVal) {
    var params = {
        part: 'snippet',
        key: 'AIzaSyAs5XDLNeRTEWyLqFQruIndaekyLF53rEw',
        q: searchVal
    };

    var result = $.ajax({
            /* update API end point */
            url: "https://www.googleapis.com/youtube/v3/search",
            data: params,
            dataType: "jsonp",
            /*set the call type GET / POST*/
            type: "GET"
        })
        /* if the call is successful (status 200 OK) show results */
        .done(function (result) {
            /* if the results are meeningful, we can just console.log them */
            console.log(result);
            displayResults(result.items);
        })

    /* if the call is NOT successful show errors */ //jqXHR= Status ofther server error=message from server to me errorthrown=You to the server.
    .fail(function (jqXHR, error, errorThrown) {
        console.log(jqXHR);
        console.log(error);
        console.log(errorThrown);
    });
}

function displayResults(videos) {
    var HTMLoutput = "";
    $.each(videos, function (index, video) {
        HTMLoutput += "<li><p>" + video.snippet.title + "</p><a href='https://www.youtube.com/watch?v=" + video.id.videoId + "' target='_blank'><img src='" + video.snippet.thumbnails.high.url + "'/></a></li>";
    });

    //use the HTML output to show it in the index.html
    $("#searchresults").html(HTMLoutput);
};
