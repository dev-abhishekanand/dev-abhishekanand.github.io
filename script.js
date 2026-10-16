// Interactive Animations, Terminal, Filters & Scripts for Abhishek Anand's Portfolio

document.addEventListener('DOMContentLoaded', () => {
  // 1. Scroll Progress Bar
  const progressBar = document.getElementById('scroll-progress');
  window.addEventListener('scroll', () => {
    const totalScroll = document.documentElement.scrollTop || document.body.scrollTop;
    const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    if (windowHeight > 0 && progressBar) {
      const scrollPercent = (totalScroll / windowHeight) * 100;
      progressBar.style.width = `${scrollPercent}%`;
    }
  }, { passive: true });

  // 2. Theme Toggle Logic
  const themeToggleBtn = document.getElementById('theme-toggle');
  const themeToggleMobileBtn = document.getElementById('theme-toggle-mobile');
  const html = document.documentElement;

  const currentTheme = localStorage.getItem('theme') || 'dark'; // Default to dark
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

  // 3. Mobile Menu Toggle
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');

  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
    });

    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
      });
    });
  }

  // 4. Typewriter Effect
  const typewriterElement = document.getElementById('typewriter');
  if (typewriterElement) {
    const roles = [
      "React.js & Next.js 14 Specialist",
      "TypeScript & Scalable SaaS Engineer",
      "Redux Toolkit & TanStack Query Architect",
      "Real-time WebSockets & IoT Dashboards",
      "Performance & Core Web Vitals Enthusiast"
    ];

    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingDelay = 100;

    function type() {
      const currentRole = roles[roleIndex];

      if (isDeleting) {
        typewriterElement.textContent = currentRole.substring(0, charIndex - 1);
        charIndex--;
        typingDelay = 35;
      } else {
        typewriterElement.textContent = currentRole.substring(0, charIndex + 1);
        charIndex++;
        typingDelay = 85;
      }

      if (!isDeleting && charIndex === currentRole.length) {
        typingDelay = 2200;
        isDeleting = true;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        typingDelay = 400;
      }

      setTimeout(type, typingDelay);
    }

    setTimeout(type, 800);
  }

  // 5. Scroll Reveal via IntersectionObserver
  const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale');
  
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: "0px 0px -40px 0px"
  });

  revealElements.forEach(el => revealObserver.observe(el));

  // 6. Animated Number Counters
  const counterElements = document.querySelectorAll('.counter-value');
  let countersAnimated = false;

  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !countersAnimated) {
        countersAnimated = true;
        counterElements.forEach(counter => {
          const target = parseFloat(counter.getAttribute('data-target'));
          const suffix = counter.getAttribute('data-suffix') || '';
          const isDecimal = target % 1 !== 0;
          const duration = 1800;
          const startTime = performance.now();

          function updateCounter(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const easeProgress = 1 - Math.pow(1 - progress, 3);
            const currentVal = target * easeProgress;

            if (isDecimal) {
              counter.textContent = currentVal.toFixed(1) + suffix;
            } else {
              counter.textContent = Math.floor(currentVal) + suffix;
            }

            if (progress < 1) {
              requestAnimationFrame(updateCounter);
            } else {
              counter.textContent = (isDecimal ? target.toFixed(1) : target) + suffix;
            }
          }

          requestAnimationFrame(updateCounter);
        });
      }
    });
  }, { threshold: 0.3 });

  const metricsSection = document.getElementById('metrics-strip');
  if (metricsSection) {
    counterObserver.observe(metricsSection);
  }

  // 7. Interactive 3D Tilt & Specular Cursor Glow
  const tiltCards = document.querySelectorAll('.tilt-card');

  tiltCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * -5;
      const rotateY = ((x - centerX) / centerX) * 5;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)';
    });
  });

  // 8. Skills Category Filter
  const skillFilterBtns = document.querySelectorAll('.skill-filter-btn');
  const skillCards = document.querySelectorAll('.skill-item');

  skillFilterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      skillFilterBtns.forEach(b => {
        b.classList.remove('bg-blue-600', 'text-white', 'shadow-md');
        b.classList.add('bg-slate-100', 'text-slate-700', 'dark:bg-slate-800', 'dark:text-slate-300');
      });
      btn.classList.add('bg-blue-600', 'text-white', 'shadow-md');
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

  // 9. Project Category Filter
  const projectFilterBtns = document.querySelectorAll('.project-filter-btn');
  const projectCards = document.querySelectorAll('.project-item');

  projectFilterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      projectFilterBtns.forEach(b => {
        b.classList.remove('bg-blue-600', 'text-white', 'shadow-md');
        b.classList.add('bg-slate-100', 'text-slate-700', 'dark:bg-slate-800', 'dark:text-slate-300');
      });
      btn.classList.add('bg-blue-600', 'text-white', 'shadow-md');
      btn.classList.remove('bg-slate-100', 'text-slate-700', 'dark:bg-slate-800', 'dark:text-slate-300');

      const category = btn.getAttribute('data-category');
      projectCards.forEach(card => {
        const cardCategories = card.getAttribute('data-category') || '';
        if (category === 'all' || cardCategories.includes(category)) {
          card.classList.remove('hidden');
        } else {
          card.classList.add('hidden');
        }
      });
    });
  });

  // 10. Interactive Terminal Widget
  const terminalInput = document.getElementById('terminal-input');
  const terminalOutput = document.getElementById('terminal-output');

  window.runTerminalCommand = function(cmd) {
    if (!terminalOutput) return;

    const trimmedCmd = cmd.trim().toLowerCase();
    
    // Append user command
    const cmdLine = document.createElement('div');
    cmdLine.className = 'text-slate-400 mb-1';
    cmdLine.innerHTML = `<span class="text-emerald-400 font-bold">visitor@portfolio:~$</span> ${cmd}`;
    terminalOutput.appendChild(cmdLine);

    const response = document.createElement('div');
    response.className = 'mb-3 pl-3 text-slate-300 border-l-2 border-blue-500/50';

    switch(trimmedCmd) {
      case 'help':
        response.innerHTML = `
          Available commands:<br/>
          &nbsp;&nbsp;<span class="text-blue-400">skills</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- View technical proficiencies<br/>
          &nbsp;&nbsp;<span class="text-blue-400">experience</span>&nbsp;&nbsp;- Print career summary & companies<br/>
          &nbsp;&nbsp;<span class="text-blue-400">resume</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- Download ATS-ready PDF resume<br/>
          &nbsp;&nbsp;<span class="text-blue-400">contact</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- Show direct email & phone<br/>
          &nbsp;&nbsp;<span class="text-blue-400">clear</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- Clear terminal screen
        `;
        break;
      case 'skills':
        response.innerHTML = `
          <span class="text-emerald-400 font-bold">Core Stack:</span> React 18/19, Next.js 14 (App Router), TypeScript, JavaScript (ES6+)<br/>
          <span class="text-purple-400 font-bold">State & APIs:</span> Redux Toolkit, TanStack Query, WebSockets, REST, GraphQL<br/>
          <span class="text-cyan-400 font-bold">Styling & UI:</span> Tailwind CSS, Material UI, CSS3, Responsive Design<br/>
          <span class="text-amber-400 font-bold">Performance:</span> Core Web Vitals (LCP/CLS), Code Splitting, Memoization
        `;
        break;
      case 'experience':
        response.innerHTML = `
          • <span class="text-blue-400 font-bold">Independent Frontend Consultant</span> (Feb 2026 - Present)<br/>
          &nbsp;&nbsp;Next.js 14, WebSockets, AI LLM integrations, performance optimization.<br/>
          • <span class="text-purple-400 font-bold">Software Engineer @ Samin TekMindz</span> (Aug 2025 - Jan 2026)<br/>
          &nbsp;&nbsp;Next.js SaaS (10k+ users), EV Charging IoT Dashboard (500+ devices), 60% API cut.<br/>
          • <span class="text-emerald-400 font-bold">Frontend Developer @ Successive Digital</span> (Dec 2021 - Jan 2025)<br/>
          &nbsp;&nbsp;Dentsu 10,000-cell data grid, enterprise React apps, mentored 3 junior devs.
        `;
        break;
      case 'resume':
        response.innerHTML = `<span class="text-emerald-400">Downloading Abhishek_Anand_Resume.pdf...</span>`;
        window.open('Abhishek_Anand_Resume.pdf', '_blank');
        break;
      case 'contact':
        response.innerHTML = `
          📧 Email: <a href="mailto:abhishek.anand.7601@gmail.com" class="text-blue-400 underline">abhishek.anand.7601@gmail.com</a><br/>
          📞 Phone: <a href="tel:+918839617601" class="text-emerald-400 underline">+91-8839617601</a><br/>
          💼 LinkedIn: <a href="https://www.linkedin.com/in/abhishekreactdeveloper/" target="_blank" class="text-blue-400 underline">linkedin.com/in/abhishekreactdeveloper/</a><br/>
          ⚡ Status: <span class="text-emerald-400 font-bold">Immediate Joiner (0 Days Notice)</span>
        `;
        break;
      case 'clear':
        terminalOutput.innerHTML = '';
        return;
      case '':
        return;
      default:
        response.innerHTML = `<span class="text-red-400">Command not found: '${trimmedCmd}'. Type <span class="text-blue-400 cursor-pointer underline" onclick="runTerminalCommand('help')">help</span> for available commands.</span>`;
    }

    terminalOutput.appendChild(response);
    const terminalBody = terminalOutput.closest('.terminal-body');
    if (terminalBody) {
      terminalBody.scrollTop = terminalBody.scrollHeight;
    }
  };

  if (terminalInput) {
    terminalInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        const val = terminalInput.value;
        terminalInput.value = '';
        runTerminalCommand(val);
      }
    });
  }

  // 11. Copy to Clipboard Utility with Toast
  window.copyToClipboard = function(text, label) {
    navigator.clipboard.writeText(text).then(() => {
      showToast(`${label} copied to clipboard!`);
    }).catch(() => {
      const textArea = document.createElement('textarea');
      textArea.value = text;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      showToast(`${label} copied to clipboard!`);
    });
  };

  function showToast(message) {
    let toast = document.getElementById('toast-notification');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'toast-notification';
      toast.className = 'fixed bottom-6 right-6 z-50 bg-slate-900 text-white dark:bg-white dark:text-slate-900 px-5 py-3 rounded-xl shadow-2xl flex items-center space-x-3 transition-all duration-300 transform translate-y-12 opacity-0 font-medium text-sm border border-slate-700/30';
      document.body.appendChild(toast);
    }
    toast.innerHTML = `
      <svg class="w-5 h-5 text-emerald-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
      </svg>
      <span>${message}</span>
    `;
    
    setTimeout(() => {
      toast.classList.remove('translate-y-12', 'opacity-0');
      toast.classList.add('translate-y-0', 'opacity-100');
    }, 10);

    setTimeout(() => {
      toast.classList.remove('translate-y-0', 'opacity-100');
      toast.classList.add('translate-y-12', 'opacity-0');
    }, 3000);
  }

  // 12. Contact Form Direct mailto trigger
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

  // 13. Navigation Active Spy
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 130;
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
  }, { passive: true });
});
