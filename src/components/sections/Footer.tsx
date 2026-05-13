export default function Footer() {
  return (
    <footer className="py-8 relative border-t border-white/10 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-t from-primary/5 to-transparent pointer-events-none" />
      <div className="container mx-auto px-4 text-center relative z-10">
        <p className="text-muted-foreground text-sm">
          &copy; {new Date().getFullYear()} Harshit Harlalka. All systems operational.
        </p>
        <p className="text-xs text-muted-foreground/50 mt-2 font-mono">
          BUILT WITH NEXT.JS, TAILWIND, & FRAMER MOTION
        </p>
      </div>
    </footer>
  );
}
