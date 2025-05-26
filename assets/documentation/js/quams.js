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

    // Back to top button
    const backToTopButton = document.querySelector('.back-to-top');
    if (backToTopButton) {
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 100) {
                backToTopButton.style.display = 'flex';
            } else {
                backToTopButton.style.display = 'none';
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

    // Initialize AOS
    AOS.init({
        duration: 1000,
        easing: 'ease-in-out',
        once: true,
        mirror: false
    });

    // Charger dynamiquement le footer
    fetch('../components/footer.html')
        .then(response => response.text())
        .then(data => {
            document.body.insertAdjacentHTML('beforeend', data);
        });

    // Charger la navbar
    fetch('../components/navbar.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('header').innerHTML = data;
        });


    // Initialiser AOS (Animate On Scroll)
    AOS.init({
        duration: 1000,
        easing: 'ease-in-out',
        once: true,
        mirror: false
    });

    // Initialiser la galerie
    initGallery();
});

// Fonction pour initialiser la galerie
function initGallery() {
    const galleryGrid = document.querySelector('.gallery-grid');
    if (!galleryGrid) return;

    // Images de la galerie
    const galleryImages = [
        {
            src: '../img/quams.png',
            alt: 'Interface principale de QUAMS'
        },
        {
            src: '../img/quams-payment.png',
            alt: 'Interface de paiement avec Stripe'
        },
        {
            src: '../img/quams-admin.png',
            alt: 'Interface d\'administration'
        }
    ];

    // Créer les éléments de la galerie
    galleryImages.forEach(image => {
        const galleryItem = document.createElement('div');
        galleryItem.className = 'gallery-item';
        
        const img = document.createElement('img');
        img.src = image.src;
        img.alt = image.alt;
        
        galleryItem.appendChild(img);
        galleryGrid.appendChild(galleryItem);
    });

    // Initialiser GLightbox pour la galerie
    const lightbox = GLightbox({
        selector: '.gallery-item',
        touchNavigation: true,
        loop: true
    });
}

// Gestion du bouton "Retour en haut"
window.addEventListener('scroll', function() {
    const backToTop = document.querySelector('.back-to-top');
    if (backToTop) {
        if (window.scrollY > 100) {
            backToTop.style.display = 'flex';
        } else {
            backToTop.style.display = 'none';
        }
    }
}); 