// Khởi tạo một mảng để lưu trữ các sản phẩm trong giỏ hàng
var cartItems = [];

// Lấy tất cả các nút "Đặt hàng" và thêm sự kiện click
const buttons = document.querySelectorAll("button");

buttons.forEach(function (button, index) {
  button.addEventListener("click", function (event) {
    var btnItem = event.target;
    var product = btnItem.parentElement;
    var productImg = product.querySelector("img").src;
    var productName = product.querySelector("h5").innerText;
    var productPrice = parseFloat(product.querySelector("span").innerText);

    // Gọi hàm kiểm tra sản phẩm đã tồn tại trong giỏ hàng hay chưa
    var isProductInCart = checkIfProductInCart(productName);

    if (!isProductInCart) {
      // Nếu sản phẩm chưa tồn tại trong giỏ hàng, thêm vào danh sách và giỏ hàng
      cartItems.push({ name: productName, price: productPrice });
      addcart(productImg, productName, productPrice);
    } else {
      // Nếu sản phẩm đã tồn tại trong giỏ hàng, thông báo lỗi
      alert("Sản phẩm này đã có trong giỏ hàng của bạn");
    }
  });
});

function checkIfProductInCart(productName) {
  // Kiểm tra xem sản phẩm có trong danh sách giỏ hàng không
  for (var i = 0; i < cartItems.length; i++) {
    if (cartItems[i].name === productName) {
      return true; // Sản phẩm đã tồn tại trong giỏ hàng
    }
  }
  return false; // Sản phẩm chưa tồn tại trong giỏ hàng
}

// Hàm để thêm sản phẩm vào giỏ hàng
function addcart(productImg, productName, productPrice) {
  // Tạo dòng mới trong bảng giỏ hàng
  var addtr = document.createElement("tr");

  // Tạo nội dung cho dòng mới
  var trcontent = `
    <td style="display: flex;align-items: center;"><img style="width: 70px;" src="${productImg}" alt="${productName}"></td>
    <td>${productPrice.toLocaleString('de-DE')}đ</td>
    <td><input style="width: 30px;outline: none;" type="number" value="1" min="1" ></td>
    <td><button class="delete-button" style="cursor: pointer;">Xóa</button></td>
  `;

  // Gán nội dung cho dòng mới
  addtr.innerHTML = trcontent;

  // Lấy bảng giỏ hàng
  var cartTable = document.querySelector("tbody");

  // Thêm dòng mới vào bảng giỏ hàng
  cartTable.appendChild(addtr);

  // Gọi hàm tính tổng tiền sau khi thêm sản phẩm
  carttotal();

  // Gọi hàm xóa sản phẩm khi nút "Xóa" được nhấp
  addDeleteProductEvent(addtr);
}
 //4. Thực hiện chức năng nút đặt hàng. Hiển thị Thông tin sản phẩm
 const cart = JSON.parse(localStorage.getItem('cart')) || [];
 const addToCart = (productID) =>{
   const product = getProductId(productID);
   if(product){
     const quantityProduct = cart.find((item) => item.id === productID);
     if(quantityProduct){
        quantityProduct.quantity ++;
     }
     else{
       product.quantity = 1;
       cart.push(product);
     }
     saveCartToLocalStorage();
     displayCart();
   }
 }
 const getProductId = (productId) => {
   const product1 = new Product(1, ' Ô Long Dâu Đà Lạt', 'images/sp8.jpg', 52);
 
   if (product1.id === productId) {
     return product1;
   }
 }
 const displayCart = () => {
   const cartItems = document.getElementById('cart-qty');
   cartItems.innerHTML = '';
   cart.forEach((product) => {
     const listItem = document.createElement('cart-qty');
     listItem.textContent = ` ${product.quantity}`;
     cartItems.appendChild(listItem);
   });
 }
 
 function saveCartToLocalStorage() {
   localStorage.setItem('cart', JSON.stringify(cart));
 }
 // Hiển thị thông tin giỏ hàng khi trang được tải lại
 displayCart();

