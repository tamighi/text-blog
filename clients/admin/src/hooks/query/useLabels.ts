import { labelService } from "@shared/api/labelService";
import type { QueryLabelDto } from "@shared/types/label";
import { useQuery } from "@tanstack/react-query";

type QueryOptionProps = {
  enabled?: boolean;
  queryParams?: QueryLabelDto;
};

const useLabels = ({ enabled, queryParams }: QueryOptionProps = {}) => {
  const query = useQuery({
    queryKey: ["labels", queryParams],
    queryFn: () => labelService.list(queryParams),
    enabled,
  });
  return query;
};

export default useLabels;
