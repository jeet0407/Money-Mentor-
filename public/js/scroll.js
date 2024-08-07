document.addEventListener('DOMContentLoaded', function() {
    const links = document.querySelectorAll('#list a');
    const sections = document.querySelectorAll('.mainContent h2, .mainContent h3');

    // Function to remove 'active' class from all links
    const removeActiveClasses = () => {
        links.forEach(link => link.classList.remove('active'));
    };

    // Function to add 'active' class to the current section link
    const addActiveClass = () => {
        let index = sections.length;

        while (--index && window.scrollY + 50 < sections[index].offsetTop) {}

        removeActiveClasses();
        links[index].classList.add('active');
    };

    // Event listener for scroll event
    window.addEventListener('scroll', addActiveClass);
    addActiveClass(); // Call the function initially to set the first active link
});