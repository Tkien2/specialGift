import { smoothTrans, isDarkModeOn, themeLock, changeTheme, changeBackgroundColor, pinkMode, blueMode, redMode, greenMode } from "./theme.js";
import { name, passwordListIndex } from "./script.js";
import { passwordList } from "./encryptPassword.js";
let messageID = 0
// Đm xử lí bất đồng bộ, ghét vc
function getRespondFile(fileName, targetID){
    return fetch(fileName)
        .then(response => response.text())
        .then(html => {
            document.getElementById(targetID).innerHTML += html;
            return document.getElementById("newMessage")
        })
        .catch(error => console.error('Lỗi khi tải file HTML:', error));
}
async function sendMessage(content, user){
    return new Promise((resolve, reject)=>{
        resolve(getRespondFile(`respond${user}.html`, "main"))
    })
    .then((mess)=>{
        return new Promise((resolve, reject)=>{
            if(themeLock == false){
                changeTheme()
            } else{
                blueMode()
            }
            if(user == "User"){
                const userName = document.getElementById("newUserName")
                userName.innerHTML = name
                userName.removeAttribute("id")
            }
            messageID++
            const message = mess
            message.innerHTML = content
            mess.id = messageID
            main.scrollTo(0, main.scrollHeight)
            resolve(userRespond)
        })
    })
}
// Sửa lôi bất đồng bộ mất 2 tiếng. Đm
let userRespond
let noUserRespond
const choices = [document.getElementById("choice1"), document.getElementById("choice2")]
for (let i=0; i<choices.length; i++){
    choices[i].addEventListener("click", (event)=>{
        hideChoices()
        userRespond = choices[i].innerHTML
        noUserRespond = choices[i].id
        sendMessage(event.target.innerHTML, "User")
        mainStory()
    })
}
/* ------------------- */
function hideChoices(){
    for (let i=0; i<choices.length; i++){
        choices[i].style.display = "none"
    }
}
function showChoices(firstChoice, secondChoice){
    for (let i=0; i<choices.length; i++){
        choices[i].style.display = "block"
    }
    choices[0].innerHTML = firstChoice
    choices[1].innerHTML = secondChoice
}
async function Tkien2Respond(time, message, firstChoice, secondChoice){
    return new Promise((resolve)=>{
        setTimeout(()=>{
            sendMessage(message, "Tkien2")
            resolve(time)
        }, time)
    })
    .then((time)=>{
        return new Promise((resolve)=>{
            setTimeout(()=>{
                showChoices(firstChoice,secondChoice)
                resolve()
            }, time-200)
        })
    })
}
const respondsList = [
    ["Huh?", "Gì đây?"], // 0
    ["Cái gì?","Hả?"], // 1
    ["Umm... oke?", "Là sao?"], // 2
    ["Oh...","Nhưng mà là cái gì mới được?"], //3
    ["???", "Chỉ vậy thôi hả?"], //4
    ["À...", "?"], //5
]
function mainStory(){
    if(userRespond == respondsList[0][0] || userRespond == respondsList[0][1]){ //luôn đúng
        Tkien2Respond(1700, "Tui có cái này nè", respondsList[1][0], respondsList[1][1])
    } 
    else if (userRespond == respondsList[1][0]){
        Tkien2Respond(1500, "Đợi tí nha...", respondsList[2][0], respondsList[2][1])
    } else if (userRespond == respondsList[1][1]){
        Tkien2Respond(1600, "Từ từ... đợi tí", respondsList[2][0], respondsList[2][1])
    } 
    else if (userRespond == respondsList[2][0]){ //um oke
        Tkien2Respond(2000, "Hehe... Không phải ai cũng được tui gửi cái này đâu", respondsList[3][0], respondsList[3][1])
    } else if (userRespond == respondsList[2][1]){ // la sao
        Tkien2Respond(1700, "Bình tĩnh... chuẩn bị cái, nhưng mà nói trước là bà may mắn á", respondsList[3][0], respondsList[3][1])
    } 
    else if(userRespond == respondsList[3][0] || userRespond == respondsList[3][1]){ //luôn đúng
        Tkien2Respond(2000, "Đổi nền nè", respondsList[4][0], respondsList[4][1])
        setTimeout(blueMode, 1000)
    }
    else if(userRespond == respondsList[4][0] || userRespond == respondsList[4][1]){ //luôn đúng
        Tkien2Respond(2100, "Bà thừa biết hôm nay là ngày gì mà...", respondsList[5][0], respondsList[5][1])
    }
    else if(userRespond == respondsList[5][0] || userRespond == respondsList[5][1]){ //luôn đúng
        setTimeout(surprisePart,2500)
    }
}
// Éo bt sao mình code được hội thoại, hay vc =))
const LoveForNothing = document.getElementById("LoveForNothing") //nhạc mất 3 tiếng làm :)
const TheMemoryOfYou = document.getElementById("TheMemoryOfYou")
const body = document.getElementById("body")
export async function runStory(){
    LoveForNothing.play()
    hideChoices()
    Tkien2Respond(2000, `${name} nè đúng không?`, respondsList[0][0], respondsList[0][1])
}
/* -----------The Memory Of You----------- */
// tới lúc xử lí callback hell rồi
function delay(ms){
    return new Promise((resolve)=>{
        setTimeout(resolve,ms)
    })
}
export async function surprisePart(){
    const main = document.getElementById("main")
    const bottomBar = document.getElementById("bottomBar")
    changeBackgroundColor("darkGray2")
    bottomBar.remove()
    main.remove()
    smoothTrans()
    LoveForNothing.pause()
    await delay(1300) //callback hell tuổi lo-...
    TheMemoryOfYou.play()
    TheMemoryOfYou.volume = 0.5
    await delay(2000)
    changeBackgroundColor("redGray")
    await delay(1000)
    await showListOfBigMessage(["Tui", "Quý", "Bà", "Lắm", "Á", name], 600)
    await delay(1000)
    changeBackgroundColor("darkGray2")
    await delay(2000)
    document.getElementById("bigMessage").remove()
    showCard()

}
function bodyFlex(){
    body.style.display = "flex"
    body.style.alignItems = "center"
    body.style.justifyContent="center"
}
function showBigMessage(message){
    bodyFlex()
    if(document.getElementById("bigMessage") != null){
        document.getElementById("bigMessage").remove()
    }
    const messageElement = document.createElement("h1")
    messageElement.id = "bigMessage"
    messageElement.innerHTML = message
    body.appendChild(messageElement)
}
function showListOfBigMessage(messageList, time){
    return new Promise((resolve)=>{
        for(let i = 0; i < messageList.length; i++){
            setTimeout(()=>{
                showBigMessage(messageList[i])
                if(i == messageList.length - 1){
                    resolve()
                }
            },((i+1)*time))
        }
    })
}
function showCard(){
    const card = document.getElementById("card")
    document.getElementById("cardBox").style.display = "flex"
    card.classList.add("appear")
    card.style.background = `var(--${passwordList[passwordListIndex].color}Gradient)`
    document.getElementById("cardMessage").innerHTML = passwordList[passwordListIndex].content
    console.log(passwordList[passwordListIndex].color)
}