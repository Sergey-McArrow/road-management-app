import { MapContainer, TileLayer, Marker, Popup, GeoJSON } from 'react-leaflet'
import type { TMapPosition, TMarker } from '../types/map'
import type { TRoadFeature, TRoadsFeatureCollection } from '../types/roads'
import { useState, useCallback, useRef } from 'react'
import type { TGradeType } from '../types/grades'
import { getGradeColor } from '../types/grades'
import { GradeSelector } from './grade-selector'
import { Legend } from './legend'
import 'leaflet/dist/leaflet.css'
import type { PathOptions, Layer } from 'leaflet'
import L from 'leaflet'
import type { Feature } from 'geojson'
import { defaultMapIcon, mainGradesArray } from '../const'
import { TodoList } from './todo-list'
import { useTodos } from '../hooks/use-todos'
import type { TTodo, TTodoFormData } from '../types/todo'
import { StatisticsSidebar } from './statistics-sidebar'
import { useOutsideClick } from '../hooks/use-outside-click'
import { TodoForm } from './todo-form'
import { CloseButton } from '../ui/close-button'
import { ToggleButton } from '../ui/toggle-button'
import { Loading } from '@/ui/loading'
import { Error } from '@/ui/error'
import { getGradeLabel } from '@/helpers'

type TMapProps = {
  position: TMapPosition
  markers?: TMarker[]
  roads?: TRoadsFeatureCollection
}

type TActiveDrawer = 'none' | 'statistics' | 'todos'

