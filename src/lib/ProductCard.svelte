<script lang="ts">
  export let product: { name: string; price: string; image: string };
</script>

<div class="product-card">
  <img src={product.image} alt={product.name} />
  <h3>{product.name}</h3>
  <p>{product.price}</p>
  <button>Agregar al carrito</button>
</div>

<style>
  .product-card {
    border-radius: 12px;
    padding: 1.5rem;
    text-align: center;
    background: linear-gradient(145deg, #1e1e1e, #121212);
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5), 0 2px 10px rgba(0, 0, 0, 0.2);
    transition: transform 0.3s, box-shadow 0.3s;
  }

  .product-card:hover {
    transform: translateY(-10px);
    box-shadow: 0 20px 40px rgba(138, 43, 226, 0.3), 0 5px 15px rgba(0, 255, 255, 0.2);
  }

  img {
    max-width: 100%;
    height: auto;
    border-radius: 8px;
  }

  button {
    font-family: 'Poppins', sans-serif;
    font-weight: 600;
    background: linear-gradient(90deg, #8A2BE2, #4169E1);
    color: #fff;
    border: none;
    padding: 0.75rem 1.5rem;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.3s;
    box-shadow: 0 4px 15px rgba(138, 43, 226, 0.4);
  }

  button:hover {
    background: linear-gradient(90deg, #9370DB, #00FFFF);
    box-shadow: 0 6px 20px rgba(0, 255, 255, 0.4);
    transform: translateY(-2px);
  }
</style>
