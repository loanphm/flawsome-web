import { products } from './sampleData/product.js'; 
import { numberWithCommas } from './number.js'; 
const url = new URL(window.location.href); 
const id = url.searchParams.get("id"); 
 
const product = products.find(p => p.id === Number(id)); 


window.plusQuantity = function () { 
    const quantity = $('#quantity')[0]; 
 
    $('#quantity').val(Number(quantity.value) + 1); 
} 

window.minusQuantity = function () { 
    const quantity = $('#quantity')[0]; 
    if (quantity.value > 1) { 
        $('#quantity').val(Number(quantity.value) - 1); 
    } 
  
} 
  
window.addToCart = function (id) { 
    const quantity = Number($('#quantity')[0].value); 
 
    const item = products.find(p => p.id === Number(id)); 
 
    let oldCart = JSON.parse(window.localStorage.getItem('cart')); 
    if (oldCart === null) { 
        oldCart = {}; 
    } 
  
    if (oldCart[id]) { 
        oldCart[id].number = quantity + Number(oldCart[id].number); 
    } else { 
        oldCart[id] = { ...item, number: quantity }; 
    } 

    localStorage.setItem('cart', JSON.stringify(oldCart)); 
    alert('Thêm sản phẩm vào giỏ hàng thành công!'); 
    window.location.reload(); 
 
} 

window.addEventListener('DOMContentLoaded', () => { 
 
    let star = ''; 
    for (let index = 0; index < 5; index++) { 
        if (index <= product.vote) { 
            star += `<i class="fa fa-star"></i> `; 
        } else { 
            star += `<i class="fa fa-star-o" aria-hidden="true"></i> `; 
        } 
    } 

    const sanPhamchiTiet = `<div class="row py-8"> 
            <div class="col-4"> 
                <div class="large-image"> 
                    <img src="${product.image}" alt="" width="500" id="product-img"> 
                </div> 
 
                <div class="small-img-row"> 
 
                    <div class="product-thumb"> 
 
                        <div class="nav-item" role="presentation"> 
                            <button class="nav-link active" data-toggle="tab" data-target="" type="button"> 
                                <span class="thumb"> 
                                    <img src="${product.image1}" /> 
                                </span> 
                            </button>
                        </div>

                        <div class="nav-item" role="presentation"> 
                            <button class="nav-link" data-toggle="tab" data-target="" type="button"> 
                                <span class="thumb"> 
                                    <img src="${product.image2}" /> 
                                </span> 
                            </button> 
                        </div>

                        <div class="nav-item" role="presentation"> 
                            <button class="nav-link" data-toggle="tab" data-target="" type="button"> 
                                <span class="thumb"> 
                                    <img src="${product.image3}" /> 
                                </span> 
                            </button> 
                        </div> 
                    </div> 
                </div> 
            </div> 

            <div class="col-8"> 
                <div class="pl-4"> 
                    <p class="color-primary-bold font-bold text-3xl">${product.name}</p> 
                    <p class="w-32 p-1 bg-green-primary  rounded-md mt-2"></p> 
                    <div class="rating"> 
                        ${star} 
                    </div> 
                    <div class="py-2"> 
                        <p class="font-bold">Giá cũ: <label class="old-price pl-4" for="">${product.oldPrice}đ</label></p> 
                        <p class="font-bold">Giá mới: <label class="new-price pl-4" for="">${product.price}đ</label></p> 
                    </div> 
                    <div class="my-2 flex quantity-btn"> 
                        <div class="btn-item cursor-pointer" id="button-minus" onclick="minusQuantity()">-</div> 
                        <input type="number"  
                            name="quantity"  
                            min="1"  
                            id="quantity"  
                            value="1"  
                            style="background-color: #F0F7D4;">
                        <div class="btn-item cursor-pointer" id="button-plus" onclick="plusQuantity()">+</div> 
                    </div> 
 
                    <h1 class="color-primary-bold text-2xl font-bold py-2 ">Mô tả</h1> 
                    <p class="color-primary-bold text-xl pr-8"> 
                        ${product.descripton} 
                    </p> 
                    <div class="py-4"> 
                        <div class="flex py-2"> 
                            <img src="Images/svg/24/tick.svg" alt=""> 
                            <p class="font-bold pl-4 pr-1">Loại sản phẩm: </p> 
                            <p> ${product.categoryName}</p> 
                        </div> 

                        <div class="flex py-2"> 
                            <img src="Images/svg/24/tick.svg" alt=""> 
                            <p class="font-bold pl-4 pr-1">Phí giao hàng: </p> 
                            <p> Free</p> 
                        </div> 

                        <div class="flex py-2"> 
                            <img src="Images/svg/24/tick.svg" alt=""> 
                            <p class="font-bold pl-4 pr-1">Thương hiệu: </p> 
                            <p> ${product.brand}</p> 
                        </div> 
                    </div>
 
                    <div class="flex items-center"> 
                        <img style="height:50px;width:50px" src="Images/svg/cartW.svg" onclick="addToCart(${product.id})" /> 
                        <div class="button-custom ml-8">MUA NGAY</div> 
                    </div> 
                </div> 
            </div> 
        </div>`; 

    //SP liên quan  
    let listSPLQ = products.filter(p => p.brand == product.brand || p.idCategory == product.idCategory && p.id != product.id); 
    if (listSPLQ.length > 4) { 
        listSPLQ = listSPLQ.slice(0, 4); 
    } 

    const SPlienQuan = listSPLQ.map((item, index) => { 
        let star = ''; 
        for (let index = 0; index < 5; index++) { 
            if (index <= item.vote) { 
                star += `<i class="fa fa-star"></i> `; 
            } else { 
                star += `<i class="fa fa-star-o" aria-hidden="true"></i> `; 
            } 
        }
        return `<div class="col-3 relative" > 
                    <a href="TrangChiTietSanPham.html?id=${item.id}"> 
                        <img src='${item.image}' /> 
                        <h4 class="py-2"> 
                            ${item.name} 
                        </h4> 
                    </a> 
                    <div> 
                        <div class="py-2">${star}</div> 
                        <p class="py-1">${numberWithCommas(item.price)}đ</p> 
                    </div> 
                    <img src='Images/svg/50/cart.svg' class="pr-2 cart-icon absolute top-28 right-2" /> 
                    <img src='Images/svg/50/zoom.svg' class="pr-2 cart-icon absolute top-10 right-2" /> 
                </div>`; 
    }).join(" "); 

    $("#productDetail").html(sanPhamchiTiet); 

    $("#productLQ").html(SPlienQuan); 
 
}); 


