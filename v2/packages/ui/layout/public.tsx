export interface PublicLayoutProps {
  children: React.ReactNode;
}

function PublicLayout({ children }: PublicLayoutProps): JSX.Element {
  return <main>{children}</main>;
}

export default PublicLayout;
