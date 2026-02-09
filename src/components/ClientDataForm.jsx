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

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const validateField = (name, value) => {
    const trimmed = value.trim();

    if (!trimmed) return "Campo obbligatorio";

    if (
      ["client_name", "client_surname", "billing_city", "shipping_city"]
        .includes(name)
    ) {
      if (trimmed.length < 2) return "Minimo 2 caratteri";
      return "";
    }

    if (["billing_address", "shipping_address"].includes(name)) {
      if (trimmed.length < 5) return "Indirizzo non valido";
      return "";
    }

    if (name === "email") {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) return "Email non valida";
      return "";
    }

    if (name === "phone_number") {
      const phoneRegex = /^[\d\s\-\+\(\)]{9,}$/;
      const cleaned = value.replace(/\s/g, "");
      if (!phoneRegex.test(cleaned))
        return "Telefono non valido (minimo 9 cifre)";
      return "";
    }

    if (["billing_postal_code", "shipping_postal_code"].includes(name)) {
      const capRegex = /^\d{5}$/;
      const cleaned = value.replace(/\s/g, "");
      if (!capRegex.test(cleaned)) return "CAP non valido (5 cifre)";
      return "";
    }

    return "";
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    const updated = { ...formData, [name]: value };
    setFormData(updated);

    if (touched[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: validateField(name, value),
      }));
    }

    onFormChange?.(updated);
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;

    setTouched((prev) => ({ ...prev, [name]: true }));

    setErrors((prev) => ({
      ...prev,
      [name]: validateField(name, value),
    }));
  };

  const copyBillingToShipping = () => {
    const updated = {
      ...formData,
      shipping_address: formData.billing_address,
      shipping_city: formData.billing_city,
      shipping_postal_code: formData.billing_postal_code,
    };

    setFormData(updated);

    setTouched((prev) => ({
      ...prev,
      shipping_address: true,
      shipping_city: true,
      shipping_postal_code: true,
    }));

    setErrors((prev) => ({
      ...prev,
      shipping_address: validateField("shipping_address", updated.shipping_address),
      shipping_city: validateField("shipping_city", updated.shipping_city),
      shipping_postal_code: validateField("shipping_postal_code", updated.shipping_postal_code),
    }));

    onFormChange?.(updated);
  };

  const inputClass = (name) =>
    `mt-1 w-full border rounded-md p-2 transition-colors ${
      touched[name] && errors[name]
        ? "border-red-500 bg-red-50 focus:border-red-500 focus:ring-red-500"
        : "border-gray-300 focus:border-blue-500 focus:ring-blue-500"
    }`;

  const errorMsg = (name) =>
    touched[name] && errors[name] && (
      <p className="mt-1 text-sm text-red-600">❌ {errors[name]}</p>
    );

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-lg space-y-6 border">
      <h2 className="text-2xl font-semibold text-gray-800 mb-0">Informazioni Cliente</h2>
      <p className="text-sm text-gray-500 mt-0">Tutti i campi sono obbligatori</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Nome</label>
          <input
            name="client_name"
            value={formData.client_name}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Mario"
            className={inputClass("client_name")}
          />
          {errorMsg("client_name")}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Cognome</label>
          <input
            name="client_surname"
            value={formData.client_surname}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Rossi"
            className={inputClass("client_surname")}
          />
          {errorMsg("client_surname")}
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
            onBlur={handleBlur}
            placeholder="mariorossi@gmail.com"
            className={inputClass("email")}
          />
          {errorMsg("email")}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Telefono</label>
          <input
            type="tel"
            name="phone_number"
            value={formData.phone_number}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="345-1234-567"
            className={inputClass("phone_number")}
          />
          {errorMsg("phone_number")}
        </div>
      </div>
      <h3 className="text-xl font-semibold text-gray-800">Indirizzo di Fatturazione</h3>
      <div>
        <label className="block text-sm font-medium text-gray-700">Indirizzo</label>
        <input
          name="billing_address"
          type="text"
          value={formData.billing_address}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="Via Milano 1"
          className={inputClass("billing_address")}
        />
        {errorMsg("billing_address")}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Città</label>
          <input
            name="billing_city"
            type="text"
            value={formData.billing_city}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Roma"
            className={inputClass("billing_city")}
          />
          {errorMsg("billing_city")}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">CAP</label>
          <input
            name="billing_postal_code"
            type="number"
            value={formData.billing_postal_code}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="20145"
            className={inputClass("billing_postal_code")}
          />
          {errorMsg("billing_postal_code")}
        </div>
      </div>

      <button
        type="button"
        onClick={copyBillingToShipping}
        className="px-4 py-2 bg-[#ff006e] text-white rounded-md hover:bg-[#ff006e]/80 transition"
      >
        Usa lo stesso indirizzo per la spedizione
      </button>
      <h3 className="text-xl font-semibold text-gray-800">Indirizzo di Spedizione</h3>


      <div>
        <label className="block text-sm font-medium text-gray-700">Indirizzo</label>
        <input
          name="shipping_address"
          type="text"
          value={formData.shipping_address}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="Via Milano 1"
          className={inputClass("shipping_address")}
        />
        {errorMsg("shipping_address")}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Città</label>
          <input
            name="shipping_city"
            type="text"
            value={formData.shipping_city}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Roma"
            className={inputClass("shipping_city")}
          />
          {errorMsg("shipping_city")}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">CAP</label>
          <input
            name="shipping_postal_code"
            type="number"
            value={formData.shipping_postal_code}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="20145"
            className={inputClass("shipping_postal_code")}
          />
          {errorMsg("shipping_postal_code")}
        </div>
      </div>
    </div>
  );
}
