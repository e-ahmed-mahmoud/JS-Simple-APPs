const container = document.querySelector('.container');
const seats = document.querySelectorAll('.row .seat:not(.occupied)');
const count = document.getElementById('count');
const total = document.getElementById('total');
const movieSelected = document.getElementById('movie');

let ticketPrice = +movieSelected.value;

PopulateUI();
//intilize Ui elements from localStorage
function PopulateUI(){
    const selectedSeats = JSON.parse(localStorage.getItem('selectedSeatsIndexs'));
    //seats.selected
    if (selectedSeats !== null && selectedSeats.length > 0) {       
        seats.forEach((seat,index)=>{
            if(selectedSeats.indexOf(index) !== -1){
                seat.classList.add('selected');
            }
        });
    }
    movieSelected.value = localStorage.getItem('selectedMovieIndex') !== null? localStorage.getItem('selectedMovieIndex') : 1;
    ticketPrice = localStorage.getItem('selectedMoviePrice');
}


SaveSelectedMovie = (movieIndex, price) =>{
    localStorage.setItem('selectedMovieIndex',movieIndex);
    localStorage.setItem('selectedMoviePrice',price);

}

//update number of selected seats and price
const UpdateCountAndTotal = () => {
    const selectedSeats = document.querySelectorAll('.row .seat.selected');
    count.innerText = selectedSeats.length;

    const selectedSeatsIndexs = [...selectedSeats].map(seat => [...seats].indexOf(seat));
    
    localStorage.setItem('selectedSeatsIndexs',JSON.stringify(selectedSeatsIndexs));

    total.innerText = +count.innerText * ticketPrice;
}
//track movie selection changes
movieSelected.addEventListener('change', ev =>{
    ticketPrice = +ev.target.value;
    UpdateCountAndTotal();
    SaveSelectedMovie(ev.target.value,ticketPrice);

});
//get selected seats from container nodes element  which is Not occupied 
container.addEventListener('click',ev => {
    const selectedTarget = ev.target;
    if (selectedTarget.classList.contains('seat') && !selectedTarget.classList.contains('occupied')) {
        selectedTarget.classList.toggle('selected');
        UpdateCountAndTotal();
    }
});

//call update to update UI with intilized values 
UpdateCountAndTotal();
