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
        "Chúc Hanni tuổi mới thật nhiều niềm vui! 🎂",
        "Luôn xinh đẹp và tỏa sáng trên sân khấu! 🌟",
        "Thành công rực rỡ cùng NewJeans! 🚀",
        "Luôn hạnh phúc và yêu đời nhé! ❤️"
    ]
}
