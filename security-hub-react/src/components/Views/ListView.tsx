import { ListViewProvider } from '../../context/ListContext';
import type { ViewProps } from './View';
import View from './View';

type ListViewProps = ViewProps & {
  fixedFilters?: Record<string, string | null | undefined>,
};

export default function ListView({
  actions,
  buttons,
  children,
  icon,
  showBackButton = false,
  title,
}: ListViewProps) {
  return (
    <ListViewProvider>
      <View
        actions={actions}
        buttons={buttons}
        icon={icon}
        showBackButton={showBackButton}
        title={title}
      >
        {children}
      </View>
    </ListViewProvider>
  );
}