import { labelService } from "@shared/api/labelService";
import { useQuery } from "@tanstack/react-query";

type QueryOptionProps = {
  enabled?: boolean;
};

const useLabels = ({ enabled }: QueryOptionProps = {}) => {
  const query = useQuery({
    queryKey: ["labels"],
    queryFn: () => labelService.list(),
    enabled,
  });
  return query;
};

export default useLabels;
