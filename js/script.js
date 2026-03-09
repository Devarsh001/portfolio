const toggle = document.getElementById('menu-toggle');
const closeBtn = document.getElementById('menu-close');

// Active navigation logic
document.addEventListener('DOMContentLoaded', () => {
    const currentPath = window.location.pathname;

    // Desktop Nav
    document.querySelectorAll('nav a').forEach(link => {
        // Simple check to see if href matches current path end
        const href = link.getAttribute('href');
        if (href && href !== '#' && currentPath.endsWith(href.replace('../', ''))) {
            // Apply active styles
            link.classList.remove('text-gray-600', 'text-brand-text/80');
            link.classList.add('text-black', 'text-brand-text', 'font-semibold');
        }
    });
});
const overlay = document.getElementById('mobile-overlay');
const iconOpen = document.getElementById('icon-open');
const iconClose = document.getElementById('icon-close');

function openMenu() {
    overlay.classList.remove('-translate-y-full');
    overlay.classList.add('translate-y-0');
    // Animate nav links in
    overlay.querySelectorAll('nav a').forEach(a => {
        a.classList.remove('opacity-0', 'translate-y-3');
    });
    iconOpen.classList.add('hidden');
    iconClose.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
}

function closeMenu() {
    overlay.classList.add('-translate-y-full');
    overlay.classList.remove('translate-y-0');
    // Reset nav links for next open
    overlay.querySelectorAll('nav a').forEach(a => {
        a.classList.add('opacity-0', 'translate-y-3');
    });
    iconOpen.classList.remove('hidden');
    iconClose.classList.add('hidden');
    document.body.style.overflow = '';
}

toggle.addEventListener('click', openMenu);
closeBtn.addEventListener('click', closeMenu);


// Slider
const sliderContainer = document.getElementById("image-slider");

if (sliderContainer) {
    let beforeImages = [];
    let afterImages = [];

    try {
        beforeImages = JSON.parse(sliderContainer.getAttribute("data-before") || '[]');
        afterImages = JSON.parse(sliderContainer.getAttribute("data-after") || '[]');
    } catch (e) {
        console.error("Invalid slider data", e);
    }

    let currentSlide = 0;

    const beforeImage = document.getElementById("beforeImage");
    const afterImage = document.getElementById("afterImage");
    const prevBtn = document.getElementById("prevBtn");
    const nextBtn = document.getElementById("nextBtn");
    const counter = document.getElementById("slideCounter");

    function updateSlider() {
        if (!beforeImage || !afterImage || beforeImages.length === 0) return;

        beforeImage.classList.remove("opacity-100");
        afterImage.classList.remove("opacity-100");
        beforeImage.classList.add("opacity-0");
        afterImage.classList.add("opacity-0");

        setTimeout(() => {
            // Safely fallback to the last image if arrays are mismatched
            const beforeSrc = beforeImages[currentSlide] || beforeImages[beforeImages.length - 1];
            const afterSrc = afterImages[currentSlide] || afterImages[afterImages.length - 1];

            beforeImage.src = beforeSrc;
            afterImage.src = afterSrc;

            beforeImage.classList.remove("opacity-0");
            afterImage.classList.remove("opacity-0");
            beforeImage.classList.add("opacity-100");
            afterImage.classList.add("opacity-100");

            if (counter) {
                counter.textContent = `${currentSlide + 1} / ${beforeImages.length}`;
            }
        }, 200);
    }

    if (nextBtn) {
        nextBtn.addEventListener("click", () => {
            if (beforeImages.length === 0) return;
            currentSlide = (currentSlide + 1) % beforeImages.length;
            updateSlider();
        });
    }

    if (prevBtn) {
        prevBtn.addEventListener("click", () => {
            if (beforeImages.length === 0) return;
            currentSlide = (currentSlide - 1 + beforeImages.length) % beforeImages.length;
            updateSlider();
        });
    }

    document.addEventListener("keydown", (e) => {
        if (e.key === "ArrowRight" && nextBtn) nextBtn.click();
        if (e.key === "ArrowLeft" && prevBtn) prevBtn.click();
    });

    // Touch/Swipe Support
    let touchStartX = 0;
    let touchEndX = 0;

    sliderContainer.addEventListener("touchstart", (e) => {
        touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    sliderContainer.addEventListener("touchend", (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, { passive: true });

    function handleSwipe() {
        const minSwipeDistance = 50;
        if (touchEndX < touchStartX - minSwipeDistance && nextBtn) {
            nextBtn.click(); // Swipe left -> Next
        }
        if (touchEndX > touchStartX + minSwipeDistance && prevBtn) {
            prevBtn.click(); // Swipe right -> Prev
        }
    }

    // Initialize counter
    if (counter && beforeImages.length > 0) {
        counter.textContent = `${currentSlide + 1} / ${beforeImages.length}`;
    }
}

// Scroll Reveal Animation
document.addEventListener("DOMContentLoaded", () => {
    const revealElements = document.querySelectorAll("section h1, section h2, section h3, section p, section .grid > a, section .grid > div, footer");

    revealElements.forEach(el => {
        // Exclude elements inside the slider
        if (!el.closest('#image-slider')) {
            el.classList.add('reveal');
        }
    });

    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("active");
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll(".reveal").forEach(el => {
        revealObserver.observe(el);
    });
});

// Custom Cursor Logic
document.addEventListener("DOMContentLoaded", () => {
    // Only run on desktop devices (no touch)
    if (window.matchMedia("(pointer: fine)").matches) {
        const cursor = document.createElement("div");
        cursor.classList.add("custom-cursor");
        document.body.appendChild(cursor);

        // Follow mouse movement
        document.addEventListener("mousemove", (e) => {
            cursor.style.left = `${e.clientX}px`;
            cursor.style.top = `${e.clientY}px`;
        });

        // Add hover effect for all links and buttons
        const interactiveElements = document.querySelectorAll("a, button, .cursor-pointer");

        interactiveElements.forEach((el) => {
            el.addEventListener("mouseenter", () => {
                cursor.classList.add("cursor-hover");
            });
            el.addEventListener("mouseleave", () => {
                cursor.classList.remove("cursor-hover");
            });
        });

        // Hide cursor when leaving the window
        document.addEventListener("mouseleave", () => {
            cursor.style.opacity = "0";
        });
        document.addEventListener("mouseenter", () => {
            cursor.style.opacity = "1";
        });
    }
});

const backToTop = document.getElementById('back-to-top');

window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
        backToTop.classList.remove('opacity-0', 'pointer-events-none');
        backToTop.classList.add('opacity-100');
    } else {
        backToTop.classList.add('opacity-0', 'pointer-events-none');
        backToTop.classList.remove('opacity-100');
    }
});

backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});