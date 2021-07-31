/*////////////////////////////待辦////////////////////////////////

    主頁面: 排序、篩選、商品從資料庫撈出來放到頁面、加入或移除收藏、頁碼、空頁面
    
    商品收藏: 商品從資料庫撈出來放到頁面、空頁面、移除收藏
    
    
    商品明細: 加入購物車、顯示評論和星數和銷售數量、評論空頁面、加入或移除收藏


       搜尋商品、header下拉選單

    *////////////////////////////////////////////////////////////////


document.addEventListener("DOMContentLoaded", function () {

    //商品從資料庫撈出來放到頁面
    //假資料
    //api還要給商品數目才能建頁數
    let prod1 = {
        prod_id: 1,
        prod_name: "商品名稱1",
        prod_price: 100,
        prod_sale: 100,
        prod_star: 3.7,
        is_Favorite: false,
        prod_pic: "prod_pic/1.jpg"
    };

    let prod2 = {
        prod_id: 2,
        prod_name: "商品名稱2",
        prod_price: 200,
        prod_sale: 2200,
        prod_star: 3.1,
        is_Favorite: true,
        prod_pic: "prod_pic/2.jpg"
    };

    let prod3 = {
        prod_id: 3,
        prod_name: "商品名稱3",
        prod_price: 1200,
        prod_sale: 200,
        prod_star: 0,
        is_Favorite: true,
        prod_pic: "prod_pic/3.jpg"
    };

    let prod4 = {
        prod_id: 4,
        prod_name: "商品名稱4",
        prod_price: 400,
        prod_sale: 20,
        prod_star: 5,
        is_Favorite: false,
        prod_pic: "prod_pic/4.jpg"
    };

    let item = [prod1, prod2, prod3, prod4, prod1, prod2, prod3, prod4, prod1, prod2, prod3, prod4, prod4, prod1, prod2, prod3, prod4, prod1, prod2, prod3, prod4, prod4, prod1, prod2, prod3, prod4, prod1, prod2, prod3, prod4];

    // 顯示商品
    for (i = 0; i < item.length && i < 10; i++) {
        add_product(item[i]["prod_id"], prod1["prod_name"], item[i]["is_Favorite"], item[i]["prod_pic"], item[i]["prod_price"], star_rating_str(item[i]["prod_star"]), item[i]["prod_sale"]);
    }
    add_heart_btn();

    //html上面顯示有幾頁
    document.getElementById("total_product_num").innerText = `${item.length} 項商品，`;
    document.getElementById("total_product_num").innerText += `共 ${Math.ceil(item.length / 10)} 頁`;

    create_page_btn(item.length, 1);

    //綁定頁數按鈕事件
    document.addEventListener("click", function (e) {
        if (e.target.classList.contains("pages") && !e.target.classList.contains("-on") && !e.target.classList.contains("no_more_page")) {
            //重新顯示商品
            let current_page_num = e.target.getAttribute("data-page");
            document.querySelector("section#product_display").innerHTML = "";
            for (i = (current_page_num - 1) * 10; i < item.length && i < (current_page_num - 1) * 10 + 10; i++) {
                add_product(item[i]["prod_id"], prod1["prod_name"], item[i]["is_Favorite"], item[i]["prod_pic"], item[i]["prod_price"], star_rating_str(item[i]["prod_star"]), item[i]["prod_sale"]);
            }
            add_heart_btn();

            //改頁數
            create_page_btn(item.length, current_page_num);
        }
    });

    // 綁定排序按鈕事件

    let sort_btn = document.querySelectorAll("div.prod_types>button");
    for (let i = 0; i < sort_btn.length; i++) {
        sort_btn[i].addEventListener("click", function (e) {
            document.querySelector("section#product_display").innerHTML = "";
            switch (e.target.id) {
                case "sort_sale":
                    item.sort(function (a, b) {
                        return b.prod_sale - a.prod_sale;
                    });
                    break;
                case "sort_eval":
                    item.sort(function (a, b) {
                        return b.prod_star - a.prod_star;
                    });
                    break;
                case "sort_priceHtoL":
                    item.sort(function (a, b) {
                        return b.prod_star - a.prod_star;
                    });
                    break;
                case "sort_priceLtoH":
                    item.sort(function (a, b) {
                        return a.prod_price - b.prod_price;
                    });
                    break;
            }

            for (i = 0; i < item.length && i < 10; i++) {
                add_product(item[i]["prod_id"], prod1["prod_name"], item[i]["is_Favorite"], item[i]["prod_pic"], item[i]["prod_price"], star_rating_str(item[i]["prod_star"]), item[i]["prod_sale"]);
            }
            add_heart_btn();

            create_page_btn(item.length, 1);
        });
    }


    

});



// 產生頁數，目前設定10個商品就換頁
//input: 商品數量、現在頁數
function create_page_btn(prod_num, current_page_num) {
    let page_num_total = Math.ceil(prod_num / 10);
    let page_show = [];
    document.querySelector("section.page").innerHTML = "";
    let page = "";
    if (current_page_num == 1) {
        page += `<button class="pages no_more_page">&lt</button>`;
    } else {
        page += `<button class="pages" data-page="${current_page_num - 1}">&lt</button>`;
    }
    //判斷顯示的頁數按紐是什麼形式
    if (page_num_total <= 5) {
        for (let i = 1; i <= page_num_total; i++) {
            page_show.push(i);
        }
    } else {
        if (current_page_num <= 5) {
            page_show = [1, 2, 3, 4, 5, "...", page_num_total];
        } else {
            if (page_num_total - current_page_num >= 3) {
                page_show = [1, "...", current_page_num - 2, current_page_num - 1, current_page_num, current_page_num + 1, current_page_num + 2, "...", page_num_total];
            } else {
                page_show = [1, "...", page_num_total - 4, page_num_total - 3, page_num_total - 2, page_num_total - 1, page_num_total];
            }
        }
    }
    //產生頁數button字串
    for (i in page_show) {
        if (page_show[i] == "...") {
            page += `<span>...</span>`;
        } else {
            if (page_show[i] == current_page_num) {
                page += `<button class="-on pages" data-page="${page_show[i]}">${page_show[i]}</button>`;
            } else {
                page += `<button class="pages" data-page="${page_show[i]}">${page_show[i]}</button>`;
            }
        }
    }

    if (current_page_num == page_num_total) {
        page += `<button class="no_more_page pages">&gt</button>`;
    } else {
        page += `<button class="pages" data-page="${parseInt(current_page_num) + 1}">&gt</button>`;
    }

    //加button到html上
    document.querySelector("section.page").innerHTML = page;


}