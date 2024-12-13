import React, { useState } from "react";

const ConfigModal = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState("shipping");
  const [formData, setFormData] = useState({
    shipping: {
      from: "Ing. Jorge Morales Vilugrón, Director Bachillerato en Ciencias de la Ingeniería Plan Común",
      to: "",
      cc: [
      ],
    },
    address: {
      name: "",
      address: "",
      phone: "",
      email: "",
      website: "",
    },
  });

  const handleInputChange = (section, key, value) => {
    setFormData((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [key]: value,
      },
    }));
  };

  const handleCCChange = (index, value) => {
    setFormData((prev) => {
      const updatedCC = [...prev.shipping.cc];
      updatedCC[index] = value;
      return {
        ...prev,
        shipping: {
          ...prev.shipping,
          cc: updatedCC,
        },
      };
    });
  };

  const handleAddCC = () => {
    setFormData((prev) => ({
      ...prev,
      shipping: {
        ...prev.shipping,
        cc: [...prev.shipping.cc, ""], // Añade una entrada vacía
      },
    }));
  };

  const handleRemoveCC = (index) => {
    setFormData((prev) => {
      const updatedCC = prev.shipping.cc.filter((_, i) => i !== index); // Elimina la entrada seleccionada
      return {
        ...prev,
        shipping: {
          ...prev.shipping,
          cc: updatedCC,
        },
      };
    });
  };
  

  const handleSave = async () => {
    // Obtenemos los datos del formulario
    const configData = {
      shipping: formData.shipping,
      address: formData.address,
    };
  
    try {
      // Enviar los datos al backend (POST a la API)
      await fetch('http://localhost:3001/api/save-config', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(configData),
      });
  
      alert('La configuración se ha guardado correctamente');
    } catch (error) {
      console.error('Error al guardar la configuración:', error);
      alert('Error al guardar la configuración');
    }

    onClose();
  };

  return isOpen ? (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-3/4 max-w-2xl">
        <button
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
          onClick={onClose}
        >
          ✕
        </button>
        <div className="flex border-b mb-4">
          <button
            onClick={() => setActiveTab("shipping")}
            className={`flex-1 py-2 text-center ${
              activeTab === "shipping"
                ? "border-b-2 border-blue-500 text-blue-500"
                : "text-gray-600"
            }`}
          >
            Información de Envío
          </button>
          <button
            onClick={() => setActiveTab("address")}
            className={`flex-1 py-2 text-center ${
              activeTab === "address"
                ? "border-b-2 border-blue-500 text-blue-500"
                : "text-gray-600"
            }`}
          >
            Información de Dirección
          </button>
        </div>

        {activeTab === "shipping" && (
          <div>
            <h3 className="text-lg font-semibold mb-4">Información de Envío</h3>
            <h4 className="font-medium mb-2">De:</h4>
            <textarea
              value={formData.shipping.from}
              onChange={(e) =>
                handleInputChange("shipping", "from", e.target.value)
              }
              placeholder="De"
              className="w-full border p-2 mb-2 rounded"
            />
            <h4 className="font-medium mb-2">A:</h4>
            <textarea
              value={formData.shipping.to}
              onChange={(e) =>
                handleInputChange("shipping", "to", e.target.value)
              }
              placeholder="A"
              className="w-full border p-2 mb-2 rounded"
            />
            <h4 className="font-medium mb-2">C.C:</h4>
            {formData.shipping.cc.map((cc, index) => (
                <div key={index} className="flex items-center gap-2 mb-2">
                <textarea
                    value={cc}
                    onChange={(e) => handleCCChange(index, e.target.value)}
                    placeholder={`C.C ${index + 1}`}
                    className="flex-1 border p-2 rounded"
                />
                <button
                    onClick={() => handleRemoveCC(index)}
                    className="bg-red-500 text-white py-1 px-2 rounded hover:bg-red-600"
                >
                    Eliminar
                </button>
                </div>
            ))}
            <div className="flex justify-end mt-2">
                <button
                    onClick={handleAddCC}
                    className="bg-green-700 text-white py-1 px-4 rounded hover:bg-green-800"
                >
                    Agregar C.C
                </button>
                </div>
          </div>
        )}

        {activeTab === "address" && (
          <div>
            <h3 className="text-lg font-semibold mb-4">
              Información de Dirección
            </h3>
            <input
              type="text"
              value={formData.address.name}
              onChange={(e) =>
                handleInputChange("address", "name", e.target.value)
              }
              placeholder="Nombre"
              className="w-full border p-2 mb-2 rounded"
            />
            <input
              type="text"
              value={formData.address.address}
              onChange={(e) =>
                handleInputChange("address", "address", e.target.value)
              }
              placeholder="Dirección"
              className="w-full border p-2 mb-2 rounded"
            />
            <input
              type="text"
              value={formData.address.phone}
              onChange={(e) =>
                handleInputChange("address", "phone", e.target.value)
              }
              placeholder="Teléfono"
              className="w-full border p-2 mb-2 rounded"
            />
            <input
              type="email"
              value={formData.address.email}
              onChange={(e) =>
                handleInputChange("address", "email", e.target.value)
              }
              placeholder="Email"
              className="w-full border p-2 mb-2 rounded"
            />
            <input
              type="text"
              value={formData.address.website}
              onChange={(e) =>
                handleInputChange("address", "website", e.target.value)
              }
              placeholder="Página Web"
              className="w-full border p-2 mb-2 rounded"
            />
          </div>
        )}
        <button
          onClick={handleSave}
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 "
        >
          Guardar
        </button>
      </div>
    </div>
  ) : null;
};

export default ConfigModal;
