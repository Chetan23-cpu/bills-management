"use client";
import { MdAddLocationAlt } from "react-icons/md";
import styles from "./addLocationModal.module.css";
import { useState } from "react";

const AddLocationModal = ({ onClose, onLocationAdded }) => {
  const [name, setName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleAdd = async () => {
    if (!name.trim()) {
      setError("Please enter name");
      return;
    }

    try {
      setIsSubmitting(true);
      setError("");

      const res = await fetch("/api/locations", {
        method: "POST",
        header: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: name.trim() }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Failed to add location");
      }

      const newLocation = await res.json();

      if (onLocationAdded) {
        onLocationAdded(newLocation);
      }
      onClose();
    } catch (err) {
      setError(err.message || "Failed to add location");
    } finally {
      isSubmitting(false);
    }
  };
  return (
    <div>
      <div className={styles.main} onClick={onClose}>
        <div className={styles.card} onClick={(e) => e.stopPropagation()}>
          <div className={styles.header}>
            <div className={styles.icon}>
              <MdAddLocationAlt />
            </div>
            <div className={styles.title}>Add Location</div>
          </div>
          <div className={styles.inputsection}>
            <div className={styles.nameRow}>
              <div className={styles.name}>Name:</div>
              <div className={styles.input}>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleAdd()}
                />
              </div>
              {error && (
                <p
                  style={{
                    color: "#ffdddd",
                    fontSize: "13px",
                    textAlign: "center",
                  }}
                >
                  {error}
                </p>
              )}
            </div>
          </div>
          <div className={styles.button}>
            <div
              className={styles.add}
              onClick={isSubmitting ? undefined : handleAdd}
              style={{
                opacity: isSubmitting ? 0.6 : 1,
                cursor: isSubmitting ? "default" : "pointer",
              }}
            >
              Add
            </div>
            <div className={styles.cancel} onClick={onClose}>
              Cancel
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddLocationModal;
