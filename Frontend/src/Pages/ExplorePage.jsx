import { BlogCardComponent } from "../Components/BlogCardComponent";
import { NavbarComponent } from "../Components/NavBar";

export function ExplorePage({ isLoggedIn, currentUser }) {
    return (
        <>
            <NavbarComponent isLoggedIn={isLoggedIn} currentUser={currentUser} />
            <BlogCardComponent />
        </>
    )
}
