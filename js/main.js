// ===============================
// SPLASH / OPENING SCREEN
// ===============================

const splash = document.getElementById('splash');
const site = document.getElementById('site');

// 1.15 sec ke baad fade start hoga
setTimeout(() => {
    splash.style.transition = 'opacity 0.35s ease';
    splash.style.opacity = '0';
}, 1150);

// Total 1.5 sec ke baad opening screen remove ho jayegi
setTimeout(() => {
    splash.style.display = 'none';
    site.classList.remove('hidden');
    window.scrollTo(0, 0);
}, 1500);


// ===============================
// MOBILE MENU
// ===============================

const toggle = document.getElementById('menuToggle');
const drawer = document.getElementById('mobileDrawer');

toggle?.addEventListener('click', () => {
    drawer.classList.toggle('open');
});

drawer?.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
        drawer.classList.remove('open');
    });
});


// ===============================
// SEARCH
// ===============================

const searchBtn = document.getElementById('searchBtn');
const searchPop = document.getElementById('searchPop');
const closeSearch = document.getElementById('closeSearch');

searchBtn.addEventListener('click', () => {

    searchPop.classList.toggle('open');

    if (searchPop.classList.contains('open')) {
        document.getElementById('searchInput').focus();
    }

});

closeSearch.addEventListener('click', () => {
    searchPop.classList.remove('open');
});


// ===============================
// ACTIVE NAVBAR LINK ON SCROLL
// ===============================

window.addEventListener('scroll', () => {

    document.querySelectorAll('.desktop-nav a').forEach(a => {
        a.classList.remove('active');
    });

    const y = window.scrollY;

    let active = '#top';

    if (y > 520 && y < 960) {
        active = '#menu';
    }

    if (y >= 960 && y < 1250) {
        active = '#about';
    }

    if (y >= 1250) {
        active = '#offers';
    }

    document
        .querySelector(`.desktop-nav a[href="${active}"]`)
        ?.classList.add('active');

});