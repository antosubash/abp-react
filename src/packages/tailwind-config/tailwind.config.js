module.exports = {
    content: [
        // app content
        `src/**/*.{ts,tsx}`,
        // include packages if not transpiling
        "../../packages/**/*.{ts,tsx}",
    ],
    plugins: [require('daisyui')],
    daisyui: {
        styled: true,
        themes: ['light', 'dark', 'cupcake', 'dracula'],
        base: true,
        utils: true,
        logs: true,
        rtl: false,
        prefix: '',
        darkTheme: 'dark'
    }
};
