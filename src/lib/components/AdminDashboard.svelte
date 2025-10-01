<script lang="ts">
  import { db } from "../firebase";
  import { collection, addDoc, serverTimestamp } from "firebase/firestore";

  let name = "";
  let description = "";
  let price: number | null = null;
  let imageUrl = "";
  let quantity: number | null = null;

  let isLoading = false;
  let successMessage = "";
  let errorMessage = "";

  async function addProduct() {
    if (!name || !description || !price || !imageUrl || quantity === null) {
      errorMessage = "Todos los campos son obligatorios.";
      return;
    }

    isLoading = true;
    errorMessage = "";
    successMessage = "";

    try {
      const productsCollection = collection(db, "products");
      await addDoc(productsCollection, {
        name,
        description,
        price,
        imageUrl,
        quantity,
        createdAt: serverTimestamp(),
      });

      successMessage = "¡Producto añadido con éxito!";
      // Limpiar formulario
      name = "";
      description = "";
      price = null;
      imageUrl = "";
      quantity = null;
    } catch (error) {
      console.error("Error al añadir el producto: ", error);
      errorMessage = "Hubo un error al añadir el producto. Inténtalo de nuevo.";
    } finally {
      isLoading = false;
    }
  }
</script>

<section class="admin-dashboard">
  <h2>Panel de Administrador</h2>
  <p>Añade nuevos productos al catálogo.</p>

  <form on:submit|preventDefault={addProduct}>
    <div class="form-group">
      <label for="name">Nombre del Producto</label>
      <input type="text" id="name" bind:value={name} placeholder="Ej: Gorra Suede Negra" required />
    </div>
    <div class="form-group">
      <label for="description">Descripción</label>
      <textarea id="description" bind:value={description} rows="4" placeholder="Una descripción atractiva del producto." required></textarea>
    </div>
    <div class="form-group-row">
        <div class="form-group">
            <label for="price">Precio (USD)</label>
            <input type="number" id="price" bind:value={price} placeholder="Ej: 29.99" min="0" step="0.01" required />
        </div>
        <div class="form-group">
            <label for="quantity">Cantidad en Stock</label>
            <input type="number" id="quantity" bind:value={quantity} placeholder="Ej: 50" min="0" required />
        </div>
    </div>
    <div class="form-group">
      <label for="imageUrl">URL de la Imagen</label>
      <input type="url" id="imageUrl" bind:value={imageUrl} placeholder="https://ejemplo.com/imagen.jpg" required />
    </div>

    <button type="submit" class="submit-btn" disabled={isLoading}>
      {#if isLoading}Cargando...{:else}Añadir Producto{/if}
    </button>

    {#if successMessage}
      <p class="feedback success">{successMessage}</p>
    {/if}
    {#if errorMessage}
      <p class="feedback error">{errorMessage}</p>
    {/if}
  </form>
</section>

<style>
  .admin-dashboard {
    max-width: 600px;
    margin: 2rem auto;
    padding: 2rem;
    background-color: #1a1a1a;
    border-radius: 12px;
    box-shadow: 0 10px 30px rgba(0,0,0,0.5);
    color: #e0e0e0;
  }

  h2 {
    text-align: center;
    color: #a78bfa; /* Violeta */
    margin-bottom: 0.5rem;
  }

  .admin-dashboard > p {
    text-align: center;
    margin-bottom: 2rem;
    color: #888;
  }

  .form-group {
    margin-bottom: 1.5rem;
  }

  .form-group-row {
      display: flex;
      gap: 1rem;
  }

  .form-group-row .form-group {
      flex: 1;
  }

  label {
    display: block;
    margin-bottom: 0.5rem;
    font-weight: 500;
    color: #ccc;
  }

  input, textarea {
    width: 100%;
    padding: 0.75rem 1rem;
    background-color: #2c2c2c;
    border: 1px solid #444;
    border-radius: 8px;
    color: #e0e0e0;
    font-family: inherit;
    font-size: 1rem;
    transition: border-color 0.3s, box-shadow 0.3s;
  }

  input:focus, textarea:focus {
    outline: none;
    border-color: #a78bfa;
    box-shadow: 0 0 0 3px rgba(167, 139, 250, 0.3);
  }

  .submit-btn {
    width: 100%;
    padding: 0.8rem 1.5rem;
    background-image: linear-gradient(to right, #8b5cf6, #a78bfa);
    color: white;
    border: none;
    border-radius: 8px;
    font-size: 1.1rem;
    font-weight: 600;
    cursor: pointer;
    transition: transform 0.2s, box-shadow 0.2s;
  }

  .submit-btn:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 4px 20px rgba(167, 139, 250, 0.4);
  }

  .submit-btn:disabled {
    background-image: none;
    background-color: #444;
    cursor: not-allowed;
  }

  .feedback {
    margin-top: 1rem;
    text-align: center;
    padding: 0.75rem;
    border-radius: 8px;
  }

  .success {
    background-color: rgba(52, 211, 153, 0.1);
    color: #34d399;
  }

  .error {
    background-color: rgba(248, 113, 113, 0.1);
    color: #f87171;
  }
</style>
