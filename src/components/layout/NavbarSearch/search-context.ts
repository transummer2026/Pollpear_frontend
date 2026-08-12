import { createContext, useContext } from "react";

type SearchDialogContextValue = {
  open: () => void;
};

export const SearchDialogContext =
  createContext<SearchDialogContextValue | null>(null);

export function useSearchDialog() {
  const context = useContext(SearchDialogContext);
  if (!context) {
    throw new Error(
      "useSearchDialog must be used within a <NavbarSearchProvider>",
    );
  }
  return context;
}
