let APP = new Object();
APP.apps = new Object();

APP.log = function (message = "Loading...", duration = 3000) {
  const containerId = "loading-container";

  console.log("Log: " + message);

  const existingContainer = document.getElementById(containerId);
  if (existingContainer) {
    document.body.removeChild(existingContainer);
  }

  const container = document.createElement("div");
  container.id = containerId;
  container.style.position = "fixed";
  container.style.zIndex = "999999";
  container.style.top = "50%";
  container.style.left = "50%";
  container.style.transform = "translate(-50%, -50%)";
  container.style.backgroundColor = "rgba(0, 0, 0, 0.7)";
  container.style.color = "white";
  container.style.padding = "20px";
  container.style.borderRadius = "5px";
  container.style.zIndex = "1000";

  const loadingText = document.createElement("div");
  loadingText.textContent = message;

  container.appendChild(loadingText);

  document.body.appendChild(container);

  setTimeout(() => {
    hide();
  }, duration);

  function hide() {
    const existingContainer = document.getElementById(containerId);
    if (existingContainer) {
      document.body.removeChild(existingContainer);
    }
  }

  return { hide };
};

window.addEventListener("load", function () {
  setTimeout(() => {
    const elements = document.querySelectorAll(".flow-element, .adsbygoogle");
    let throttled = false;

    elements.forEach((element) => {
      const overlay = element.querySelector(".overlay");
      element.addEventListener("mousemove", throttle(handleMouseMove, 16));
      element.addEventListener("mouseenter", handleMouseEnter);
      element.addEventListener("mouseleave", handleMouseLeave);
    });

    function handleMouseMove(e) {
      if (!throttled) {
        requestAnimationFrame(() => {
          const rect = this.getBoundingClientRect();
          const centerX = rect.left + rect.width / 2;
          const centerY = rect.top + rect.height / 2;
          const mouseX = e.clientX - centerX;
          const mouseY = centerY - e.clientY;
          const percentX = mouseX / (rect.width / 2);
          const percentY = mouseY / (rect.height / 2);

          const rY = percentX * 3;
          const rX = percentY * 3;

          this.style.transform = `perspective(1000px) rotateX(${rX}deg) rotateY(${rY}deg)`;

          throttled = true;
          setTimeout(() => {
            throttled = false;
          }, 16);
        });
      }
    }

    function handleMouseEnter() {
      clearTimeout(this.mouseLeaveDelay);
    }

    function handleMouseLeave() {
      this.mouseLeaveDelay = setTimeout(() => {
        this.style.setProperty("--transform", "none");
      }, 1000);
    }

    function throttle(func, delay) {
      return function () {
        if (!throttled) {
          func.apply(this, arguments);
        }
      };
    }
  }, 200);
});

function addGoogleAnalytics() {
  const script = document.createElement("script");
  script.src = "https://www.googletagmanager.com/gtag/js?id=G-L51JYCTGX7";
  script.async = true;
  document.head.appendChild(script);

  script.onload = function () {
    window.dataLayer = window.dataLayer || [];
    function gtag() {
      dataLayer.push(arguments);
    }
    gtag("js", new Date());
    gtag("config", "G-L51JYCTGX7");
  };
}

addGoogleAnalytics();
