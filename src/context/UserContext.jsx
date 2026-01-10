// import { createContext, useEffect, useState } from "react";

// // Create User Context
// const UserContext = createContext(null);

// const UserProvider = ({ children }) => {
//   // initially no user
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);
//   // Load user from localStorage on mount
//   useEffect(() => {
//     const savedUser = localStorage.getItem("user");
//     if (savedUser) {
//       setUser(JSON.parse(savedUser))
//     };
//     setLoading(false);
//   }, []);
//   return (
//     <UserContext.Provider value={{ user, setUser, loading }}>
//       {!loading && children}
//     </UserContext.Provider>
//   );
// };

// export { UserContext, UserProvider };

import { createContext, useEffect, useState } from "react";

// Create User Context
const UserContext = createContext(null);

const UserProvider = ({ children }) => {
  // initially no user
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  // Load user from localStorage on mount
  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);
  return (
    <UserContext.Provider value={{ user, setUser, loading }}>
      {/* Show a loading indicator while retrieving user data */}
      {loading ? (
        <div>
          <p>Loading...</p>
        </div>
      ) : (
        // Render children only after loading is complete
        children
      )}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };
