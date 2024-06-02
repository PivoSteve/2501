document.getElementById('reload-button').addEventListener('click', function() {
    location.reload();
});

document.getElementById('home-button').addEventListener('click', function() {
    if (location.pathname === '/2501/oldfashion/' || location.pathname === '/2501/') {        
        location.href = '/2501/';
    } else {
        location.href = '/';
    }
});