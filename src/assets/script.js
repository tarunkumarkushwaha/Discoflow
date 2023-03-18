// headline slides 
let slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n) {
    showSlides(slideIndex += n);
}

function currentSlide(n) {
    showSlides(slideIndex = n);
}

function showSlides(n) {
    let i;
    let slides = document.getElementsByClassName("mySlides");
    let dots = document.getElementsByClassName("dot");
    if (n > slides.length) { slideIndex = 1 }
    if (n < 1) { slideIndex = slides.length }
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }
    slides[slideIndex - 1].style.display = "block";
    dots[slideIndex - 1].className += " active";
}
// document declerations
let newsitems = document.getElementById('newsitems')
// initiations
let noofnewsitem = 10
let url = 'https://newsapi.org/v2/top-headlines?sources=bbc-news&apiKey=9b91159d54c9432da70f054ed183bd4e'
async function fetchednews() {
    const response = await fetch(url)
    const data = await response.json()
    console.log(data)

    for (let i = 0; i < 3; i++) {
        // console.log(i)
        document.getElementById('headlinetitle' + (i + 1)).innerText = data.articles[i].title
        document.getElementById('newsdesc' + (i + 1)).innerHTML = `${data.articles[i].content.split("[")[0]} <b>Click to read</b>`
        document.getElementById('headlineimage' + (i + 1)).setAttribute("src", data.articles[i].urlToImage)
        document.getElementById('newsheadlines' + (i + 1)).addEventListener('click', () => location.href = data.articles[i].url)
    }
    for (let i = 0; i < noofnewsitem; i++) {
        // console.log(i)
        let news = document.createElement('div')
        news.setAttribute("class", "newsitem")
        news.innerHTML = `<h3 class="newstitle">${data.articles[i].title}</h3>
        <img class="newsimage" src="${data.articles[i].urlToImage}"
            alt="your news">`
        // <p class="newsdesc">${data.articles[i].content}</p>`
        news.addEventListener('click', () => location.href = data.articles[i].url)
        newsitems.append(news)
    }
}
fetchednews()
