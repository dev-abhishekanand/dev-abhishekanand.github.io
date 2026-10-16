// Interactive scripts for Abhishek Anand's Portfolio

document.addEventListener('DOMContentLoaded', () => {
  // 1. Theme Toggle Logic
  const themeToggleBtn = document.getElementById('theme-toggle');
  const themeToggleMobileBtn = document.getElementById('theme-toggle-mobile');
  const html = document.documentElement;

  const currentTheme = localStorage.getItem('theme') || 
    (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'dark'); // Default to dark for premium dev look

  if (currentTheme === 'dark') {
    html.classList.add('dark');
  } else {
    html.classList.remove('dark');
  }

  function toggleTheme() {
    html.classList.toggle('dark');
    const isDark = html.classList.contains('dark');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  }

  if (themeToggleBtn) themeToggleBtn.addEventListener('click', toggleTheme);
  if (themeToggleMobileBtn) themeToggleMobileBtn.addEventListener('click', toggleTheme);

  // 2. Mobile Menu Toggle
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');

  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
    });

    // Close mobile menu when clicking a link
    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
      });
    });
  }

  // 3. Copy to Clipboard Utility with Toast
  window.copyToClipboard = function(text, label) {
    navigator.clipboard.writeText(text).then(() => {
      showToast(`${label} copied to clipboard!`);
    }).catch(() => {
      // Fallback
      const textArea = document.createElement('textarea');
      textArea.value = text;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      showToast(`${label} copied to clipboard!`);
    });
  };

  // Toast Notification
  function showToast(message) {
    let toast = document.getElementById('toast-notification');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'toast-notification';
      toast.className = 'fixed bottom-6 right-6 z-50 bg-slate-900 text-white dark:bg-white dark:text-slate-900 px-5 py-3 rounded-xl shadow-2xl flex items-center space-x-3 transition-all duration-300 transform translate-y-12 opacity-0 font-medium text-sm border border-slate-700/30';
      document.body.appendChild(toast);
    }
    toast.innerHTML = `
      <svg class="w-5 h-5 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
      </svg>
      <span>${message}</span>
    `;
    
    // Animate in
    setTimeout(() => {
      toast.classList.remove('translate-y-12', 'opacity-0');
      toast.classList.add('translate-y-0', 'opacity-100');
    }, 10);

    // Animate out
    setTimeout(() => {
      toast.classList.remove('translate-y-0', 'opacity-100');
      toast.classList.add('translate-y-12', 'opacity-0');
    }, 3000);
  }

  // 4. Skills Filter
  const skillFilterBtns = document.querySelectorAll('.skill-filter-btn');
  const skillCards = document.querySelectorAll('.skill-item');

  skillFilterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      skillFilterBtns.forEach(b => {
        b.classList.remove('bg-blue-600', 'text-white');
        b.classList.add('bg-slate-100', 'text-slate-700', 'dark:bg-slate-800', 'dark:text-slate-300');
      });
      btn.classList.add('bg-blue-600', 'text-white');
      btn.classList.remove('bg-slate-100', 'text-slate-700', 'dark:bg-slate-800', 'dark:text-slate-300');

      const category = btn.getAttribute('data-category');
      skillCards.forEach(card => {
        if (category === 'all' || card.getAttribute('data-category') === category) {
          card.classList.remove('hidden');
        } else {
          card.classList.add('hidden');
        }
      });
    });
  });

  // 5. Contact Form Simulation (Direct mailto trigger)
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('form-name').value;
      const email = document.getElementById('form-email').value;
      const message = document.getElementById('form-message').value;

      const subject = encodeURIComponent(`Portfolio Inquiry from ${name}`);
      const body = encodeURIComponent(`Hi Abhishek,\n\n${message}\n\nFrom: ${name} (${email})`);

      window.location.href = `mailto:abhishek.anand.7601@gmail.com?subject=${subject}&body=${body}`;
      showToast('Opening your email client...');
    });
  }

  // 6. Navigation Active Spy
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 120;
      if (window.scrollY >= sectionTop) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('text-blue-600', 'dark:text-blue-400', 'font-semibold');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('text-blue-600', 'dark:text-blue-400', 'font-semibold');
      }
    });
  });
});