// ----------------------Tổng tiền---------------------//
function carttotal() {
  // Lấy tất cả các hàng trong bảng giỏ hàng
  var cartItem = document.querySelectorAll("tbody tr");
  var totalC = 0; // Khởi tạo biến tổng tiền ban đầu

  // Duyệt qua từng hàng trong giỏ hàng
  for (var i = 0; i < cartItem.length; i++) {
    // Lấy giá trị số lượng sản phẩm từ ô input
    var inputValue = parseFloat(cartItem[i].querySelector("input").value);

    // Lấy giá sản phẩm từ ô giá và chuyển thành số dạng float
    var productPriceText = cartItem[i].querySelector("td:nth-child(2)").innerText;
    // Loại bỏ ký tự 'đ' và khoảng trắng, sau đó chuyển thành số
    var productPrice = parseFloat(productPriceText.replace('đ', '').trim());

    // Tính tổng tiền cho sản phẩm hiện tại và cộng vào tổng tiền
    totalA = inputValue * productPrice;
    totalC = totalC + totalA;
  }

  // Định dạng tổng tiền với đủ 2 số sau dấu thập phân và sử dụng dấu phân cách hàng nghìn
  var formattedTotal = totalC.toFixed(3).replace(/\d(?=(\d{3})+\.)/g, '$&,') + "đ";

  // Lấy phần tử span để hiển thị tổng tiền và cập nhật nó
  var carttotalA = document.querySelector(".total span");
  carttotalA.innerHTML = formattedTotal;
}

// ----------------------XÓA-CART---------------------//
function addDeleteProductEvent(addtr) {
  // Lấy nút "Xóa" trong dòng sản phẩm được thêm mới
  var cartDeleteButton = addtr.querySelector(".delete-button");

  // Thêm sự kiện click vào nút "Xóa"
  cartDeleteButton.addEventListener("click", function (event) {
    // Lấy hàng giỏ hàng chứa nút "Xóa"
    var cartItemRow = event.target.parentElement.parentElement;

    // Xóa hàng giỏ hàng khỏi bảng giỏ hàng
    cartItemRow.remove();

    // Sau khi xóa sản phẩm, gọi lại hàm tính tổng tiền để cập nhật tổng tiền
    carttotal();
  });
}
// ///////////////////////////////////





// ----------------------------------------JavaScript để tạo slideshow
var slideIndex = 0;
showSlides();

function showSlides() {
  var i;
  var slides = document.getElementsByClassName("mySlides");
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  slideIndex++;
  if (slideIndex > slides.length) {
    slideIndex = 1;
  }
  slides[slideIndex - 1].style.display = "block";
  setTimeout(showSlides, 2000); // Thay đổi hình sau 2 giây
}
const cartbtn = document.querySelector(".fa-times")
const cartshow = document.querySelector(".fa-shopping-cart")
cartshow.addEventListener("click",function(){
  document.querySelector(".cart").style.right ="0"
})
cartbtn.addEventListener("click",function(){
  document.querySelector(".cart").style.right ="-100%"
})

   
//-------------------------------------------------- Lấy nút thanh toán
const payButton = document.querySelector(".thanhtoan");

// Lấy phần tử hiển thị thông tin thanh toán
const paymentInfo = document.querySelector(".payment-info");

// Gắn sự kiện click cho nút thanh toán
payButton.addEventListener("click", function () {
    // Hiển thị hoặc ẩn phần tử thông tin thanh toán tùy thuộc vào trạng thái hiện tại
    if (paymentInfo.style.display === "none" || paymentInfo.style.display === "") {
        paymentInfo.style.display = "block"; // Hiển thị phần tử
    } else {
        paymentInfo.style.display = "none"; // Ẩn phần tử
    }
});

// Xử lý sự kiện thanh toán (điều này cần được cài đặt dựa trên hệ thống thanh toán của bạn)
const payButtonInsideInfo = paymentInfo.querySelector(".pay-button");
payButtonInsideInfo.addEventListener("click", function () {
    // Đây là nơi bạn có thể thêm xử lý thanh toán thực tế
    // Ví dụ: gửi thông tin thanh toán đến máy chủ hoặc cổng thanh toán của bạn

    // Sau khi thanh toán thành công, bạn có thể thực hiện các hành động sau:
    
    // 1. Gửi dữ liệu thông tin thanh toán lên máy chủ và xử lý nó ở phía máy chủ.
    // 2. Cập nhật giao diện người dùng hoặc hiển thị thông báo thanh toán thành công.
    alert("Thanh toán thành công!"); // Hiển thị thông báo thanh toán thành công
    window.location.href = "index.html"; // Tải lại trang chủ sau khi thanh toán thành công
});
// --------------------------------------------------seachProduct
