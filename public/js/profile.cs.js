
let inputIDs = ["#title", "#description", "#dateTime"];

["#title", "#description", "#dateTime"].forEach((input)=>{
  qry(input).value = null;
})


let doTaskSubmitValidation = function() {

  result = true;
  inputIDs.forEach((input)=>{
    let currentInput = qry(input)
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


document.querySelectorAll(".tagInner").forEach((elm)=>{
  elm.addEventListener("click", (event)=>{
    console.log(event)
    if(event.path[1].dataset.istrue == "false") event.path[1].dataset.istrue = "true"; 
    else event.path[1].dataset.istrue = "false";
  })
})

let updateUser = function(data, action) {
  return axios({
    method: 'post',
    url: `/updateUser?action=${action}`,
    data: data,
    redirect: "manual"
    })
}

document.getElementById("submitTask").addEventListener("click", async (event)=>{

  await event.preventDefault();

  if(await doTaskSubmitValidation()) {

  let data = {
    title: qry("#title").value,
    description: qry("#description").value,
    date: qry("#dateTime").value.split("T")[0],
    time: qry("#dateTime").value.split("T")[1],
    tags: getTags()
  }

  updateUser(data, "newtask").then((res)=>{
       if(res.data.error == null && res.status == 200) {
         inputIDs.forEach((input)=>{
          qry(input).value = null;
          qry("p.status").innerText = "Success!";
        })
      }
    });
  }
})  