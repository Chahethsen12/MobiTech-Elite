
import React from 'react';

const Documentation: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <header className="mb-12 border-b border-slate-200 pb-8">
        <h1 className="text-4xl font-black text-slate-900 mb-4">MERN Stack Architecture</h1>
        <p className="text-xl text-slate-600">The Blueprint for an Industry-Level Mobile E-commerce System.</p>
      </header>

      <section className="space-y-12">
        <div>
          <h2 className="text-2xl font-bold text-blue-600 mb-6 flex items-center">
            <span className="w-8 h-8 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center mr-3 text-sm">1</span>
            System Architecture
          </h2>
          <div className="bg-slate-900 p-8 rounded-3xl text-slate-300 font-mono text-sm leading-relaxed overflow-x-auto">
            <pre>{`
[ CLIENT LAYER ]
- React 18+ (Frontend)
- Tailwind CSS (Styling)
- Context API (State Management)
- Gemini API (AI Assistant)

      |  (HTTPS/WSS)
      V

[ API GATEWAY / SERVER LAYER ]
- Node.js & Express.js
- JWT (Authentication)
- Socket.io (Real-time Live Chat)
- Sharp (Image Processing)
- Redis (Caching - Optional)

      |
      V

[ DATA PERSISTENCE LAYER ]
- MongoDB Atlas (NoSQL Cloud)
- Mongoose (ODM)
- GridFS (Large Assets Storage)
            `}</pre>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-blue-600 mb-6 flex items-center">
            <span className="w-8 h-8 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center mr-3 text-sm">2</span>
            Database Schema (MongoDB)
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
              <h3 className="font-bold mb-3 text-slate-900">User Schema</h3>
              <ul className="text-sm space-y-2 text-slate-600">
                <li><code className="bg-slate-100 px-1">name: String</code></li>
                <li><code className="bg-slate-100 px-1">email: String (Unique)</code></li>
                <li><code className="bg-slate-100 px-1">password: String (Hashed)</code></li>
                <li><code className="bg-slate-100 px-1">role: ['customer', 'admin']</code></li>
                <li><code className="bg-slate-100 px-1">addresses: [Object]</code></li>
              </ul>
            </div>
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
              <h3 className="font-bold mb-3 text-slate-900">Product Schema</h3>
              <ul className="text-sm space-y-2 text-slate-600">
                <li><code className="bg-slate-100 px-1">sku: String</code></li>
                <li><code className="bg-slate-100 px-1">name: String</code></li>
                <li><code className="bg-slate-100 px-1">price: Number</code></li>
                <li><code className="bg-slate-100 px-1">stock: Number</code></li>
                <li><code className="bg-slate-100 px-1">specs: Mixed</code></li>
              </ul>
            </div>
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
              <h3 className="font-bold mb-3 text-slate-900">Order Schema</h3>
              <ul className="text-sm space-y-2 text-slate-600">
                <li><code className="bg-slate-100 px-1">userId: ObjectId</code></li>
                <li><code className="bg-slate-100 px-1">items: [ObjectId]</code></li>
                <li><code className="bg-slate-100 px-1">total: Number</code></li>
                <li><code className="bg-slate-100 px-1">status: ['Pending', 'Shipped', ...]</code></li>
              </ul>
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-blue-600 mb-6 flex items-center">
            <span className="w-8 h-8 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center mr-3 text-sm">3</span>
            Backend API Routes
          </h2>
          <div className="space-y-4">
            {[
              { method: 'POST', path: '/api/auth/register', desc: 'Create a new user account' },
              { method: 'GET', path: '/api/products', desc: 'Fetch catalog with filters & pagination' },
              { method: 'POST', path: '/api/orders', desc: 'Secure checkout (Protected)' },
              { method: 'PUT', path: '/api/admin/inventory', desc: 'Update stock levels (Admin only)' },
            ].map((route, i) => (
              <div key={i} className="flex items-center justify-between p-4 bg-white rounded-xl border border-slate-200 shadow-sm">
                <div className="flex items-center space-x-4">
                  <span className={`px-2 py-1 rounded text-[10px] font-bold ${
                    route.method === 'POST' ? 'bg-green-100 text-green-700' : 
                    route.method === 'GET' ? 'bg-blue-100 text-blue-700' : 'bg-amber-100 text-amber-700'
                  }`}>
                    {route.method}
                  </span>
                  <code className="text-xs font-bold text-slate-900">{route.path}</code>
                </div>
                <span className="text-xs text-slate-500">{route.desc}</span>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-blue-600 mb-6 flex items-center">
            <span className="w-8 h-8 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center mr-3 text-sm">4</span>
            Industrial Features & Deployment
          </h2>
          <div className="bg-blue-50 border border-blue-100 rounded-[2rem] p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h4 className="font-bold text-blue-900 mb-3">Key Features</h4>
                <ul className="text-sm space-y-3 text-blue-800">
                  <li><i className="fas fa-check-circle mr-2"></i> JWT Token Refresh Strategy</li>
                  <li><i className="fas fa-check-circle mr-2"></i> Real-time Stock Sync via Sockets</li>
                  <li><i className="fas fa-check-circle mr-2"></i> WhatsApp Click-to-Chat CRM</li>
                  <li><i className="fas fa-check-circle mr-2"></i> AI Assistant with Grounding</li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold text-blue-900 mb-3">Deployment Strategy</h4>
                <ul className="text-sm space-y-3 text-blue-800">
                  <li><i className="fas fa-cloud-arrow-up mr-2"></i> Vercel (Frontend Hosting)</li>
                  <li><i className="fas fa-server mr-2"></i> DigitalOcean/AWS (Backend)</li>
                  <li><i className="fas fa-database mr-2"></i> MongoDB Atlas (DB Cluster)</li>
                  <li><i className="fas fa-code-merge mr-2"></i> GitHub Actions (CI/CD)</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Documentation;
