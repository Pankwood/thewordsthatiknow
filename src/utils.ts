//TODO create a custom directive to remove Space, special char., etc
function removeSpecialCharacteres(text: String) {
    return text
        .replace(/(<([^>]+)>)/ig, '').replace(/[\n\r]/g, ' ').replace(/[!,.«»–?"…:%\\/()]+/g, ' ')
        .trim().toLowerCase();
    //replace all! ? ... : \ / % ( ) …
}

function getCurrentYear() {
    return new Date().getFullYear();
}

export { removeSpecialCharacteres, getCurrentYear };