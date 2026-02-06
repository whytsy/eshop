import { Pagination } from "react-bootstrap"
import { observer } from 'mobx-react-lite'
import { useStore } from "../../store/StoreContext"
import './PaginationBlock.css'
import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/outline"
import type { JSX } from "react"

const PaginationBlock = observer(() => {
  const {device} = useStore()

  const pageNumbers = []
  for(let i = 0; i < (device.totalCount / device.limit); i++) {
    pageNumbers.push(i + 1)
  }

  const maxVisiblePages = 5
  
  
  const renderPageNumbers = () => {
    let items: JSX.Element[] = [];
    let startPage = Math.max(1, device.page - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(Math.floor(device.totalCount / device.limit), startPage + maxVisiblePages - 1);

    for (let number = startPage; number <= endPage; number++) {
      items.push(
        <Pagination.Item
          key={number}
          active={number === device.page}
          onClick={() => device.setPage(number)}
          className="cursor-pointer bg-zinc-200 dark:bg-zinc-700 hover:bg-zinc-300 dark:hover:bg-zinc-600 transition duration-300 px-1.5 py-1 rounded-lg"
        >
            {number}
        </Pagination.Item>
      )
    }

    return (items)
  }


  return (
    <div className="align-self-center">
      <Pagination
        className="rounded-xl flex flex-col sm:flex-row justify-between align-items-center"
      >
          <Pagination.Prev className="font-bold cursor-pointer" disabled={device.page === 1} onClick={() => device.setPage(device.page - 1)}>
            <div className="flex flex-row align-items-center gap-2">
              <ArrowLeftIcon className="w-5 h-5" />
              <span>Previous</span>
            </div>
          </Pagination.Prev>

          <div className="flex">
            {renderPageNumbers()}
          </div>

          <Pagination.Next className="font-bold cursor-pointer" disabled={device.page === Math.floor(device.totalCount / device.limit)} onClick={() => device.setPage(device.page + 1)}>
            <div className="flex flex-row align-items-center gap-2">
              <span>Next</span>
              <ArrowRightIcon className="w-5 h-5" />
            </div>
          </Pagination.Next>
      </Pagination>
    </div>
  )
})

export default PaginationBlock