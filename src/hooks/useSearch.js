import { useEffect, useRef, useState } from "react";

export function useSearch() {
  const [search, updateSearch] = useState("");
  const [error, setError] = useState(null);
  const isFirstInput = useRef(true);

  useEffect(() => {
    if (isFirstInput.current) {
      isFirstInput.current = search === "";
      return;
    }

    if (search === "") {
      setError("Cant find empty movie");
      return;
    }

    if (search.match(/^\d+$/)) {
      setError("Cant find movie with number");
      return;
    }

    if (search.length < 3) {
      setError("The search must be larger than 3 characters");
      return;
    }

    setError(null);
  }, [search]);

  return { search, updateSearch, error };
}
