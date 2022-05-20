interface PageTitleProps {
  name: string;
}

const PageTitle: React.FC<PageTitleProps> = ({ name }) => {
  return <h1 className="text-4xl sm:text-5xl font-extrabold mb-8">{name}</h1>;
};

export default PageTitle;
