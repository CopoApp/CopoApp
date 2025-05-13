import { useState, useEffect, useContext } from "react"
import { getUser } from "../adapters/user-adapter"
import CurrentUserContext from "../contexts/current-user-context";
import FileAttachmentButton from "./FileAttachmentButton";

export default Comment = () => {
    const { currentUser, setCurrentUser } = useContext(CurrentUserContext);
    const [userInformation, setUserInformation] = useState([]) 
    // State to manage attached files
    const [fileData, setFileData] = useState([]);
    // State to manage the data entered in the form
    const [formData, setFormData] = useState('');
    // State to manage the preview images when user attaches an image
    const [preview, setPreview] = useState([])

    useEffect(() => {
        const loadUserInformation = async () => {
            const [userInformation, error] = await getUser(currentUser.id)
            if (error) return
            setUserInformation(userInformation)
        }
        loadUserInformation();
    }, [currentUser])
    
    const handleChange = (event) => {
        const { content } = event.target.value
        const { type, files } = event.target;
        
        const img = files?.[0]

        // Render preview of attached images
        if (img) setPreview([...preview, URL.createObjectURL(img) ])

        if (type === "file") {
          setFileData([...fileData, files[0]]);
        } else {
          setFormData(content) 
        }
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        const payload = new FormData()

        payload.append('content', formData)
        for (let data in fileData) payload.append(data, fileData[data])

        // Send comment information to the backend
        console.log(payload)
    }

    const handleRemoveImage = (event) => {
        event.preventDefault();
        const removeIndex = Number(event.target.value);
        const updatedFileData = fileData.filter(
          (value, index) => index !== removeIndex
        );
        const updatedPreviewData = preview.filter((value, index) => index !== removeIndex)
        setPreview(updatedPreviewData)
        setFileData(updatedFileData);
    };

    // To do - fetch user information

    return <form onSubmit={handleSubmit}>
        <img src={userInformation.profile_pic} alt="profile picture" style={{height: "100px"}}
        />
        <input type="text" onChange={handleChange} name="content"/>
        <img src="" alt="" />
        <FileAttachmentButton handleChange={handleChange}/>
        <button type="submit" name="images">Submit</button>
        <ul>
            {
                preview.map((source, index) => {
                    return <li key={index}>
                        <img src={source} alt="Attached Image" style={{height: "100px"}}/>
                        <button type="button" value={index} onClick={handleRemoveImage}>Delete Image</button>
                    </li>
                })

            }
        </ul>
    </form>
} 