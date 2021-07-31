document.addEventListener("DOMContentLoaded", function () {
  ////////////////////商品小卡設定//////////////////////////////

  //商品圖片hover換圖
  $("div.product").hover(
    function () {
      if ($(this).find("img").attr("data-img2") != undefined) {
        second_img = $(this).find("img").attr("data-img2");

        $(this).find("img").animate({opacity: 0.5,},100,function () {
              $(this).attr("src", second_img);
            }
          ).animate({ opacity: 1 }, 100);
      }

      $(this).find(".preview").slideToggle("fast");
    },
    function () {
      $(this).find(".preview").slideToggle("fast");

      if ($(this).find("img").attr("data-img2") != undefined) {
        first_img = $(this).find("img").attr("data-img1");
        $(this).find("img").animate({opacity: 0.5,},100,
            function () {
              $(this).attr("src", first_img);
            }
          ).animate({ opacity: 1 }, 100);
      }
    }
  );

  //////////////////首頁////////////////////////////

  //RWD篩選跳出
  $("button.filter").on("click", function () {
    $("aside").slideToggle();
  });

  $("article.explanation h2").on("click", function () {
    $(this).next().slideToggle();
  });

  add_heart_btn();

  //////////////商品詳情///////////////////////////

  //圖片事件綁定
  let pic_list = document.querySelectorAll("div.small_pics img");
  for (let i = 0; i < pic_list.length; i++) {
    pic_list[i].addEventListener("click", function (e) {
      document
        .querySelector("div.big_pic img")
        .setAttribute("src", e.target.getAttribute("src"));
    });
  }

  ///////////////////每筆訂單頁面///////////////////////

  // 客服區塊彈跳
  $(".btn_support").on("click", function () {
    $(this).parent().siblings(".costumer_support").slideToggle();
  });

  // 客服按確定跳彈窗
  $("button.yes").on("click", function () {
    if (
      $(this).siblings("textarea").val().trim() == "" ||
      $(this).siblings("textarea").val() == "請輸入內容...."
    ) {
      alert("請輸入文字!");
    } else {
      $(this).siblings("textarea").val("");
      $(this).parent().siblings("section.confirm").find(".btn_support").click();
      $(".confirm_jump_bg").css("display", "block");
    }
  });

  //客服彈窗按確定
  $("button.cust_comfirm").on("click", function () {
    $(".confirm_jump_bg").css("display", "none");
  });

  // 客服按取消
  $("button.no").on("click", function () {
    $(this).siblings("textarea").val("");
    $(this).parent().siblings("section.confirm").find(".btn_support").click();
  });

  ////////////////////購物車頁面//////////////////////////////
  //商品移除按鈕
  $("div.trash").on("click", function () {
    $(this).parent().prev().remove();
    $(this).parent().remove();
  });

  //全選按鈕設定
  $("#check_all").on("click", function () {
    if ($("label.items input:checked").length < $("label.items input").length) {
      $("label.items input").prop("checked", true);
      $("#check_all").prop("checked", true);
    } else {
      $("label.items input").prop("checked", false);
    }
  });

  $("label.items input").on("click", function () {
    if (
      $("label.items input:checked").length >= $("label.items input").length
    ) {
      $("#check_all").prop("checked", true);
    } else {
      $("#check_all").prop("checked", false);
    }
  });

  // 商品加減按鈕
  let minus_list = document.getElementsByClassName("minus");
  let plus_list = document.getElementsByClassName("plus");
  for (let i = 0; i < minus_list.length; i++) {
    minus_list[i].addEventListener("click", function (e) {
      let current_amount = e.target.nextSibling.nextSibling;
      let price =
        e.target.parentNode.parentNode.previousSibling.previousSibling;
      if (current_amount.value > 1) {
        current_amount.value -= 1;
      }
    });

    plus_list[i].addEventListener("click", function (e) {
      let val_plus = parseInt(e.target.previousSibling.previousSibling.value);
      let current_amount = e.target.previousSibling.previousSibling;
      current_amount.value = val_plus + 1;
      let price =
        e.target.parentNode.parentNode.previousSibling.previousSibling;
    });
  }

 

  ///////////////////////////////// 評價頁面///////////////////
  //按確認
  if (document.getElementsByClassName("comment_yes")[0]) {
    document
      .getElementsByClassName("comment_yes")[0]
      .addEventListener("click", function () {
        document.getElementsByClassName("confirm_jump_bg")[0].style.display =
          "block";
        console.log(document.getElementsByClassName("confirm_jump_bg")[0]);
      });
  }

  // 點星星按紐顯示點選星數
  $("p.star_area").on("click", "i", function () {
    $(this)
      .parent()
      .html(star_rating_str_big($(this).attr("data-star")));
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
      star_rate += `<i class="fas fa-star" data-star='${i++}'"></i> `;
    }
    for (star_left; star_left > 0; star_left--) {
      star_rate += `<i class="far fa-star" data-star='${i++}'"></i> `;
    }
    return star_rate;
  }

  // 產生預覽圖
  $("div.display").on("change", "input[name='pic']", function (e) {
    // console.log(this.files);
    let pic_preview = e.target.parentNode.nextSibling.nextSibling;
    pic_preview.innerHTML =
      '<div class="spin"><i class="fas fa-spinner fa-pulse"></i></div>';
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


  // 退換貨頁面產生預覽圖
  // 產生預覽圖
  $("input[name='reex_upload']").on("change", function (e) {
    console.log(this.files);
    let pic_preview = e.target.parentNode.nextSibling.nextSibling;
    pic_preview.innerHTML =
      '<div class="spin"><i class="fas fa-spinner fa-pulse"></i></div>';
    
      let reader = new FileReader();
      reader.readAsDataURL(this.files[0]);
      reader.addEventListener("load", function () {
        let li_html = `<img src="${reader.result}" class="preview"> `;
        pic_preview.insertAdjacentHTML("beforeend", li_html);
        $("div.spin").remove();
      });
    
  });
});

// 商品收藏案紐
function add_heart_btn(e) {
  let heart = document.getElementsByClassName("fa-heart");
  for (let i = 1; i < heart.length; i++) {
    heart[i].addEventListener("click", function (e) {
      if (e.target.classList.contains("fas")) {
        e.target.classList.add("far");
        e.target.classList.remove("fas");
        e.target.nextSibling.nextSibling.textContent = "已取消收藏 ！";

        let tar = e.target;
        setTimeout(function () {
          e.target.nextSibling.nextSibling.textContent = "加入收藏";
        }, 2000);

        //移除收藏
        //console.log(e.target.parentNode.getAttribute("id"));
        //api: 傳出會員ID和商品ID
      } else {
        e.target.classList.add("fas");
        e.target.classList.remove("far");
        e.target.nextSibling.nextSibling.textContent = "已加入收藏 ！";

        let tar = e.target;
        setTimeout(function () {
          e.target.nextSibling.nextSibling.textContent = "取消收藏";
        }, 2000);

        //加入收藏
        //console.log(e.target.parentNode.getAttribute("id"));
        //api: 傳出會員ID和商品ID
      }
    });
  }
}
