/* =====================================
   PROJECT BLUE HEART
   SCRIPT.JS
   BÖLÜM 1 / 3
===================================== */



// =====================================
// PASSWORD SYSTEM
// =====================================


const correctPassword = "1212";


const lockScreen =
document.getElementById("lockScreen");


const mainContent =
document.getElementById("mainContent");


const passwordInput =
document.getElementById("passwordInput");


const unlockBtn =
document.getElementById("unlockBtn");


const passwordMessage =
document.getElementById("passwordMessage");





unlockBtn.addEventListener(
"click",
()=>{


const password =
passwordInput.value;



if(password === correctPassword){



lockScreen.style.transition =
"1s";


lockScreen.style.opacity =
"0";



setTimeout(()=>{


lockScreen.style.display =
"none";


mainContent.classList.remove(
"hidden"
);



startHearts();


startTyping();



},1000);



}

else{


passwordMessage.innerHTML =
"Yanlış şifre 💙";


passwordInput.value="";


}



});







passwordInput.addEventListener(
"keypress",
(e)=>{


if(e.key==="Enter"){


unlockBtn.click();


}


});









// =====================================
// LOVE COUNTER
// 12 ARALIK 2025
// =====================================



const startDate =
new Date(
"2025-12-12 00:00:00"
);





function updateCounter(){



const now =
new Date();



const time =
now - startDate;





const days =
Math.floor(
time /
(1000*60*60*24)
);




const hours =
Math.floor(
time /
(1000*60*60)
)%24;




const minutes =
Math.floor(
time /
(1000*60)
)%60;




const seconds =
Math.floor(
time /
1000
)%60;






document.getElementById(
"days"
).innerHTML =
days;



document.getElementById(
"hours"
).innerHTML =
hours;



document.getElementById(
"minutes"
).innerHTML =
minutes;



document.getElementById(
"seconds"
).innerHTML =
seconds;



}




setInterval(
updateCounter,
1000
);



updateCounter();









// =====================================
// LOVE LETTER TYPING
// =====================================



const loveText = `

Karıcığım...

Sen benim hayatımdaki
en güzel tesadüfsün.

Benim pambık şekerim,
bebekk dediğim,
şebek aşkım...

Senin gülüşün benim en güzel
mutluluğum oldu.

Birlikte nice anılar,
nice hayaller biriktireceğiz.

Bir gün Japonya sokaklarında
beraber ramen yiyeceğiz.

Hollanda'da lalelerin arasında
yürüyeceğiz.

Belki kendi evimiz olacak.

Belki Alya ve Atlas diye
hayaller kuracağız.

Ama benim en büyük hayalim...

Her zaman yanında olmak.

Seni çok seviyorum Elif. 💙

`;





let letterIndex = 0;






function startTyping(){



const textArea =
document.getElementById(
"typingText"
);



if(!textArea)
return;




textArea.innerHTML="";


letterIndex=0;




function write(){



if(letterIndex <
loveText.length){



textArea.innerHTML +=
loveText.charAt(letterIndex);



letterIndex++;



setTimeout(
write,
45
);



}



}



write();



}









// =====================================
// FLOATING BLUE HEARTS
// =====================================



function createHeart(){



const container =
document.getElementById(
"heartsContainer"
);



if(!container)
return;




const heart =
document.createElement(
"div"
);



heart.className =
"heart";



heart.innerHTML =
"💙";



heart.style.left =
Math.random()*100+"vw";



heart.style.animationDuration =
(5+
Math.random()*5)
+"s";



heart.style.fontSize =
(15+
Math.random()*35)
+"px";



container.appendChild(
heart
);





setTimeout(()=>{


heart.remove();


},
10000);



}








function startHearts(){



setInterval(()=>{


createHeart();



},
500);



}









// =====================================
// SCROLL
// =====================================



function scrollToSection(id){



const element =
document.getElementById(id);



if(element){



element.scrollIntoView({

behavior:"smooth"

});


}


}/* =====================================
   GALLERY SYSTEM
   BÖLÜM 2 / 3
===================================== */



const galleryGrid =
document.getElementById(
"galleryGrid"
);





const photos = [];





// 34 FOTOĞRAF

for(let i = 1; i <= 34; i++){


    photos.push(
        `assets/foto${i}.jpg`
    );


}







function createGallery(){



if(!galleryGrid)
return;



galleryGrid.innerHTML="";



photos.forEach(
(photo,index)=>{



const item =
document.createElement(
"div"
);



item.className =
"gallery-item";



item.innerHTML = `

<img 
src="${photo}"
alt="Yakup Elif Anı ${index+1}"
loading="lazy">

`;





const image =
item.querySelector(
"img"
);





// Fotoğraf yoksa gizle

image.onerror =
()=>{


item.style.display =
"none";


};





item.onclick =
()=>{


openLightbox(index);


};





galleryGrid.appendChild(
item
);



});



}





