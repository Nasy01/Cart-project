/* Declaration of variables from the span class and ADD TO CART class*/

const cart = document.querySelector("span");
const product = document.querySelectorAll(".cart");
const proContainer = document.querySelector(".cart-products");

/* We create a javascript object, i.e JSON to convert an object to string and back to an objct */

let products = [
    {
        proName: "Black shoe",
        tagName: "black",
        price: 15,
        inCart: 0
    },
    
    {
        proName: "Yellow Shoe",
        tagName: "Yellow",
        price: 20,
        inCart: 0
    },
    
    {
        proName: "White shoe",
        tagName: "White",
        price: 25,
        inCart: 0
    },
    
    {
        proName: "Pink shoe",
        tagName: "Pink",
        price: 30,
        inCart: 0
    }
    
    ]

/* Create a for... loop to loop through the Array */

for(let i = 0; i < product.length; i++) {
    product[i].addEventListener("click", function() {
        addNumberToCart(products[i]);
    })
}

/* We create a function that increment the number at the cart and we call it at the addEventListener function */

function addNumberToCart(product) {
    let number = localStorage.getItem("cartNumber");
    number = parseInt(number);
    
    if(number) {
        localStorage.setItem("cartNumber", number + 1);
        cart.textContent = number + 1;
    } else {
        localStorage.setItem("cartNumber", 1);
        cart.textContent = 1;
    }
    setProduct(product);
    costTotal(product); 
}

/* We create a function that can track the exact product on the Cart */

function setProduct(product) {
    let cartItem = localStorage.getItem("product");
    cartItem = JSON.parse(cartItem);
    
    if(cartItem != null) {
        if(cartItem[product.tagName] == undefined) {
            cartItem = {
                ...cartItem,
                [product.tagName]:product
            }
        }
        cartItem[product.tagName].inCart += 1;
    } else {
        product.inCart = 1;
        cartItem = {
            [product.tagName]:product
        }
    }
    localStorage.setItem("product", JSON.stringify(cartItem));
}

/* We ceate a function to calculate the total product cost */

function costTotal(product) {
    let costTotal = localStorage.getItem("costTotal");
    
    if(costTotal != null) {
        costTotal = parseInt(costTotal);
        localStorage.setItem("costTotal", costTotal + product.price);
    } else {
        localStorage.setItem("costTotal", product.price);
    }
}

/* We create a function onloadScreen */

function onloadScreen() {
    let number = localStorage.getItem("cartNumber");
    number = parseInt(number);
    
    if(number) {
        cart.textContent = number;
    }
}

// function to display product on the Cart page //

function displayProduct() {
	let productItems = localStorage.getItem("product");
	productItems = JSON.parse(productItems);
	
	if (productItems && proContainer) {
		proContainer.innerHTML = "";
		
		Object.values(productItems).map(item => {
			proContainer.innerHTML += `
				<div class="product">
					<i class='bx bx-x-circle'></i>
					<img src="./img/${item.tagName}.jpg">
                    <span>${item.proName}</span>
                    </div>
                    <div class="price">$${item.price}.00</div>
                    <div class="quantity">
                    <i class='bx bx-minus'></i>
                    <span>${item.inCart}</span>
                    <i class='bx bx-plus'></i>
                    </div>
                    <div class="total">$${item.inCart * item.price}.00</div>` 
		})
        let TOTAL = localStorage.getItem("costTotal");
        proContainer.innerHTML +=`<div class"totalcost">
                                  <h4 class="total">
                                  TOTAL
                                  </h4>
                                  <h4 class="cost">$${TOTAL}.00</h4>
                                  </div>`
	}
	
}

displayProduct()
onloadScreen();