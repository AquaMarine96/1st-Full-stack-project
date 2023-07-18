let news = document.querySelector('.news');
let items = news.querySelectorAll('li');
let newsBut = document.querySelector('.newsButton');

for(let i = 0;i< items.length; i++){
    let moreButton = document.createElement('button');
    moreButton.textContent = "Read More";
    moreButton.classList.add('moreButton');
    items[i].appendChild(moreButton);

    moreButton.addEventListener('click', function () {
        console.log("clicked");
        let expand = items[i].querySelector('p');
        expand.style.display = "block";
        moreButton.style.display = "none";
        let lessButton = document.createElement('button')
        lessButton.textContent = "Read Less";
        items[i].appendChild(lessButton);
        lessButton.style.display = "block";
        lessButton.addEventListener('click', function () {
            expand.style.display = "none";
            moreButton.style.display = "block";
            lessButton.style.display = "none";
        });
    });
};


