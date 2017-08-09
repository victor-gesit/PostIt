import 'jquery/dist/jquery';

const switchTab = (evt, cityName) => {
  // let i, tabcontent, tablinks;
  const tabcontent = document.getElementsByClassName('tabcontent');
  for (let i = 0; i < tabcontent.length; i += 1) {
    tabcontent[i].style.display = 'none';
  }
  const tablinks = document.getElementsByClassName('tablinks');
  for (let i = 0; i < tablinks.length; i += 1) {
    tablinks[i].className = tablinks[i].className.replace(' active', '');
  }
  document.getElementById(cityName).style.display = 'block';
  evt.currentTarget.className += ' active';
};
window.switchTab = switchTab;

window.addEventListener('load', () => {
  // Load a default tab for the createGroup page
  try {
    $('#defaultTab')[0].click();
  } catch (e) { return false; }
}, false);

