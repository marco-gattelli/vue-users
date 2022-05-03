import gql from "graphql-tag";

export const query = gql`
  query Users($q: String, $page: Int) {
    users(options: { search: { q: $q }, paginate: { page: $page } }) {
      data {
        id
        name
        email
        phone
        company {
          name
          catchPhrase
        }
      }
    }
  }
`;

/*export const paginatedQuery = gql`
  query Users($q: String, $page: Int) {
    users(options: { search: { q: $q }, paginate: { page: $page } }) {
      data {
        id
        name
        email
        phone
        company {
          name
          catchPhrase
        }
      }
    }
  }
`;*/
