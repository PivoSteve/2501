document.addEventListener("DOMContentLoaded", () => {
    var sidebarsettings = document.getElementById('sidebar-settings');
    var sidebarlogin = document.getElementById('sidebar-login');
    var listbar = document.getElementById('listbar');   
    var loginTitle = document.getElementById("login-title");
    var loginForm = document.getElementById("login-form");
    var profile = document.getElementById("profile");
    var profileUsername = document.getElementById("profile-username");
    var currentTime = document.getElementById("current-time");
    var logoutButton = document.getElementById("logoutButton");
    var sendMessageButton = document.getElementById("sendMessageButton");
    var messageInput = document.getElementById("messageInput");
    
    document.getElementById('toggle-button').addEventListener('click', function() {
        listbar.classList.toggle('open');
        if (sidebarlogin.classList.contains('open')) {
            sidebarlogin.classList.remove('open');
            localStorage.setItem("sidebarOpen", "false");
        }
    });

    document.getElementById('login').addEventListener('click', function() {
        if (sidebarsettings.classList.contains('open')) {
            sidebarsettings.classList.remove('open');
        }
        if (document.getElementById('socials').classList.contains('open')) {
            document.getElementById('socials').classList.remove('open');
        }
        sidebarlogin.classList.toggle('open');
    });

    document.getElementById('settings').addEventListener('click', function() {
        if (sidebarlogin.classList.contains('open')) {
            sidebarlogin.classList.remove('open');
        }
        if (document.getElementById('socials').classList.contains('open')) {
            document.getElementById('socials').classList.remove('open');
        }
        sidebarsettings.classList.toggle('open');
    });

    document.getElementById('socials').addEventListener('click', function() {
        if (sidebarlogin.classList.contains('open')) {
            sidebarlogin.classList.remove('open');
        }
        if (sidebarsettings.classList.contains('open')) {
            sidebarsettings.classList.remove('open');
        }
        sidebarlogin.classList.toggle('open');
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
            if (location.pathname === '/2501/pseudoterminal/') {        
                location.href = '/2501/';
            } else {
                location.href = '/';
            }
        }, 500);
    });

    if (localStorage.getItem("logined") === "true") {
        loginTitle.style.display = 'none';
        loginForm.style.display = 'none';
        profile.style.display = 'block';
        sendMessageButton.style.display = 'block';
        messageInput.style.display = 'block';
        profileUsername.textContent = `Username: ${localStorage.getItem("username")}`;
        updateTime();
    } else {
        loginTitle.style.display = 'block';
        loginForm.style.display = 'block';
        profile.style.display = 'none';
        sendMessageButton.style.display = 'none';
        messageInput.style.display = 'none';
    }

    loginForm.addEventListener("submit", (event) => {
        event.preventDefault();
        const username = document.getElementById("login-username").value;
        localStorage.setItem("logined", "true");
        localStorage.setItem("username", username);
        localStorage.setItem("sidebarOpen", "true");
        document.getElementById("login-username").value = '';
        document.querySelector('body').classList.add('hidden');
        setTimeout(function() {
            location.reload();
        }, 500);
    });

    logoutButton.addEventListener("click", () => {
        localStorage.removeItem("logined");
        localStorage.removeItem("username");
        localStorage.setItem("sidebarOpen", "true");
        document.querySelector('body').classList.add('hidden');
        setTimeout(function() {
            location.reload();
        }, 500);
    });

    if (localStorage.getItem("sidebarOpen") === "true") {
        listbar.classList.toggle('open');
        sidebarlogin.classList.add("open");
    }

    function updateTime() {
        setInterval(() => {
            currentTime.textContent = `Current time: ${new Date().toLocaleString()}`;
        }, 1000);
    }
});
