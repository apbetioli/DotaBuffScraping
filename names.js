var x = require('x-ray')();

x('http://dotabuff.com/heroes', ['.hero-grid a .hero .name'])
.write('data/names.json');

