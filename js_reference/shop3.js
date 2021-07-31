document.addEventListener("DOMContentLoaded", function () {

    //假資料
    let prod = {
        prod_id: 1,
        prod_name: "商品名稱1",
        prod_price: [1000, 200],
        prod_spec: ["one", "two"],
        prod_sale: 2100,
        prod_star: 3.73,
        is_Favorite: true,
        prod_ship: [1, 2, 3],
        prod_detail: "高能效乙太網路（英語：Energy-Efficient Ethernet，簡稱EEE）是一套對雙絞線與電腦網路標準之乙太網路家族的背板的增強，使其在低資料活動期間消耗較少的功率。其目標是將功耗降低50%以上，同時保持與現有裝置的完全相容。[1]電氣電子工程師學會（IEEE）通過IEEE 802.3az工作群組開發了該標準。第一個研究組於2006年11月展開呼籲，並在2007年5月授權為官方標準工作群組。[2]IEEE於2010年9月批准了最終標準。[3]一些公司在其被標準化前就引進了該技術以降低乙太網路的所需能耗，並採用綠色乙太網路（Green Ethernet）為名。",
        prod_pic: ["prod_pic/9.jpg",
        "prod_pic/10.jpg",
        "prod_pic/1.jpg",
        "prod_pic/2.jpg"]
    };


    //設定商品名稱
    document.getElementById("prod_name").textContent = prod["prod_name"];
    //設定商品價格
    document.getElementById("prod_price").textContent = "$" + prod["prod_price"][0].toLocaleString();
    //設定商品規格
    for (let i = 0; i < prod["prod_spec"].length; i++) {
        document.querySelector("select[name='spec']").innerHTML += `<option value="${prod["prod_spec"][i]}">${prod["prod_spec"][i]}</option>`;
    }
    //設定星數
    let star_setting = document.getElementsByClassName("star_rate")
    star_setting[0].innerHTML = star_rating_str(prod["prod_star"]);
    star_setting[1].innerHTML = star_rating_str(prod["prod_star"]);
    star_setting[1].innerHTML += `<span>${Math.round(prod["prod_star"] * 10) / 10}顆星</span>`;
    
    //設定總銷售數
    document.getElementById("sale_total").textContent = "已銷售 " + prod["prod_sale"].toLocaleString() + " 件";
    //設定運送方式
    let ship = "運送方式: ";
    for (i in prod["prod_ship"]) {
        switch (prod["prod_ship"][i]) {
            case 1:
                ship += "7-11, "
                break;
            case 2:
                ship += "全家, "
                break;
            case 3:
                ship += "黑貓宅急便, "
                break;
            case 4:
                ship += "郵局包裹, "
                break;
        }
    }
    ship = ship.slice(0, ship.length - 2);
    document.getElementById("ship_method").textContent = ship;


    //收藏按鈕設定
    if (prod["is_Favorite"]) {
        document.getElementById("heart").classList.add("fas");
    } else {
        document.getElementById("heart").classList.add("far");
    }
    add_heart_btn();

    //商品詳情內容
    document.querySelector("section.product_text p").textContent = prod["prod_detail"];

    //商品規格選項事件綁定
    document.querySelector("select[name='spec']").addEventListener("change", function (e) {
        let index = prod["prod_spec"].indexOf(e.target.value);
        document.getElementById("prod_price").textContent = "$" + prod["prod_price"][index].toLocaleString();
    })


    // 設定圖片
    document.querySelector("div.big_pic").innerHTML = `<img src="${prod["prod_pic"][0]}" alt="">`
    for (let i = 0; i < prod["prod_pic"].length; i++) {
        document.querySelector("div.small_pics").innerHTML += `<img src="${prod["prod_pic"][i]}" alt="">`
    }
    //圖片事件綁定
    let pic_list = document.querySelectorAll("div.small_pics img");
    for (let i = 0; i < pic_list.length; i++) {
        pic_list[i].addEventListener("click", function (e) {
            document.querySelector("div.big_pic img").setAttribute("src", e.target.getAttribute("src"))
        })
    }

    //設定評論

    let comment1 = {
        user_name: "AA",
        user_pic: "https://kitcat.com.sg/wp-content/uploads/2020/06/Kit-Cat-Trophy.png",
        star_rate: 1,
        eval_detail: "bbbbbbbbbbbbbb",
        eval_pics: ["https://kitcat.com.sg/wp-content/uploads/2020/06/Kit-Cat-Trophy.png",
            "data:image/jpeg;base64,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",
            "https://kitcat.com.sg/wp-content/uploads/2020/06/Kit-Cat-Trophy.png",
            "https://kitcat.com.sg/wp-content/uploads/2020/06/Kit-Cat-Trophy.png"]
    };
    let comment2 = {
        user_name: "CCC",
        user_pic: "https://kitcat.com.sg/wp-content/uploads/2020/06/Kit-Cat-Trophy.png",
        star_rate: 1,
        eval_detail: "drgwrgwqg",
        eval_pics: ["https://kitcat.com.sg/wp-content/uploads/2020/06/Kit-Cat-Trophy.png",
            "https://kitcat.com.sg/wp-content/uploads/2020/06/Kit-Cat-Trophy.png",
            "https://kitcat.com.sg/wp-content/uploads/2020/06/Kit-Cat-Trophy.png"]
    };
    let comment3 = {
        user_name: "VVV",
        user_pic: "https://kitcat.com.sg/wp-content/uploads/2020/06/Kit-Cat-Trophy.png",
        star_rate: 5,
        eval_detail: "bbbbbbbbilil7l78k8bbbbbb",
        eval_pics: []
    };


    let comment_listAll = [comment1, comment2, comment3, comment1, comment2, comment3, comment1, comment2, comment3, comment1, comment2, comment3];
    let comment_1star = [];
    let comment_2star = [];
    let comment_3star = [];
    let comment_4star = [];
    let comment_5star = [];
    let comment_total = comment_listAll.length;
    let page_num = 0;
    let current_page = 1;
    //設定總評價數
    document.getElementById("eval_total").textContent = comment_total+"則評價";
    document.getElementById("comment_total").textContent =  comment_total + "則評價";

    
    //存每個星數要顯示的評價清單
    for (i in comment_listAll) {
        switch (comment_listAll[i]["star_rate"]) {
            case 1:
                comment_1star.push(comment_listAll[i]);
                break;
            case 2:
                comment_2star.push(comment_listAll[i]);
                break;
            case 3:
                comment_3star.push(comment_listAll[i]);
                break;
            case 4:
                comment_4star.push(comment_listAll[i]);
                break;
            case 5:
                comment_5star.push(comment_listAll[i]);
                break;
        }
    }

    //設定星數btn顯示評論數量
    let star_btn= document.querySelectorAll("div.type_star_btn button");
    star_btn[0].textContent=`全部(${comment_listAll.length})`;
    star_btn[1].textContent=`一星(${comment_1star.length})`;
    star_btn[2].textContent=`二星(${comment_2star.length})`;
    star_btn[3].textContent=`三星(${comment_3star.length})`;
    star_btn[4].textContent=`四星(${comment_4star.length})`;
    star_btn[5].textContent=`五星(${comment_5star.length})`;

    if(comment_listAll.length==0){
        star_btn[0].classList.add("no_more_page");
    }
    if(comment_1star.length==0){
        star_btn[1].classList.add("no_more_page");
    }
    if(comment_2star.length==0){
        star_btn[2].classList.add("no_more_page");
    }
    if(comment_3star.length==0){
        star_btn[3].classList.add("no_more_page");
    }
    if(comment_4star.length==0){
        star_btn[4].classList.add("no_more_page");
    }
    if(comment_5star.length==0){
        star_btn[5].classList.add("no_more_page");
    }

    
    
    //產生評價
    comment_area(comment_listAll);

    //設定星數按鈕事件
    let filter_star_btn = document.querySelectorAll("div.type_star_btn button");
    filter_star_btn[0].addEventListener("click", function (e) {
        if(!e.target.classList.contains("no_more_page")){
            comment_area(comment_listAll);
        }
    });

    filter_star_btn[1].addEventListener("click", function (e) {
        if(!e.target.classList.contains("no_more_page")){
            comment_area(comment_1star);
        }
    });

    filter_star_btn[2].addEventListener("click", function (e) {
        if(!e.target.classList.contains("no_more_page")){
            comment_area(comment_2star);
        }
    });

    filter_star_btn[3].addEventListener("click", function (e) {
        if(!e.target.classList.contains("no_more_page")){
            comment_area(comment_3star);
        }
    });

    filter_star_btn[4].addEventListener("click", function (e) {
        if(!e.target.classList.contains("no_more_page")){
            comment_area(comment_4star);
        }
    });

    filter_star_btn[5].addEventListener("click", function (e) {
        if(!e.target.classList.contains("no_more_page")){
            comment_area(comment_5star);
        }
    });



//    全螢幕看圖
    document.getElementsByClassName("big_pic")[0].addEventListener("click", function(e){
        if(e.target.parentNode.classList.contains("super_big")){
            e.target.parentNode.classList.remove("super_big");
        }else if(e.target.classList.contains("super_big")){
            e.target.classList.remove("super_big");
        }else{
            if(e.target.classList.contains("big_pic")){
                e.target.classList.add("super_big");
            }else{
                e.target.parentNode.classList.add("super_big");

            }
        }
        
        
    });
    
});


