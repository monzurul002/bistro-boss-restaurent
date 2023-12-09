import { useForm } from "react-hook-form";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import Swal from "sweetalert2";

const AddItem = () => {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm()

    const image_hosting_token = import.meta.env.VITE_image_upload_token;
    const image_hosting_url = `https://api.imgbb.com/1/upload?key=${image_hosting_token}`
    const onSubmit = (data) => {
        const formData = new FormData()
        formData.append("image", data.image[0])
        fetch(image_hosting_url, {
            method: "POST",
            body: formData
        })
            .then(res => res.json())
            .then(imageResponse => {
                if (imageResponse.success) {
                    const img_url = imageResponse.data.url
                    const { name, price, category, recipe } = data;
                    const newItem = { name, price: parseFloat(price), category, recipe, image: img_url }
                    fetch("http://localhost:5000/menu", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            authorization: `Bearer ${localStorage.getItem("token")}`
                        },
                        body: JSON.stringify(newItem)

                    })
                        .then(res => res.json())
                        .then(addedData => {
                            if (addedData.insertedId) {
                                reset()
                                return Swal.fire({
                                    title: "Item has been added.",
                                    showClass: {
                                        popup: `
                                        animate__animated
                                        animate__fadeInUp
                                        animate__faster
                                      `
                                    },
                                    hideClass: {
                                        popup: `
                                        animate__animated
                                        animate__fadeOutDown
                                        animate__faster
                                      `
                                    }
                                });
                            }
                        })

                }
            })
    }


    return (
        <div className="mx-10">
            <SectionTitle heading="Add an Item" subHeading="What's New!"></SectionTitle>
            <div className="w-full mx-auto">
                <form onSubmit={handleSubmit(onSubmit)}>

                    <label className="form-control ">
                        <div className="label">
                            <span className="label-text">What is your name?<span className="text-red-600 font-bold mb-2">*</span></span>
                        </div>
                        <input type="text"  {...register("name", { required: true })} placeholder="Type here" className="input input-bordered  " />

                    </label>
                    <div className="flex gap-3">
                        {/* category */}
                        <label className="form-control w-full ">
                            <div className="label">
                                <span className="label-text">Category <span className="text-red-600 font-bold mb-2">*</span> </span>

                            </div>
                            <select {...register("category", { required: true })} className="select select-bordered">
                                <option disabled defaultValue>Choose one <span className="text-red-600 font-bold mb-2">*</span></option>
                                <option>Pizza</option>
                                <option>Soup</option>
                                <option>Salad</option>
                                <option>Drinks</option>
                                <option>Desserts</option>

                            </select>

                        </label>
                        {/* price  */}
                        <label className="form-control w-full ">
                            <div className="label">
                                <span className="label-text">Price <span className="text-red-600 font-bold mb-2">*</span></span>
                            </div>
                            <input type="number" {...register("price", { required: true })} placeholder="Type here" className="input input-bordered w-full " />

                        </label>
                    </div>

                    {/* text area */}

                    <label className="form-control my-3 ">
                        <div className="label">
                            <span className="label-text">Recipe Details</span>

                        </div>
                        <textarea {...register("recipe", { required: true })} className="textarea textarea-bordered h-24" placeholder="Bio"></textarea>

                    </label>

                    {/* file uplaod */}
                    <label className="form-control w-full ">
                        <div className="label">
                            <span className="label-text">Upload Image*</span>

                        </div>
                        <input type="file" {...register("image", { required: true })} className="file-input file-input-bordered w-full " />

                    </label>

                    <input className="btn btn-primary mt-4" type="submit" value="Add Item" />
                </form>
            </div>
        </div>
    );
};

export default AddItem;