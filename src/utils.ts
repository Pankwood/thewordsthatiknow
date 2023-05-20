//TODO create a custom directive to remove Space, special char., etc
function processWordsByConfiguration(text: string, removeHTML: boolean, removeNumbers: boolean, removeDuplicated: boolean,
    replaceChars: string) {

    if (removeHTML) {
        text = removeHTMLFromString(text);
    }

    if (removeNumbers) {
        text = removeNumbersFromString(text);
    }

    if (replaceChars) {
        text = removeSpecialCharactersFromString(text, replaceChars);
    }

    if (removeDuplicated) {
        text = removeDuplicateFromString(text);
    }

    // Remove \n caracter, remove extra space and transform to lower case
    text = text.replace(/[\n\r]/g, ' ').trim().toLowerCase();

    //Convert to array
    let textArray = text.split(' ')
        // Remove empty values
        .filter(String)
        // Remove unique dash caracter(for netflix subtitle). It didn't remove dash like: calme-toi
        .filter(item => item !== "-");;

    return textArray;
}

function removeHTMLFromString(text: string): string {
    // Remove HTML tags from the text
    return text.replace(/(<([^>]+)>)/ig, '');
}

function removeDuplicateFromString(text: string): string {
    // Remove duplicate words from the text
    let textArray = text.split(' ');
    textArray = [...new Set(textArray)];
    return textArray.join(' ');
}

function removeNumbersFromString(text: string): string {
    // Remove numbers from the text
    return text.replace(/[0-9]/g, '');
}

function removeSpecialCharactersFromString(text: string, chars: string): string {
    // Add a "\" behind "\" and "]" to avoid api error
    const addRegex = /[\\\]]/g;
    chars = chars.replace(addRegex, '\\$&');

    // Remove chars based on the parameter
    const regex = new RegExp(`[${chars}]`, 'g');
    return text.replace(regex, ' ');
}


function getCurrentYear() {
    return new Date().getFullYear();
}

export { processWordsByConfiguration, getCurrentYear };