document.addEventListener("DOMContentLoaded", () => {
  const slider = document.querySelector(".level");
  const mainContent = document.querySelector(".main-content");
  const navContainer = document.querySelector(".nav-container");
  const sliderContainer = document.querySelector(".slider-container");

  // Check if we're on the home page
  const isHomePage =
    window.location.pathname === "/" ||
    window.location.pathname === "/index.html";

  // Check if this is first visit in current session
  const hasVisitedThisSession = sessionStorage.getItem("hasVisited");

  if (isHomePage) {
    if (!hasVisitedThisSession) {
      // First visit in this session
      mainContent.classList.remove("revealed");
      navContainer.classList.remove("revealed");
      sliderContainer.classList.remove("hidden");

      slider.addEventListener("input", (event) => {
        const value = parseInt(event.target.value);
        const translateY = 100 - value;
        mainContent.style.transform = `translateY(${translateY}vh)`;
        mainContent.style.opacity = value / 100;
        navContainer.style.opacity = value / 100;

        if (value === 100) {
          mainContent.classList.add("revealed");
          navContainer.classList.add("revealed");
          setTimeout(() => {
            sliderContainer.classList.add("hidden");
            // Set session storage after first use
            sessionStorage.setItem("hasVisited", "true");
          }, 500);
        }
      });
    } else {
      // Returning visitor in same session - show content immediately
      mainContent.classList.add("revealed");
      navContainer.classList.add("revealed");
      sliderContainer.classList.add("hidden");
    }
  } else {
    // Not home page - show content immediately
    mainContent.classList.add("revealed");
    navContainer.classList.add("revealed");
    if (sliderContainer) {
      sliderContainer.classList.add("hidden");
    }
  }
});
