// barbaJS ==========

function pageTransition() {
    const tl_page = gsap.timeline()

    tl_page.to('ul.transitions li', {
        duration: .5,
        scaleY: 1,
        transformOrigin: 'bottom left',
        stagger: .2
    })

    tl_page.to('ul.transitions li',{
        duration: .5,
        scaleY: 0,
        transformOrigin: 'bottom left',
        stagger: .1,
        delay: .1
    })
}
// function contentAnimation() {
//     const tl_page_two = gsap.timeline()

//     // tl_page_two.from()
// }
function delay(n) {
    n = n || 2000;  
    return new Promise((done) => {
        setTimeout(() => {
            done();
        }, n);
    });
}
function removeToggle() {
    document.querySelector('.navbar-toggle').classList.remove("active");
}


// toggle Menu ===================

const html = document.documentElement;
const toggle = document.getElementById("toggle");
const circle = document.getElementById("bg-circle");
const circleWidth = circle.clientWidth;

// Math calcul to get Height, Width, Diagonal and Circle Radius

const getVpdr = () => {
const vph = Math.pow(html.offsetHeight, 2); // Height
const vpw = Math.pow(html.offsetWidth, 2); // Width
const vpd = Math.sqrt(vph + vpw); // Diagonal
return (vpd * 2) / circleWidth; // Circle radius
};

const navbarTimeline = gsap.timeline();
navbarTimeline.to("#bg-circle", {scale: getVpdr(), ease: Expo.easeInOut, duration: 1.5}); // 1-я анимация при нажатии toggle
navbarTimeline.to(".navbar", { display: "flex", duration: 0 }, '>-0.5'); // 2-я анимация, за 0.5 сек до окончания 1-й
navbarTimeline.fromTo(".navbar ul li", { y: 25, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, stagger: 0.1 }, '<'); // 3-я анимация, сразу после 2-й 
navbarTimeline.pause()  
const openNavbar = () => {
    navbarTimeline.play()
    document.querySelector('.navbar-toggle').classList.add("active");
};

const closeNavbar = () => {
    navbarTimeline.reverse()
    document.querySelector('.navbar-toggle').classList.remove("active");
};

let isOpen = false;

toggle.onclick = function () {
if (isOpen) {
    closeNavbar();
} else {
    openNavbar();
}
isOpen = !isOpen;
};

// On windows resize, recalcule circle radius and update

window.onresize = () => {
if (isOpen) {
    gsap.to("#bg-circle", 1, { scale: getVpdr(), ease: Expo.easeInOut });
    }
};

