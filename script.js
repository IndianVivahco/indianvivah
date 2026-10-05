document.addEventListener("DOMContentLoaded", function () {

    // =====================================================
    // DESKTOP SCROLL SPY
    // =====================================================

    const sections = document.querySelectorAll("section[id]");
    const navLinks = document.querySelectorAll(".d-nav a");

    function updateActiveNav() {
        let currentSectionId = "";
        const scrollPosition = window.scrollY + 160;

        sections.forEach(function (section) {
            if (
                scrollPosition >= section.offsetTop &&
                scrollPosition < section.offsetTop + section.offsetHeight
            ) {
                currentSectionId = section.getAttribute("id");
            }
        });

        navLinks.forEach(function (link) {
            link.classList.remove("active");

            if (link.getAttribute("href") === `#${currentSectionId}`) {
                link.classList.add("active");
            }
        });
    }

    window.addEventListener("scroll", updateActiveNav, { passive: true });
    updateActiveNav();


    // =====================================================
    // DESKTOP HERO SLIDER
    // =====================================================

    const slides = document.querySelectorAll(".slide-img");

    if (slides.length > 1) {
        let currentSlideIndex = 0;

        setInterval(function () {
            slides[currentSlideIndex].classList.remove("active-slide");

            currentSlideIndex =
                (currentSlideIndex + 1) % slides.length;

            slides[currentSlideIndex].classList.add("active-slide");
        }, 4000);
    }


    // =====================================================
    // MOBILE HERO SLIDER
    // =====================================================

    const mobileSlides = document.querySelectorAll(".m-slide-img");

    if (mobileSlides.length > 1) {
        let mobileIndex = 0;

        setInterval(function () {
            mobileSlides[mobileIndex].classList.remove("m-active-slide");

            mobileIndex =
                (mobileIndex + 1) % mobileSlides.length;

            mobileSlides[mobileIndex].classList.add("m-active-slide");
        }, 4000);
    }


    // =====================================================
    // MOBILE DRAWER
    // =====================================================

    const mobileBtn = document.getElementById("mobile-menu-trigger");
    const closeBtn = document.getElementById("mobile-menu-close");
    const drawerBox = document.getElementById("mobile-drawer");
    const overlayBg = document.getElementById("mobile-drawer-overlay");
    const drawerLinks = document.querySelectorAll(".m-drawer-nav a");

    function openDrawer() {
        if (!drawerBox || !overlayBg) return;

        drawerBox.classList.add("open-drawer");
        overlayBg.classList.add("show-overlay");
        document.body.style.overflow = "hidden";
    }

    function closeDrawer() {
        if (!drawerBox || !overlayBg) return;

        drawerBox.classList.remove("open-drawer");
        overlayBg.classList.remove("show-overlay");
        document.body.style.overflow = "";
    }

    mobileBtn?.addEventListener("click", function (event) {
        event.preventDefault();
        openDrawer();
    });

    closeBtn?.addEventListener("click", function (event) {
        event.preventDefault();
        closeDrawer();
    });

    overlayBg?.addEventListener("click", closeDrawer);

    drawerLinks.forEach(function (link) {
        link.addEventListener("click", closeDrawer);
    });


    // =====================================================
    // MEMBERSHIP PAYMENT POPUP
    // =====================================================

    const paymentOverlay = document.getElementById("planPopupOverlay");
    const paymentTitle = document.getElementById("popupPlanName");
    const paymentAmount = document.getElementById("popupPlanAmount");
    const closePaymentBtn = document.getElementById("closePlanPopup");
    const continuePaymentLink = document.getElementById("continuePaymentLink");

    document.querySelectorAll(".btn-plan").forEach(function (button) {

        button.addEventListener("click", function (event) {
            event.preventDefault();

            if (!paymentOverlay) return;

            const planName =
                button.dataset.plan ||
                button.closest(".plan-card")?.querySelector("h3")?.textContent?.trim() ||
                "Membership";

            const amount =
                button.dataset.amount ||
                "";

            if (paymentTitle) {
                paymentTitle.textContent = `${planName} Membership`;
            }

            if (paymentAmount) {
                paymentAmount.textContent =
                    amount
                        ? `₹${Number(amount).toLocaleString("en-IN")}`
                        : "";
            }

            if (continuePaymentLink) {
                const params = new URLSearchParams();

                params.set("plan", planName);

                if (amount) {
                    params.set("amount", amount);
                }

                continuePaymentLink.href =
                    `payment.html?${params.toString()}`;
            }

            paymentOverlay.classList.add("show-plan-popup");
            document.body.style.overflow = "hidden";
        });
    });

    function closePaymentPopup() {
        if (!paymentOverlay) return;

        paymentOverlay.classList.remove("show-plan-popup");
        document.body.style.overflow = "";
    }

    closePaymentBtn?.addEventListener("click", function (event) {
        event.preventDefault();
        closePaymentPopup();
    });

    paymentOverlay?.addEventListener("click", function (event) {
        if (event.target === paymentOverlay) {
            closePaymentPopup();
        }
    });


    // =====================================================
    // SAMMELAN REGISTRATION POPUP
    // =====================================================

    const sammelanTriggerBtn =
        document.querySelector(".btn-sammelan-reg");

    const sammelanOverlay =
        document.getElementById("sammelanFormOverlay");

    const closeSammelanBtn =
        document.getElementById("closeSammelanForm");

    const sammelanForm =
        document.getElementById("sammelanRegistrationForm");

    function openSammelanForm() {
        if (!sammelanOverlay) return;

        sammelanOverlay.classList.add("show-sammelan-form");
        document.body.style.overflow = "hidden";
    }

    function closeSammelanForm() {
        if (!sammelanOverlay) return;

        sammelanOverlay.classList.remove("show-sammelan-form");
        document.body.style.overflow = "";
    }

    sammelanTriggerBtn?.addEventListener("click", function (event) {
        event.preventDefault();
        openSammelanForm();
    });

    closeSammelanBtn?.addEventListener("click", function (event) {
        event.preventDefault();
        closeSammelanForm();
    });

    sammelanOverlay?.addEventListener("click", function (event) {
        if (event.target === sammelanOverlay) {
            closeSammelanForm();
        }
    });

    // अभी कोई server/backend endpoint इस form से जुड़ा नहीं है.
    // इसलिए false "submitted successfully" message नहीं दिखाया जाता.
    sammelanForm?.addEventListener("submit", function (event) {
        event.preventDefault();

        if (!sammelanForm.checkValidity()) {
            sammelanForm.reportValidity();
            return;
        }

        alert(
            "प्रपत्र पूरा भर गया है। ऑनलाइन submission अभी server से connect नहीं है। " +
            "कृपया Indian Vivah support से संपर्क करके पंजीयन आगे बढ़ाएँ।"
        );
    });


    // =====================================================
    // FAQ ACCORDION
    // =====================================================

    document.querySelectorAll(".faq-question").forEach(function (button) {

        button.addEventListener("click", function () {

            const currentItem =
                button.closest(".faq-item");

            if (!currentItem) return;

            document.querySelectorAll(".faq-item").forEach(function (item) {
                if (item !== currentItem) {
                    item.classList.remove("active");
                }
            });

            currentItem.classList.toggle("active");
        });
    });


    // =====================================================
    // ESCAPE KEY
    // =====================================================

    document.addEventListener("keydown", function (event) {
        if (event.key !== "Escape") return;

        closeDrawer();
        closePaymentPopup();
        closeSammelanForm();
    });
});


