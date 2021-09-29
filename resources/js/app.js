import jQuery from 'jquery'
window.$ = window.jQuery = jQuery
import {productFunction} from './product';
import {sliderFunction} from './slider';
import {addToCart} from './addToCart';
import {updateDeleteOperation} from './deleteCartOperation';
import {updateCustomerProfile} from './updateCustomerProfile';


const navOpen = document.querySelector(".nav__hamburger");
const navClose = document.querySelector(".close__toggle");
const menu = document.querySelector(".nav__menu");
const scrollLink = document.querySelectorAll(".scroll-link");
const navContainer = document.querySelector(".nav__menu");

navOpen.addEventListener("click", () => {
  menu.classList.add("open");
  document.body.classList.add("active");
  navContainer.style.left = "0";
  navContainer.style.width = "30rem";
});

navClose.addEventListener("click", () => {
  menu.classList.remove("open");
  document.body.classList.remove("active");
  navContainer.style.left = "-30rem";
  navContainer.style.width = "0";
});

/*
=============
PopUp
=============
 */
const popup = document.querySelector(".popup");
const closePopup = document.querySelector(".popup__close");

if (window.location.pathname === '/') {
  closePopup.addEventListener("click", () => {
    popup.classList.add("hide__popup");
  });

  window.addEventListener("load", () => {
    setTimeout(() => {
      popup.classList.remove("hide__popup");
    }, 500);
  });
}

/*
================
Fixed Navigation
================
 */

const navBar = document.querySelector(".navigation");
const gotoTop = document.querySelector(".goto-top");

// Smooth Scroll
Array.from(scrollLink).map(link => {
  link.addEventListener("click", e => {
    // Prevent Default
    e.preventDefault();

    const id = e.currentTarget.getAttribute("href").slice(1);
    const element = document.getElementById(id);
    const navHeight = navBar.getBoundingClientRect().height;
    const fixNav = navBar.classList.contains("fix__nav");
    let position = element.offsetTop - navHeight;

    if (!fixNav) {
      position = position - navHeight;
    }

    window.scrollTo({
      left: 0,
      top: position,
    });
    navContainer.style.left = "-30rem";
    document.body.classList.remove("active");
  });
});

// Fix NavBar

window.addEventListener("scroll", e => {
  const scrollHeight = window.pageYOffset;
  const navHeight = navBar.getBoundingClientRect().height;
  if (scrollHeight > navHeight) {
    navBar.classList.add("fix__nav");
  } else {
    navBar.classList.remove("fix__nav");
  }

  if (scrollHeight > 300) {
    gotoTop.classList.add("show-top");
  } else {
    gotoTop.classList.remove("show-top");
  }
});


/*
=====================
Call Product Function
=====================
*/
productFunction() 


/*
====================
Call Slider Function
====================
*/
sliderFunction() 


/*
=========================
Call Add to Cart Function
=========================
*/
addToCart() 

/*--------- Remove Alert---------*/
const alertMsg = document.querySelector('#success-alert')
if(alertMsg){
    setTimeout(()=>{
        alertMsg.remove()
    },2000)
}

/*
===========================
Call Cart Operation Function
============================
*/ 
updateDeleteOperation()


/*
=====================================
Call Customer Profile Update Function
=====================================
*/ 
updateCustomerProfile()

// /*---------socket operation (real time)--------*/ 
// let socket = io() 
// /*------call admin order function-------*/
// let adminAreaPath = window.location.pathname

// if(adminAreaPath.includes('admin')){
//   /*----------call admin.js file-------------*/
//   initAdmin(socket) 
//   socket.emit('join', 'adminRoom')
// } 
