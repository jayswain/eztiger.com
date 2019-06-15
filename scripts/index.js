const img = new Image();
const bg = document.querySelector('.background');
img.onload = () => {
    bg.classList.add("background--image-loaded");
}
img.src = "./images/tiger.svg";

const colors = [];

const hexValue = hexish => !hexish.match(/#/) ? `#${hexish}` : hexish;

let gradientString = "";
fetch('https://raw.githubusercontent.com/ghosh/uiGradients/master/gradients.json')
    .then((response) => {
        return response.json();
    }).then((json) => {
    json.forEach((item) => {
        item.colors.forEach((color) => {
        colors.push(hexValue(color));
        });
    });
    gradientString = "linear-gradient(-45deg, " + colors + ")";
    bg.style.backgroundImage = gradientString;
    bg.style.backgroundSize = (colors.length * 100) + "% " + (colors.length * 100) + "%";
});

/* count down timer, lets eat some moooar cycles*/
const burnStart = new Date('8/25/2019 7:00 AM'); // in UTC
const _milli = 1;
const _second = 1000;
const _minute = _second * 60;
const _hour = _minute * 60;
const _day = _hour * 24;

function showRemaining() {
    const now = new Date();
    const nowUTC = new Date(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(), now.getUTCHours(), now.getUTCMinutes(), now.getUTCSeconds());
    const distance = burnStart - nowUTC;

    if (distance < 0) {
      clearInterval(timer);
      document.getElementById('countdown').innerHTML = 'FUUUCK YOUR BURN';
      return;
    }
    const days = Math.floor(distance / _day);
    const hours = Math.floor((distance % _day) / _hour);
    const minutes = Math.floor((distance % _hour) / _minute);
    const seconds = Math.floor((distance % _minute) / _second);

    document.getElementById('countdown').innerHTML = `Countdown to Infiltration : ${days} Days | ${hours} hours | ${minutes} minutes | ${seconds} seconds`;
}

const timer = setInterval(showRemaining, 1000);