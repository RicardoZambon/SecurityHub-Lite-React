import { createContext, useContext, useEffect, useState } from 'react';
import type { EntityDetails } from '../types/entityDetails';
import type { Errors } from '../types/errors';

type DataViewContextState = {
  clearErrors: () => void;
  disable: () => void;
  enable: () => void;
  errors: Errors | null;
  entityDetails?: EntityDetails<any>;
  finishEditing: () => void;
  formData: any;
  isDisabled: boolean;
  isLoading: boolean;
  isNew: boolean;
  mode: 'view' | 'edit';
  setErrors: (errors: Errors | null) => void;
  startEditing: () => void;
  updateData: (data: any) => void;
  updateField: (field: string, data: any) => void;
};

const DataViewContext = createContext<DataViewContextState | undefined>(undefined);

export function DataViewProvider<T>({
  children,
  entityDetails,
}: { children: React.ReactNode, entityDetails?: EntityDetails<T> }) {
  const [errors, setErrors] = useState<Errors | null>(null);
  const [formData, setFormData] = useState<T | undefined>(undefined);
  const [isDisabled, setIsDisabled] = useState<boolean>(false);
  const [isNew, setIsNew] = useState<boolean>(!entityDetails || !entityDetails.item);
  const [mode, setMode] = useState<'view' | 'edit'>(entityDetails ? 'view' : 'edit');

  useEffect(() => {
    setIsNew(!entityDetails);

    if (!isNew) {
      if (entityDetails?.item) {
        setFormData(entityDetails.item);
      }
    }
  }, [entityDetails]);

  function handleUpdateField(field: string, data: any) {
    setFormData((prevFormData) => ({ ...prevFormData, [field]: data }) as T);
  }

  return (
    <DataViewContext.Provider value={{
      clearErrors: () => setErrors(null),
      disable: () => setIsDisabled(true),
      enable: () => setIsDisabled(false),
      errors,
      entityDetails,
      finishEditing: () => setMode('view'),
      formData,
      isDisabled,
      isLoading: entityDetails ? entityDetails.isLoading : false,
      isNew,
      mode,
      setErrors: (errors: Errors | null) => setErrors(errors),
      startEditing: () => setMode('edit'),
      updateData: (data: any) => setFormData(data),
      updateField: handleUpdateField,
    }}>
      {children}
    </DataViewContext.Provider>
  );
}

export function useDataView() {
  const ctx: DataViewContextState | undefined = useContext(DataViewContext);
  if (!ctx) {
    throw new Error('useDataView must be used inside DataViewProvider');
  }
  return ctx;
}
