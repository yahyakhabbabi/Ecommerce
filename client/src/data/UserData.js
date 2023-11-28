export const userDate=[
    { date: '2023-9-01', value: 10 },
  { date: '2023-10-02', value: 20 },
  { date: '2023-11-03', value: 15 },
]



const handleSave =  async (data, imageFile) => {
  try {
    const formData = new FormData();
    Object.keys(formData).forEach((key) => {
      formData.append(key, formData[key]);
    });

    if (imageFile) {
      formData.append("product_image", imageFile);
    }

    const response = await axios.post("http://localhost:3000/v1/products", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    console.log("Product created successfully:", response.data);
    // Handle success message or any other logic after product creation
  } catch (error) {
    console.error("Error creating product:", error);
    // Handle error
  }
};
