"use client"
import SideNav from "../sidenav/sidenav";
import styles from "./location.module.css";
import Topnav from "../topnav/topnav";
import { useEffect, useState } from "react";
import AddLocationModal from "./addLocationModal";
import { MdEditDocument } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { MdPageview } from "react-icons/md";


const Locationpage = () => {
  const [locationAddModal, setLocationAddModal] = useState(false);
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchLocations = async () => {
    setLoading(true);
    try{
      const res = await fetch("/api/locations");
      const data = await res.json();
      setLocations(Array.isArray(data) ? data : []);
    } catch (err){
      console.error("Failed to fetch locations", err)
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchLocations();
  }, []);

  const handleLocationAdded = (newLocation) => {
    setLocations((prev) => [...prev, newLocation]);
  };
  return (
    <>
      <div className={styles.main}>
        <div>
          <SideNav />
        </div>
        <div className={styles.topnav}>
          <div>
            <Topnav />
          </div>
          <div className={styles.card}>
            <div className={styles.title}>LOCATIONS LIST</div>
            <div className={styles.search}>
              <div className={styles.find}><input placeholder="Search here...." /></div>
              <div className={styles.add} onClick={() => setLocationAddModal(true)}>Add Location</div>
              {locationAddModal && (
                <AddLocationModal 
                 onClose={() => setLocationAddModal(false)}
                 onLocationAdded={handleLocationAdded}
                />
              )}
            </div>
            <table className={styles.table}>
                <thead>
                    <tr className={styles.tableheading}>
                        <th className={styles.head}>S.No</th>
                        <th className={styles.head}>Location</th>
                        <th className={styles.head}>Divisions</th>
                        <th className={styles.head}>Action</th>
                    </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <tr>
                      <td colSpan="4">Loading...</td>
                    </tr>
                  ) : locations.length === 0 ? (
                    <tr>
                        <td colSpan="4">No locations found.</td>
                    </tr>
                  ) : (
                    locations.map((loc, index) => (
                  <tr className={styles.tablecontent} key={loc.id}>
                    <td className={styles.content}>{index + 1}</td>
                    <td className={styles.content}>{loc.name}</td>
                    <td className={styles.content}>-</td>
                    <td className={styles.action}>
                       <div className={styles.view}><MdPageview /></div>
                       <div className={styles.edit}><MdEditDocument /></div>
                       <div className={styles.delete}><MdDelete />  </div>
                        
                    </td>
                  </tr>
                    ))
                  )}
                </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default Locationpage;