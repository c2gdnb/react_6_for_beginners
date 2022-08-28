import { useEffect, useState } from "react";
import "./index.scss";
import { Success } from "./components/Success";
import { Users } from "./components/Users";

const API_URL = "https://reqres.in/api/users/";

function App() {
  const [users, setUsers] = useState();
  const [invites, setinvites] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [success, setSuccess] = useState(false);
  const [searchValue, setsearchValue] = useState("");

  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((json) => {
        setUsers(json.data);
      })
      .catch((err) => {
        console.log(err);
        alert("Error response");
      })
      .finally(() => setIsLoading(false));
  }, []);

  const onChangeSearchValue = (e) => {
    setsearchValue(e.target.value);
  };

  const onClickInvite = (id) => {
    if (invites.includes(id)) {
      setinvites((prev) => prev.filter((_id) => _id !== id));
    } else {
      setinvites((prev) => [...prev, id]);
    }
  };

  const onClickSendInvites = () => {
    setSuccess(true);
  };

  const onClickBackBtn = () => {
    setSuccess(false);
  };

  return (
    <div className="App">
      {success ? (
        <Success onClickBackBtn={onClickBackBtn} count={invites.length} />
      ) : (
        <Users
          onChangeSearchValue={onChangeSearchValue}
          searchValue={searchValue}
          items={users}
          isLoading={isLoading}
          invites={invites}
          onClickInvite={onClickInvite}
          onClickSendInvites={onClickSendInvites}
        />
      )}
    </div>
  );
}

export default App;
