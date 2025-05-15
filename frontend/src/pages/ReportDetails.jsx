import { getPostDetails, getPostImages } from "../adapters/post-adapter";
import { useParams } from 'react-router-dom'
import { useContext, useEffect, useState } from 'react'
import "../styles/index.css";
import Navbar from '../components/Navbar';
import Comment from '../components/Comment'
import CurrentUserContext from "../contexts/current-user-context";

export default function ReportDetails() {
    const { currentUser, setCurrentUser } = useContext(CurrentUserContext);
    const { id } = useParams();
    const [report, setReport] = useState(null);
    const [images, setImages] = useState([])
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isEditing, setIsEditing] = useState(false)

    useEffect(() => {
        const loadReportDetails = async () => {
            try {
                const [reportInfo, error] = await getPostDetails(id);
                if (error) {
                    throw new Error('Failed to fetch report details')
                }
                setReport(reportInfo)
                if (currentUser.id !== reportInfo.author_user_id) setIsEditing(false)
                console.log(`Post id details - ${reportInfo.id} fetched successfully`)
            } catch (error) {
                console.error("Error fetching report:", error)
                setError(error.message)
            } finally {
                setLoading(false)
            }
        };
        const loadReportImages = async () => {
            const [reportImages, error] = await getPostImages(id);
            if (error) return
            setImages(reportImages)
        }

        loadReportImages();
        loadReportDetails();
    }, [id]);
  
    
    // console.log(report.id)

    if (loading) return <p>Loading Report Details...</p>
    if (error) return <p>Error: {error}</p>
    if (!report) return <p>No report found.</p>
    

    return (
    <>
        <div className="report-details">
            {currentUser.id !== report.author_user_id ? (
            <></>
            ) : (
                <button type="submit"> Edit Post </button>
            )}
          <h2>{report.pet_name}</h2>

          {/* <ul>{report.img_src}</ul> */}

          {images && images.length > 0 ? (
            <div className="report-images">
                {images.map((img) =>(
                    
                    <img
                    key={img.id}
                    src={img.img_src} 
                    alt="Pet image" 
                    className="report-image"
                    style={{height: "300px"}}
                    />

                ) )
                }
            </div>
          ):(
            <p>No images available</p>
          )}
          
          <p><strong>Status:</strong> {report.status}</p>
          <p><strong>Breed:</strong> {report.pet_breed}</p>
          <p><strong>Color:</strong> {report.pet_color || 'No color specified'}</p>
          <p><strong>Weight:</strong> {report.pet_weight} kg</p>
          <p><strong>Height:</strong> {report.pet_height} cm</p>
          <p><strong>Last Seen:</strong> {report.last_seen_location}</p>
          <p><strong>Contact Email:</strong> {report.contact_email}</p>
          <p><strong>Contact Phone:</strong> {report.contact_phone_number}</p>
          <p><strong>Description:</strong> {report.content}</p>
        </div>
          <Comment />
     <Navbar/>
    </>
      );
}