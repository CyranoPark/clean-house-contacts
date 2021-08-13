export const contactsToArray = (data) => {
    return Object.keys(data).map((key) => {
        return {
            key,
            ...data[key],
        };
    });
};
