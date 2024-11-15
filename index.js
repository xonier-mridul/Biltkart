const bannerInput = document.getElementById("banner-input-id");
const bannerDropdown = document.getElementById("search-dropdown");
const invisibleOverlay = document.getElementById("invisible-overlay-id");

bannerInput.addEventListener("input", function () {
  if (this.value !== "") {
    bannerDropdown.classList.add("banner-search-dropdown-show");
    invisibleOverlay.classList.add("invisible-overlay-show");
  } else {
    bannerDropdown.classList.remove("banner-search-dropdown-show");
    invisibleOverlay.classList.remove("invisible-overlay-show");
  }
});

const overlayHide = () => {
  bannerDropdown.classList.remove("banner-search-dropdown-show");
  invisibleOverlay.classList.remove("invisible-overlay-show");
  
};

invisibleOverlay.addEventListener("click", overlayHide);

const categoriesOptions = document.querySelectorAll(".categories-option");

categoriesOptions.forEach((e) => {
  e.addEventListener("click", () => {
    bannerInput.value = e.innerText;
  });
});

// ------------------------- Product API Fetching -----------------------------

const loadProducts = async() =>{
  try {
    let api = "products.json"
    let aa = await fetch(api)
    let products = await aa.json()
    return products
  } catch (error) {
    console.log("product api error". error)
  }
}

function filterProducts(products, query) {
  return products.filter(product =>
    product.Products.toLowerCase().includes(query.toLowerCase())
  );
}

function displayResults(filteredProducts) {
  const resultsContainer = document.getElementById('resultsContainer');  
  resultsContainer.innerHTML = ''; 
 

  if(filteredProducts.length === 0){
    resultsContainer.textContent = "Nothing found";
   return
  }
 
  filteredProducts.forEach(product => {
    const productElement = document.createElement('div');
    productElement.classList = "categories-option"
    productElement.textContent = `${product.Products}`;
    resultsContainer.appendChild(productElement);
 
  });
}

bannerInput.addEventListener('input', async (event) => {
  const query = event.target.value;
  const products = await loadProducts();
  const filteredProducts = filterProducts(products, query);
  displayResults(filteredProducts);
});


// ------------------------- Product API Fetching End-----------------------------

// <-----------------------------SIGN UP POPUP ----------------------------------->

const signUpPopup = document.querySelector(".signIn-popup");
const signUpBtn = document.getElementById("signup-btn");
const signUpClose = document.getElementById("signup-popup-close");
const visibleOverlay = document.querySelector(".visible-overlay");

signUpBtn.addEventListener("click", () => {
  signUpPopup.classList.add("signIn-popup-show");
  visibleOverlay.classList.add("visible-overlay-show");
});

signUpClose.style.cursor = "pointer";

signUpClose.addEventListener("click", () => {
  signUpPopup.classList.remove("signIn-popup-show");
  visibleOverlay.classList.remove("visible-overlay-show");
});

visibleOverlay.addEventListener("click", () => {
  signUpPopup.classList.remove("signIn-popup-show");
  visibleOverlay.classList.remove("visible-overlay-show");
});

// <-------------------------SIGN UP POPUP END ------------------------>

//-------------------------- SEARCH SUBMIT START --------------------------

const searchSubmit = document.getElementById("search-inputs");
const searchSub = () => {
  const searchQuery = bannerInput.value;

  window.location.href =
    "buildkart/index.html?query=" + encodeURIComponent(searchQuery);
};

searchSubmit.addEventListener("click", searchSub);

bannerInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") return searchSub();
});

//-------------------------- SEARCH SUBMIT END --------------------------
// ------------------------ INDEPENDENT CARAOUSAL START ------------------------

const caraousal = document.getElementById("caraousal");
const card = document.querySelectorAll(".card");
const cardLength = card.length;

let count = 1;
const slider = () => {
  if (cardLength > count + 5) {
    caraousal.style.transform = `translatex(-${count * 213}px)`;
    count++;
  } else {
    caraousal.style.transform = `translatex(0px)`;
    count = 1;
  }
};

setInterval(() => {
  slider();
}, 3000);

// ------------------------ INDEPENDENT CARAOUSAL END ------------------------

// ------------------- CHAT BOT START----------------------

const botBox = document.getElementById("bot");
const botOpenBtn = document.getElementById("botOpenBtn");

const OpenBot = () => {
  botBox.classList.toggle("chatbot-show");
  invisibleOverlay.classList.toggle("invisible-overlay-show");
};

const CloseBot = () => {
  botBox.classList.remove("chatbot-show");
  invisibleOverlay.classList.remove("invisible-overlay-show");
};

botOpenBtn.addEventListener("click", OpenBot);
invisibleOverlay.addEventListener("click", CloseBot);

// ------------------- CHAT BOT APPEARANCE END----------------------

// ---------------------- APPEND DATE START-----------------------

const chatDate = document.getElementById("chatDate");
const hour = new Date().getHours();
const minut = new Date().getMinutes();

const hours = hour < 10 ? "0" + hour : hour;
const minuts = minut < 10 ? "0" + minut : minut;

const ampm = hours < 12 ? "am" : "pm";

const timeadd = () => {
  chatDate.append(`We'll return today at  ${hours}:${minuts} ${ampm} `);
};

timeadd();

// ---------------------- APPEND DATE START-----------------------

const bottext = document.getElementById("bottext");
const botscreen = document.getElementById("botscreen");
const sendBtn = document.getElementById("sendtext");

const SendMessage = () => {
  let messageText = bottext.value;
  const newHour = new Date().getHours();

  const newMinut = new Date().getMinutes();

  const newHours = newHour < 10 ? "0" + newHour : newHour;
  const newMinuts = newMinut < 10 ? "0" + newMinut : newMinut;

  const messageTime = ` ${newHours}:${newMinuts} ${ampm}`;

  if (messageText === "") {
    return;
  }

  let span = document.createElement("span");
  span.classList = "admin";
  span.innerText = messageText;
  span.append(messageTime);
  botscreen.appendChild(span);
  bottext.value = "";
  botscreen.scrollTop = botscreen.scrollHeight;
  const botscreenchild = botscreen.childNodes.length;
  if(botscreenchild > 0){
    setTimeout(()=>{
      let res = document.createElement("span")
      res.classList = "res"
      res.innerText = "How can I help you..."
      res.append(messageTime)
      botscreen.appendChild(res)
      botscreen.scrollTop = botscreen.scrollHeight;
    },1000)
  }
};

bottext.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    SendMessage();
  }
});

sendBtn.style.cursor = "pointer";
sendBtn.addEventListener("click", SendMessage);

// ------------- BUTTON DISABLE FUNCTION ----------------

const form = document.getElementById('myForm');
const submitBtn = document.getElementById('submitBtn');

form.addEventListener('input', () => {
  const isFormValid = form.checkValidity();
  submitBtn.disabled = !isFormValid;
});



// ------------------------------- XXXXXXXXXXXXXXXXXXXXXXXXXXXX ----------------------------




