import { createContext, useContext as UC } from "react";

const Context = createContext([[], () => {}]);

export const useContext = () => UC(Context);

export default Context;
