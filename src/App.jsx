import { createBrowserRouter, RouterProvider } from "react-router-dom"
// layouts
import RootLayout from './layouts/RootLayout'
import AdminLayout from './layouts/AdminLayout'
// pages
import Home from './pages/Home'
import Detail from "./pages/Detail"
// admin pages
import Register from "./pages/admin/Register"
import Dashboard from './pages/admin/Dashboard'
import Projects from './pages/admin/Projects'
import About from './pages/admin/About'
import SocialMedia from './pages/admin/SocialMedia'
import Experience from './pages/admin/Experience'
import ProfileInfo from './pages/admin/ProfileInfo'
import Skills from './pages/admin/Skills'
import SoftSkills from './pages/admin/SoftSkills'
import Education from "./pages/admin/Education"
import ProjectDetail from "./components/admin/ProjectDetail"

const App = () => {
  const routes = createBrowserRouter([
    {
      path: '/',
      element: <RootLayout />,
      children: [
        {
          index: true,
          element: <Home />
        },
        {
          path: 'projects/:id/detail',
          element: <Detail />
        }
      ]
    },
    {
      path: '/admin',
      element: <AdminLayout />,
      children: [
        {
          path: 'dashboard',
          element: <Dashboard />
        },
        {
          path: 'projects',
          element: <Projects />
        },
        {
          path: 'projects/:id/detail',
          element: <ProjectDetail />
        },
        {
          path: 'about',
          element: <About />
        },
        {
          path: 'socials',
          element: <SocialMedia />
        },
        {
          path: 'experience',
          element: <Experience />
        },
        {
          path: 'profile-info',
          element: <ProfileInfo />
        },
        {
          path: 'skills',
          element: <Skills />
        },
        {
          path: 'soft-skills',
          element: <SoftSkills />
        },
        {
          path: 'education',
          element: <Education />
        }
      ]
    },
    {
      path: '/admin/register',
      element: <Register />
    }
  ])
  return (
    <RouterProvider router={routes} />
  )
}

export default App
