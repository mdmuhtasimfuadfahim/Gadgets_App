

export function updateCustomerProfile(){
    /*---------------------
    Update A Form Operation
    ---------------------*/ 
    $("#update_form").submit(function(event){
        event.preventDefault();
        var unindexed_array = $(this).serializeArray();
        var data = {}
    
        $.map(unindexed_array, function(n, i){
            data[n['name']] = n['value']
        })

        var request = {
            "url" : `http://localhost:5000/customer/edit/${data.id}`,
            "method" : "PUT",
            "data" : data
        }
    
        $.ajax(request).done(function(response){
            console.log(response)
            alert("Profile Information Updated Successfully...!!!");
            location.reload();
        })
    })
}