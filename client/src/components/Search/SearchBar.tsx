import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { getAllDevices } from "../../http/deviceAPI";
import { isErrorResponse } from "../../http/errors/ErrorHandler";
import { toast } from "react-toastify";
import { useStore } from "../../store/StoreContext";
import { observer } from 'mobx-react-lite';

const SearchBar = observer(() => {

  const [query, setQuery] = useState("")
  const {device} = useStore()

  const searchItem = async (query: string) => {
      query = query.trim().toLocaleLowerCase()
      if (query == "") {
        getAllDevices(1, device.limit).then(data => {
          if (isErrorResponse(data)) {
            return toast.error("Error while getting devices")
          }
          
          device.setQuery(undefined)
          device.setDevices(data.rows)
          device.setTotalCount(data.count)
          device.setPage(1)
        })
      } else {
        const devices = await getAllDevices(1, device.limit, device.selectedType?.id, device.selectedBrand?.id, query)
  
        if (isErrorResponse(devices)) {
          return toast.error("No devices found")
        }
  
        device.setQuery(query)
        device.setPage(1)
        device.setTotalCount(devices.count)
        device.setDevices(devices.rows)
      }
    }

  return (
    <div
      className='max-h-12 p-3 flex items-center space-x-4 rounded-3xl bg-zinc-100 dark:bg-zinc-700 hover:bg-zinc-300 dark:hover:bg-zinc-600 transition duration-300 text-gray-800 dark:text-gray-200 border-1 border-zinc-300 dark:border-zinc-600 w-fit'
    >
      <MagnifyingGlassIcon className="h-6 w-6 text-gray-500" />
      <input value={query} onChange={e => { 
        if (e.target.value === "") {
          searchItem(e.target.value)
        }
        setQuery(e.target.value.trim().toLocaleLowerCase())
      }} className="focus:outline-none" type="text" placeholder="Search item..." />
      
      <div className="text-white rounded-3xl bg-black hover:bg-gray-500 px-4 py-1.5">
        <button
          onClick={() => {
            searchItem(query)
          }}
        >
            Search
        </button>
      </div>
      
    </div>
  )
})

export default SearchBar