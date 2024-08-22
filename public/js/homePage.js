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

// Start the slider
startSlider();
document.addEventListener("DOMContentLoaded", function () {
    document.body.style.overflowY = "hidden";
    const navbar = document.getElementById('navbar');
    const headText = document.querySelector('.head-text > h1');
    const heroHeight = document.querySelector('.hero');

    const adjustMarginTop = () => {
        const navbarHeight = navbar.offsetHeight;
        headText.style.marginTop = navbarHeight + navbarHeight + 'px';
        heroHeight.style.height = window.innerHeight - navbarHeight + 'px';
    };
    adjustMarginTop();
    window.addEventListener('resize', adjustMarginTop);

    const apiKey = '0oXwZ5we7CdXnjHknsCTHyMT4O5PSZYm';
    const stockSymbols = ['AAPL', 'MSFT', 'GOOGL', 'AMZN', 'TSLA', 'FB', 'BRK.B', 'JNJ', 'V', 'WMT'];

    function getRandomStockSymbol() {
        const randomIndex = Math.floor(Math.random() * stockSymbols.length);
        return stockSymbols[randomIndex];
    }

    // const apiKey = '66c4e8f513d110.81219008';
    // const apiUrl = `https://eodhistoricaldata.com/api/news?api_token=66c4e8f513d110.81219008&s=general`;
    const apiUrl = `https://eodhd.com/api/news?s=AAPL.US&offset=0&limit=10&api_token=demo&fmt=json`;

    async function fetchNews() {
        try {
            const response = await fetch(apiUrl);
            const data = await response.json();
            const jeeti= Math.floor(Math.random()*10);

            let newsHtml = '';
            newsHtml += `<div style="display: flex; align-items: center; flex-direction: column; background-color: #d9d9d90d; border-radius: 10%; padding: 1rem; width: 90%; max-width: 400px; box-sizing: border-box; overflow: hidden;">
    <h2 id="stock-name" style="font-size: 1.2rem; margin: 0.5rem 0; text-align: center; word-wrap: break-word;">${data[jeeti].title}</h2>
    <p id="stock-price" style="
        font-size: 1rem; 
        margin: 0.5rem 0; 
        text-align: center; 
        word-wrap: break-word; 
        overflow: hidden;
        display: -webkit-box; 
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 3; 
        line-clamp: 3; 
        max-height: 4.5em;
        position: relative;
    ">
        ${data[jeeti].content}
        <span style="position: absolute; bottom: 0; right: 0; background-color: #d9d9d90d;">...</span>
    </p>
    <a id="stock-link" href="${data[jeeti].link}" target="_blank" style="text-decoration: none; width: 100%;">
        <div class="kushal" style="color: #000; text-align: center; padding: 0.75rem;border-radius: 5px; font-size: 1rem;">More info...</div>
    </a>
</div>

            `;
            document.getElementById('vibrator').innerHTML = newsHtml;
        } catch (error) {
            document.getElementById('vibrator').innerHTML = 'Failed to load news.';
            console.error('Error fetching news:', error);
        }
    }

    fetchNews();
    try {
        x= localStorage.getItem('wealthScorage');
        if(x===null)    x='0.0'
        document.getElementById('llmao').innerHTML=`Current Financial Score: ${x}`;
    }
    catch(error) {
        document.getElementById('llmao').innerHTML=`Current Financial Score: 0.0`,console.log('chalna2');
    }
});
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