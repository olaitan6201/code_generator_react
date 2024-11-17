export const maskEmail = (email: string = '') => {
    let explodeEmail = email.split('@')
    const user = explodeEmail[0]
    let mask = ''

    if (user.trim().length > 10)
        mask = user.substring(0, 5).concat('...', user.slice(-3))
    else
        mask = user.substring(0, 3).concat('...', user.slice(-2))

    explodeEmail[0] = mask;
    return explodeEmail.join('@')
}

export const TitleCase = (str: string = '') => {
    return str.replace(
        /\w\S*/g,
        function (txt) {
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        }
    );
}

export const range = (start: string | number, end: string | number, step: number = 1) => {
    var range = [];
    var typeofStart = typeof start;
    var typeofEnd = typeof end;

    if (step === 0) {
        throw TypeError("Step cannot be zero.");
    }

    if (typeofStart === "undefined" || typeofEnd === "undefined") {
        throw TypeError("Must pass start and end arguments.");
    } else if (typeofStart !== typeofEnd) {
        throw TypeError("Start and end arguments must be of same type.");
    }

    typeof step === "undefined" && (step = 1);

    if (end < start) {
        step = -step;
    }

    if (typeofStart === "number") {

        while (step > 0 ? end >= start : end <= start) {
            range.push(start);
            start = +start;
            start += step;
        }

    } else if (typeofStart === "string") {
        start = start.toString()
        end = end.toString()
        if (start.length !== 1 || end.length !== 1) {
            throw TypeError("Only strings with one character are supported.");
        }

        start = start.charCodeAt(0);
        end = end.charCodeAt(0);

        while (step > 0 ? end >= start : end <= start) {
            range.push(String.fromCharCode(start));
            start += step;
        }

    } else {
        throw TypeError("Only string and number types are supported");
    }

    return range;
}

export const monthOfYear = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
]