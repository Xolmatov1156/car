import React, { useEffect, useState } from "react";
import { useAxios } from "../../hook/useAxios";
import Delete from "../../assets/delete.svg";
import Edit from "../../assets/edit.svg";
import { toast } from "react-toastify";
import Search from '../../assets/search.svg';
import useDebounce from "../../hook/useDebounce";

const Car = () => {
  const [data, setData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedCar, setSelectedCar] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const token = localStorage.getItem("token");
  const debouncedSearchTerm = useDebounce(searchTerm, 900);
  const [brand, setBrand] = useState([]);
  const [brandId, setBrandId] = useState("");
  const [model, setModel] = useState([]);
  const [modelId, setModelId] = useState("");
  const [city, setCity] = useState([]);
  const [cityId, setCityId] = useState("");
  const [location, setLocation] = useState([]);
  const [locationId, setLocationId] = useState("");
  const [category, setCategory] = useState([]);
  const [categoryId, setCategoryId] = useState("");
  const [color, setColor] = useState("");
  const [year, setYear] = useState("");
  const [seconds, setSeconds] = useState("");
  const [maxspeed, setMaxspeed] = useState("");
  const [maxpeople, setMaxpeople] = useState("");
  const [transmission, setTransmission] = useState("");
  const [motor, setMotor] = useState("")
  const [driveside, setDriveside] = useState("")
  const [petrol, setPetrol] = useState("")
  const [limitperday, setLimitperday] = useState("")
  const [deposit, setDeposit] = useState("")
  const [premiumprotection, setPremiumprotection] = useState("")
  const [priceinaed, setPriceinaed] = useState("")
  const [priceinaedsale, setPriceinaedsale] = useState("")
  const [priceinusdsale, setPriceinusdsale] = useState("")
  const [cover, setCover] = useState("")
  const [images, setImages] = useState("")
  const [images2, setImages2] = useState("")
  const [inclusive, setInclusive] = useState(Boolean)


  function getCar() {
    useAxios()
      .get("/api/cars")
      .then((response) => {
        setData(response?.data?.data);
      });
  }

  
  function getBrand() {
    useAxios()
      .get("/api/brands")
      .then((response) => {
        setBrand(response?.data?.data);
      });
  }

  function getModel() {
    useAxios()
      .get("/api/models")
      .then((response) => {
        setModel(response?.data?.data);
      });
  }

  
  function getCity() {
    useAxios()
      .get("/api/cities")
      .then((response) => {
        setCity(response?.data?.data);
      });
  }

  function getLocation() {
    useAxios()
      .get("/api/locations")
      .then((response) => {
        setLocation(response?.data?.data);
      });
  }
  function getCategory() {
    useAxios()
      .get("/api/categories")
      .then((response) => {
        setCategory(response?.data?.data);
      });
  }

  useEffect(() => {
    getBrand();
    getModel();
    getCity();
    getCar();
    getLocation();
    getCategory();
  }, []);

  const handleAddCar = (e) => {
    
  };

  const handleDelete = (carId) => {
    fetch(`https://autoapi.dezinfeksiyatashkent.uz/api/cars/${carId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((res) => {
        if (res?.success) {
          toast.success(res?.message);
          getCar();
        } else {
          toast.error(res?.message);
        }
      });
  };
  

  const handleEditCar = (e) => {
    
  };

  const openEditModal = () => {
    
  };

  const resetForm = () => {
    
  };

  

  return (
    <div className="w-[80%] mx-auto mt-10">
      <div className="flex justify-between px-4">
        <h1 className="text-3xl font-semibold mb-4">Car</h1>
        <label className="flex relative">
          <input
            type="text"
            className="border -z-10 border-gray-400 pr-8 pl-3 h-[40px] w-[200px] lg:w-[300px] rounded-lg outline-none"
            placeholder="Search Car"
            value={searchTerm}
          />
          <img src={Search} alt="search" className="w-[22px] h-[22px] absolute right-1 top-2.5"/>
        </label>
        <button
          onClick={() => {
            setShowModal(true);
            setSelectedCar(null);
            resetForm();
          }}
          className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
        >
          Add Car
        </button>
      </div>

      <table className="min-w-full bg-white border border-gray-200 shadow-lg overflow-hidden">
        <thead>
          <tr className="bg-gray-200 text-gray-700 uppercase text-sm leading-normal">
            <th className="py-3 px-6 text-left">Brand</th>
            <th className="py-3 px-6 text-left">Model</th>
            <th className="py-3 px-6 text-left">City</th>
            <th className="py-3 px-6 text-left">Location</th>
            <th className="py-3 px-6 text-left">Color</th>
            <th className="py-3 px-6 text-left">Action</th>
          </tr>
        </thead>
        <tbody className="text-gray-600 text-sm font-light">
          {data?.map((item, index) => (
            <tr
              key={index}
              className="border-b border-gray-200 hover:bg-gray-100 transition duration-200"
            >
              <td className="py-3 px-6 text-left whitespace-nowrap">{item?.brand?.title}</td>
              <td className="py-3 px-6 text-left whitespace-nowrap">{item?.model?.name}</td>
              <td className="py-3 px-6 text-left whitespace-nowrap">{item?.city?.name}</td>
              <td className="py-3 px-6 text-left whitespace-nowrap">{item?.location?.name}</td>
              <td className="py-3 px-6 text-left whitespace-nowrap">{item?.color}</td>
              <td className="flex gap-4 ml-4 py-3">
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
          <div className="bg-white rounded-lg p-6 !w-[1100px] h-[75vh] sm:w-[400px]">
            <h2 className="text-xl font-semibold mb-4 text-center">
              {selectedCar ? "Edit Car" : "Add New Car"}
            </h2>
            <form onSubmit={selectedCar ? handleEditCar : handleAddCar}>
              <div className="flex gap-4 flex-wrap">
              <label className="mt-3 flex flex-col">Brand
              <select
                      value={brandId}
                      onChange={(e) => setBrandId(e.target.value)}
                      className="w-[250px] border border-gray-300 p-2 rounded"
                    >
                      <option value="" disabled>
                        Select a Brand
                      </option>
                      {brand?.map((item, index) => (
                        <option key={index} value={item.id}>
                          {item.title}
                        </option>
                      ))}
                    </select>
              </label>
              <label className="mt-3 flex flex-col">Model
              <select
                      value={modelId}
                      onChange={(e) => setModelId(e.target.value)}
                      className="w-[250px] border border-gray-300 p-2 rounded"
                    >
                      <option value="" disabled>
                        Select a Model
                      </option>
                      {model?.map((item, index) => (
                        <option key={index} value={item.id}>
                          {item?.name}
                        </option>
                      ))}
                    </select>
              </label>
              <label className="mt-3 flex flex-col">City
              <select
                      value={cityId}
                      onChange={(e) => setCityId(e.target.value)}
                      className="w-[250px] border border-gray-300 p-2 rounded"
                    >
                      <option value="" disabled>
                        Select a City
                      </option>
                      {city?.map((item, index) => (
                        <option key={index} value={item.id}>
                          {item?.name}
                        </option>
                      ))}
                    </select>
              </label>
              <label className="mt-3 flex flex-col">Location
              <select
                      value={locationId}
                      onChange={(e) => setLocationId(e.target.value)}
                      className="w-[250px] border border-gray-300 p-2 rounded"
                    >
                      <option value="" disabled>
                        Select a Location
                      </option>
                      {location?.map((item, index) => (
                        <option key={index} value={item.id}>
                          {item?.name}
                        </option>
                      ))}
                    </select>
              </label>
              <label className=" flex flex-col">Category
              <select
                      value={categoryId}
                      onChange={(e) => setCategoryId(e.target.value)}
                      className="w-[250px] border border-gray-300 p-2 rounded"
                    >
                      <option value="" disabled>
                        Select a Category
                      </option>
                      {category?.map((item, index) => (
                        <option key={index} value={item.id}>
                          {item?.name_en}
                        </option>
                      ))}
                    </select>
              </label>
              
              <label className=" flex flex-col">
                Color
                <input
                  type="text" 
                  className="w-[250px] border border-gray-300 p-1.5 outline-none rounded"
                />
              </label>
              <label className=" flex flex-col">
                Year
                <input
                  type="text" 
                  className="w-[250px] border border-gray-300 p-1.5 outline-none rounded"
                />
              </label>
              <label className=" flex flex-col">
                Seconds
                <input
                  type="text" 
                  className="w-[250px] border border-gray-300 p-1.5 outline-none rounded"
                />
              </label>
              <label className=" flex flex-col">
              Max speed
                <input
                  type="text" 
                  className="w-[250px] border border-gray-300 p-1.5 outline-none rounded"
                />
              </label>
              <label className=" flex flex-col">
              Max people
                <input
                  type="text" 
                  className="w-[250px] border border-gray-300 p-1.5 outline-none rounded"
                />
              </label>
              <label className=" flex flex-col">
              Transmission
                <input
                  type="text" 
                  className="w-[250px] border border-gray-300 p-1.5 outline-none rounded"
                />
              </label>
              <label className=" flex flex-col">
              Motor
                <input
                  type="text" 
                  className="w-[250px] border border-gray-300 p-1.5 outline-none rounded"
                />
              </label>
              <label className=" flex flex-col">
              Drive side
                <input
                  type="text" 
                  className="w-[250px] border border-gray-300 p-1.5 outline-none rounded"
                />
              </label>
              <label className=" flex flex-col">
              Petrol
                <input
                  type="text" 
                  className="w-[250px] border border-gray-300 p-1.5 outline-none rounded"
                />
              </label>
              <label className=" flex flex-col">
              Limitperday
                <input
                  type="text" 
                  className="w-[250px] border border-gray-300 p-1.5 outline-none rounded"
                />
              </label>
              <label className=" flex flex-col">
              Deposit
                <input
                  type="text" 
                  className="w-[250px] border border-gray-300 p-1.5 outline-none rounded"
                />
              </label>
              <label className=" flex flex-col">
              Premium protection
                <input
                  type="text" 
                  className="w-[250px] border border-gray-300 p-1.5 outline-none rounded"
                />
              </label>
              <label className=" flex flex-col">
              Price in aed
                <input
                  type="text" 
                  className="w-[250px] border border-gray-300 p-1.5 outline-none rounded"
                />
              </label>
              <label className=" flex flex-col">
              Price in aed sale
                <input
                  type="text" 
                  className="w-[250px] border border-gray-300 p-1.5 outline-none rounded"
                />
              </label>
              <label className=" flex flex-col">
              Price in usd sale
                <input
                  type="text" 
                  className="w-[250px] border border-gray-300 p-1.5 outline-none rounded"
                />
              </label>
              
              <label>
                <p className="text-gray-500 border border-gray-300 p-2.5 rounded mt-4">Upload Cover Image</p>
              <input type="file" className="w-[250px] hidden border border-gray-300 p-1.5 outline-none rounded"/>
              </label>
              <label>
                <p className="text-gray-500 border border-gray-300 p-2.5 rounded mt-4">Upload Image</p>
              <input type="file" className="w-[250px] hidden border border-gray-300 p-1.5 outline-none rounded"/>
              </label>
              <label>
                <p className="text-gray-500 border border-gray-300 p-2.5 rounded mt-4">Upload Image</p>
              <input type="file" className="w-[250px] hidden border border-gray-300 p-1.5 outline-none rounded"/>
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
                  {selectedCar ? "Update" : "Add"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Car;
