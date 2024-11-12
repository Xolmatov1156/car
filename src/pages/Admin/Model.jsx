import React, { useEffect, useState } from "react";
import { useAxios } from "../../hook/useAxios";
import Delete from "../../assets/delete.svg";
import Edit from "../../assets/edit.svg";
import { toast } from "react-toastify";
import Search from '../../assets/search.svg';
import useDebounce from "../../hook/useDebounce";

const Model = () => {
  const [data, setData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedModel, setSelectedModel] = useState(null);
  const [name, setName] = useState("");
  const [newName, setNewName] = useState(""); 
  const [searchTerm, setSearchTerm] = useState("");
  const token = localStorage.getItem("token");
  const debouncedSearchTerm = useDebounce(searchTerm, 900);
  const [brand, setBrand] = useState([]);
  const [brandId, setBrandId] = useState("")

  function getModel() {
    useAxios()
      .get("/api/models")
      .then((response) => {
        setData(response?.data?.data);
      });
  }

  useEffect(() => {
    getModel();
  }, []);
  function getBrand() {
    useAxios()
      .get("/api/brands")
      .then((response) => {
        setBrand(response?.data?.data);
      });
  }
  

  useEffect(() => {
    getBrand();
  }, []);
  function getModel() {
    useAxios()
      .get("/api/models")
      .then((response) => {
        setData(response?.data?.data);
      });
  }

  useEffect(() => {
    getModel();
  }, []);

  const handleAddModel = (e) => {
    e.preventDefault();
    const formdata = new FormData();
    formdata.append("name", name);
    formdata.append("brand_id", brandId);

    fetch("https://autoapi.dezinfeksiyatashkent.uz/api/models", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formdata,
    })
      .then((response) => response.json())
      .then((res) => {
        if (res?.success) {
          toast.success(res?.message);
          getModel();
          setShowModal(false);
          resetForm();
        } else {
          toast.error(res?.message);
        }
      });
  };

  const handleDelete = (modelId) => {
    fetch(`https://autoapi.dezinfeksiyatashkent.uz/api/models/${modelId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((res) => {
        if (res?.success) {
          toast.success(res?.message);
          getModel();
        } else {
          toast.error(res?.message);
        }
      });
  };

  const handleEditModel = (e) => {
    e.preventDefault();
    const formdata = new FormData();
    formdata.append("name", newName);

    fetch(`https://autoapi.dezinfeksiyatashkent.uz/api/models/${selectedModel.id}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formdata,
    })
      .then((response) => response.json())
      .then((res) => {
        if (res?.success) {
          toast.success(res?.message);
          getModel();
          setShowModal(false);
          setSelectedModel(null);
          resetForm();
        } else {
          toast.error(res?.message);
        }
      });
  };

  const openEditModal = (model) => {
    setSelectedModel(model);
    setNewName(model.name); 
    setShowModal(true);
  };
  console.log(brandId);
  

  const resetForm = () => {
    setName("");
    setNewName(""); 
    setBrandId("");
  };

  const filteredData = data.filter((item) =>
    item?.name.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) 
  );

  return (
    <div className="w-[80%] mx-auto mt-10">
      <div className="flex justify-between px-4">
        <h1 className="text-3xl font-semibold mb-4">Model</h1>
        <label className="flex relative">
          <input
            type="text"
            className="border border-gray-400 pr-8 pl-3 h-[40px] w-[200px] lg:w-[300px] rounded-lg outline-none"
            placeholder="Search Model"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <img src={Search} alt="search" className="w-[22px] h-[22px] absolute right-1 top-2.5"/>
        </label>
        <button
          onClick={() => {
            setShowModal(true);
            setSelectedModel(null);
            resetForm();
          }}
          className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
        >
          Add Model
        </button>
      </div>

      <table className="min-w-full bg-white border border-gray-200 shadow-lg overflow-hidden ">
        <thead>
          <tr className="bg-gray-200 text-gray-700 uppercase text-sm leading-normal">
            <th className="py-3 px-6 text-left">Name</th> 
            <th className="py-3 px-6 text-left">Brand</th>
            <th className="py-3 px-6 text-left">Action</th>
          </tr>
        </thead>
        <tbody className="text-gray-600 text-sm font-light">
          {filteredData?.map((item, index) => (
            <tr
              key={index}
              className="border-b border-gray-200 hover:bg-gray-100 transition duration-200"
            >
              <td className="py-3 px-6 text-left whitespace-nowrap">{item?.name}</td> 
              <td className="py-3 px-6 text-left">{item?.brand_title}</td> 
              
              <td className="flex gap-4 ml-4 py-4">
                <button onClick={() => openEditModal(item)} className="bg-blue-500 p-1 rounded-lg">
                  <img src={Edit} alt="edit"/>
                </button>
                <button className="bg-red-500 p-1 rounded-lg" onClick={() => handleDelete(item?.id)}>
                  <img src={Delete} alt="delete" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showModal && (
  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
    <div className="bg-white rounded-lg p-6 w-[90%] sm:w-[400px]">
      <h2 className="text-xl font-semibold mb-4">
        {selectedModel ? "Edit Model" : "Add New Model"}
      </h2>
      <form onSubmit={selectedModel ? handleEditModel : handleAddModel}>
        <div className="mb-4">
          <label className="block text-gray-700">Name</label> 
          <input
            type="text"
            className="w-full border border-gray-300 p-2 rounded"
            value={selectedModel ? newName : name} 
            onChange={(e) =>
              selectedModel ? setNewName(e.target.value) : setName(e.target.value)
            }
          />
          
          {/* Show select only when adding a new model */}
          {selectedModel === null && (
            <>
              <label className="mt-3 block">Brand</label>
              <select
                value={brandId}
                onChange={(e) => setBrandId(e.target.value)}
                className="w-full border border-gray-300 p-2 rounded"
              >
                <option value="" disabled>Select a Brand</option> {/* Default option */}
                {brand?.map((item, index) => (
                  <option key={index} value={item.id}>
                    {item.title}
                  </option>
                ))}
              </select>
            </>
          )}
        </div>
        <div className="flex justify-between mt-5">
          <button
            onClick={() => setShowModal(false)}
            type="button"
            className="bg-gray-500 text-white py-2 px-4 rounded"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded"
          >
            {selectedModel ? "Save" : "Add"}
          </button>
        </div>
      </form>
    </div>
  </div>
)}


    </div>
  );
};

export default Model;
