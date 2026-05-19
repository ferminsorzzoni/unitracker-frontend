import type { Config } from "tailwindcss";

export default {
    content: [
        "./index.html",
        "./src/**/*.{ts,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: {
                    DEFAULT: "#185FA5",
                    dark: "#0C447C",
                    light: "#E6F1FB",
                },
                gray: {
                    light: "#F1EFE8",
                    mid: "#888780",
                    dark: "#2C2C2A",
                },
                success: "#1D9E75",
                danger: "#E24B4A",
                warning: "#BA7517",
            }
        }
    },
    plugins: [],
} satisfies Config