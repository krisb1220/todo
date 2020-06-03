let TagListInstance = require("./TagListInstance");
let ObjectID = require("mongodb").ObjectID;

module.exports.data = class ToDoInstance {
  constructor(obj) {
    this.title = obj.title;
    this.description = obj.description; 
    this. startDate = obj.date;
    this.time = obj.time;
    this.tags = obj.tags;
    this.isRecurring = false;
    this.deleted = false; 
    this.created = Date.now()
    this.ObjectID = new ObjectID();
    this.nestedInstances ={};
  }
}