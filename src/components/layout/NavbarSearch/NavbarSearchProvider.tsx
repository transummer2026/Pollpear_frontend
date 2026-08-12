import { useEffect, useRef, useState, type ReactNode } from "react";
import { useNavigate } from "react-router";
import {
  Command,
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
} from "@/components/ui/command";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { useSearch } from "@/hooks/search/use-search";
import { SEARCH_MODELS, type SearchScope } from "@shared/schemas/search.schema";
import { UserSearchGroup } from "@/components/layout/NavbarSearch/UserSearchGroup";
import { PollSearchGroup } from "@/components/layout/NavbarSearch/PollSearchGroup";
import { RoomSearchGroup } from "@/components/layout/NavbarSearch/RoomSearchGroup";
import { SearchDialogContext } from "@/components/layout/NavbarSearch/search-context";

const SCOPE_LABELS: Record<SearchScope, string> = {
  all: "All",
  user: "Users",
  poll: "Polls",
  room: "Rooms",
};

/**
 * With "all" selected, 5+5+5 results rarely fit in the list's max-height and
 * the scrollbar is hidden (no-scrollbar), so nothing hints there's more
 * below. Capping each group keeps "all" scannable; a specific scope still
 * shows the full 5 from the backend.
 */
const ALL_SCOPE_GROUP_LIMIT = 3;

export function NavbarSearchProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const [scope, setScope] = useState<SearchScope>("all");
  const navigate = useNavigate();
  const { text, onQueryChange, data, isLoading } = useSearch(scope);
  const listRef = useRef<HTMLDivElement>(null);
  const [hasOverflow, setHasOverflow] = useState(false);

  const close = () => {
    setOpen(false);
    onQueryChange("");
  };

  const goTo = (path: string) => {
    close();
    navigate(path);
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "k" && (event.metaKey || event.ctrlKey)) {
        event.preventDefault();
        setOpen(true);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const showUsers = scope === "all" || scope === "user";
  const showPolls = scope === "all" || scope === "poll";
  const showRooms = scope === "all" || scope === "room";
  const hasQuery = text.trim().length >= 2;
  const hasResults =
    !!data &&
    (data.users.length > 0 || data.polls.length > 0 || data.rooms.length > 0);
  const groupLimit = scope === "all" ? ALL_SCOPE_GROUP_LIMIT : undefined;
  const users = data?.users.slice(0, groupLimit) ?? [];
  const polls = data?.polls.slice(0, groupLimit) ?? [];
  const rooms = data?.rooms.slice(0, groupLimit) ?? [];

  useEffect(() => {
    const el = listRef.current;
    if (!el) return;
    setHasOverflow(el.scrollHeight > el.clientHeight);
  }, [data, scope]);

  return (
    <SearchDialogContext.Provider value={{ open: () => setOpen(true) }}>
      {children}

      <CommandDialog
        open={open}
        onOpenChange={(next) => (next ? setOpen(true) : close())}
        title="Search"
        description="Search for users, polls or rooms"
      >
        <Command shouldFilter={false}>
          <CommandInput
            value={text}
            onValueChange={onQueryChange}
            placeholder="Search users, polls, rooms..."
          />
          <div className="px-2 pt-1 pb-2">
            <ToggleGroup
              type="single"
              variant="outline"
              size="sm"
              value={scope}
              onValueChange={(value) => value && setScope(value as SearchScope)}
            >
              <ToggleGroupItem value="all">{SCOPE_LABELS.all}</ToggleGroupItem>
              {SEARCH_MODELS.map((model) => (
                <ToggleGroupItem key={model} value={model}>
                  {SCOPE_LABELS[model]}
                </ToggleGroupItem>
              ))}
            </ToggleGroup>
          </div>
          <CommandList ref={listRef}>
            {!hasQuery ? (
              <CommandEmpty>Type at least 2 characters</CommandEmpty>
            ) : isLoading ? (
              <CommandEmpty>Searching...</CommandEmpty>
            ) : !hasResults ? (
              <CommandEmpty>No results found</CommandEmpty>
            ) : (
              <>
                {showUsers && (
                  <UserSearchGroup
                    users={users}
                    onSelect={(id) => goTo(`/users/${id}`)}
                  />
                )}
                {showPolls && <PollSearchGroup polls={polls} />}
                {showRooms && (
                  <RoomSearchGroup
                    rooms={rooms}
                    onSelect={(id) => goTo(`/rooms/${id}`)}
                  />
                )}
              </>
            )}
            {hasOverflow && (
              <div className="sticky bottom-0 h-0">
                <div className="pointer-events-none absolute inset-x-0 bottom-0 h-8 bg-gradient-to-t from-popover to-transparent" />
              </div>
            )}
          </CommandList>
        </Command>
      </CommandDialog>
    </SearchDialogContext.Provider>
  );
}
