import React, { useEffect, useState } from "react";
import { useAxios } from "../../hook/useAxios";
import Delete from "../../assets/delete.svg";
import Edit from "../../assets/edit.svg";
import { toast } from "react-toastify";
import AddImg from "../../assets/add.png";
import useDebounce from "../../hook/useDebounce";
import Search from "../../assets/search.svg";

const City = () => {
  const [cities, setCities] = useState([]);
  const [deleteModal, setDeleteModal] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedCity, setSelectedCity] = useState(null);
  const [name, setName] = useState("");
  const [text, setText] = useState("");
  const [newName, setNewName] = useState("");
  const [newText, setNewText] = useState("");
  const [imageSrc, setImageSrc] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 900);
  const token = localStorage.getItem("token");

  const openDeleteModal = (cityId) => {
    setSelectedCity(cityId);
    setDeleteModal(true);
  };

  const getCities = () => {
    if (token) {
      useAxios()
        .get("/api/cities", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          if (response?.data?.data) {
            setCities(response.data.data);
          } else {
            toast.error("Failed to fetch cities.");
          }
        })
        .catch(() => {
          toast.error("Error fetching cities.");
        });
    } else {
      toast.error("Authorization token is missing.");
    }
  };

  useEffect(() => {
    getCities();
  }, [token]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageSrc(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleAddCity = (e) => {
    e.preventDefault();
    const formdata = new FormData();
    formdata.append("name", name);
    formdata.append("text", text);
    formdata.append("images", imageSrc);

    fetch("https://autoapi.dezinfeksiyatashkent.uz/api/cities", {
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
          getCities();
          setShowModal(false);
          setImagePreview(null);
          resetForm();
        } else {
          toast.error(res?.message);
        }
      })
      .catch(() => {
        toast.error("Error adding city.");
      });
  };

  const handleDelete = (cityId) => {
    fetch(`https://autoapi.dezinfeksiyatashkent.uz/api/cities/${cityId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((res) => {
        if (res?.success) {
          toast.success(res?.message);
          getCities();
          setDeleteModal(false);
        } else {
          toast.error(res?.message);
        }
      })
      .catch(() => {
        toast.error("Error deleting city.");
      });
  };

  const handleEditCity = (e) => {
    e.preventDefault();
    const formdata = new FormData();
    formdata.append("name", newName);
    formdata.append("text", newText);
    if (imageSrc) formdata.append("images", imageSrc);

    fetch(`https://autoapi.dezinfeksiyatashkent.uz/api/cities/${selectedCity.id}`, {
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
          getCities();
          setShowModal(false);
          setSelectedCity(null);
          setImagePreview(null);
          resetForm();
        } else {
          toast.error(res?.message);
        }
      })
      .catch(() => {
        toast.error("Error editing city.");
      });
  };

  const openEditModal = (city) => {
    setSelectedCity(city);
    setNewName(city.name);
    setNewText(city.text);
    setImagePreview(`https://autoapi.dezinfeksiyatashkent.uz/api/uploads/images/${city.image_src}`);
    setShowModal(true);
  };

  const resetForm = () => {
    setName("");
    setNewName("");
    setText("");
    setNewText("");
    setImageSrc("");
    setImagePreview(null);
  };

  return (
    <div className="w-[80%] mx-auto mt-10">
      <div className="flex justify-between px-4">
        <h1 className="text-3xl font-semibold mb-4">City</h1>
        <label className="flex relative">
          <input
            type="text"
            className="border border-gray-400 pr-8 pl-3 h-[40px] w-[200px] lg:w-[300px] rounded-lg outline-none -z-10"
            placeholder="Search City"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <img src={Search} alt="search" className="w-[22px] h-[22px] absolute right-1 top-2.5"/>
        </label>
        <button
          onClick={() => {
            setShowModal(true);
            setSelectedCity(null);
            resetForm();
          }}
          className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
        >
          Add City
        </button>
      </div>

      <table className="min-w-full bg-white border border-gray-200 shadow-lg overflow-hidden">
        <thead>
          <tr className="bg-gray-200 text-gray-700 uppercase text-sm leading-normal">
            <th className="py-3 px-6 text-left">Name</th>
            <th className="py-3 px-6 text-left">Text</th>
            <th className="py-3 px-6 text-left">Image</th>
            <th className="py-3 px-6 text-left">Action</th>
          </tr>
        </thead>
        <tbody className="text-gray-600 text-sm font-light">
          {cities.filter((city) =>
            city.name.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
          ).map((city, index) => (
            <tr key={index} className="border-b border-gray-200 hover:bg-gray-100 transition duration-200">
              <td className="py-3 px-6 text-left whitespace-nowrap">{city?.name}</td>
              <td className="py-3 px-6 text-left whitespace-nowrap">{city?.text}</td>
              <td className="py-3 px-6 text-left">
                <img
                  src={`https://autoapi.dezinfeksiyatashkent.uz/api/uploads/images/${city?.image_src}`}
                  alt={city?.name}
                  className="w-16 h-16 rounded-md object-contain"
                />
              </td>
              <td className="flex mt-5 gap-4 ml-4">
                <button onClick={() => openEditModal(city)} className="bg-blue-500 p-1 rounded-lg">
                  <img src={Edit} alt="edit" />
                </button>
                <button
                  className="bg-red-500 p-1 rounded-lg"
                  onClick={() => openDeleteModal(city?.id)}
                >
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
              {selectedCity ? "Edit City" : "Add New City"}
            </h2>
            <form onSubmit={selectedCity ? handleEditCity : handleAddCity}>
              <div className="mb-4">
                <label className="block text-gray-700">Name</label>
                <input
                  type="text"
                  className="w-full border border-gray-300 p-2 rounded"
                  value={selectedCity ? newName : name}
                  onChange={(e) => (selectedCity ? setNewName(e.target.value) : setName(e.target.value))}
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Text</label>
                <textarea
                  className="w-full border border-gray-300 p-2 rounded"
                  value={selectedCity ? newText : text}
                  onChange={(e) => (selectedCity ? setNewText(e.target.value) : setText(e.target.value))}
                  required
                />
              </div>
              <div className="mb-4">
              <label className="block text-gray-700">
                  Image
                  <input
                    accept="image/png, image/jpeg"
                    type="file"
                    className="hidden"
                    onChange={handleImageChange}
                  />
                  {imagePreview ? (
                    <img
                      src={imagePreview}
                      alt="image preview"
                      className="w-32 h-32 mt-2 object-contain"
                    />
                  ) : (
                    <img src={AddImg} alt="add" className="w-16 mt-2" />
                  )}
                </label>
              </div>
              <div className="flex justify-between">
              <button
                type="button"
                className=" bg-gray-500 text-white px-4 py-2 rounded"
                onClick={() => {
                  setShowModal(false);
                  setSelectedCity(null);
                  setImagePreview(null);
                  resetForm();
                }}
              >
                Cancel
              </button>
              <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
                {selectedCity ? "Save" : "Add City"}
              </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {deleteModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg p-6 w-[90%] sm:w-[400px]">
            <h2 className="text-lg font-semibold mb-4">Delete City</h2>
            <p>Are you sure you want to delete this city?</p>
            <div className="flex justify-end mt-4">
              <button
                onClick={() => setDeleteModal(false)}
                className="bg-gray-500 text-white px-4 py-2 rounded mr-2"
              >
                Cancel
              </button>
              <button onClick={() => handleDelete(selectedCity)} className="bg-red-500 text-white px-4 py-2 rounded ">
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default City;
