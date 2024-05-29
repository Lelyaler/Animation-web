document.addEventListener("DOMContentLoaded", function () {
  const burger = document.querySelector(".header__burger");
  const mobileNav = document.querySelector(".mobile-nav");

  burger.addEventListener("click", function () {
    burger.classList.toggle("active");
    mobileNav.classList.toggle("active");
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const languageToggle = document.getElementById("languageToggle");
  const languageText = document.getElementById("languageText");

  languageToggle.addEventListener("click", function () {
    if (languageText.textContent === "RU") {
      languageText.textContent = "EN";
    } else {
      languageText.textContent = "RU";
    }
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const content = document.querySelector(".banner-blog__payment-content");
  const scrollbarThumb = document.querySelector(".custom-scrollbar-thumb");
  const scrollbarTrack = document.querySelector(".custom-scrollbar-track");

  content.addEventListener("scroll", function () {
    const scrollHeight = content.scrollHeight;
    const clientHeight = content.clientHeight;
    const scrollTop = content.scrollTop;

    const scrollbarTrackHeight = scrollbarTrack.clientHeight;
    const scrollbarThumbHeight = scrollbarThumb.clientHeight;
    const maxScrollTop = scrollHeight - clientHeight;

    const topPercentage = scrollTop / maxScrollTop;
    const newTop =
      (scrollbarTrackHeight - scrollbarThumbHeight) * topPercentage;

    scrollbarThumb.style.transition = "top 0.3s ease";

    scrollbarThumb.style.top = `${newTop}px`;
  });
});
