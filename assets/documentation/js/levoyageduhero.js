// Fonction pour charger la navbar
async function loadNavbar() {
    try {
        const response = await fetch('../components/navbar.html');
        const html = await response.text();
        document.getElementById('vh-header').innerHTML = html;
    } catch (error) {
        console.error('Erreur lors du chargement de la navbar:', error);
    }
}

// Fonction pour initialiser AOS (Animate On Scroll)
function initAOS() {
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true,
        mirror: false
    });
}

// Fonction pour gérer le bouton "Back to top"
function initBackToTop() {
    const backToTopButton = document.querySelector('.vh-back-to-top');
    
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

// Exécuter l'initialisation quand le DOM est chargé
document.addEventListener('DOMContentLoaded', init);

document.addEventListener('DOMContentLoaded', function() {
    // Animation des sections au scroll
    const sections = document.querySelectorAll('section');
    
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 0.5s ease-out, transform 0.5s ease-out';
        observer.observe(section);
    });

    // Smooth scroll pour les ancres
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Gestion de la galerie d'images
    const galleryGrid = document.querySelector('.gallery-grid');
    if (galleryGrid) {
        // Ajouter des images à la galerie
        const images = [
            // Ajoutez ici les chemins vers vos images
        ];

        images.forEach(imagePath => {
            const imgContainer = document.createElement('div');
            imgContainer.className = 'gallery-item';
            
            const img = document.createElement('img');
            img.src = imagePath;
            img.alt = 'Project screenshot';
            
            imgContainer.appendChild(img);
            galleryGrid.appendChild(imgContainer);
        });
    }
}); 