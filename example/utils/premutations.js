const createPremutations = elts => {
    if (elts.length === 1) {
        return [elts];
    }

    return elts.reduce((akk, elt, index, arr) => {
        return akk.concat(
            createPremutations([
                ...arr.slice(0, index),
                ...arr.slice(index + 1)
            ]).map(subArr => [elt, ...subArr])
        );
    }, []);
};

module.exports = createPremutations;