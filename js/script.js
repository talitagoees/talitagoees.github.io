// SCROLL PROGRESS BAR
window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    document.querySelector('.scroll-progress').style.width = scrollPercent + '%';

    // HEADER EFFECT
    if (scrollTop > 50) {
        document.querySelector('header').classList.add('scrolled');
    } else {
        document.querySelector('header').classList.remove('scrolled');
    }

    // SHOW/HIDE SCROLL TO TOP
    const scrollBtn = document.querySelector('.scroll-to-top');
    if (scrollTop > 500) {
        scrollBtn.classList.add('show');
    } else {
        scrollBtn.classList.remove('show');
    }
});

// SCROLL TO TOP FUNCTION
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// MODAL FUNCTIONS
function openModal(src) {
    const modal = document.getElementById('modal');
    const img = document.getElementById('modal-img');
    const video = document.getElementById('modal-video');

    if (src.endsWith('.mp4') || src.endsWith('.webm')) {
        img.style.display = 'none';
        video.style.display = 'block';
        video.src = src;
        video.play().catch(() => {});
    } else {
        video.style.display = 'none';
        img.style.display = 'block';
        img.src = src;
    }

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    document.getElementById('modal').classList.remove('active');
    const video = document.getElementById('modal-video');
    video.pause();
    video.removeAttribute('src');
    video.load();
    document.body.style.overflow = 'auto';
}

window.onclick = function(event) {
    const modal = document.getElementById('modal');
    if (event.target === modal) {
        closeModal();
    }
}

// CLOSE MODAL WITH ESC
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeModal();
    }
});

// INTERSECTION OBSERVER PARA ANIMAÇÕES
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.style.opacity = '1';
                entry.target.style.animation = 'fadeInUp 0.8s ease forwards';
            }, index * 100);
        }
    });
}, observerOptions);

// OBSERVAR SEÇÕES
document.querySelectorAll('.section').forEach(el => {
    observer.observe(el);
});

// SMOOTH SCROLL
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// LAZY LOADING DE IMAGENS
if ('IntersectionObserver' in window) {
    const images = document.querySelectorAll('img, video');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src || img.src;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });
    images.forEach(img => imageObserver.observe(img));
}

