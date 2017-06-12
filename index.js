
// watch html files during development
if (process.env.NODE_ENV === 'development') {
  require('./template/index.html');
  require('./template/creategroup.html');
  require('./template/postmessage.html');
  require('./template/messageboard.html');
}
require('./template/scss/style.scss');
require('./template/js/creategroup.js');
console.log('testing again  for recompilation');