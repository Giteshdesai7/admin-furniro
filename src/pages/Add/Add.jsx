import React, { useState } from 'react'
import './Add.css'
import { assets } from '../../assets/assets'
import axios from "axios"

const Add = ({url}) => {
  const[image, setImage] = useState(false);
  const[additionalImages, setAdditionalImages] = useState([]);
  const[descriptionImage1, setDescriptionImage1] = useState(false);
  const[descriptionImage2, setDescriptionImage2] = useState(false);
  const[availableColors, setAvailableColors] = useState([]);
  const[availableSizes, setAvailableSizes] = useState([]);
  const[isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState({
    // Basic Information
    name: "",
    description: "",
    detailedDescription: "",
    additionalInformation: "",
    price: "",
    category: "Sofa",
    stock: 0,
    sku: "",
    tags: "",
    
    // General Information
    salesPackage: "",
    modelNumber: "",
    secondaryMaterial: "",
    configuration: "",
    upholsteryMaterial: "",
    upholsteryColor: "",
    
    // Product Information
    fillingMaterial: "",
    finishType: "",
    adjustableHeadrest: "",
    maximumLoadCapacity: "",
    originOfManufacture: "",
    
    // Dimensions
    width: "",
    height: "",
    depth: "",
    weight: "",
    seatHeight: "",
    legHeight: "",
    
    // Warranty
    warrantySummary: "",
    warrantyServiceType: "",
    coveredInWarranty: "",
    notCoveredInWarranty: "",
    domesticWarranty: ""
  })

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData(data => ({...data, [name]: value}))
  }

  const handleAdditionalImages = (event) => {
    const files = Array.from(event.target.files);
    setAdditionalImages(prev => [...prev, ...files].slice(0, 3)); // Limit to 3 additional images
  }

  const removeAdditionalImage = (index) => {
    setAdditionalImages(prev => prev.filter((_, i) => i !== index));
  }

  const addColor = () => {
    setAvailableColors(prev => [...prev, { name: '', color: '#000000' }]);
  }

  const removeColor = (index) => {
    setAvailableColors(prev => prev.filter((_, i) => i !== index));
  }

  const updateColor = (index, field, value) => {
    setAvailableColors(prev => prev.map((color, i) => 
      i === index ? { ...color, [field]: value } : color
    ));
  }

  const addSize = () => {
    setAvailableSizes(prev => [...prev, { type: '' }]);
  }

  const removeSize = (index) => {
    setAvailableSizes(prev => prev.filter((_, i) => i !== index));
  }

  const updateSize = (index, value) => {
    setAvailableSizes(prev => prev.map((size, i) => 
      i === index ? { ...size, type: value } : size
    ));
  }

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    
    console.log("Form submitted with data:", data);
    console.log("Image:", image);
    console.log("Additional images:", additionalImages);
    console.log("Available colors:", availableColors);
    console.log("Available sizes:", availableSizes);
    
    try {
      
      const formData = new FormData();
    
    // Basic Information
    formData.append("name", data.name)
    formData.append("description", data.description)
    formData.append("detailedDescription", data.detailedDescription)
    formData.append("additionalInformation", data.additionalInformation)
    formData.append("price", Number(data.price))
    formData.append("category", data.category)
    formData.append("stock", Number(data.stock))
    formData.append("sku", data.sku)
    formData.append("tags", data.tags)
    formData.append("image", image)
    
    // Add additional images
    additionalImages.forEach((file, index) => {
      formData.append("additionalImages", file)
    })
    
    // Add description images
    if (descriptionImage1) {
      formData.append("descriptionImage1", descriptionImage1)
    }
    if (descriptionImage2) {
      formData.append("descriptionImage2", descriptionImage2)
    }
    
    // Add available colors
    formData.append("availableColors", JSON.stringify(availableColors))
    
    // Add available sizes
    formData.append("availableSizes", JSON.stringify(availableSizes))
    
    // General Information
    formData.append("salesPackage", data.salesPackage)
    formData.append("modelNumber", data.modelNumber)
    formData.append("secondaryMaterial", data.secondaryMaterial)
    formData.append("configuration", data.configuration)
    formData.append("upholsteryMaterial", data.upholsteryMaterial)
    formData.append("upholsteryColor", data.upholsteryColor)
    
    // Product Information
    formData.append("fillingMaterial", data.fillingMaterial)
    formData.append("finishType", data.finishType)
    formData.append("adjustableHeadrest", data.adjustableHeadrest)
    formData.append("maximumLoadCapacity", data.maximumLoadCapacity)
    formData.append("originOfManufacture", data.originOfManufacture)
    
    // Dimensions
    formData.append("width", data.width)
    formData.append("height", data.height)
    formData.append("depth", data.depth)
    formData.append("weight", data.weight)
    formData.append("seatHeight", data.seatHeight)
    formData.append("legHeight", data.legHeight)
    
    // Warranty
    formData.append("warrantySummary", data.warrantySummary)
    formData.append("warrantyServiceType", data.warrantyServiceType)
    formData.append("coveredInWarranty", data.coveredInWarranty)
    formData.append("notCoveredInWarranty", data.notCoveredInWarranty)
    formData.append("domesticWarranty", data.domesticWarranty)
    
      console.log("Sending request to:", `${url}/api/product/add`);
      const response = await axios.post(`${url}/api/product/add`, formData)
      console.log("Response received:", response.data);
    if(response.data.success){
      setData({
          name: "",
          description: "",
          detailedDescription: "",
          additionalInformation: "",
          price: "",
          category: "Sofa",
          stock: 0,
          sku: "",
          tags: "",
          salesPackage: "",
          modelNumber: "",
          secondaryMaterial: "",
          configuration: "",
          upholsteryMaterial: "",
          upholsteryColor: "",
          fillingMaterial: "",
          finishType: "",
          adjustableHeadrest: "",
          maximumLoadCapacity: "",
          originOfManufacture: "",
          width: "",
          height: "",
          depth: "",
          weight: "",
          seatHeight: "",
          legHeight: "",
          warrantySummary: "",
          warrantyServiceType: "",
          coveredInWarranty: "",
          notCoveredInWarranty: "",
          domesticWarranty: ""
      })
            setImage(false)
            setAdditionalImages([])
            setDescriptionImage1(false)
            setDescriptionImage2(false)
            setAvailableColors([])
            setAvailableSizes([])
        console.log(response.data.message)
        alert("Product added successfully!")
    }
    else{
        console.log(response.data.message)
        alert("Failed to add product: " + response.data.message)
      }
    } catch (error) {
      console.log("Error uploading product:", error)
      console.log("Error response:", error.response?.data)
      console.log("Error status:", error.response?.status)
      alert("Error uploading product: " + (error.response?.data?.message || error.message))
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className='add'>
        <form className='flex-col' onSubmit={onSubmitHandler}>
            {/* Basic Information Section */}
            <div className="section-header">
                <h2>Basic Information</h2>
            </div>
            
            <div className="add-img-upload flex-col">
                <p>Upload Primary Image (for product cards)</p>
            <label htmlFor='image'> 
                <img src={image?URL.createObjectURL(image):assets.upload_area} alt="" />
            </label>
            <input onChange={(e)=>setImage(e.target.files[0])} type="file" id="image" hidden required />
            </div>
            
            <div className="add-img-upload flex-col">
                <p>Upload Additional Images (for product description page) - Max 3</p>
                <div className="additional-images-container">
                    {additionalImages.map((file, index) => (
                        <div key={index} className="additional-image-item">
                            <img src={URL.createObjectURL(file)} alt={`Additional ${index + 1}`} />
                            <button type="button" onClick={() => removeAdditionalImage(index)} className="remove-image-btn">×</button>
                        </div>
                    ))}
                    {additionalImages.length < 3 && (
                        <label htmlFor='additionalImages' className="additional-image-upload">
                            <img src={assets.upload_area} alt="Upload additional image" />
                        </label>
                    )}
                </div>
                <input 
                    onChange={handleAdditionalImages} 
                    type="file" 
                    id="additionalImages" 
                    multiple 
                    accept="image/*"
                    hidden 
                />
            </div>
            
            <div className="add-product-name flex-col">
                <p>Product Name</p>
                <input onChange={onChangeHandler} value={data.name} type="text" name='name' placeholder='Type-Here' required/>
            </div>

            <div className="add-product-description flex-col">
                <p>Product Description</p>
                <textarea onChange={onChangeHandler} value={data.description} name="description" rows="6" placeholder='Write Description here' required></textarea>
            </div>
            
            <div className="add-field flex-col">
                <p>Detailed Description</p>
                <textarea onChange={onChangeHandler} value={data.detailedDescription} name="detailedDescription" rows="5" placeholder='Detailed product description for the Description tab'></textarea>
            </div>
            
            <div className="add-field flex-col">
                <p>Additional Information</p>
                <textarea onChange={onChangeHandler} value={data.additionalInformation} name="additionalInformation" rows="5" placeholder='Additional product information for the Additional Information tab'></textarea>
            </div>
            
            <div className="add-img-upload flex-col">
                <p>Upload Description Image 1 (for Description tab)</p>
                <label htmlFor='descriptionImage1'> 
                    <img src={descriptionImage1?URL.createObjectURL(descriptionImage1):assets.upload_area} alt="" />
                </label>
                <input onChange={(e)=>setDescriptionImage1(e.target.files[0])} type="file" id="descriptionImage1" hidden />
            </div>
            
            <div className="add-img-upload flex-col">
                <p>Upload Description Image 2 (for Description tab)</p>
                <label htmlFor='descriptionImage2'> 
                    <img src={descriptionImage2?URL.createObjectURL(descriptionImage2):assets.upload_area} alt="" />
                </label>
                <input onChange={(e)=>setDescriptionImage2(e.target.files[0])} type="file" id="descriptionImage2" hidden />
            </div>
            
            <div className="add-field flex-col">
                <p>Available Colors</p>
                <div className="colors-container">
                    {availableColors.map((color, index) => (
                        <div key={index} className="color-item">
                            <input 
                                type="text" 
                                placeholder="Color name (e.g., Brown)" 
                                value={color.name}
                                onChange={(e) => updateColor(index, 'name', e.target.value)}
                                className="color-name-input"
                            />
                            <input 
                                type="color" 
                                value={color.color}
                                onChange={(e) => updateColor(index, 'color', e.target.value)}
                                className="color-picker"
                            />
                            <button type="button" onClick={() => removeColor(index)} className="remove-color-btn">×</button>
                        </div>
                    ))}
                    <button type="button" onClick={addColor} className="add-color-btn">+ Add Color</button>
                </div>
            </div>
            
            <div className="add-field flex-col">
                <p>Available Sizes</p>
                <div className="sizes-container">
                    {availableSizes.map((size, index) => (
                        <div key={index} className="size-item">
                            <input 
                                type="text" 
                                placeholder="Size (e.g., L, XL, S, M)" 
                                value={size.type}
                                onChange={(e) => updateSize(index, e.target.value)}
                                className="size-input"
                            />
                            <button type="button" onClick={() => removeSize(index)} className="remove-size-btn">×</button>
                        </div>
                    ))}
                    <button type="button" onClick={addSize} className="add-size-btn">+ Add Size</button>
                </div>
            </div>
            
            <div className="add-category-price">
                <div className="add-category flex-col">
                    <p>Product Category</p>
                    <select onChange={onChangeHandler} name="category" value={data.category}>
                        <option value="Sofa">Sofa</option>
                        <option value="Chair">Chair</option>
                        <option value="Table">Table</option>
                        <option value="Bed">Bed</option>
                        <option value="Cabinet">Cabinet</option>
                        <option value="Dining">Dining</option>
                        <option value="Living">Living</option>
                        <option value="Bedroom">Bedroom</option>
                        <option value="Office">Office</option>
                    </select>
                </div>
                <div className="add-price flex-col">
                    <p>Product Price</p>
                    <input onChange={onChangeHandler} value={data.price} type="Number" name="price" placeholder='₹ 200' required/>
                </div>
            </div>
            
            <div className="add-stock flex-col">
                <p>Initial Stock</p>
                <input onChange={onChangeHandler} value={data.stock} type="Number" min="0" name="stock" placeholder='0'/>
            </div>
            
            <div className="form-row">
                <div className="add-field flex-col">
                    <p>SKU</p>
                    <input onChange={onChangeHandler} value={data.sku} type="text" name="sku" placeholder='e.g., SS001'/>
                </div>
                <div className="add-field flex-col">
                    <p>Tags (comma separated)</p>
                    <input onChange={onChangeHandler} value={data.tags} type="text" name="tags" placeholder='e.g., Sofa, Chair, Home, Shop'/>
                </div>
            </div>
            

            {/* General Information Section */}
            <div className="section-header">
                <h2>General Information</h2>
            </div>
            
            <div className="form-row">
                <div className="add-field flex-col">
                    <p>Sales Package</p>
                    <input onChange={onChangeHandler} value={data.salesPackage} type="text" name="salesPackage" placeholder='e.g., 1 Sofa Set'/>
                </div>
                <div className="add-field flex-col">
                    <p>Model Number</p>
                    <input onChange={onChangeHandler} value={data.modelNumber} type="text" name="modelNumber" placeholder='e.g., SOFA-001'/>
                </div>
            </div>
            
            <div className="form-row">
                <div className="add-field flex-col">
                    <p>Secondary Material</p>
                    <input onChange={onChangeHandler} value={data.secondaryMaterial} type="text" name="secondaryMaterial" placeholder='e.g., Metal, Plastic'/>
                </div>
                <div className="add-field flex-col">
                    <p>Configuration</p>
                    <input onChange={onChangeHandler} value={data.configuration} type="text" name="configuration" placeholder='e.g., 3+2+1'/>
                </div>
            </div>
            
            <div className="form-row">
                <div className="add-field flex-col">
                    <p>Upholstery Material</p>
                    <input onChange={onChangeHandler} value={data.upholsteryMaterial} type="text" name="upholsteryMaterial" placeholder='e.g., Fabric, Leather'/>
                </div>
                <div className="add-field flex-col">
                    <p>Upholstery Color</p>
                    <input onChange={onChangeHandler} value={data.upholsteryColor} type="text" name="upholsteryColor" placeholder='e.g., Brown, Black'/>
                </div>
            </div>

            {/* Product Information Section */}
            <div className="section-header">
                <h2>Product Information</h2>
            </div>
            
            <div className="form-row">
                <div className="add-field flex-col">
                    <p>Filling Material</p>
                    <input onChange={onChangeHandler} value={data.fillingMaterial} type="text" name="fillingMaterial" placeholder='e.g., Foam, Feather'/>
                </div>
                <div className="add-field flex-col">
                    <p>Finish Type</p>
                    <input onChange={onChangeHandler} value={data.finishType} type="text" name="finishType" placeholder='e.g., Matte, Glossy'/>
                </div>
            </div>
            
            <div className="form-row">
                <div className="add-field flex-col">
                    <p>Adjustable Headrest</p>
                    <select onChange={onChangeHandler} name="adjustableHeadrest" value={data.adjustableHeadrest}>
                        <option value="">Select</option>
                        <option value="Yes">Yes</option>
                        <option value="No">No</option>
                    </select>
                </div>
                <div className="add-field flex-col">
                    <p>Maximum Load Capacity</p>
                    <input onChange={onChangeHandler} value={data.maximumLoadCapacity} type="text" name="maximumLoadCapacity" placeholder='e.g., 150 kg'/>
                </div>
            </div>
            
            <div className="add-field flex-col">
                <p>Origin of Manufacture</p>
                <input onChange={onChangeHandler} value={data.originOfManufacture} type="text" name="originOfManufacture" placeholder='e.g., India'/>
            </div>

            {/* Dimensions Section */}
            <div className="section-header">
                <h2>Dimensions</h2>
            </div>
            
            <div className="form-row">
                <div className="add-field flex-col">
                    <p>Width (cm)</p>
                    <input onChange={onChangeHandler} value={data.width} type="Number" name="width" placeholder='e.g., 200'/>
                </div>
                <div className="add-field flex-col">
                    <p>Height (cm)</p>
                    <input onChange={onChangeHandler} value={data.height} type="Number" name="height" placeholder='e.g., 80'/>
                </div>
            </div>
            
            <div className="form-row">
                <div className="add-field flex-col">
                    <p>Depth (cm)</p>
                    <input onChange={onChangeHandler} value={data.depth} type="Number" name="depth" placeholder='e.g., 90'/>
                </div>
                <div className="add-field flex-col">
                    <p>Weight (kg)</p>
                    <input onChange={onChangeHandler} value={data.weight} type="Number" name="weight" placeholder='e.g., 50'/>
                </div>
            </div>
            
            <div className="form-row">
                <div className="add-field flex-col">
                    <p>Seat Height (cm)</p>
                    <input onChange={onChangeHandler} value={data.seatHeight} type="Number" name="seatHeight" placeholder='e.g., 45'/>
                </div>
                <div className="add-field flex-col">
                    <p>Leg Height (cm)</p>
                    <input onChange={onChangeHandler} value={data.legHeight} type="Number" name="legHeight" placeholder='e.g., 15'/>
                </div>
            </div>

            {/* Warranty Section */}
            <div className="section-header">
                <h2>Warranty</h2>
            </div>
            
            <div className="add-field flex-col">
                <p>Warranty Summary</p>
                <textarea onChange={onChangeHandler} value={data.warrantySummary} name="warrantySummary" rows="3" placeholder='Brief warranty summary'></textarea>
            </div>
            
            <div className="form-row">
                <div className="add-field flex-col">
                    <p>Warranty Service Type</p>
                    <input onChange={onChangeHandler} value={data.warrantyServiceType} type="text" name="warrantyServiceType" placeholder='e.g., On-site, Pick-up'/>
                </div>
                <div className="add-field flex-col">
                    <p>Domestic Warranty</p>
                    <input onChange={onChangeHandler} value={data.domesticWarranty} type="text" name="domesticWarranty" placeholder='e.g., 1 Year'/>
                </div>
            </div>
            
            <div className="add-field flex-col">
                <p>Covered in Warranty</p>
                <textarea onChange={onChangeHandler} value={data.coveredInWarranty} name="coveredInWarranty" rows="3" placeholder='What is covered in warranty'></textarea>
            </div>
            
            <div className="add-field flex-col">
                <p>Not Covered in Warranty</p>
                <textarea onChange={onChangeHandler} value={data.notCoveredInWarranty} name="notCoveredInWarranty" rows="3" placeholder='What is not covered in warranty'></textarea>
            </div>

            <button type="submit" className='add-btn' disabled={isLoading}>
              {isLoading ? (
                <>
                  <span className="loading-spinner"></span>
                  UPLOADING...
                </>
              ) : (
                'ADD PRODUCT'
              )}
            </button>
        </form>
    </div>
  )
}

export default Add