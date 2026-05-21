/* ─────────────────────────────────────────────────────────
   U Festival — app.js
   Handles: dark/light theme · NL/EN language · page transitions
   ───────────────────────────────────────────────────────── */

const TRANSLATIONS = {
    nl: {
        /* Nav */
        'nav.home':    'Home',
        'nav.info':    'Info',
        'nav.lineup':  'Line-up',
        'nav.map':     'Kaart',

        /* Home */
        'home.welcome': 'WELKOM OP HET',

        /* Info */
        'info.label':   'FESTIVAL',
        'info.title':   'INFORMATIE',
        'info.p1': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam at euam festda ut elegent, elenendi les risus. Morbi dignissim felis et augue bibendum.',
        'info.p2': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam et euavi festda ut ornare. Pellentesque habitant morbi tristique senectus et netus.',
        'info.p3': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam at euam festda ut elegent, elenendi les risus nec lacinia.',
        'info.date.label':     'DATUM',
        'info.date.value':     '12 – 13 juli 2025',
        'info.location.label': 'LOCATIE',
        'info.location.value': 'Utrecht, Nederland',
        'info.access.label':   'TOEGANG',
        'info.access.value':   'Vanaf 18:00 uur',

        /* Schedule */
        'schedule.label':    'LINE-UP',
        'schedule.title':    'SCHEMA',
        'schedule.saturday': 'Zaterdag',
        'schedule.sunday':   'Zondag',
        'schedule.day':      'DAG',
        'schedule.evening':  'AVOND',
        'schedule.artist':   'ARTIEST',
        'schedule.headliner':'HEADLINER',

        /* Map */
        'map.label':          'LOCATIE',
        'map.title':          'KAART',
        'map.you.line1':      'U BENT',
        'map.you.line2':      'HIER',
        'map.legend.you':     'Jouw locatie',
        'map.legend.grounds': 'Festivalterrein',
    },

    en: {
        /* Nav */
        'nav.home':    'Home',
        'nav.info':    'Info',
        'nav.lineup':  'Line-up',
        'nav.map':     'Map',

        /* Home */
        'home.welcome': 'WELCOME TO THE',

        /* Info */
        'info.label':   'FESTIVAL',
        'info.title':   'INFORMATION',
        'info.p1': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam at euam festda ut elegent. Morbi dignissim felis et augue bibendum, risus fringilla.',
        'info.p2': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam et euavi festda ut ornare. Pellentesque habitant morbi tristique senectus et netus.',
        'info.p3': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam at euam festda ut elegent, les risus nec lacinia accumsan.',
        'info.date.label':     'DATE',
        'info.date.value':     '12 – 13 July 2025',
        'info.location.label': 'LOCATION',
        'info.location.value': 'Utrecht, Netherlands',
        'info.access.label':   'ACCESS',
        'info.access.value':   'From 6:00 PM',

        /* Schedule */
        'schedule.label':    'LINE-UP',
        'schedule.title':    'SCHEDULE',
        'schedule.saturday': 'Saturday',
        'schedule.sunday':   'Sunday',
        'schedule.day':      'DAY',
        'schedule.evening':  'EVENING',
        'schedule.artist':   'ARTIST',
        'schedule.headliner':'HEADLINER',

        /* Map */
        'map.label':          'LOCATION',
        'map.title':          'MAP',
        'map.you.line1':      'YOU ARE',
        'map.you.line2':      'HERE',
        'map.legend.you':     'Your location',
        'map.legend.grounds': 'Festival grounds',
    }
};

/* ── Helpers ──────────────────────────────────────────── */
function getTheme() {
    return localStorage.getItem('ufestival-theme') || 'dark';
}
function getLang() {
    return localStorage.getItem('ufestival-lang') || 'nl';
}

function applyTheme(theme) {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem('ufestival-theme', theme);

    const btn = document.getElementById('theme-toggle');
    if (!btn) return;

    if (theme === 'light') {
        btn.classList.add('is-light');
        btn.setAttribute('aria-label', 'Schakel donkere modus');
    } else {
        btn.classList.remove('is-light');
        btn.setAttribute('aria-label', 'Schakel lichte modus');
    }
}

function applyLang(lang) {
    document.documentElement.dataset.lang = lang;
    document.documentElement.lang = lang === 'nl' ? 'nl' : 'en';
    localStorage.setItem('ufestival-lang', lang);

    const t = TRANSLATIONS[lang];

    /* Update all data-i18n elements */
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.dataset.i18n;
        if (t[key] !== undefined) el.textContent = t[key];
    });

    /* Update SVG text nodes in map */
    const svgLine1 = document.getElementById('map-you-line1');
    const svgLine2 = document.getElementById('map-you-line2');
    if (svgLine1) svgLine1.textContent = t['map.you.line1'];
    if (svgLine2) svgLine2.textContent = t['map.you.line2'];

    /* Update lang badge on button */
    const langBtn = document.getElementById('lang-toggle');
    if (langBtn) {
        langBtn.dataset.label = lang.toUpperCase();
        langBtn.setAttribute('aria-label', lang === 'nl' ? 'Switch to English' : 'Schakel naar Nederlands');
    }

    /* Swap flag image */
    const flagImg = document.getElementById('flag-icon');
    if (flagImg) {
        flagImg.src = lang === 'nl'
            ? 'svg_files/nederland_flag.svg'
            : 'svg_files/uk_flag.svg';
        flagImg.alt = lang === 'nl' ? 'NL' : 'EN';
    }
}

