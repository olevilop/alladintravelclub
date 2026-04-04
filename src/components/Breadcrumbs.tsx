import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

const Breadcrumbs = ({ items }: { items: BreadcrumbItem[] }) => (
  <nav className="container mx-auto px-6 py-4 flex items-center gap-2 text-sm text-foreground">
    <Link to="/" className="hover:text-primary transition-colors">Главная</Link>
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

export default Breadcrumbs;
