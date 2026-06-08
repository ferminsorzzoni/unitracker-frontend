import { useAuthStore } from "../../stores/authStore";
import HeaderLoginButton from "./HeaderLoginButton";
import HeaderRegisterButton from "./HeaderRegisterButton";
import HeaderHomeButton from "./HeaderHomeButton";
import HeaderLogoutButton from "./HeaderLogoutButton";

export default function Header() {
    const token = useAuthStore(state => state.token);
    const user = useAuthStore(state => state.user);

    return (
        <header className="flex justify-between items-center p-2 shadow-lg bg-white z-10">

            <HeaderHomeButton />

            {token ? (
                <div className="flex items-center gap-4">
                    <p className="text-gray-dark text-sm sm:text-xs hidden sm:inline">{user!.email}</p>
                    <HeaderLogoutButton />
                </div>
            ) : (
                <div className="flex items-center gap-1 sm:gap-3">
                    <HeaderLoginButton />
                    <HeaderRegisterButton />
                </div>
            )}

        </header>
    );
}