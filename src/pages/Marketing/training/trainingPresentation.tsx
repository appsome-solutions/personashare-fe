import React, { FC, useEffect } from 'react';
import profilePhoto from 'pages/Marketing/hotels/profilePhoto.png';
import phone from 'pages/Marketing/hotels/phone.png';
import callme from 'pages/Marketing/hotels/callme.svg';
import first from 'pages/Marketing/hotels/first.svg';

export const TrainingPresentation: FC = () => {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://code.jquery.com/jquery-3.5.1.slim.min.js';
    script.integrity = 'sha256-4+XzXVhsDmqanXGHaHvgh1gMQKX40OUvDEBTu8JcmNs=';
    script.crossOrigin = 'anonymous';
    script.async = true;

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div>
      <link href="style.css" rel="stylesheet" />
      <link href="https://fonts.googleapis.com/css2?family=Roboto+Mono&display=swap" rel="stylesheet" />
      <object type="image/svg+xml" data={first} style={{ position: 'absolute', left: '5%', zIndex: -2 }}>
        Kiwi Logo {/* fallback image in CSS */}
      </object>
      <div id="mainMain">
        <img src={profilePhoto} className="face" id="face" />
        <div className="shadow scale" id="shadow" />
        <div className="box" style={{ zIndex: 0 }} id="box">
          <p id="descr" className="description">
            Wiemy, że nie każdy lubi czytać prezentacje. Dlatego jestem zawsze pod telefonem i czekam na Państwa
            kontakt, chętnie opowiem o PersonaShare osobiście.
          </p>
          <img src={phone} className="phone-icon" id="phone-icon" />
          <p className="phone-number" id="phone-number">
            <b>660 - 791 - 170</b>
          </p>
        </div>
        <img src={callme} className="call-me-icon" id="call-me-icon" />
      </div>
    </div>
  );
};
