export interface BirthdayConfig {
    name: string;
    date: string; // YYYY-MM-DD
    images: {
        avatar: string;
        gallery: string[];
    };
    messages: string[];
}

export const birthdayConfig: BirthdayConfig = {
    name: "Hanni",
    date: "2004-10-06", // Example date
    images: {
        avatar: "/birthday/hanni/avatar_bd.jpg",
        gallery: [
            "/birthday/hanni/11.jpg",
            "/birthday/hanni/12.jpg",
            "/birthday/hanni/13.jpg",
            "/birthday/hanni/14.jpg",
            "/birthday/hanni/15.jpg"
        ]
    },
    messages: [
        "Chúc tuổi mới thật nhiều niềm vui! 🎂",
        "Luôn xinh đẹp và tỏa sáng trên sân khấu! 🌟",
        "Thành công rực rỡ ! 🚀",
        "Luôn hạnh phúc và yêu đời nhé! ❤️",

        // Cute thêm
        "Chúc tuổi mới đáng yêu như chính bạn vậy! 🎀✨",
        "Hy vọng mọi điều bạn mong ước đều nở hoa trong năm nay 🌸",
        "Chúc bạn luôn cười tươi như nắng sớm và rạng rỡ cả ngày! 😊☀️",
        "Tuổi mới thêm nhiều bất ngờ vui vẻ và điều ngọt ngào nhé! 🍰💖",
        "Chúc mỗi ngày của bạn đều lung linh một chút phép màu ✨🦋",
        "Năm mới của bạn sẽ tràn ngập niềm vui, tình yêu và thật nhiều quà! 🎁💕"
    ]

}
