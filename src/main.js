// Premium Interactivity — English with Robiul
document.addEventListener('DOMContentLoaded', () => {
    const header = document.getElementById('main-header');
    const hamburger = document.getElementById('hamburger');
    const mobileNav = document.getElementById('mobile-nav');

    // Header scroll effect
    const onScroll = () => {
        header.classList.toggle('scrolled', window.scrollY > 60);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    // Hamburger menu
    if (hamburger && mobileNav) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            mobileNav.classList.toggle('open');
            document.body.style.overflow = mobileNav.classList.contains('open') ? 'hidden' : '';
        });

        // Close mobile nav on link click
        mobileNav.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                mobileNav.classList.remove('open');
                document.body.style.overflow = '';
            });
        });
    }

    // Smooth scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offset = 80;
                const pos = target.getBoundingClientRect().top + window.pageYOffset - offset;
                window.scrollTo({ top: pos, behavior: 'smooth' });
            }
        });
    });

    // Scroll Reveal with Intersection Observer
    const revealEls = document.querySelectorAll('.reveal');
    if (revealEls.length) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

        revealEls.forEach(el => observer.observe(el));
    }

    // Animate stat numbers on scroll
    const statNumbers = document.querySelectorAll('.stat-number');
    if (statNumbers.length) {
        let animated = false;
        const animateStats = () => {
            if (animated) return;
            const first = statNumbers[0];
            const rect = first.getBoundingClientRect();
            if (rect.top < window.innerHeight * 0.85) {
                animated = true;
                statNumbers.forEach(el => {
                    const text = el.textContent;
                    const match = text.match(/(\d+)/);
                    if (match) {
                        const target = parseInt(match[1]);
                        const suffix = text.replace(match[1], '');
                        let current = 0;
                        const step = Math.max(1, Math.floor(target / 40));
                        const timer = setInterval(() => {
                            current += step;
                            if (current >= target) {
                                current = target;
                                clearInterval(timer);
                            }
                            el.innerHTML = current + suffix.replace(/([%+])/, '<span>$1</span>');
                        }, 30);
                    }
                });
            }
        };
        window.addEventListener('scroll', animateStats, { passive: true });
        animateStats();
    }
});
