export function showNotification(message, typeOfNotification){ //fail || success
    const nMessage= document.getElementById("notificationMessage")
    const icon = document.getElementById("icon")
    const nBox = document.getElementById("notificationBox")
    nBox.style.display = "flex"
    nMessage.innerHTML = message
    if(typeOfNotification == "fail"){
        icon.name = "alert-circle"
        icon.style.color = "var(--fail)"
        nMessage.style.color = "var(--fail)"
        nBox.style.borderRightColor = "var(--fail)"
    } else if(typeOfNotification == "success"){
        icon.name = "checkmark"
        icon.style.color = "var(--success)"
        nMessage.style.color = "var(--success)"
        nBox.style.borderRightColor = "var(--success)"
    }
    setTimeout(()=>{
        nBox.style.display = "none"
        icon.name = ""
    },2500)
}
