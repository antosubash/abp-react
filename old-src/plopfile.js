module.exports = function generator(plop) {
    plop.setDefaultInclude({ generators: true });
    plop.setGenerator("package", require("./plop-templates/package/package.js"));
}