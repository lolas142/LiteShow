function createSlideshow(settings) {
    var slideshow,
        interval,
        activePictureNr;

    activePictureNr = 1;

    settings = $.extend({
        target: '#slideshow',
        button: '#button',
        interval: 5000 //in miliseconds
    }, settings);

    slideshow = {
        startSlideshow: function () {
            interval = setInterval(function () {
                slideshow.next();
            }, settings.interval);

            return this;
        },

        pauseSlideshow: function () {
            clearInterval(interval);

            return this;
        },

        prev: function () {
            var active = $(settings.target + ' .pictures .active'),
                prev = active.prev(); 

            if (!prev.length) {
                prev = $(settings.target + ' .pictures img:last-child');
            }

            prev.addClass('active');
            active.removeClass('active');

            activePictureNr--;

            return this;
        },

        next: function () {
            var active = $(settings.target + ' .pictures .active'),
                next = active.next();

            if (!next.length) {
                next = $(settings.target + ' .pictures img:first-child');
                activePictureNr = 0;
            }

            next.addClass('active');
            active.removeClass('active');

            activePictureNr++;

            return this;
        }
    };

    $(settings.target).css('display', 'block');

    $(settings.target + ' .pictures').click(function () {
        slideshow.pauseSlideshow();
        openModal();
        currentSlide(activePictureNr);
    });

    $(settings.target + ' .gallery').click(function () {
        slideshow.pauseSlideshow();
    });

    $('#background').click(function () {
        slideshow.pauseSlideshow();
        slideshow.startSlideshow();
        closeModal();
    });

    if (settings.button) {
        $(settings.button + '-next').click(function () {
            slideshow.next();
        });

        $(settings.button + '-prev').click(function () {
            slideshow.prev();
        });
    }

    return slideshow;
}

function openModal() {
  document.getElementById('myModal').style.display = "block";
}

function closeModal() {
  document.getElementById('myModal').style.display = "none";
}

var slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n) {
  showSlides(slideIndex += n);
}

function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  var i;
  var slides = document.getElementsByClassName("mySlides");
  var dots = document.getElementsByClassName("demo");
  var captionText = document.getElementById("caption");
  if (n > slides.length) {slideIndex = 1}
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex-1].style.display = "block";
  dots[slideIndex-1].className += " active";
  captionText.innerHTML = dots[slideIndex-1].alt;
}

createSlideshow().startSlideshow();