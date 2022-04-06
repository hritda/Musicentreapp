let songitemcontainer = document.getElementById("songitemcontainer");

let songs = [
    { songname: "Moora", filepath: "songs/Moora.mp3", coverpath: "covers/1.jpg" },
    {
        songname: "Dil Ki Ye Arzu Thi",
        filepath: "songs/01. Dil Ki Ye Aarzoo Thi.mp3",
        coverpath: "covers/2.jpg",
    },
    {
        songname: "Tere Jaisa Yaar Kahan",
        filepath: "songs/Tere Jaise Yaar Kaha.mp3",
        coverpath: "covers/3.jpg",
    },
    {
        songname: "Choti si Asha",
        filepath: "songs/Choti Si Asha.mp3",
        coverpath: "covers/4.jpg",
    },
    {
        songname: "Rula Diya",
        filepath: "songs/Rula Diya.mp3",
        coverpath: "covers/5.jpg",
    },
    {
        songname: "Tumhi Se",
        filepath: "songs/Tumhi Se.mp3",
        coverpath: "covers/6.jpg",
    },
    {
        songname: "Aoge Jab Tum",
        filepath: "songs/06. Aaoge Jab Tum .mp3",
        coverpath: "covers/7.jpg",
    },
    {
        songname: "Har Kisi ko",
        filepath: "songs/Har Kisi Ko.mp3",
        coverpath: "covers/8.jpg",
    },
    {
        songname: "Tere Naam",
        filepath: "songs/Tere Naam.mp3",
        coverpath: "covers/9.jpg",
    },
    {
        songname: "Piya Aye Na",
        filepath: "songs/Piya Aaye Na.mp3",
        coverpath: "covers/10.jpg",
    },
];
function showSongs()
{   html = "";
    for(items in songs)
    {
        html+= ` <div class="songitem">
        <img alt="1">
        <span class ="songname"></span>
        <span class="songlistplay"><span class="timestamp"><i id="${items}" class="fa-regular fa-2x songplayitem fa-2x fa-circle-play"></i></span></i></span>
       </div>`
    }
    songitemcontainer.innerHTML = html;
}
showSongs();
console.log("welcome to musicentre");
let audiofile = "songs/Moora.mp3";
let songindex = 0;
// document.getElementsByClassName("songitem")[0].style.backgroundColor =
//     "#cccccc";
let playbtn = document.getElementById("playbutton");
let myprogressbar = document.getElementById("progressbar");
let audioelement = new Audio(audiofile);
let gif = document.getElementById("gif");
let mastersongname = document.getElementById("mastersongname");
let songtime = document.getElementById("currentsongtime");
let slash = document.getElementById("slash");
let songduration = document.getElementById("songduration");
let songitems = Array.from(document.getElementsByClassName("songitem"));
let autoplay = document.getElementById("autoplay");
let volumeset = document.getElementById("volumebutton");
let volumebar = document.getElementById("volumebar");

let prevvolume = volumebar.value;
volumebar.value = 30;
audioelement.volume = volumebar.value / 100;

function formatSecondsAsTime(secs, format) {
    var min = Math.floor(secs / 60);
    var sec = Math.floor(secs - min * 60);

    if (min < 10) {
        min = "0" + min;
    }
    if (sec < 10) {
        sec = "0" + sec;
    }

    return min + ":" + sec;
}

volumebar.addEventListener("change", () => {
    audioelement.volume = volumebar.value / 100;
    prevvolume = volumebar.value;
});

songitems.forEach((element, i) => {
    console.log(element, i);
    element.getElementsByTagName("img")[0].src = songs[i].coverpath;
    element.getElementsByClassName("songname")[0].innerText = songs[i].songname;
});
playbtn.addEventListener("click", () => {
    if (audioelement.paused || audioelement.currentTime <= 0) {
        audioelement.play();
        playbtn.classList.remove("fa-circle-play");
        playbtn.classList.add("fa-circle-pause");
        document
            .getElementsByClassName("songplayitem")
        [songindex].classList.remove("fa-circle-play");
        document
            .getElementsByClassName("songplayitem")
        [songindex].classList.add("fa-circle-pause");

        gif.style.opacity = 1;
    } else {
        audioelement.pause();
        playbtn.classList.remove("fa-circle-pause");
        playbtn.classList.add("fa-circle-play");
        document
            .getElementsByClassName("songplayitem")
        [songindex].classList.remove("fa-circle-pause");
        document
            .getElementsByClassName("songplayitem")
        [songindex].classList.add("fa-circle-play");
        gif.style.opacity = 0;
    }
});

autoplay.addEventListener("click", () => {

    if (autoplay.innerText == "Play in Loop") {
        autoplay.innerText = "Stop Loop";
    } else {
        autoplay.innerText = "Play in Loop";
    }
});
audioelement.addEventListener("ended", () => {
    gif.style.opacity = 0;
    document
            .getElementsByClassName("songplayitem")
        [songindex].classList.remove("fa-circle-pause");
        document
            .getElementsByClassName("songplayitem")
        [songindex].classList.add("fa-circle-play");
    playbtn.classList.remove("fa-circle-pause");
    playbtn.classList.add("fa-circle-play");

    if (autoplay.innerText == "Stop Loop") {
        if (songindex > 8) {
            songindex = 0;

        } else {
            songindex += 1;
        }
        makeallplays();
        document.getElementById(
            songindex
        ).parentElement.parentElement.parentElement.style.backgroundColor =
            "#cccccc";
        document.getElementById(songindex).classList.remove("fa-circle-play");
        document.getElementById(songindex).classList.add("fa-circle-pause");
        mastersongname.innerText = songs[songindex].songname;
        audioelement.src = songs[songindex].filepath;
        audioelement.currentTime = 0;
        playbtn.classList.remove("fa-circle-play");
        playbtn.classList.add("fa-circle-pause");
        gif.style.opacity = 1;
        audioelement.play();
    } else {
    }
});

