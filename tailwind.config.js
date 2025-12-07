/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                sans: ['Inter', 'system-ui', 'sans-serif'],
            },
            colors: {
                // Corporate Palette
                corporate: {
                    blue: '#1d4ed8', // blue-700
                    dark: '#0f172a', // slate-900
                    light: '#f8fafc', // slate-50
                    border: '#e2e8f0', // slate-200
                    text: '#334155', // slate-700
                    muted: '#64748b', // slate-500
                }
            },
            boxShadow: {
                'subtle': '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
                'card': '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.1)',
            }
        },
    },
    plugins: [],
}
