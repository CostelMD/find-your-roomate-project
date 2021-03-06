import React from "react";
import { useDispatch } from "react-redux";
import { useQuery} from "react-query";

import {
  errorNotification,
  successNotification,
  warnNotification,
} from "components/Layouts/Public/NotificationsComponent/actions";
import Spinner from "components/Spinner/Spinner";

import AcceptButton from "components/Layouts/Private/AcceptButton";
import DeclineButton from "components/Layouts/Private/RejectButton";
import UserBox from "modules/UserBox";
import {
  getPotentialMatches,
  sendRequest,
} from "api/Matches API";
import { getLocalUser } from "helpers/helpers";
import { useMutation } from "react-query";
const UserDashboard = (props) => {
  const dispatch = useDispatch();
  const user = getLocalUser();
  const { isLoading, error, data } = useQuery("potentialMatch", () =>
    getPotentialMatches(user.id)
  );
  const sendRequestMutation = useMutation(sendRequest);

  if (isLoading) return <Spinner />;

  if (error) {
    dispatch(errorNotification("Error on retreiving matched matches"));
    return (
      <div className="container m-16">
        <h1 className="text-blue-500 text-3xl font-bold -ml-3">
          Potential Matches
        </h1>
      </div>
    );
  }

  const onSendRequest = (values) => {
    sendRequestMutation.mutate(
      { ...values, requester_id: user.id },
      {
        onSuccess: (data) => {
          dispatch(successNotification("Send request successfuly"));
          // queryClient.setQueryData("potentialMatch", (oldData) => {
          //   return oldData.filter((data) => data.id !== values.receiver_id);
          // });
        },
        onError: () => {
          dispatch(warnNotification("Request already sent"));
        },
      }
    );
  };

  return (
    <div className="m-16 container">
      <h1 className="text-blue-500 text-3xl font-bold row">
        Potential Matches
      </h1>
      <div className="row">
        {data.length>0 ?data.map((data, index) => {
          return (
            <UserBox index={index} data={data}>
              <div className="row mt-1 text-lg">
                <div className="col text-center">
                  <AcceptButton
                    onClick={() => onSendRequest({ receiver_id: data.id })}
                  />
                </div>
                <div className="col text-center">
                  <DeclineButton />
                </div>
              </div>
            </UserBox>
          );
        }):  <h1 className="text-blue-500 text-2xl mt-10">
        You don't have potential matches yet
      </h1>
        }
      </div>
    </div>
  );
};

export default UserDashboard;
