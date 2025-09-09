// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", function(e) {
    e.preventDefault();
    const targetId = this.getAttribute("href");
    const targetElement = document.querySelector(targetId);

    if (targetElement) {
      // Calculate offset for fixed navbar
      const navbarHeight = document.querySelector('.navbar').offsetHeight;
      const elementPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - navbarHeight - 20; // Added extra 20px for padding

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  });
});

// Navbar background change on scroll
const navbar = document.querySelector('.navbar');
const heroSection = document.getElementById('hero'); // Get the hero section

window.addEventListener('scroll', () => {
  if (window.scrollY > heroSection.offsetHeight - navbar.offsetHeight) { // When scrolled past hero section
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// Active navigation link on scroll
const sections = document.querySelectorAll('section[id]'); // Get all sections with an ID
const navLinks = document.querySelectorAll('.nav-link');

function updateActiveNavLink() {
  let currentActive = '';

  sections.forEach(section => {
    const sectionTop = section.offsetTop - navbar.offsetHeight - 30; // Adjust for navbar height and some padding
    const sectionHeight = section.clientHeight;

    if (window.pageYOffset >= sectionTop && window.pageYOffset < sectionTop + sectionHeight) {
      currentActive = section.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href').includes(currentActive)) {
      link.classList.add('active');
    }
  });
}

// Initial call and add event listener
window.addEventListener('scroll', updateActiveNavLink);
window.addEventListener('load', updateActiveNavLink); // Also update on page load
