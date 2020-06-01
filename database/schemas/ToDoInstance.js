let TagListInstance = require("./TagListInstance");


module.exports.data = class ToDoInstance {
  constructor(name, description, startDate, endDate, tags, isRecurring) {
    this.name = name;
    this.description = description; 
    this. startDate = startDate;
    this.endDate = endDate;
    this.tags = {};
    this.isRecurring = isRecurring;
    this.deleted = false; 
  }
}