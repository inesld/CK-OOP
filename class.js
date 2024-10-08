

//***********************Question 1***********************
// Classe représentant un produit avec un ID, un nom, un prix, une quantité et un état de "j'aime"
class Product {
    constructor(id, name, price) {
        this.id = id;         // ID unique du produit
        this.name = name;     // Nom du produit
        this.price = price;   // Prix du produit
        this.quantity = 0;    // Quantité du produit initialisée à 0
        this.isLiked = false; // État "j'aime" initialisé à false
    }
}


//*****************************question numero 2*************************
// Classe représentant un article dans le panier, qui est un produit avec une quantité
class CartItem {
    // Le constructeur initialise un objet CartItem avec un produit et une quantité.
    constructor(product, quantity = 1) {
        this.product = product; // Stocke l'objet Product associé à cet article du panier
        this.quantity = quantity; // Initialise la quantité du produit dans le panier (par défaut à 0)
    }
     //******************************Question 3:*********************************
    // Méthode pour obtenir le prix total pour cet article dans le panier
    getTotalPrice() {
        return this.product.price * this.quantity; // Multiplie le prix du produit par la quantité pour obtenir le total
    }

    // Méthode pour augmenter la quantité de l'article dans le panier de 1
    increaseQuantity() {
        this.quantity += 1; // Incrémente la quantité de 1
    }

    // Méthode pour diminuer la quantité de l'article dans le panier de 1, s'il y en a au moins un
    decreaseQuantity() {
        if (this.quantity > 0) { // Vérifie que la quantité est supérieure à 0
            this.quantity -= 1; // Décrémente la quantité de 1
        }
    }
}
//******************************************question 4****************************** :
// Classe représentant un panier d'achats
class ShoppingCart {
    constructor() {
        this.items = []; // Tableau pour stocker les instances de CartItem
    }

    // Méthode pour ajouter un produit au panier (ou augmenter sa quantité s'il est déjà présent)
    addProduct(product, quantity = 1) {
        const existingItem = this.items.find(item => item.product.id === product.id);
        if (existingItem) {
            existingItem.quantity += quantity; // Augmente la quantité si le produit est déjà présent
        } else {
            const newItem = new CartItem(product, quantity);
            this.items.push(newItem); // Ajoute un nouvel article au panier
        }
    }

    // Méthode pour supprimer un produit du panier
    removeProduct(productId) {
       

         this.items = this.items.filter(item => item.product.id != productId); // Filtre les articles pour exclure celui à supprimer
          
         }
 
    // Méthode pour obtenir le total des articles dans le panier
    getTotalQuantity() {
        return this.items.reduce((total, item) => total + item.quantity, 0); // Somme des quantités des articles
    }

    // Méthode pour afficher les articles du panier en HTML
    displayItems() {
        return this.items.map(item => `
            <div class="card">
               <div class="card-body">
                   <div class="row">
                      <div class="col-md-4">${item.product.name}</div>
                      <div class="col-md-2">${item.product.price} DT</div>
                      <div class="col-md-2">
                       <button class="btn btn-danger btn-sm minus-btn" data-id="${item.product.id}">
                        -
                       </button>
                        <span class="quantity">${item.quantity}</span>
                        <button class="btn btn-secondary btn-sm plus-btn" data-id="${item.product.id}">
                        +
                       </button>
                      </div>

                      <div class="col-md-2">
                       <button class="btn btn-danger btn-sm delete-btn" data-id="${item.product.id}">
                       Supprimer
                       </button>
                      </div>

                      <div class="col-md-2">
        
                      </div>
                   </div>
                </div>
            </div>
        `).join(''); // Concatène les chaînes pour créer un HTML complet
    }
}

// Export des classes pour les utiliser dans d'autres fichiers
export { Product, CartItem, ShoppingCart };
