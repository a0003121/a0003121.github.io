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
        prod_pic: "prod_pic/5.jpg"
    };

    let prod2 = {
        prod_id: 2,
        prod_name: "商品名稱2",
        prod_price: 200,
        prod_sale: 2200,
        prod_star: 3.1,
        is_Favorite: true,
        prod_pic: "prod_pic/6.jpg"
    };

    let prod3 = {
        prod_id: 3,
        prod_name: "商品名稱3",
        prod_price: 1200,
        prod_sale: 200,
        prod_star: 0,
        is_Favorite: true,
        prod_pic: "prod_pic/7.jpg"
    };

    let prod4 = {
        prod_id: 4,
        prod_name: "商品名稱4",
        prod_price: 400,
        prod_sale: 20,
        prod_star: 5,
        is_Favorite: false,
        prod_pic: "prod_pic/8.jpg"
    };

    let item = [];
    item.push(prod1);
    item.push(prod2);
    item.push(prod3);
    item.push(prod4);

    for (i = 0; i < item.length; i++) {
        add_product(item[i]["prod_id"], prod1["prod_name"], item[i]["is_Favorite"], item[i]["prod_pic"], item[i]["prod_price"], star_rating_str(item[i]["prod_star"]), item[i]["prod_sale"]);
        add_product(item[i]["prod_id"], prod1["prod_name"], item[i]["is_Favorite"], item[i]["prod_pic"], item[i]["prod_price"], star_rating_str(item[i]["prod_star"]), item[i]["prod_sale"]);
    }

    
    add_heart_btn();
    document.getElementById("total_product_num").innerText=`${item.length} 項商品`;




});
