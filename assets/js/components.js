// Fonction pour charger un composant HTML
async function loadComponent(elementId, componentPath) {
    try {
        const response = await fetch(componentPath);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const html = await response.text();
        document.getElementById(elementId).innerHTML = html;
    } catch (error) {
        console.error(`Error loading component ${componentPath}:`, error);
    }
}

// Fonction pour déterminer le chemin relatif vers les composants
function getComponentPath() {
    // Vérifier si nous sommes dans le dossier documentation
    const isInDocumentation = window.location.pathname.includes('/documentation/');
    return isInDocumentation ? '../assets/components/' : './assets/components/';
}

// Charger les composants quand le DOM est prêt
document.addEventListener('DOMContentLoaded', () => {
    const basePath = getComponentPath();
    
    // Charger la navbar
    loadComponent('navbar-container', `${basePath}navbar.html`);
    
    // Charger le footer
    loadComponent('footer-container', `${basePath}footer.html`);

    // Charger le bouton "haut de page"
    fetch('./assets/components/back-to-top.html')
        .then(response => response.text())
        .then(data => {
            document.body.insertAdjacentHTML('beforeend', data);
            
            // Gestion du bouton "haut de page"
            const backToTopButton = document.querySelector('.back-to-top');
            
            // Afficher/masquer le bouton selon le scroll
            window.addEventListener('scroll', () => {
                if (window.scrollY > 100) {
                    backToTopButton.style.display = 'flex';
                } else {
                    backToTopButton.style.display = 'none';
                }
            });

            // Gestion du clic sur le bouton
            backToTopButton.addEventListener('click', (e) => {
                e.preventDefault();
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            });
        });
}); 