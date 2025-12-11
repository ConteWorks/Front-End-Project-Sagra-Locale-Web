// ==============================
// INCLUDE HTML (Navbar e Footer)
// ==============================
function includeHTML(elementId, filePath) {
    fetch(filePath)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Impossibile caricare il file ${filePath}. Stato: ${response.status}`);
            }
            return response.text();
        })
        .then(data => {
            document.getElementById(elementId).innerHTML = data;
        })
        .catch(error => console.error(error));
}

// Includi navbar e footer
includeHTML('navbar-placeholder', 'navbar.html');
includeHTML('footer-placeholder', 'footer.html');


// ==============================
// FUNZIONE PER CAROSELLO DELLA GALLERY
// ==============================
document.addEventListener('DOMContentLoaded', () => {

    // --------------------------
    // Carosello
    // --------------------------
    const carouselTrack = document.querySelector('.carousel-track');
    const carouselImages = [
        "./img/DSCN4424.jpg",
        "./img/agosto_2010-1.jpg",
        "./img/animazione_1.JPG",
        "./img/scamosce_forno.jpg",
        "./img/dolci.jpg",
        "./img/agosto_2012-3.jpg",
        "./img/agosto_2010.jpg",
        "./img/agosto_2011.jpg",
        "./img/vassoio.jpeg"
    ];

    if (carouselTrack) {
        // Genera le slide dinamicamente
        carouselImages.forEach(src => {
            const slide = document.createElement('div');
            slide.classList.add('carousel-slide');
            slide.innerHTML = `<img src="${src}" class="carousel-img" alt="">`;
            carouselTrack.appendChild(slide);
        });

        const slides = Array.from(carouselTrack.children);
        const nextButton = document.querySelector('.next-button');
        const prevButton = document.querySelector('.prev-button');
        let currentIndex = 0;

        function updateCarousel() {
            const width = slides[0].getBoundingClientRect().width;
            carouselTrack.style.transform = `translateX(-${currentIndex * width}px)`;
        }

        window.addEventListener('resize', updateCarousel);

        nextButton.addEventListener('click', () => {
            currentIndex++;
            if (currentIndex >= slides.length) currentIndex = 0;
            updateCarousel();
        });

        prevButton.addEventListener('click', () => {
            currentIndex--;
            if (currentIndex < 0) currentIndex = slides.length - 1;
            updateCarousel();
        });

        updateCarousel();
    }

    // --------------------------
    // Evidenzia link attivo navbar
    // --------------------------
    const currentPage = window.location.pathname.split('/').pop(); // es: 'index.html'
    document.querySelectorAll('.nav-links a').forEach(link => {
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        }
    });

    // --------------------------
// Post (immagini e video)
// --------------------------
const posts = [
    { 
        type: 'image', 
        title: 'U Moccio', 
        img: './img/moccio.jpeg', 
        desc: 'A San Mango Cilento abbiamo un guardiano speciale: U Moccio, il mascherone della Fontana Cannavata. Un volto di pietra che da generazioni accompagna la vita del paese… e che oggi è diventato anche il simbolo della nostra sagra “U Sfriuonzolo sotto l’Arco”. Il 12, 13 e 14 agosto il borgo si anima di profumi, musica e tradizioni. E lui è lì, come sempre, a ricordarci da dove veniamo. Venite a trovarci: il Cilento più autentico vi aspetta… sotto il suo sguardo.', 
        date: '1 agosto 2025'
    },

    { 
        type: 'video', 
        title: 'torna la sagra U Sfriuonzolo', 
        youtubeId: '973AcmalMfM', 
        desc: 'Torna la Sagra U Sfriuonzolo Sotto L\'Arco a San Mango Cilento', 
        date: '14 Agosto 2024' 
    },

    { 
        type: 'image', 
        title: 'La nostra storia', 
        img: './img/1.jpg', 
        desc: 'Le bellezze del nostro paese.', 
        date: '13 Agosto 2024' 
    },

    { 
        type: 'video', 
        title: 'Video della Sagra', 
        youtubeId: 'oOZiED9wFRY', 
        desc: 'Guarda il video del nostro evento!', 
        date: '12 Agosto 2024' 
    },

    { 
        type: 'image', 
        title: 'A Scamoscia', 
        img: './img/forno.jpeg', 
        desc: 'Il nostro pane tradizionale, cotto nel forno a legna.', 
        date: '10 Agosto 2024' 
    }
];


const containerPost = document.querySelector('.container-post');
if (containerPost) {
    let postsHTML = '<section class="posts">';
    posts.forEach(post => {
        if (post.type === 'video') {
            postsHTML += `
                <div class="post-card">
                    <h3>${post.title}</h3>
                    <p class="date">${post.date}</p>
                    <iframe 
                        width="560" height="315" 
                        src="https://www.youtube.com/embed/${post.youtubeId}" 
                        title="${post.title}" 
                        frameborder="0" 
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                        allowfullscreen>
                    </iframe>
                    <p>${post.desc}</p>
                </div>
            `;
        } else if (post.type === 'image') {
            postsHTML += `
                <div class="post-card">
                    <h3>${post.title}</h3>
                    <p class="date">${post.date}</p>
                    <img src="${post.img}" alt="${post.title}">
                    <p>${post.desc}</p>
                </div>
            `;
        }
    });
    postsHTML += '</section>';
    containerPost.innerHTML = postsHTML;
}

    // --------------------------
    // Cards Menù
    // --------------------------
    const dishes = [
        { name: "Cavatielli al Sugo", img: "./img/cavatielli.jpg", desc: "Pasta fatta a mano secondo la tradizione locale, condita con sugo rustico." },
        { name: "Pasta e fagioli", img: "./img/pasta_e_fagioli.jpg", desc: "Pasta e fagioli della tradizione." },
        { name: "U Sfriuonzolo", img: "./img/sfriuonzolo.jpg", desc: "Il piatto tipico della sagra, preparato come da ricetta tradizionale." },
        { name: "Capicollo e Patatine", img: "./img/capicollo.jpeg", desc: "Capicollo alla brace, con patatine fritte" },
        { name: "Salsiccia e Patatine", img: "./img/salsiccia_e_patatine.jpg", desc: "Salsiccia alla brace, con patatine fritte." },
        { name: "A Scamoscia", img: "./img/scamoscia.jpeg", desc: "Il nostro pane tradizionale, cotto nel forno a legna." },
        { name: "Le Zeppole", img: "./img/zeppole.png", desc: "Le nostre zeppole fritte." },
        { name: "Vino e Percoche", img: "./img/percoca.jpg", desc: "Un gustoso bicchiere di vino e percoche, da assaporare sotto il palco." }
    ];

    const menuContainer = document.querySelector('.menu');
    if (menuContainer) {
        let dishesHTML = '<section class="cards">';
        dishes.forEach(dish => {
            dishesHTML += `
                <div class="card">
                    <div class="card-image">
                        <img src="${dish.img}" alt="${dish.name}">
                    </div>
                    <div class="card-content">
                        <h3>${dish.name}</h3>
                        <p>${dish.desc}</p>
                    </div>
                </div>
            `;
        });
        dishesHTML += '</section>';
        menuContainer.innerHTML = dishesHTML;
    }

    // --------------------------
    // Lightbox
    // --------------------------
    const lightbox = document.getElementById('card-lightbox');
    if (lightbox) {
        const lightboxImg = lightbox.querySelector('img');
        const lightboxTitle = lightbox.querySelector('h3');
        const lightboxDesc = lightbox.querySelector('p');
        const closeBtn = lightbox.querySelector('.close');

        document.querySelectorAll('.card').forEach(card => {
            card.addEventListener('click', () => {
                lightboxImg.src = card.querySelector('img').src;
                lightboxTitle.textContent = card.querySelector('h3').textContent;
                lightboxDesc.textContent = card.querySelector('p').textContent;
                lightbox.style.display = 'flex';
            });
        });

        closeBtn.addEventListener('click', () => lightbox.style.display = 'none');

        lightbox.addEventListener('click', e => {
            if (e.target === lightbox) lightbox.style.display = 'none';
        });
    }

}); // fine DOMContentLoaded


// ===============================
//  NEWS CAROUSEL
// ===============================

// Inserisci qui i tuoi post
const newsPosts = [
    {
        titolo: "Ogni sera un concerto!",
        img: "./img/concerto.jpeg",
        testo: "Ogni sera dopo aver gustato le nostre pietanze si esibirà un gruppo fantastico alle ore 23:00!"
    },
    {
        titolo: "Le prove del forno iniziano!",
        img: "./img/f.jpeg",
        testo: "Il forno a legna è stato acceso per i primi test: profumo in tutto il paese!"
    },
    {
        titolo: "Nuovo piatto in anteprima",
        img: "",
        testo: "Senza immagine: stiamo testando un nuovo piatto segretissimo... restate aggiornati!"
    }
];

const newsTrack = document.getElementById("news-track");
const newsPrev = document.querySelector(".news-prev");
const newsNext = document.querySelector(".news-next");

// Creazione slide
newsPosts.forEach(post => {
    const slide = document.createElement("div");
    slide.classList.add("carousel-slide", "news-slide");

    slide.innerHTML = `
        ${post.img ? `<img src="${post.img}" alt="${post.titolo}">` : ""}
        <h3>${post.titolo}</h3>
        <p>${post.testo}</p>
    `;

    newsTrack.appendChild(slide);
});

// Logica scorrimento 
let newsIndex = 0;

function updateNewsCarousel() {
    const width = document.querySelector(".news-carousel").offsetWidth;
    newsTrack.style.transform = `translateX(${-newsIndex * width}px)`;
}

newsNext.addEventListener("click", () => {
    newsIndex++;
    if (newsIndex >= newsPosts.length) {
        newsIndex = 0;
    }
    updateNewsCarousel();
});

newsPrev.addEventListener("click", () => {
    newsIndex--;
    if (newsIndex < 0) {
        newsIndex = newsPosts.length - 1; 
    }
    updateNewsCarousel();
});



window.addEventListener("resize", updateNewsCarousel);


//news della sezione index
document.querySelectorAll('.news-slide').forEach(slide => {
    if (slide.querySelector('img')) {
        slide.classList.add('has-image');
    }
});
