/**
 * File Name: Database.js
 *
 * Revision History:
 *     Date: Nov. 27.19
 *       Catherine Olejarczyk, Marcus Rodrigues
 */
var db;

function errorHandler(tx, error) {
    console.error("SQL error: " + tx + " (" + error.code + ") : " + error.message);
}

var DB = {
    CreateDatabase: function () {
        var shortName = "AgendaDB";
        var version = "1.0";
        var displayName = "DB for Agenda app";
        var dbSize = 2 * 1024 * 1024;

        console.info("Creating Database ...");
        db = openDatabase(shortName, version, displayName, dbSize, dbCreateSuccess);

        function dbCreateSuccess() {
            console.info("Success: Database created successfully.");
        }
    },
    CreateTables: function () {

        function txFunction(tx) {
            console.info("Creating table: tense...");
            var sqlTense = ("CREATE TABLE IF NOT EXISTS tense("
                + "id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,"
                + "name VARCHAR(20) NOT NULL);");
            var sqlReset = "DROP TABLE IF EXISTS tense";
            var options = [];

            function successCreate() {
                console.info("Success: Create table: tense successful.");
            }
            tx.executeSql(sqlReset, options, successCreate, errorHandler);
            tx.executeSql(sqlTense, options, successCreate, errorHandler);
            tx.executeSql('INSERT INTO tense (id, name) VALUES(1, "Todays Task")');
            tx.executeSql('INSERT INTO tense (id, name) VALUES(2, "Tomorrows Task")');
            tx.executeSql('INSERT INTO tense (id, name) VALUES(3, "Future Task")');

            console.info("Creating table: agenda...");
            var sqlAgenda = ("CREATE TABLE IF NOT EXISTS agenda( "
                + "id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,"
                + "taskTitle VARCHAR(30) NOT NULL,"
                + "hasPriority VARCHAR(3),"
                + "dueDate DATE,"
                + "description VARCHAR(500),"
                + "tenseId INTEGER,"
                + "FOREIGN KEY(tenseId) REFERENCES tense(id));");

            function successCreate() {
                console.info("Success: Create table: agenda successful.");
            }
            tx.executeSql(sqlAgenda, options, successCreate, errorHandler);

        }
        function successTransaction() {
            console.info("Success: Create tables transaction successful");
        }
        db.transaction(txFunction, errorHandler, successTransaction);
    },
    dropTables: function () {
        function txFunction(tx) {
            var sqlDropTense = ('DROP TABLE IF EXISTS tense;');
            var sqlDropAgenda= ('DROP TABLE IF EXISTS agenda;');
            var options = [];

            function successDrop() {
                console.info("Success: tense table dropped successfully");
            }
            tx.executeSql(sqlDropTense, options, successDrop, errorHandler);

            function successDrop() {
                console.info("Success: agenda table dropped successfully");
            }
            tx.executeSql(sqlDropAgenda, options, successDrop, errorHandler);
        }
        function successTransaction() {
            console.info("Success: Drop tables transaction successful");
        }
        db.transaction(txFunction, errorHandler, successTransaction);
    }
};




