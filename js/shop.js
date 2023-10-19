// Khai báo biến productCard trước khi sử dụng
let productCard = [];

// // Lưu trữ productCard dưới dạng chuỗi JSON
let jsonString = JSON.stringify(productCard);
localStorage.setItem('productCard', jsonString);

// Lấy chuỗi JSON từ localStorage
let storedData = localStorage.getItem('productCard');

// Chuyển chuỗi JSON thành mảng productCard
productCard = JSON.parse(storedData);

// // Các hàm khác không thay đổi

// Hàm tải danh sách sản phẩm ban đầu
fetch('http://localhost:4100/products')
    .then((res) => res.json())
    .then((products) => {
        let html = '';
        products.forEach((product) => {
            html += `
                <div class="product" id="product${product.id}">
                    <img src="images/${product.img}" alt="Sản phẩm ${product.id}">
                    <h5>${product.name}</h5>
                    <p>Giá: <span>${product.price}</span> <sup>đ</sup></p>
                    <button onclick="addCart(${product.id})" id="addCart_${product.id}" class="bt">Đặt hàng</button>
                </div>
            `;
        });
        document.getElementById('products').innerHTML = html;
    })
    .catch((error) => {
        console.error('Đã xảy ra lỗi:', error);
    });


// Hàm lấy thông tin sản phẩm theo ID
const getProductById = (id) => {
    const products = [
        { id: 1, name: 'Ô Long Chôm Chôm', img: './images/sp1.jpg', price: 20000 },
        { id: 2, name: 'Ô Long Đỏ Đamb’ri', img: './images/sp2.jpg', price: 40000 },
        { id: 3, name: 'Ô Long Trứng Nướng', img: './images/sp3.png', price: 25000 },
        { id: 4, name: 'Ô long B’lao sữa', img: './images/sp4.png', price: 15000 },
        { id: 5, name: 'Ô Long Chanh Vàng', img: './images/sp5.png', price: 30000 },
        { id: 6, name: 'Ô Long Dâu Đà Lạt', img: './images/sp6.png', price: 40000 },
        { id: 7, name: 'Ô Long Chôm Chôm', img: './images/sp7jpg', price: 15000 },
        { id: 8, name: 'Ô Long Mãng Cầu', img: './images/sp8.jpg', price: 50000 },
    ];
    return products.find(product => product.id === id);
};

// Hàm tính tổng giá trị giỏ hàng
const calculateTotal = () => {
    let total = 0;
    productCard.forEach((productId) => {
        const product = getProductById(productId);
        total += product.price;
    });
    return total;
};

// Hàm xóa sản phẩm khỏi giỏ hàng và cập nhật giao diện
const removeFromCart = (id) => {
    const index = productCard.indexOf(id);
    if (index > -1) {
        productCard.splice(index, 1);
        renderCart();
    }
};

// Hàm thêm sản phẩm vào giỏ hàng
const addCart = (id) => {
    if (!productCard.includes(id)) {
        productCard.push(id);
        renderCart();
    }
};

// Hàm render giỏ hàng và tổng tiền
const renderCart = () => {
    let cartHtml = '';
    productCard.forEach((productId) => {
        const product = getProductById(productId);

        cartHtml += `
            <tr>
                <td>${product.name}</td>
                <td>${product.price}</td>
                <td><img src="${product.img}" alt="${product.name}" style="width: 50px; height: 50px;"></td>
                <td>1</td>
                <td><button onclick="removeFromCart(${product.id})" class="removeButton">Xóa</button></td>
            </tr>
        `;
    });
    const total = calculateTotal(); // tính tổng giá trị giỏ hàng
    const totalHtml = `<div>Tổng tiền: ${total} đ</div>`;

    document.getElementById('renderAddCart').innerHTML = cartHtml;
    document.getElementById('total').innerHTML = totalHtml; // Thêm tổng tiền vào trang HTML
};


// Hàm tải danh sách sản phẩm ban đầu
fetch('http://localhost:4100/products')
    .then((res) => res.json())
    .then((products) => {
        let html = '';
        products.forEach((product) => {
            html += `
                <div class="product" id="product${product.id}">
                    <img src="images/${product.img}" alt="Sản phẩm ${product.id}">
                    <h5>${product.name}</h5>
                    <p>Giá: <span>${product.price}</span> <sup>đ</sup></p>
                    <button onclick="addCart(${product.id})" id="addCart_${product.id}" class="bt">Đặt hàng</button>
                </div>
            `;
        });
        document.getElementById('products').innerHTML = html;
    })
    .catch((error) => {
        console.error('Đã xảy ra lỗi:', error);
    });
