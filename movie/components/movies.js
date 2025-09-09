    export default function Movies({ container, movies }) {
        container.innerHTML = `
            <div class="flex flex-row flex-wrap gap-6 justify-center items-start">
                ${movies.map(movie => {
                    const img = movie.image ? movie.image.medium : 'https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg';
                    return `
                    <div class="flip-card">
                <div class="flip-card-inner">
                <div class="flip-card-front">
                    <img src="${img}" alt="${movie.name}" class="w-full h-full object-cover rounded-[1rem]" />
                </div>
                <div class="flip-card-back">
                    <h3 class="title">${movie.name}</h3>
                    <p>${movie.premiered ? movie.premiered.split('-')[0] : 'Unknown year'}</p>
                    <button id="add-btn">add to card</button>
                </div>
                </div>
            </div>
                    `;
                }).join('')}
            </div>
        `;
    }