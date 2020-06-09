let utils = new Globals();

  /*======================================
  # New Task Helpers #
  ======================================*/

document.querySelectorAll('form').forEach((element)=>{

  element.addEventListener('submit', (event)=>{
    event.preventDefault();
  })

})

let taskInputIDs = ["#title", "#description", "#dateTime"];

["#title", "#description", "#dateTime"].forEach((input)=>{
  utils.qry(input).value = null;
}) 

let doTaskSubmitValidation = function() {
  result = true;
 taskInputIDs.forEach((input)=>{
    let currentInput = utils.qry(input)
    if (currentInput.value == '') {
      result=false;
      currentInput.style = "background:rgba(255,0,0,0.2)"; 
      currentInput.addEventListener("click", ()=>{
        currentInput.style="background:#fff"
      })
    }
  })
  return result;
}

let buildTaskObject = function(){
  return {
    title: utils.qry("#title").value,
    description: utils.qry("#description").value,
    date: utils.qry("#dateTime").value.split("T")[0],
    time: utils.qry("#dateTime").value.split("T")[1],
    tags: getTags()
  }
}

let getTags = function() {
  
  let checked = [];
  let hasTags = false;
  let result;
  for(var i = 0; i <= document.querySelectorAll("#displayTags > .tagInner").length-1; i++){
      current =  document.querySelectorAll("#displayTags > .tagInner")[i]
      if(current.dataset.istrue == "true") {
        console.log("true")
        hasTags = true;
        checked.push(current.dataset.tagname);
      }
    };
  result = hasTags ? checked :  ["Task"];
  return result;

}

var resetTaskInput = function(res) {
  if(res.data.error == "Success!" && res.status == 200) {
  utils.qry("p.new-task-status").innerText = res.data.error;
  utils.qry("p.new-task-status").classList.remove("failed")
  utils.qry("p.new-task-status").classList.add("success")
   taskInputIDs.forEach((input)=>{
     utils.qry(input).value = null;
   })
 } else {
  utils.qry("p.new-task-status").innerText = res.data.error;
  utils.qry("p.new-task-status").classList.remove("success")
  utils.qry("p.new-task-status").classList.add("failed")
 }
}



document.querySelectorAll(".tagInner").forEach((elm)=>{
  elm.addEventListener("click", (event)=>{
    console.log(event)
    if(event.path[1].dataset.istrue == "false") event.path[1].dataset.istrue = "true"; 
    else event.path[1].dataset.istrue = "false";
  })
})

/*======================================
# Add new tag helpers #
======================================*/

let newTagInputIDs = ["#addCustomTagsName", "#addCustomTagsColor"]

var resetTagInput = function(res) {
  if(res.data.error == "Success!" && res.status == 200) {
    let name = utils.qry("#addCustomTagsName").value;
    let color = utils.qry("#addCustomTagsColor").value;
    utils.qry("p.new-tag-status").innerText = res.data.error;
    utils.qry("p.new-tag-status").classList.remove("failed")
    utils.qry("p.new-tag-status").classList.add("success")
    utils.qry("#displayTags").innerHTML += `
    <div class="tagInner" name=${name} data-tagname=${name} data-isTrue="true" id=${name}>
    <span class="tagColor" style="background:${color}">
    <p>${name}</p>
    </div>
    `
    newTagInputIDs.forEach((input)=>{
     utils.qry(input).value = null;
   })
 } else {
  utils.qry("p.new-tag-status").innerText = res.data.error;
  utils.qry("p.new-tag-status").classList.remove("success")
  utils.qry("p.new-tag-status").classList.add("failed")
 }
}


/*Listeners*/
utils.qry("#submitTask").addEventListener("click", async (event)=>{
  event.preventDefault(); //Prevent button from posting
  let data = buildTaskObject(); //Build data to using for ToDoInstance on server
  if(doTaskSubmitValidation()) { //Ensure no data is missing from the inputs
  utils.postToUpdateUser(data, "newtask").then((res)=>{ //Post data to /postToUpdateUser?action=newtask (returns axios() instance)
      resetTaskInput(res); //clear tasks
    });
  }
})  

document.querySelector('#addCustomTagsName').addEventListener('keydown',(event)=>{
  // event.preventDefault()
  if(event.code == "Enter") {
    
    let data = {
      name: utils.qry("#addCustomTagsName").value,
      color: utils.qry("#addCustomTagsColor").value
    }


    utils.postToUpdateUser(data, "newtag").then((res)=>{ //Post data to /postToUpdateUser?action=newtask (returns axios() instance)
      console.log(res);
      resetTagInput(res); //clear tag input
    });
  }
})