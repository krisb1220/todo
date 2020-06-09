
  let utils = new Globals();

  utils.page = {
    signUpButtonState: 0,
    formValid: {
      true: true
    }
  }

  utils.doLoginAnimation = function(){
    utils.qry("#login-button").innerText = "Signing in....";
    utils.qry("#login-button").style.background = "#999";
    utils.qry(".login").classList.add("upOffScreenAnimation");
  }

  utils.hideLoginInputs = function(){
    document.querySelector("#login-page > div > div > div > form").style="display:none;"
    utils.qry(".login-button-container").style = 'display:none;';
    utils.qry("#login-text").innerHTML = "Change your life with Tewdu";
    utils.qry(".login").classList.add("scaleDownUpAnimation")
  }

  utils.buildRegistrationObject = function(){
    return {
      email:  utils.qry(".register > form > div > input[name=email").value,
      firstName: utils.qry(".register > form > div > input[name=firstName").value,
      lastName: utils.qry(".register > form > div > input[name=lastName").value,
      password: utils.qry(".register > form > div > input[name=password").value
    }
  }

  utils.buildLoginObject = function(){
    return 
  }

  utils.doSecondSignUpAnimation = function(){
    utils.qry("#signup-button").innerText = "Signing up....";
    utils.qry("#signup-button").style.background = "#999";
    utils.qry(".login").classList.add("upOffScreenAnimation")
  }

document.querySelector("#login-button").addEventListener("click", (event)=>{

    let loginData = {
      "username": utils.qry("input[name=username]").value,
      "password": utils.qry("input[name=password]").value
    }

    console.log(loginData)
    axios({
      url:"/login", 
      method: "post",
      data: loginData, 
      redirect:"manual"})
    .then((res)=>{
      console.log(res.data);
        if(res.data) {
          utils.doLoginAnimation();
          setTimeout(()=>{window.location = "/profile";}, 1000)
        }
      })
    .catch((error)=>{
      console.log(error)
      utils.qry("p.status.failed").innerText ="Wrong username or password"
    });
});

document.querySelector('#signup-button').addEventListener('click',(event)=>{


  if(utils.page.signUpButtonState == 0){
    utils.page.signUpButtonState = 1;
    document.querySelectorAll(".register > form > div > input").forEach((elm)=>{
        elm.classList.add("inputVisible")
    });
    utils.hideLoginInputs()
    return;
  }

  if(utils.page.signUpButtonState == 1) {
    
    utils.registrationData = utils.buildRegistrationObject();
    utils.post('/register', utils.registrationData, "manual")
    .then((res)=>{
        if(res.data.error == "Success!") {
          utils.page.signUpButtonState = 2;
          } else {
              utils.qry("p.status.failed").innerText = res.data.error
          }
    })
    .then(()=>{
      utils.doSecondSignUpAnimation()
      setTimeout(()=>{window.location = "/"; }, 2000) 
    })
    .catch((error)=>{
          console.log(error)
          utils.qry("p.status.failed").innerText = "An unknown error occured"
        });
      }
    });
  

   
