export const convertToArrayOfObjects = (data) => {
    var keys = data.shift(),
        i = 0, k = 0,
        obj = null,
        output = [];

    for (i = 0; i < data.length; i++) {
        obj = {};

        for (k = 0; k < keys.length; k++) {
        obj[keys[k]] = data[i][k];
        };

        output.push(obj);
    };

    return output;
};