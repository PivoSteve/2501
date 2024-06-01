var sidebarsettings = document.getElementById('sidebar-settings');
var listbar = document.getElementById('listbar');

document.getElementById('toggle-button').addEventListener('click', function() {
    listbar.classList.toggle('open');
    if (sidebarsettings.classList.contains('open')) {
        sidebarsettings.classList.remove('open');
    }
});

document.getElementById('settings').addEventListener('click', function() {
    sidebarsettings.classList.toggle('open');
});

document.getElementById('socials').addEventListener('click', function() {
    sidebarsettings.classList.toggle('open');
});

document.getElementById('reload-button').addEventListener('click', function() {
    document.querySelector('body').classList.add('hidden');
    setTimeout(function() {
        location.reload();
    }, 500);
});

document.getElementById('home-button').addEventListener('click', function() {
    document.querySelector('body').classList.add('hidden');
    setTimeout(function() {
        location.href = '/';
    }, 500);
});