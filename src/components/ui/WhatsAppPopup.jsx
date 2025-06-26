import React from 'react';
import { MessageCircle } from 'lucide-react';

const WhatsAppPopup = () => {
  const whatsappNumber = '9660504447148';

  const handleClick = () => {
    window.open(`https://wa.me/${whatsappNumber}`, '_blank');
  };

  return (
    <button
      onClick={handleClick}
      aria-label="WhatsApp"
      className="fixed bottom-5 right-5 z-50 bg-green-500 hover:bg-green-600 text-white p-3 rounded-full shadow-lg"
    >
      <MessageCircle className="w-6 h-6" />
    </button>
  );
};

export default WhatsAppPopup;