audioelement.addEventListener("timeupdate", () => {
    let progress = parseFloat(
        (audioelement.currentTime / audioelement.duration) * 100
    );
    myprogressbar.value = progress;
    songtime.innerText = formatSecondsAsTime(parseInt(audioelement.currentTime));
    songduration.innerText = formatSecondsAsTime(parseInt(audioelement.duration));
    slash.innerText = "/";
});

myprogressbar.addEventListener("change", () => {
    audioelement.currentTime =
        (myprogressbar.value * audioelement.duration) / 100;
});

function makeallplays() {
    Array.from(document.getElementsByClassName("songplayitem")).forEach(
        (element) => {
            element.classList.remove("fa-circle-pause");
            element.classList.add("fa-circle-play");
            element.parentElement.parentElement.parentElement.style.backgroundColor =
                "white";
        }
    );
}

Array.from(document.getElementsByClassName("songplayitem")).forEach(
    (element) => {
        element.addEventListener("click", (e) => {
            newid = parseInt(e.target.id);
            if( newid==songindex && newid==0 )
            {
                mastersongname.innerText = songs[newid].songname ;
                if (audioelement.paused) {
                    audioelement.play();
                    playbtn.classList.remove("fa-circle-play");
                    playbtn.classList.add("fa-circle-pause");
                    e.target.classList.remove("fa-circle-play");
                    e.target.classList.add("fa-circle-pause");
                    gif.style.opacity = 1;
                } else {
                    audioelement.pause();
                    playbtn.classList.remove("fa-circle-pause");
                    playbtn.classList.add("fa-circle-play");
                    e.target.classList.remove("fa-circle-pause");
                    e.target.classList.add("fa-circle-play");
                    gif.style.opacity = 1;
                }
            }
            else
            if (newid == songindex) {
                if (audioelement.paused) {
                    audioelement.play();
                    playbtn.classList.remove("fa-circle-play");
                    playbtn.classList.add("fa-circle-pause");
                    e.target.classList.remove("fa-circle-play");
                    e.target.classList.add("fa-circle-pause");
                    gif.style.opacity = 1;
                } else {
                    audioelement.pause();
                    playbtn.classList.remove("fa-circle-pause");
                    playbtn.classList.add("fa-circle-play");
                    e.target.classList.remove("fa-circle-pause");
                    e.target.classList.add("fa-circle-play");
                    gif.style.opacity = 1;
                }
            } else {
                makeallplays();
                songindex = newid;
                e.target.classList.remove("fa-circle-play");
                e.target.classList.add("fa-circle-pause");
                element.parentElement.parentElement.parentElement.style.backgroundColor =
                    "#cccccc";
                mastersongname.innerText = songs[songindex].songname;
                audioelement.src = songs[songindex].filepath;
                audioelement.currentTime = 0;
                playbtn.classList.remove("fa-circle-play");
                playbtn.classList.add("fa-circle-pause");
                gif.style.opacity = 1;
                audioelement.play();
                audioelement.volume = volumebar.value;
            }
        });
    }
);
document.getElementById("next").addEventListener("click", (e) => {
    if (songindex > 8) {
        songindex = 0;
    } else {
        songindex += 1;
    }
    makeallplays();
    document.getElementById(
        songindex
    ).parentElement.parentElement.parentElement.style.backgroundColor = "#cccccc";
    document.getElementById(songindex).classList.remove("fa-circle-play");
    document.getElementById(songindex).classList.add("fa-circle-pause");
    audioelement.src = songs[songindex].filepath;
    mastersongname.innerText = songs[songindex].songname;
    audioelement.currentTime = 0;
    playbtn.classList.remove("fa-circle-play");
    playbtn.classList.add("fa-circle-pause");
    gif.style.opacity = 1;
    audioelement.play();
    audioelement.volume = volumebar.value;
});

document.getElementById("previous").addEventListener("click", (e) => {
    if (songindex == 0) {
        songindex = 0;
    } else {
        songindex -= 1;
    }
    makeallplays();
    document.getElementById(
        songindex
    ).parentElement.parentElement.parentElement.style.backgroundColor = "#cccccc";
    document.getElementById(songindex).classList.remove("fa-circle-play");
    document.getElementById(songindex).classList.add("fa-circle-pause");
    mastersongname.innerText = songs[songindex].songname;
    audioelement.src = songs[songindex].filepath;
    audioelement.currentTime = 0;
    playbtn.classList.remove("fa-circle-play");
    playbtn.classList.add("fa-circle-pause");
    gif.style.opacity = 1;
    audioelement.play();
    audioelement.volume = volumebar.value;
});

function mute(className) {
    if (className.src == "volume.png") {
        audioelement.volume = 0;
        volumebar.value = 0;
        className.src = "mute.jpg";
    } else {
        audioelement.volume = prevvolume / 100;
        volumebar.value = prevvolume;
        className.src = "mute.jpg";
    }
}
