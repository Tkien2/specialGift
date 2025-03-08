import { name } from "./script.js"

/*
Muhaha, lười dùng thư viện nên tự chế thuật toán mã hoá không thể đảo ngược!
May ra có brute force mới phá được mật khẩu
Mà thật ra làm kiểu này cũng vô dụng
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
    color: "pink",
    content: "Gửi Thuý<br><br>Nay 8/3 rồi nhỉ, do tui cũng không biết nên tặng cái gì nên quyết định làm web nho nhỏ như này để tặng. Tui chúc bà ngày càng học giỏi nè, bớt overthinking lại tí, nghĩ nhiều quá không tốt đâu :><br>Cái thiệp này tui lấy từ màu yêu thích hôm qua bà nói á, nhưng mà tui đổi màu tí :P<br>Web này tui định là để ở đây hoài luôn á, không có định đóng. Nên là mấy chục năm sau quay lại web này thì web vẫn còn nha, hehe.<br><br>Chúc Thuý 8/3 vui vẻ",
},
{
    pass: "MTM4MzA=",
    name: "Thư",
    color: "red",
    content: "Gửi Thư<br><br>Nay 8/3 rồi nhỉ, do tui cũng không biết nên tặng cái gì nên quyết định làm web nho nhỏ như này để tặng bà nè. Tui nhớ bà thích màu đỏ hay gì á nên để thiệp đỏ đỏ luôn.<br>Không biết có ai tặng bà gì chưa nhma tui chúc bà ngày càng học giỏi, luôn vui vẻ và gặp nhiều may mắn, cây dù không hư :><br>Web này tui định là để ở đây hoài luôn á, không có định đóng. Nên là sau này quay lại web này thì web vẫn còn nha, hehe.<br><br>Chúc Thư 8/3 vui vẻ.",
},
{
    pass: "MTU1MzY=",
    name: "Trang",
    color: "blue",
    content: "Gửi Trang<br><br>Mấy hôm trước hỏi thích màu gì không nói nên tui chọn đại một màu :)<br>Giữ đúng yêu cầu của bà là không mua đồ luôn nha, nhma không ăn được như bà nói thôi. Tui chúc bà ngày càng học giỏi, đậu tin học MOS, với lại ngày nào cũng vui vẻ, không quạu. <br>Web này tui định là để ở đây hoài luôn á, không có định đóng web đâu. Nên là mấy chục năm sau quay lại web này thì web vẫn còn nha, hehe.<br><br>Chúc Trang 8/3 vui vẻ.",
},
{
    pass: "MTQzNjY=",
    name: "Hân",
    color: "blue",
    content: "Gửi Hân<br>Lô bà, tui không biết nay 8/3 có ai tặng cho bà cái gì chưa nhưng mà tui tặng bà cái này nè. Tui rảnh lắm á, không học bài mà đi làm cái này =))<br>Nhân ngày 8/3, tui chúc bà học giỏi, gặp nhiều may mắn và lúc nào cũng vui vẻ nha.<br>Web này tui không xoá đâu, lúc nào cũng quay lại được... biết đâu sau này tui cho thông điệp ẩn thì sao :)<br><br>Chúc Hân có một ngày 8/3 vui vẻ!",
},
{
    pass: "MTgyODY=",
    name: "Lam",
    color: "blue2",
    content: "Gửi Lẻm<br><br>Muhahaha, không nói thì chắc bà cũng quên mẹ r. Nhớ hồi 20/10 tui có nói làm web 8/3 ko. Web đây nè =)<br>Do bí idea quá, gặp trong tuần thi nữa nên lấy idea cũ nhưng được cải thiện tí. He...<br>Tại bà á, mấy hôm trước hỏi thích màu gì thì nói màu trắng, màu trắng thì làm kiểu gì mắ!? Phắc<br>Nay tạm thời hết matday rồi, tui chúc bà kiểm tra không dưới trung bình, tiến hóa thành người không thái hóa thành khỉ, tính bớt matday và gặp nhiều may mắn :)<br>Mà web này tui ko đóng đâu, nếu nhớ link thì lúc nào cx quay lại được<br><br>Chúc Lẻm 8/3 vui vẻ",
},
{
    pass: "MTQ1MzQ=",
    name: "Anh",
    color: "pink",
    content: "Gửi B.Anh<br><br>He, nay 8/3 đúng không? Chuyện mua bút đen tính sau đi, tui lười quá. Lười mua bút nhưng siêng làm web nên tui tặng bà cái này. Tui chúc bà ngày càng bớt khờ Toán, Lý, Hoá, luôn vui vẻ và gặp nhiều may mắn =)<br>Thật ra web này tui không xoá đâu, để ở đây hoài luôn, tới lúc chết nhớ link vẫn mở được. Hehe...<br><br>Chúc B.Anh 8/3 vui vẻ"
}
]