module.exports.escapeRegExpChars = (text) => text.toString().replace(/[-[\]{}()*+?.İ,\\^$|#\s]/g, '\\$&');
