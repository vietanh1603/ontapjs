const memories = [
    {
        title: "Ngày đầu tiên",
        date: "13/10/2024",
        images: [
            "images/anh1.jpg",
            "images/anh2.jpg",
            "images/anh3.jpg",
            "images/anh4.jpg"
        ],
        text: "Ngày này là ngày cưới của chị H nhưng từ ngày đó câu chuyện của chúng mình bắt đầu."
    },
    {
        title: "Đám cưới chị Hào",
        date: "13/10/2024",
        images: [
            "images/anh5.jpg"
        ],
        text: "Hê Hê"
    },
    {
        title: "Mưaaaaaaa",
        date: "27/10/2024",
        images: [
            "images/anh6.jpg"
        ],
        text: "Vẫn là một tối làm chung nhưng cương vị của ta đã khác hê hê"
    },
    {
        title: "Dỗiiiiiiiiiiiii",
        date: "03/11/2024",
        images: [
            "images/anh7.jpg"
        ],
        text: "Hahaha ta là vua lì đòn"
    },
    {
        title: "Đi xem hạ cờ",
        date: "30/11/20024",
        images: [
            "images/anh8.jpg"
        ],
        text: "Mỗi bức ảnh là một vì sao, tất cả tạo thành vũ trụ của chúng mình."
    },
    {
        title: "Đi thảo cầm viên",
        date: "16/12/2024",
        images: [
            "images/anh8.jpg",
            "images/anh9.jpg",
            "images/anh10.jpg",
            "images/anh11.jpg",
            "images/anh12.jpg",
            "images/anh13.jpg",
            "images/anh14.jpg"
        ],
        text: "Cảm ơn vợ iu vì đã cùng anh tạo nên những điều thật đẹp."
    },
    {
        title: "Thấy cũm xinh gái nên thêm vào",
        date: "21/12/2024",
        images: [
            "images/anh15.jpg"
        ],
        text: "Khum bít đi chơi ở đâu"
    },
    {
        title: "PT Mart",
        date: "21/12/2024",
        images: [
            "images/anh16.jpg",
            "images/anh17.jpg"
        ],
        text: "Ảnh được vợ iu gửi cho"
    },
    {
        title: "Côn vin Lãm Làn",
        date: "26/12/2024",
        images: [
            "images/anh18.jpg"
        ],
        text: "Nơi tìn yêu chớm nở hê hê"
    },
    {
        title: "Xem pháo hoaaa",
        date: "01/01/2025",
        images: [
            "images/anh19.jpg",
            "images/anh20.jpg",
            "images/anh21.jpg",
            "images/anh22.jpg",
            "images/anh23.jpg",
            "images/anh24.jpg"
        ],
        text: "Rồi ta sẽ ngắm pháo hoa cùng nhau trên tầng thượng"
    },
    {
        title: "Vẫn là ngắm pháo hoaaa",
        date: "01/01/2025",
        images: [
            "images/anh25.jpg",
            "images/anh26.jpg",
            "images/anh27.jpg",
            "images/anh28.jpg",
            "images/anh29.jpg",
            "images/anh30.jpg"
        ],
        text: "Nhìn cũm đẹp đôi "
    },
    {
        title: "Xinh gái cho riêng",
        date: "01/01/2025",
        images: [
            "images/anh31.jpg"
        ],
        text: "Không có gì có thể miêu tả được vẻ đẹp này"
    },
    {
        title: "Đi chơi mảnh",
        date: "12/01/2025",
        images: [
            "images/anh34.jpg",
            "images/anh32.jpg",
            "images/anh33.jpg"
        ],
        text: "Cũm là do xinh gái nên cho thêm hê hê"
    },
    {
        title: "Sinh nhật vợ iuuu",
        date: "16/01/2025",
        images: [
            "images/anh36.jpg"
        ],
        text: "Chúc vợ iu sinh nhật vui vẻ"
    },
    {
        title: "Đi chơiiii",
        date: "04/02/2025",
        images: [
            "images/anh37.jpg"
        ],
        text: "Đố broo nhớ đây là đi đâu."
    },
    {
        title: "Sang trọ vợ iuuuu",
        date: "08/02/2025",
        images: [
            "images/anh38.jpg"
        ],
        text: "Chả nhớ xong đi đâu cả."
    },
    {
        title: "Con Bột",
        date: "21/02/2025",
        images: [
            "images/anh39.jpg"
        ],
        text: "Nhớ Bột quá nên cho vào lunnn."
    },
    {
        title: "Điều anh muốn nhớ",
        date: "04/03/2025",
        images: [
            "images/anh40.jpg"
        ],
        text: "Nghiện người ta quá chớ chi."
    },
    {
        title: "Sinh nhật Vanhh",
        date: "04/03/2025",
        images: [
            
        ],
        text: "Quên mất chưa thêm sinh nhật mình."
    },
    {
        title: "Mỳ cayyy",
        date: "18/03/2025",
        images: [
            "images/anh41.jpg"
        ],
        text: "Them mỳ cay quáaaa vợ iu ơi."
    },
    {
        title: "Aeon Mall Long Biên",
        date: "18/03/2025",
        images: [
            "images/anh42.jpg"
        ],
        text: "Có những lúc chỉ cần nhìn thấy em cười, mọi mệt mỏi trong anh cũng tự nhiên tan biến, mà em chụp ảnh toàn đeo khẩu trang."
    },
    {
        title: "Tam Đảo",
        date: "21/09/2025",
        images: [
            "images/anh43.jpg",
            "images/anh44.jpg",
            "images/anh45.jpg",
            "images/anh46.jpg",
        ],
        text: "Mún về quê vợ iu chơi típpppppppppppp."
    },
    {
        title: "Tuyệt Tình Cốc",
        date: "04/01/2025",
        images: [
            "images/anh47.jpg",
            "images/anh48.jpg",
        ],
        text: "Đôi khi hạnh phúc chẳng cần điều gì lớn lao, chỉ cần có em ở bên là đủ."
    },
    {
        title: "Racing gơn",
        date: "04/01/2025",
        images: [
            "images/anh49.jpg"
        ],
        text: "Anh trân trọng từng khoảnh khắc chúng ta đã có, dù vui hay buồn, vì tất cả đều thuộc về câu chuyện của chúng mình."
    },
    {
        title: "Bà cô 3x",
        date: "04/01/2025",
        images: [
            "images/anh50.jpg",
            "images/anh51.jpg",
            "images/anh52.jpg",
            "images/anh53.jpg"
        ],
        text: "Sì tai như bà cô vị."
    },
    {
        title: "Sinh nhật vợ iuuuu",
        date: "16/01/2026",
        images: [
            "images/anh54.jpg",
            "images/anh55.jpg",
        ],
        text: "Sinh nhật vợ iu nhưngg khumm có bánhhhh :((("
    },
    {
        title: "Cát Bà 2 ngày 1 đêm",
        date: "16/01/2026",
        images: [
            "images/anh56.jpg",
            "images/anh57.jpg",
            "images/anh58.jpg",
            "images/anh59.jpg",
            "images/anh60.jpg"
        ],
        text: "Cảm ơn em vì những sự dịu dàng nhỏ bé mà em dành cho anh, những điều tưởng nhỏ nhưng anh luôn nhớ."
    },
];