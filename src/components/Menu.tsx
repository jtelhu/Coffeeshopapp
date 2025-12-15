import { useState } from 'react';
import { DrinkItem } from '../App';
import { Search } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface MenuProps {
  onDrinkSelect: (drink: DrinkItem) => void;
}

const menuItems: DrinkItem[] = [
  {
    id: '1',
    name: 'Caramel Macchiato',
    category: 'Espresso',
    price: 4.95,
    image: 'https://images.unsplash.com/photo-1604298458655-ae6e04213678?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXJhbWVsJTIwbWFjY2hpYXRvJTIwY29mZmVlfGVufDF8fHx8MTc2NDUxODMxMXww&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'Freshly steamed milk with vanilla syrup, marked with espresso and caramel drizzle',
  },
  {
    id: '2',
    name: 'Cappuccino',
    category: 'Espresso',
    price: 4.25,
    image: 'https://images.unsplash.com/photo-1638202448050-bddae16dd9be?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXBwdWNjaW5vJTIwY29mZmVlJTIwY3VwfGVufDF8fHx8MTc2NDU4MzI2MHww&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'Dark, rich espresso with steamed milk and a deep layer of foam',
  },
  {
    id: '3',
    name: 'Vanilla Latte',
    category: 'Espresso',
    price: 4.75,
    image: 'https://images.unsplash.com/photo-1683122925249-8b15d807db4b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2YW5pbGxhJTIwbGF0dGUlMjBjb2ZmZWV8ZW58MXx8fHwxNzY0NTgwNDY2fDA&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'Espresso with steamed milk and a hint of vanilla syrup',
  },
  {
    id: '4',
    name: 'Iced Americano',
    category: 'Cold Coffee',
    price: 3.95,
    image: 'https://images.unsplash.com/photo-1681026859292-58c3b2041bfd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpY2VkJTIwYW1lcmljYW5vJTIwY29mZmVlfGVufDF8fHx8MTc2NDU4MjU3OHww&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'Espresso shots topped with cold water and ice',
  },
  {
    id: '5',
    name: 'Cold Brew',
    category: 'Cold Coffee',
    price: 4.45,
    image: 'https://images.unsplash.com/photo-1611477948234-a3c27435c72b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2xkJTIwYnJldyUyMGNvZmZlZSUyMGdsYXNzfGVufDF8fHx8MTc2NDU5OTA3M3ww&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'Slow-steeped for 20 hours, smooth and naturally sweet',
  },
  {
    id: '6',
    name: 'Mocha Frappuccino',
    category: 'Frappuccino',
    price: 5.45,
    image: 'https://images.unsplash.com/photo-1752917069627-0753ec7a7915?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2NoYSUyMGZyYXBwdWNjaW5vfGVufDF8fHx8MTc2NDYwMzY0MXww&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'Coffee blended with mocha sauce, milk, and ice, topped with whipped cream',
  },
  {
    id: '7',
    name: 'Green Tea Latte',
    category: 'Tea',
    price: 4.75,
    image: 'https://images.unsplash.com/photo-1708572727896-117b5ea25a86?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYXRjaGElMjBncmVlbiUyMHRlYSUyMGxhdHRlfGVufDF8fHx8MTc2NDU1MDU4MHww&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'Premium matcha green tea blended with steamed milk',
  },
  {
    id: '8',
    name: 'Chai Latte',
    category: 'Tea',
    price: 4.45,
    image: 'https://images.unsplash.com/photo-1651789276450-2ba99bf5f270?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGFpJTIwbGF0dGUlMjB0ZWF8ZW58MXx8fHwxNzY0NjAyNTc3fDA&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'Black tea infused with cinnamon, clove, and spices combined with steamed milk',
  },
  {
    id: '9',
    name: 'Pumpkin Spice Latte',
    category: 'Seasonal',
    price: 5.25,
    image: 'https://images.unsplash.com/photo-1569383893830-b73dc4a03af0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwdW1wa2luJTIwc3BpY2UlMjBsYXR0ZXxlbnwxfHx8fDE3NjQ2MDM2NDN8MA&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'Espresso with pumpkin, cinnamon, nutmeg, and clove, topped with whipped cream',
  },
  {
    id: '10',
    name: 'Peppermint Mocha',
    category: 'Seasonal',
    price: 5.45,
    image: 'https://images.unsplash.com/photo-1606016806572-ad46f38633c7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwZXBwZXJtaW50JTIwbW9jaGElMjBjb2ZmZWV8ZW58MXx8fHwxNzY0NjAzNjQzfDA&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'Rich chocolate and refreshing peppermint with espresso and steamed milk',
  },
  {
    id: '11',
    name: 'Croissant',
    category: 'Snacks',
    price: 3.50,
    image: 'https://images.unsplash.com/photo-1675125530520-cbd142b630b0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmVuY2glMjBjcm9pc3NhbnQlMjBwYXN0cnl8ZW58MXx8fHwxNzY0NjAzNjQzfDA&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'Buttery, flaky French pastry baked fresh daily',
  },
  {
    id: '12',
    name: 'Blueberry Muffin',
    category: 'Snacks',
    price: 3.25,
    image: 'https://images.unsplash.com/photo-1607958996333-41aef7caefaa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxibHVlYmVycnklMjBtdWZmaW58ZW58MXx8fHwxNzY0NTY1ODA5fDA&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'Moist muffin packed with fresh blueberries and a sweet crumble top',
  },
  {
    id: '13',
    name: 'Chocolate Chip Cookie',
    category: 'Snacks',
    price: 2.95,
    image: 'https://images.unsplash.com/photo-1657418830273-40c19cfff4d7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaG9jb2xhdGUlMjBjaGlwJTIwY29va2llfGVufDF8fHx8MTc2NDYwMjg3NHww&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'Classic cookie loaded with chocolate chips, baked to perfection',
  },
  {
    id: '14',
    name: 'Avocado Toast',
    category: 'Snacks',
    price: 6.95,
    image: 'https://www.dinneratthezoo.com/wp-content/uploads/2018/12/avocado-toast-14.jpg',
    description: 'Smashed avocado on toasted sourdough with cherry tomatoes and microgreens',
  },
];

