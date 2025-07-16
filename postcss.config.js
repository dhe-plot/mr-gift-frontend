const config = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {
      overrideBrowserslist: [
        '> 1%',
        'last 2 versions',
        'Firefox ESR',
        'Safari >= 9',
        'Chrome >= 54',
        'Edge >= 79',
        'iOS >= 9',
        'Android >= 4.4'
      ],
      grid: true,
      flexbox: 'no-2009',
      add: true,
      remove: false
    }
  },
};

export default config;
