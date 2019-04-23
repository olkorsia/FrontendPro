const imgArr = ['1.jpg', '2.jpg', '3.jpg', '4.jpg'];
const imgDir = 'img';
const carouselControlNext = document.getElementsByClassName('carousel-control-next')[0];
const carouselControlPrev = document.getElementsByClassName('carousel-control-prev')[0];

const carouselIndicators = document.getElementsByClassName('carousel-indicators')[0];

let activeSlide = 0; // index of Image Array


const validationSliderButton = () => {
    carouselControlPrev.style.display = activeSlide === 0 ? 'none' : 'flex';
    carouselControlNext.style.display = activeSlide === (imgArr.length - 1) ? 'none' : 'flex';
}

const drawer = (() => {
    const innerCarusel = document.getElementsByClassName('carousel-inner')[0];

    for (let i = 0; i < imgArr.length; i++) {
        const indicator = document.createElement('li');
        indicator.setAttribute('class', (activeSlide === i ? ' active' : ''));
        indicator.setAttribute('data-slide', i);

        const item = document.createElement('div');
        item.setAttribute('class', 'carousel-item' + (activeSlide === i ? ' active' : ''));

        const imgInItem = document.createElement('img');
        imgInItem.setAttribute('class', 'd-block w-100');
        imgInItem.style.height = document.documentElement.clientHeight + 'px';
        imgInItem.style.objectFit = 'cover';
        imgInItem.src = `${imgDir}/${imgArr[i]}`;


        item.appendChild(imgInItem);
        innerCarusel.appendChild(item);
        carouselIndicators.appendChild(indicator);
    }

    validationSliderButton();
})();

const changeSlide = (current, nextSlide) => {
    const elements = document.getElementsByClassName('carousel-item');
    elements[current].setAttribute('class', 'carousel-item');
    elements[nextSlide].setAttribute('class', 'carousel-item active');

    carouselIndicators.children[current].setAttribute('class', '');
    carouselIndicators.children[nextSlide].setAttribute('class', 'active');

    validationSliderButton();
}


const incSlide = () => {
    changeSlide(activeSlide, ++activeSlide);
}

const decSlide = () => {
    changeSlide(activeSlide, --activeSlide);
}

const changeSlider = nextSlide => {
    changeSlide(activeSlide, activeSlide = nextSlide);
}


carouselControlNext.addEventListener('click', e => {
    e.preventDefault();
    incSlide();
});

carouselControlPrev.addEventListener('click', e => {
    e.preventDefault();
    decSlide();
});

carouselIndicators.addEventListener('click', e => {
    if ((e.target.nodeName).toLowerCase() !== 'li') {
        return;
    }

    const dataSlide = parseInt( e.target.getAttribute('data-slide') );
    changeSlider( dataSlide );
});