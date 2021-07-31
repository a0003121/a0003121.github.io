document.addEventListener("DOMContentLoaded", function () {

    /*////////////////////////////release2////////////////////////////////

    可放廣告、退換貨

    *////////////////////////////////////////////////////////////////



    //////////////////////////切換頁面///////////////////////////////////////
    // 購物車按鈕
    if (document.getElementsByClassName("btn_goto_cart")[0]) {
        document.getElementsByClassName("btn_goto_cart")[0].addEventListener("click", function () {
            location.href = "buy1_cart.html";
        });
    }

    // 我的收藏按鈕
    if (document.getElementsByClassName("btn_goto_favorite")[0]) {
        document.getElementsByClassName("btn_goto_favorite")[0].addEventListener("click", function () {
            location.href = "shop2_favorites.html";
        });
    }

    // 按商品跳到商品介紹
    let product_links = document.getElementsByClassName("goto_product");
    for (let i = 0; i < product_links.length; i++) {
        product_links[i].addEventListener("click", function () {
            location.href = "shop3_product.html";
        });
    }

    // 返回商城按鈕
    if (document.getElementsByClassName("btn_goto_index")[0]) {
        document.getElementsByClassName("btn_goto_index")[0].addEventListener("click", function () {
            location.href = "shop1_index.html";
        });
    }

    // 去付款資訊按鈕
    if (document.getElementsByClassName("btn_goto_payment")[0]) {
        document.getElementsByClassName("btn_goto_payment")[0].addEventListener("click", function () {
            location.href = "buy2_payment.html";
        });
    }

    // 上一頁
    if (document.getElementsByClassName("btn_goback")[0]) {
        document.getElementsByClassName("btn_goback")[0].addEventListener("click", function () {
            history.back(-1);
        });
    }

    // 到資訊確認頁面
    if (document.getElementsByClassName("btn_goto_confirm")[0]) {
        document.getElementsByClassName("btn_goto_confirm")[0].addEventListener("click", function () {
            location.href = "buy3_confirm.html";
        });
    }

    // 到購物完成頁面
    if (document.getElementsByClassName("btn_goto_complete")[0]) {
        document.getElementsByClassName("btn_goto_complete")[0].addEventListener("click", function () {
            location.href = "buy4_complete.html";
        });
    }

    //到訂單清單頁面
    if (document.getElementsByClassName("btn_goto_orderlist")[0]) {
        document.getElementsByClassName("btn_goto_orderlist")[0].addEventListener("click", function () {
            location.href = "order1_list.html";
        });
    }

    // 到詳細訂單頁面
    let btn_each_links = document.getElementsByClassName("btn_goto_each");
    for (let i = 0; i < btn_each_links.length; i++) {
        btn_each_links[i].addEventListener("click", function () {
            location.href = "order2_each.html";
        });
    }

    // 到評價頁面
    let btn_comment_links = document.getElementsByClassName("btn_goto_comment");
    for (let i = 0; i < btn_comment_links.length; i++) {
        btn_comment_links[i].addEventListener("click", function () {
            location.href = "order3_comment.html";
        });
    }

    // 到退換貨頁面
    let btn_ReXe_links = document.getElementsByClassName("btn_goto_ReEx");
    for (let i = 0; i < btn_ReXe_links.length; i++) {
        btn_ReXe_links[i].addEventListener("click", function () {
            location.href = "order4_ReEx.html";
        });
    }

    ///////////////////按鈕點選後加effect////////////////////////////////
    // 商品分類按鈕
    let type_button = document.querySelectorAll("div.prod_types button");
    for (let i = 0; i < type_button.length; i++) {
        type_button[i].addEventListener("click", function (e) {
            for (let j = 0; j < type_button.length; j++)
                if (type_button[j] == e.target) {
                    type_button[j].classList.add("-on");
                } else {
                    type_button[j].classList.remove("-on");
                }
        });
    }

    // 商品頁面評價篩選星數按鈕
    let star_list = document.querySelectorAll("div.type_star_btn button");
    for (let i = 0; i < star_list.length; i++) {
        star_list[i].addEventListener("click", function (e) {
            for (let j = 0; j < star_list.length; j++)
                if (star_list[j] == e.target) {
                    star_list[j].classList.add("-on");
                } else {
                    star_list[j].classList.remove("-on");
                }
        });
    }



    // 客服區塊彈跳
    $(".btn_support").on("click", function () {
        $(this).parent().siblings(".costumer_support").slideToggle();
    })

    // 客服按確定跳彈窗
    $("button.yes").on("click", function () {
        if ($(this).siblings("textarea").val().trim() == "" ||$(this).siblings("textarea").val()=="請輸入內容....") {
            alert("請輸入文字!");
        } else {
            $(this).siblings("textarea").val("");
            $(this).parent().siblings("section.confirm").find(".btn_support").click();
            $(".confirm_jump_bg").css("display", "block");
        }
    })

    //客服彈窗按確定
    $("button.cust_comfirm").on('click', function(){
        $(".confirm_jump_bg").css("display", "none");
    });

    // 客服按取消
    $("button.no").on("click", function () {
        $(this).siblings("textarea").val("");
        $(this).parent().siblings("section.confirm").find(".btn_support").click();
    })

    // 退換貨按確認
    if (document.getElementsByClassName("ReEx_yes")[0]) {
        document.getElementsByClassName("ReEx_yes")[0].addEventListener("click", function () {

            document.getElementsByClassName("confirm_jump_bg")[0].style.display = "block";
            console.log(document.getElementsByClassName("confirm_jump_bg")[0]);
        });
    }

    // 評價頁面按確認
    if (document.getElementsByClassName("comment_yes")[0]) {
        document.getElementsByClassName("comment_yes")[0].addEventListener("click", function () {

            document.getElementsByClassName("confirm_jump_bg")[0].style.display = "block";
            console.log(document.getElementsByClassName("confirm_jump_bg")[0]);
        });
    }


});

