// Get all dropdowns
const dropdowns = document.querySelectorAll('.dropdown');

dropdowns.forEach(drop => {
    const btn = drop.querySelector('a'); // fixed: selects the <a> inside
    btn.addEventListener('click', (e) => {
        e.preventDefault();

        // Close other open dropdowns
        dropdowns.forEach(d => {
            if (d !== drop) {
                d.querySelector('.dropdown-content').style.display = 'none';
            }
        });

        const content = drop.querySelector('.dropdown-content');
        // Toggle dropdown
        if (content.style.display === 'block') {
            content.style.display = 'none';
        } else {
            content.style.display = 'block';
        }
    });
});

// Close dropdown if clicked outside
window.addEventListener('click', function (e) {
    dropdowns.forEach(drop => {
        if (!drop.contains(e.target)) {
            drop.querySelector('.dropdown-content').style.display = 'none';
        }
    });
});
