
let inputIDs = ["#title", "#description", "#dateTime"];

["#title", "#description", "#dateTime"].forEach((input)=>{
  qry(input).value = null;
})


let doChecks = function() {

  result = true;
  inputIDs.forEach((input)=>{
    let currentInput = qry(input)
    if (currentInput.value == '') {
      result=false;
      currentInput.style = "background:#f05"; 
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
  for(a in qry("div.tags").children){
      current = qry("div.tags").children[a]
      console.log(current.checked)
      if(current.checked == true) {
        hasTags = true;
        checked.push(current.name);
      }
    };
  result = hasTags ? checked :  ["Task"];
  return result;

}



document.getElementById("submitTask").addEventListener("click", async (event)=>{

  await event.preventDefault();

  if(await doChecks()) {

  let data = {
    title: qry("#title").value,
    description: qry("#description").value,
    date: qry("#dateTime").value.split("T")[0],
    time: qry("#dateTime").value.split("T")[1],
    tags: getTags()
  }
  


  axios({
    method: 'post',
    url: '/addNewTask',
    data: data,
    redirect: "manual"
    }).then((res)=>{
       if(res.data.error == null && res.status == 200) {
         inputIDs.forEach((input)=>{
          qry(input).value = null;
          qry("p.status").innerText = "Success!";
        })
      }
      
    }
    );
  }
})  