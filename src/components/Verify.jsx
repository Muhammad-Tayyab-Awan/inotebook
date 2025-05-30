/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import doneIcon from "../assets/done-icon.svg";
import cancelIcon from "../assets/cancel-icon.svg";
const URL = import.meta.env.VITE_API_URL;

function Verify(prop) {
  const [verifying, setVerification] = useState(true);
  const [verification, setVerificationStatus] = useState(null);
  document.title = "Verify Email | INotebook";
  let param = useParams();
  const delay = () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, 3000);
    });
  };
  useEffect(() => {
    prop.setProgress(100);
    fetch(`${URL}verify/${param.token}`)
      .then((response) => response.json())
      .then(async (response) => {
        setVerification(false);
        if (response.success) {
          setVerificationStatus(true);
          await delay();
          window.location.assign("/login");
        } else {
          setVerificationStatus(false);
          await delay();
          window.location.assign("/login");
        }
      });
  }, [param.token]);
  return (
    <div className="flex h-screen w-full items-start justify-center bg-yellow-200">
      {verifying ? (
        <div className="my-6 flex flex-col items-center justify-center gap-3">
          <h1 className="text-center text-2xl">Verifying....</h1>
          <div className="text-3xl font-extrabold">
            <span className="loading-animation">.</span>
            <span className="loading-animation">.</span>
            <span className="loading-animation">.</span>
          </div>
        </div>
      ) : (
        <div className="my-6 flex flex-col items-center justify-center gap-3">
          <h1
            className={`${
              verification ? "text-lime-600" : "text-red-600"
            } text-center text-2xl`}
          >
            {verification
              ? "Email Verified Successfully"
              : "Email Verification Failed"}
          </h1>
          <img
            src={verification ? doneIcon : cancelIcon}
            alt="verification icon"
            className="h-8 w-8"
          />
        </div>
      )}
    </div>
  );
}

export default Verify;
