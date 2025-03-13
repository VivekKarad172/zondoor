
import React from "react";

const LocationMap = () => {
  return (
    <div className="border-2 border-gray-200 rounded-lg overflow-hidden shadow-md h-[400px]">
      <iframe 
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d929.611056613842!2d72.9553399!3d21.3176724!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be0456d7c8bdb0b%3A0x910bc1eb0a0c4ef5!2sDhoran%20Pardi%2C%20Kamrej%2C%20Surat%2C%20Gujarat%20394150!5e0!3m2!1sen!2sin!4v1715588445830!5m2!1sen!2sin" 
        width="100%" 
        height="100%" 
        style={{ border: 0 }} 
        allowFullScreen 
        loading="lazy"
        title="Z-ON DOOR Location"
      ></iframe>
    </div>
  );
};

export default LocationMap;
