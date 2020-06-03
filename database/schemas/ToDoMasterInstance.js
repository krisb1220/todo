let TagListInstance = require("./TagListInstance").data;


exports.data = class ToDoMasterInstance {
  constructor(){
    this.bin = {};
    this.createdOn = new Date();
    this.tasks = {}
    this.tags = new TagListInstance;
  }
}