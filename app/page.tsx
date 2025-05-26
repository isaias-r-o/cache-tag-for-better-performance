import CreatePostForm from './components/CreatePostForm';
import Posts from './components/Posts';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-gray-900">Blog com Cache Tags</h1>
          <p className="mt-2 text-gray-600">Um exemplo de blog usando Next.js com cache tags para melhor performance</p>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="grid gap-8 md:grid-cols-[350px_1fr] lg:grid-cols-[400px_1fr]">
          <aside className="bg-white p-6 rounded-lg shadow-sm h-fit">
            <h2 className="text-xl font-semibold mb-4">Criar Novo Post</h2>
            <CreatePostForm />
          </aside>

          <section>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-semibold text-gray-900">Posts Recentes</h2>
            </div>
            <Posts />
          </section>
        </div>
      </main>

      <footer className="mt-16 bg-white border-t border-gray-200">
        <div className="container mx-auto px-4 py-6">
          <p className="text-center text-gray-600">
            Exemplo de implementação de cache tags no Next.js 15
          </p>
        </div>
      </footer>
    </div>
  );
}
