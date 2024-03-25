let usedIds = []

function randString(){
    let string = (Math.random() + 1).toString(36).substring(7)
    if(!usedIds.includes(string)){
        return string;
    }
    else{
        randString();
    }
}

class gimage{
    constructor(src, alt){
        this.src = src
        this.alt = alt
        this.dot = document.createElement("div");
        this.dot.className = "gallery-counter-dot shadowed";
        this.id = randString();
        this.dot.id = this.id;
    }
}


const galleryImages = [
  new gimage(
    "imgs/gallery/g1.jpg",
    "Students working together on lyric writing"
  ),
  new gimage(
    "imgs/gallery/g2.jpg",
    "High school students working on sharpening their beat making skills"
  ),
  new gimage(
    "imgs/gallery/g3.jpg",
    "A student recording her verse on the microphone during a session in the classroom"
  ),
  new gimage(
    "imgs/gallery/g4.jpg",
    "A student recording her verse on the microphone during a session in the classroom"
  ),
  new gimage(
    "imgs/gallery/g5.jpg",
    "A group picture of the B.P.M. founder and the all girls cohort in the classroom"
  ),
  new gimage(
    "imgs/gallery/g6.jpg",
    "One student using a midi keyboard and laptop, working on film scoring techniques"
  ),
  new gimage(
    "imgs/gallery/g7.jpg",
    "A classroom of students producing tracks independently"
  ),
  new gimage(
    "imgs/gallery/g8.jpg",
    "A middle school group of students working on a music production and songwriting activity"
  ),
  new gimage(
    "imgs/gallery/g9.jpg",
    "A masterclass given by a film producer/director for a high school class"
  ),
  new gimage(
    "imgs/gallery/g10.jpg",
    "A group of girls in class working on music production"
  ),
  new gimage(
    "imgs/gallery/g11.jpg",
    "B.P.M. founder demonstrating music software functions using a smart board in front of class"
  ),
  new gimage(
    "imgs/gallery/g12.jpg",
    "Middle school students sitting at a table, exploring music software for the 1st time"
  ),
  new gimage(
    "imgs/gallery/g13.jpg",
    "High school students working diligently to complete music production assignment in class"
  ),
  new gimage(
    "imgs/gallery/g14.jpg",
    "Participants working on independent music production projects after school"
  ),
  new gimage(
    "imgs/gallery/g15.jpg",
    "Elementary school students using midi keyboards to build tracks and record melodies"
  ),
];

function imgById(id) {
    for(let i=0; i<galleryImages.length; i++){
        if(galleryImages[i].id == id){
            return galleryImages[i];
        }
    }
}

function indexByImg(img){
    for(let i=0; i<galleryImages.length; i++){
        if(galleryImages[i] == img){
            return i;
        }
    }
}

let currIndex = 0;
function currImage(){
    return galleryImages[currIndex]
}

function setImg(img){
    let galleryImage = document.getElementById("gallery-image");
    let modalImg = document.getElementById("modal-image");

    galleryImage.src = img.src;
    modalImg.src = img.src;
    return indexByImg(img)
}

function changeImg(index){
    currImage().dot.style.opacity = "65%";
    currIndex=index;
    setImg(currImage());
    currImage().dot.style.opacity = "100%";
}

function previousImage(){
    if(currIndex>0){
        changeImg(currIndex-1);
    } else {
        changeImg(galleryImages.length-1)
    }
}
function nextImage(){
    if(currIndex<(galleryImages.length-1)){
        changeImg(currIndex + 1);
    } else {
        changeImg(0)
    }
}

let keyupHandler = (e) => {
    if (e.code === "ArrowLeft") previousImage();
    else if (e.code === "ArrowRight") nextImage();
};

function modalImage(){
    let modal = document.getElementById("modal-dialogue");
    let modalClose = document.getElementById("modal-close");
    let body = document.getElementsByTagName("body")[0];

    document.addEventListener("keyup", keyupHandler);
    body.style.overflow="hidden";

    modal.showModal()
    modalClose.onclick=function(){
        closeModal()
    }
}
function closeModal(){
    let modal = document.getElementById("modal-dialogue");
    let body = document.getElementsByTagName("body")[0];

    document.removeEventListener("keyup", keyupHandler);
    body.style.overflow = "unset";

    modal.close()
}

function init_images(){
    let galleryCounter = document.getElementById("gallery-counter");
    let galleryImage = document.getElementById("gallery-image");
    let clickToClose = document.getElementById("click-to-close");
    let leftArrow = document.getElementById("left-arrow");
    let rightArrow = document.getElementById("right-arrow");
    let leftModal = document.getElementById("left-modal")
    let rightModal = document.getElementById("right-modal")

    leftArrow.onclick=previousImage;
    rightArrow.onclick=nextImage;
    leftModal.onclick = previousImage;
    rightModal.onclick = nextImage;

    for(let i=0; i<galleryImages.length; i++){
        galleryImages[i].dot.onclick = function() {dotClick(this.id)};
        galleryCounter.appendChild(galleryImages[i].dot);
    }

    galleryImage.onclick = function(){modalImage()};
    clickToClose.onclick = function(){closeModal()};
    changeImg(currIndex)
}

function dotClick(id){
    changeImg(indexByImg(imgById(id)));
}
