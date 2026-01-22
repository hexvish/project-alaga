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
function initIntersectionObserver() {
    const faders = document.querySelectorAll(".fade-in");
    const appearOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const appearOnScroll = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
        });
    }, appearOptions);

    faders.forEach(fader => appearOnScroll.observe(fader));
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
            <p class="text-uppercase">Our Collection</p>
            <h2 style="font-size: 3rem;">Selected Pieces</h2>
            <div class="gallery-tabs" style="margin-top: 2rem; display: flex; justify-content: center; gap: 2rem;">
            </div>
        </div>
        <div id="gallery-grid" class="grid fade-in"></div>
    `;

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
    container.style.opacity = "0";
    
    setTimeout(() => {
        container.innerHTML = "";
        items.forEach(item => {
            const card = document.createElement("div");
            card.className = "card";
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
        });
        container.style.opacity = "1";
        container.classList.add("visible");
    }, 200);
}
