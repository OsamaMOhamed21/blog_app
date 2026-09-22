import { HeroSection } from "../Components/HeroSection";
import { NavbarComponent } from "../Components/NavBar";
import './HomePage.css'

export function HomePage({ isLoggedIn, currentUser }) {
    return (
        <>
            <div className="homepage-container">
                <NavbarComponent isLoggedIn={isLoggedIn} currentUser={currentUser} />
                <HeroSection />
            </div>
        </>
    )
}
