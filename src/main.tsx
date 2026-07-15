import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { MotionConfig } from 'framer-motion';
import './index.css';
import { Layout } from './Layout';
import { Home } from './pages/Home';
import { Projects } from './pages/Projects';
import {
  ProjectSpotme,
  ProjectGuestly,
  ProjectCockpit,
  ProjectArea,
} from './pages/ProjectDetail';
import { About } from './pages/About';
import { Contact } from './pages/Contact';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: 'projets', element: <Projects /> },
      { path: 'projets/spotme', element: <ProjectSpotme /> },
      { path: 'projets/guestly', element: <ProjectGuestly /> },
      { path: 'projets/cockpit', element: <ProjectCockpit /> },
      { path: 'projets/area', element: <ProjectArea /> },
      { path: 'a-propos', element: <About /> },
      { path: 'contact', element: <Contact /> },
    ],
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <MotionConfig reducedMotion="user">
      <RouterProvider router={router} />
    </MotionConfig>
  </StrictMode>,
);
