import { numberWithCommas } from './number.js';
// import { carts } from './sampleData/cart.js';
window.deleteCart = function (id) {
    let oldCart = JSON.parse(window.localStorage.getItem('cart'));

    if (oldCart === null) {
        oldCart = {};
    } else {

        delete oldCart[id];
        window.location.reload();
    }

    localStorage.setItem('cart', JSON.stringify(oldCart));
}

window.addEventListener('DOMContentLoaded', () => {

    const carts = JSON.parse(window.localStorage.getItem('cart'));

    const SPlienQuan = Object.values(carts).map((item) => {
        return `<div class="row p-4">
                    <div class="col-6 flex">
                        <img src="${item.image}" alt="" style="height: 180px;">
                        <div class="items-center flex justify-content-center ">
                            <div>
                                <p class="text-lg">${item.name}</p>
                                <p class="text-lg">Giá: ${numberWithCommas(item.price)}đ</p>
                                <p class="text-lg text-red-600 font-bold hover:underline" onclick="deleteCart(${item.id})">Xóa</p>
                            </div>
                        </div>
                    </div>
                    <div class="col-3 text-center flex justify-content-center items-center ">
                        <div class="border-2"
                            style="width: 40px; height: 40px; line-height: 38px; border-color: #66B032;">${item.number}</div>
                    </div>
                    <div class="col-3 text-xl font-bold text-right flex justify-content-end items-center">
                       ${numberWithCommas(Number(item.number) * Number(item.price))}đ
                    </div>
                </div>`;
    }).join(" ");

    const total = Object.values(carts).reduce((pre, cur) => {
        return Number(pre) + Number(cur.price * cur.number)
    }, 0)

    $("#listCart").html(SPlienQuan);
    $("#total").html(`${numberWithCommas(total)}đ`);

})