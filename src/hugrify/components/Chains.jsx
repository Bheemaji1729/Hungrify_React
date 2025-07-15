import React, {useState, useEffect, CSSProperties} from 'react'
import { API_URL } from '../../api'
import { FaRegArrowAltCircleRight } from "react-icons/fa";
import { FaRegArrowAltCircleLeft } from "react-icons/fa";
import { SyncLoader } from "react-spinners";
import { Link } from 'react-router-dom';

const Chains = () => {
    const [vendorData, setVendorData] = useState([]);
    const [scrollPosition, setScrollPosition] = useState(0);
    const [loading, setLoading] = useState(true);

    const vendorFirmHandler = async()=>{
        try {
                const response = await fetch(`${API_URL}/vendor/all-vendors`)
                const newData = await response.json()
                setVendorData(newData);
                console.log("this is api Data", newData)
                setLoading(false)
        } catch (error) {
            alert("failed to fetch data")
            console.error("failed to fetch data", error)
            setLoading(true)
        }
    }
        useEffect(()=>{
            vendorFirmHandler()
        },[])

const handleScroll = (direction)=>{
       const gallery = document.getElementById("chainGallery")
       const scrollAmount = 500;

       if(direction === "left"){
           gallery.scrollTo({
                left: gallery.scrollLeft - scrollAmount,
                behavior: "smooth"
           })
       }else if(direction === "right"){
           gallery.scrollTo({
                left: gallery.scrollLeft + scrollAmount,
                behavior: "smooth"
           }) 
       }
}

  return (
    <div className='mediaChainSection'>
    <div className="loaderSection">
        {loading && <>
            
            <SyncLoader
             color="#091a86"
             size={30}
             speedMultiplier={1}
            />
            <div className="loader">
                <h4>"We are currently loading your 🥣. Thank you for your patience😊."</h4>
            </div>
        </>}
    </div>
       <div className="btnSection">
        <button onClick={()=>handleScroll("left")}>
            <FaRegArrowAltCircleLeft className='btnIcons'/>
        </button>
        <button onClick={()=>handleScroll("right")}>
            <FaRegArrowAltCircleRight className='btnIcons'/>
        </button>
       </div>
        <h3>Top restaurant chains in Hyderabad</h3>
       <section className="chainSection" id= "chainGallery" onScroll={(e)=>setScrollPosition(e.target.scrollLeft)} >
        {vendorData.vendors && vendorData.vendors.map((vendor)=>{
            return(
                <>
                  <div className="vendorBox">
                    {vendor.firm.map((item)=>{
                        return(
                            <>
                               <div>
                                {/* {item.firmName} */}
                               </div>
                               <Link to={`/products/${item._id}/${item.firmName}`} className="link" key={item._id}>
                               <div className="firmImage">
                                   <img src={`${API_URL}/uploads/${item.image}`} />
                               </div>
                               </Link>
                            </>
                        )
                    })}
                  </div>
                </>
            )
        })}
       </section>
    </div>
  )
}

export default Chains