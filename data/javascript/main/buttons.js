var sidebarcreations = document.getElementById('sidebar-creations');
var listbar = document.getElementById('listbar');

document.getElementById('toggle-button').addEventListener('click', function() {
    listbar.classList.toggle('open');
    if (sidebarcreations.classList.contains('open')) {
        sidebarcreations.classList.remove('open');
    }
});

document.getElementById('creations').addEventListener('click', function() {
    sidebarcreations.classList.toggle('open');
});

document.getElementById('socials').addEventListener('click', function() {
    sidebarcreations.classList.toggle('open');
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
        if (location.pathname === '/2501/pseudoterminal/' || location.pathname === '/2501/') {        
            location.href = '/2501/';
        } else {
            location.href = '/';
        }
    }, 500);
});
