const useGoogleDrive = true;
const albumImgCount = 30;

// 대문
if (useGoogleDrive) {
    document.getElementById('main-img-holder').src = "https://drive.google.com/uc?export=view&id=1WltxsneeJZrhmypsAoJ6u0GKikUuE4jw";
} else {
    document.getElementById('main-img-holder').src = "./images/main.jpg";
}

// 만든이
if (useGoogleDrive) {
    document.getElementById('creator-mingu').src = "https://drive.google.com/uc?export=view&id=12loMwwH9Jnu5ryzQCZLKlz6Ern_VB8FN";
    document.getElementById('creator-jihye').src = "https://drive.google.com/uc?export=view&id=1dglIcNFlg1hgp4RS-sZDSCd94RZADRwY";
    document.getElementById('creator-bbiyong').src = "https://drive.google.com/uc?export=view&id=14dJZW-FoaigCQVsH3Ij8GUEbqmA_wgRR";
} else {
    document.getElementById('creator-mingu').src = "./images/creator/1.jpg";
    document.getElementById('creator-jihye').src = "./images/creator/2.jpg";
    document.getElementById('creator-bbiyong').src = "./images/creator/3.jpg";
}

setScreenSize();

// 디데이
var dDayholder = document.getElementById('d-day-holder')
var dDayWrapper = document.createElement('div')
var remainDays = Math.max(0, Math.ceil((new Date("2021-11-06T00:00:00").getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)));
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
    var thumbImgs = {};

    if (useGoogleDrive) {
        thumbImgs['1'] = 'https://drive.google.com/uc?export=view&id=1aJPn7D4MdpJO0BjdQC4XTEUO6qrI2rN_';
        thumbImgs['2'] = 'https://drive.google.com/uc?export=view&id=1oDYyA78pvc-0xmbPoCx-Ym0RU8cVmKCq';
        thumbImgs['3'] = 'https://drive.google.com/uc?export=view&id=1w-PnaNpSaNb-NaGMA9c8e8GiNVma-rP1';
        thumbImgs['4'] = 'https://drive.google.com/uc?export=view&id=1JJKTG8mpqP8UAXkK9CKjvKAP0X4eyoDb';
        thumbImgs['5'] = 'https://drive.google.com/uc?export=view&id=1pgkIulSv7RKQMzv7NOkbaKO5Nih_vuGA';
        thumbImgs['6'] = 'https://drive.google.com/uc?export=view&id=18swtbfEwshhFyFvCMi7gpzNQv64as5Oe';
        thumbImgs['7'] = 'https://drive.google.com/uc?export=view&id=175hjRupDIKhDZHWff4ZVeAewAXNiN1Tb';
        thumbImgs['8'] = 'https://drive.google.com/uc?export=view&id=1Hna8NAKA3n7_CYJdXiLxRAST2j1McMZg';
        thumbImgs['9'] = 'https://drive.google.com/uc?export=view&id=1tnPLajB1Jht1w7M8crLWGf2cuWhyFEJY';
        thumbImgs['10'] = 'https://drive.google.com/uc?export=view&id=1jLwTqFagBe-oNSnQCVTBz7KgXDzsGRjh';
        thumbImgs['11'] = 'https://drive.google.com/uc?export=view&id=1-SiZ9Ou0kG2WXzEJipm_DW-9Awao63-G';
        thumbImgs['12'] = 'https://drive.google.com/uc?export=view&id=1n6eJm0AVjj6t7gtzJtbhUnE8g_RzzxVW';
        thumbImgs['13'] = 'https://drive.google.com/uc?export=view&id=1jhEKQadSd5Uy9d3P-ncNnPzZvxHRXVLO';
        thumbImgs['14'] = 'https://drive.google.com/uc?export=view&id=16gr6-hCe5ieZ87EuuglNhlQvaiepX-Jk';
        thumbImgs['15'] = 'https://drive.google.com/uc?export=view&id=1S54z2NnhWqBRHmGyBpyZGmXRgnBM0oOV';
        thumbImgs['16'] = 'https://drive.google.com/uc?export=view&id=1WRBLiUBcQanDuLumk-gA3zCwJmFcGBTq';
        thumbImgs['17'] = 'https://drive.google.com/uc?export=view&id=1HHnV0C1rw9hOn1t2Ls0xEaM32M_xF2pY';
        thumbImgs['18'] = 'https://drive.google.com/uc?export=view&id=16-zqdFPw_zqhzI8r8UzOrngFhhhLJBo9';
        thumbImgs['19'] = 'https://drive.google.com/uc?export=view&id=1UUeCZcjiaTBTeWVR_2RoNlpsou3olZAL';
        thumbImgs['20'] = 'https://drive.google.com/uc?export=view&id=1vcBKaVAcmOQcoiPu-kD_6W4nptgBgk8Y';
        thumbImgs['21'] = 'https://drive.google.com/uc?export=view&id=1SCkZOA97QxFfS2ZHN0mIPKw--cGvCMTL';
        thumbImgs['22'] = 'https://drive.google.com/uc?export=view&id=1cm5YGYeWqnDdEM6f9jVbpejZgvVUlUOv';
        thumbImgs['23'] = 'https://drive.google.com/uc?export=view&id=1ihZP6f0DNglelNQCPpdlIuW4o2TtEAVL';
        thumbImgs['24'] = 'https://drive.google.com/uc?export=view&id=1uuVuvFfaWHoMgVAGL_PdkhgrnrhiXql_';
        thumbImgs['25'] = 'https://drive.google.com/uc?export=view&id=1fRRkCD3sTYkFGnHaxijrfc6ETMWWawNY';
        thumbImgs['26'] = 'https://drive.google.com/uc?export=view&id=1bs5ZTLVETAGoVdWohFcdtUryMi6s5Ltw';
        thumbImgs['27'] = 'https://drive.google.com/uc?export=view&id=14zmnuGDGDAvSSVL6HoaAOxQ6pwz1OK0M';
        thumbImgs['28'] = 'https://drive.google.com/uc?export=view&id=1Is2gWfmRPO2IVcwBeOKbmuKVUkZqZPRz';
        thumbImgs['29'] = 'https://drive.google.com/uc?export=view&id=10Wk5m_bB_4juzA0BUgo9_IvDqCZkKBaw';
        thumbImgs['30'] = 'https://drive.google.com/uc?export=view&id=1CesUs_Qr9nDVEOU8VnyocP5-MysNTU-N';
    } else {
        for (var i = 0; i < albumImgCount; i++) {
            thumbImgs[i] = `images/album/thumbnail/${i+1}.jpg`;
        }
    }

    return thumbImgs;
}

