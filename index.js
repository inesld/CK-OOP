import { Product, CartItem, ShoppingCart } from './class.js';

document.addEventListener('DOMContentLoaded', () => {
    const cart = new ShoppingCart();

    // Ajouter des articles au panier
    cart.addProduct(new Product(1, "Glace", 10));
    cart.addProduct(new Product(2, "Shoes", 20));
    cart.addProduct(new Product(3, "PC", 30));

    // Conteneur pour les articles du panier
    const cartContainer = document.getElementById('cart-items');
    // Élément HTML pour afficher le prix total
    const totalPriceDiv = document.getElementById("total-price");

    // Fonction pour afficher les articles du panier
    function afficheArticles() {
        if (cartContainer) {
            cartContainer.innerHTML = cart.displayItems(); // Utiliser la méthode displayItems de ShoppingCart
        }
        updateTotalPrice();
    }

    // Fonction pour mettre à jour le prix total
    function updateTotalPrice() {
        let totalPrice = 0;
        cart.items.forEach(item => {
            totalPrice += item.getTotalPrice();
        });
        if (totalPriceDiv) {
            totalPriceDiv.textContent = totalPrice || 0;
        }
    }

    // Ajouter des gestionnaires d'événements pour les boutons
    cartContainer?.addEventListener('click', function (event) {
        const target = event.target;
        const itemId = target.getAttribute('data-id');
        const item = cart.items.find(item => item.product.id == itemId);

        if (item) {
            if (target.classList.contains('plus-btn')) {
                // Si le bouton + est cliqué, augmenter la quantité
                item.increaseQuantity();
            } else if (target.classList.contains('minus-btn')) {
                // Si le bouton - est cliqué, diminuer la quantité
                item.decreaseQuantity();
            } else if (target.classList.contains('delete-btn')) {
                // Si le bouton cliqué est supprimer, supprimer l'article (produit) du panier
                cart.removeProduct(itemId);
            } else if (target.classList.contains('like-button')) {
                // Si le bouton cliqué est like, changer l'attribut isLiked
                item.product.isLiked = !item.product.isLiked;
            }

            afficheArticles(); // Réafficher les articles
        }
    });

    afficheArticles(); // Afficher les articles au chargement de la page
});