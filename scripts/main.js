// IIFE (Immediately Invoked Function Expression) to avoid polluting the global scope
(function () {
    // Event listener for the window load event
    window.addEventListener('load', function () {
        // Get navigation timing entries
        const [navigation] = performance.getEntriesByType('navigation');
        // Calculate the load time
        const loadTime = navigation.domContentLoadedEventEnd - navigation.startTime;
        // Select the footer element
        const footer = document.querySelector('.footer');
        // Create a new paragraph element
        const loadTimeInfo = document.createElement('p');
        // Set the text content of the paragraph to the load time
        loadTimeInfo.textContent = `Время загрузки страницы: ${loadTime.toFixed(2)} мс`;
        // Append the paragraph to the footer
        footer.appendChild(loadTimeInfo);
    });
})();

// Event listener for the DOMContentLoaded event
document.addEventListener('DOMContentLoaded', function () {
    // Select all navigation links
    const navLinks = document.querySelectorAll('.header__nav-link');
    // Get the current location path
    const currentLocation = document.location.pathname.split('/').pop();

    // Iterate over each navigation link
    navLinks.forEach(link => {
        // Check if the link's href matches the current location
        if (link.getAttribute('href') === currentLocation) {
            // Add the active class to the link
            link.classList.add('active');
        }
    });
});