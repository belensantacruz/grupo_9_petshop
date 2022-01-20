window.addEventListener("load", function(){
    if(document.URL.includes('categories'))
    {
        let category = document.URL.split('/').pop();
        let selectedCategory;
        document.querySelectorAll('.header-categories li').forEach(function(element) {
            if(element.innerText == category.toUpperCase()){
                selectedCategory = element;
                selectedCategory.classList.add('selected-category');
            }
            else
                element.classList.remove();
        });
    }
})
