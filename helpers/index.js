module.exports = {
    unset(obj, properties) {
        properties.forEach(property => {
            delete obj[property];
        });
    }
}