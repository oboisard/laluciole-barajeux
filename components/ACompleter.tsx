/** Placeholder visible pour une info que le client doit fournir (listé dans le récap). */
export default function ACompleter({ children }: { children: React.ReactNode }) {
  return <mark className="a-completer">[À COMPLÉTER : {children}]</mark>;
}
