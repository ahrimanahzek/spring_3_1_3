$(document).ready(function () {

    function refreshUserTable() {
        $.ajax("/api/users", {
            dataType: "json",
            success: function (msg) {

                // сначала сформируем таблицу в виде строки текста затем этот текст вставим непосредственно в страницу
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

                    // при открытии модальной формы редактирования заполняем ее поля
                    function handleButtonEditClick () {

                        $.ajax("/api/users/" + el.id, {
                            method: "GET",
                            data: {id: $(this).attr("value")},
                            dataType: "json",
                                success: function (msg) {
                                    $("#editModalFieldID").attr("value", msg.id);
                                    $("#editModalFieldName").attr("value", msg.firstName);
                                    $("#editModalFieldLastName").attr("value", msg.lastName);
                                    $("#editModalFieldAge").attr("value", msg.age);
                                    $("#editModalEmail").attr("value", msg.email);
                                    $("#editModalPassword").attr("value", msg.password);

                                    // получим все роли из базы и выведем их в поля option
                                    $.ajax("/api/roles", {
                                        method: "GET",
                                        data: {},
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

                    $.ajax("/api/users/" + $(this).attr("value"), {
                        method: "DELETE",
                        data: {id: $(this).attr("value")},
                        dataType: "text",
                        success: function (msg) {
                            refreshUserTable();
                        }

                    })

                }

                buttonDelete.onclick = handleButtonDeleteClick;
                })

            }
        })
    }

    // ВЫВОДИМ ТАБЛИЦУ НА ФОРМУ
    refreshUserTable();

    // КНОПКА EDIT В МОДАЛЬНОЙ ФОРМЕ РЕДАКТИРОВАНИЯ ПОЛЬЗОВАТЕЛЯ
    let buttonEditFinish = document.getElementById("editFinish");

    function handleButtonDeleteClick () {


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

            }
        }

        let jsonUser = JSON.stringify(editedUser);
        let a = 1;
        $.ajax("/api/users/", {
            method: "PUT",
            data: jsonUser,
            contentType: 'application/json',
            dataType: "JSON",
            success: function (msg) {
                refreshUserTable();

                // скроем модальную форму если все прошло успешно
              $('#editModal').hide();
            }

        })

    }

    // КНОПКА ДОБАВЛЕНИЯ НОВОГО ПОЛЬЗОВАТЕЛЯ
    buttonEditFinish.onclick = handleButtonDeleteClick;

    let buttonAddNewUser = document.getElementById("addNewUser");

    function handleButtonAddNewUserClick () {

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

        $.ajax("/api/users/", {
            method: "POST",
            data: JSON.stringify(newUser),
            contentType: 'application/json',
            dataType: "JSON",
            success: function (msg) {
                refreshUserTable();
            }

        })

    }

    buttonAddNewUser.onclick = handleButtonAddNewUserClick;

})