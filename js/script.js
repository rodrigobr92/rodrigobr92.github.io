document.querySelector(".see-more").addEventListener("click", function() {
	goDown(this.parentElement);
});

window.addEventListener("scroll", function(e) {
	if (this.window.innerWidth < 1279) {
		AOS.init({ disable: false });
	}
});

// Função para mover o bloco pra cima
function goUp(el, e) {
	console.log(e.deltaY);
	window.removeEventListener("wheel", changePage);

	el.classList.remove("opened");
	el.previousElementSibling.classList.add("opened");
	el.previousElementSibling.classList.remove("closed");

	clearTimeLoop(function() {
		window.addEventListener("wheel", changePage, { passive: true });
	}, 1500);
}

// Função para mover o bloco pra baixo
function goDown(el, e) {
	console.log(e.deltaY);
	window.removeEventListener("wheel", changePage);

	el.classList.remove("opened");
	el.classList.add("closed");
	el.nextElementSibling.classList.add("opened");
	el.nextElementSibling.classList.remove("closed");

	clearTimeLoop(function() {
		window.addEventListener("wheel", changePage, { passive: true });
	}, 1500);
}

function changePage() {
	var e = this.event;
	console.log(e);
	if (window.innerWidth > 1280) {
		AOS.init({ disable: true });
		var el = document.querySelector(".block.opened");
		if (e.deltaY < 0) {
			if (el.previousElementSibling) {
				if (el.previousElementSibling.classList.contains("block")) {
					goUp(el, e);
				}
			}
		} else if (e.deltaY > 0) {
			if (el.nextElementSibling) {
				if (el.nextElementSibling.classList.contains("block")) {
					goDown(el, e);
				}
			}
		}
	}
}

window.addEventListener("wheel", changePage, { passive: true });

// Função para limpar o timeout
function clearTimeLoop(runFunction, time) {
	var doit;
	clearTimeout(doit);
	doit = setTimeout(function() {
		runFunction();
	}, time);
}
