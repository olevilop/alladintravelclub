import { Link, useNavigate } from "react-router-dom";
import { ChevronRight } from "lucide-react";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

const Breadcrumbs = ({ items }: { items: BreadcrumbItem[] }) => {
  const navigate = useNavigate();

  const handleHomeClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (window.history.length > 2) {
      // Try to go back to where user came from to preserve scroll
      navigate(-1);
    } else {
      navigate("/");
    }
  };

  return (
    <nav className="container mx-auto px-6 py-4 flex items-center gap-2 text-sm text-foreground">
      <a href="/" onClick={handleHomeClick} className="hover:text-primary transition-colors cursor-pointer">
        Главная
      </a>
      {items.map((item, i) => (
        <span key={i} className="inline-flex items-center gap-2">
          <ChevronRight className="w-3.5 h-3.5" />
          {item.href ? (
            <Link to={item.href} className="hover:text-primary transition-colors">{item.label}</Link>
          ) : (
            <span className="font-semibold">{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
};

export default Breadcrumbs;
