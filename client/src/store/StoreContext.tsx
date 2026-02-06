import { createContext, useContext, type ReactNode } from "react";
import { CartStore } from "./CartStore";
import { DeviceStore } from "./DeviceStore";
import { UserStore } from "./UserStore";

const user = new UserStore();
const device = new DeviceStore();
const cart = new CartStore();

interface StoreContextType {
  user: UserStore;
  device: DeviceStore;
  cart: CartStore;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export const StoreProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <StoreContext.Provider value={{ user, device, cart }}>
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore error');
  }
  return context;
};