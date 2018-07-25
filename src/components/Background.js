function changeBackground() {
    let backgrounds = [
        { name: 'White Sand Beach', author: 'Monica Silvestre', location: 'src/img/white_beach_monica_silvestre.jpeg' },
        { name: 'Toronto', author: 'Next Voyage', location: 'src/img/toronto_next_voyage.jpeg' },
        { name: 'Snow Covered Mountains by Lake', author: 'Ricardo Bresciani', location: 'src/img/snow_mountains_by_ricardo_bresciani.jpeg' },
        { name: 'Boats', author: 'Callebe Miranda', location: 'src/img/boats_by_callebe_miranda.jpeg' }
    ];

    let date = new Date();
    let month, dayOfMonth, currentName, currentAuthor, currentPath;

    if (date) {
        month = localStorage.getItem('backgroundDay');
        dayOfMonth = localStorage.getItem('backgroundMonth');

        if (month !== date.getMonth() && dayOfMonth !== date.getDate() {
            setBackgroundData(date, backgrounds);
        }
    } else {
        setBackgroundData(date, backgrounds);
    }
}

function setBackgroundData(date, backgroundArray) {
    let randomNum = Math.floor(Math.random() * backgroundArray.length);

    localStorage.setItem('backgroundMonth', date.getMonth());
    localStorage.setItem('backgroundDay', date.getDate());
    currentName = backgroundArray[randomNum].name;
    currentAuthor = backgroundArray[randomNum].author;
    currentPath = backgroundArray[randomNum].path;
}