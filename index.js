const searchSongs = () =>{
    const searchText = document.getElementById('searchInput').value;
    const url = `https://api.lyrics.ovh/suggest/${searchText}`;
    fetch(url)
    .then(response => response.json())
    .then(data => displaySongs(data.data))
    .catch(err => console.err)
}
const displaySongs = (songs) =>{
    const songsDiv = document.getElementById('songsDiv');
    songs.forEach(song => {
        const songDiv = document.createElement('div');
        songDiv.className = 'single-result row align-items-center my-3 p-3';
        songDiv.innerHTML = `
        <div class="col-md-9">
            <h3 class="lyrics-name">${song.title}</h3>
            <p class="author lead">Album by <span>${song.artist.name}</span></p>
            <audio controls>
                <source src="${song.preview}" type="audio/ogg">
            </audio>
        </div>
        <div class="col-md-3 text-md-right text-center">
            <button onclick="displayLyrics('${song.artist.name}', '${song.title}')" class="btn btn-success">Get Lyrics</button>
        </div>
        `;
        songsDiv.appendChild(songDiv);
    });
}
const displayLyrics = (artist, title) =>{
    // console.log('lyrics', artist, title);
    const url = `https://api.lyrics.ovh/v1/${artist}/${title}`;
    fetch(url)
    .then(response => response.json())
    .then(data => showLyrics(data));
}
const showLyrics = (data) =>{
    const lyricsDiv = document.getElementById('lyrics');
    lyricsDiv.innerText = data.lyrics;
}