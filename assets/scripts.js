/*
  Dawn of Alaga - Scripts
  Modern Interaction Logic
*/

document.addEventListener("DOMContentLoaded", () => {
    initNavigation();
    initIntersectionObserver();
    initFAQ();
    initGallery();
});

/**
 * Navigation Logic
 */
function initNavigation() {
    const nav = document.getElementById("siteNav");
    const navToggle = document.getElementById("navToggle");
    const navLinks = document.getElementById("navLinks");

    if (!navToggle || !navLinks) return;

    // Scroll effect
    window.addEventListener("scroll", () => {
        if (window.scrollY > 50) {
            nav.classList.add("scrolled");
        } else {
            nav.classList.remove("scrolled");
        }
    });

    // Mobile menu toggle
    navToggle.addEventListener("click", () => {
        navLinks.classList.toggle("open");
        const icon = navToggle.querySelector("i");
        if (navLinks.classList.contains("open")) {
            icon.classList.replace("fa-bars", "fa-times");
            navLinks.style.display = "flex";
            navLinks.style.flexDirection = "column";
            navLinks.style.position = "absolute";
            navLinks.style.top = "80px";
            navLinks.style.left = "0";
            navLinks.style.width = "100%";
            navLinks.style.background = "#fff";
            navLinks.style.padding = "2rem";
            navLinks.style.borderBottom = "1px solid #e0e0e0";
        } else {
            icon.classList.replace("fa-times", "fa-bars");
            navLinks.style.display = "";
        }
    });
}

/**
 * Fade-in effect on scroll
 */
/**
 * Fade-in effect on scroll
 */
function initIntersectionObserver() {
    window.observeElements = (elements) => {
        const appearOptions = {
            threshold: 0.15,
            rootMargin: "0px 0px -50px 0px"
        };

        const appearOnScroll = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (!entry.isIntersecting) return;
                entry.target.classList.add("reveal-visible");
                observer.unobserve(entry.target);
            });
        }, appearOptions);

        elements.forEach(el => appearOnScroll.observe(el));
    };

    const faders = document.querySelectorAll(".reveal-base");
    window.observeElements(faders);
}

/**
 * FAQ Accordion logic
 */
function initFAQ() {
    const faqQuestions = document.querySelectorAll(".faq-question");

    faqQuestions.forEach(question => {
        question.addEventListener("click", () => {
            const answer = question.nextElementSibling;
            const icon = question.querySelector("i");

            // Toggle answer
            if (answer.style.maxHeight) {
                answer.style.maxHeight = null;
                icon.classList.replace("fa-minus", "fa-plus");
            } else {
                // Close others
                document.querySelectorAll(".faq-answer").forEach(a => a.style.maxHeight = null);
                document.querySelectorAll(".faq-question i").forEach(i => i.classList.replace("fa-minus", "fa-plus"));

                answer.style.maxHeight = answer.scrollHeight + "px";
                icon.classList.replace("fa-plus", "fa-minus");
            }
        });
    });
}

/**
 * Gallery Rendering Logic
 */
function initGallery() {
    const galleryContainer = document.getElementById("gallery");
    if (!galleryContainer) return;

    if (typeof galleryData === "undefined") {
        console.error("galleryData.js not loaded.");
        return;
    }

    // Set up gallery layout
    galleryContainer.innerHTML = `
        <div class="text-center" style="margin-bottom: 4rem;">
            <p class="text-uppercase reveal-base reveal-up">Our Collection</p>
            <h2 style="font-size: 3rem;" class="reveal-base reveal-up stagger-1">Selected Pieces</h2>
            <div class="gallery-tabs reveal-base reveal-up stagger-2" style="margin-top: 2rem; display: flex; justify-content: center; gap: 2rem;">
            </div>
        </div>
        <div id="gallery-grid" class="grid"></div>
    `;

    // Observe newly created header elements
    if (window.observeElements) {
        const newReveals = galleryContainer.querySelectorAll(".text-center .reveal-base");
        window.observeElements(newReveals);
    }

    const tabsContainer = galleryContainer.querySelector(".gallery-tabs");
    const grid = galleryContainer.querySelector("#gallery-grid");
    const categories = Object.keys(galleryData);

    // Create tabs
    categories.forEach((cat, index) => {
        const btn = document.createElement("button");
        btn.textContent = cat;
        btn.className = "text-uppercase";
        btn.style.background = "none";
        btn.style.border = "none";
        btn.style.cursor = "pointer";
        btn.style.paddingBottom = "5px";
        btn.style.borderBottom = index === 0 ? "2px solid #000" : "2px solid transparent";
        btn.dataset.category = cat;

        btn.addEventListener("click", () => {
            document.querySelectorAll(".gallery-tabs button").forEach(b => b.style.borderBottom = "2px solid transparent");
            btn.style.borderBottom = "2px solid #000";
            renderCategory(cat, grid);
        });

        tabsContainer.appendChild(btn);
    });

    // Render first category
    renderCategory(categories[0], grid);
}

function renderCategory(category, container) {
    const items = galleryData[category];

    // Fade out current content
    container.style.opacity = "0";
    container.style.transition = "opacity 0.2s ease-out";

    setTimeout(() => {
        container.innerHTML = "";
        container.style.opacity = "1"; // Reset container opacity

        const newCards = [];
        items.forEach((item, index) => {
            const card = document.createElement("div");
            // Add staggering classes based on index (1-5)
            const staggerDelay = (index % 5) + 1;

            card.className = `card reveal-base reveal-up stagger-${staggerDelay}`;
            card.innerHTML = `
                <div class="card-image">
                    <img src="${item.img}" alt="${item.title}">
                </div>
                <div class="card-content">
                    <p class="text-uppercase">${category}</p>
                    <h3 class="card-title">${item.title}</h3>
                    <p>${item.description}</p>
                </div>
            `;
            container.appendChild(card);
            newCards.push(card);
        });

        // Observe the new cards
        if (window.observeElements) {
            window.observeElements(newCards);
        }
    }, 200);
}