createGallery();









// =====================================
// LIGHTBOX
// =====================================



const lightbox =
document.getElementById(
"lightbox"
);



const lightboxImage =
document.getElementById(
"lightboxImage"
);



const closeLightbox =
document.getElementById(
"closeLightbox"
);



const prevImage =
document.getElementById(
"prevImage"
);



const nextImage =
document.getElementById(
"nextImage"
);





let currentImage = 0;








function openLightbox(index){



currentImage =
index;



lightboxImage.src =
photos[currentImage];



lightbox.classList.add(
"active"
);



}







function closeBox(){



lightbox.classList.remove(
"active"
);



}








function showNext(){



currentImage++;



if(currentImage >= photos.length){



currentImage=0;


}



lightboxImage.src =
photos[currentImage];



}








function showPrev(){



currentImage--;



if(currentImage < 0){



currentImage =
photos.length-1;


}



lightboxImage.src =
photos[currentImage];



}








closeLightbox.onclick =
closeBox;



nextImage.onclick =
showNext;



prevImage.onclick =
showPrev;









// Dışarı tıklayınca kapat



lightbox.onclick =
(e)=>{


if(e.target === lightbox){


closeBox();


}



};









// =====================================
// KLAVYE KONTROL
// =====================================



document.addEventListener(
"keydown",
(e)=>{



if(!lightbox.classList.contains("active"))
return;



if(e.key==="ArrowRight"){


showNext();


}




if(e.key==="ArrowLeft"){


showPrev();


}




if(e.key==="Escape"){


closeBox();


}




});









// =====================================
// MOBİL SWIPE
// =====================================



let touchStartX = 0;


let touchEndX = 0;





lightbox.addEventListener(
"touchstart",
(e)=>{


touchStartX =
e.changedTouches[0].screenX;



});






lightbox.addEventListener(
"touchend",
(e)=>{


touchEndX =
e.changedTouches[0].screenX;



swipeControl();



});








function swipeControl(){



if(
touchEndX <
touchStartX - 50
){



showNext();


}




if(
touchEndX >
touchStartX + 50
){



showPrev();


}



}









// =====================================
// ÖZEL GÖRSEL PRELOAD
// =====================================



const specialImages=[


"assets/gelinlik.jpg",


"assets/damatlik.jpg",


"assets/ilkbulusma.jpg",


"assets/yildizligece.jpg",


"assets/lalefest.jpg",


"assets/ichirakuramen.jpg"


];






specialImages.forEach(
(src)=>{


const img =
new Image();


img.src=src;


}

);/* =====================================
   PROJECT BLUE HEART
   SCRIPT.JS
   BÖLÜM 3 / 3
===================================== */



// =====================================
// VIDEO SYSTEM
// =====================================



const videos =
document.querySelectorAll(
"video"
);



videos.forEach(
(video)=>{


video.addEventListener(
"play",
()=>{


videos.forEach(
(other)=>{


if(other !== video){


other.pause();


}


});


});



});









// =====================================
// MUSIC SETTINGS
// =====================================



const music =
document.querySelector(
"audio"
);



if(music){



music.volume = 0.35;



}









// =====================================
// SCROLL REVEAL
// =====================================



const revealItems =
document.querySelectorAll(
"section, .dream-card, .video-card"
);





const revealObserver =
new IntersectionObserver(
(entries)=>{



entries.forEach(
(entry)=>{


if(entry.isIntersecting){


entry.target.classList.add(
"show"
);


}



});


},
{

threshold:.15


});







revealItems.forEach(
(item)=>{


item.classList.add(
"reveal"
);



revealObserver.observe(
item
);



});









// =====================================
// FINAL HEART CLICK EFFECT
// =====================================



const bigHeart =
document.querySelector(
".big-heart"
);





if(bigHeart){



bigHeart.addEventListener(
"click",
()=>{


for(let i=0;i<30;i++){


createHeart();


}



});


}









// =====================================
// SPECIAL IMAGE ERROR CONTROL
// =====================================



document.addEventListener(
"error",
(e)=>{



if(e.target.tagName==="IMG"){



console.log(
"Görsel bulunamadı:",
e.target.src
);



}



},
true);









// =====================================
// PAGE READY
// =====================================



window.addEventListener(
"load",
()=>{


document.body.classList.add(
"loaded"
);



console.log(
`
💙 BİRLİKTE GÜZEL BİR GELECEK

Yakup ❤️ Elif

12 Aralık 2025

Bir ömürlük hikaye...
`
);



});









// =====================================
// RIGHT CLICK KORUMA
// =====================================



document.addEventListener(
"contextmenu",
(e)=>{


e.preventDefault();


});









// =====================================
// TOUCH FRIENDLY
// =====================================



document.addEventListener(
"touchstart",
()=>{


document.body.classList.add(
"mobile"
);


});

