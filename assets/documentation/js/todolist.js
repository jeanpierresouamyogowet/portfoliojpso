document.addEventListener('DOMContentLoaded', function() {
    // Animation des sections au scroll
    const sections = document.querySelectorAll('.todo-container section');
    
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        observer.observe(section);
    });

    // Smooth scroll pour les liens d'ancrage
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Gestion de la galerie
    const galleryItems = document.querySelectorAll('.todo-container .gallery-item');
    galleryItems.forEach(item => {
        item.addEventListener('click', function() {
            // Ajouter ici la logique pour ouvrir une lightbox si nécessaire
            console.log('Image clicked:', this.querySelector('img').src);
        });
    });

    // Bouton retour en haut
    const backToTop = document.querySelector('.todo-container .back-to-top');
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 100) {
            backToTop.style.display = 'flex';
        } else {
            backToTop.style.display = 'none';
        }
    });

    backToTop.addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Initialize AOS
    AOS.init({
        duration: 1000,
        easing: 'ease-in-out',
        once: true,
        mirror: false
    });
});

// Fonction pour charger la navbar
async function loadNavbar() {
    try {
        const response = await fetch('../components/navbar.html');
        const html = await response.text();
        document.getElementById('navbar-container').innerHTML = html;
    } catch (error) {
        console.error('Erreur lors du chargement de la navbar:', error);
    }
}

// Fonction pour charger le footer
async function loadFooter() {
    try {
        const response = await fetch('../components/footer.html');
        const html = await response.text();
        document.getElementById('footer-container').innerHTML = html;
    } catch (error) {
        console.error('Erreur lors du chargement du footer:', error);
    }
}

// Charger les composants au chargement de la page
document.addEventListener('DOMContentLoaded', () => {
    loadNavbar();
    loadFooter();
}); 