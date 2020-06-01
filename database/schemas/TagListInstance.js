module.exports.data = class TagListInstance {
  
  constructor(){
    
    this.tags = {
        goal: {
          color: "#2F80ED",
          name: "Goal"
        }, 
        reminder: {
          color: "#F2994A", 
          name: "Reminder"
        }, 
        issue: {
          color: "#EB5757",
          name: "Issue"
        }
    }
  }

  addNewTag(name, color) {
    this.tags[name] = {
      name: name, 
      color: color
    }
  }

  removeTag(tag) {
    delete this.tags[name];
  }

}