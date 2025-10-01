<script lang="ts">
  import { onMount } from 'svelte';
  import { auth } from './lib/firebase';
  import { onAuthStateChanged } from 'firebase/auth';
  import { authUser } from './lib/stores/authStore';

  import Navbar from './lib/Navbar.svelte';
  import ProductCard from './lib/ProductCard.svelte';
  import Footer from './lib/Footer.svelte';
  import AuthModal from './lib/AuthModal.svelte';

  const products = [
    {
      name: 'Gorra Negra',
      price: '$25',
      image: 'https://via.placeholder.com/300x300.png?text=Gorra+Negra',
    },
    {
      name: 'Gorra Blanca',
      price: '$25',
      image: 'https://via.placeholder.com/300x300.png?text=Gorra+Blanca',
    },
    {
      name: 'Gorra Roja',
      price: '$25',
      image: 'https://via.placeholder.com/300x300.png?text=Gorra+Roja',
    },
    {
      name: 'Gorra Azul',
      price: '$25',
      image: 'https://via.placeholder.com/300x300.png?text=Gorra+Azul',
    },
    {
      name: 'Gorra Verde',
      price: '$25',
      image: 'https://via.placeholder.com/300x300.png?text=Gorra+Verde',
    },
    {
      name: 'Gorra Amarilla',
      price: '$25',
      image: 'https://via.placeholder.com/300x300.png?text=Gorra+Amarilla',
    },
  ];

  onMount(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      authUser.set(user);
    });
    return unsubscribe;
  });
</script>

<main>
  <Navbar />
  <AuthModal />
  <div class="product-grid">
    {#each products as product}
      <ProductCard {product} />
    {/each}
  </div>
  <Footer />
</main>

<style>
  main {
    padding-bottom: 5rem; /* Space for the footer */
  }
  .product-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 1rem;
    padding: 1rem;
  }
</style>
