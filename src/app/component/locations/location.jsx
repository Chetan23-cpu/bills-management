"use client"
import SideNav from "../sidenav/sidenav";
import styles from "./location.module.css";
import Topnav from "../topnav/topnav";
import { useState } from "react";
import AddLocationModal from "./addLocationModal";


const Locationpage = () => {
  const [locationAddModal, setLocationAddModal] = useState(false);
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
              <div>Search Box</div>
              <div className={styles.add} onClick={() => setLocationAddModal(true)}>Add Location</div>
              {locationAddModal && (
                <AddLocationModal 
                 onClose={() => setLocationAddModal(false)}
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
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default Locationpage;
