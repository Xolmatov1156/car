import React, { useEffect, useState } from "react";
import { useAxios } from "../../hook/useAxios";
import Delete from "../../assets/delete.svg";
import Edit from "../../assets/edit.svg";
import { toast } from "react-toastify";
import AddImg from "../../assets/add.png";
import useDebounce from "../../hook/useDebounce";
import Search from "../../assets/search.svg";

const Location = () => {
  const [data, setData] = useState([]);
  const [deleteModal, setDeleteModal] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [name, setName] = useState("");
  const [text, setText] = useState("");
  const [newText, setNewText] = useState("");
  const [newName, setNewName] = useState("");
  const [imageSrc, setImageSrc] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLocationId, setSelectedLocationId] = useState(null);
  const debouncedSearchTerm = useDebounce(searchTerm, 900);
  const token = localStorage.getItem("token");

  const openDeleteModal = (locationId) => {
    setSelectedLocationId(locationId);
    setDeleteModal(true);
  };

  const filteredData = data.filter((item) =>
    item?.name.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
  );

  const getLocations = () => {
    if (token) {
      useAxios()
        .get("/api/locations", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          if (response?.data?.data) {
            setData(response.data.data);
          } else {
            toast.error("Failed to fetch locations.");
          }
        })
        .catch(() => {
          toast.error("Error fetching locations.");
        });
    } else {
      toast.error("Authorization token is missing.");
    }
  };

  useEffect(() => {
    getLocations();
  }, [token]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageSrc(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleAddLocation = (e) => {
    e.preventDefault();
    const formdata = new FormData();
    formdata.append("name", name);
    formdata.append("images", imageSrc);
    formdata.append("text", text);

    fetch("https://autoapi.dezinfeksiyatashkent.uz/api/locations", {
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
          getLocations();
          setShowModal(false);
          setImagePreview(null);
          resetForm();
        } else {
          toast.error(res?.message);
        }
      })
      .catch(() => {
        toast.error("Error adding location.");
      });
  };

  const handleDelete = (locationId) => {
    fetch(
      `https://autoapi.dezinfeksiyatashkent.uz/api/locations/${locationId}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
      .then((response) => response.json())
      .then((res) => {
        if (res?.success) {
          toast.success(res?.message);
          getLocations();
          setDeleteModal(false);
        } else {
          toast.error(res?.message);
        }
      })
      .catch(() => {
        toast.error("Error deleting location.");
      });
  };

  const handleEditLocation = (e) => {
    e.preventDefault();
    const formdata = new FormData();
    formdata.append("name", newName);
    formdata.append("text", newText);
    if (imageSrc) formdata.append("images", imageSrc);

    fetch(
      `https://autoapi.dezinfeksiyatashkent.uz/api/locations/${selectedLocation.id}`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formdata,
      }
    )
      .then((response) => response.json())
      .then((res) => {
        if (res?.success) {
          toast.success(res?.message);
          getLocations();
          setShowModal(false);
          setSelectedLocation(null);
          setImagePreview(null);
          resetForm();
        } else {
          toast.error(res?.message);
        }
      })
      .catch(() => {
        toast.error("Error editing location.");
      });
  };

  const openEditModal = (location) => {
    setSelectedLocation(location);
    setNewName(location.name);
    setNewText(location.text);
    setImagePreview(
      `https://autoapi.dezinfeksiyatashkent.uz/api/uploads/images/${location.image_src}`
    );
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
        <h1 className="text-3xl font-semibold mb-4">Location</h1>
        <label className="flex relative">
          <input
            type="text"
            className="border border-gray-400 pr-8 pl-3 h-[40px] w-[200px] lg:w-[300px] rounded-lg outline-none -z-10"
            placeholder="Search Location"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <img
            src={Search}
            alt="search"
            className="w-[22px] h-[22px] absolute right-1 top-2.5"
          />
        </label>
        <button
          onClick={() => {
            setShowModal(true);
            setSelectedLocation(null);
            resetForm();
          }}
          className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
        >
          Add Location
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
          {filteredData?.map((item, index) => (
            <tr
              key={index}
              className="border-b border-gray-200 hover:bg-gray-100 transition duration-200"
            >
              <td className="py-3 px-6 text-left whitespace-nowrap">
                {item?.name}
              </td>
              <td className="py-3 px-6 text-left">{item?.text}</td>
              <td className="py-3 px-6 text-left">
                <img
                  src={`https://autoapi.dezinfeksiyatashkent.uz/api/uploads/images/${item?.image_src}`}
                  alt={item?.name}
                  className="w-16 h-16 rounded-md object-contain"
                />
              </td>
              <td className="flex mt-5 gap-4 ml-4">
                <button
                  onClick={() => openEditModal(item)}
                  className="bg-blue-500 p-1 rounded-lg"
                >
                  <img src={Edit} alt="edit" />
                </button>
                <button
                  className="bg-red-500 p-1 rounded-lg"
                  onClick={() => openDeleteModal(item?.id)}
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
              {selectedLocation ? "Edit Location" : "Add New Location"}
            </h2>
            <form
              onSubmit={
                selectedLocation ? handleEditLocation : handleAddLocation
              }
            >
              <div className="mb-4">
                <label className="block text-gray-700">Name</label>
                <input
                  type="text"
                  className="w-full border border-gray-300 p-2 rounded"
                  value={selectedLocation ? newName : name}
                  onChange={(e) =>
                    selectedLocation
                      ? setNewName(e.target.value)
                      : setName(e.target.value)
                  }
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Text</label>
                <textarea
                  className="w-full border border-gray-300 p-2 rounded"
                  value={selectedLocation ? newText : text}
                  onChange={(e) =>
                    selectedLocation
                      ? setNewText(e.target.value)
                      : setText(e.target.value)
                  }
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
                  onClick={() => setShowModal(false)}
                  className="bg-gray-500 text-white px-4 py-2 rounded"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                  {selectedLocation ? "Save" : "Add Location"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {deleteModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg p-6 ">
            <h2 className="text-xl font-semibold ">Confirm Delete</h2>
            <p className="my-4 text-gray-500">
              Are you sure want to delete this location?
            </p>
            <div className="flex justify-between">
              <button
                onClick={() => setDeleteModal(false)}
                className="bg-gray-500 text-white px-4 py-2 rounded"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(selectedLocationId)}
                className="bg-red-500 text-white px-4 py-2 rounded"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Location;
