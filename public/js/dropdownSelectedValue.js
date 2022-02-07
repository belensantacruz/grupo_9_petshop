window.addEventListener('load', function() {
    let category = document.querySelector("#category");
    let status = document.querySelector("#status");
    let categoryOptions = document.querySelectorAll("#category option");
    let statusOptions = document.querySelectorAll("#status option");

    if (category.attributes.value.nodeValue){
        categoryOptions.forEach(item => {
            if(item.selected == true)
                item.selected = false;
            if(item.attributes.value.nodeValue == category.attributes.value.nodeValue){
                item.selected = true;
            }
        });
    }
    if (status.attributes.value.nodeValue){
        statusOptions.forEach(item => {
            if(item.selected == true)
                item.selected = false;
            if(item.attributes.value.nodeValue == status.attributes.value.nodeValue){
                item.selected = true;
            }
        });
    }
});