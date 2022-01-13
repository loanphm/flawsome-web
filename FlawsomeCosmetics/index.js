import { products } from "./sampleData/product.js";
import { numberWithCommas } from "./number.js";

// const $ = document.querySelector.bind(document);
// const $$ = document.querySelectorAll.bind(document);

$.ajax({
    url: "./header/header.html",
    data: {
        zipcode: 97201,
    },
    success: function (result) {
        $("#header").html(result);
    },
});

$.ajax({
    url: "./footer/footer.html",
    data: {
        zipcode: 97201,
    },
    success: function (result) {
        $("#foot").html(result);
    },
});

window.addCart = function (id) {
    const item = products.find((p) => p.id === Number(id));

    let oldCart = JSON.parse(window.localStorage.getItem("cart"));
    if (oldCart === null) {
        oldCart = {};
    }

    if (oldCart[id]) {
        console.log("có", id);
        oldCart[id].number++;
    } else {
        console.log("không", id);
        oldCart[id] = { ...item, number: 1 };
    }

    localStorage.setItem('cart', JSON.stringify(oldCart));
    alert('Thêm sản phẩm vào giỏ hàng thành công!');
    window.location.reload();
}

window.addEventListener("DOMContentLoaded", () => {
    const listSPNoiBat = products.filter((p) => p.idCategory == 2);
    const sanPhamNoiBat = listSPNoiBat
        .map((item, index) => {
            let star = "";
            for (let index = 0; index < 5; index++) {
                if (index <= item.vote) {
                    star += `<i class="fa fa-star"></i> `;
                } else {
                    star += `<i class="fa fa-star-o" aria-hidden="true"></i> `;
                }
            }
            return `<div class="col-3" >
                    <a href="TrangChiTietSanPham.html?id=${item.id}">
                        <img src='${item.image}' />
                        <h4 class="py-2">
                            ${item.name}
                        </h4>
                    </a>
                    <div class="flex justify-content-between ">
                        <div>
                            <div class="rating">${star}</div>
                            <p>${numberWithCommas(item.price)}đ</p>
                        </div>
                        <img src='Images/svg/50/cart.svg' class="pr-2 cart-icon" onclick="addCart(${item.id
                })" />
                    </div>
                </div>`;
        })
        .join(" ");

    const listSPMoi = products.filter((p) => p.idCategory != 2);
    const sanPhamMoi = listSPMoi
        .slice(0, 4)
        .map((item) => {
            let star = "";
            for (let index = 0; index < 5; index++) {
                if (index <= item.vote) {
                    star += `<i class="fa fa-star"></i> `;
                } else {
                    star += `<i class="fa fa-star-o" aria-hidden="true"></i> `;
                }
            }
            return `<div class="col-3" >
                    <a href="TrangChiTietSanPham.html?id=${item.id}">
                        <img src='${item.image}' />
                        <h4 class="py-2">
                            ${item.name}
                        </h4>
                    </a>
                    <div class="flex justify-content-between ">
                        <div>
                            <div class="rating">${star}</div>
                            <p>${numberWithCommas(item.price)}đ</p>
                        </div>
                        <img src='Images/svg/50/cart.svg' class="pr-2 cart-icon" onclick="addCart(${item.id
                })" />
                    </div>
                </div>`;
        })
        .join(" ");

    const tatCaSanPham = products
        .map((item, index) => {
            let star = "";
            for (let index = 0; index < 5; index++) {
                if (index <= item.vote) {
                    star += `<i class="fa fa-star"></i> `;
                } else {
                    star += `<i class="fa fa-star-o" aria-hidden="true"></i> `;
                }
            }
            return `<div class="product-item transform-col">
                    <a href="TrangChiTietSanPham.html?id=${item.id}">
                        <img class="" src='${item.image}' />
                        <div class="self-end ">
                            <div class="px-4 py-2">
                                <p class="pt-2 pb-1 text-black font-bold text-lg">${item.name
                }</p>
                                <div class="flex justify-content-between" >
                                    <div>
                                        <div class="rating">${star}</div>
                                        <p class="text-black">${numberWithCommas(
                    item.price
                )}đ</p>
                                    </div>
                                    <img src='Images/svg/50/cart.svg' class="pr-4 cart-icon" onclick="addCart(${item.id
                })" />
                                </div>
                            </div>
                        </div>
                    </a>
                </div>`;
        })
        .join(" ");

    $("#product1").html(sanPhamNoiBat);
    $("#product2").html(sanPhamMoi);
    $("#allProduct").html(tatCaSanPham);
});