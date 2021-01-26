$(document).ready(function () {

    function refreshUserTable() {
        $.ajax("/api/users", {
            dataType: "json",
            success: function (msg) {
                let userText = '';
                msg.forEach(function (el) {
                    userText = userText + '<tr>'
                        + '<td>' + el.id + '</td>'
                        + '<td>' + el.firstName + '</td>'
                        + '<td>' + el.lastName + '</td>'
                        + '<td>' + el.age + '</td>'
                        + '<td>' + el.email + '</td>'
                        + '<td>' + el.rolesString + '</td>'
                        + '</tr>';

                })
                document.getElementById('tbodyAllUsers').innerHTML = userText;
            }
        })
    }

    refreshUserTable();
})