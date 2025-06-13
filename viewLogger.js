
// Log a view event with a label (e.g., page/component name)
function logView(label) {
    const logs = JSON.parse(localStorage.getItem('viewLogs') || '[]');
    logs.push({
        label,
        timestamp: new Date().toISOString()
    });
    localStorage.setItem('viewLogs', JSON.stringify(logs));
}

// Retrieve all view logs
function getViewLogs() {
    return JSON.parse(localStorage.getItem('viewLogs') || '[]');
}

// Clear all view logs
function clearViewLogs() {
    localStorage.removeItem('viewLogs');
}

// Export functions for use in other scripts
window.viewLogger = {
    logView,
    getViewLogs,
    clearViewLogs
};
