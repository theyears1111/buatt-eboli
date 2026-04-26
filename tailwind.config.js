/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        kraft:       '#E8DDD4',
        'kraft-light': '#F5EDE4',
        'kraft-dark':  '#D4C8BC',
        mocha:       '#5C4A3D',
        'mocha-light': '#7a6258',
        mustard:     '#C8A96A',
        brick:       '#C94B28',
        teal:        '#3D9E8C',
        hotpink:     '#D94F6B',
        lemon:       '#E8D84A',
        grape:       '#4A1E6E',
      },
      fontFamily: {
        display: ['"Archivo Black"', 'Impact', 'sans-serif'],
        hand:    ['"Permanent Marker"', 'Caveat', 'cursive'],
        script:  ['Caveat', 'cursive'],
        mono:    ['"Space Mono"', 'ui-monospace', 'monospace'],
        sans:    ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        hard: '6px 6px 0 0 #5C4A3D',
        soft: '3px 3px 0 0 #5C4A3D',
      },
    },
  },
  plugins: [],
}
