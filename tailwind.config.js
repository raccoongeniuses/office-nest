/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: 'selector',
    content: ["./src/views/**/*.hbs"],
    theme: {
        extend: {
            colors: {
                // Vibrant text colors for the "colorful" look
                vibe: {
                    100: '#e0e7ff', // light indigo
                    200: '#c7d2fe',
                    300: '#a5b4fc',
                    400: '#818cf8',
                    500: '#6366f1', // indigo
                    600: '#4f46e5',
                    cyan: '#22d3ee',
                    pink: '#f472b6',
                    lime: '#a3e635',
                    amber: '#fbbf24',
                },
                // Dark background palette
                nest: {
                    900: '#0c0a09', // stone-950 equivalent or darker
                    800: '#1c1917', // stone-900
                    700: '#292524', // stone-800
                }
            }
        },
    },
    plugins: [],
}
