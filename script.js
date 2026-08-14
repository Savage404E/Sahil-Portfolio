(() => {
    const bootScreen = document.getElementById('bootScreen');
    const scrollProgress = document.getElementById('scrollProgress');
    const backToTop = document.getElementById('backToTop');
    const navbar = document.getElementById('navbar');
    const navToggle = document.getElementById('navToggle');
    const navLinks = document.getElementById('navLinks');
    const cursorDot = document.getElementById('cursorDot');
    const cursorRing = document.getElementById('cursorRing');
    const typedText = document.getElementById('typedText');
    const ctaText = document.getElementById('ctaText');

    /* ---------- Boot screen ---------- */
    window.addEventListener('load', () => {
        setTimeout(() => bootScreen.classList.add('hide'), 2600);
    });

    /* ---------- Scroll progress, navbar, back-to-top ---------- */
    const onScroll = () => {
        const max = document.documentElement.scrollHeight - window.innerHeight;
        scrollProgress.style.width = (window.scrollY / max) * 100 + '%';
        navbar.classList.toggle('scrolled', window.scrollY > 40);
        backToTop.classList.toggle('show', window.scrollY > 600);

        const current = [...document.querySelectorAll('.nav-link')].filter(l => {
            const sec = document.querySelector(l.getAttribute('href'));
            return sec && sec.getBoundingClientRect().top <= 140;
        }).pop();
        document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
        if (current) current.classList.add('active');
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

    /* ---------- Mobile nav ---------- */
    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('open');
        navLinks.classList.toggle('open');
    });
    navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
        navToggle.classList.remove('open');
        navLinks.classList.remove('open');
    }));

    /* ---------- Typing effect ---------- */
    const roles = [
        'developer.',
        'python & C++ engineer.',
        'react / next.js builder.',
        'data wrangler (pandas).',
        'problem solver.',
        'linux tinkerer.',
    ];
    const ctaMessages = [
        'echo "Let\'s build something cool together."',
        'if (interest) { reachOut(email); }',
        'git commit -m "hello, world"',
        'print("Open to internships & collabs")',
    ];

    function typeLoop(el, phrases, typeSpeed = 60, holdTime = 1600) {
        let p = 0, ch = 0, deleting = false;
        const tick = () => {
            const current = phrases[p];
            el.textContent = current.slice(0, ch);
            if (!deleting) {
                ch++;
                if (ch > current.length) { deleting = true; setTimeout(tick, holdTime); return; }
                setTimeout(tick, typeSpeed);
            } else {
                ch -= 2;
                if (ch < 0) { ch = 0; deleting = false; p = (p + 1) % phrases.length; }
                setTimeout(tick, 55);
            }
        };
        setTimeout(tick, 2800);
    }
    typeLoop(typedText, roles);
    typeLoop(ctaText, ctaMessages);

    /* ---------- Counters ---------- */
    const counters = document.querySelectorAll('.stat-num');
    const countObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            const el = entry.target;
            const target = +el.dataset.target;
            let val = 0;
            const step = () => {
                val += Math.max(1, Math.ceil(target / 40));
                el.textContent = Math.min(val, target);
                if (val < target) requestAnimationFrame(step);
            };
            step();
            countObserver.unobserve(el);
        });
    }, { threshold: 0.5 });
    counters.forEach(c => countObserver.observe(c));

    /* ---------- Reveal on scroll ---------- */
    const revealObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12 });
    document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

    /* ---------- Particle network ---------- */
    const canvas = document.getElementById('particles');
    const ctx = canvas.getContext('2d');
    let particles = [];
    let w, h;

    const resize = () => {
        w = canvas.width = window.innerWidth;
        h = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', resize);
    resize();

    const count = Math.min(110, Math.floor(window.innerWidth / 14));
    for (let i = 0; i < count; i++) {
        particles.push({
            x: Math.random() * w,
            y: Math.random() * h,
            vx: (Math.random() - 0.5) * 0.35,
            vy: (Math.random() - 0.5) * 0.35,
            r: Math.random() * 1.6 + 0.4,
        });
    }

    (function animate() {
        ctx.clearRect(0, 0, w, h);
        for (const p of particles) {
            p.x += p.vx;
            p.y += p.vy;
            if (p.x < 0 || p.x > w) p.vx *= -1;
            if (p.y < 0 || p.y > h) p.vy *= -1;
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(0,229,255,0.55)';
            ctx.fill();
        }
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const d = Math.hypot(dx, dy);
                if (d < 130) {
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.strokeStyle = `rgba(124,92,255,${(1 - d / 130) * 0.28})`;
                    ctx.lineWidth = 1;
                    ctx.stroke();
                }
            }
        }
        requestAnimationFrame(animate);
    })();

    /* ---------- Custom cursor ---------- */
    let mx = -100, my = -100, rx = -100, ry = -100;
    window.addEventListener('mousemove', e => {
        mx = e.clientX;
        my = e.clientY;
        cursorDot.style.left = mx + 'px';
        cursorDot.style.top = my + 'px';
    });
    (function ring() {
        rx += (mx - rx) * 0.16;
        ry += (my - ry) * 0.16;
        cursorRing.style.left = rx + 'px';
        cursorRing.style.top = ry + 'px';
        requestAnimationFrame(ring);
    })();

    document.querySelectorAll('a, button, .chip').forEach(el => {
        el.addEventListener('mouseenter', () => cursorRing.classList.add('hovering'));
        el.addEventListener('mouseleave', () => cursorRing.classList.remove('hovering'));
    });

    /* ---------- Project card spotlight ---------- */
    document.querySelectorAll('.project-card').forEach(card => {
        card.addEventListener('mousemove', e => {
            const rect = card.getBoundingClientRect();
            card.style.setProperty('--mx', (e.clientX - rect.left) + 'px');
            card.style.setProperty('--my', (e.clientY - rect.top) + 'px');
        });
    });

    /* ---------- Footer year ---------- */
    document.getElementById('year').textContent = new Date().getFullYear();
})();
