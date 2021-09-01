// const test = require('../../data/products.json')

export function productFunction(){
    // const getProducts = async () => {
    //     try {
    //       const results = await fetch('../../data/products.json');
    //       const data = await results.json();
    //       const products = data.products;
    //       return products;
    //     } catch (err) {
    //       console.log(err);
    //     }
    //   };
      
      /*
      =============
      Load Category Products
      =============
       */
      const categoryCenter = document.querySelector(".category__center");
      
      // window.addEventListener("DOMContentLoaded", async function () {
      //   // const products = await getProducts();
      //   displayProductItems(product);
      // });
      
      // const displayProductItems = items => {
      //   let displayProduct = items.map(
      //     product => ` 
      //     <div class="product category__products">
      //     <div class="product__header">
      //       <img src="${product.image }" alt="product">
      //     </div>
      //     <div class="product__footer">
      //       <h3>${product.title }</h3>
      //       <div class="rating">
      //         <svg>
      //           <use xlink:href="/img/sprite.svg#icon-star-full"></use>
      //         </svg>
      //         <svg>
      //           <use xlink:href="/img/sprite.svg#icon-star-full"></use>
      //         </svg>
      //         <svg>
      //           <use xlink:href="/img/sprite.svg#icon-star-full"></use>
      //         </svg>
      //         <svg>
      //           <use xlink:href="/img/sprite.svg#icon-star-full"></use>
      //         </svg>
      //         <svg>
      //           <use xlink:href="/img/sprite.svg#icon-star-empty"></use>
      //         </svg>
      //       </div>
      //       <div class="product__price">
      //         <h4>${product.price } TK</h4>
      //       </div>
      //       <a href="#"><button type="submit" class="product__btn">Add To Cart</button></a>
      //     </div>
      //   <ul>
      //       <li>
      //         <a data-tip="Quick View" data-place="left" href="#">
      //           <svg>
      //             <use xlink:href="/img/sprite.svg#icon-eye"></use>
      //           </svg>
      //         </a>
      //       </li>
      //       <li>
      //         <a data-tip="Add To Wishlist" data-place="left" href="#">
      //           <svg>
      //             <use xlink:href="/img/sprite.svg#icon-heart-o"></use>
      //           </svg>
      //         </a>
      //       </li>
      //       <li>
      //         <a data-tip="Add To Compare" data-place="left" href="#">
      //           <svg>
      //             <use xlink:href="/img/sprite.svg#icon-loop2"></use>
      //           </svg>
      //         </a>
      //       </li>
      //   </ul>
      //   </div>
      //                 `
      //   );
      
      //   displayProduct = displayProduct.join("");
      //   if (categoryCenter) {
      //     categoryCenter.innerHTML = displayProduct;
      //   }
      // };
      
      /*
      =============
      Filtering
      =============
       */
      
      const filterBtn = document.querySelectorAll(".filter-btn");
      const categoryContainer = document.getElementById("category");
      const allCategoryPosts = document.querySelectorAll(".All_Products");

      const categoryTitle = document.querySelectorAll(".section__title");
      if (categoryContainer) {
        categoryContainer.addEventListener("click", async e => {
          const target = e.target.closest(".section__title");
          if (!target) return;
      
          
      for(let i = 0; i < categoryTitle.length; i++){
        categoryTitle[i].addEventListener('click', filterPosts.bind(this, categoryTitle[i]));
      }

      function filterPosts(item){
        changeActivePosition(item);
        for(let i = 0; i < allCategoryPosts.length; i++){
            if(allCategoryPosts[i].classList.contains(item.attributes.id.value)){
                allCategoryPosts[i].style.display = "block";
            } else {
                allCategoryPosts[i].style.display = "none";
            }
        }
    }
    
      function changeActivePosition(activeItem){
        for(let i = 0; i < categoryTitle.length; i++){
            categoryTitle[i].classList.remove('active');
        }
        activeItem.classList.add('active');
      };
          const id = target.dataset.id;
          // const products = await getProducts();
      
          // if (id) {
          //   // remove active from buttons
          //   Array.from(filterBtn).forEach(btn => {
          //     btn.classList.remove("active");
          //   });
          //   target.classList.add("active");
      
          //   // Load Products
          //   // let menuCategory = products.filter(product => {
          //   //   if (product.category === id) {
          //   //     return product;
          //   //   }
          //   // });
      
          //   // if (id === "All Products") {
          //   //   displayProductItems(products);
          //   // } else {
          //   //   displayProductItems(menuCategory);
          //   // }
          // }
        });
      }
      
      /*
      =============
      Product Details Left
      =============
       */
      const pic1 = document.getElementById("pic1");
      const pic2 = document.getElementById("pic2");
      const pic3 = document.getElementById("pic3");
      const pic4 = document.getElementById("pic4");
      const pic5 = document.getElementById("pic5");
      const picContainer = document.querySelector(".product__pictures");
      const zoom = document.getElementById("zoom");
      const pic = document.getElementById("pic");
      
      // Picture List
      const picList = [pic1, pic2, pic3, pic4, pic5];
      
      // Active Picture
      let picActive = 1;
      
      ["mouseover", "touchstart"].forEach(event => {
        if (picContainer) {
          picContainer.addEventListener(event, e => {
            const target = e.target.closest("img");
            if (!target) return;
            const id = target.id.slice(3);
            changeImage(`/img/products/iPhone/iphone${id}.jpeg`, id);
          });
        }
      });
      
      // change active image
      const changeImage = (imgSrc, n) => {
        // change the main image
        pic.src = imgSrc;
        // change the background-image
        zoom.style.backgroundImage = `url(${imgSrc})`;
        //   remove the border from the previous active side image
        picList[picActive - 1].classList.remove("img-active");
        // add to the active image
        picList[n - 1].classList.add("img-active");
        //   update the active side picture
        picActive = n;
      };
      
      /*
      =============
      Product Details Bottom
      =============
       */
      
      const btns = document.querySelectorAll(".detail-btn");
      const detail = document.querySelector(".product-detail__bottom");
      const contents = document.querySelectorAll(".content");
      
      if (detail) {
        detail.addEventListener("click", e => {
          const target = e.target.closest(".detail-btn");
          if (!target) return;
      
          const id = target.dataset.id;
          if (id) {
            Array.from(btns).forEach(btn => {
              // remove active from all btn
              btn.classList.remove("active");
              e.target.closest(".detail-btn").classList.add("active");
            });
            // hide other active
            Array.from(contents).forEach(content => {
              content.classList.remove("active");
            });
            const element = document.getElementById(id);
            element.classList.add("active");
          }
        });
      }
      
}