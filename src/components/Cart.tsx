import { CartItem } from '../App';
import { Trash2, Plus, Minus, ShoppingBag } from 'lucide-react';

interface CartProps {
  cart: CartItem[];
  onUpdateQuantity: (id: string, quantity: number) => void;
  onRemove: (id: string) => void;
  onCheckout: () => void;
  onContinueShopping: () => void;
  total: number;
  loyaltyPoints: number;
}

export function Cart({ cart, onUpdateQuantity, onRemove, onCheckout, onContinueShopping, total, loyaltyPoints }: CartProps) {
  const getItemPrice = (item: CartItem) => {
    let price = item.drink.price;
    const isSnack = item.drink.category === 'Snacks';
    
    // Only add size charges for drinks, not snacks
    if (!isSnack) {
      if (item.customization.size === 'Medium') price += 0.5;
      if (item.customization.size === 'Large') price += 1.0;
    }
    
    price += item.customization.extras.length * 0.5;
    return price;
  };

  if (cart.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-8 min-h-[60vh]">
        <ShoppingBag className="w-24 h-24 text-gray-300 mb-4" />
        <h2 className="text-gray-900 mb-2">Your cart is empty</h2>
        <p className="text-gray-600 mb-6 text-center">Add some delicious drinks to get started!</p>
        <button
          onClick={onContinueShopping}
          className="bg-amber-900 text-white px-6 py-3 rounded-lg hover:bg-amber-800 transition-colors"
        >
          Browse Menu
        </button>
      </div>
    );
  }

  return (
    <div className="p-4">
      <h2 className="text-gray-900 mb-4">Your Cart</h2>

      <div className="space-y-4 mb-24">
        {cart.map(item => (
          <div key={item.id} className="bg-white rounded-lg shadow-sm p-4">
            <div className="flex justify-between items-start mb-3">
              <div className="flex-1">
                <h3 className="text-gray-900 mb-1">{item.drink.name}</h3>
                <p className="text-sm text-gray-600 mb-2">
                  {item.customization.size} • {item.customization.milk} • {item.customization.ice}
                </p>
                {item.customization.extras.length > 0 && (
                  <p className="text-sm text-gray-600">
                    +{item.customization.extras.join(', ')}
                  </p>
                )}
              </div>
              <button
                onClick={() => onRemove(item.id)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <Trash2 className="w-5 h-5 text-red-500" />
              </button>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3 bg-gray-100 rounded-lg p-1">
                <button
                  onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                  className="p-2 hover:bg-gray-200 rounded-lg transition-colors"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="w-8 text-center">{item.quantity}</span>
                <button
                  onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                  className="p-2 hover:bg-gray-200 rounded-lg transition-colors"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
              <span className="text-amber-900">
                ${(getItemPrice(item) * item.quantity).toFixed(2)}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Checkout Footer */}
      <div className="fixed bottom-16 left-0 right-0 bg-white border-t border-gray-200 p-4 shadow-lg">
        <div className="max-w-md mx-auto">
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 mb-3">
            <div className="flex items-center justify-between text-sm">
              <span className="text-amber-900">You'll earn {Math.floor(total)} points! ⭐</span>
              <span className="text-xs text-amber-700">Total: {loyaltyPoints + Math.floor(total)} pts</span>
            </div>
          </div>
          <div className="flex justify-between items-center mb-4">
            <span className="text-gray-900">Total</span>
            <span className="text-amber-900">${total.toFixed(2)}</span>
          </div>
          <button
            onClick={onCheckout}
            className="w-full bg-amber-900 text-white py-4 rounded-lg hover:bg-amber-800 transition-colors"
          >
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
}