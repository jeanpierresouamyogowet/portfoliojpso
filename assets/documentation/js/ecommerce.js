document.addEventListener('DOMContentLoaded', function() {

        // Charger dynamiquement la navbar
        fetch('../components/navbar.html')
        .then(response => response.text())
        .then(data => {
            const header = document.getElementById('header');
            if (header) {
                header.innerHTML = data;
            }
            initNavbarJS();
        });
    
    // Animation des sections au défilement
    const sections = document.querySelectorAll('.ecommerce-section');
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px'
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
        observer.observe(section);
    });

    // Gestion du bouton "Retour en haut"
    const backToTop = document.querySelector('.back-to-top');
    
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

    // Animation des cases à cocher des compétences
    const competenceCheckboxes = document.querySelectorAll('.competence-header input[type="checkbox"]');
    
    competenceCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            const competenceItem = this.closest('.competence-item');
            if (this.checked) {
                competenceItem.style.transform = 'scale(1.02)';
                competenceItem.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.2)';
            } else {
                competenceItem.style.transform = 'scale(1)';
                competenceItem.style.boxShadow = '0 3px 10px rgba(0, 0, 0, 0.1)';
            }
        });
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
}); 