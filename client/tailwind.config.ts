/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "white": "#fff",
        "transparent": "transparent",
        "primary-bg": "var(--primary-bg)",
        "primary-black": "var(--primary-black)",
        "primary-blue": "var(--primary-blue)",
        "primary-grey": "var(--primary-grey)",
        "secondary-black": "var(--secondary-black)",
        "light-blue": "var(--light-blue)",
        "primary-border": "var(--primary-border)",
        "pure-black": "var(--pure-black)"
      },
      maxWidth: {
        "limit": "var(--w-limit)"
      },
      boxShadow: {
        "primary-box-shadow": "var(--primary-box-shadow)"
      },
    },
  },
  plugins: [],
}

