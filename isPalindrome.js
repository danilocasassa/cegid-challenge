// Getting the word/phrase
const inputText = process.argv[2];

// Check if the word/phrase is a palindrome
function isPalindrome(text) {
    text = text
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[^\w\s]/g, "")
        .replace(/\s+/g, "");
    return text === text.split("").reverse().join("");
}

if (inputText) {
    if (isPalindrome(inputText)) {
        console.log(`\x1b[36m"${inputText}" \x1b[32m is a palindrome`);
    } else {
        console.log(`\x1b[33m"${inputText}" \x1b[31m is NOT a palindrome`);
    }
} else {
    console.log("\x1b[33mNo words to verify, please type any word and try again. \n     \x1b[90m`node isPalindrome WORDHERE` or \n     `node isPalindrome 'PHRASE HERE'");
}

console.log("\x1b[0m");
