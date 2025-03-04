import { showNotification } from "./notification.js";
import { encryptPassword2, passwordList } from "./encryptPassword.js";
import { runStory, surprisePart } from "./story.js";
document.addEventListener("keydown", (event)=>{
    if(event.key == "F12" || event.ctrlKey && event.shiftKey && event.key == "I"){
        event.preventDefault()
        alert("Eyyy, làm gì đó!")
    }
})
let password
export let name
const passwordEnterButton = document.getElementById("enter")
const inputPassword = document.getElementById("inputName")
passwordEnterButton.addEventListener("click", ()=>{
    if (passwordList.includes(encryptPassword2(inputPassword.value))){
        password = inputPassword.value
        setName(password)
        document.getElementById("typeNameSpace").remove() //xoá nhập pwd
        runStory()
        if(encryptPassword2(password) == passwordList[0]){
            showNotification(`Chào ${name} nha`, "success")
        } else if(encryptPassword2(password) == passwordList[1]){
            showNotification(`Chào ${name} nha`, "success")
        }
    } else{
        showNotification("Sai mật khẩu!", "fail")
    }
})
function setName(password){
    if(encryptPassword2(password) == passwordList[0]){
        name = "Thư"
    } else if(encryptPassword2(password) == passwordList[1]){
        name = "Trang"
    }
}