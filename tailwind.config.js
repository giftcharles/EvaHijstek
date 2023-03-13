module.exports = {
  theme: {
    extend:
    {
      fontFamily: {
        'myriad': ['Myriad Pro Regular', 'sans-serif'],
        'myriad-bold' : ['Myriad Pro Bold', 'sans-serif'],
        'myriad-light' : ['Myriad Pro Light', 'sans-serif']
      },
    },
  },
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#fff",

          secondary: "#000",

          accent: "#1FB2A5",

          neutral: "#191D24",

          "base-100": "#1010FF",

          info: "#3ABFF8",

          success: "#36D399",

          warning: "#FBBD23",

          error: "#F87272",
        },
      },
    ],
  },
  plugins: [require("daisyui")],
};
