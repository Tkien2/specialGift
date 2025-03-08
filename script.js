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
export let passwordListIndex
export let name = ""
const passwordEnterButton = document.getElementById("enter")
const inputPassword = document.getElementById("inputName")
passwordEnterButton.addEventListener("click", async ()=>{
    if (passwordList.some((element) => {return element.pass === encryptPassword2(inputPassword.value)})){
        password = inputPassword.value
        await setName(password)
        document.getElementById("typeNameSpace").remove() //xoá nhập pwd
        runStory()
        showNotification(`Xin chào ${passwordList[passwordListIndex].name}`, "success")
    } else{
        showNotification("Sai mật khẩu!", "fail")
    }
})
function setName(password){
    return new Promise((resolve, reject)=>{
        let isStop = false
        let i = 0
        while(!isStop){
            if(i<passwordList.length){
                if(passwordList[i].pass == encryptPassword2(password)){
                    name = passwordList[i].name
                    passwordListIndex = i
                }
            }else{
                isStop = true
                resolve()
            }
            i++
        }
    })
}