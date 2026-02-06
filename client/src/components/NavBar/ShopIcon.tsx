import { BuildingStorefrontIcon } from "@heroicons/react/24/outline";
import HeaderIcon from "./HeaderIcon";

const ShopIcon = () => {
  return (
    <HeaderIcon>
      <BuildingStorefrontIcon className="h-6 w-6" />
      <div className="hidden sm:visible font-bold text-xl">StuffShop</div>
    </HeaderIcon>
  )
}

export default ShopIcon