/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    colors:{
      'azul_fundo':'#435585',
      'roxo':'#221F3E',
      white:'white',
      transparent:'transparent',
      '2A3B68':'#2A3B68',
      'verde':'#76ABAE',
      'azul':'#A3C7D6'
    },
    extend: {
      spacing:{
        full:'full',
        screen:'screen',
        '772px':'48.25rem',
        '791px':'49.438rem',
      },
      backgroundImage: {
        'upload': "url('../img/uploadImagem.png')",
      },
    },
  },
  plugins: [],
}

