
// 產生預覽圖
$("div.display").on("change", "input[name='pic']", function (e) {
    // console.log(this.files);
    let pic_preview = e.target.parentNode.nextSibling.nextSibling;
    pic_preview.innerHTML = '<div class="spin"><i class="fas fa-spinner fa-pulse"></i></div>';
    for (let i = 0; i < this.files.length && i < 3; i++) {
        let reader = new FileReader();
        reader.readAsDataURL(this.files[i]); 
        reader.addEventListener("load", function () {
            let li_html = `<img src="${reader.result}" class="preview"> `;
            pic_preview.insertAdjacentHTML("beforeend", li_html); 
            $("div.spin").remove(); 
        });
        
    }
});

// 假資料
prod1 = {
    name: "aaaa",
    spec: "asdfasdf",
    img: "https://cdn.britannica.com/s:800x1000/22/206222-050-3F741817/Domestic-feline-tabby-cat.jpg"
}

prod2 = {
    name: "aaaa",
    spec: "asdfasdf",
    img: "https://cdn.britannica.com/s:800x1000/22/206222-050-3F741817/Domestic-feline-tabby-cat.jpg"
}

prod3 = {
    name: "aaaa",
    spec: "asdfasdf",
    img: "https://cdn.britannica.com/s:800x1000/22/206222-050-3F741817/Domestic-feline-tabby-cat.jpg"
}

let prod = [prod1, prod2, prod3];

//產生商品字串
for (let i = 0; i < prod.length; i++) {
    let str =
        `<section class="order_prods eval_sec">
        <img src="${prod[i]["img"]}" alt="prod_pic">
        <div>
            <span>${prod[i]["name"]} | ${prod[i]["spec"]}</span>
            <p class="star_area">
                <i class="fas fa-star" data-star="1"></i>
                <i class="fas fa-star" data-star="2"></i>
                <i class="fas fa-star" data-star="3"></i>
                <i class="fas fa-star" data-star="4"></i>
                <i class="fas fa-star" data-star="5"></i>
            </p>
            <label class="file_upload_btn" for="${i}">上傳圖片(最多三張)
            <input type="file" name="pic" id="${i}" accept="image/*" multiple></label>
            <div class="pic_preview"></div>
            <textarea name="" id="" cols="30" rows="5">評論內容</textarea>
        </div>
        </section>`;
        if(!i==prod.length){
            str+=`<hr>`;
        }

    $("div.display").append(str);
}





// 點星星按紐顯示點選星數
$("p.star_area").on("click", "i", function () {
    $(this).parent().html(star_rating_str_big($(this).attr("data-star")));
});

//產生星數字串
function star_rating_str_big(star_rating) {
    let star_rate = "";
    //把數字變成以0.5為單位，計算多少星星變黃色
    let star_temp = Math.floor(star_rating);
    //計算剩下不變色的星星
    let star_left = 5 - Math.ceil(star_temp);
    let i = 1;
    //做星星html的顯示字串
    for (star_temp; star_temp > 0; star_temp--) {
        star_rate += `<i class="fas fa-star" data-star='${i++}'"></i> `
    }
    for (star_left; star_left > 0; star_left--) {
        star_rate += `<i class="far fa-star" data-star='${i++}'"></i> `
    }
    return star_rate;
}
