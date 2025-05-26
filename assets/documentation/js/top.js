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

    function initNavbarJS() {
        // Animation des sections au scroll
        const sections = document.querySelectorAll('.project-section');
        
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

        // Gestion du menu mobile
        const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
        const sidebar = document.querySelector('#sidebar');

        if (mobileNavToggle && sidebar) {
            mobileNavToggle.addEventListener('click', () => {
                sidebar.classList.toggle('active');
                mobileNavToggle.classList.toggle('bi-list');
                mobileNavToggle.classList.toggle('bi-x');
            });
        }

        // Fermer le menu mobile lors du clic sur un lien
        document.querySelectorAll('#sidebar .nav-link').forEach(navLink => {
            navLink.addEventListener('click', () => {
                if (sidebar.classList.contains('active')) {
                    sidebar.classList.remove('active');
                    mobileNavToggle.classList.add('bi-list');
                    mobileNavToggle.classList.remove('bi-x');
                }
            });
        });
    }

    // Charger dynamiquement le footer
    fetch('../components/footer.html')
        .then(response => response.text())
        .then(data => {
            document.body.insertAdjacentHTML('beforeend', data);
        });

    // Animation des sections au scroll
    const sections = document.querySelectorAll('.project-section');
    
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

    // Gestion du menu mobile
    const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
    const sidebar = document.querySelector('#sidebar');

    if (mobileNavToggle && sidebar) {
        mobileNavToggle.addEventListener('click', () => {
            sidebar.classList.toggle('active');
            mobileNavToggle.classList.toggle('bi-list');
            mobileNavToggle.classList.toggle('bi-x');
        });
    }

    // Fermer le menu mobile lors du clic sur un lien
    document.querySelectorAll('#sidebar .nav-link').forEach(navLink => {
        navLink.addEventListener('click', () => {
            if (sidebar.classList.contains('active')) {
                sidebar.classList.remove('active');
                mobileNavToggle.classList.add('bi-list');
                mobileNavToggle.classList.remove('bi-x');
            }
        });
    });
}); 