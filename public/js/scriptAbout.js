let scrolledn=false, scrolledy=false;

const navbarToggler = () => {
    if(!document.getElementById('navbar').classList.contains('scrolled')){
        console.log('worked')
        navbar.classList.add("scrolled");
        scrolledn = true;
        scrolledy = true;
    }
    document.querySelector(".navbar-toggler-icon").style.display = 'none';
    document.querySelector(".closeNavbar").style.display = 'block';
    document.querySelector(".closeNavbar").style.height = 30 + 'px';
    document.querySelector(".closeNavbar").style.width = 30 + 'px';
}

const navbarClose = () => {
    if(scrolledy){
        navbar.classList.remove("scrolled");
        scrolledn = false;
        scrolledy = false;
    }
        
    document.querySelector(".navbar-toggler-icon").style.display = 'block';
    document.querySelector(".closeNavbar").style.display = 'none';
}

window.addEventListener("scroll", () => {
    if (window.scrollY > document.getElementById('navbar').style.height) {
    if (!scrolledn) {
            navbar.classList.add("scrolled");
            scrolledn = true;
        }
    }
    else {
        if (scrolledn) {
            navbar.classList.remove("scrolled");
            scrolledn = false;
        }
    }
});
let scrolled = false;
function scrollToSection() {
    const targetElement = document.getElementById("target-section");
    targetElement.scrollIntoView({ behavior: "smooth" });
}

const slider = document.getElementById('slider');
const slides = slider.children;
const navDots = document.getElementById('slider-nav').children;
let currentSlide = 0;
let slideInterval;

function nextSlide() {
    goToSlide((currentSlide + 1) % slides.length);
}
function previousSlide() {
    goToSlide((currentSlide - 1 + slides.length) % slides.length);
}
function goToSlide(n) {
    slides[currentSlide].style.display = 'none';
    navDots[currentSlide].classList.remove('active');
    currentSlide = (n + slides.length) % slides.length;
    slides[currentSlide].style.display = 'flex';
    navDots[currentSlide].classList.add('active');
}
function startSlider() {
    slideInterval = setInterval(nextSlide, 8000);
}
function pauseSlider() {
    clearInterval(slideInterval);
}
function resetSlider() {
    pauseSlider();
    startSlider();
}
for (let i = 1; i < slides.length; i++) {
    slides[i].style.display = 'none';
}
slider.addEventListener('click', resetSlider);
document.getElementById('slider-nav').addEventListener('click', (e) => {
    if (e.target.tagName === 'A') {
        e.preventDefault();
        const index = Array.from(navDots).indexOf(e.target);
        goToSlide(index);
        resetSlider();
    }
});

// Touch events for mobile swiping
let touchStartX = 0;
let touchEndX = 0;

slider.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
}, false);

slider.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
}, false);

function handleSwipe() {
    if (touchEndX < touchStartX) {
        nextSlide();
    }
    if (touchEndX > touchStartX) {
        previousSlide();
    }
    resetSlider();
}


function goToCalculator() {
    window.location = '/calculator/emi';
}

window.addEventListener("resize", () => {
    if ((window.innerWidth <= 575)) {
        if (!scrolled) {
            navbar.classList.add("scrolled");
            scrolled = true;
        }
    } else {
        if (scrolled) {
            navbar.classList.remove("scrolled");
            scrolled = false;
        }
    }
})

gsap.fromTo(
    ".loading-page",
    {
        opacity: 1,
    },
    {
        opacity: 0,
        display: "none",
        duration: 1.5,
        delay: 3.5,
    }
);

gsap.fromTo(
    ".logo-name",
    {
        y: 50,
        opacity: 0,
    },
    {
        y: 0,
        opacity: 1,
        duration: 2,
        delay: 0.5,
    }
);

window.addEventListener('load', () => {
    if (!sessionStorage.getItem('visited')) {
        document.querySelector('.loading-page').style.display = 'flex';
        document.querySelector('.main-body').style.opacity = '0';

        setTimeout(() => {
            document.querySelector('.loading-page').style.opacity = '0';
            document.querySelector('.main-body').style.opacity = '1';
            document.body.style.overflowY = 'scroll';

            setTimeout(() => {
                document.querySelector('.loading-page').style.display = 'none';
            }, 1000);
        }, 3500);

        sessionStorage.setItem('visited', 'true');
    }
    else {
        document.querySelector('.loading-page').style.display = 'none';
        document.querySelector('.main-body').style.opacity = '1';
        document.body.style.overflowY = 'scroll';
    }
});