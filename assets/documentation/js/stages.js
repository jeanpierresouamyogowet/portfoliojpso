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

    // Preloader
    const preloader = document.createElement('div');
    preloader.className = 'preloader';
    preloader.innerHTML = `
        <div class="preloader-content">
            <div class="preloader-spinner"></div>
        </div>
    `;
    document.body.appendChild(preloader);

    // Hide preloader when page is loaded
    window.addEventListener('load', () => {
        preloader.style.opacity = '0';
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 500);
    });

    // Animation des sections au scroll
    const sections = document.querySelectorAll('.stage-section');
    
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
                const headerOffset = 100;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

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

    // Add hover effect to sub-sections
    const subSections = document.querySelectorAll('.sub-section');
    subSections.forEach(section => {
        section.addEventListener('mouseenter', () => {
            section.style.transform = 'translateX(5px)';
        });
        section.addEventListener('mouseleave', () => {
            section.style.transform = 'translateX(0)';
        });
    });

    function setupSimpleCarousel(imageList, imgId, labelId, prevId, nextId) {
        let index = 0;
    
        const img = document.getElementById(imgId);
        const label = document.getElementById(labelId);
        const prevBtn = document.getElementById(prevId);
        const nextBtn = document.getElementById(nextId);
    
        function updateCarousel() {
            img.src = imageList[index].path;
            label.textContent = imageList[index].label;
        }
    
        prevBtn.addEventListener('click', () => {
            index = (index - 1 + imageList.length) % imageList.length;
            updateCarousel();
        });
    
        nextBtn.addEventListener('click', () => {
            index = (index + 1) % imageList.length;
            updateCarousel();
        });
    
        updateCarousel(); // init
    }
    
    // Charger les images des documents
    const clientLegerImages = Array.from({ length: 13 }, (_, i) => ({
        path: `../../autres/docuLeger/docuLegerp${i + 1}.png`,
        label: `Page ${i + 1}`
    }));
    
    const clientLourdImages = [
        { path: '../../autres/docuLourd/docuLourdp1.jpg', label: 'Page 1' },
        ...Array.from({ length: 6 }, (_, i) => ({
            path: `../../autres/docuLourd/docuLourdp${i + 2}.png`,
            label: `Page ${i + 2}`
        }))
    ];
    
    // Initialisation
    setupSimpleCarousel(clientLegerImages, 'preview-leger', 'label-leger', 'prev-leger', 'next-leger');
    setupSimpleCarousel(clientLourdImages, 'preview-lourd', 'label-lourd', 'prev-lourd', 'next-lourd');

    // Fonction pour gérer le zoom et le déplacement des images
    function setupImageZoom(element) {
        let isZoomed = false;
        let startX, startY, translateX = 0, translateY = 0;
        let lastTranslateX = 0, lastTranslateY = 0;
        const img = element.querySelector('img');
        let scale = 1;
        const maxScale = 2;
        
        function updateTransform() {
            img.style.transform = `scale(${scale}) translate(${translateX}px, ${translateY}px)`;
        }

        function resetZoom() {
            element.classList.remove('zoomed');
            isZoomed = false;
            scale = 1;
            translateX = lastTranslateX = 0;
            translateY = lastTranslateY = 0;
            img.style.transform = 'scale(1)';
        }

        function constrainPosition(x, y) {
            const maxX = (img.offsetWidth * (scale - 1)) / 2;
            const maxY = (img.offsetHeight * (scale - 1)) / 2;
            return {
                x: Math.min(Math.max(x, -maxX), maxX),
                y: Math.min(Math.max(y, -maxY), maxY)
            };
        }

        // Gestion du clic pour le zoom
        element.addEventListener('click', (e) => {
            if (!isZoomed) {
                element.classList.add('zoomed');
                isZoomed = true;
                scale = maxScale;
                
                // Calculer la position initiale pour centrer sur le point de clic
                const rect = element.getBoundingClientRect();
                const mouseX = e.clientX - rect.left;
                const mouseY = e.clientY - rect.top;
                
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                translateX = (centerX - mouseX) * (scale - 1);
                translateY = (centerY - mouseY) * (scale - 1);
                
                const constrained = constrainPosition(translateX, translateY);
                translateX = constrained.x;
                translateY = constrained.y;
                
                updateTransform();
            } else {
                resetZoom();
            }
        });

        // Gestion du déplacement
        element.addEventListener('mousemove', (e) => {
            if (!isZoomed) return;
            
            const rect = element.getBoundingClientRect();
            const mouseX = e.clientX - rect.left;
            const mouseY = e.clientY - rect.top;
            
            // Calculer le déplacement relatif à la position de la souris
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            translateX = (centerX - mouseX) * (scale - 1);
            translateY = (centerY - mouseY) * (scale - 1);
            
            const constrained = constrainPosition(translateX, translateY);
            translateX = constrained.x;
            translateY = constrained.y;
            
            updateTransform();
        });

        // Gestion de la molette de la souris pour le zoom
        element.addEventListener('wheel', (e) => {
            if (!isZoomed) return;
            e.preventDefault();
            
            const delta = e.deltaY > 0 ? -0.1 : 0.1;
            const newScale = Math.min(Math.max(scale + delta, 1), maxScale);
            
            if (newScale !== scale) {
                scale = newScale;
                
                // Ajuster la position pour zoomer vers le curseur
                const rect = element.getBoundingClientRect();
                const mouseX = e.clientX - rect.left;
                const mouseY = e.clientY - rect.top;
                
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                translateX = (centerX - mouseX) * (scale - 1);
                translateY = (centerY - mouseY) * (scale - 1);
                
                const constrained = constrainPosition(translateX, translateY);
                translateX = constrained.x;
                translateY = constrained.y;
                
                updateTransform();
            }
        });

        // Empêcher le comportement par défaut du drag
        element.addEventListener('dragstart', (e) => e.preventDefault());
    }

    // Appliquer le zoom aux carousels et au tableau de synthèse
    const carouselPreviews = document.querySelectorAll('.carousel-preview');
    const tableauPreview = document.querySelector('.tableau-preview');
    
    carouselPreviews.forEach(preview => setupImageZoom(preview));
    if (tableauPreview) setupImageZoom(tableauPreview);

    // Charger dynamiquement le footer
    fetch('../components/footer.html')
        .then(response => response.text())
        .then(data => {
            document.body.insertAdjacentHTML('beforeend', data);
        });
}); 