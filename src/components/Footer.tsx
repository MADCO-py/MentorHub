export function Footer() {
  return (
    <footer className="border-t border-border mt-16">
      <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-3">
        <span className="font-display text-lg font-bold text-white">MentorHub</span>
        <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted text-center">
          Tutorías universitarias de excelencia · Guatemala
        </p>
        <p className="font-mono text-xs text-muted">© {new Date().getFullYear()}</p>
      </div>
    </footer>
  );
}
