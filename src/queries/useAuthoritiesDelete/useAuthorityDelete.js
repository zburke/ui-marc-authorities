import { useMutation } from 'react-query';
import { useOkapiKy } from '@folio/stripes/core';


const useAuthorityDeleteMutation = ({ onError, onSuccess, ...restOptions }) => {
  const ky = useOkapiKy();

  const customOptions = {
    onError: () => {
      return onError();
    },

    onSuccess: () => {
      return onSuccess();
    },
  };

  const { mutate } = useMutation(
    (id) => ky.delete(`records-editor/records/${id}`),
    { ...customOptions, ...restOptions },
  );

  return {
    deleteItem: mutate,
  };
};

export default useAuthorityDeleteMutation;
