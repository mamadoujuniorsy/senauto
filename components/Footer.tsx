/* eslint-disable react/no-unescaped-entities */
"use client";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12 mt-32">
      <div className="max-w-[1440px] mx-auto px-6">
        {/* Newsletter Section */}
        <div className="text-center mb-8">
          <h3 className="text-3xl font-bold">Abonnez-vous à notre Newsletter</h3>
          <p className="text-gray-400 mt-4">Recevez les dernières nouvelles et mises à jour directement dans votre boîte de réception.</p>

          <div className="mt-6 flex justify-center">
            <input
              type="email"
              placeholder="Votre email"
              className="px-4 py-2 rounded-l-md text-gray-900"
            />
            <button className="bg-indigo-600 px-6 py-2 rounded-r-md hover:bg-indigo-700 transition duration-300">
              S'abonner
            </button>
          </div>
        </div>

        {/* Footer Links */}
        <div className="flex flex-col lg:flex-row justify-between items-center border-t border-gray-700 pt-8">
          <p className="text-gray-400">&copy; 2024 SenAuto. Tous droits réservés.</p>
          <div className="flex space-x-4 mt-4 lg:mt-0">
            <a href="/" className="hover:text-gray-300">Accueil</a>
            <a href="/contact" className="hover:text-gray-300">Contact</a>
            <a href="/faq" className="hover:text-gray-300">FAQ</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
