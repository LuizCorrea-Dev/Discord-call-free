/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        discord: {
          blurple: '#5865F2',
          'blurple-hover': '#4752C4',
          green: '#23A55A',
          red: '#DA373C',
          'red-hover': '#C03135',
          darkest: '#111214',
          primary: '#1E1F22',
          secondary: '#2B2D31',
          tertiary: '#313338',
          hover: '#35373C',
          text: '#DBDEE1',
          muted: '#949BA4',
          white: '#FFFFFF'
        }
      },
      animation: {
        'pulse-subtle': 'pulseSubtle 2.5s infinite ease-in-out',
        'ping-slow': 'ping 2.2s cubic-bezier(0, 0, 0.2, 1) infinite'
      },
      keyframes: {
        pulseSubtle: {
          '0%, 100%': { opacity: '0.6', transform: 'scale(1)' },
          '50%': { opacity: '1', transform: 'scale(1.05)' }
        }
      }
    }
  },
  plugins: [],
}