export const Map = ({ position, markers = [], roads }: TMapProps) => {
  const [selectedGrade, setSelectedGrade] = useState<TGradeType>('gw')
  const [hoveredRoad, setHoveredRoad] = useState<TRoadFeature | null>(null)
  const [selectedRoad, setSelectedRoad] = useState<TRoadFeature | null>(null)
  const [selectedTodo, setSelectedTodo] = useState<TTodo | undefined>()
  const [isAddingTodo, setIsAddingTodo] = useState(false)
  const [activeDrawer, setActiveDrawer] = useState<TActiveDrawer>('none')
  const {
    todos: allTodos,
    isLoading: isLoadingAllTodos,
    isError: isErrorAllTodos,
    error: errorAllTodos,
  } = useTodos()
  const {
    todos: roadTodos,
    createTodo,
    updateTodo,
    isLoading: isLoadingRoadTodos,
    isError: isErrorRoadTodos,
    error: errorRoadTodos,
  } = useTodos(selectedRoad?.properties.fid)

  const layerRefs = useRef<{ [key: string]: Layer }>({})
  const statisticsButtonRef = useRef<HTMLButtonElement>(null)
  const todosButtonRef = useRef<HTMLButtonElement>(null)
  const statisticsDrawerRef = useRef<HTMLDivElement>(null)
  const todosDrawerRef = useRef<HTMLDivElement>(null)

  const closeDrawer = useCallback(() => {
    setActiveDrawer('none')
  }, [])

  useOutsideClick(statisticsDrawerRef, () => {
    if (activeDrawer === 'statistics') {
      closeDrawer()
    }
  }, [statisticsButtonRef])

  useOutsideClick(todosDrawerRef, () => {
    if (activeDrawer === 'todos') {
      closeDrawer()
    }
  }, [todosButtonRef])

  const getFeatureGrade = useCallback(
    (feature: TRoadFeature): number => {
      const { eemi_grade } = feature.properties
      return mainGradesArray.includes(
        selectedGrade as (typeof mainGradesArray)[number]
      )
        ? eemi_grade[selectedGrade as (typeof mainGradesArray)[number]]
        : eemi_grade.sub_type_grades[selectedGrade]
    },
    [selectedGrade]
  )

  const getFeatureStyle = useCallback(
    (feature: Feature | undefined): PathOptions => {
      if (!feature || !('properties' in feature)) {
        return {
          color: '#999',
          weight: 3,
          opacity: 0.7,
        }
      }

      const roadFeature = feature as TRoadFeature
      const grade = getFeatureGrade(roadFeature)
      const isHovered =
        hoveredRoad?.properties.fid === roadFeature.properties.fid
      const isSelected =
        selectedRoad?.properties.fid === roadFeature.properties.fid

      return {
        color: getGradeColor(grade),
        weight: isSelected ? 6 : isHovered ? 5 : 3,
        opacity: isSelected ? 1 : isHovered ? 0.9 : 0.7,
      }
    },
    [getFeatureGrade, hoveredRoad, selectedRoad]
  )

  const onEachFeature = useCallback(
    (feature: Feature, layer: Layer) => {
      if (!feature.properties) return

      const roadFeature = feature as TRoadFeature
      layerRefs.current[roadFeature.properties.fid] = layer

      layer.on({
        mouseover: () => {
          setHoveredRoad(roadFeature)
          const gradeValue = getFeatureGrade(roadFeature)
          const gradeLabel = getGradeLabel(selectedGrade)

          layer
            .bindTooltip(
              `<div class="flex flex-col gap-1">
                <div class="font-bold">${roadFeature.properties.name}</div>
                <div class="flex justify-between gap-2">
                  <span>${gradeLabel}:</span>
                  <span class="font-medium">${gradeValue.toFixed(2)}</span>
                </div>
              </div>`,
              {
                sticky: true,
                className: 'bg-white px-3 py-2 rounded-md shadow-md border-0',
              }
            )
            .openTooltip()
        },
        mouseout: () => {
          setHoveredRoad(null)
          layer.unbindTooltip()
        },
        click: (e) => {
          L.DomEvent.stopPropagation(e)
          setSelectedRoad(roadFeature)
        },
      })
    },
    [getFeatureGrade, selectedGrade]
  )

  const handleAddTodo = useCallback(() => {
    setSelectedTodo(undefined)
    setIsAddingTodo(true)
  }, [])

  const handleEditTodo = useCallback((todo: TTodo) => {
    setSelectedTodo(todo)
    setIsAddingTodo(true)
  }, [])

  const handleTodoCancel = useCallback(() => {
    setSelectedTodo(undefined)
    setIsAddingTodo(false)
  }, [])

  const handleTodoSubmit = useCallback(
    async (data: TTodoFormData) => {
      if (!selectedRoad) return

      try {
        if (selectedTodo?.id) {
          updateTodo({ id: selectedTodo.id, data })
        } else {
          createTodo(data)
        }
        setIsAddingTodo(false)
        setSelectedTodo(undefined)
      } catch (error) {
        console.error('Error saving todo:', error)
      }
    },
    [selectedRoad, selectedTodo, createTodo, updateTodo]
  )

  const toggleDrawer = useCallback((drawer: TActiveDrawer) => {
    setActiveDrawer((current) => {
      if (current === drawer) {
        return 'none'
      }
      return drawer
    })
  }, [])

  if (isLoadingAllTodos || isLoadingRoadTodos) {
    return <Loading />
  }
  if (isErrorAllTodos || isErrorRoadTodos) {
    return <Error> {errorAllTodos?.message || errorRoadTodos?.message}</Error>
  }

  return (
    <div className="relative h-full w-full" data-testid="map-container">
      <div className="absolute left-14 top-4 z-[999] flex gap-2">
        <ToggleButton
          buttonRef={statisticsButtonRef}
          isActive={activeDrawer === 'statistics'}
          onClick={() => toggleDrawer('statistics')}
        >
          Statistiken
        </ToggleButton>
        <ToggleButton
          buttonRef={todosButtonRef}
          isActive={activeDrawer === 'todos'}
          onClick={() => toggleDrawer('todos')}
        >
          TODOs
        </ToggleButton>
      </div>

      <div
        ref={todosDrawerRef}
        className={`fixed left-0 top-0 z-[1000] h-full w-96 transform bg-white shadow-lg transition-transform duration-300 ${
          activeDrawer === 'todos' ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="h-full overflow-y-auto p-4">
          <div className="mb-4 flex items-center justify-between">
            <CloseButton onClick={() => toggleDrawer('todos')} />
          </div>

          <div className="mb-4">
            <h3 className="text-lg font-semibold">Alle TODOs</h3>
          </div>
          <TodoList todos={allTodos} onEdit={null} />
        </div>
      </div>

      <MapContainer
        center={[position.lat, position.lng]}
        zoom={position.zoom}
        className="relative h-full w-full"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {markers.map((marker, index) => (
          <Marker key={index} position={marker.position} icon={defaultMapIcon}>
            <Popup>{marker.popup}</Popup>
          </Marker>
        ))}
        {roads ? (
          <>
            <GeoJSON
              data={roads}
              style={getFeatureStyle}
              onEachFeature={onEachFeature}
            />
            <GradeSelector
              selectedGrade={selectedGrade}
              onGradeChange={setSelectedGrade}
            />
            <Legend />
          </>
        ) : null}
      </MapContainer>

      <div
        ref={statisticsDrawerRef}
        data-testid="statistics-sidebar"
        className={`fixed left-0 top-0 z-[1000] h-full w-96 transform bg-white shadow-lg transition-transform duration-300 ${
          activeDrawer === 'statistics' ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="h-full overflow-y-auto p-4">
          <div className="mb-4 flex items-center justify-between">
            <CloseButton onClick={() => toggleDrawer('statistics')} />
          </div>
          {roads ? (
            <StatisticsSidebar roads={roads} data-testid="road-stats" />
          ) : (
            <div className="flex h-full items-center justify-center">
              <p className="text-gray-500">Keine Straßendaten verfügbar</p>
            </div>
          )}
        </div>
      </div>

      <div
        className={`fixed right-0 top-0 z-[1000] h-full w-96 transform bg-white shadow-lg transition-transform duration-300 ${
          selectedRoad ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {selectedRoad && (
          <div className="h-full overflow-y-auto p-4">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-xl font-bold">
                {selectedRoad.properties.name}
              </h2>
              <CloseButton onClick={() => setSelectedRoad(null)} />
            </div>

            <div className="mb-4">
              <div className="flex justify-between">
                <span className="font-medium">FID:</span>
                <span>{selectedRoad.properties.fid}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Länge:</span>
                <span>{selectedRoad.properties.len.toFixed(0)}m</span>
              </div>
            </div>

            {isAddingTodo ? (
              <div className="mb-4">
                <h3 className="mb-4 text-lg font-semibold">
                  {selectedTodo ? 'Todo bearbeiten' : 'Neues Todo'}
                </h3>
                <TodoForm
                  todo={selectedTodo}
                  selectedRoad={selectedRoad}
                  onSubmit={handleTodoSubmit}
                  onCancel={handleTodoCancel}
                  data-testid="todo-form"
                />
              </div>
            ) : (
              <div className="mb-4">
                <div className="mb-2 flex items-center justify-between">
                  <h3 className="text-lg font-semibold">TODOs</h3>
                  <button
                    onClick={handleAddTodo}
                    data-testid="add-todo-btn"
                    className="rounded bg-blue-500 px-3 py-1 text-sm font-medium text-white hover:bg-blue-600"
                  >
                    + Neu
                  </button>
                </div>
                {isLoadingRoadTodos ? (
                  <p>Loading todos...</p>
                ) : (
                  <TodoList todos={roadTodos} onEdit={handleEditTodo} />
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
