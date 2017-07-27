
import 'jquery/dist/jquery';
import 'materialize-css/dist/css/materialize.css';
import './scss/style.scss';
import './js/customJS';

require('./js/materialize');


// watch html files during development
if (process.env.NODE_ENV === 'development') {
  require('./index.html');
  require('./signup.html');
  require('./creategroup.html');
  require('./postmessage.html');
  require('./messageboard.html'); 
}

$(document).ready(() => {
  $('.button-collapse').sideNav();
}); 