const categories = ['All', 'Espresso', 'Cold Coffee', 'Frappuccino', 'Tea', 'Seasonal', 'Snacks'];

export function Menu({ onDrinkSelect }: MenuProps) {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredItems = menuItems.filter(item => {
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="p-4">
      {/* Search Bar */}
      <div className="mb-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search drinks..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-amber-900"
          />
        </div>
      </div>

      {/* Category Tabs */}
      <div className="flex gap-2 mb-6 overflow-x-auto pb-2 scrollbar-hide">
        {categories.map(category => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-4 py-2 rounded-full whitespace-nowrap transition-colors ${
              selectedCategory === category
                ? 'bg-amber-900 text-white'
                : 'bg-white text-green-800 border border-red-800'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Menu Items Grid */}
      <div className="grid grid-cols-1 gap-4">
        {filteredItems.map(item => (
          <button
            key={item.id}
            onClick={() => onDrinkSelect(item)}
            className="bg-red-300 rounded-lg shadow-sm overflow-hidden flex gap-4 p-4 hover:shadow-md transition-shadow text-left"
          >
            <ImageWithFallback
              src={item.image}
              alt={item.name}
              className="w-24 h-24 object-cover rounded-lg flex-shrink-0"
            />
            <div className="flex-1 min-w-0">
              <h3 className="text-gray-900 mb-1">{item.name}</h3>
              <p className="text-green-800 text-sm mb-2 line-clamp-2">{item.description}</p>
              <div className="flex items-center justify-between">
                <span className="text-amber-900">${item.price.toFixed(2)}</span>
                <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                  {item.category}
                </span>
              </div>
            </div>
          </button>
        ))}
      </div>

      {filteredItems.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          <p>No drinks found</p>
        </div>
      )}
    </div>
  );
}