import { useState } from "react";

export default function ClientDataForm() {
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
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-lg space-y-6 border">
      <h2 className="text-2xl font-semibold text-gray-800">Client Information</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Name</label>
          <input
            type="text"
            name="client_name"
            value={formData.client_name}
            onChange={handleChange}
            className="mt-1 w-full border rounded-md p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Surname</label>
          <input
            type="text"
            name="client_surname"
            value={formData.client_surname}
            onChange={handleChange}
            className="mt-1 w-full border rounded-md p-2" />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">E-mail</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="mt-1 w-full border rounded-md p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Phone Number</label>
          <input
            type="text"
            name="phone_number"
            value={formData.phone_number}
            onChange={handleChange}
            className="mt-1 w-full border rounded-md p-2" />
        </div>
      </div>
      <h3 className="text-xl font-semibold text-gray-800">Billing Address</h3>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Address</label>
          <input
            type="text"
            name="billing_address"
            value={formData.billing_address}
            onChange={handleChange}
            className="mt-1 w-full border rounded-md p-2" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">City</label>
            <input
              type="text"
              name="billing_city"
              value={formData.billing_city}
              onChange={handleChange}
              className="mt-1 w-full border rounded-md p-2" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Postal Code</label>
            <input
              type="text"
              name="billing_postal_code"
              value={formData.billing_postal_code}
              onChange={handleChange}
              className="mt-1 w-full border rounded-md p-2" />
          </div>
        </div>
      </div>
      <h3 className="text-xl font-semibold text-gray-800">Shipping Address</h3>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Address</label>
          <input
            type="text"
            name="shipping_address"
            value={formData.shipping_address}
            onChange={handleChange}
            className="mt-1 w-full border rounded-md p-2" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">City</label>
            <input
              type="text"
              name="shipping_city"
              value={formData.shipping_city}
              onChange={handleChange}
              className="mt-1 w-full border rounded-md p-2" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Postal Code</label>
            <input
              type="text"
              name="shipping_postal_code"
              value={formData.shipping_postal_code}
              onChange={handleChange}
              className="mt-1 w-full border rounded-md p-2" />
          </div>
        </div>
      </div>
      <button type="submit" className="w-full bg-[#ff006e] text-white py-2 rounded-md hover:bg-[#ffd21f] transition">
        Submit
      </button>
    </form>
  );
}
