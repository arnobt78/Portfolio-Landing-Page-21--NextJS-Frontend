import {Metadata} from 'next';
import ProjectsClient from '../../components/projects/ProjectsClient';
import {MetaProjects} from "@/lib/metaData";

// Page-level SEO for /projects
export const metadata: Metadata = MetaProjects

/** Projects route: filterable grid and modals; data from lib/projectsData.ts */
const ProjectsPage = () => {
  return <ProjectsClient />;
};

export default ProjectsPage;
