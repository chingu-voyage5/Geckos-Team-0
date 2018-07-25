function changeBackground() {
    let backgrounds = [
        { name: 'White Sand Beach', author: 'Monica Silvestre', location: './img/white_beach_monica_silvestre.jpeg' },
        { name: 'Toronto', author: 'Next Voyage', location: './img/toronto_by_next_voyage.jpeg' },
        { name: 'Snow Covered Mountains by Lake', author: 'Ricardo Bresciani', location: './img/snow_mountains_by_ricardo_bresciani.jpeg' },
        { name: 'Boats', author: 'Callebe Miranda', location: './img/boats_by_callebe_miranda.jpeg' }
    ];

    let date = new Date();
    let month, dayOfMonth, background;

    if (localStorage.getItem('backgroundMonth')) {
        month = localStorage.getItem('backgroundMonth');
        dayOfMonth = localStorage.getItem('backgroundDay');

        if (month != date.getMonth() && dayOfMonth != date.getDate()) {
            console.log('enter 2nd if', month, date.getMonth(), dayOfMonth, date.getDate());
            setBackgroundData(date, backgrounds);
        }
    } else {
        console.log('enter else');
        setBackgroundData(date, backgrounds);
    }

    background = "url(" + localStorage.getItem('background') + ")";

    document.body.style.backgroundImage = background;    
    console.log('test: ' + background);
}

function setBackgroundData(currentDate, backgroundArray) {
    let randomNum = Math.floor(Math.random() * backgroundArray.length);

    localStorage.setItem('backgroundMonth', currentDate.getMonth());
    localStorage.setItem('backgroundDay', currentDate.getDate());
    localStorage.setItem('background', backgroundArray[randomNum].location);
}

changeBackground();