import React, { ReactNode } from "react";

const PageFooter: React.FC = () => (
  <div className='flex items-center justify-between fixed bottom-0 left-0 right-0 h-10 px-4 text-white text-sm bg-blue-600'>
    <p>Shangham</p>
  </div>
);

export type PageContainerProps = {
  children?: ReactNode;
  footer?: boolean;
};

const PageContainer: React.FC<PageContainerProps> = ({ children, footer = true }) => (
  <>
    {children}
    {footer ? <PageFooter /> : null}
  </>
);

export default PageContainer;
