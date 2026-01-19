console.log("Welcome to Spotify");

// Initialize the variables
let songIndex = 0;
let audioElement = new Audio('4.mp3');
let masterPlay=document.getElementById('masterPlay');
let myProgressBar=document.getElementById('myProgressBar');
let gif=document.getElementById("gif");
let masterSongName=document.getElementById('masterSongName');
let songItems =Array.from(document.getElementsByClassName("songItem"));

let songs=[
     
       {songName:"kosmo-dj-243665", filePath:"song/1.mp3", coverPath: "covers/1.jpg"},
       {songName:"rockstar-dj-dance-393573", filePath:"song/2.mp3", coverPath: "covers/2.jpg"},
       {songName:"breaking-free-247218", filePath:"song/3.mp3", coverPath: "covers/3.jpg"},
       {songName:"enjoy-groove-saxophone-vibes-338862", filePath:"song/4.mp3", coverPath: "covers/4.jpg"},
       {songName:"romantic-454545", filePath:"song/5.mp3", coverPath: "covers/5.jpg"},
       {songName:"fresh-457883", filePath:"song/6.mp3", coverPath: "covers/6.jpg"},    
]

songItems.forEach((element, i)=>{
   console.log(element, i);
   element.getElementsByTagName('img')[0].src=songs[i].coverPath;
   element.getElementsByClassName('songName')[0].innerText=songs[i].songName;
})
//  audioElement.play();

// Handel play/pause click
masterPlay.addEventListener('click', ()=>{
    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();
       masterPlay.classList.remove('fa-circle-play');
       masterPlay.classList.add('fa-pause-circle');
       gif.style.opacity=1;
     }
     else{
        audioElement.pause();
       masterPlay.classList.remove('fa-pause-play');
       masterPlay.classList.add('fa-circle-circle');
       gif.style.opacity=0;
     }
    
})

// Listen to events
audioElement.addEventListener('timeupdate',()=>{
    
    // update seekbar
    progress= parseInt((audioElement.currentTime/audioElement.duration)* 100);
    myProgressBar.value=progress;
})

myProgressBar.addEventListener('change',()=>{
    audioElement.currentTime= myProgressBar.value* audioElement.duration/100;
  })

  const makeAllPlays=()=>{
     
     Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
         element.classList.remove('fa-pause-play');
         element.classList.add('fa-circle-play');
     })
  }

Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
    element.addEventListener('click',(e)=>{
      makeAllPlays();
      songIndex=parseInt(e.target.id);
      e.target.classList.remove('fa-circle-play');
      e.target.classList.add('fa-pause-play');
       masterSongName.innerText=songs[songIndex].songName;
      audioElement.src=`song/${songIndex+1}.mp3`
      audioElement.currentTime=0;
      audioElement.play();
      masterPlay.classList.remove('fa-circle-play');
      masterPlay.classList.add('fa-pause-play')
    }) 
})
document.getElementById('next').addEventListener('click',()=>{
    if(songIndex>=5){
        songIndex=0;
    }
    else{
        songIndex += 1;
    }
      audioElement.src=`song/${songIndex+1}.mp3`
      masterSongName.innerText=songs[songIndex].songName;
      audioElement.currentTime=0;
      audioElement.play();
      masterPlay.classList.remove('fa-circle-play');
      masterPlay.classList.add('fa-pause-play')
})
document.getElementById('previous').addEventListener('click',()=>{
    if(songIndex<=0){
        songIndex=0;
    }
    else{
        songIndex -= 1;
    }
      audioElement.src=`song/${songIndex+1}.mp3`
      masterSongName.innerText=songs[songIndex].songName;
      audioElement.currentTime=0;
      audioElement.play();
      masterPlay.classList.remove('fa-circle-play');
      masterPlay.classList.add('fa-pause-play')
})