// =========================================================
// PUBLIC HOME — MEMBER ACCESS GATE
// =========================================================

(function () {

    const overlay =
        document.getElementById("memberAccessOverlay");

    const closeButton =
        document.getElementById("memberAccessClose");

    function openMemberAccess(event) {

        if (document.body.classList.contains("is-member")) {
            return true;
        }

        if (event) {
            event.preventDefault();
        }

        if (!overlay) {
            window.location.href = "login.html";
            return false;
        }

        overlay.classList.add("show");
        overlay.setAttribute("aria-hidden", "false");
        document.body.style.overflow = "hidden";

        return false;
    }

    function closeMemberAccess() {

        if (!overlay) return;

        overlay.classList.remove("show");
        overlay.setAttribute("aria-hidden", "true");
        document.body.style.overflow = "";
    }

    document.querySelectorAll("[data-member-link]").forEach(function (link) {

        link.addEventListener("click", function (event) {

            if (!document.body.classList.contains("is-member")) {
                openMemberAccess(event);
            }
        });
    });

    closeButton?.addEventListener("click", closeMemberAccess);

    overlay?.addEventListener("click", function (event) {
        if (event.target === overlay) {
            closeMemberAccess();
        }
    });

    document.addEventListener("keydown", function (event) {
        if (event.key === "Escape") {
            closeMemberAccess();
        }
    });

})();


