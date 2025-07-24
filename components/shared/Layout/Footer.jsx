// components/shared/Layout/Footer.js
import { useTheme } from "@/context/ThemeContext";

const Footer = () => {
  const { theme } = useTheme();
  return (
    <footer
      className={`py-4 text-center border-t ${
        theme.darkMode
          ? "dark:border-dark-borderPrimary"
          : "border-light-borderPrimary"
      }`}
      style={{
        borderColor: theme?.colors?.borderPrimary,
        backgroundColor: theme?.colors?.backgroundSecondary,
        color: theme?.colors?.textPrimary,
      }}
    >
      <div className="container mx-auto px-4">
        <p className="text-sm">
          © {new Date().getFullYear()} JasGigli AI. All rights reserved. |{" "}
          <a href="/terms" className="hover:underline">
            Terms of Service
          </a>{" "}
          |{" "}
          <a href="/privacy" className="hover:underline">
            Privacy Policy
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
