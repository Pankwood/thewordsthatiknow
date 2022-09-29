function removeExtraSpace(text: String) {
    return text.replace(/\s+/g, " ").trim();
}

function clearForms(arrays: object[]) {
    arrays.forEach(array => {
        array = [];
    });
}

function getCurrentYear() {
    return new Date().getFullYear();
}

export { removeExtraSpace, clearForms, getCurrentYear };