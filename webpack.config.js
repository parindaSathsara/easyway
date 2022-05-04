const webpack = require("webpack");

module.exports = {
    /* ... */

    resolve: {
        fallback: {
            "zlib": require.resolve("browserify-zlib"),
        }
    },

    /* ... */
}