// assets/js/script.js

// Mobile nav toggle
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.getElementById('navLinks');
if (navToggle) {
  navToggle.addEventListener('click', () => {
    const open = navLinks.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
  });
}

// Year
document.getElementById('year').textContent = new Date().getFullYear();

// Load projects from JSON
async function loadProjects() {
  try {
    const res = await fetch('data/projects.json');
    const projects = await res.json();
    const grid = document.getElementById('projectGrid');

    projects.forEach(p => {
      const card = document.createElement('article');
      card.className = 'card';

      card.innerHTML = `
        <img src="${p.image}" alt="${p.title} screenshot" />
        <h3>${p.title}</h3>
        <p class="meta">${p.stack.join(' • ')}</p>
        <p>${p.summary}</p>
        <div class="badges">
          ${p.highlights.map(h => `<span class="badge">${h}</span>`).join('')}
        </div>
        <div class="resume-card">
          <a class="btn btn-primary" href="${p.demo}" target="_blank" rel="noopener">Live Demo</a>
          <a class="btn btn-outline" href="${p.repo}" target="_blank" rel="noopener">Source</a>
          ${p.caseStudy ? `<a class="btn btn-outline" href="${p.caseStudy}" target="_blank" rel="noopener">Case Study</a>` : ''}
        </div>
      `;
      grid.appendChild(card);
    });
  } catch (e) {
    console.error('Error loading projects', e);
    document.getElementById('projectGrid').innerHTML = `
      <div class="card"><h3>Projects unavailable</h3>
      <p>Please refresh or check your network. You can still visit my GitHub for source code.</p></div>`;
  }
}
loadProjects();

// Contact form (static demo)
// Replace with a real email service (EmailJS, Formspree) before going live
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const status = contactForm.querySelector('.form-status');
    status.textContent = 'Sending...';

    const data = {
      name: contactForm.name.value.trim(),
      email: contactForm.email.value.trim(),
      message: contactForm.message.value.trim()
    };

    // Simulate success
    setTimeout(() => {
      status.textContent = 'Message sent! I will get back to you soon.';
      contactForm.reset();
    }, 800);
  });
}
