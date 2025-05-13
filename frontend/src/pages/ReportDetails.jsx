import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { getPostDetails } from "../adapters/post-adapter";
import "../styles/index.css";
import Navbar from '../components/Navbar';


export default function ReportDetails() {
    const { id } = useParams();
    const [report, setReport] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadReportDetails = async () => {
            try {
                const [reportInfo, error] = await getPostDetails(id);
                if (!reportInfo) throw new Error('Failed to fetch report details')
                setReport(reportInfo)
                console.log(`Post id details - ${reportInfo.id} fetched successfully`)
            } catch (error) {
                setError(error.message)
            } finally {
                setLoading(false)
            }
        };
        loadReportDetails();
    }, [id]);

    if (loading) return <p>Loading Report Details...</p>
    if (error) return <p>Error: {error}</p>
    if (!report) return <p>No report found.</p>

    return (
    
    <>
        <div className="report-details">
          <h2>{report.title}</h2>
          <p><strong>Status:</strong> {report.status}</p>
          <p><strong>Pet Name:</strong> {report.pet_name}</p>
          <p><strong>Breed:</strong> {report.pet_breed}</p>
          <p><strong>Color:</strong> {report.pet_color}</p>
          <p><strong>Weight:</strong> {report.pet_weight} kg</p>
          <p><strong>Height:</strong> {report.pet_height} cm</p>
          <p><strong>Last Seen:</strong> {report.last_seen_location}</p>
          <p><strong>Contact Email:</strong> {report.contact_email}</p>
          <p><strong>Contact Phone:</strong> {report.contact_phone_number}</p>
          <p><strong>Description:</strong> {report.content}</p>
        </div>
     <Navbar/>
    </>
      );
}