import { Container } from "@/components/shared/container";

interface FooterProps {
  appName: string;
}

export function Footer({ appName }: FooterProps) {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-white/10 py-8">
      <Container className="flex flex-col items-start justify-between gap-3 text-sm text-slate-400 sm:flex-row sm:items-center">
        <p>
          © {year} {appName}. Better health decisions, one step at a time.
        </p>
        <p>AI guidance, trusted doctors, and continuous follow-up care.</p>
      </Container>
    </footer>
  );
}
