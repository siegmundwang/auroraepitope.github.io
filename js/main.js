// ===== Language Switch =====
const langSwitch = document.getElementById('langSwitch');
const langBtns = langSwitch.querySelectorAll('.lang-btn');
let currentLang = 'en';

function switchLanguage(lang) {
    currentLang = lang;
    const langMap = { zh: 'zh-CN', tw: 'zh-TW', en: 'en' };
    document.documentElement.lang = langMap[lang] || 'zh-CN';

    langBtns.forEach(btn => {
        btn.classList.toggle('active', btn.dataset.lang === lang);
    });

    // Switch all data-zh / data-tw / data-en elements
    document.querySelectorAll('[data-zh]').forEach(el => {
        const text = el.getAttribute(`data-${lang}`);
        if (text) {
            if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
                el.placeholder = text;
            } else {
                el.innerHTML = text;
            }
        }
    });

    // Switch placeholder attributes
    document.querySelectorAll('[data-zh-placeholder]').forEach(el => {
        const ph = el.getAttribute(`data-${lang}-placeholder`);
        if (ph) el.placeholder = ph;
    });

    // Switch hero-tag
    const heroTag = document.querySelector('.hero-tag');
    if (heroTag) {
        heroTag.textContent = heroTag.getAttribute(`data-${lang}`) || heroTag.textContent;
    }
}

langBtns.forEach(btn => {
    btn.addEventListener('click', () => switchLanguage(btn.dataset.lang));
});

// ===== Navigation =====
const navbar = document.querySelector('.navbar');
const menuToggle = document.getElementById('menuToggle');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
});

menuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    menuToggle.classList.toggle('active');
});

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        menuToggle.classList.remove('active');
    });
});

// Active nav link on scroll
const sections = document.querySelectorAll('section[id]');

function updateActiveNav() {
    const scrollY = window.scrollY + 100;
    sections.forEach(section => {
        const top = section.offsetTop;
        const height = section.offsetHeight;
        const id = section.getAttribute('id');
        const link = document.querySelector(`.nav-link[href="#${id}"]`);
        if (link) {
            if (scrollY >= top && scrollY < top + height) {
                navLinks.forEach(l => l.classList.remove('active'));
                link.classList.add('active');
            }
        }
    });
}

window.addEventListener('scroll', updateActiveNav);

// ===== Scroll Animations =====
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.team-card, .advisor-card, .tech-step, .advantage-card, .market-stat-card, .partner-type, .metric-card, .about-card-main, .highlight-item, .service-card').forEach(el => {
    el.classList.add('animate-on-scroll');
    observer.observe(el);
});

// ===== Back to Top =====
const backToTop = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
    backToTop.classList.toggle('visible', window.scrollY > 400);
});

backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ===== Contact Form → mailto =====
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const subject = document.getElementById('subject').value.trim();
    const message = document.getElementById('message').value.trim();

    if (!name || !email || !message) return;

    const to = 'meinetbosekampf@gmail.com';
    const mailSubject = encodeURIComponent(subject || `[AuroraEpitope] Message from ${name}`);
    const mailBody = encodeURIComponent(
        `From: ${name} (${email})\n\n${message}`
    );
    window.location.href = `mailto:${to}?subject=${mailSubject}&body=${mailBody}`;

    const btn = contactForm.querySelector('button[type="submit"]');
    const originalHTML = btn.innerHTML;
    const sentTexts = {
        zh: '<i class="fas fa-check"></i> 正在打开邮件客户端…',
        tw: '<i class="fas fa-check"></i> 正在打開郵件客戶端…',
        en: '<i class="fas fa-check"></i> Opening email client…'
    };
    btn.innerHTML = sentTexts[currentLang] || sentTexts.en;
    btn.style.pointerEvents = 'none';

    setTimeout(() => {
        contactForm.reset();
        btn.innerHTML = originalHTML;
        btn.style.pointerEvents = '';
    }, 2500);
});

// ===== Smooth scroll for anchor links =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offset = 72;
            const top = target.getBoundingClientRect().top + window.scrollY - offset;
            window.scrollTo({ top, behavior: 'smooth' });
        }
    });
});
