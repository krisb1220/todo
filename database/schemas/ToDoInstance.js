let TagListInstance = require("./TagListInstance");
let ObjectID = require("mongodb").ObjectID;

module.exports.data = class ToDoInstance {
  constructor(obj) {
    this.title = obj.title;
    this.dateSplit = obj.date.split("-");
    this.timeSplit = obj.time.split(":");
    this.UTC = Date.UTC(this.dateSplit[0], (this.dateSplit[1]-1), this.dateSplit[2], this.timeSplit[0], this.timeSplit[1]);
    this.description = obj.description; 
    this. startDate = obj.date;
    this.time = obj.time;
    this.tags = obj.tags;
    this.isRecurring = false;
    this.isCompleted = false;
    this.deleted = false; 
    this.created = Date.now()
    this.ObjectID = new ObjectID();
    this.nestedInstances ={};
  }
}