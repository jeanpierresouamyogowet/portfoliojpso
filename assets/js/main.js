(function() {
  "use strict";

  /**
   * Easy selector helper function
   */
  const select = (el, all = false) => {
    el = el.trim()
    if (all) {
      return [...document.querySelectorAll(el)]
    } else {
      return document.querySelector(el)
    }
  }

  /**
   * Easy event listener function
   */
  const on = (type, el, listener, all = false) => {
    let selectEl = select(el, all)
    if (selectEl) {
      if (all) {
        selectEl.forEach(e => e.addEventListener(type, listener))
      } else {
        selectEl.addEventListener(type, listener)
      }
    }
  }

  /**
   * Easy on scroll event listener 
   */
  const onscroll = (el, listener) => {
    el.addEventListener('scroll', listener)
  }

  /**
   * Navbar links active state on scroll
   */
 

  // NEWNAVBAR
  /**
 * Navbar links active state on scroll
 */
const sidebar = select('#sidebar');
if (sidebar) {
    let sidebarlinks = select('#sidebar .scrollto', true);
    const sidebarlinksActive = () => {
        let position = window.scrollY + 200;
        sidebarlinks.forEach(sidebarlink => {
            if (!sidebarlink.hash) return;
            let section = select(sidebarlink.hash);
            if (!section) return;
            if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
                sidebarlink.classList.add('active');
            } else {
                sidebarlink.classList.remove('active');
            }
        });
    };
    window.addEventListener('load', sidebarlinksActive);
    onscroll(document, sidebarlinksActive);
}

/**
 * Scrolls to an element with header offset
 */
const scrollto = (el) => {
  let header = select('#header');
  let offset = header ? header.offsetHeight : 0; // Vérifie si header existe

  if (header && !header.classList.contains('header-scrolled')) {
    offset -= 16; // Ajoute 16px de marge si le header n'est pas défilé
  }

  let additionalOffset = -60; // decallasge de 50px
  let elementPos = select(el).offsetTop;
  window.scrollTo({
    top: elementPos - offset - additionalOffset,
    behavior: 'smooth'
  });
};

/**
 * Mobile nav toggle
 */
on('click', '.mobile-nav-toggle', function(e) {
  select('#sidebar').classList.toggle('sidebar-mobile'); // Changé navbar en sidebar
  select('#sidebar').classList.toggle('active'); // Ajouté pour gérer la visibilité
  this.classList.toggle('bi-list');
  this.classList.toggle('bi-x');
});

/**
 * Mobile nav dropdowns activate
 */
on('click', '.sidebar .dropdown > a', function(e) { // Changé navbar en sidebar
  if (select('#sidebar').classList.contains('sidebar-mobile')) {
    e.preventDefault();
    this.nextElementSibling.classList.toggle('dropdown-active');
  }
}, true);

/**
 * Scroll with offset on links with a class name .scrollto
 */
on('click', '.scrollto', function(e) {
  if (select(this.hash)) {
    e.preventDefault();

    let sidebar = select('#sidebar'); // Changé navbar en sidebar
    if (sidebar.classList.contains('sidebar-mobile')) {
      sidebar.classList.remove('sidebar-mobile');
      sidebar.classList.remove('active'); // Fermer la sidebar
      let sidebarToggle = select('.mobile-nav-toggle');
      sidebarToggle.classList.toggle('bi-list');
      sidebarToggle.classList.toggle('bi-x');
    }
    scrollto(this.hash);
  }
}, true);
  // FIN NEWNAVBAR

  /**
   * Scroll with ofset on page load with hash links in the url
   */
  window.addEventListener('load', () => {
    if (window.location.hash) {
      if (select(window.location.hash)) {
        scrollto(window.location.hash)
      }
    }
  });

  // Curseur competences
  document.querySelectorAll('.skill-level-bar').forEach(bar => {
    const percent = bar.getAttribute('data-percent');
    bar.style.setProperty('--percent', `${percent}%`);
  });

  /**
   * Preloader
   */
  let preloader = select('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove()
    });
  }

  /**
   * Testimonials slider
  new Swiper('.testimonials-slider', {
    speed: 600,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    slidesPerView: 'auto',
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    },
    breakpoints: {
      320: {
        slidesPerView: 1,
        spaceBetween: 40
      },

      1200: {
        slidesPerView: 3,
        spaceBetween: 40
      }
    }
  }); 
  */
 
  /**
   * Porfolio isotope and filter
   */
  window.addEventListener('load', () => {
    let portfolioContainer = select('.portfolio-container');
    if (portfolioContainer) {
      let portfolioIsotope = new Isotope(portfolioContainer, {
        itemSelector: '.portfolio-item'
      });

      let portfolioFilters = select('#portfolio-flters li', true);

      on('click', '#portfolio-flters li', function(e) {
        e.preventDefault();
        portfolioFilters.forEach(function(el) {
          el.classList.remove('filter-active');
        });
        this.classList.add('filter-active');

        portfolioIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
        portfolioIsotope.on('arrangeComplete', function() {
          AOS.refresh()
        });
      }, true);
    }

  });

  /**
   * Initiate portfolio lightbox 
   */
  const portfolioLightbox = GLightbox({
    selector: '.portfolio-lightbox'
  });

  /**
   * Portfolio details slider
   */
  new Swiper('.portfolio-details-slider', {
    speed: 400,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    }
  });

  /**
   * Animation on scroll
   */
  window.addEventListener('load', () => {
    AOS.init({
      duration: 1000,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });

    // Ajout des animations pour les sections
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
      const elements = section.querySelectorAll('.container, .row, .col-md-4, .col-md-6, .col-lg-6, .col-lg-3, .col-lg-4, .section-title, .flip-card, .skill-level-wrap, .framework-details, .bento-item, .certification-item, .certification-rgpd');
      
      elements.forEach((element, index) => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        element.style.transitionDelay = `${index * 0.1}s`;
      });
    });

    // Fonction pour animer les éléments lors du scroll
    const animateOnScroll = () => {
      sections.forEach(section => {
        const sectionTop = section.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (sectionTop < windowHeight * 0.75) {
          const elements = section.querySelectorAll('.container, .row, .col-md-4, .col-md-6, .col-lg-6, .col-lg-3, .col-lg-4, .section-title, .flip-card, .skill-level-wrap, .framework-details, .bento-item, .certification-item, .certification-rgpd');
          
          elements.forEach(element => {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
          });
        }
      });
    };

    // Ajouter l'événement de scroll
    window.addEventListener('scroll', animateOnScroll);
    // Déclencher une première fois pour les éléments déjà visibles
    animateOnScroll();
  });

  // Cursor Animation
