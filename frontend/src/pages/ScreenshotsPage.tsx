// // src/pages/dashboard/ScreenshotsPage.tsx
// import React, { useState, useEffect } from 'react'
// import { Layout } from '../components/layout/Layout'
// import { ScreenshotFilters } from '../components/dashboard/ScreenshotFilters'
// import { ScreenshotGrouped } from '../components/dashboard/ScreenshotGrouped'
// import { ScreenshotGrid } from '../components/dashboard/ScreenshotGrid'
// import { useScreenshots } from '../hooks/queries/useScreenshotQueries'
// import { useEmployees } from '../hooks/queries/useEmployeeQueries'
// import { useAuth } from '../context/AuthContext'
// import { getDateString } from '../utils/formatters'
// import { Spinner } from '../components/common/Spinner'
// import type { ScreenshotGroup, Screenshot } from '../types/screenshot.types'

// export const ScreenshotsPage: React.FC = () => {
//   const { user } = useAuth()
//   const isOwner = user?.role === 'owner'

//   const [selectedEmployeeId, setSelectedEmployeeId] = useState('')
//   const [selectedDate, setSelectedDate] = useState(getDateString(new Date()))
//   const [groupBy, setGroupBy] = useState('5min')

//   const { employees, fetchEmployees } = useEmployees()
//   const { screenshots, isLoading, fetchScreenshots } = useScreenshots()

//   useEffect(() => {
//     if (isOwner) {
//       fetchEmployees()
//     }
//   }, [isOwner, fetchEmployees])

//   useEffect(() => {
//     const filters: any = {
//       date: selectedDate,
//     }

//     if (selectedEmployeeId) {
//       filters.userId = parseInt(selectedEmployeeId)
//     }

//     if (groupBy !== 'all') {
//       filters.groupBy = groupBy
//     }

//     fetchScreenshots(filters)
//   }, [selectedEmployeeId, selectedDate, groupBy, fetchScreenshots])

//   const isGrouped = groupBy !== 'all'

//   return (
//     <Layout>
//       <div>
//         <h1 className="text-3xl font-bold text-gray-900 mb-2">Screenshots</h1>
//         <p className="text-gray-600 mb-6">
//           View and filter employee activity screenshots
//         </p>

//         {isOwner && (
//           <ScreenshotFilters
//             employees={employees}
//             selectedEmployeeId={selectedEmployeeId}
//             selectedDate={selectedDate}
//             groupBy={groupBy}
//             onEmployeeChange={setSelectedEmployeeId}
//             onDateChange={setSelectedDate}
//             onGroupByChange={setGroupBy}
//           />
//         )}

//         {isLoading ? (
//           <div className="flex justify-center py-12">
//             <Spinner size="lg" />
//           </div>
//         ) : isGrouped ? (
//           <ScreenshotGrouped groups={screenshots as ScreenshotGroup[]} />
//         ) : (
//           <ScreenshotGrid screenshots={screenshots as Screenshot[]} />
//         )}
//       </div>
//     </Layout>
//   )
// }
