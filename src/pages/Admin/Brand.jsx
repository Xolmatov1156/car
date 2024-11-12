import React, { useEffect, useState } from "react";
import { useAxios } from "../../hook/useAxios";
import Delete from "../../assets/delete.svg";
import Edit from "../../assets/edit.svg";
import { toast } from "react-toastify";
import AddImg from "../../assets/add.png";
import Search from '../../assets/search.svg';
import useDebounce from "../../hook/useDebounce";

const Brand = () => {
  const [data, setData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [title, setTitle] = useState("");
  const [newTitle, setNewTitle] = useState("");
  const [imageSrc, setImageSrc] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const token = localStorage.getItem("token");
  const debouncedSearchTerm = useDebounce(searchTerm, 900);

  function getBrand() {
    useAxios()
      .get("/api/brands")
      .then((response) => {
        setData(response?.data?.data);
      });
  }

  useEffect(() => {
    getBrand();
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageSrc(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleAddBrand = (e) => {
    e.preventDefault();
    const formdata = new FormData();
    formdata.append("title", title);
    formdata.append("images", imageSrc);

    fetch("https://autoapi.dezinfeksiyatashkent.uz/api/brands", {
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
          getBrand();
          setShowModal(false);
          setImagePreview(null);
          resetForm();
        } else {
          toast.error(res?.message);
        }
      });
  };

  const handleDelete = (brandId) => {
    fetch(`https://autoapi.dezinfeksiyatashkent.uz/api/brands/${brandId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((res) => {
        if (res?.success) {
          toast.success(res?.message);
          getBrand();
        } else {
          toast.error(res?.message);
        }
      });
  };

  const handleEditBrand = (e) => {
    e.preventDefault();
    const formdata = new FormData();
    formdata.append("title", newTitle);
    if (imageSrc) formdata.append("images", imageSrc);

    fetch(`https://autoapi.dezinfeksiyatashkent.uz/api/brands/${selectedBrand.id}`, {
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
          getBrand();
          setShowModal(false);
          setSelectedBrand(null);
          setImagePreview(null);
          resetForm();
        } else {
          toast.error(res?.message);
        }
      });
  };

  const openEditModal = (brand) => {
    setSelectedBrand(brand);
    setNewTitle(brand.title);
    setImagePreview(
      `https://autoapi.dezinfeksiyatashkent.uz/api/uploads/images/${brand.image_src}`
    );
    setShowModal(true);
  };

  const resetForm = () => {
    setTitle("");
    setNewTitle("");
    setImageSrc("");
    setImagePreview(null);
  };

  const filteredData = data.filter((item) =>
    item.title.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
  );

  return (
    <div className="w-[80%] mx-auto mt-10">
      <div className="flex justify-between px-4">
        <h1 className="text-3xl font-semibold mb-4">Brand</h1>
        <label className="flex relative">
          <input
            type="text"
            className="border -z-10 border-gray-400 pr-8 pl-3 h-[40px] w-[200px] lg:w-[300px] rounded-lg outline-none"
            placeholder="Search Brand"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <img src={Search} alt="search" className="w-[22px] h-[22px] absolute right-1 top-2.5"/>
        </label>
        <button
          onClick={() => {
            setShowModal(true);
            setSelectedBrand(null);
            resetForm();
          }}
          className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
        >
          Add Brand
        </button>
      </div>

      <table className="min-w-full bg-white border border-gray-200 shadow-lg overflow-hidden">
        <thead>
          <tr className="bg-gray-200 text-gray-700 uppercase text-sm leading-normal">
            <th className="py-3 px-6 text-left">Title</th>
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
              <td className="py-3 px-6 text-left whitespace-nowrap">{item?.title}</td>
              <td className="py-3 px-6 text-left">
                <img
                  src={`https://autoapi.dezinfeksiyatashkent.uz/api/uploads/images/${item?.image_src}`}
                  alt={item?.title}
                  className="w-16 h-16 rounded-md object-contain"
                />
              </td>
              <td className="flex mt-5 gap-4 ml-4">
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
              {selectedBrand ? "Edit Brand" : "Add New Brand"}
            </h2>
            <form onSubmit={selectedBrand ? handleEditBrand : handleAddBrand}>
              <div className="mb-4">
                <label className="block text-gray-700">Title</label>
                <input
                  type="text"
                  className="w-full border border-gray-300 p-2 rounded"
                  value={selectedBrand ? newTitle : title}
                  onChange={(e) =>
                    selectedBrand ? setNewTitle(e.target.value) : setTitle(e.target.value)
                  }
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
              <div className="flex justify-between mt-5">
                <button
                  onClick={() => setShowModal(false)}
                  type="button"
                  className="bg-gray-500 text-white py-2 px-4 rounded"
                >
                  Cancel
                </button>
                <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">
                  {selectedBrand ? "Update" : "Add"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Brand;