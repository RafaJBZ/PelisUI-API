const config = {
    api_key: '85a50232635a6fb51f5878c1ec461703',
    api_base_url: 'https://api.themoviedb.org/3/',
    image_base_url: 'https://image.tmdb.org/t/p/w1280'
}


// const BASE_URL = process.env.API_BASE_URL
// const API_KEY = process.env.API_KEY
// const IMAGE_KEY = process.env.IMAGE_BASE_URL;
// console.log(BASE_URL);

const BASE_URL = config.api_base_url;
const API_KEY = config.api_key;
const IMAGE_KEY = config.image_base_url;

const navEmail = document.querySelector('.navbar-email');
const desktopMenu = document.querySelector('.desktop-menu');
const menuHam = document.querySelector('.menu');
const movieDetailClose = document.querySelector('.product-detail-close');
const mobileMenu = document.querySelector('.mobile-menu');
const cardsContainer = document.querySelector('.cards-container');
const movieDetailContainer =document.querySelector('#movieDetail');
const backDrop = document.querySelector('#backDrop');

let movieImageInfor  = document.getElementById("movieDetail").childNodes[3];
let movieNameInfor  = document.querySelector('#movieDetail .product-info p:nth-child(1)');
let movieDescInfor  = document.querySelector('#movieDetail .product-info p:nth-child(2)');


navEmail.addEventListener('click', toggleDesktopMenu);
menuHam.addEventListener('click', toggleMobileMenu);
movieDetailClose.addEventListener('click', closeProductDetailAside);

function toggleDesktopMenu() {
    desktopMenu.classList.toggle('inactive');
}

function toggleMobileMenu() {
    mobileMenu.classList.toggle('inactive');
}

function openMovieDetalAside() {
    movieDetailContainer.classList.remove('inactive');
    backDrop.classList.remove('inactive');
    
}

function closeProductDetailAside() {
    movieDetailContainer.classList.add('inactive');
    backDrop.classList.add('inactive');
}

async function getPopularMovies(page = 1) {
    let data = []
    try {
        const response = await fetch(`${BASE_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=${page}`);
        const responseData = await response.json();
        data = responseData?.results
    } catch (error) {
        
    }
    return data;
}


async function renderMovies() {
    const data = await getPopularMovies()
    console.log(data)

    for(const movie of data) {
        const movieCard = document.createElement('div');
        movieCard.classList.add('product-card');
        
        const imageUrl = `${IMAGE_KEY}/${movie.backdrop_path}`
        const productImg = document.createElement('img');
        productImg.setAttribute('src', imageUrl);
        productImg.addEventListener('click', openMovieDetalAside)
    
        const movieInfo = document.createElement('div');
        movieInfo.classList.add('product-info');
    
        const movieInfoDiv = document.createElement('div');
    
        const movieName = document.createElement('div');
        movieName.innerText = movie.title
        movieInfoDiv.append(movieName);
    
        const movieInfoFigure = document.createElement('figure');
        const movieImgCard = document.createElement('img');
    
        movieInfoFigure.appendChild(movieImgCard);
    
        movieInfo.append(movieInfoDiv, movieInfoFigure);
    
        movieCard.append(productImg, movieInfo);
    
        cardsContainer.appendChild(movieCard);

        productImg.addEventListener('click', function(){
            showMovie(movie.title, movie.overview, imageUrl);
            openMovieDetalAside();
        });

        movieImgCard.addEventListener('click', function(){
            addMovie();
        });
    }
}

renderMovies();


function showMovie(name, description, image){
    movieImageInfor.setAttribute('src', image);
    movieNameInfor.innerText = name;
    movieDescInfor.innerText = description;
}

function addMovie(){
    console.log('apreto al coraxon')
}