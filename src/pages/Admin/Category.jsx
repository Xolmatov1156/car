import React, { useEffect, useState } from "react";
import { useAxios } from "../../hook/useAxios";
import Delete from "../../assets/delete.svg";
import Edit from "../../assets/edit.svg";
import { toast } from "react-toastify";
import AddImg from "../../assets/add.png";
import Search from '../../assets/search.svg';
import useDebounce from "../../hook/useBebounce";

const Category = () => {
  const [data, setData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [newNameEn, setNewNameEn] = useState("");
  const [newNameRu, setNewNameRu] = useState("");
  const [imageSrc, setImageSrc] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const tokenbek = localStorage.getItem("token");
  const debouncedSearchTerm = useDebounce(searchTerm, 900);

  function getCategory() {
    useAxios()
      .get("/api/categories")
      .then((response) => {
        setData(response?.data?.data);
      });
  }

  useEffect(() => {
    getCategory();
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageSrc(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleAddCategory = (e) => {
    e.preventDefault();
    const formdata = new FormData();
    formdata.append("name_en", newNameEn);
    formdata.append("name_ru", newNameRu);
    formdata.append("images", imageSrc);

    fetch("https://autoapi.dezinfeksiyatashkent.uz/api/categories", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${tokenbek}`,
      },
      body: formdata,
    })
      .then((response) => response.json())
      .then((res) => {
        if (res?.success) {
          toast.success(res?.message);
          getCategory();
          setShowModal(false);
          setImagePreview(null);
          resetForm();
        } else {
          toast.error(res?.message);
        }
      });
  };

  const handleDelete = (categoryId) => {
    fetch(`https://autoapi.dezinfeksiyatashkent.uz/api/categories/${categoryId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${tokenbek}`,
      },
    })
      .then((response) => response.json())
      .then((res) => {
        if (res?.success) {
          toast.success(res?.message);
          getCategory();
        } else {
          toast.error(res?.message);
        }
      });
  };

  const handleEditCategory = (e) => {
    e.preventDefault();
    const formdata = new FormData();
    formdata.append("name_en", newNameEn); 
    formdata.append("name_ru", newNameRu); 
    if (imageSrc) formdata.append("images", imageSrc);

    fetch(
      `https://autoapi.dezinfeksiyatashkent.uz/api/categories/${selectedCategory.id}`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${tokenbek}`,
        },
        body: formdata,
      }
    )
      .then((response) => response.json())
      .then((res) => {
        if (res?.success) {
          toast.success(res?.message);
          getCategory();
          setShowModal(false);
          setSelectedCategory(null);
          setImagePreview(null);
          resetForm();
        } else {
          toast.error(res?.message);
        }
      });
  };

  const openEditModal = (category) => {
    setSelectedCategory(category);
    setNewNameEn(category.name_en);
    setNewNameRu(category.name_ru);
    setImagePreview(
      `https://autoapi.dezinfeksiyatashkent.uz/api/uploads/images/${category.image_src}`
    );
    setShowModal(true);
  };

  const resetForm = () => {
    setNewNameEn("");
    setNewNameRu("");
    setImageSrc("");
    setImagePreview(null);
  };

  const filteredData = data.filter((item) =>
    item.name_en.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
  );

  return (
    <div className="w-[80%] mx-auto mt-10">
      <div className="flex justify-between px-4">
        <h1 className="text-3xl font-semibold mb-4">Category</h1>
        <label className="flex relative">
          <input
            type="text"
            className="border border-gray-400 pr-8 pl-3 h-[40px] w-[200px] lg:w-[300px] rounded-lg outline-none"
            placeholder="Search Category"
            value={searchTerm} 
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <img src={Search} alt="search" className="w-[22px] h-[22px] absolute right-1 top-2.5"/>
        </label>
        <button
          onClick={() => {
            setShowModal(true);
            setSelectedCategory(null);
            resetForm();
          }}
          className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
        >
          Add Category
        </button>
      </div>

      <table className="min-w-full bg-white border border-gray-200 shadow-lg overflow-hidden">
        <thead>
          <tr className="bg-gray-200 text-gray-700 uppercase text-sm leading-normal">
            <th className="py-3 px-6 text-left">Name (EN)</th>
            <th className="py-3 px-6 text-left">Name (RU)</th>
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
                {item?.name_en}
              </td>
              <td className="py-3 px-6 text-left whitespace-nowrap">
                {item?.name_ru}
              </td>
              <td className="py-3 px-6 text-left">
                <img
                  src={`https://autoapi.dezinfeksiyatashkent.uz/api/uploads/images/${item?.image_src}`}
                  alt={item?.name_en}
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
              {selectedCategory ? "Edit Category" : "Add New Category"}
            </h2>
            <form onSubmit={selectedCategory ? handleEditCategory : handleAddCategory}>
              <div className="mb-4">
                <label className="block text-gray-700">Name (EN)</label>
                <input
                  type="text"
                  className="w-full border border-gray-300 p-2 rounded"
                  value={newNameEn}
                  onChange={(e) => setNewNameEn(e.target.value)}
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Name (RU)</label>
                <input
                  type="text"
                  className="w-full border border-gray-300 p-2 rounded"
                  value={newNameRu}
                  onChange={(e) => setNewNameRu(e.target.value)}
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
                </label>
                <div className="relative h-[180px] w-[100%] mx-auto border-2 border-dashed flex justify-center items-center cursor-pointer">
                  <img src={AddImg} alt="add"/>
                </div>
              </div>
              <div className="flex justify-between mt-5">
                <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">
                  {selectedCategory ? "Update" : "Add"}
                </button>
                <button
                  onClick={() => setShowModal(false)}
                  type="button"
                  className="bg-gray-500 text-white py-2 px-4 rounded"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Category;
