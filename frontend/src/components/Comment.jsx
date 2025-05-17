import { useState, useEffect, useContext } from "react"
import { getUser } from "../adapters/user-adapter"
import { getPostComments } from "../adapters/comment-adapter";
import CurrentUserContext from "../contexts/current-user-context";
import FileAttachmentButton from "./FileAttachmentButton";
import { createComment } from "../adapters/comment-adapter";
import { useParams } from 'react-router-dom'


export default Comment = () => {
    const { id } = useParams();
    const { currentUser } = useContext(CurrentUserContext);
    const [userInformation, setUserInformation] = useState([]) 
    // State to manage attached files
    const [fileData, setFileData] = useState([]);
    // State to manage the data entered in the form
    const [content, setContent] = useState('');
    // State to manage the preview images when user attaches an image
    const [preview, setPreview] = useState([])

    const [newComment, setNewComment] = useState(null)

    const [postComment, setPostComments] = useState([])

    useEffect(() => {
        const loadUserInformation = async () => {
            const [userInformation, error] = await getUser(currentUser.id)
            if (error) return
            setUserInformation(userInformation)
        }
        const loadPostComments = async () => {
            const [comments, error] = await getPostComments(id)
            if (error) return
            setPostComments(comments)
        }
        loadPostComments();
        loadUserInformation();
    }, [currentUser, newComment])
    
    const handleChange = (event) => {
        const { type, files } = event.target;

        const img = files?.[0]

        if (type === "file" && img) {
          setFileData([...fileData, files[0]]);
          setPreview([...preview, URL.createObjectURL(img) ])
        } else {
          setContent(event.target.value) 
        }
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        const body = new FormData();
        body.append('content', content)
        fileData.forEach(file => body.append('files', file) ) 
        const [comment, error] = await createComment(id, body)
        setNewComment(comment)
        setFileData([])
        setContent('')
        setPreview([])
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

    return <form onSubmit={handleSubmit}>
        <img src={userInformation.profile_pic} alt="profile picture" style={{height: "100px"}}
        />
        <input type="text" onChange={handleChange} name="content" value={content}/>
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
        <ul>             
             {
                postComment.length > 0 && postComment.map((source, index) => {
                    return<li key={index}>
                        <p>{source?.content}</p>
                     {
                        source.images.length > 0 && source.images.map(img => {
                            return <img src={img.img_src} alt="Attached Image" style={{height: "100px"}}/>
                        })
                     }
                     </li>
                })
            }
        </ul>
    </form>
} 