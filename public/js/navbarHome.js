let scrolledn=false, scrolledy=false;

const navbarToggler = () => {
    if(!document.getElementById('navbar').classList.contains('scrolled')){
        // console.log('worked')
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
            // console.log('normal scroll')
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