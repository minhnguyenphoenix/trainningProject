import { Breadcrumb } from 'antd';
import { useState, useMemo, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { useStores } from '../../stores';

function BreadcrumbHeader() {
  const { projectId, ticketId } = useParams();
  const { projectStore, ticketStore } = useStores();
  const { pathname } = useLocation();
  const [listPathName, setListPathName] = useState([]);
  const pathnames = useMemo(() => pathname.split('/').filter((item) => item), [pathname]);
  const projectInfo = projectStore.getProject(projectId);
  const ticketInfo = ticketStore.getTicketInfo(projectId, ticketId);

  useEffect(() => {
    const removeUnecess = pathnames.filter((i) => i !== 'project');
    setListPathName(removeUnecess);
  }, [pathnames]);

  const BreadCumbsView = () => {
    return (
      <>
        <Breadcrumb>
          <Breadcrumb.Item href='/'>All Project</Breadcrumb.Item>
          {(listPathName || []).map((name, index) => {
            const routTo = `/${listPathName.slice(0, index + 1).join('/')}`;
            const isLast = index === listPathName.length - 1;
            const transformName = () => {
              if (name === projectId) return projectInfo;
              if (name === ticketId) return { ...ticketInfo, name: ticketInfo?.ticketName };
            };
            console.log('routTo', routTo);
            return isLast ? (
              <Breadcrumb.Item>{transformName(name)?.name}</Breadcrumb.Item>
            ) : (
              <Breadcrumb.Item href={`${routTo}`}>{transformName(name)?.name}</Breadcrumb.Item>
            );
          })}
        </Breadcrumb>
      </>
    );
  };

  return <>{BreadCumbsView()}</>;
}

export default BreadcrumbHeader;
