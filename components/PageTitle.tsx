interface PageTitleProps {
  children: React.ReactNode;
}

const PageTitle: React.FC<PageTitleProps> = ({ children }) => {
  return (
    <h1 className="text-3xl sm:text-4xl font-extrabold mb-8">{children}</h1>
  );
};

export default PageTitle;
