import { useJwt } from "react-jwt"; // Import useJwt hook from react-jwt
import { useState, useEffect } from "react";

function useAuthToken(token) {
  const [email, setEmail] = useState(null);
  const [fullName, setfullName] = useState(null);
  const [userId, setUserId] = useState(null);
  const decodToken = useJwt(token);

  useEffect(() => {
    const decodeFunc = () => {
      if (decodToken) {
        try {
          const userEmail = decodToken?.decodedToken?.email;
          const userfullName = decodToken?.decodedToken?.fullName;
          const userID = decodToken?.decodedToken?.id;
          setEmail(userEmail);
          setfullName(userfullName);
          setUserId(userID);
        } catch (error) {
          console.error("Error extracting email from JWT token:", error);
          setEmail(null);
        }
      } else {
        setEmail(null);
        setfullName(null);
        setUserId(null);
      }
    };
    decodeFunc();
  }, [decodToken]);
  return { email, fullName, userId };
}
export default useAuthToken;
