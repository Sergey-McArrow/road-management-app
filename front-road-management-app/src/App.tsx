import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { Map } from './components/map'
import { getRoads } from './api/roads'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { RoadsPage } from './pages/roads-page'
import { EvaluationsPage } from './pages/evaluations-page'
import { TodosPage } from './pages/todos-page'
import { NavigationBar } from './components/navigation-bar'

const queryClient = new QueryClient()

const MapWithData = () => {
  const { data: roads } = useQuery({
    queryKey: ['roads'],
    queryFn: getRoads,
  })

  const position = {
    lat: 50.057056,
    lng: 10.2460426,
    zoom: 14,
  }

  return (
    <div className="flex h-[calc(100svh-64px)] w-screen">
      <div className="relative flex-1">
        <Map position={position} roads={roads} />
      </div>
    </div>
  )
}

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <div className="flex h-screen flex-col">
          <NavigationBar />
          <div className="flex-1">
            <Routes>
              <Route path="/" element={<MapWithData />} />
              <Route path="/roads" element={<RoadsPage />} />
              <Route path="/evaluations" element={<EvaluationsPage />} />
              <Route path="/todos" element={<TodosPage />} />
            </Routes>
          </div>
        </div>
      </BrowserRouter>
      <ReactQueryDevtools />
    </QueryClientProvider>
  )
}

export default App
