// Simulação de uma base de dados em memória
export interface Post {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}

class Database {
  private posts: Post[] = [
    {
      id: '1',
      title: 'Bem-vindo ao Blog',
      content: 'Este é um exemplo de blog usando Next.js com cache tags para melhor performance.',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
  ];

  async getPosts(): Promise<Post[]> {
    await new Promise(resolve => setTimeout(resolve, 500));
    return [...this.posts].sort((a, b) => 
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  }

  async getPostById(id: string): Promise<Post | null> {
    await new Promise(resolve => setTimeout(resolve, 300));
    return this.posts.find(post => post.id === id) || null;
  }

  async createPost(title: string, content: string): Promise<Post> {
    const post: Post = {
      id: String(Date.now()),
      title,
      content,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    this.posts.push(post);
    return post;
  }

  async updatePost(id: string, title: string, content: string): Promise<Post | null> {
    const postIndex = this.posts.findIndex(post => post.id === id);
    if (postIndex === -1) return null;

    const updatedPost: Post = {
      ...this.posts[postIndex],
      title,
      content,
      updatedAt: new Date().toISOString()
    };

    this.posts[postIndex] = updatedPost;
    return updatedPost;
  }

  async deletePost(id: string): Promise<boolean> {
    const initialLength = this.posts.length;
    this.posts = this.posts.filter(post => post.id !== id);
    return this.posts.length !== initialLength;
  }
}

// Exportando uma única instância para simular um banco de dados
export const db = new Database(); 