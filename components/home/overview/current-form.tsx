"use client";

import { useQuery, gql } from "@apollo/client";

const RECENT_FORM = gql`
  query Query($id: ID!, $season: Int!) {
    getForm(id: $id, season: $season)
  }
`;

const CurrentForm = () => {
  const { loading, error, data } = useQuery(RECENT_FORM, {
    variables: { id: "33", season: 2024 },
  });

  if (loading) return <p className="item-three">Loading...</p>;
  if (error) return <p className="item-three">Error: {error.message}</p>;

  const form = data.getForm;
  return (
    <div className="item-three">
      <p>{form}</p>
    </div>
  );
};

export default CurrentForm;