function modalImgLinks() {
    var modalImgs = {};

    if (useGoogleDrive) {
        modalImgs['1'] = 'https://drive.google.com/uc?export=view&id=1vUqskPYE3AFeGB-jAvvA5NaZ3Clo5QuF';
        modalImgs['2'] = 'https://drive.google.com/uc?export=view&id=1Pv41LeBxI8q1QcsaCpCSl3euVcZetZdM';
        modalImgs['3'] = 'https://drive.google.com/uc?export=view&id=1sh7DTfEh1WgZCdMV3v6RCxWO3PhTC4Lm';
        modalImgs['4'] = 'https://drive.google.com/uc?export=view&id=11aWHJCPD7wHv-WWWZ1F45PNpRbq3UCQT';
        modalImgs['5'] = 'https://drive.google.com/uc?export=view&id=146dgTlkO00WDmZ_PEx6y9zUZPGioimY4';
        modalImgs['6'] = 'https://drive.google.com/uc?export=view&id=1YdJ5VUmUVi-OwUTMxXEdH_Rr4sYG36vF';
        modalImgs['7'] = 'https://drive.google.com/uc?export=view&id=1QdBay5SqSMFvGs22wEgHK1f-KTDC4NJS';
        modalImgs['8'] = 'https://drive.google.com/uc?export=view&id=1sjTE0TqE8vWtgdBcM6Du3YGRUgNFaXBq';
        modalImgs['9'] = 'https://drive.google.com/uc?export=view&id=1Cyl17ibea5dqzD_Ytz29KM0BMosJ0aUY';
        modalImgs['10'] = 'https://drive.google.com/uc?export=view&id=12l57wSr1T-QMW-kkx0K0TCLS0Ja3fCAe';
        modalImgs['11'] = 'https://drive.google.com/uc?export=view&id=1Sg0apBhtL3slIcHmx2ZhZ9JXAnhb-vmS';
        modalImgs['12'] = 'https://drive.google.com/uc?export=view&id=1LLWPqJxsJS0mdOmJ2PjyLbjmwoaTSDfh';
        modalImgs['13'] = 'https://drive.google.com/uc?export=view&id=1Lg1LIziaYhu0OXClEOWXgNTvn-dPKaLJ';
        modalImgs['14'] = 'https://drive.google.com/uc?export=view&id=11n27vFGBGo72c_Cdm2P1nNiWX6fWfh7I';
        modalImgs['15'] = 'https://drive.google.com/uc?export=view&id=1RT4R6oG4nU6f0_8db7r1e4V0cD2HN6Qj';
        modalImgs['16'] = 'https://drive.google.com/uc?export=view&id=1S4C7bnbp0nSl7GGWRph1G1tis9X3k2BV';
        modalImgs['17'] = 'https://drive.google.com/uc?export=view&id=1uXXVcCdYAXFYexAj6BydsyD1kXpukUYc';
        modalImgs['18'] = 'https://drive.google.com/uc?export=view&id=1mFf6zS86tMCcDpHxmYQ9_9fD1DoCqYBG';
        modalImgs['19'] = 'https://drive.google.com/uc?export=view&id=1e71Ep85GuUeiWnTidL3T1NtgzeCA3cjK';
        modalImgs['20'] = 'https://drive.google.com/uc?export=view&id=1tTbfO5uXxmJR2ycHwDmG5EjZPdy9Hj_T';
        modalImgs['21'] = 'https://drive.google.com/uc?export=view&id=1mAJiD5KbD0vpjKq09eB4Hhit7SzEf-5p';
        modalImgs['22'] = 'https://drive.google.com/uc?export=view&id=1jOG18_eAou7irrio084YRkbQQMJwPac9';
        modalImgs['23'] = 'https://drive.google.com/uc?export=view&id=17ebGp2tdpMQ57i_Igy-VdXiWR7Yp-Lt4';
        modalImgs['24'] = 'https://drive.google.com/uc?export=view&id=1OoCw2VK2QhUlcnN3tgqunF-SEubKf_kJ';
        modalImgs['25'] = 'https://drive.google.com/uc?export=view&id=1GrHCZsWJfggqQffEKbgVNgNIyzCteZun';
        modalImgs['26'] = 'https://drive.google.com/uc?export=view&id=1git1quObaeN2CjHv8qGMpo3ElXRD0Q2T';
        modalImgs['27'] = 'https://drive.google.com/uc?export=view&id=1-q281KO3QyeWr6qDu5QXF5P2KhAsevyl';
        modalImgs['28'] = 'https://drive.google.com/uc?export=view&id=1iUmeGB8SS8byDBMY8GQMD9ZgzkpXh1U4';
        modalImgs['29'] = 'https://drive.google.com/uc?export=view&id=1ZPnLiKTVXQb1ndS9Pwwtj_IiBb2r8Rbj';
        modalImgs['30'] = 'https://drive.google.com/uc?export=view&id=1vDi3NxvIcqhDONSqGIjiasv5bJR_MiHc';
    } else {
        for (var i = 0; i < albumImgCount; i++) {
            thumbImgs[i] = `images/album/${i+1}.jpg`;
        }
    }

    return modalImgs;
}