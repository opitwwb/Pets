import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Bell, TrendingDown, Search, DollarSign, Heart, Star, ShoppingCart } from 'lucide-react';

const mockProducts = [
  {
    id: '1',
    title: 'Bravecto® Cães - Antipulgas e Carrapatos',
    price: 131.44,
    oldPrice: 165.00,
    image: 'https://images.unsplash.com/photo-1600077106724-946750eeaf3c?w=800&q=80',
    discount: 20,
    category: 'Medicamentos',
    rating: 4.8
  },
  {
    id: '2',
    title: 'Tapete Higiênico Premium para cães',
    price: 52.78,
    oldPrice: 68.90,
    image: 'https://images.unsplash.com/photo-1583511655826-05700d62f82d?w=800&q=80',
    discount: 23,
    category: 'Higiene',
    rating: 4.6
  },
  {
    id: '3',
    title: 'GoldeN Gourmet Gatos Filhotes sabor Frango',
    price: 2.69,
    oldPrice: 3.50,
    image: 'https://images.unsplash.com/photo-1574158622682-e40e69881006?w=800&q=80',
    discount: 23,
    category: 'Alimentação',
    rating: 4.9
  },
  {
    id: '4',
    title: 'NexGard Antipulgas e Carrapatos para Cães',
    price: 64.72,
    oldPrice: 89.90,
    image: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=800&q=80',
    discount: 28,
    category: 'Medicamentos',
    rating: 4.7
  },
  {
    id: '5',
    title: 'Coleira Seresto Antipulgas - Grande Porte',
    price: 135.05,
    oldPrice: 178.90,
    image: 'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=800&q=80',
    discount: 25,
    category: 'Medicamentos',
    rating: 4.9
  },
  {
    id: '6',
    title: 'Ração Royal Canin Mini Adult 7.5kg',
    price: 189.90,
    oldPrice: 249.90,
    image: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=800&q=80',
    discount: 24,
    category: 'Alimentação',
    rating: 4.8
  }
];

const priceHistoryData = [
  { date: 'Nov', price: 165 },
  { date: 'Dez 1', price: 158 },
  { date: 'Dez 8', price: 145 },
  { date: 'Dez 15', price: 142 },
  { date: 'Dez 22', price: 131 }
];

const testimonials = [
  {
    name: 'Maria Silva',
    pet: 'Luna (Golden Retriever)',
    image: 'https://images.unsplash.com/photo-1633722715463-d30f4f325e24?w=400&q=80',
    text: 'Economizei mais de R$ 200 em 3 meses! Os alertas são perfeitos.'
  },
  {
    name: 'João Santos',
    pet: 'Mingau (Gato)',
    image: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=400&q=80',
    text: 'Nunca mais paguei preço cheio. O site é sensacional!'
  },
  {
    name: 'Ana Costa',
    pet: 'Thor (Labrador)',
    image: 'https://images.unsplash.com/photo-1552053831-71594a27632d?w=400&q=80',
    text: 'Recomendo para todos os tutores. Facilita demais a vida!'
  }
];

