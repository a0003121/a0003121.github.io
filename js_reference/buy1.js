document.addEventListener("DOMContentLoaded", function () {

    let prod1 = {
        prod_id: 1,
        prod_name: "商品名稱1",
        prod_num: 2,
        prod_price: 3000,
        prod_spec: "one",
        prod_pic: "https://kitcat.com.sg/wp-content/uploads/2020/06/Kit-Cat-Trophy.png"
    };

    let prod2 = {
        prod_id: 1,
        prod_name: "商品名稱1",
        prod_num: 3,
        prod_price: 3000,
        prod_spec: "one",
        prod_pic: "https://kitcat.com.sg/wp-content/uploads/2020/06/Kit-Cat-Trophy.png"
    };

    let prod3 = {
        prod_id: 1,
        prod_name: "商品名稱1",
        prod_num: 1,
        prod_price: 3000,
        prod_spec: "one",
        prod_pic: "https://kitcat.com.sg/wp-content/uploads/2020/06/Kit-Cat-Trophy.png"
    };

    prod_list = [prod1, prod2, prod3];

    for (i in prod_list) {
        $("#prod_area").append(product_str(prod_list[i]["prod_pic"], prod_list[i]["prod_name"], prod_list[i]["prod_spec"], prod_list[i]["prod_price"], prod_list[i]["prod_num"]));
    }

    var total_price = 0;
    var total_count = 0;

    // 商品加減按鈕
    let minus_list = document.getElementsByClassName("minus");
    let plus_list = document.getElementsByClassName("plus");
    for (let i = 0; i < minus_list.length; i++) {

        minus_list[i].addEventListener("click", function (e) {
            let current_amount = e.target.nextSibling.nextSibling;
            let price = e.target.parentNode.parentNode.previousSibling.previousSibling;
            let total = e.target.parentNode.parentNode.nextSibling.nextSibling;
            if (current_amount.value > 1) {
                current_amount.value -= 1;
                total.textContent = (parseInt(price.textContent.replace(",", '')) * current_amount.value).toLocaleString();
                calc_total_price();
            }
        });

        plus_list[i].addEventListener("click", function (e) {
            let val_plus = parseInt(e.target.previousSibling.previousSibling.value);
            let current_amount = e.target.previousSibling.previousSibling
            current_amount.value = val_plus + 1;
            let price = e.target.parentNode.parentNode.previousSibling.previousSibling;
            let total = e.target.parentNode.parentNode.nextSibling.nextSibling;
            total.textContent = (parseInt(price.textContent.replace(",", '')) * current_amount.value).toLocaleString();
            calc_total_price();
        });
    }

    //計算選擇商品的金額和數量
    calc_total_price();
    $("input").on("change", function(){
        calc_total_price();
    })

    //全選按鈕設定
    $("#check_all").on("click", function(){
        if($("#prod_area label input:checked").length<$("#prod_area label input").length) {
            $("#prod_area label input").prop("checked", true);
            $("#check_all").prop("checked", true);
        } else{
            $("#prod_area label input").prop("checked", false);
        }
    });

    $("#prod_area label input").on("click", function(){
        if($("#prod_area label input:checked").length>=$("#prod_area label input").length) {
            $("#check_all").prop("checked", true);
        } else{
            $("#check_all").prop("checked", false);
        }
    });


    //商品移除按鈕
    $("td.trash").on("click", function(){
        $(this).parents("tr").prev().remove();
        $(this).parents("tr").remove();
        calc_total_price();
    });

});

//產生商品字串
function product_str(prod_pic, prod_name, prod_spec, prod_price, prod_num) {
    let str = `<tr><td colspan="6"><hr></td></tr>
            <tr>
            <td>
                <label>
                    <input type="checkbox" name="" id="" checked>
                    <img src="${prod_pic}"
                        alt="prod_pic">
                </label>
            </td>
            <td style="word-wrap : break-word">
                <a href="#"><p>${prod_name}</p></a>
                <p>${prod_spec}</p>
            </td>
            <td>${prod_price.toLocaleString()}</td>
            <td>
                <div class="choose_num">
                    <button class="minus">-</button>
                    <input type="text" name="" id="" value="${prod_num}" readonly>
                    <button class="plus">+</button>
                </div>
            </td>
            <td class="total">${(prod_price * prod_num).toLocaleString()}</td>
            <td class="trash"><i class="fas fa-trash-alt"></i></td>
            </tr>`;
    return str;
}

//計算目前有打勾的總金額
function calc_total_price() {
    total_price = 0;
    total_count=0;
    $("#prod_area input:checked").each(function () {
        total_count += parseInt($(this).parents("tr").find("div.choose_num input").val());
        total_price += parseInt($(this).parents("tr").find("td.total").text().replace(",", ''));
    });
    $("span.total_count").text(total_count);
    $("span.total_price").text(total_price.toLocaleString());
}