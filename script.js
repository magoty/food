// const user = {
//   name: "John",
//   surname: "Smith",
//   get fullName() {
//     return `${this.name}-${this.surname}`
//   },
//   set fullName(val) {
//     let arr = val.split('-')
//     this.name = arr[0];
//     this.surname = arr[1];
//   }

// }

// console.log(user);

// user.fullName = 'Вася-Пуркин'

// console.log(user);

const products = {
  plainBurger: {
    name: "Гамбургер простой",
    cost: 10000,
    kcall: 250,
    amount: 0,
    get summ() {
      return this.cost * this.amount;
    },
    get sumKcall() {
      return this.kcall * this.amount;
    },
  },
  freshBurger: {
    name: "Гамбургер FRESH",
    cost: 20500,
    kcall: 350,
    amount: 0,
    get summ() {
      return this.cost * this.amount;
    },
    get sumKcall() {
      return this.kcall * this.amount;
    },
  },
  freshCombo: {
    name: "FRESH COMBO",
    cost: 31900,
    kcall: 450,
    amount: 0,
    get summ() {
      return this.cost * this.amount;
    },
    get sumKcall() {
      return this.kcall * this.amount;
    },
  },
};

const extraProducts = {
  doubleMayonnaise: {
    name: "Двойной майонез",
    cost: 2000,
    kcall: 50,
  },
  lettuce: {
    name: "Салатный лист",
    cost: 1000,
    kcall: 10,
  },
  cheese: {
    name: "Сыр",
    cost: 5000,
    kcall: 30,
  },
};

const btns = document.querySelectorAll(".main__product-btn");

btns.forEach((el) => {
  el.addEventListener("click", function (event) {
    event.preventDefault();
    add(this);
  });
});

function add(btn) {
  const symbol = btn.getAttribute("data-symbol");
  const parent = btn.closest(".main__product");
  const parentId = parent.getAttribute("id");

  if (symbol == "+") {
    products[parentId].amount++;
  } else if (products[parentId].amount > 0) {
    products[parentId].amount--;
  }

  const output = parent.querySelector(".main__product-num");
  const productPrice = parent.querySelector(".main__product-price span");
  const productKcall = parent.querySelector(".main__product-kcall span");

  output.innerHTML = products[parentId].amount;
  productPrice.innerHTML = products[parentId].summ;
  productKcall.innerHTML = products[parentId].sumKcall;
}

const checkbox = document.querySelectorAll(".main__product-checkbox");

checkbox.forEach((el) => {
  el.addEventListener("click", function () {
    addIngredient(this);
  });
});

function addIngredient(check) {
  const parent = check.closest(".main__product");
  const parentId = parent.getAttribute("id");
  const checkId = check.getAttribute("data-extra");
  const checked = check.checked;

  products[parentId][checkId] = checked;

  if (products[parentId][checkId] === true) {
    products[parentId].cost += extraProducts[checkId].cost;
    products[parentId].kcall += extraProducts[checkId].kcall;
  } else {
    products[parentId].cost -= extraProducts[checkId].cost;
    products[parentId].kcall -= extraProducts[checkId].kcall;
  }

  const spanCost = parent.querySelector(".main__product-price span");
  const spanKcall = parent.querySelector(".main__product-kcall span");

  spanCost.innerHTML = products[parentId].summ;
  spanKcall.innerHTML = products[parentId].sumKcall;
}

const receipt = document.querySelector(".receipt");
const receiptWindow = document.querySelector(".receipt__window");
const receiptWindowOut = document.querySelector(".receipt__window-out");
const receiptWindowBtn = document.querySelector(".receipt__window-btn");
const addCart = document.querySelector(".addCart");

const arrProduct = [];
let totalName = "";
let totalPrice = 9000;
let totalKcall = 0;

addCart.addEventListener("click", () => {
  for (const key in products) {
    const el = products[key];

    if (el.amount > 0) {
      arrProduct.push(el);

      for (const key2 in el) {
        if (el[key2] === true) {
          el.name += "\n" + extraProducts[key2].name;
        }
      }
    }
  }

  arrProduct.forEach((el) => {
    totalName += "\n" + el.name + `\nВ количестве: ${el.amount} шт. \n`;
    totalPrice += el.summ;
    totalKcall += el.sumKcall;
  });

  receiptWindowOut.innerHTML = `Вы заказали:\n${totalName}\nОбщая каллорийность: ${totalKcall}\nОбщая стоимость (c доставкой в 9000 т.): ${totalPrice} сумм`;

  if (arrProduct.length > 0) {
    receipt.style.display = "flex";

    setTimeout(() => {
      receipt.style.opacity = 1;
      receiptWindow.style.top = "25%";
    }, 100);

    document.body.style.overflow = "hidden";

    const output = document.querySelectorAll(".main__product-num");
    const spanPrice = document.querySelectorAll(".main__product-price span");
    const spanKcall = document.querySelectorAll(".main__product-kcall span");

    output.forEach((el, i) => {
      el.innerHTML = 0;
      spanPrice[i].innerHTML = 0;
      spanKcall[i].innerHTML = 0;
    });
  }
});

receiptWindowBtn.addEventListener("click", () => {
  window.location.reload();
});

const level = document.querySelector(".header__timer-extra");

function animateLevel(value, speed) {
  level.innerHTML = value++;
  if (value <= 50) {
    setTimeout(() => {
      animateLevel(value, speed);
    }, speed);
  } else if (value <= 100) {
    setTimeout(() => {
      animateLevel(value, speed + 10);
    }, value);
  }
}

animateLevel(0, 50);

const product = document.querySelectorAll(".main__product-title");
const view = document.querySelector(".view");
const closeBtn = document.querySelector(".view__close");

product.forEach((product) => {
  product.addEventListener("dblclick", (event) => {
    event.preventDefault();
    const parent = product.getAttribute("id");

    console.log(product);

    view.classList.add("active");

    closeBtn.addEventListener("click", () => {
      view.classList.remove("active");
    });

    for (const key in products) {
      if (parent === key) {
        closeBtn.nextElementSibling.setAttribute("src", products[key].image);
      }
    }
  });
});
