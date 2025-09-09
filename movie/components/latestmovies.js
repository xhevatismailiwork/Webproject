        import axios from '../node_modules/axios/dist/esm/axios.js';

        export default async function latestmovies(settings) {
            const url = settings.URL;
            const n = settings.number_of_movies;
            const container = settings.container;
            let html = '';

            try {
                const response = await axios.get(url);
                const movies = response.data.slice(0, n);
                html = `
                    <div class="flex flex-row gap-4 justify-center items-center flex-wrap">
                        ${movies.map(item => {
                            const show = item;
        const img = show.image ? show.image.medium : 'https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg';
                            return `
    <div class="flip-card">
                <div class="flip-card-inner">
                <div class="flip-card-front">
                    <img src="${img}" alt="${movie.name}" class="w-full h-full object-cover rounded-[1rem]" />
                </div>
                <div class="flip-card-back">
                    <h3 class="title">${movie.name}</h3>
                    <p>${movie.premiered ? movie.premiered.split('-')[0] : 'Unknown year'}</p>
                    <button class="add-btn">add to card</button>
                </div>
                </div>
            </div>
                            `;
                        }).join('')}
                    </div>
                `;
                container.innerHTML = html;
            } catch {
            }
        }