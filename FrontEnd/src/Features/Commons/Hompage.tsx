import { useSelector } from "react-redux";
import { useQuery, gql } from "@apollo/client";

const getUser = gql`
  query FindUser($userSearchInput: UserSearchInput) {
    FindUser(UserSearchInput: $userSearchInput) {
      Email
      Username
    }
  }
`;

function HomePage() {
  const storeEmail = useSelector((state: any) => state.baseReducer.user.Email);
  const token = useSelector((state: any) => state.baseReducer.user.token);
  console.log("Token ==>", token);
  console.log("Email ==>", storeEmail);
  const { loading, error, data } = useQuery(getUser, {
    variables: {
      userSearchInput: {
        Email: storeEmail,
      },
    },
    context: {
      headers: {
        authorization: token,
      },
    },
  });
  console.log("LOADING ==>", loading);
  console.log("ERROR ==>", error);
  console.log("DATA ==>", data);
  return (
    <>
      <p>Hompage</p>
      <p>{JSON.stringify(data)}</p>
    </>
  );
}

export default HomePage;
