import { FunctionComponent } from "react";
import { useDarkMode } from "../services/DarkModeContextServies";

interface FooterProps { }

const Footer: FunctionComponent<FooterProps> = () => {
    let { isDark } = useDarkMode();
    return (
        <>
            <footer className={`footer  ${isDark ? 'bg-dark' : ''}`}>
                <div style={{ display: "flex" }}>
                    <div style={{ flex: 1 }}>
                        <h4>Shop</h4>
                        <ul style={{ listStyle: "none", padding: 0 }}>
                            <li>
                                <p >Terms and Conditions</p>
                            </li>
                            <li>
                                <p>Refund Policy</p>
                            </li>
                            <li>
                                <p >Privacy Policy</p>
                            </li>
                            <li>
                                <p>Do not sell my personal information</p>
                            </li>
                        </ul>
                    </div>
                    <div style={{ flex: 1 }}>
                        <h4>Contact Us</h4>
                        <ul style={{ listStyle: "none", padding: 0 }}>
                            <li>
                                <p >Scranton Business Park</p>
                            </li>
                            <li>
                                <p >Dunder Mifflin Paper Co.</p>
                            </li>
                            <li>
                                <p >1725 Slough Ave Suit 200</p>
                            </li>
                            <li>
                                <p >Scranton PA, 18505</p>
                            </li>
                        </ul>
                    </div>
                </div>
            </footer >
        </>
    );
};

export default Footer;
