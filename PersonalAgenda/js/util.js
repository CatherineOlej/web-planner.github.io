/**
 * File Name: COUtil.js
 * Final Project for programming mobile apps
 * Revision History:
 *       Catherine Olejarczyk
 */
function frmAddTask(){
    var form = $("#AddTask");
    form.validate({
        rules: {
            AddTaskTitle: {
                required: true,
                rangelength: [2, 30]
            },
            AddDate: {
                required: true
            }
        },
        messages: {
            AddTaskTitle: {
                required: "Must specify Task",
                rangelength: "Length must be 2-30 characters long"
            },
            AddDate: {
                required: "Date of registry is required"
            }
        }
    });
    return form.valid();
};

function frmEditTask(){
    var form = $("#EditTask");
    form.validate({
        rules: {
            EditTaskTitle: {
                required: true,
                rangelength: [2, 30]
            },
            EditDate: {
                required: true
            }
        },
        messages: {
            EditTaskTitle: {
                required: "Must specify Name",
                rangelength: "Length must be 2-30 characters long"
            },
            EditDate: {
                required: "Date of registry is required"
            }
        }
    });
    return form.valid();
};
