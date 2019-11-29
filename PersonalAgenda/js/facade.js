/**
 * File Name: facade
 *
 * Revision History:
 *       Date: Nov. 27.19
 *       Catherine Olejarczyk, Marcus Rodrigues
 */
function updateTenseDropdown() {
    var options = [];

    function callback(tx, results) {
        for (var i = 0; i < results.rows.length; i++) {
            var row = results.rows[i];

            console.info("Id: " + row['id'] +
                " Name: " + row['name']);

            if (row['name'] == "Todays Task") {
                $('#AddTense').append($('<option>', {
                    value: row['id'],
                    text: row['name'],
                    selected: "selected"
                }));
            }
            else {
                $('#AddTense').append($('<option>', {
                    value: row['id'],
                    text: row['name']
                }));
            }
        }
        $('#AddTense').change();
    }
    Tense.selectAll(options, callback);
}
function AddTasks() {
    if (frmAddTask()) {
        var taskTitle = $("#AddTaskTitle").val();
        var hasPriority1 = ($("#add1").prop("checked")) ? '1' : '0'
        var hasPriority2 = ($("#add2").prop("checked")) ? '1' : '0'
        var hasPriority3 = ($("#add3").prop("checked")) ? '1' : '0'  
        var dueDate = $("#AddDate").val();
        var description = $("#AddDescription").val();
        
        var hasPriority;

        if(hasPriority1 != '0'){
            hasPriority = 'Today';
        } else if (hasPriority2 != '0'){
            hasPriority = 'Tomorrow';
        }else {
            hasPriority = 'Future';
        }

        var options = [ taskTitle, hasPriority, dueDate, description];

        function callback() {
            console.info("Success: Record inserted successfully");
            alert("Task has been added");
        }
        Agenda.insert(options, callback);
    } 
    else {
        console.error("Form is not valid")
    }
}

function UpdateTasks() {
    var id = localStorage.getItem("id");
    if (frmEditTask()) {
        var taskTitle = $("#EditTaskTitle").val();
        var hasPriority1 = ($("#edit1").prop("checked")) ? '1' : '0'
        var hasPriority2 = ($("#edit2").prop("checked")) ? '1' : '0'
        var hasPriority3 = ($("#edit3").prop("checked")) ? '1' : '0'
        var dueDate = $("#EditDate").val();
        var description = $("#EditDescription").val();
        
        var hasPriority;

        if(hasPriority1 != '0'){
            hasPriority = 'Today';
        } else if (hasPriority2 != '0'){
            hasPriority = 'Tomorrow';
        }else {
            hasPriority = 'Future';
        }

        var options = [taskTitle, hasPriority, dueDate, description, id];

        function callback() {
            console.info("Success: Record updated successfully");
            alert("Record Updated Successfully.");
            $(location).prop('href', '#ViewTasksPage');
        }
        Agenda.update(options, callback);
    }
    else {
        console.error("Form is not valid")
    }
}
function showAllTasks() {
    var options = [];

    function callback(tx, results) {
        var htmlCode = "";
        for (var i = 0; i < results.rows.length; i++) {
            var row = results.rows[i];

            console.info("Id: " + row['id'] +
                'Task: ' + row["taskTitle"] +
                'Prioritize for: ' + row["hasPriority"] +
                'Date due: ' + row["dueDate"] +
                'Task description: ' + row["description"]);

            htmlCode += "<li><a data-role='button' data-row-id=" + row['id'] + " href='#'>" +
                "<h2 style=color:#66FCF1;font-family:Monospace;>Task: " + row['taskTitle'] + "</h2>" +
                "<p>Prioritize for: " + row['hasPriority'] + "<p>" +
                "<p>Date due: " + row['dueDate'] + "<p>" +
                "<p>Task description: " + row['description'] + "<p>" +
                "</a></li>";
            
        }
        var lv = $("#TaskList");

        lv = lv.html(htmlCode);
        lv.listview("refresh");
        $("#TaskList a").on("click", clickHandler);

        function clickHandler() {
            localStorage.setItem("id", $(this).attr("data-row-id"));
            $(location).prop('href', '#EditTasksPage');
        }
    }
    Agenda.selectAll(options, callback);
}

function showCurrentTasks() {
    var id = localStorage.getItem("id");
    var options = [id];

    function callback(tx, results) {
        var row = results.rows[0];

        console.info("Id: " + row['id'] +
            'Task: ' + row["taskTitle"] +
            'Prioritize for: ' + row["hasPriority"] +
            'Date due: ' + row["dueDate"] +
            'Description: ' + row['description']);

        $("#EditTaskTitle").val(row["taskTitle"]);
            if (row['hasPriority'] == 'true') {
                $("#add1").prop("checked", true);
            }
    
            else if (row['hasPriority'] == 'true') {
                $("#add2").prop("checked", true);
            }
            else {
                $("#add3").prop("checked", true);
            }
        $("#EditDate").val(row["dueDate"]);
        $("#EditDescription").val(row['description']);
    }
    Agenda.select(options, callback);
}
//clear DB
function clearDatabase() {
    var result = confirm("Really want to clear database?");
    if (result) {
        try {
            DB.dropTables();
            alert("Database cleared!");
        } catch (e) {
            alert(e);
        }
    }
}
// delete localstorage
function DeleteTask() {
    var localId = localStorage.getItem("id");
    var options = [localId];

    function callback() {
        console.info("Agenda Deleted Successfully");
        alert("Agenda Deleted.")
        $(location).prop('href', '#ViewTasksPage');
    }
    Agenda.delete(options, callback);
}