const ProductCard = ({ product }: { product: typeof mockProducts[0] }) => (
  <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 group">
    <div className="relative overflow-hidden">
      <img 
        src={product.image} 
        alt={product.title}
        className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-500"
      />
      {product.discount && (
        <div className="absolute top-3 right-3 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg animate-pulse">
          -{product.discount}%
        </div>
      )}
      <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold text-gray-700">
        {product.category}
      </div>
      <button className="absolute bottom-3 right-3 bg-white/90 backdrop-blur-sm p-2 rounded-full opacity-0 group-hover:opacity-100 transition-all hover:bg-red-50">
        <Heart size={18} className="text-red-500" />
      </button>
    </div>
    <div className="p-5">
      <div className="flex items-center gap-1 mb-2">
        {[...Array(5)].map((_, i) => (
          <Star 
            key={i} 
            size={14} 
            className={i < Math.floor(product.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}
          />
        ))}
        <span className="text-xs text-gray-500 ml-1">({product.rating})</span>
      </div>
      
      <h3 className="text-sm font-semibold text-gray-800 mb-3 line-clamp-2 h-10 group-hover:text-orange-600 transition-colors">
        {product.title}
      </h3>
      
      <div className="flex items-baseline gap-2 mb-4">
        {product.oldPrice && (
          <p className="text-sm text-gray-400 line-through">
            R$ {product.oldPrice.toFixed(2)}
          </p>
        )}
        <p className="text-2xl font-bold text-green-600">
          R$ {product.price.toFixed(2)}
        </p>
      </div>
      
      <div className="flex gap-2">
        <button className="flex-1 bg-gradient-to-r from-orange-500 to-orange-600 text-white py-2.5 px-4 rounded-lg hover:from-orange-600 hover:to-orange-700 transition-all font-semibold text-sm flex items-center justify-center gap-2 shadow-md hover:shadow-lg">
          <ShoppingCart size={16} />
          Ver Oferta
        </button>
        <button className="bg-blue-50 text-blue-600 p-2.5 rounded-lg hover:bg-blue-100 transition-all">
          <Bell size={18} />
        </button>
      </div>
    </div>
  </div>
);

export default function OpitwebHomepage() {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-orange-50">
      {/* Header */}
      <header className="bg-white shadow-md sticky top-0 z-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-orange-600 rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-2xl">🐾</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-orange-500 bg-clip-text text-transparent">OpitWeb</h1>
                <p className="text-xs text-gray-500">Economize nas compras pet</p>
              </div>
            </div>
            <nav className="hidden md:flex gap-6">
              <a href="#" className="text-gray-600 hover:text-orange-600 transition-colors font-medium">Home</a>
              <a href="#" className="text-gray-600 hover:text-orange-600 transition-colors font-medium">Ofertas</a>
              <a href="#" className="text-gray-600 hover:text-orange-600 transition-colors font-medium">Blog</a>
              <a href="#" className="text-gray-600 hover:text-orange-600 transition-colors font-medium">Contato</a>
            </nav>
            <button className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-6 py-2.5 rounded-lg hover:from-orange-600 hover:to-orange-700 transition-all font-semibold shadow-md hover:shadow-lg">
              Entrar
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section com Pet Background */}
      <section className="relative overflow-hidden py-20 bg-gradient-to-br from-orange-500 to-orange-600">
        <div className="absolute inset-0 opacity-10">
          <img 
            src="https://images.unsplash.com/photo-1450778869180-41d0601e046e?w=1920&q=80" 
            alt="Pets felizes"
            className="w-full h-full object-cover"
          />
        </div>
        
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="text-white">
              <h2 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
                Cuide do seu pet <br/>gastando <span className="text-yellow-300">menos!</span>
              </h2>
              <p className="text-xl mb-8 text-orange-50">
                Rastreie preços na Amazon e receba alertas quando seus produtos favoritos entrarem em promoção. 100% gratuito! 🐶🐱
              </p>
              
              <div className="relative mb-6">
                <input
                  type="text"
                  placeholder="Cole o link do produto ou busque por nome..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-6 py-4 pr-14 rounded-full border-0 focus:ring-4 focus:ring-yellow-300 shadow-2xl text-lg text-gray-800"
                />
                <button className="absolute right-2 top-1/2 -translate-y-1/2 bg-orange-600 text-white p-3 rounded-full hover:bg-orange-700 transition-all shadow-lg">
                  <Search size={22} />
                </button>
              </div>
              
              <div className="flex items-center gap-4 text-orange-50">
                <div className="flex -space-x-3">
                  <img src="https://images.unsplash.com/photo-1633722715463-d30f4f325e24?w=100" className="w-10 h-10 rounded-full border-2 border-white" alt="User" />
                  <img src="https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=100" className="w-10 h-10 rounded-full border-2 border-white" alt="User" />
                  <img src="https://images.unsplash.com/photo-1552053831-71594a27632d?w=100" className="w-10 h-10 rounded-full border-2 border-white" alt="User" />
                </div>
                <p className="text-sm"><strong>+5.000 tutores</strong> já economizaram com a gente!</p>
              </div>
            </div>
            
            <div className="hidden md:block">
              <img 
                src="https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=800&q=80" 
                alt="Cachorro feliz"
                className="rounded-3xl shadow-2xl transform rotate-2 hover:rotate-0 transition-transform duration-300"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features com Ícones de Pets */}
      <section className="max-w-7xl mx-auto px-4 -mt-10 relative z-20 mb-16">
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white p-8 rounded-2xl shadow-xl text-center transform hover:scale-105 transition-all border-t-4 border-blue-500">
            <div className="bg-blue-100 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-4 text-4xl">
              📊
            </div>
            <h3 className="text-xl font-bold mb-3">Histórico de Preços</h3>
            <p className="text-gray-600">Gráficos completos para você ver quando é a melhor hora de comprar</p>
          </div>
          
          <div className="bg-white p-8 rounded-2xl shadow-xl text-center transform hover:scale-105 transition-all border-t-4 border-green-500">
            <div className="bg-green-100 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-4 text-4xl">
              🔔
            </div>
            <h3 className="text-xl font-bold mb-3">Alertas Inteligentes</h3>
            <p className="text-gray-600">Receba email quando o preço do produto que você quer cair</p>
          </div>
          
          <div className="bg-white p-8 rounded-2xl shadow-xl text-center transform hover:scale-105 transition-all border-t-4 border-orange-500">
            <div className="bg-orange-100 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-4 text-4xl">
              💰
            </div>
            <h3 className="text-xl font-bold mb-3">100% Gratuito</h3>
            <p className="text-gray-600">Sem taxas, sem mensalidades. Economize de verdade!</p>
          </div>
        </div>
      </section>

      {/* Seção com Pets Felizes */}
      <section className="max-w-7xl mx-auto px-4 py-12 mb-16">
        <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-3xl overflow-hidden shadow-2xl">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="p-12 text-white">
              <h2 className="text-4xl font-bold mb-4">Pets felizes, tutores economizando! 🎉</h2>
              <p className="text-xl mb-6 text-purple-50">
                Mais de R$ 500.000 economizados por nossos usuários nos últimos 6 meses
              </p>
              <ul className="space-y-3 mb-6">
                <li className="flex items-center gap-3">
                  <div className="bg-white/20 p-1 rounded-full">✅</div>
                  <span>Alertas automáticos por email</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="bg-white/20 p-1 rounded-full">✅</div>
                  <span>Gráficos de histórico de preços</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="bg-white/20 p-1 rounded-full">✅</div>
                  <span>Milhares de produtos rastreados</span>
                </li>
              </ul>
              <button className="bg-white text-purple-600 px-8 py-4 rounded-xl font-bold text-lg hover:bg-purple-50 transition-all shadow-lg">
                Começar a Economizar Agora
              </button>
            </div>
            <div className="h-full">
              <img 
                src="https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=800&q=80" 
                alt="Cachorro sorrindo"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Price History Demo */}
      <section className="max-w-7xl mx-auto px-4 py-12 mb-16">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="flex items-center gap-3 mb-6">
            <img 
              src="https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=200&q=80" 
              alt="Produto"
              className="w-20 h-20 rounded-xl object-cover"
            />
            <div>
              <h3 className="text-2xl font-bold">Exemplo: Bravecto® Antipulgas</h3>
              <p className="text-gray-600">Acompanhe como o preço varia ao longo do tempo</p>
            </div>
          </div>
          
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={priceHistoryData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="date" stroke="#666" />
              <YAxis stroke="#666" />
              <Tooltip 
                formatter={(value: number) => `R$ ${value.toFixed(2)}`}
                contentStyle={{ 
                  backgroundColor: '#fff', 
                  border: '2px solid #f97316', 
                  borderRadius: '12px',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                }}
              />
              <Line 
                type="monotone" 
                dataKey="price" 
                stroke="#f97316" 
                strokeWidth={4}
                dot={{ fill: '#f97316', r: 6 }}
                activeDot={{ r: 8 }}
              />
            </LineChart>
          </ResponsiveContainer>
          
          <div className="mt-6 grid grid-cols-3 gap-4">
            <div className="bg-red-50 p-5 rounded-xl border-2 border-red-200">
              <p className="text-sm text-gray-600 mb-1">Preço mais alto</p>
              <p className="text-2xl font-bold text-red-600">R$ 165,00</p>
            </div>
            <div className="bg-green-50 p-5 rounded-xl border-2 border-green-200">
              <p className="text-sm text-gray-600 mb-1">Preço atual</p>
              <p className="text-2xl font-bold text-green-600">R$ 131,44</p>
            </div>
            <div className="bg-orange-50 p-5 rounded-xl border-2 border-orange-200">
              <p className="text-sm text-gray-600 mb-1">Você economiza</p>
              <p className="text-2xl font-bold text-orange-600">20% 🎉</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Deals */}
      <section className="max-w-7xl mx-auto px-4 py-12 mb-16">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-4xl font-bold text-gray-800 mb-2">🔥 Ofertas Imperdíveis</h2>
            <p className="text-gray-600">Produtos com os melhores descontos agora!</p>
          </div>
          <button className="text-orange-600 font-semibold hover:text-orange-700 flex items-center gap-2">
            Ver todas as ofertas →
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Testimonials com Pets */}
      <section className="max-w-7xl mx-auto px-4 py-12 mb-16">
        <h2 className="text-4xl font-bold text-center mb-4">O que os tutores falam 💬</h2>
        <p className="text-center text-gray-600 mb-12">Junte-se a milhares de pessoas que já economizam com a OpitWeb</p>
        
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all">
              <div className="flex items-center gap-4 mb-4">
                <img 
                  src={testimonial.image} 
                  alt={testimonial.pet}
                  className="w-16 h-16 rounded-full object-cover border-4 border-orange-200"
                />
                <div>
                  <h4 className="font-bold text-gray-800">{testimonial.name}</h4>
                  <p className="text-sm text-gray-500">{testimonial.pet}</p>
                </div>
              </div>
              <div className="flex gap-1 mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={16} className="fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <p className="text-gray-700 italic">"{testimonial.text}"</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section com Pet */}
      <section className="max-w-7xl mx-auto px-4 py-16 mb-16">
        <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-3xl overflow-hidden shadow-2xl">
          <div className="grid md:grid-cols-2 gap-0">
            <div className="p-12 text-white flex flex-col justify-center">
              <h2 className="text-4xl md:text-5xl font-bold mb-4">Pronto para economizar?</h2>
              <p className="text-xl mb-8 text-orange-50">
                Cadastre-se gratuitamente e comece a monitorar os preços dos produtos que seu pet adora!
              </p>
              <div className="space-y-4 mb-8">
                <div className="flex items-center gap-3">
                  <div className="bg-white/20 p-2 rounded-full">✨</div>
                  <span className="text-lg">Sem taxas escondidas</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="bg-white/20 p-2 rounded-full">⚡</div>
                  <span className="text-lg">Alertas em tempo real</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="bg-white/20 p-2 rounded-full">🎯</div>
                  <span className="text-lg">Cancelamento a qualquer momento</span>
                </div>
              </div>
              <button className="bg-white text-orange-600 px-8 py-4 rounded-xl font-bold text-lg hover:bg-orange-50 transition-all transform hover:scale-105 shadow-xl w-fit">
                Criar Conta Gratuita →
              </button>
            </div>
            <div className="h-full min-h-[400px]">
              <img 
                src="https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=800&q=80" 
                alt="Cachorro e gato juntos"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-orange-400 to-orange-600 rounded-lg flex items-center justify-center">
                  <span className="text-xl">🐾</span>
                </div>
                <h3 className="font-bold text-xl">OpitWeb</h3>
              </div>
              <p className="text-gray-400 text-sm mb-4">
                Seu assistente inteligente para economizar nas compras pet da Amazon.
              </p>
              <div className="flex gap-3">
                <a href="#" className="bg-gray-800 p-2 rounded-lg hover:bg-gray-700 transition-colors">
                  <span className="text-xl">📘</span>
                </a>
                <a href="#" className="bg-gray-800 p-2 rounded-lg hover:bg-gray-700 transition-colors">
                  <span className="text-xl">📸</span>
                </a>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4 text-lg">Links Rápidos</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Como funciona</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Blog Pet</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Extensão Chrome</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Ofertas do dia</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4 text-lg">Suporte</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">FAQ</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contato</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Termos de Uso</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Privacidade</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4 text-lg">Contato</h4>
              <p className="text-sm text-gray-400 mb-2">
                📧 contato@opitweb.com.br
              </p>
              <p className="text-sm text-gray-400 mb-2">
                📱 (11) 96101-7230
              </p>
              <p className="text-sm text-gray-400">
                📍 Santana - São Paulo, SP
              </p>
            </div>
          </div>
          
          <div className="border-t border-gray-800 pt-8 text-center text-sm text-gray-400">
            <p className="mb-2">
              © 2024 Opitweb. Todos os direitos reservados. Feito com ❤️ para tutores de pets.
            </p>
            <p className="text-xs">
              Como Associado da Amazon, ganhamos com compras qualificadas. Os preços podem variar.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
