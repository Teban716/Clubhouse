<script lang="ts">
  import { db } from "../firebase";
  import { collection, onSnapshot, query, orderBy, doc, deleteDoc, type DocumentData } from "firebase/firestore";
  import { onMount } from "svelte";
  import { authStore } from "../stores/authStore";

  let products: DocumentData[] = [];
  let isLoading = true;

  async function deleteProduct(productId: string) {
    if (!confirm("¿Estás seguro de que quieres eliminar este producto? Esta acción no se puede deshacer.")) {
      return;
    }

    try {
      const productDocRef = doc(db, "products", productId);
      await deleteDoc(productDocRef);
    } catch (error) {
      console.error("Error al eliminar el producto: ", error);
      alert("Hubo un error al eliminar el producto. Por favor, inténtalo de nuevo.");
    }
  }

  onMount(() => {
    const productsCollection = collection(db, "products");
    const q = query(productsCollection, orderBy("createdAt", "desc"));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      products = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      isLoading = false;
    }, (error) => {
      console.error("Error al obtener los productos: ", error);
      isLoading = false;
    });

    return () => unsubscribe();
  });
</script>

<section class="product-list-container">
  <div class="header">
    <h1>Nuestra Colección</h1>
    <p>Gorras exclusivas, calidad inigualable.</p>
  </div>

  {#if isLoading}
    <p class="loading-text">Cargando productos...</p>
  {/if}

  {#if products.length === 0 && !isLoading}
    <p class="empty-text">Aún no hay productos en la tienda. ¡Vuelve pronto!</p>
  {/if}

  <div class="product-grid">
    {#each products as product (product.id)}
      <div class="product-card" class:disabled={product.quantity === 0}>
        {#if $authStore.isAdmin}
          <button class="delete-button" on:click={() => deleteProduct(product.id)} title="Eliminar producto">
            &times;
          </button>
        {/if}
        <div class="image-container">
          <img src={product.imageUrl} alt={product.name} />
        </div>
        <div class="card-content">
          <h3>{product.name}</h3>
          <p class="description">{product.description}</p>
          <div class="price-stock-row">
            <p class="price">${product.price.toFixed(2)}</p>
            {#if product.quantity === 0}
                <span class="stock-status out-of-stock">Agotado</span>
            {:else if product.quantity > 0 && product.quantity <= 5}
                <span class="stock-status low-stock">¡Últimas {product.quantity} unid.!</span>
            {:else}
                <span class="stock-status in-stock">{product.quantity} disponibles</span>
            {/if}
          </div>
        </div>
      </div>
    {/each}
  </div>
</section>

<style>
  .product-list-container {
    max-width: 1200px;
    margin: 2rem auto;
    padding: 0 1.5rem;
  }

  .header {
    text-align: center;
    margin-bottom: 3rem;
  }

  .header h1 {
    font-size: 2.8rem;
    font-weight: 700;
    color: #e0e0e0;
    margin-bottom: 0.5rem;
    letter-spacing: -1px;
  }

  .header p {
    font-size: 1.2rem;
    color: #888;
  }

  .loading-text, .empty-text {
    text-align: center;
    font-size: 1.2rem;
    color: #888;
    padding: 4rem 0;
  }

  .product-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 2rem;
  }

  .product-card {
    position: relative;
    background-color: #1c1c1c;
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0 8px 25px rgba(0,0,0,0.5);
    transition: transform 0.3s ease, box-shadow 0.3s ease, opacity 0.3s;
  }
  
  .product-card.disabled {
      opacity: 0.6;
  }

  .product-card.disabled .image-container::after {
    content: 'Agotado';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0,0,0,0.5);
    color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1.5rem;
    font-weight: bold;
    z-index: 1;
  }

  .product-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 12px 35px rgba(0,0,0,0.6);
  }

  .delete-button {
    position: absolute;
    top: 0.75rem;
    right: 0.75rem;
    background-color: #c81e1e;
    color: white;
    border: none;
    border-radius: 50%;
    width: 2.25rem;
    height: 2.25rem;
    font-size: 1.5rem;
    font-weight: bold;
    line-height: 1;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 10;
    opacity: 0;
    transform: scale(0.8);
    transition: all 0.2s ease-in-out;
  }

  .product-card:hover .delete-button {
      opacity: 0.9;
      transform: scale(1);
  }

  .delete-button:hover {
      opacity: 1;
      background-color: #ff3b3b;
      box-shadow: 0 0 10px rgba(255, 59, 59, 0.7);
  }

  .image-container {
    width: 100%;
    aspect-ratio: 1 / 1;
    overflow: hidden;
    position: relative;
  }

  .image-container img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.4s ease;
  }

  .product-card:hover .image-container img {
    transform: scale(1.05);
  }

  .card-content {
    padding: 1.5rem;
  }

  .card-content h3 {
    font-size: 1.3rem;
    font-weight: 600;
    color: #a78bfa;
    margin: 0 0 0.75rem 0;
  }

  .description {
    color: #aaa;
    font-size: 0.95rem;
    line-height: 1.5;
    margin-bottom: 1rem;
    height: 4.5em; /* Limit to 3 lines */
    overflow: hidden;
  }
  
  .price-stock-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
  }

  .price {
    font-size: 1.5rem;
    font-weight: 700;
    color: #34d399;
  }
  
  .stock-status {
      font-size: 0.9rem;
      font-weight: 500;
      padding: 0.25rem 0.6rem;
      border-radius: 12px;
  }
  
  .in-stock {
      color: #888;
  }
  
  .low-stock {
      background-color: #fef3c7;
      color: #b45309;
  }
  
  .out-of-stock {
      background-color: #fee2e2;
      color: #b91c1c;
  }
</style>