/* ── Boot ─────────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {

    /* Apply saved preferences */
    applyTheme(getTheme());
    applyLang(getLang());

    /* ── Page transition: fade in ── */
    document.body.classList.add('page-enter');
    requestAnimationFrame(() => {
        requestAnimationFrame(() => {
            document.body.classList.add('page-enter-active');
        });
    });

    /* ── Theme toggle ── */
    document.getElementById('theme-toggle')?.addEventListener('click', () => {
        const next = getTheme() === 'dark' ? 'light' : 'dark';
        applyTheme(next);
    });

    /* ── Language toggle ── */
    document.getElementById('lang-toggle')?.addEventListener('click', () => {
        const next = getLang() === 'nl' ? 'en' : 'nl';
        applyLang(next);
    });

    /* ── Nav link transitions ── */
    document.querySelectorAll('.bottom-nav .nav-item').forEach(link => {
        link.addEventListener('click', e => {
            const href = link.getAttribute('href');
            if (!href || link.classList.contains('active')) return;
            e.preventDefault();
            document.body.classList.add('page-exit');
            setTimeout(() => { window.location.href = href; }, 220);
        });
    });

    /* ── Schedule day toggle (schedule page only) ── */
    document.querySelectorAll('.day-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.day-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const target = btn.dataset.day;
            document.querySelectorAll('.day-schedule').forEach(s => {
                s.classList.toggle('hidden', s.id !== target);
            });
        });
    });

    /* ── Service Worker registration ── */
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('./sw.js')
            .then(reg => {
                console.log('[SW] Registered, scope:', reg.scope);

                /* Show update banner if a new SW is waiting */
                reg.addEventListener('updatefound', () => {
                    const newWorker = reg.installing;
                    newWorker?.addEventListener('statechange', () => {
                        if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                            showUpdateBanner();
                        }
                    });
                });
            })
            .catch(err => console.warn('[SW] Registration failed:', err));

        /* Reload once new SW has taken control */
        navigator.serviceWorker.addEventListener('controllerchange', () => {
            window.location.reload();
        });
    }

    /* ── "Add to Home Screen" prompt ── */
    let deferredPrompt = null;
    window.addEventListener('beforeinstallprompt', e => {
        e.preventDefault();
        deferredPrompt = e;
        showInstallBanner();
    });
});

/* ── Update available banner ─────────────────────────── */
function showUpdateBanner() {
    const lang = getLang();
    const msg  = lang === 'nl' ? 'Update beschikbaar' : 'Update available';
    const btn  = lang === 'nl' ? 'Vernieuwen'         : 'Refresh';
    showBanner(msg, btn, () => {
        navigator.serviceWorker.controller?.postMessage({ type: 'SKIP_WAITING' });
    });
}

/* ── Install banner ──────────────────────────────────── */
function showInstallBanner() {
    const lang = getLang();
    const msg  = lang === 'nl' ? 'Voeg toe aan beginscherm' : 'Add to Home Screen';
    const btn  = lang === 'nl' ? 'Installeren'              : 'Install';
    showBanner(msg, btn, async () => {
        if (!window._deferredPrompt) return;
        window._deferredPrompt.prompt();
        const { outcome } = await window._deferredPrompt.userChoice;
        if (outcome === 'accepted') hideBanner();
        window._deferredPrompt = null;
    });

    /* Store for the click handler */
    window.addEventListener('beforeinstallprompt', e => { window._deferredPrompt = e; });
}

/* ── Generic banner helper ───────────────────────────── */
function showBanner(message, buttonText, onAction) {
    if (document.getElementById('pwa-banner')) return; /* already shown */

    const banner = document.createElement('div');
    banner.id = 'pwa-banner';
    banner.innerHTML = `
        <span class="pwa-banner-msg">${message}</span>
        <div class="pwa-banner-actions">
            <button class="pwa-banner-btn" id="pwa-action-btn">${buttonText}</button>
            <button class="pwa-banner-close" id="pwa-close-btn">✕</button>
        </div>
    `;
    document.body.appendChild(banner);

    /* Animate in */
    requestAnimationFrame(() => banner.classList.add('pwa-banner-show'));

    document.getElementById('pwa-action-btn').addEventListener('click', onAction);
    document.getElementById('pwa-close-btn').addEventListener('click', hideBanner);
}

function hideBanner() {
    const banner = document.getElementById('pwa-banner');
    if (!banner) return;
    banner.classList.remove('pwa-banner-show');
    setTimeout(() => banner.remove(), 300);
}