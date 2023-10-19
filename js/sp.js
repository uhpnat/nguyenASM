document.addEventListener("DOMContentLoaded", function () {
    var btnList = document.querySelectorAll('button')
    var imgList = document.querySelectorAll('img')

    btnList.forEach(btn => {
        btn.addEventListener('click', e => {
            let filterType = e.currentTarget.getAttribute('data-filter')
            imgList.forEach(img => {
                let foodType = img.getAttribute('alt')
                if (filterType === 'all' || foodType === filterType) {
                    img.classList.remove('hide')
                } else {
                    img.classList.add('hide')
                }
            })
        })
    })
})
