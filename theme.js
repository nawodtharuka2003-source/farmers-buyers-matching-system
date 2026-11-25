const savedTheme = localStorage.getItem('croplink-theme');
const theme = savedTheme === 'light' || savedTheme === 'dark'
    ? savedTheme
    : (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
document.documentElement.dataset.theme = theme;
