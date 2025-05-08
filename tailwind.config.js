/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Primary Colors
        kiwi: {
          DEFAULT: '#7BA60D', // Darker kiwi green
          light: '#94C11F',
          dark: '#5C7D0A'
        },
        teal: {
          DEFAULT: '#005E63',
          light: '#007F85',
          dark: '#004A4E'
        },
        sand: {
          DEFAULT: '#E6D2AA',
          light: '#F0E3C7',
          dark: '#D4B77E'
        },
        // Secondary Colors
        rust: {
          DEFAULT: '#C86B27',
          light: '#E18545',
          dark: '#A35720'
        },
        night: {
          DEFAULT: '#1D3557',
          light: '#264773',
          dark: '#162841'
        },
        // Neutral Colors
        surface: {
          DEFAULT: '#F8F7F4',
          secondary: '#E9E8E3',
          tertiary: '#B7B5AB'
        },
        text: {
          primary: '#343A40',
          secondary: '#212529'
        },
        // State Colors
        state: {
          focus: '#7BA60D',
          success: '#34C77C',
          warning: '#C86B27',
          error: '#DC3545'
        }
      },
      fontFamily: {
        sans: ['SF Pro Display', 'Inter', 'system-ui', 'sans-serif'],
        display: ['SF Pro Display', 'Inter', 'system-ui', 'sans-serif'],
        body: ['SF Pro Text', 'Inter', 'system-ui', 'sans-serif']
      },
      fontSize: {
        'h1': ['28px', { lineHeight: '36px', letterSpacing: '-0.2px', fontWeight: '600' }],
        'h2': ['22px', { lineHeight: '28px', letterSpacing: '-0.2px', fontWeight: '600' }],
        'h3': ['18px', { lineHeight: '24px', letterSpacing: '-0.1px', fontWeight: '600' }],
        'subtitle': ['16px', { lineHeight: '20px', letterSpacing: '0px', fontWeight: '500' }],
        'body': ['14px', { lineHeight: '20px', letterSpacing: '0px', fontWeight: '400' }],
        'small': ['12px', { lineHeight: '16px', letterSpacing: '0.1px', fontWeight: '400' }],
        'caption': ['11px', { lineHeight: '14px', letterSpacing: '0.2px', fontWeight: '500' }]
      },
      boxShadow: {
        'luminous': '0 0 0 1px rgba(148, 193, 31, 0.1), 0 2px 4px 0 rgba(148, 193, 31, 0.1)',
        'luminous-hover': '0 0 0 1px rgba(148, 193, 31, 0.2), 0 4px 8px 0 rgba(148, 193, 31, 0.2)',
        'inner-glow': 'inset 0 0 2px 0 rgba(255, 255, 255, 0.02)',
        'inner-glow-hover': 'inset 0 0 4px 0 rgba(255, 255, 255, 0.04)'
      },
      borderRadius: {
        'lg': '8px',
        'xl': '12px'
      },
      animation: {
        'glow-pulse': 'glow-pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'ambient-glow': 'ambient-glow 4s ease-in-out infinite'
      },
      keyframes: {
        'glow-pulse': {
          '0%, 100%': {
            opacity: '1',
            transform: 'scale(1)'
          },
          '50%': {
            opacity: '0.5',
            transform: 'scale(1.05)'
          }
        },
        'ambient-glow': {
          '0%, 100%': {
            opacity: '0.2'
          },
          '50%': {
            opacity: '0.4'
          }
        }
      }
    }
  },
  plugins: [
    require('@tailwindcss/typography'),
  ]
};