interface PageTitleProps {
  name: string;
}

const PageTitle: React.FC<PageTitleProps> = ({ name }) => {
  return <h1 className="text-3xl sm:text-4xl font-extrabold mb-8">{name}</h1>;
};

export default PageTitle;
