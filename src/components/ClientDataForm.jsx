import { useState } from "react";

export default function ClientDataForm({ onFormChange }) {
  const [formData, setFormData] = useState({
    client_name: "",
    client_surname: "",
    email: "",
    phone_number: "",
    billing_address: "",
    billing_city: "",
    billing_postal_code: "",
    shipping_address: "",
    shipping_city: "",
    shipping_postal_code: "",
  });

  const handleChange = (e) => {
    const updatedData = {
      ...formData,
      [e.target.name]: e.target.value,
    };
    setFormData(updatedData);

    // Passa i dati al componente padre ogni volta che cambiano
    if (onFormChange) {
      onFormChange(updatedData);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-lg space-y-6 border">
      <h2 className="text-2xl font-semibold text-gray-800">Informazioni Cliente</h2>

      {/* DATI PERSONALI */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Nome*</label>
          <input
            type="text"
            name="client_name"
            placeholder="Mario"
            value={formData.client_name}
            onChange={handleChange}
            required
            className="mt-1 w-full border rounded-md p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Cognome*</label>
          <input
            type="text"
            name="client_surname"
            placeholder="Rossi"
            value={formData.client_surname}
            onChange={handleChange}
            required
            className="mt-1 w-full border rounded-md p-2" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">E-mail*</label>
          <input
            type="email"
            name="email"
            placeholder="mariorossi@gmail.com"
            value={formData.email}
            onChange={handleChange}
            required
            className="mt-1 w-full border rounded-md p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Telefono*</label>
          <input
            type="tel"
            name="phone_number"
            placeholder="345-1234-567"
            value={formData.phone_number}
            onChange={handleChange}
            required
            className="mt-1 w-full border rounded-md p-2" />
        </div>
      </div>

      {/* INDIRIZZO FATTURAZIONE */}
      <h3 className="text-xl font-semibold text-gray-800">Indirizzo di Fatturazione</h3>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Indirizzo*</label>
          <input
            type="text"
            name="billing_address"
            placeholder="Via Milano 1"
            value={formData.billing_address}
            onChange={handleChange}
            required
            className="mt-1 w-full border rounded-md p-2" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Città*</label>
            <input
              type="text"
              name="billing_city"
              placeholder="Roma"
              value={formData.billing_city}
              onChange={handleChange}
              required
              className="mt-1 w-full border rounded-md p-2" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">CAP*</label>
            <input
              type="text"
              name="billing_postal_code"
              placeholder="20145"
              value={formData.billing_postal_code}
              onChange={handleChange}
              required
              className="mt-1 w-full border rounded-md p-2" />
          </div>
        </div>
      </div>

      {/* INDIRIZZO SPEDIZIONE */}
      <h3 className="text-xl font-semibold text-gray-800">Indirizzo di Spedizione</h3>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Indirizzo*</label>
          <input
            type="text"
            name="shipping_address"
            placeholder="Via Milano 1"
            value={formData.shipping_address}
            onChange={handleChange}
            required
            className="mt-1 w-full border rounded-md p-2" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Città*</label>
            <input
              type="text"
              name="shipping_city"
              placeholder="Roma"
              value={formData.shipping_city}
              onChange={handleChange}
              required
              className="mt-1 w-full border rounded-md p-2" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">CAP*</label>
            <input
              type="text"
              name="shipping_postal_code"
              placeholder="20145"
              value={formData.shipping_postal_code}
              onChange={handleChange}
              required
              className="mt-1 w-full border rounded-md p-2" />
          </div>
        </div>
      </div>
    </div>
  );
}