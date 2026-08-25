import { useSearchParams } from "react-router";
import Layout from "@/layout/Layout";
import { Input } from "@/components/ui/input";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ItemGroup } from "@/components/ui/item";
import { PaginationControls } from "@/components/ui/pagination-controls";
import { Empty, EmptyHeader, EmptyTitle } from "@/components/ui/empty";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { useSearch } from "@/hooks/search/use-search";
import { UserResultItem } from "@/components/pages/search/UserResultItem";
import { RoomResultItem } from "@/components/pages/search/RoomResultItem";
import {
  SEARCH_MODELS,
  SEARCH_SORT_OPTIONS,
  type SearchScope,
  type SearchSort,
} from "@shared/schemas/search.schema";

const MIN_QUERY_LENGTH = 2;
const PREVIEW_LIMIT = 5;
const PAGE_SIZE = 10;

const SCOPE_LABELS: Record<SearchScope, string> = {
  all: "All",
  user: "Users",
  room: "Rooms",
};

const SORT_LABELS: Record<SearchSort, string> = {
  relevance: "Relevance",
  alphabetical: "Alphabetical",
};

function isSearchScope(value: string | null): value is SearchScope {
  return (
    value === "all" ||
    (SEARCH_MODELS as readonly string[]).includes(value ?? "")
  );
}

function isSearchSort(value: string | null): value is SearchSort {
  return (SEARCH_SORT_OPTIONS as readonly string[]).includes(value ?? "");
}

export default function Search() {
  const [searchParams, setSearchParams] = useSearchParams();

  const q = searchParams.get("q") ?? "";
  const typeParam = searchParams.get("type");
  const scope: SearchScope = isSearchScope(typeParam) ? typeParam : "all";
  const sortParam = searchParams.get("sortBy");
  const sortBy: SearchSort = isSearchSort(sortParam) ? sortParam : "relevance";
  const page = Math.max(1, Number(searchParams.get("page")) || 1);

  const updateParams = (
    updates: Record<string, string | undefined>,
    resetPage = false,
  ) => {
    const next = new URLSearchParams(searchParams);
    for (const [key, value] of Object.entries(updates)) {
      if (value === undefined) next.delete(key);
      else next.set(key, value);
    }
    if (resetPage) next.delete("page");
    setSearchParams(next, { replace: true });
  };

  const isScoped = scope !== "all";

  const { text, onQueryChange, data, isLoading } = useSearch(scope, {
    initialQuery: q,
    limit: isScoped ? PAGE_SIZE : PREVIEW_LIMIT,
    page: isScoped ? page : undefined,
    sortBy: isScoped ? sortBy : undefined,
  });

  const hasQuery = text.trim().length >= MIN_QUERY_LENGTH;
  const users = data?.users ?? [];
  const rooms = data?.rooms ?? [];
  const hasResults = users.length > 0 || rooms.length > 0;

  const scopedItemsCount = scope === "user" ? users.length : rooms.length;
  const scopedTotal = scope === "user" ? data?.usersTotal : data?.roomsTotal;
  const pageCount =
    scopedTotal !== undefined
      ? Math.max(1, Math.ceil(scopedTotal / PAGE_SIZE))
      : scopedItemsCount === PAGE_SIZE
        ? page + 1
        : page;

  return (
    <Layout>
      <div className="mx-auto flex max-w-3xl flex-col gap-4 p-4">
        <Input
          value={text}
          onChange={(e) => {
            onQueryChange(e.target.value);
            updateParams({ q: e.target.value || undefined }, true);
          }}
          placeholder="Search users, rooms..."
        />

        <div className="flex flex-wrap items-center justify-between gap-2">
          <ToggleGroup
            type="single"
            variant="outline"
            size="sm"
            value={scope}
            onValueChange={(value) =>
              value &&
              updateParams({ type: value === "all" ? undefined : value }, true)
            }
          >
            <ToggleGroupItem value="all">{SCOPE_LABELS.all}</ToggleGroupItem>
            {SEARCH_MODELS.map((model) => (
              <ToggleGroupItem key={model} value={model}>
                {SCOPE_LABELS[model]}
              </ToggleGroupItem>
            ))}
          </ToggleGroup>

          {isScoped && (
            <Select
              value={sortBy}
              onValueChange={(value) =>
                updateParams(
                  { sortBy: value === "relevance" ? undefined : value },
                  true,
                )
              }
            >
              <SelectTrigger size="sm">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {SEARCH_SORT_OPTIONS.map((option) => (
                  <SelectItem key={option} value={option}>
                    {SORT_LABELS[option]}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        </div>

        {!hasQuery ? (
          <Empty>
            <EmptyHeader>
              <EmptyTitle>Type at least 2 characters</EmptyTitle>
            </EmptyHeader>
          </Empty>
        ) : isLoading ? (
          <div className="flex flex-col gap-2">
            <Skeleton className="h-14 w-full" />
            <Skeleton className="h-14 w-full" />
            <Skeleton className="h-14 w-full" />
          </div>
        ) : !hasResults ? (
          <Empty>
            <EmptyHeader>
              <EmptyTitle>No results found</EmptyTitle>
            </EmptyHeader>
          </Empty>
        ) : scope === "all" ? (
          <div className="flex flex-col gap-6">
            {users.length > 0 && (
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <h2 className="text-sm font-medium text-muted-foreground">
                    Users
                  </h2>
                  <Button
                    variant="link"
                    size="sm"
                    onClick={() => updateParams({ type: "user" }, true)}
                  >
                    See all users
                  </Button>
                </div>
                <ItemGroup>
                  {users.map((user) => (
                    <UserResultItem key={user.id} user={user} />
                  ))}
                </ItemGroup>
              </div>
            )}
            {rooms.length > 0 && (
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <h2 className="text-sm font-medium text-muted-foreground">
                    Rooms
                  </h2>
                  <Button
                    variant="link"
                    size="sm"
                    onClick={() => updateParams({ type: "room" }, true)}
                  >
                    See all rooms
                  </Button>
                </div>
                <ItemGroup>
                  {rooms.map((room) => (
                    <RoomResultItem key={room.id} room={room} />
                  ))}
                </ItemGroup>
              </div>
            )}
          </div>
        ) : (
          <div className="flex flex-col gap-2">
            <ItemGroup>
              {scope === "user"
                ? users.map((user) => (
                    <UserResultItem key={user.id} user={user} />
                  ))
                : rooms.map((room) => (
                    <RoomResultItem key={room.id} room={room} />
                  ))}
            </ItemGroup>
            <PaginationControls
              page={page}
              pageCount={pageCount}
              onPageChange={(next) => updateParams({ page: String(next) })}
              className="mt-2"
            />
          </div>
        )}
      </div>
    </Layout>
  );
}
