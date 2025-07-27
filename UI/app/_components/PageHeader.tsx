import { ReactNode } from "react";

type PageHeaderProps = {
  children: ReactNode;
};

function PageHeader({ children }: PageHeaderProps) {
  return <h2 className="font-semibold text-xl md:text-3xl">{children}</h2>;
}

export default PageHeader;
