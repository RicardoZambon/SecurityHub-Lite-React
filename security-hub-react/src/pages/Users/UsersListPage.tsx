import RefreshButton from '../../components/ListGrids/buttons/RefreshButton';
import ListGrid, { type LisGridColumn } from '../../components/ListGrids/ListGrid';
import SearchBox from '../../components/SearchBox';
import ListView from '../../components/Views/ListView';
import { useListUsers } from '../../hooks/entities/useListUsers';
import type { User } from '../../services/userService';

export default function UsersPage() {
  const useUsersHook = useListUsers();
  const { isLoading, isFetching, refresh } = useUsersHook;

  const columns: LisGridColumn<User>[] = [
    { property: 'name', header: 'Name' },
    { property: 'email', header: 'Email' },
    { property: 'department', header: 'Department' },
    { property: 'jobFunction', header: 'Job Function' },
  ];

  return (
    <ListView
      actions={
        <SearchBox
          label="Filter by user:"
          placeholder="Search users..."
          field="name"
        />
      }
      buttons={
        <>
          <RefreshButton
            refreshFunc={() => { refresh(); }}
            isDisabled={isLoading}
            isLoading={isFetching && !isLoading}
          />
        </>
      }>
      <ListGrid
        columns={columns}
        useEntityList={useUsersHook}
      />
    </ListView>
  );
}