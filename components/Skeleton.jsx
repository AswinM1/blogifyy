import React from 'react'

function Skeleton() {
  return (
    <div>
         <li key={blog._id} className="border p-4 rounded">
              <h3 className="text-lg font-semibold">{blog.title}</h3>
              <p className="text-gray-600"></p>
              <p className="text-sm mt-2"></p>
              <p className="mt-2 text-sm text-gray-500">
              
              </p>
            </li>
    </div>
  )
}

export default Skeleton