// Smooth slide transition between pages
document.addEventListener('DOMContentLoaded', () => {
    // Fade in on load
    document.body.classList.add('page-enter');
    requestAnimationFrame(() => {
        requestAnimationFrame(() => {
            document.body.classList.add('page-enter-active');
        });
    });

    // Intercept nav link clicks
    document.querySelectorAll('.bottom-nav .nav-item').forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            if (!href || link.classList.contains('active')) return;

            e.preventDefault();

            document.body.classList.add('page-exit');

            setTimeout(() => {
                window.location.href = href;
            }, 220);
        });
    });
});