(function () {
    // Increment page view count
    function incrementPageView() {
        let analytics = JSON.parse(localStorage.getItem('siteAnalytics') || '{}');
        analytics.pageViews = (analytics.pageViews || 0) + 1;
        localStorage.setItem('siteAnalytics', JSON.stringify(analytics));
    }

    // Increment interaction count for a given element
    function incrementInteraction(label) {
        let analytics = JSON.parse(localStorage.getItem('siteAnalytics') || '{}');
        analytics.interactions = analytics.interactions || {};
        analytics.interactions[label] = (analytics.interactions[label] || 0) + 1;
        localStorage.setItem('siteAnalytics', JSON.stringify(analytics));
    }

    // Attach click listeners to all buttons and links
    function trackInteractions() {
        document.querySelectorAll('button, a').forEach(el => {
            el.addEventListener('click', function () {
                const label = this.innerText || this.getAttribute('href') || 'unknown';
                incrementInteraction(label);
            });
        });
    }

    // Expose for admin panel
    window.siteAnalytics = {
        get: () => JSON.parse(localStorage.getItem('siteAnalytics') || '{}')
    };

    // Run on main site only (not admin panel)
    if (!window.location.pathname.includes('admin')) {
        incrementPageView();
        document.addEventListener('DOMContentLoaded', trackInteractions);
    }
})();
