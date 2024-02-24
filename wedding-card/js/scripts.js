const albumImgCount = 30;
const image_path = "https://jigu1106.com/";

// 대문
document.getElementById('main-img-holder').src = get_image("main.jpg");

// 만든이
document.getElementById('creator-mingu').src = get_image("creator/1.jpg");
document.getElementById('creator-jihye').src = get_image("creator/2.jpg");
document.getElementById('creator-bbiyong').src = get_image("creator/3.jpg");

setScreenSize();

// 디데이
var dDayholder = document.getElementById('d-day-holder')
var dDayWrapper = document.createElement('div')
var remainDays = Math.max(0, Math.ceil((new Date().getTime() - new Date("2021-11-06T00:00:00").getTime()) / (1000 * 60 * 60 * 24)) - 1);
dDayWrapper.innerHTML = '<div>' + remainDays + '일</div>';
dDayholder.append(dDayWrapper)

// 앨범
var dAlbumHolder = document.getElementById('album-holder');
var lastAlbumImgIdx = 0;

for (var i = 0; i < 9; i++) {
    var thumbImgs = thumbImgLinks();

    dAlbumHolder.innerHTML += `        
    <a class="col-sm-4 col-4 p-0" data-bs-toggle="modal" data-bs-target="#modal-album" data-bs-slide-to="${i}">
        <div class="square">
            <img class="thumbnail lazy wow fadeIn" data-src="${thumbImgs[i+1]}" alt="">
        </div>
    </a>
    `;
    lastAlbumImgIdx = i;
}

function moreAlbumImg() {
    var thumbImgs = thumbImgLinks();

    for (var i = lastAlbumImgIdx + 1; i < albumImgCount; i++) {
        dAlbumHolder.innerHTML += `        
        <a class="col-sm-4 col-4 p-0" data-bs-toggle="modal" data-bs-target="#modal-album" data-bs-slide-to="${i}">
            <div class="square">
                <img class="thumbnail wow fadeIn" src="${thumbImgs[i+1]}" alt="">
            </div>
        </a>
        `;
    }

    document.getElementById('albumBtn').outerHTML = '';
}

var dModalHolder = document.getElementById('modal-holder');
for (var i = 0; i < albumImgCount; i++) {
    var modalImgs = modalImgLinks();

    dModalHolder.innerHTML += `        
    <div class="carousel-item ${i == 0 ? 'active' : ''}" data-bs-dismiss="modal">
        <img class="modal-img lazy" data-src="${modalImgs[i+1]}" id="modal-img-${i+1}">
    </div>
    `;
}

// Lazy
document.addEventListener("DOMContentLoaded", function() {
    var lazyloadImages = document.querySelectorAll("img.lazy.thumbnail");
    var lazyloadThrottleTimeout;

    function lazyload() {
        if (lazyloadThrottleTimeout) {
            clearTimeout(lazyloadThrottleTimeout);
        }

        lazyloadThrottleTimeout = setTimeout(function() {
            var scrollTop = window.pageYOffset;
            lazyloadImages.forEach(function(img) {
                if (img.offsetTop < (window.innerHeight + scrollTop)) {
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    img.classList.add('shadow');
                }
            });
            if (lazyloadImages.length == 0) {
                document.removeEventListener("scroll", lazyload);
                window.removeEventListener("resize", lazyload);
                window.removeEventListener("orientationChange", lazyload);
            }
        }, 20);
    }

    document.addEventListener("scroll", lazyload);
    window.addEventListener("resize", lazyload);
    window.addEventListener("orientationChange", lazyload);
});

///
// modal img load
var lazyloadmodal = document.querySelector("#modal-album");
lazyloadmodal.addEventListener('show.bs.modal', function() {
    loadModalImg();
});

var myCarousel = document.querySelector('#album-ctrls')
myCarousel.addEventListener('slid.bs.carousel', function() {
    loadModalImg();
})

