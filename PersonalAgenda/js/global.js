/**
 * File Name: global
 *
 * Revision History:
 *       Date: Nov. 27.19
 *       Catherine Olejarczyk, Marcus Rodrigues
 */
function btnSubmit_click() {
	AddTasks();
}
function btnClearDB_click() {
	clearDatabase();
}
function btnDelete_click() {
	DeleteTask();
}
function ViewTasksPage_show(){
    showAllTasks();
}
function btnUpdate_click() {
	UpdateTasks();
}
function EditTasksPage_show() {
	showCurrentTasks();
}
function TasksPage_show() {
	updateTenseDropdown();
}

function init(){
    $("#btnSubmit").on("click", btnSubmit_click);
	$("#btnClearDB").on("click", btnClearDB_click);
    $("#btnDelete").on("click", btnDelete_click);
    $("#btnUpdate").on("click", btnUpdate_click);

    $("#EditTasksPage").on("pageshow", EditTasksPage_show);
    $("#ViewTasksPage").on("pageshow", ViewTasksPage_show);
	$("#TasksPage").on("pageshow", TasksPage_show);
}
function initDB() {
	try {
		DB.CreateDatabase();
		if (db) {
			console.info("Creating Tables...");
			DB.CreateTables();
		}
		else {
			console.error("Error: Cannot create tables: Database does not exist!");
		}
	} catch (e) {
		console.error("Error: (Fatal) Error in initDB(). Can not proceed.");
	}
}

$(document).ready(function () {
	init();
	initDB();	
});