document.addEventListener("DOMContentLoaded", function() {
    const consentContainer = document.getElementById("cookie-consent");
    const consentMessage = document.getElementById("consent-message");
    const acceptButton = document.getElementById("accept-cookies");
    const rejectButton = document.getElementById("reject-cookies");
    const learnMoreButton = document.getElementById("learn-more");
    const languageSelector = document.querySelector(".language-selector");
    const modal = document.getElementById("learn-more-modal");
    const closeModal = document.getElementById("close-modal");
    const fullPolicy = document.getElementById("full-policy");

    if (!consentContainer || !consentMessage || !acceptButton || !rejectButton || !learnMoreButton || !languageSelector || !modal || !closeModal || !fullPolicy) {
        console.error("One or more elements are missing from the DOM.");
        return;
    }

    // Load user's consent status from local storage
    let userConsent = null;
    try {
        userConsent = JSON.parse(localStorage.getItem("cookieConsent"));
    } catch (e) {
        console.error("Error parsing cookie consent from localStorage", e);
    }

    // Detect the website's language or use the stored language
    let currentLanguage = localStorage.getItem("language") || document.documentElement.lang || "en";
    loadTranslations(currentLanguage);

    // Show consent message if user has not made a choice or consent has expired
    if (!userConsent || new Date() > new Date(userConsent.expiry)) {
        consentContainer.style.display = "flex";
    } else {
        consentContainer.style.display = "none";
    }

    // Accept cookies
    acceptButton.addEventListener("click", function() {
        setConsent("accepted");
        console.log("Cookies accepted");
        fadeOut(consentContainer);
    });

    // Reject cookies
    rejectButton.addEventListener("click", function() {
        setConsent("rejected");
        console.log("Cookies rejected");
        fadeOut(consentContainer);
    });

    // Learn more
    learnMoreButton.addEventListener("click", function() {
        modal.style.display = "flex";
    });

    // Close modal
    closeModal.addEventListener("click", function() {
        modal.style.display = "none";
    });

    // Close modal when clicking outside of it
    window.addEventListener("click", function(event) {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    });

    // Change language
    languageSelector.addEventListener("click", function(event) {
        if (event.target.classList.contains("lang-button")) {
            currentLanguage = event.target.id.split("-")[1];
            localStorage.setItem("language", currentLanguage);
            loadTranslations(currentLanguage);
        }
    });

    function loadTranslations(language) {
        fetch(`locales/${language}.json`)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Could not load translations for language: ${language}`);
                }
                return response.json();
            })
            .then(translations => {
                consentMessage.innerText = translations.cookieConsent.message;
                acceptButton.innerText = translations.cookieConsent.acceptButton;
                rejectButton.innerText = translations.cookieConsent.rejectButton;
                learnMoreButton.innerText = translations.cookieConsent.learnMore;
                fullPolicy.innerHTML = translations.cookieConsent.fullPolicy; // Use innerHTML to render HTML content
            })
            .catch(error => {
                console.error(error);
                alert("Error loading translations. Please try again later.");
            });
    }

    function setConsent(status) {
        const expiryDate = new Date();
        expiryDate.setFullYear(expiryDate.getFullYear() + 1); // Set expiry date to 1 year from now
        const consent = {
            status: status,
            expiry: expiryDate.toISOString()
        };
        localStorage.setItem("cookieConsent", JSON.stringify(consent));
    }

    function fadeOut(element) {
        element.style.transition = "opacity 0.5s ease-out";
        element.style.opacity = 0;
        setTimeout(() => {
            element.style.display = "none";
        }, 500);
    }
});