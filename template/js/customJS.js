import 'jquery/dist/jquery';

const switchTab = (evt, cityName) => {
  let i, tabcontent, tablinks;
  tabcontent = document.getElementsByClassName('tabcontent');
  for (i = 0; i < tabcontent.length; i += 1) {
      tabcontent[i].style.display = 'none';
  }
  tablinks = document.getElementsByClassName('tablinks');
  for (i = 0; i < tablinks.length; i += 1) {
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
  } catch (e) {};
  $('#member-list-toggle').off().on('click', () => {
    $('#memberList').animate({ width: 'toggle' });
  });
  $('.modal').modal();
  // Toggle memberList
  $(document).on('click', (e) => {
    const target = $(e.target);
    // Hide member list when a click is made outside of memberlist window or deleteMemberModal
    if (!(target.is('#member-list-toggle'))) {
      if(!target.parents('#memberList').length) {
        if(!target.parents('#deleteMemberModal').length) {
          $('#memberList').fadeOut();
        }
      }
    }
  });
}, false);