function loadModalImg() {
    var lazyloadImages = lazyloadmodal.querySelectorAll("img.modal-img");
    var prevImg;
    var nextImg;
    lazyloadImages.forEach(function(img) {
        if (img.parentElement.classList.contains('active')) {
            if (img.classList.contains('lazy')) {
                img.src = img.dataset.src;
                img.classList.remove('lazy');
            }

            prevImg = document.querySelector("#modal-img-" + (Number(img.id.replace("modal-img-", "")) - 1))
            nextImg = document.querySelector("#modal-img-" + (Number(img.id.replace("modal-img-", "")) + 1))
        }
    })
    if (prevImg != null && prevImg.classList.contains('lazy')) {
        prevImg.src = prevImg.dataset.src;
        prevImg.classList.remove('lazy');
    }

    if (nextImg != null && nextImg.classList.contains('lazy')) {
        nextImg.src = nextImg.dataset.src;
        nextImg.classList.remove('lazy');
    }
}
///


var myCarousel = document.querySelector('#album-ctrls')
var myModalEl = document.getElementById('modal-album')

myModalEl.addEventListener('show.bs.modal', function(event) {
    const trigger = event.relatedTarget
    var bsCarousel = bootstrap.Carousel.getInstance(myCarousel)
    bsCarousel.to(trigger.dataset.bsSlideTo)
})

////
// top 버튼
var mybutton = document.getElementById("topBtn");

window.onscroll = function() { scrollFunction() };

function scrollFunction() {
    if (document.body.scrollTop > 200 || document.documentElement.scrollTop > 200) {
        mybutton.classList.add('d-inline-flex');
        mybutton.classList.remove('d-none');
    } else {
        mybutton.classList.remove('d-inline-flex');
        mybutton.classList.add('d-none');
    }
}

function topFunction() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}
////

function copyToClipboard(elementId) {
    var aux = document.createElement("input");
    aux.setAttribute("value", document.getElementById(elementId).innerHTML);
    document.body.appendChild(aux);
    aux.select();
    document.execCommand("copy");
    document.body.removeChild(aux);
    alert('클립보드에 복사되었습니다.');
}

function contactBtnClicked(isGroom) {
    var dContactHolder = document.getElementById('contact-holder');

    if ((isGroom && document.getElementById('groomInfo') != null) || (!isGroom && document.getElementById('brideInfo') != null)) {
        dContactHolder.innerHTML = '';
        return;
    } else {
        dContactHolder.innerHTML = '';
    }

    var dContent = document.createElement('div')
    if (isGroom) {
        dContent.innerHTML = `
        <div class="wow fadeIn" id="groomInfo">
            <div class="p-2 section-contact-content rounded">
                혼주 이순자
                <br>
                <div id="copyMe">경남 541-21-0043384</div>
            </div>
        </div>
        `;
    } else {
        dContent.innerHTML = `
        <div class="wow fadeIn" id="brideInfo">
            <div class="p-2 section-contact-content rounded">
                혼주 이상순
                <br>
                <div id="copyMe">하나 438-910439-78307</div>
            </div>
        </div>
        `;
    }
    dContent.innerHTML += `
        <button class="btn wow fadeIn" onclick="copyToClipboard('copyMe')" style="border: 1px solid var(--deep-purple); color: var(--deep-purple)">
        복사하기
        </button>
    `;

    dContactHolder.append(dContent);
}

function setScreenSize() {
    let vh = window.innerHeight * 0.01;

    document.documentElement.style.setProperty('--vh', `${vh}px`);
}

function thumbImgLinks() {
    var thumbImgs = [];

    for (var i = 0; i < albumImgCount; i++) {
        thumbImgs[i] = get_image("album/thumbnail/" + i + ".jpg");
    }

    return thumbImgs;
}

function modalImgLinks() {
    var modalImgs = [];

    for (var i = 0; i < albumImgCount; i++) {
        modalImgs[i] = get_image("album/" + i + ".jpg");
    }

    return modalImgs;
}

function get_image(file_name) {
    return image_path + file_name;
}