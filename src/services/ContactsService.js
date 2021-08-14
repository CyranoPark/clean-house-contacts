export const contactsToArray = (data) => {
    return Object.keys(data).map((key) => {
        return {
            key,
            ...data[key],
        };
    });
};

export const removeDashInString = (str) => {
    return str
        .split('')
        .map((s) => (s === '-' ? '' : s))
        .join('');
};

export const byteCount = (s) => {
    if (s == null || s.length == 0) {
        return 0;
    }
    let size = 0;

    for (let i = 0; i < s.length; i++) {
        size += charByteSize(s.charAt(i));
    }

    return size;
};

function charByteSize(ch) {
    if (ch == null || ch.length == 0) {
        return 0;
    }

    const charCode = ch.charCodeAt(0);

    if (charCode <= 0x00007f) {
        return 1;
    } else if (charCode <= 0x0007ff) {
        return 2;
    } else if (charCode <= 0x00ffff) {
        return 3;
    } else {
        return 4;
    }
}
