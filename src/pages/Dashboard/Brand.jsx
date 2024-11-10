import React, { useEffect, useState } from "react";
import { useAxios } from "../../hook/useAxios";
import Delete from "../../assets/delete.svg";
import Edit from "../../assets/edit.svg";
import { toast } from "react-toastify";
import AddImg from "../../assets/add.png";

const Brand = () => {
  const [data, setData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

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

  const [title, setTitle] = useState("");
  const [imageSrc, setImageSrc] = useState("");
  const token = localStorage.getItem("token");

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
    formdata.append("title", selectedBrand.title);
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
    setTitle(brand.title);
    setImagePreview(`https://autoapi.dezinfeksiyatashkent.uz/api/uploads/images/${brand.image_src}`);
    setShowModal(true);
  };

  const resetForm = () => {
    setTitle("");
    setImageSrc("");
    setImagePreview(null);
  };

  return (
    <div className="w-[80%] mx-auto mt-10">
      <div className="flex justify-between px-4">
        <h1 className="text-3xl font-semibold mb-4">Brand</h1>
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
          {data?.map((item, index) => (
            <tr key={index} className="border-b border-gray-200 hover:bg-gray-100 transition duration-200">
              <td className="py-3 px-6 text-left whitespace-nowrap">{item?.title}</td>
              <td className="py-3 px-6 text-left">
                <img
                  src={`https://autoapi.dezinfeksiyatashkent.uz/api/uploads/images/${item?.image_src}`}
                  alt={item?.title}
                  className="w-16 h-16 rounded-md object-contain"
                />
              </td>
              <td className="flex mt-5 gap-4 ml-4">
                <img src={Edit} alt="edit" className="cursor-pointer" onClick={() => openEditModal(item)} />
                <button onClick={() => handleDelete(item?.id)}>
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
                  value={selectedBrand?.title || title}
                  onChange={(e) =>
                    selectedBrand
                      ? setSelectedBrand({ ...selectedBrand, title: e.target.value })
                      : setTitle(e.target.value)
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
              <div className="flex justify-between mt-6">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 text-white bg-red-500 rounded"
                >
                  Cancel
                </button>
                <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">
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
