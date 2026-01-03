import Logo from "@/components/logo";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full bg-background/80 backdrop-blur-lg">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        {/* Logo */}
        <div className="flex items-center">
          <Link to="/">
            <Logo />
          </Link>
        </div>

        {/* Navigation */}
        <nav className="hidden md:flex">
          <ul className="flex items-center gap-8 text-sm font-medium text-muted-foreground">
            {["Products", "Templates", "Workspaces", "About Us"].map((item) => (
              <li
                key={item}
                className="cursor-pointer transition-colors hover:text-foreground"
              >
                {item}
              </li>
            ))}
          </ul>
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <Button variant="ghost" className="text-sm">
            <Link to="/sign-in">Login</Link>
          </Button>
          <Button className="text-sm px-5">
            <Link to="/sign-up">Sign up</Link>
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
