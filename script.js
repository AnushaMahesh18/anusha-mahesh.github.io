// year
document.getElementById("year").textContent = new Date().getFullYear();

// typing effect (no libraries)
function typeRotate(el, words, period = 1400) {
  let txt = "";
  let wordIndex = 0;
  let isDeleting = false;

  function tick() {
    const full = words[wordIndex % words.length];

    if (isDeleting) txt = full.substring(0, txt.length - 1);
    else txt = full.substring(0, txt.length + 1);

    el.textContent = txt;

    let delta = isDeleting ? 40 : 65;
    if (!isDeleting && txt === full) { delta = period; isDeleting = true; }
    else if (isDeleting && txt === "") { isDeleting = false; wordIndex++; delta = 300; }

    setTimeout(tick, delta);
  }

  tick();
}

const typed = document.querySelector(".typed");
if (typed) {
  const words = JSON.parse(typed.getAttribute("data-typed") || "[]");
  if (words.length) typeRotate(typed, words);
}

// portfolio filters
const filterBtns = document.querySelectorAll(".filter");
const works = document.querySelectorAll(".work");

filterBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    filterBtns.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");

    const f = btn.dataset.filter;
    works.forEach(w => {
      const tags = (w.dataset.tags || "").split(/\s+/).filter(Boolean);
      const show = (f === "all") || tags.includes(f);
      w.classList.toggle("hidden", !show);
    });
  });
});

// active nav on scroll (desktop)
const navLinks = document.querySelectorAll(".nav a");
const sections = Array.from(document.querySelectorAll(".section"));

function setActive() {
  let idx = 0;
  const y = window.scrollY + 120;
  for (let i = 0; i < sections.length; i++) {
    if (sections[i].offsetTop <= y) idx = i;
  }
  const id = sections[idx]?.id;
  navLinks.forEach(a => a.classList.toggle("active", a.getAttribute("href") === `#${id}`));
}
window.addEventListener("scroll", setActive);
setActive();
