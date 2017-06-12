
// watch html files during development
if (process.env.NODE_ENV === 'development') {
  require('./index.html');
  require('./creategroup.html');
  require('./postmessage.html');
  require('./messageboard.html');
}
require('./scss/style.scss');
require('./js/creategroup.js');
console.log('testing again  for recompilation');