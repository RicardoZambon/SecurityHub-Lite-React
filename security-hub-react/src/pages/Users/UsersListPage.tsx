import { ListGrid, type LisGridColumn } from '../../components/ListGrid';
import { PageSection } from '../../components/PageSection';
import { SearchBox } from '../../components/SearchBox';
import { useListUsers } from '../../hooks/entities/useListUsers';
import type { User } from '../../services/userService';

function UsersPage() {
  const usersListHook = useListUsers();

  const columns: LisGridColumn<User>[] = [
    { property: 'name', header: 'Name' },
    { property: 'email', header: 'Email' },
    { property: 'department', header: 'Department' },
    { property: 'jobFunction', header: 'Job Function' },
  ];

  return (
    <PageSection
      actions={
        <SearchBox
          label="Filter by role:"
          placeholder="Search roles..."
          value={usersListHook.filter['name'] || ''}
          onChange={(value) => usersListHook.setFilter('name', value)}
        />
      }>

      {<ListGrid
        columns={columns}
        useEntityList={usersListHook}
      />}
    </PageSection>
  );
}

export default UsersPage;
