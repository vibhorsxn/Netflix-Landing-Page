import React, { useEffect, useState } from 'react'
import "./Nav.css";

function Nav() {

    const [show, handleShow] = useState(false);

    useEffect(() => {
        window.addEventListener("scroll", () => {
            if (window.scrollY > 100) {
                handleShow(true)
            } else {
                handleShow(false)
            }
        });
        return () => {
            window.removeEventListener("scroll");
        }
    }, [])

    return (
        <div className={`nav ${show && "nav_black"}`} >

            <img className="nav_logo"
                src="http://assets.stickpng.com/images/580b57fcd9996e24bc43c529.png"
                alt="Netflix-logo" />

            <img className="nav_avatar"
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTzlmBpPN7ESAXb-m_DlVpqcX3VwKf_vPRshQ&usqp=CAU"
                alt="Netflix-avatar" />

        </div>

    )
}

export default Nav