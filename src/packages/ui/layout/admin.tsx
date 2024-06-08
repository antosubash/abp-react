export interface AdminLayoutProps {
  children: React.ReactNode;
}

function AdminLayout({ children }: AdminLayoutProps): JSX.Element {
  return (
    <section>
      <main>{children}</main>
    </section>
  );
}

export default AdminLayout;