const cursor = document.createElement('div');
cursor.classList.add('custom-cursor');
document.body.appendChild(cursor);

document.addEventListener('mousemove', (e) => {
  cursor.style.left = `${e.pageX}px`;
  cursor.style.top = `${e.pageY}px`;
});

// Random bouncing animation
document.addEventListener('DOMContentLoaded', () => {
  // Sélectionne toutes les listes de frameworks
  const frameworkLists = document.querySelectorAll('.frameworks-list');

  frameworkLists.forEach(list => {
    const items = list.querySelectorAll('li');
    const container = list.parentElement; // Le div.col-md-6 parent

    items.forEach(item => {
      // Position initiale aléatoire
      let posX = Math.random() * (container.offsetWidth - item.offsetWidth);
      let posY = Math.random() * (container.offsetHeight - item.offsetHeight);
      let speedX = (Math.random() * 4 - 2); // Vitesse horizontale entre -2 et 2
      let speedY = (Math.random() * 4 - 2); // Vitesse verticale entre -2 et 2

      // Applique une position absolue pour permettre le mouvement
      item.style.position = 'absolute';
      item.style.left = `${posX}px`;
      item.style.top = `${posY}px`;
      item.style.transition = 'transform 0.1s ease'; // Transition fluide

      // Fonction d'animation
      function moveItem() {
        posX += speedX;
        posY += speedY;

        // Rebond sur les bords horizontaux
        if (posX <= 0 || posX >= container.offsetWidth - item.offsetWidth) {
          speedX = -speedX;
          posX = Math.max(0, Math.min(posX, container.offsetWidth - item.offsetWidth));
        }

        // Rebond sur les bords verticaux
        if (posY <= 0 || posY >= container.offsetHeight - item.offsetHeight) {
          speedY = -speedY;
          posY = Math.max(0, Math.min(posY, container.offsetHeight - item.offsetHeight));
        }

        // Applique la nouvelle position
        item.style.left = `${posX}px`;
        item.style.top = `${posY}px`;

        // Boucle d'animation
        requestAnimationFrame(moveItem);
      }

      // Démarre l'animation
      moveItem();
    });
  });
});

