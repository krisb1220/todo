let utils = new Globals();

let page = {
  signUpButtonState: 0,
  formValid: {
    true: true
  }
}

page.doFormValidation = function(){
  let formValid = true;
  let queries = [
    ".register > form > div > input[name=email]",
    ".register > form > div > input[name=firstName]",
    ".register > form > div > input[name=lastName]",
    ".register > form > div > input[name=password]",
  ]


  queryies.forEach(element => {
    if(utils.qry(element).value == '') {
      utils.qry(element).style="border: 1px red" 
      page.formValid.true = false;
    }
  });

  formValid ? page.formValid = true : page.formValid = false;

}

document.querySelector("#login-button").addEventListener("click", (event)=>{

    let data = {
      "username": utils.qry("input[name=username]").value,
      "password": utils.qry("input[name=password]").value
    }

    axios({
      method: 'post',
      url: `/login`,
      data: data,
      redirect: "manual"
      }).then((res)=>{
        console.log(res)
        if(res.data.error == "Success!") {
          window.location = "/profile"
        }
      }).catch((error)=>{
        console.log(error)
        utils.qry("p.status.failed").innerText ="Wrong username or password"
      });
});

document.querySelector('#signup-button').addEventListener('click',(event)=>{


  if(page.signUpButtonState == 0){
    page.signUpButtonState = 1;
    document.querySelectorAll(".register > form > div > input").forEach((elm)=>{
        elm.classList.add("inputVisible")
    });

    document.querySelector("#login-page > div > div > div > form").style="display:none;"
    utils.qry(".login-button-container").style = 'display:none;';
    utils.qry("#login-text").innerHTML = "Change your life with Tewdu";
    utils.qry(".login").classList.add("scaleUpAnimation")
    return;
  }

  else if(page.signUpButonState == 1 ) {
    doFormValidation();
  }

  if(page.signUpButtonState == 1) {
    
    let data = {
      email:  utils.qry(".register > form > div > input[name=email").value,
      firstName: utils.qry(".register > form > div > input[name=firstName").value,
      lastName: utils.qry(".register > form > div > input[name=lastName").value,
      password: utils.qry(".register > form > div > input[name=password").value
    }

    axios({
      method: 'post',
      url: `/register`,
      data: data,
      redirect: "manual"
      }).then((res)=>{
        console.log(res)
        if(res.data.error == "Success!") {
          window.location = "/"
        } else {
          utils.qry("p.status.failed").innerText = res.data.error
        }
      }).catch((error)=>{
        console.log(error)
        utils.qry("p.status.failed").innerText = "An unknown error occured"
      });
    }
})

