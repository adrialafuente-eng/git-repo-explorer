$(document).ready(function () {
    $("#searchForm").on("submit", function (e) {
        e.preventDefault();
        const user = $("#username").val().trim();
        $("#error").addClass("d-none");

        $.get("https://api.github.com/users/" + user + "/repos")
            .done(function (repos) {

                let html = '<table class="table table-striped table-bordered bg-white">' +
                    '<thead class="table-dark"><tr><th>Nombre</th><th>Descripción</th><th>Followers (stars)</th></tr></thead><tbody>';

                $.each(repos, function (i, repo) {
                    html += "<tr>" +
                        "<td><a href='" + repo.html_url + "' target='_blank'>" + repo.name + "</a></td>" +
                        "<td>" + (repo.description || "Sin descripción") + "</td>" +
                        "<td>" + repo.stargazers_count + "</td>" +
                        "</tr>";
                });

                html += "</tbody></table>";
                $("#resultado").html(html);
            })
            .fail(function (xhr) {
                $("#error").text("Error " + xhr.status).removeClass("d-none");
                $("#resultado").empty();
            });
    });
});