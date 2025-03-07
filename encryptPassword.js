import { name } from "./script"

/*
Muhaha, lười dùng thư viện nên tự chế thuật toán mã hoá không thể đảo ngược!
May ra có brute force mới phá được mật khẩu
...
Nói chứ đừng cố hack, lộ hết ;-;
*/
function encryptPassword(password){
    let encryptedPassword = 39
    let salt = "YouAreSpecial"
    let encryptedSalt = 1037
    const sugar = 39
    for (let i = 0; i<password.length; i++){
        encryptedPassword += (encryptedPassword^(password.charCodeAt(i)^sugar))^encryptedPassword
        encryptedPassword ^= sugar
    }
    for (let i = 0; i<salt.length; i++){
        encryptedSalt += encryptedPassword^((salt.charCodeAt(i)^sugar)^sugar)
        encryptedSalt ^= sugar
    }
    let encryptedPassword2 = (encryptedPassword^sugar)^(encryptedSalt^sugar)
    return btoa(encryptedPassword2)
}
export function encryptPassword2(password){
    return encryptPassword(btoa(encryptPassword(password)))
}
export const passwordList = [
{
    pass: "MTQ2MzY=",
    name: "Thuý",
    color: "pink"
},
{
    pass: "MTM4MzA=",
    name: "Thư",
    color: "pink",
},
{
    pass: "MTU1MzY=",
    name: "Trang",
    color: "blue",
}]
/*
38. PuqyFtgk
39. UbnatGuh
41. IwjnIgpcv
*/