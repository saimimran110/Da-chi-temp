import React, { useState } from 'react';
import { useCart } from '../contexts/CartContext.js';
import { X, Minus, Plus, Trash2, ArrowLeft } from 'lucide-react';
import LoadingSpinner from '../components/spinner.jsx';
import emailjs from 'emailjs-com';
import SuccessAlert from '../components/OrderPlacedSuccessfully.jsx';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const { cart, removeFromCart, updateQuantity } = useCart();
  const [showModal, setShowModal] = useState(false);
  const [selectedItems, setSelectedItems] = useState(null);
  const [userInfo, setUserInfo] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    street: '',
  });
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const navigate = useNavigate();

  const calculateTotal = (items) => {
    return items.reduce((sum, item) => {
      const price = parseFloat(item.price) || 0;
      return sum + price * item.quantity;
    }, 0);
  };

  const total = calculateTotal(cart);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserInfo({ ...userInfo, [name]: value });
  };

  const handleBuyNow = (items) => {
    setSelectedItems(Array.isArray(items) ? items : [items]);
    setShowModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsPlacingOrder(true);

    const itemsMessage = selectedItems
      .map(item => `
        Product Name: ${item.name}
        Price: ${parseFloat(item.price)}
        Quantity: ${item.quantity}
        Subtotal: Rs ${parseFloat(item.price) * item.quantity}
      `)
      .join('\n');

    const templateParams = {
      name: userInfo.name,
      message: `
        Order Details:
        ${itemsMessage}
        
        Total Price: Rs ${calculateTotal(selectedItems)}
        
        Customer Details:
        Name: ${userInfo.name}
        Email: ${userInfo.email}
        Phone: ${userInfo.phone}
        Address: ${userInfo.address}, ${userInfo.street}
      `,
    };
    
    try {
      await emailjs.send('service_uzqy9ri', 'template_vyecb2o', templateParams, 'jzNLC7YoCPX13aoOY');
      selectedItems.forEach(item => removeFromCart(item.id || item.name));
      setShowAlert(true);
      setShowModal(false);
      setUserInfo({
        name: '',
        email: '',
        phone: '',
        address: '',
        street: '',
      });
    } catch (error) {
      console.error('Failed to place order:', error);
      alert('Failed to place order. Please try again.');
    } finally {
      setIsPlacingOrder(false);
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-extrabold text-gray-900">Your Cart</h1>
          <button
            onClick={() => navigate('/')}
            className="text-sm font-medium text-gray-600 hover:text-gray-900 flex items-center"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Continue shopping
          </button>
        </div>

        {cart.length === 0 ? (
          <div className="text-center py-32">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">Your cart is empty</h2>
            <p className="mt-4 text-xl text-gray-500">Looks like you haven't added any items to your cart yet.</p>
            <div className="mt-6">
              <button
                onClick={() => navigate('/')}
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Continue Shopping
              </button>
            </div>
          </div>
        ) : (
          <div className="lg:grid lg:grid-cols-12 lg:gap-x-12 lg:items-start xl:gap-x-16">
            <section aria-labelledby="cart-heading" className="lg:col-span-7">
              <h2 id="cart-heading" className="sr-only">Items in your shopping cart</h2>

              <ul role="list" className="border-t border-b border-gray-200 divide-y divide-gray-200">
                {cart.map((item) => (
                  <li key={item.id || item.name} className="flex py-6 sm:py-10">
                    <div className="flex-shrink-0">
                      <img
                        src={item.image || "/placeholder.svg"}
                        alt={item.name}
                        className="w-24 h-24 rounded-md object-center object-cover sm:w-32 sm:h-32"
                      />
                    </div>

                    <div className="ml-4 flex-1 flex flex-col justify-between sm:ml-6">
                      <div className="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
                        <div>
                          <div className="flex justify-between">
                            <h3 className="text-sm">
                              <a href="#" className="font-medium text-gray-700 hover:text-gray-800">
                                {item.name}
                              </a>
                            </h3>
                          </div>
                          <p className="mt-1 text-sm font-medium text-gray-900">Rs {parseFloat(item.price).toFixed(2)}</p>
                        </div>

                        <div className="mt-4 sm:mt-0 sm:pr-9">
                          <div className="flex items-center border-gray-300">
                            <button
                              className="p-2 text-gray-500 hover:text-gray-700"
                              onClick={() => updateQuantity(item.id || item.name, item.quantity - 1)}
                            >
                              <Minus className="h-4 w-4" />
                            </button>
                            <input
                              type="number"
                              className="w-12 text-center border-transparent"
                              value={item.quantity}
                              readOnly
                            />
                            <button
                              className="p-2 text-gray-500 hover:text-gray-700"
                              onClick={() => updateQuantity(item.id || item.name, item.quantity + 1)}
                            >
                              <Plus className="h-4 w-4" />
                            </button>
                          </div>

                          <div className="absolute top-0 right-0">
                            <button
                              type="button"
                              className="-m-2 p-2 inline-flex text-gray-400 hover:text-gray-500"
                              onClick={() => removeFromCart(item.id || item.name)}
                            >
                              <span className="sr-only">Remove</span>
                              <Trash2 className="h-5 w-5" aria-hidden="true" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </section>

            {/* Order summary */}
            <section
              aria-labelledby="summary-heading"
              className="mt-16 bg-gray-50 rounded-lg px-4 py-6 sm:p-6 lg:p-8 lg:mt-0 lg:col-span-5"
            >
              <h2 id="summary-heading" className="text-lg font-medium text-gray-900">
                Order summary
              </h2>

              <dl className="mt-6 space-y-4">
                <div className="flex items-center justify-between">
                  <dt className="text-sm text-gray-600">Subtotal</dt>
                  <dd className="text-sm font-medium text-gray-900">Rs {total.toFixed(2)}</dd>
                </div>
                <div className="border-t border-gray-200 pt-4 flex items-center justify-between">
                  <dt className="text-base font-medium text-gray-900">Order total</dt>
                  <dd className="text-base font-medium text-gray-900">Rs {total.toFixed(2)}</dd>
                </div>
              </dl>

              <div className="mt-6">
                <button
                  onClick={() => handleBuyNow(cart)}
                  className="w-full bg-indigo-600 border border-transparent rounded-md shadow-sm py-3 px-4 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-indigo-500"
                >
                  Checkout
                </button>
              </div>
            </section>
          </div>
        )}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50 p-4 overflow-y-auto">
          <div className="bg-white p-8 rounded-lg max-w-md w-full my-8 shadow-xl">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Cash on Delivery</h2>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            
            <div className="mb-6 p-4 bg-gray-50 rounded-lg">
              <h3 className="font-semibold mb-3 text-lg">Order Summary</h3>
              {selectedItems?.map((item) => (
                <div key={item.id || item.name} className="flex justify-between mb-2 text-gray-700">
                  <span>{item.name} x {item.quantity}</span>
                  <span>Rs {(parseFloat(item.price) * item.quantity).toFixed(2)}</span>
                </div>
              ))}
              <div className="border-t mt-3 pt-3 font-bold text-lg text-gray-900">
                Total: Rs {calculateTotal(selectedItems).toFixed(2)}
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={userInfo.name}
                  onChange={handleInputChange}
                  required
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={userInfo.email}
                  onChange={handleInputChange}
                  required
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={userInfo.phone}
                  onChange={handleInputChange}
                  required
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
              <div>
                <label htmlFor="address" className="block text-sm font-medium text-gray-700">Address</label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  value={userInfo.address}
                  onChange={handleInputChange}
                  required
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
              <div>
                <label htmlFor="street" className="block text-sm font-medium text-gray-700">Street</label>
                <input
                  type="text"
                  id="street"
                  name="street"
                  value={userInfo.street}
                  onChange={handleInputChange}
                  required
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Place Order
              </button>
            </form>
          </div>
        </div>
      )}
      {isPlacingOrder && <LoadingSpinner size="xl" message="Processing your order..." fullScreen />}
      {showAlert && (
        <SuccessAlert 
          message="Order placed successfully!" 
          duration={3000}
          onClose={() => setShowAlert(false)}
        />
      )}
    </div>
  );
};

export default Cart;
