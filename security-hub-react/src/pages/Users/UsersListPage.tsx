import { ListGrid, type LisGridColumn } from '../../components/ListGrids/ListGrid';
import { PageSection } from '../../components/PageSection';
import { SearchBox } from '../../components/SearchBox';
import { usePage } from '../../context/PageContext';
import { useListUsers } from '../../hooks/entities/useListUsers';
import type { User } from '../../services/userService';

function UsersPage() {
  const { filter, setFilter } = usePage();

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
          label="Filter by user:"
          placeholder="Search users..."
          value={filter['name'] || ''}
          onChange={(value) => setFilter('name', value)}
        />
      }>

      {<ListGrid
        gridUniqueKey='users-list-grid'
        columns={columns}
        useEntityList={useListUsers()}
      />}
    </PageSection>
  );
}

export default UsersPage;