var tweens = []
var swiper, swiper_text
function loadPage() {
    try {
        barba.init({
            logLevel: 'debug ',
            sync: false,
            
            transitions: [{
                async leave() {
                    pageTransition()
                    removeToggle()
                    closeNavbar()
                    await delay(1300)
                },
                
                async afterLeave() {
                    // barba.data.current.container.remove() // Удаляем содержимое предыдущей страницы вручную, т. к. без этого почему-то некорректно работает
                    
                    // closeNavbar()
                },
    
                async beforeEnter() {
                    barba.data.current.container.remove();
                    // document.querySelector('footer').insertAdjacentElement("beforebegin", barba.data.next.container)
                },
    
                async enter() {
                    const done = this.async()
                    
                    // barba.data.current.container.remove() // Удаляем содержимое предыдущей страницы вручную, т. к. без этого почему-то некорректно работает
                    // await delay(500)
                    window.scroll(0, 0)
                    loadPage() // Загружаем все скрипты заново
                    
                    done()
                    barba.destroy()
                },
    
                // async once(data) {
                //     contentAnimation()
                // },
            }]
        })
    } catch (error) {
        console.log(error)
    }
    
    if (document.title === "MosProvider") {
        const myText = new SplitType('.tit')
    }
    if (document.title === "MosProvider" || document.title === "MosProvider edit") {
        setTimeout(() =>
        {
            // swiper =========== 
            swiper = new Swiper('.swiper', {
                // Optional parameters
                breakpoints: {
                    768: {
                        direction: 'vertical',
                    }
                },
                loop: true,
                // autoplay: {
                //     delay: 6000,
                //     disableOnInteraction: false,
                // },
                // pagination: {
                //     el: '.swiper-pagination',
                //     // type: 'fraction',
                //     type: 'bullets',
                // },
                // navigation: {
                //     nextEl: '.swiper-button-next',
                //     prevEl: '.swiper-button-prev',
                // },
                effect: 'fade',
                fadeEffect: {
                    crossFade: true
                },
                // direction: 'ltr'
                // slidesPerView: 1,
            });

            swiper_text = new Swiper('.swiper-text', {
                // Optional parameters
                breakpoints: {
                    768: {
                        direction: 'vertical',
                    }
                },
                loop: true,
                autoplay: {
                    delay: 9000,
                    disableOnInteraction: false,
                },
                pagination: {
                    el: '.swiper-pagination',
                    // type: 'fraction',
                    type: 'bullets',
                },
                navigation: {
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
                },
                simulateTouch: false,
                // effect: 'fade',
                // fadeEffect: {
                //     crossFade: true
                // },
                // direction: 'ltr'
            });
            
            swiper.controller.control = swiper_text
            swiper_text.controller.control = swiper


            gsap.registerPlugin(ScrollTrigger);

            tweens.push(gsap.to('.word', {
                // height: 'auto',
                y: 0,
                stagger: .17,
                // delay: 0.8,
                duration: .8,
                ease: "power4.inOut",
                clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)"
                // clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
            },0).time(0))

            tweens.push(gsap.from('.r_speed', {
                x: 300,
                y: 100,
                opacity: 0,
                // rotate: -25,
                ease: "power4.out",
                duration: .8,
                ease: "sine.out",
            },0).time(0))

            tweens.push(gsap.from('.word_bg', {
                opacity: 0,
                x: -140,
                ease: "power4.out",
                // rotate: -45,
                duration: 1,
            },0).time(0))

            tweens.push(gsap.from('.btn--main', {
                // opacity: 0,
                y: 20,
                opacity: 0,
                duration: .8,
                ease: "sine.out",
            },0).time(0))
            tweens.push(gsap.from('.descr_promo', {
                // opacity: 0,
                y: 30,
                opacity: 0,
                duration: .5,
                ease: "sine.out",
            },0).time(0))

            // ======= Services ======= 
            
            tweens.push(gsap.from('.services_wr', {
                // opacity: 0,
                y: 200,
                // opacity: 0,
                duration: 1.2,
                ease: "sine.out",
            },0).time(0))

            // ======= Lines ======= 

            tweens.push(gsap.to(".line_one", {
                x: '-50%',
                // backgroundPosition: '1300px -500px',
                scrollTrigger: {
                    trigger: ".section_six",
                    start: 'top 500px',
                    scrub: true,
                    ease: "power4.inOut",
                }
            }));
            tweens.push(gsap.to(".line_two", {
                x: '50%',
                // backgroundPosition: '1300px -500px',
                scrollTrigger: {
                    trigger: ".section_six",
                    start: 'top 500px',
                    scrub: true,
                    ease: "power4.inOut",
                }
            }));
            tweens.push(gsap.to(".line_three", {
                x: '-50%',
                // backgroundPosition: '1300px -500px',
                scrollTrigger: {
                    trigger: ".section_six",
                    start: 'top 500px',
                    scrub: true,
                    ease: "power4.inOut",
                }
            }));
            tweens.push(gsap.to(".line_four", {
                x: '50%',
                // backgroundPosition: '1300px -500px',
                scrollTrigger: {
                    trigger: ".section_six",
                    start: 'top 500px',
                    scrub: true,
                    ease: "power4.inOut",
                }
            }));
            tweens.push(gsap.to(".line_five", {
                x: '-50%',
                // backgroundPosition: '1300px -500px',
                scrollTrigger: {
                    trigger: ".section_six",
                    start: 'top 500px',
                    scrub: true,
                    ease: "power4.inOut",
                }
            }));
            tweens.push(gsap.to(".line_six", {
                x: '50%',
                // backgroundPosition: '1300px -500px',
                scrollTrigger: {
                    trigger: ".section_six",
                    start: 'top 500px',
                    scrub: true,
                    ease: "power4.inOut",
                }
            }));



            // ============== count numbers
            tweens.push(gsap.to('.count', {
                // height: 'auto',
                y: 0,
                stagger: .15,
                // delay: 0.8,
                duration: .4,
                ease: "power4.Out",
                clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
                scrollTrigger: {
                    trigger: ".section_three",
                    start: 'top center',
                    // scrub: true,
                    ease: "power4.inOut",
                    // markers: true
                }
            }))
            tweens.push(gsap.to('.descr_numbers', {
                // height: 'auto',
                y: 0,
                stagger: .15,
                // delay: 0.8,
                duration: 1.2,
                ease: "power4.inOut",
                clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
                scrollTrigger: {
                    trigger: ".section_three",
                    start: 'top center',
                    // scrub: true,
                    ease: "power4.inOut",
                    // markers: true
                }
            }))
            tweens.push(gsap.to('.line_numbers', {
                // height: 'auto',
                height: 120,
                duration: 1,
                ease: "power4.inOut",
                clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
                scrollTrigger: {
                    trigger: ".section_three",
                    start: 'top center',
                    // scrub: true,
                    ease: "power4.inOut",
                    // markers: true
                }
            }))
            tweens.push(gsap.to('.horizontal_line', {
                // height: 'auto',
                duration: 1.3,
                ease: "power4.inOut",
                clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
                scrollTrigger: {
                    trigger: ".section_three",
                    start: 'top center',
                    // scrub: true,
                    ease: "power4.inOut",
                    // markers: true
                }
            }))
            // /============== count numbers

            // ============== best rates
            tweens.push(gsap.to('.title_four', {
                // height: 'auto',
                duration: 1,
                ease: "power4.out",
                y: 0,
                clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
                scrollTrigger: {
                    trigger: ".section_three",
                    start: 'bottom center',
                    // scrub: true,
                    ease: "power4.inOut",
                    // markers: true
                }
            }))
            // gsap.from('.rate_wr', {
            //     // height: 'auto',
            //     duration: 1.4,
            //     ease: "power4.out",
            //     y: 300,
            //     opacity: 0,
            //     scrollTrigger: {
            //         trigger: ".section_three",
            //         start: 'bottom center',
            //         // scrub: true,
            //         ease: "power4.inOut",
            //         // markers: true
            //     }
            // })
            // /============== best rates


            // ============== best providers
            // gsap.to('.title_five', {
            //     // height: 'auto',
            //     duration: 1.4,
            //     ease: "power4.out",
            //     y: 0,
            //     clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
            //     scrollTrigger: {
            //         trigger: ".section_four",
            //         start: 'bottom center',
            //         // scrub: true,
            //         ease: "power4.inOut",
            //         // markers: true
            //     }
            // })
            tweens.push(gsap.from('.provider_wr', {
                // height: 'auto',
                duration: 1,
                ease: "power4.out",
                y: 120,
                opacity: 0,
                scrollTrigger: {
                    trigger: ".section_five",
                    start: 'top top',
                    // scrub: true,
                    ease: "power4.inOut",
                    // markers: true
                }
            }))
        }, 0);
    }
}

loadPage();