//回傳星星的html字串
function star_rating_str(star_rating) {
    let star_rate = "";
    //把數字變成以0.5為單位，計算多少星星變黃色
    let star_temp = Math.floor(star_rating);
    if (star_rating % 1 >= 0.5) {
        star_temp += 0.5
    }
    //計算剩下不變色的星星
    let star_left = 5 - Math.ceil(star_temp);
    let i = 1;
    //做星星html的顯示字串
    for (star_temp; star_temp > 0; star_temp--) {
        if (star_temp == 0.5) {
            star_rate += `<i class="fas fa-star-half-alt fa-xs data-star='${i++}'"></i>`
        } else {
            star_rate += `<i class="fas fa-star fa-xs data-star='${i++}'"></i>`
        }
    }
    for (star_left; star_left > 0; star_left--) {
        star_rate += `<i class="far fa-star fa-xs data-star='${i++}'"></i>`
    }
    return star_rate;
}

//回傳商品小卡html字串
function add_product(prod_id, prod_name, fav, prod_pic, prod_price, prod_star, prod_sale) {
    //判斷是否收藏商品
    let fav_status;
    if (fav) {
        fav_status = "fas";
    } else {
        fav_status = "far"
    }
    //產生商品小卡html字串
    let product = `<div class="product" id="${prod_id}">
                    <i class="${fav_status} fa-heart fa-lg"></i>
                    <a class="goto_product" href="shop3_product.html">
                        <img src="${prod_pic}" alt="product pictures">
                        <p>${prod_name}</p>
                        <p>$${prod_price.toLocaleString()}</p>
                    </a>
                    <div>
                        <p>已售出${prod_sale.toLocaleString()}</p>
                        <div>
                            ${prod_star}
                        </div>
                    </div>
                </div>`;
    document.querySelector("section#product_display").innerHTML += product;
};

// 商品收藏案紐
function add_heart_btn(e) {
    let heart = document.getElementsByClassName("fa-heart");
    for (let i = 1; i < heart.length; i++) {
        heart[i].addEventListener("click", function (e) {
            if (e.target.classList.contains("fas")) {
                e.target.classList.add("far");
                e.target.classList.remove("fas");
                //移除收藏
                //console.log(e.target.parentNode.getAttribute("id"));
                //api: 傳出會員ID和商品ID
            } else {
                e.target.classList.add("fas");
                e.target.classList.remove("far");
                //加入收藏
                //console.log(e.target.parentNode.getAttribute("id"));
                //api: 傳出會員ID和商品ID
            }
        });
    }
}


// filter按鈕
$("button.filter").on("click", function(){
    $("aside").toggleClass("aside_show");
})