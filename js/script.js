document.addEventListener("DOMContentLoaded", function () {
  var burger = document.querySelector(".header__burger");
  var mobileNav = document.querySelector(".mobile-nav");
  if (burger && mobileNav) {
    burger.addEventListener("click", function () {
      burger.classList.toggle("active");
      mobileNav.classList.toggle("active");
    });
  }

  var languageToggle = document.getElementById("languageToggle");
  var languageText = document.getElementById("languageText");
  if (languageToggle && languageText) {
    var toggleLang = function () {
      languageText.textContent = languageText.textContent.trim() === "RU" ? "EN" : "RU";
    };
    languageToggle.addEventListener("click", toggleLang);
    languageToggle.addEventListener("keydown", function (e) {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        toggleLang();
      }
    });
  }

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
