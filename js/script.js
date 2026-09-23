document.addEventListener("DOMContentLoaded", function () {
  var burger = document.querySelector(".header__burger");
  var mobileNav = document.querySelector(".mobile-nav");
  if (burger && mobileNav) {
    burger.addEventListener("click", function () {
      var isActive = burger.classList.toggle("active");
      mobileNav.classList.toggle("active");
      burger.setAttribute("aria-expanded", isActive ? "true" : "false");
    });

    mobileNav.querySelectorAll(".nav__menu-link, .mobail-login, .mobail-sign").forEach(function (link) {
      link.addEventListener("click", function () {
        burger.classList.remove("active");
        mobileNav.classList.remove("active");
        burger.setAttribute("aria-expanded", "false");
      });
    });
  }

  var languageToggle = document.getElementById("languageToggle");
  var mobileLanguageToggle = document.getElementById("mobileLanguageToggle");
  var languageText = document.getElementById("languageText");
  var mobileLangText = document.querySelector(".mobile-lang__text");

  var toggleLang = function () {
    var current = (languageText ? languageText.textContent : (mobileLangText ? mobileLangText.textContent : "RU")).trim();
    var next = current === "RU" ? "EN" : "RU";
    if (languageText) languageText.textContent = next;
    if (mobileLangText) mobileLangText.textContent = next;
  };

  [languageToggle, mobileLanguageToggle].forEach(function (toggle) {
    if (toggle) {
      toggle.addEventListener("click", toggleLang);
      toggle.addEventListener("keydown", function (e) {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          toggleLang();
        }
      });
    }
  });

  var content = document.querySelector(".banner-blog__payment-content");
  var scrollbarThumb = document.querySelector(".custom-scrollbar-thumb");
  var scrollbarTrack = document.querySelector(".custom-scrollbar-track");
  if (content && scrollbarThumb && scrollbarTrack) {
    content.addEventListener(
      "scroll",
      function () {
        var scrollHeight = content.scrollHeight;
        var clientHeight = content.clientHeight;
        var scrollTop = content.scrollTop;
        var maxScrollTop = scrollHeight - clientHeight;
        if (maxScrollTop > 0) {
          var scrollbarTrackHeight = scrollbarTrack.clientHeight;
          var scrollbarThumbHeight = scrollbarThumb.clientHeight;
          var topPercentage = scrollTop / maxScrollTop;
          var newTop = (scrollbarTrackHeight - scrollbarThumbHeight) * topPercentage;
          scrollbarThumb.style.top = newTop + "px";
        }
      },
      { passive: true }
    );
  }
});
