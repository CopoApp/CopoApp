// import { useForm } from "react-hook-form"

export default function NewComment () {
    const {register, handleSubmit, watch } = useForm();

    console.log(watch("images"))

    const onSubmit = (formData) => {
        console.log(formData)
    }

    return <>
        <form onSubmit={handleSubmit(onSubmit)}>
            <input {...register("content")} placeholder="Enter Comment" />
            <input type="file"
                accept="image/*"
                multiple
                {...register("images")} />
            <input type="submit" />
        </form>
    </>
}