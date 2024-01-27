import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    // './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    // fontFamily: {
    //    display: ["Roboto", "sans serif"],
    // },
    extend: {
      screens: {
      sm: "480px",
      nav: "720px",
      md: "850px",
      lg: "1100px",
      xl: "1440px",
    },
      backgroundColor: {
      darkmode: "#202124",
      searchbar: '#525355',
      activebar: '#41331C',
      hover: '#41331C',
      lighterHover: '#444547',
      borderColor: '#313235',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [
 require('tailwindcss-neumorphism'),
 ],
}
export default config
