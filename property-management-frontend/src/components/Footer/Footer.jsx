import React from "react";
import { useLocation } from "react-router-dom";
import {
    MdLocationPin,
    MdLocalPhone,
    MdCopyright,
    MdFacebook
} from "react-icons/md"
import { FaTwitter } from "react-icons/fa"
import { RiInstagramFill } from "react-icons/ri"
import "./Footer.css"

export default function Footer() {
    const { pathname } = useLocation()


    return (
        <React.Fragment>
            {pathname != '/login' && pathname != '/sign-up' && <footer className="App-footer">
                <div className="footer-contents">
                    <div className="left">
                        <p className="footer-sub-title">SRNA Properties LLC</p>
                        <div className="footer-sub-content">
                            <span><MdLocationPin /></span>
                            <span className="title-sub-data">1000 N 4 ST, Fairfield, Iowa</span>
                        </div>
                        <div className="footer-sub-content">
                            <span><MdLocalPhone /></span>
                            <span className="title-sub-data">+01 641 -XX-XX-XX</span>
                        </div>
                        <div className="footer-sub-content">
                            <span><MdCopyright /></span>
                            <span className="title-sub-data">SRNA All Rights Reserved</span>
                        </div>
                    </div>
                    <div className="right">
                        <p className="footer-sub-title">Follow Us On</p>
                        <div className="footer-sub-content">
                            <span><MdFacebook /></span>
                            <span className="title-sub-data">facebook.com/srna</span>
                        </div>
                        <div className="footer-sub-content">
                            <span><FaTwitter /></span>
                            <span className="title-sub-data">twitter.com/srna</span>
                        </div>
                        <div className="footer-sub-content">
                            <span><RiInstagramFill /></span>
                            <span className="title-sub-data">instagram.com/srna</span>
                        </div>
                    </div>
                </div>

            </footer>
            }
        </React.Fragment>
    )
}