import { Link, useNavigate, useParams } from "react-router-dom";

import Modal from "../UI/Modal.jsx";
import EventForm from "./EventForm.jsx";
import { useMutation, useQuery } from "@tanstack/react-query";
import { fetchEvent, queryClient, updateEvent } from "../../util/http.js";
import LoadingIndicator from "../UI/LoadingIndicator.jsx";

export default function EditEvent() {
  const navigate = useNavigate();
  const { id } = useParams();

  const { data, isPending } = useQuery({
    queryKey: ["event", id],
    queryFn: ({ signal }) => fetchEvent({ signal, id }),
  });

  const { mutate } = useMutation({
    mutationFn: updateEvent,
    onSuccess: () => {
      queryClient.invalidateQueries(["events"]);
      navigate("../");
    },
  });

  function handleSubmit(formData) {
    mutate({ id, event: formData });
  }

  function handleClose() {
    navigate("../");
  }

  if (isPending) {
    return (
      <Modal>
        <LoadingIndicator />
      </Modal>
    );
  }

  return (
    <Modal onClose={handleClose}>
      <EventForm inputData={data} onSubmit={handleSubmit}>
        <Link to="../" className="button-text">
          Cancel
        </Link>
        <button type="submit" className="button">
          Update
        </button>
      </EventForm>
    </Modal>
  );
}
