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
function smoothTrans(){
    let all = document.querySelectorAll("body, #main, #bottomBar")
    for (let i = 0; i < all.length; i++){
        all[i].classList.add("smoothTransition")
    }
}
respondsList = [
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
        setTimeout(surprisePart,1700)
    }
}
// Éo bt sao mình code được hội thoại, hay vc =))
const LoveForNothing = document.getElementById("LoveForNothing") //nhạc mất 3 tiếng làm :)
const TheMemoryOfYou = document.getElementById("TheMemoryOfYou")
const body = document.getElementById("body")
async function runStory(){
    LoveForNothing.play()
    hideChoices()
    Tkien2Respond(2000, "Chào bạn", respondsList[0][0], respondsList[0][1])
}
/* -----------The Memory Of You----------- */
function surprisePart(){
    smoothTrans()
    LoveForNothing.pause()
    setTimeout(()=>{
        TheMemoryOfYou.play()
        TheMemoryOfYou.volume = 0.5
        setTimeout(()=>{ //đm callback hell hay gì. Đuma bất đồng bộ
            changeBackgroundColor("redGray")
            setTimeout(()=>{
                showListOfBigMessage(["Tui", "Thấy", "Rất", "Lmao"], 600)
                setTimeout(()=>{

                },1000)
            },1000)
        },3000)
    },1300)
    
    const main = document.getElementById("main")
    const bottomBar = document.getElementById("bottomBar")
    changeBackgroundColor("darkGray2")
    bottomBar.remove()
    main.remove()
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
    for(let i = 0; i < messageList.length; i++){
        setTimeout(()=>{
            showBigMessage(messageList[i])
        },((i+1)*time))
    }
}
/* -----------Theme Mode------------ */
let isDarkModeOn = false
let themeLock = false
const themeIcon = document.getElementById("themeIcon")
function darkMode(){
    let lightModeElements = document.querySelectorAll(".lightMode, .lightModeGray, .lightModeGray2, .lightModeGray2Color")
    for (let i = 0; i < lightModeElements.length; i++){
        lightModeElements[i].className = lightModeElements[i].className.replace("light", "dark")
    }
    document.getElementById("body").style.backgroundColor="var(--darkGray2)"
}
function lightMode(){
    let darkModeElements = document.querySelectorAll(".darkMode, .darkModeGray, .darkModeGray2, .darkModeGray2Color")    
    for (let i = 0; i < darkModeElements.length; i++){
        darkModeElements[i].className = darkModeElements[i].className.replace("dark", "light")
    }    
    document.getElementById("body").style.backgroundColor="var(--light)"
}
function pickcolorMode(color){ //one time function
    smoothTrans()
    let darkModeElements = document.querySelectorAll(".darkMode, .darkModeGray, .darkModeGray2, .darkModeGray2Color")
    let lightModeElements = document.querySelectorAll(".lightMode, .lightModeGray, .lightModeGray2, .lightModeGray2Color")
        for (let i = 0; i < darkModeElements.length; i++){
            darkModeElements[i].className = darkModeElements[i].className.replace("dark", `${color}`)
        }
        for (let i = 0; i < lightModeElements.length; i++){
            lightModeElements[i].className = lightModeElements[i].className.replace("light", `${color}`)
        }
    document.getElementById("body").style.backgroundColor=`var(--${color}Gray2)`
    themeIcon.style.color=`var(--${color})`
    themeLock = true
}
function blueMode(){ //one time function
    pickcolorMode("blue")
}
function pinkMode(){ //one time function
    pickcolorMode("pink")
}
function redMode(){ //one time function
    pickcolorMode("red")
}
function greenMode(){ //one time function
    pickcolorMode("green")
}
function changeBackgroundColor(color){
    body.style.backgroundColor=`var(--${color})`
}
function changeTheme(){
    if (themeLock == true){}
    else if(isDarkModeOn){
        darkMode()
    } else{
        lightMode()
    }
}
themeIcon.addEventListener("click", ()=>{
    isDarkModeOn = !isDarkModeOn
    changeTheme()
})
// ----------------Password-------------
document.addEventListener("keydown", (event)=>{
    if(event.key == "F12" || event.ctrlKey && event.shiftKey && event.key == "I"){
        event.preventDefault()
        alert("Eyyy, làm gì đó!")
    }
})
function encryptPassword(password){
    let encryptedPassword = 39
    salt = "YouAreSpecial"
    encryptedSalt = 39
    for (let i = 0; i<password.length; i++){
        encryptedPassword = (encryptedPassword<<2) + (password.charCodeAt(i))
    }
    for (let i = 0; i<salt.length; i++){
        encryptedSalt += (encryptedSalt<<1) - encryptedSalt + parseInt(salt.charCodeAt(i),10)
    }
    let encryptedPassword2 = (encryptedPassword>>5)^(encryptedPassword^39)
    return encryptedPassword2
}
/*
39. UbnatGuh
41. IwjnIgpcv
*/