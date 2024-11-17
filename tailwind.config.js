/** @type {import('tailwindcss').Config} */
// eslint-disable-next-line import/no-anonymous-default-export
export default {
    content: ['./src/**/*.{js,jsx,ts,tsx}'],
    theme: {
        colors: ({ colors }) => ({
            ...colors,
            ...{
                primary: '#2563EB',
                'primary-light': '#60A5FA',
                'primary-dark': '#080d16',
                'primary-off': '#dbeafe',
                'primary-dark-2': '#0D1526',
                'primary-dark-3': '#1A2433',
                'gray-wash': '#2E3847',
                info: '#337DA6',
                'info-light': '#4FC0FF',
                'info-white': '#eff6ff',
                'off-white': '#F2F4F7',
                hash: '#495565',
            },
        }),
        extend: {},
    },
    plugins: [require('tailwind-scrollbar')],
}
