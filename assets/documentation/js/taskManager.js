// Fonction pour charger la navbar
async function loadNavbar() {
    try {
        const response = await fetch('../components/navbar.html');
        const html = await response.text();
        document.getElementById('tm-header').innerHTML = html;
    } catch (error) {
        console.error('Erreur lors du chargement de la navbar:', error);
    }
}

// Initialisation des animations AOS
function initAOS() {
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true
    });
}

// Gestion du bouton "Back to top"
function initBackToTop() {
    const backToTopButton = document.querySelector('.tm-back-to-top');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTopButton.classList.add('active');
        } else {
            backToTopButton.classList.remove('active');
        }
    });

    backToTopButton.addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Fonction d'initialisation
function init() {
    loadNavbar();
    initAOS();
    initBackToTop();
}

// Initialisation au chargement du DOM
document.addEventListener('DOMContentLoaded', init); 