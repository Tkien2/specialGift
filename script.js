import { showNotification } from "./notification.js";
import { encryptPassword2, passwordList } from "./encryptPassword.js";
import { runStory } from "./story.js";
/* -----------Theme Mode------------ */
// ----------------Password-------------
document.addEventListener("keydown", (event)=>{
    if(event.key == "F12" || event.ctrlKey && event.shiftKey && event.key == "I"){
        event.preventDefault()
        alert("Eyyy, làm gì đó!")
    }
})
let password
const passwordEnterButton = document.getElementById("enter")
const inputPassword = document.getElementById("inputName")
passwordEnterButton.addEventListener("click", ()=>{
    if (passwordList.includes(encryptPassword2(inputPassword.value))){
        console.log(password)
        password = inputPassword.value
        document.getElementById("typeNameSpace").remove() //xoá nhập pwd
        runStory()
    } else{
        showNotification("Sai mật khẩu!", "fail")
    }
})