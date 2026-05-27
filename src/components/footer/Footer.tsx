import { Link } from "react-router-dom";
import FooterUnitrackerLogo from "./FooterUnitrackerLogo";
import FooterLinks from "./FooterLinks";

export default function Footer() {
    return (
        <footer className="border-t border-gray-mid p-6">
            <div className="mx-auto flex items-center justify-between">

                <FooterUnitrackerLogo />

                <FooterLinks />

            </div>
        </footer>
    );
}