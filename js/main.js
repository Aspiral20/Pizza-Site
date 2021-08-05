$(document).ready(function() {
    document.getElementsByClassName('header__burger').onclick = function () {
        document.getElementById('menu').classList.add('open');
    };
    document.querySelectorAll('#menu > *').forEach((item) => {
        item.onclick = () => {
            document.getElementById('menu').classList.remove('open');
        }
    })

    let loader = $('#loader');

    (function () {
        $('#button-submit').click(function () {
            $('.error-input').hide();

            let hasError = false;

            let orderForm = $('.order__form');
            let orderHiddenBlockForm = $('.order__hidden-block-form');

            let orderInput = $('.order__input');
            let massiveOrderInput = [];

            for (let i = 0 ; i < orderInput.length ; i++) {
                massiveOrderInput[i] = $(orderInput[i]).val();
                $(orderInput[i]).removeClass('red-border');

                if (!massiveOrderInput[i]) {
                    $(orderInput[i]).addClass('red-border');
                    $(orderInput[i]).siblings('.error-input').show()
                    hasError = true;
                }
            }

            if (!hasError) {
                loader.css('display', 'flex');
                $.ajax({
                    method: "POST",
                    url: "https://itlogia.ru/test/checkout",
                    data: {
                        name: massiveOrderInput[0],
                        address: massiveOrderInput[1],
                        phone: massiveOrderInput[2]
                    }
                }).done(function (message) {
                    loader.hide();
                    console.log(message);
                    if (message.success) {
                        orderForm.css('display', 'none');
                        orderHiddenBlockForm.css('display', 'flex');
                    } else {
                        alert("Возникла ошибка при оформлении заказа, позвоните нам и сделайте заказ");
                    }
                })
            }
        })
    })()

    $('.cookie-close').click(function () {
        $('#cookie').hide();                        //Закрывается #cookie
        localStorage.setItem('cookieHide', '1');
    });

    let cookieHide = localStorage.getItem('cookieHide');
    if (!cookieHide) {
        $('#cookie').show();
    }
    console.log(cookieHide);

    new WOW({
        animateClass: 'animate__animated',
    }).init();
    $('.open-popup-link').magnificPopup({
        type:'inline',
        midClick: true // Allow opening popup on middle mouse click. Always set it to true if you don't provide alternative source in href.
    });
    $('.popupImage').magnificPopup({
        type: 'image'
        // other options
    });
    //Exersare
    $('.parallax-window').parallax({imageSrc: 'images/ParallaxImage.jpg'});
    $('.pizza-one-image-parallax').parallax({imageSrc: 'images/PizzaOneImageParallax.jpg'});
    $('.pizza-two-image-parallax').parallax({imageSrc: 'images/PizzaTwoImageParallax.jpg'});
    $('.pizza-three-image-parallax').parallax({imageSrc: 'images/PizzaThreeImageParallax.jpg'});


    //Header hover-effect:
    let menuItem = $('.menu__item');
    let menuItemActive = $('.menu__item-active');

    for (let i = 0; i < menuItem.length; i++) {
        $(menuItem[i]).click(function () {
            $(menuItemActive[i]).addClass('bottom-bar');

            for (let j = 0; j < menuItem.length; j++) {
                if (i !== j) {
                    $(menuItemActive[j]).removeClass('bottom-bar');
                }
            }
        })
    }
});