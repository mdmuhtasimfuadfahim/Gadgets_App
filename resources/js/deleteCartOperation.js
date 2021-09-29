
export function updateDeleteOperation(){
    /*
    ================
    Delete Operation
    ================
    */ 
    if(window.location.pathname == "/cart"){
        window.$ondelete = $(".cart__table .table tbody tr .product__subtotal button.remove__cart-item");
        $ondelete.click(function(){
            var id = $(this).attr("data-id")
    
            var request = {
                "url" : `http://localhost:5000/cart/delete/${id}`,
                "method" : "DELETE"
            }
    
            if(confirm("Do You want to Delete this Product from Cart?")){
                $.ajax(request).done(function(response){
                    console.log(response)
                    alert("Prodcut Deleted from Cart..!!!");
                    location.reload();
                })
            }
    
        })
    }

    /*
    =====================
    Update Cart Operation
    =====================
    */ 
     if(window.location.pathname){
         window.$onupdate = $(".cart__table .table tbody tr .product__quantity .input-counter button.minus-btn");
         $onupdate.click(function(){
             var id = $(this).attr("data-one")
             console.log(id)

             var request = {
                 "url": `http://localhost:5000/cart/update/minus/${id}`,
                 "method": "PUT"
             }
             $.ajax(request).done(function(response){
                 location.reload();
             })
         })
     }
     window.$onplus = $(".cart__table .table tbody tr .product__quantity .input-counter button.plus-btn");
         $onplus.click(function(){
             var id = $(this).attr("data-two")
             console.log(id)

             var request = {
                 "url": `http://localhost:5000/cart/update/plus/${id}`,
                 "method": "PUT"
             }
             $.ajax(request).done(function(response){
                 location.reload();
             })
         })

}