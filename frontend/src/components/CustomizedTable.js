import * as React from "react";
import { styled } from "@mui/material/styles";
import { Table, Badge } from "react-bootstrap";
import useApp from "../store/contexts/AppContext";
import { Link } from "react-router-dom";

const { REACT_APP_VIEW_POST_URL } = process.env;

export default function CustomizedTables() {
  const {
    appState: { users },
  } = useApp();

  const badgeStatus = ["primary", "danger", "warning", "success", "info"];

  return (
    <Table striped bordered hover variant="dark" responsive>
      <thead>
        <tr>
          <th>#</th>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Email</th>
          <th>Department</th>
          <th>Gender</th>
          <th>Date</th>
        </tr>
      </thead>
      <tbody>
        {Object.values(users).length
          ? Object.keys(users).map((item, i) => {
              return (
                <tr key={users[item]._id}>
                  <td>{i+1}</td>
                  <td>{users[item].firstname}</td>
                  <td>{users[item].lastname}</td>
                  <td>{users[item].email}</td>
                  <td>
                    <Badge
                      pill
                      bg={badgeStatus[Math.floor(Math.random()*badgeStatus.length)]}
                    >
                      {users[item].department}
                    </Badge>{" "}
                  </td>
                  <td>{users[item].gender}</td>
                  <td>{new Date (users[item].createdAt).toDateString()}</td>
                </tr>
              );
            })
          : null}
      </tbody>
    </Table>
  );
}
