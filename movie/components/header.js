    export default function Header() {
        return `
        <header style="background-color: var(--costumbroun);">
            <div class="container mx-auto flex justify-between">
            <h1 class="font-bold text-3xl py-3" style="color: var(--bodybroun);">
                Movie Shop
                <svg xmlns="http://www.w3.org/2000/svg" width="70" height="70" class="mx-24" viewBox="0 0 24 24">
                <rect width="10" height="10" x="1" y="1" fill="currentColor" rx="1">
                    <animate id="svgSpinnersBlocksShuffle20" fill="freeze" attributeName="x" begin="0;svgSpinnersBlocksShuffle27.end" dur="0.2s" values="1;13"/>
                    <animate id="svgSpinnersBlocksShuffle21" fill="freeze" attributeName="y" begin="svgSpinnersBlocksShuffle24.end" dur="0.2s" values="1;13"/>
                    <animate id="svgSpinnersBlocksShuffle22" fill="freeze" attributeName="x" begin="svgSpinnersBlocksShuffle25.end" dur="0.2s" values="13;1"/>
                    <animate id="svgSpinnersBlocksShuffle23" fill="freeze" attributeName="y" begin="svgSpinnersBlocksShuffle26.end" dur="0.2s" values="13;1"/>
                </rect>
                <rect width="10" height="10" x="1" y="13" fill="currentColor" rx="1">
                    <animate id="svgSpinnersBlocksShuffle24" fill="freeze" attributeName="y" begin="svgSpinnersBlocksShuffle20.end" dur="0.2s" values="13;1"/>
                    <animate id="svgSpinnersBlocksShuffle25" fill="freeze" attributeName="x" begin="svgSpinnersBlocksShuffle21.end" dur="0.2s" values="1;13"/>
                    <animate id="svgSpinnersBlocksShuffle26" fill="freeze" attributeName="y" begin="svgSpinnersBlocksShuffle22.end" dur="0.2s" values="1;13"/>
                    <animate id="svgSpinnersBlocksShuffle27" fill="freeze" attributeName="x" begin="svgSpinnersBlocksShuffle23.end" dur="0.2s" values="13;1"/>
                </rect>
                </svg>
            </h1>
            <nav>
                <ul class="flex justify-between">
                <li class="mx-3 text-xl py-3 font-bold"><a href="index.html">Home</a></li>
                <li class="mx-3 text-xl py-3 font-bold"><a href="shop.html">Shop</a></li>
                <li class="mx-3 text-xl py-3 font-bold"><a href="card.html">Card</a></li>
                <li class="mx-3 text-xl py-3 font-bold"><a href="login.html">Login</a></li>
                </ul>
            </nav>
            </div>
        </header>
        `;
    }
