// ProjectAnalytics.tsx
import Analytics from "../components/Analytics";
import ProjectLayout from "../components/ProjectLayout";

const ProjectAnalytics: React.FC = () => {
  return (
    <ProjectLayout currentPage="analytics" pageTitle="Analytics">
      <Analytics />
    </ProjectLayout>
  );
};

export default ProjectAnalytics;
