import axios from 'axios'
import Noty from 'noty'


/*---------add to cart operations--------*/ 

export function addToCart(){

    let addToCart = document.querySelectorAll('.add-to-cart')
    let cartCounter = document.querySelector('#cartCounter')

    function updateCart(electro){
        axios.post('/upate-cart', electro).then(res =>{
            // console.log(res)
            cartCounter.innerText = res.data.totalQty
        }).catch(err =>{
            console.log(err)
        })
    }
    
    addToCart.forEach((btn)=>{
        if(!addToCart){
            return;
        }
        btn.addEventListener('click', (e)=>{
            // console.log(e)
            let electro = JSON.parse(btn.dataset.electro)
            updateCart(electro)
            // console.log(electro)
        })
    })    
}