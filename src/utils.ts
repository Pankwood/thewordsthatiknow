//TODO create a custom directive to remove Space, special char., etc
function removeExtraSpace(text: String) {
    return text.replace(/\s+/g, " ").trim();
}

function getCurrentYear() {
    return new Date().getFullYear();
}

export { removeExtraSpace, getCurrentYear };