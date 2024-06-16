const weatherWrap = document.getElementById('weather_wrap');
const mainWeat = document.querySelector('.main-weat');
const maxHeight = 180;
const minHeight = 0;
const maxOpacity = 1;
const minOpacity = 0;

let ticking = false;

if(weatherWrap){
weatherWrap.addEventListener('scroll', function() {
    if (!ticking) {
        window.requestAnimationFrame(() => {
            const scrollPosition = weatherWrap.scrollTop;
            const newHeight = Math.max(minHeight, maxHeight - scrollPosition);
            const newOpacity = Math.max(minOpacity, maxOpacity - (scrollPosition / maxHeight));
            mainWeat.style.transform = `scale(${newOpacity})`;
            mainWeat.style.opacity = newOpacity;
            ticking = false;
        });
        ticking = true;
    }
});}


