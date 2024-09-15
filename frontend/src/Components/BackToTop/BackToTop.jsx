// BackToTop.js
import React from "react";
import { useEffect, useState } from "react";
import { FaChevronUp } from "react-icons/fa"; // or any other icon library you prefer

const BackToTop = () => {
  const [visible, setVisible] = useState(false);

  const toggleVisibility = () => {
    if (window.pageYOffset > 300) {
      // Show button when scrolled 300px from top
      setVisible(true);
    } else {
      setVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  return (
    visible && (
      <button onClick={scrollToTop} style={styles.button}>
        <FaChevronUp size={24} />
      </button>
    )
  );
};

const styles = {
  button: {
    position: "fixed",
    bottom: "20px",
    right: "20px",
    backgroundColor: "#e34120",
    color: "#fff",
    border: "none",
    borderRadius: "50%",
    padding: "10px",
    cursor: "pointer",
    zIndex: 1000,
  },
};

export default BackToTop;
