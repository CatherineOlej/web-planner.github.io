/**
 * File Name: agendaDAL
 *
 * Revision History:
 *       Date: Nov. 27.19
 *       Catherine Olejarczyk, Marcus Rodrigues
 */
//CRUD functions for tables
//CRUD today's tomorrow's or future task tense
var Tense = {
    selectAll: function (options, callback) {
        function txFunction(tx){
           var sql = "SELECT * FROM tense;";
           tx.executeSql(sql, options, callback, errorHandler);
        }
        function successTransaction() {
            console.info("Success: Select All transaction successful");
        }
        db.transaction(txFunction, errorHandler, successTransaction);
    }
}
//CRUD AGENDA 
var Agenda = {
    insert: function (options, callback) {
        function txFunction(tx) {
            var sql = "INSERT INTO agenda (taskTitle, hasPriority, dueDate, description) VALUES(?,?,?,?);";
            tx.executeSql(sql, options, callback, errorHandler);
        }

        function successTransaction() {
            console.info("Success: Insert transaction successful");
        }
        db.transaction(txFunction, errorHandler, successTransaction); 
    },
    update: function (options, callback) {
        function txFunction(tx) {
            var sql = "UPDATE agenda SET  taskTitle=?, hasPriority=?, dueDate=?, description=? WHERE id=?;";
            tx.executeSql(sql, options, callback, errorHandler);
        }
        function successTransaction() {
            console.info("Success: Update transaction successful");
        }
        db.transaction(txFunction, errorHandler, successTransaction);   
    },
    delete: function (options, callback){
        function txFunction(tx) {
            var sql = "DELETE FROM agenda WHERE id=?;";
            tx.executeSql(sql, options, callback, errorHandler);
        }
        function successTransaction() {
            console.info("Success: Delete transaction successful");
        }
        db.transaction(txFunction, errorHandler, successTransaction);
    },
    select:function (options, callback) {
        function txFunction(tx) {
            var sql = "SELECT * FROM agenda WHERE id=?;";
            tx.executeSql(sql, options, callback, errorHandler);
        }
        function successTransaction() {
            console.info("Success: Select transaction successful");
        }
        db.transaction(txFunction, errorHandler, successTransaction);
    },
    selectAll: function (options, callback){
        function txFunction(tx) {
            var sql = "SELECT * FROM agenda;";
            tx.executeSql(sql, options, callback, errorHandler);
        }
        function successTransaction() {
            console.info("Success: Select All transaction successful");
        }
        db.transaction(txFunction, errorHandler, successTransaction);
    }
    
};