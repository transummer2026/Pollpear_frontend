import { createContext, useContext } from "react";

type SearchDialogContextValue = {
  open: () => void;
};

export const SearchDialogContext =
  createContext<SearchDialogContextValue | null>(null);

/**
 * Opens the search dialog from anywhere under the provider. Only the opener is
 * exposed: the dialog owns its query and its results, and a caller that could
 * write to them would be able to fight the user's typing.
 */
export function useSearchDialog() {
  const context = useContext(SearchDialogContext);
  if (!context) {
    throw new Error(
      "useSearchDialog must be used within a <NavbarSearchProvider>",
    );
  }
  return context;
}
