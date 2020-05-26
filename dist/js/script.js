/* Header Fix*/
let header = document.querySelector('.header');
	window.onscroll = function() {
    	if (window.pageYOffset > 120) {
    	    header.classList.add('header--fixed');
    	}
    	else if (window.pageYOffset < 120) {
    	    header.classList.remove('header--fixed');
    	}
 	};
/* Accordeon */
let acc = document.getElementsByClassName('faq__item');
for (let i = 0; i < acc.length; i++) {
  	acc[i].addEventListener("click", function() {
    	this.classList.toggle("active");
  	});
}
/* Tabs */
let tab = document.getElementsByClassName('how-works__tab');
let tab_cont = document.getElementsByClassName('how-works__content');
for (let i = 0; i < tab.length; i++) {
	tab[i].addEventListener('click', function() {
		for (let i = 0; i < tab.length; i++) {
			tab[i].classList.remove('active');
			tab_cont[i].classList.remove('active');
		}
		tab[i].classList.add('active');
		tab_cont[i].classList.add('active');
	});
}
/* Mobile Menu */
let hamburger = document.querySelector('.hamburger');
hamburger.onclick = function() {
	header.classList.toggle('open');
};
