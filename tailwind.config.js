module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'bg-primary': '#b8d8be',
        'primary': '#EEEDEB',
        'secondary': '#ECC94B',
        'tertiary': '#939185',
        'quaternary': '#2F3645',
      },
      minHeight: {
        'screen': '100vh',
      },
    },
  },
  plugins: [],
}