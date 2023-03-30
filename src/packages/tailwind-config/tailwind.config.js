module.exports = {
    content: [
        // app content
        `src/**/*.{js,ts,jsx,tsx}`
        // include packages if not transpiling
        // "../../packages/**/*.{js,ts,jsx,tsx}",
    ],
    plugins: [require('daisyui')],
    daisyui: {
        styled: true,
        themes: ['light', 'dark'],
        base: true,
        utils: true,
        logs: true,
        rtl: false,
        prefix: ''
    }
};
