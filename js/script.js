document.querySelector(".see-more").addEventListener('click', function() {
    goDown(this.parentElement);
});

window.addEventListener('scroll', function (e) {
    if(this.window.innerWidth < 1279) {
      AOS.init({disable: false});
    }
});

window.addEventListener('wheel', function (e) {
    this.console.log(this.window.innerWidth);
    if(this.window.innerWidth > 1280) {
      AOS.init({disable: true});
      var el = document.querySelector(".block.opened");
      if (e.deltaY < 0) {
          if (el.previousElementSibling) {
              if (el.previousElementSibling.classList.contains('block')) {
                  clearTimeLoop(function () {
                      goUp(el)
                  }, 500);
              }
          }
      } else if (e.deltaY > 0) {
          if (el.nextElementSibling) {
              if (el.nextElementSibling.classList.contains('block')) {
                  clearTimeLoop(function () {
                      goDown(el)
                  }, 500);
              }
          }
      }
    }
});

// Função para limpar o timeout
function clearTimeLoop(runFunction, time) {
    var doit;
    clearTimeout(doit);
    doit = setTimeout(function () {
        runFunction();
    }, time);
}

// Função para mover o bloco pra cima
function goUp(el) {
    el.classList.remove('opened');
    el.previousElementSibling.classList.add('opened');
    el.previousElementSibling.classList.remove('closed');
}

// Função para mover o bloco pra baixo
function goDown(el) {
    el.classList.remove('opened');
    el.classList.add('closed');
    el.nextElementSibling.classList.add('opened');
    el.nextElementSibling.classList.remove('closed');
}