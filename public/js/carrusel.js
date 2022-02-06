window.addEventListener('load', function() {
    let previousButton = document.querySelector("button.prev");
    let nextButton = document.querySelector("button.next");
    let carruselImgs = document.querySelectorAll(".carruselImages img");
    let dots = document.querySelectorAll(".dots span");

    function ReturnIndexOfActiveSlide() {
        let numOfImgs = carruselImgs.length;
        let activeSlideIndex = 0;
        for(let i = 0; i < numOfImgs; i++){
            if(carruselImgs[i].className == "activeSlide")
                activeSlideIndex = i;
        }
        return activeSlideIndex;
    }

    previousButton.addEventListener('click', function() {
        let activeSlideIndex = ReturnIndexOfActiveSlide();
        carruselImgs[activeSlideIndex].classList.remove("activeSlide");
        if(activeSlideIndex == 0)
            carruselImgs[dots.length-1].classList.add("activeSlide");
        else
            carruselImgs[activeSlideIndex-1].classList.add("activeSlide");
    });
    nextButton.addEventListener('click', function() {
        let activeSlideIndex = ReturnIndexOfActiveSlide();
        if(activeSlideIndex < dots.length && activeSlideIndex >= 0){
            carruselImgs[activeSlideIndex].classList.remove("activeSlide");
            if (activeSlideIndex == (dots.length - 1))
                carruselImgs[0].classList.add("activeSlide");
            else
                carruselImgs[activeSlideIndex+1].classList.add("activeSlide");
        }
    });
    for(let i = 0; i < dots.length; i++)
    {
        dots[i].addEventListener('click', function() {
            let activeSlideIndex = ReturnIndexOfActiveSlide();
            carruselImgs[activeSlideIndex].classList.remove("activeSlide");
            carruselImgs[i].classList.add("activeSlide");
        });
    };
})