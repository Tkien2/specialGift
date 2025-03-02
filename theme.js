export let isDarkModeOn = false
export let themeLock = false
const themeIcon = document.getElementById("themeIcon")
export function darkMode(){
    let lightModeElements = document.querySelectorAll(".lightMode, .lightModeGray, .lightModeGray2, .lightModeGray2Color")
    for (let i = 0; i < lightModeElements.length; i++){
        lightModeElements[i].className = lightModeElements[i].className.replace("light", "dark")
    }
    document.getElementById("body").style.backgroundColor="var(--darkGray2)"
}
export function lightMode(){
    let darkModeElements = document.querySelectorAll(".darkMode, .darkModeGray, .darkModeGray2, .darkModeGray2Color")    
    for (let i = 0; i < darkModeElements.length; i++){
        darkModeElements[i].className = darkModeElements[i].className.replace("dark", "light")
    }    
    document.getElementById("body").style.backgroundColor="var(--light)"
}
export function smoothTrans(){
    let all = document.querySelectorAll("body, #main, #bottomBar")
    for (let i = 0; i < all.length; i++){
        all[i].classList.add("smoothTransition")
    }
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
export function blueMode(){ //one time function
    pickcolorMode("blue")
}
export function pinkMode(){ //one time function
    pickcolorMode("pink")
}
export function redMode(){ //one time function
    pickcolorMode("red")
}
export function greenMode(){ //one time function
    pickcolorMode("green")
}
export function changeBackgroundColor(color){
    body.style.backgroundColor=`var(--${color})`
}
export function changeTheme(){
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
