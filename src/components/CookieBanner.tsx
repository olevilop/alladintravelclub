import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const CookieBanner = () => {
  const [accepted, setAccepted] = useState(
    () => localStorage.getItem("cookie-consent") === "true"
  );

  if (accepted) return null;

  const handleAccept = () => {
    localStorage.setItem("cookie-consent", "true");
    setAccepted(true);
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-border bg-background/95 backdrop-blur-md p-4 md:p-6">
      <div className="container mx-auto flex flex-col sm:flex-row items-center gap-4 text-sm text-muted-foreground">
        <p className="flex-1">
          Мы используем файлы cookie для улучшения работы сайта. Продолжая использовать сайт, вы соглашаетесь с нашей{" "}
          <Link to="/privacy" className="text-primary hover:underline">
            политикой конфиденциальности
          </Link>.
        </p>
        <Button onClick={handleAccept} size="sm" className="shrink-0">
          Принять
        </Button>
      </div>
    </div>
  );
};

export default CookieBanner;
