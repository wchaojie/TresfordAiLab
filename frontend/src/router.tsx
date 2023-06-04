import { Navigate, Route, Routes } from 'react-router-dom'

// path
import { Path } from "@/enums"

// layout
import MainLayout from '@/layouts/main'

// page
import Claude from '@/pages/Claude'
import NotFound from '@/pages/NotFound'

// ----------------------------------------------------------------------

export default function Router() {
  return (
    <Routes>
      <Route path={Path.Root} element={<MainLayout />}>
        <Route index element={<Navigate to={Path.Claude} replace />} />
        <Route path={Path.Claude} element={<Claude />} />
      </Route>
      <Route path="/404" element={<NotFound />} />
      <Route path="*" element={<Navigate to="/404" replace />} />
    </Routes>
  )
}
