/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#FFFBEB',
          100: '#FEF3C7',
          500: '#F59E0B', // Фирменный теплый солнечный New Way Yellow
          600: '#D97706',
          700: '#B45309',
        },
        adventure: {
          50: '#F0FDF4',
          500: '#10B981', // Изумрудный для статуса "Гарантований виїзд"
          600: '#059669',
          900: '#064E3B',
        },
        slate: {
          850: '#151F32',
          900: '#0F172A',
        }
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'Inter', 'sans-serif'],
      },
      boxShadow: {
        'card': '0 4px 20px -2px rgba(15, 23, 42, 0.06), 0 2px 6px -1px rgba(15, 23, 42, 0.04)',
        'card-hover': '0 20px 30px -10px rgba(15, 23, 42, 0.12), 0 8px 10px -4px rgba(15, 23, 42, 0.06)',
      }
    },
  },
  plugins: [],
}