// =========================================================
// BLOG READ MORE
// =========================================================

function toggleText() {

    const moreText =
        document.getElementById("more-text");

    const button =
        document.getElementById("read-more-btn");

    if (!moreText || !button) return;

    const isHidden =
        getComputedStyle(moreText).display === "none";

    moreText.style.display =
        isHidden ? "block" : "none";

    button.textContent =
        isHidden ? "Read Less ↑" : "Read More →";
}


function toggleText2() {

    const moreText =
        document.getElementById("more-text-2");

    const button =
        document.getElementById("read-more-btn-2");

    if (!moreText || !button) return;

    const isHidden =
        getComputedStyle(moreText).display === "none";

    moreText.style.display =
        isHidden ? "block" : "none";

    button.textContent =
        isHidden ? "Read Less ↑" : "Read More →";
}


// =========================================================
// COMMUNITY THOUGHTS — WHATSAPP HANDOFF
// =========================================================

function handleFormSubmit(event) {

    event.preventDefault();

    const name =
        document.getElementById("userName")?.value.trim() || "";

    const type =
        document.getElementById("shareType")?.value || "";

    const message =
        document.getElementById("userMessage")?.value.trim() || "";

    if (!name || !type || !message) {
        alert("कृपया सभी आवश्यक जानकारी भरें।");
        return;
    }

    const whatsappText =
        `Namaste Indian Vivah,%0A%0A` +
        `Name: ${encodeURIComponent(name)}%0A` +
        `Type: ${encodeURIComponent(type)}%0A%0A` +
        `${encodeURIComponent(message)}`;

    window.open(
        `https://wa.me/918982523577?text=${whatsappText}`,
        "_blank",
        "noopener"
    );
}


// =========================================================
// PHASE 2 — PREMIUM VISUAL EFFECTS
// =========================================================

document.addEventListener("DOMContentLoaded", function () {

    // Scroll reveal
    const revealItems =
        document.querySelectorAll(".iv-reveal");

    if ("IntersectionObserver" in window) {

        const revealObserver =
            new IntersectionObserver(function (entries, observer) {

                entries.forEach(function (entry) {

                    if (entry.isIntersecting) {
                        entry.target.classList.add("iv-visible");
                        observer.unobserve(entry.target);
                    }
                });

            }, {
                threshold: 0.12
            });

        revealItems.forEach(function (item) {
            revealObserver.observe(item);
        });

    } else {

        revealItems.forEach(function (item) {
            item.classList.add("iv-visible");
        });
    }


    // Gentle 3D tilt on desktop only
    if (
        window.matchMedia("(min-width: 769px)").matches &&
        !window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {

        document.querySelectorAll(".iv-tilt-card").forEach(function (card) {

            card.addEventListener("mousemove", function (event) {

                const rect =
                    card.getBoundingClientRect();

                const x =
                    event.clientX - rect.left;

                const y =
                    event.clientY - rect.top;

                const rotateY =
                    ((x / rect.width) - 0.5) * 5;

                const rotateX =
                    ((y / rect.height) - 0.5) * -5;

                card.style.transform =
                    `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-3px)`;
            });

            card.addEventListener("mouseleave", function () {
                card.style.transform = "";
            });
        });
    }
});
