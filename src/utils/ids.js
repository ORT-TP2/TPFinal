export const getNewId = (elements) => {
    return elements.length > 0
        ? Math.max.apply(null, elements.map(e => e.id)) + 1
        : 1;
}