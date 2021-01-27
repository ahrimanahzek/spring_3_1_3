$(document).ready(function () {

    function refreshUserTable() {
        $.ajax("/api/users", {
            dataType: "json",
            success: function (msg) {

                let userText = '';

                // заполним таблицу
                msg.forEach(function (el) {
                    userText = userText + '<tr>'
                        + '<td>' + el.id + '</td>'
                        + '<td>' + el.firstName + '</td>'
                        + '<td>' + el.lastName + '</td>'
                        + '<td>' + el.age + '</td>'
                        + '<td>' + el.email + '</td>'
                        + '<td>' + el.rolesString + '</td>'
                        + '<td>' + '<button type="button" data-toggle="modal" id="edit' + el.id + '" name="id" value="' + el.id + '" class="btn btn-info" data-target="#editModal">Edit</button>' + '</td>'
                        + '<td>' + '<button type="button" class="btn btn-danger" id="delete' + el.id + '" name="id" value="' + el.id + '">Delete</button>' + '</td>'
                        + '</tr>';
                })

                // выведем таблицу на страницу
                document.getElementById('tbodyAllUsers').innerHTML = userText;

                // добавим обработчик к каждой кнопке edit в таблице пользователей
                msg.forEach(function (el) {
                    let buttonEdit = document.getElementById("edit" + el.id);

                    function handleButtonEditClick () {
                        //alert("Вы нажали на кнопку " + el.id);

                        $.ajax("/api/users/" + el.id, {
                            method: "GET",
                            data: {id: $(this).attr("value")}, //в rest-контроллер будет передан id=1 (см. value из тэга button выше)
                            dataType: "json",
                                success: function (msg) {
                                    $("#editModalFieldID").attr("value", msg.id);
                                    $("#editModalFieldName").attr("value", msg.firstName);
                                    $("#editModalFieldLastName").attr("value", msg.lastName);
                                    $("#editModalFieldAge").attr("value", msg.age);
                                    $("#editModalEmail").attr("value", msg.email);
                                    $("#editModalPassword").attr("value", msg.password);

                                    // получим все роли и заполним поля option
                                    $.ajax("/api/roles", {
                                        method: "GET",
                                        data: {}, //в rest-контроллер будет передан id=1 (см. value из тэга button выше)
                                        dataType: "json",
                                        success: function (msg) {

                                            let rolesText = '';

                                            msg.forEach(function (el) {
                                                rolesText = rolesText + '<option value="' + el.id + '">'
                                                + el.role + '</option>';
                                            })

                                            document.getElementById('editModalRoles').innerHTML = rolesText;

                                        }

                                    })
                            }
                        })
                    }

                    buttonEdit.onclick = handleButtonEditClick;
                })

                // добавим обработчик к каждой кнопке delete в таблице пользователей
                msg.forEach(function (el) {
                let buttonDelete = document.getElementById("delete" + el.id );

                function handleButtonDeleteClick () {
                    //alert("Вы нажали на кнопку " + el.id);

                    $.ajax("/api/users/" + $(this).attr("value"), {
                        method: "DELETE",
                        data: {id: $(this).attr("value")}, //в rest-контроллер будет передан id=1 (см. value из тэга button выше)
                        dataType: "text",
                        success: function (msg) {
                            refreshUserTable();
/*                            $("#users")
                                .find("#" + msg) //ищем div с id=1
                                .remove();*/
                        }

                    })

                }

                buttonDelete.onclick = handleButtonDeleteClick;
                })

            }
        })
    }

    refreshUserTable();


    let buttonEditFinish = document.getElementById("editFinish");

    function handleButtonDeleteClick () {

/*            let rolesJsonString = "[";
            for (var i=0; i < $('#editModalRoles')[0].options.length; i++)
            {
                if ($('#editModalRoles')[0].options[i].selected) {

                    if(rolesJsonString.length > 1) {
                        rolesJsonString = rolesJsonString + ", "
                    }

                        rolesJsonString = rolesJsonString + "{id: " + $('#editModalRoles')[0].options[i].value
                        + ", role: "+ $('#editModalRoles')[0].options[i].text + "}"

                }
            }
            rolesJsonString = rolesJsonString + "]";*/

        //alert("Вы нажали на кнопку " + el.id);
        let editedUser = {
            id:  $("#editModalFieldID")[0].value,
            firstName: $("#editModalFieldName")[0].value,
            lastName: $("#editModalFieldLastName")[0].value,
            age: $("#editModalFieldAge")[0].value,
            email: $("#editModalEmail")[0].value,
            password: $("#editModalPassword")[0].value,
            roles: []
        };

        for (var i=0; i < $('#editModalRoles')[0].options.length; i++)
        {
            if ($('#editModalRoles')[0].options[i].selected) {

                editedUser["roles"].push({id: $('#editModalRoles')[0].options[i].value, role: $('#editModalRoles')[0].options[i].text})

/*                if(rolesJsonString.length > 1) {
                    rolesJsonString = rolesJsonString + ", "
                }

                rolesJsonString = rolesJsonString + "{id: " + $('#editModalRoles')[0].options[i].value
                    + ", role: "+ $('#editModalRoles')[0].options[i].text + "}"*/

            }
        }

        let jsonUser = JSON.stringify(editedUser);
        let a = 1;
        $.ajax("/api/users/", {
            method: "PUT",
            data: jsonUser, //в rest-контроллер будет передан id=1 (см. value из тэга button выше)
            contentType: 'application/json',
            dataType: "JSON",
            success: function (msg) {
                refreshUserTable();
                /*                            $("#users")
                                                .find("#" + msg) //ищем div с id=1
                                                .remove();*/
              $('#editModal').hide();
            }

        })

    }

    buttonEditFinish.onclick = handleButtonDeleteClick;

    let buttonAddNewUser = document.getElementById("addNewUser");

    function handleButtonAddNewUserClick () {
        //alert("Вы нажали на кнопку " + el.id);

        let newUser = {
            firstName: $("#addUserFirstName")[0].value,
            lastName: $("#addUserLastName")[0].value,
            age: $("#addUserAge")[0].value,
            email: $("#addUserEmail")[0].value,
            password: $("#addUserPassword")[0].value,
            roles: []
        };

        for (var i=0; i < $('#addUserRoles')[0].options.length; i++)
        {
            if ($('#addUserRoles')[0].options[i].selected) {

                newUser["roles"].push({id: $('#addUserRoles')[0].options[i].value, role: $('#addUserRoles')[0].options[i].text})

            }
        }

        let jsonUser = JSON.stringify(newUser);
        let a = 1;
        $.ajax("/api/users/", {
            method: "POST",
            data: jsonUser, //в rest-контроллер будет передан id=1 (см. value из тэга button выше)
            contentType: 'application/json',
            dataType: "JSON",
            success: function (msg) {
                refreshUserTable();
                /*                            $("#users")
                                                .find("#" + msg) //ищем div с id=1
                                                .remove();*/
               // $('#editModal').hide();
            }

        })

    }

    buttonAddNewUser.onclick = handleButtonAddNewUserClick;

   /* var button = getElementById("delete");*/

/*    const buttonDelete = $("#delete");
    buttonDelete.click(
        alert(1)
/!*        function () {
            $.ajax("/api/users", {
                method: "DELETE",
                data: {id: $(this).attr("value")}, //в rest-контроллер будет передан id=1 (см. value из тэга button выше)
                dataType: "text",
                success: function (msg) {
                    $("#users")
                        .find("#" + msg) //ищем div с id=1
                        .remove();

                }
            })
        }*!/
    )*/
})