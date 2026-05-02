document.addEventListener("DOMContentLoaded", () => {

    const audio = document.getElementById("audio");
    const playBtn = document.getElementById("play");
    const nextBtn = document.getElementById("next");
    const prevBtn = document.getElementById("prev");
    const progress = document.getElementById("progress");
    const volume = document.getElementById("volume");
    const volumeIcon = document.getElementById("volumeIcon");
    const time = document.getElementById("time");
    const title = document.getElementById("title");
    const artist = document.getElementById("artist");
    const playlist = document.getElementById("playlist");
    const toggleBtn = document.getElementById("togglePlaylist");
    const speed = document.getElementById("speed"); // ✅ NEW

    const songs = [
        {name:"song1.mp3", title:"Song 1", artist:"Artist A"},
        {name:"song2.mp3", title:"Song 2", artist:"Artist B"},
        {name:"song3.mp3", title:"Song 3", artist:"Artist C"},
        {name:"song4.mp3", title:"Song 4", artist:"Artist D"},
        {name:"song5.mp3", title:"Song 5", artist:"Artist E"},
        {name:"song6.mp3", title:"Song 6", artist:"Artist F"},
        {name:"song7.mp3", title:"Song 7", artist:"Artist G"}
    ];

    let index = 0;

    // 🎵 Load song
    function loadSong(i) {
        audio.src = songs[i].name;
        title.innerText = songs[i].title;
        artist.innerText = songs[i].artist;

        // 🔥 reset speed
        audio.playbackRate = 1;
        speed.value = 1;

        updateActive();
    }

    // ▶ Play / Pause
    playBtn.addEventListener("click", () => {
        if (audio.paused) {
            audio.play();
            playBtn.innerText = "⏸";
        } else {
            audio.pause();
            playBtn.innerText = "▶";
        }
    });

    // ⏭ Next
    nextBtn.addEventListener("click", () => {
        index = (index + 1) % songs.length;
        loadSong(index);
        audio.play();
    });

    // ⏮ Prev
    prevBtn.addEventListener("click", () => {
        index = (index - 1 + songs.length) % songs.length;
        loadSong(index);
        audio.play();
    });

    // ⏱ Progress update
    audio.addEventListener("timeupdate", () => {
        if (audio.duration) {
            progress.value = (audio.currentTime / audio.duration) * 100;

            let mins = Math.floor(audio.currentTime / 60);
            let secs = Math.floor(audio.currentTime % 60);
            if (secs < 10) secs = "0" + secs;

            time.innerText = mins + ":" + secs;
        }
    });

    // 🎚 Seek
    progress.addEventListener("input", () => {
        audio.currentTime = (progress.value / 100) * audio.duration;
    });

    // 🔊 Volume
    volume.addEventListener("input", () => {
        audio.volume = volume.value;
        updateIcon();
    });

    // 🔇 Mute toggle
    volumeIcon.addEventListener("click", () => {
        audio.muted = !audio.muted;
        updateIcon();
    });

    function updateIcon() {
        if (audio.muted || audio.volume == 0) {
            volumeIcon.innerText = "🔇";
        } else {
            volumeIcon.innerText = "🔊";
        }
    }

    // 🎵 Auto next
    audio.addEventListener("ended", () => {
        nextBtn.click();
    });

    // 📂 Playlist toggle
    toggleBtn.addEventListener("click", () => {
        playlist.classList.toggle("hidden");
    });

    // 📃 Create playlist
    songs.forEach((song, i) => {
        const li = document.createElement("li");
        li.innerText = song.title;
        li.addEventListener("click", () => {
            index = i;
            loadSong(index);
            audio.play();
        });
        playlist.appendChild(li);
    });

    // 🎯 Active highlight
    function updateActive() {
        const items = playlist.querySelectorAll("li");
        items.forEach((li, i) => {
            li.classList.toggle("active", i === index);
        });
    }

    // ⚡ SPEED CONTROL (NEW)
    speed.addEventListener("change", () => {
        audio.playbackRate = speed.value;
    });

    // 🚀 Start first song
    loadSong(index);
});
