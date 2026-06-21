/**
 * Charge la navbar partagée dans n'importe quelle page.
 * Usage : <div id="navbar-placeholder"></div> + <script src="components/navbar.js"></script>
 */
async function loadNavbar() {
  const placeholder = document.getElementById('navbar-placeholder');
  if (!placeholder) return;

  try {
    const response = await fetch('navbar.html');
    const html = await response.text();
    placeholder.innerHTML = html;

    initNavbarBehavior();
  } catch (error) {
    console.error('Impossible de charger la navbar :', error);
  }
}

function initNavbarBehavior() {
  const toggle = document.getElementById('navbar-toggle');
  const links = document.getElementById('navbar-links');

  // Menu burger (mobile)
  toggle.addEventListener('click', () => {
    const isOpen = links.classList.toggle('open');
    toggle.classList.toggle('open', isOpen);
    toggle.setAttribute('aria-expanded', isOpen);
  });

  // Ferme le menu si on clique sur un lien (mobile)
  links.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      links.classList.remove('open');
      toggle.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    });
  });

  // Met en surbrillance le lien de la page courante
  const currentPage = document.body.dataset.page;
  if (currentPage) {
    const activeLink = links.querySelector(`a[data-page="${currentPage}"]`);
    if (activeLink) activeLink.classList.add('active');
  }
}

document.addEventListener('DOMContentLoaded', loadNavbar);
