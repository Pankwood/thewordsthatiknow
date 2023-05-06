//TODO create a custom directive to remove Space, special char., etc
function removeSpecialCharacteres(text: String) {
    return text.trim();
}

function getCurrentYear() {
    return new Date().getFullYear();
}

export { removeSpecialCharacteres, getCurrentYear };