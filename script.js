document.addEventListener('DOMContentLoaded', function () {
    const header = document.getElementById('smartHeader');
    const headerHeight = header.offsetHeight;
    let lastScrollTop = window.pageYOffset || document.documentElement.scrollTop;
    let currentTranslateY = 0;

    // Throttle / rAF optimization not strictly needed for simple logic but good for performance
    // Simple direct implementation:

    window.addEventListener('scroll', function () {
        let st = window.pageYOffset || document.documentElement.scrollTop;

        if (st < 0) st = 0; // iOS bound

        const diff = st - lastScrollTop;

        // If scrolling down (diff > 0), translate becomes more negative (moves up)
        // If scrolling up (diff < 0), translate becomes less negative (moves down)

        currentTranslateY -= diff;

        // Clamp values:
        // We cannot translate more than 0 (fully visible)
        // We cannot translate less than -headerHeight (fully hidden)

        if (currentTranslateY > 0) {
            currentTranslateY = 0;
        }
        if (currentTranslateY < -headerHeight) {
            currentTranslateY = -headerHeight;
        }

        header.style.transform = `translateY(${currentTranslateY}px)`;
        lastScrollTop = st;
    }, { passive: true });
});