//產生comment String
function comment_str(user_pic, user_name, star_rate, eval_detail, eval_pics) {
    let comment =
        `<article>
                <div class="eval_user">
                    <img src="${user_pic}" alt="user pic">
                    <div>
                        <p>${user_name}</p>
                        <p>${star_rating_str(star_rate)}</p>
                    </div>
                </div>
                <p>${eval_detail}</p>
                <div class="pic_area">`;
    for (i in eval_pics) {
        comment += `<img src="${eval_pics[i]}" alt="comment pic">`;
    }
    comment += ` 
            </div>
            </article>
            <hr>`;
    return comment;
}

//產生評論
function comment_area(comment_list) {
    document.getElementsByClassName("eval_detail")[0].innerHTML = "";
    let total_comment = comment_list.length;
    if (comment_list.length == 0) {
        document.getElementsByClassName("eval_detail")[0].innerHTML += "<p>目前尚無評論</p>"
    } else {
        page_num = 0;
        while (total_comment > 0) {
            page_num++;
            total_comment -= 5;
        }

        current_page = 1;

        if (page_num == 1) {
            for (i in comment_list) {
                document.getElementsByClassName("eval_detail")[0].innerHTML += comment_str(comment_list[i]["user_pic"], comment_list[i]["user_name"], comment_list[i]["star_rate"], comment_list[i]["eval_detail"], comment_list[i]["eval_pics"]);
            }
        } else {
            for (let i = 0; i < 5; i++) {
                document.getElementsByClassName("eval_detail")[0].innerHTML += comment_str(comment_list[i]["user_pic"], comment_list[i]["user_name"], comment_list[i]["star_rate"], comment_list[i]["eval_detail"], comment_list[i]["eval_pics"]);
            }
        }

        document.querySelector("section.page").innerHTML = `<button class="no_more_page">&lt</button> <button class="no_more_page">&gt</button>`;

        let page_btn = document.querySelectorAll("section.page button");

        // 設定page
        //  ${page_num == 1 ? 'class="no_more_page'
        if (page_num > 1) {
            console.log(document.querySelector("section.page").firstChild.nextSibling.nextSibling);
            document.querySelector("section.page").firstChild.nextSibling.nextSibling.classList.remove("no_more_page");
        }

        //綁訂page btn事件
        page_btn[0].addEventListener("click", function (e) {
            if (!e.target.classList.contains("no_more_page")) {
                document.getElementsByClassName("eval_detail")[0].innerHTML = "";
                current_page--;
                for (let i = (current_page - 1) * 5; i < comment_list.length && i < (current_page - 1) * 5 + 5; i++) {
                    document.getElementsByClassName("eval_detail")[0].innerHTML += comment_str(comment_list[i]["user_pic"], comment_list[i]["user_name"], comment_list[i]["star_rate"], comment_list[i]["eval_detail"], comment_list[i]["eval_pics"]);
                }
                if (current_page == 1) {
                    e.target.classList.add("no_more_page");
                }
                e.target.nextSibling.nextSibling.classList.remove("no_more_page");
            };
        })


        page_btn[1].addEventListener("click", function (e) {
            if (!e.target.classList.contains("no_more_page")) {
                document.getElementsByClassName("eval_detail")[0].innerHTML = "";
                for (let i = current_page * 5; i < comment_list.length && i < current_page * 5 + 5; i++) {
                    document.getElementsByClassName("eval_detail")[0].innerHTML += comment_str(comment_list[i]["user_pic"], comment_list[i]["user_name"], comment_list[i]["star_rate"], comment_list[i]["eval_detail"], comment_list[i]["eval_pics"]);
                }
                current_page++;
                if (current_page == page_num) {
                    e.target.classList.add("no_more_page");
                }
                e.target.previousSibling.previousSibling.classList.remove("no_more_page");

            };
        });
    }

}