document.addEventListener('DOMContentLoaded', () => {
  const carousels = [
    {
      trackId: '#certifications-track',
      prevBtnClass: '.carousel-prev',
      nextBtnClass: '.carousel-next',
      dotsClass: '.carousel-dots'
    },
    {
      trackId: '#certifications-tracker',
      prevBtnClass: '.carousel-prev',
      nextBtnClass: '.carousel-next',
      dotsClass: '.carousel-dots'
    }
  ];

  carousels.forEach(carousel => {
    const track = document.querySelector(carousel.trackId);
    const items = track.querySelectorAll('.certification-item, .certification-rgpd');
    const prevBtn = track.parentElement.querySelector(carousel.prevBtnClass);
    const nextBtn = track.parentElement.querySelector(carousel.nextBtnClass);
    const dotsContainer = track.parentElement.querySelector(carousel.dotsClass);
    let currentIndex = 0;

    // Générer les dots dynamiquement
    items.forEach((_, index) => {
      const dot = document.createElement('div');
      dot.classList.add('dot');
      if (index === 0) dot.classList.add('active'); // Activer le premier dot
      dot.addEventListener('click', () => {
        currentIndex = index;
        updateCarousel();
      });
      dotsContainer.appendChild(dot);
    });

    const dots = dotsContainer.querySelectorAll('.dot');

    function updateCarousel() {
      track.style.transform = `translateX(-${currentIndex * 100}%)`;
      // Mettre à jour les dots actifs
      dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentIndex);
      });
    }

    prevBtn.addEventListener('click', () => {
      currentIndex = (currentIndex > 0) ? currentIndex - 1 : items.length - 1;
      updateCarousel();
    });

    nextBtn.addEventListener('click', () => {
      currentIndex = (currentIndex < items.length - 1) ? currentIndex + 1 : 0;
      updateCarousel();
    });

    updateCarousel();
  });
});// formulaire contact
document.querySelector('.php-email-form').addEventListener('submit', function (e) {
  e.preventDefault();
  const form = this;
  const loading = form.querySelector('.loading');
  const errorMessage = form.querySelector('.error-message');
  const sentMessage = form.querySelector('.sent-message');

  // Affiche "Loading"
  loading.style.display = 'block';
  errorMessage.style.display = 'none';
  sentMessage.style.display = 'none';

  // Envoie les données à Formspree
  fetch(form.action, {
    method: 'POST',
    body: new FormData(form),
    headers: { 'Accept': 'application/json' }
  })
  .then(response => response.json())
  .then(data => {
    loading.style.display = 'none';
    if (data.ok) {
      sentMessage.style.display = 'block';
      form.reset();
    } else {
      throw new Error(data.error || "Erreur lors de l'envoi");
    }
  })
  .catch(error => {
    loading.style.display = 'none';
    errorMessage.textContent = error.message || 'Une erreur est survenue. Veuillez réessayer.';
    errorMessage.style.display = 'block';
  });
});

// Optionnel : Auto-play (décommente si souhaité)
// setInterval(() => {
//   currentIndex = (currentIndex < items.length - 1) ? currentIndex + 1 : 0;
//   updateCarousel();
// }, 5000); // Change toutes les 5 secondes

document.addEventListener('DOMContentLoaded', function() {
  // Gestion des frameworks
  const frameworkItems = document.querySelectorAll('.frameworks-list li');
  let activeItem = null;

  function positionDetails(details, item) {
    const rect = item.getBoundingClientRect();
    const viewportWidth = window.innerWidth;
    const detailsWidth = 250; // Largeur de la bulle
    const margin = 10; // Marge entre l'élément et la bulle

    // Calculer la position horizontale
    let left;
    if (rect.right + detailsWidth + margin > viewportWidth) {
      // Positionner à gauche si pas assez d'espace à droite
      left = -detailsWidth - margin;
    } else {
      // Positionner à droite
      left = rect.width + margin;
    }

    // Calculer la position verticale
    const top = Math.min(0, -rect.height / 2);

    details.style.left = `${left}px`;
    details.style.top = `${top}px`;
  }

  frameworkItems.forEach(item => {
    const details = item.querySelector('.framework-details');
    if (!details) return;

    item.addEventListener('click', (e) => {
      e.stopPropagation();

      // Fermer la bulle active si on clique sur un autre élément
      if (activeItem && activeItem !== item) {
        activeItem.classList.remove('active');
        activeItem.querySelector('.framework-details').classList.remove('active');
      }

      // Toggle l'état actif
      item.classList.toggle('active');
      details.classList.toggle('active');

      // Mettre à jour l'élément actif
      activeItem = item.classList.contains('active') ? item : null;

      // Positionner la bulle
      if (item.classList.contains('active')) {
        positionDetails(details, item);
      }
    });
  });

  // Fermer la bulle en cliquant en dehors
  document.addEventListener('click', (e) => {
    if (activeItem && !activeItem.contains(e.target)) {
      activeItem.classList.remove('active');
      activeItem.querySelector('.framework-details').classList.remove('active');
      activeItem = null;
    }
  });

  // Repositionner la bulle lors du redimensionnement de la fenêtre
  window.addEventListener('resize', () => {
    if (activeItem) {
      const details = activeItem.querySelector('.framework-details');
      positionDetails(details, activeItem);
    }
  });
});

// Charger dynamiquement le footer
fetch('../components/footer.html')
    .then(response => response.text())
    .then(data => {
        document.body.insertAdjacentHTML('beforeend', data);
        // Charger le CSS du footer
        const footerCSS = document.createElement('link');
        footerCSS.rel = 'stylesheet';
        footerCSS.href = '../css/footer.css';
        document.head.appendChild(footerCSS);
    });
})()

