export const metadata = {
  title: 'Meta-Agent Builder',
  description: 'Auto-create custom AI agents for businesses.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head />
      <body className="bg-white text-black p-4">{children}</body>
    </html>
  );
}
