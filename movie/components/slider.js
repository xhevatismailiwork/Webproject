export default function Slider(settings) {
    let slides = settings.slides; 
    let active_slide = settings.active_slide; 
    let container = settings.container;

    setInterval(() => {
        if (active_slide >= slides.length) active_slide = 0;

        container.innerHTML = `<img src="${slides[active_slide]}" alt="slide" class="w-1/3 mx-auto py-6" />`;

        active_slide++;
    }, 2000); 
}
