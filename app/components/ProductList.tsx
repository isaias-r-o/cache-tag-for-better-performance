import { unstable_cache } from 'next/cache';

async function getProducts(categoryId?: string) {
  // Simulando uma chamada à API
  const products = [
    { id: 1, name: 'Produto 1', categoryId: '1' },
    { id: 2, name: 'Produto 2', categoryId: '1' },
    { id: 3, name: 'Produto 3', categoryId: '2' },
  ];

  if (categoryId) {
    return products.filter(p => p.categoryId === categoryId);
  }
  
  return products;
}

const getCachedProducts = unstable_cache(
  async (categoryId?: string) => getProducts(categoryId),
  ['products-list'],
  {
    tags: ['products'],
    revalidate: 3600 // 1 hora
  }
);

export default async function ProductList({ categoryId }: { categoryId?: string }) {
  const products = await getCachedProducts(categoryId);

  return (
    <div className="grid gap-4">
      <h2 className="text-2xl font-bold">Produtos</h2>
      <div className="grid gap-2">
        {products.map((product) => (
          <div key={product.id} className="p-4 border rounded">
            <h3>{product.name}</h3>
          </div>
        ))}
      </div>
    </div>
  );
} 