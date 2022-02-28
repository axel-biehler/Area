import React from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import {getToken} from "../api/auth";

function RedditAuth() {
    const navigate = useNavigate();
    const search = useLocation().search;
    console.log(search);
    const token = new URLSearchParams(search).get('code');
    console.log(token);
    const authToken = getToken();
    console.log(authToken);
    const requestHeaders = new Headers();
    requestHeaders.set("Content-Type", "application/json");
    requestHeaders.set("Authorization", authToken != null ? `Bearer ${authToken}` : "");
    console.log({ token });
    const RedditUrl = fetch("http://localhost:8080/services/reddit/link", {
        method: 'POST',
        headers: requestHeaders,
        body: JSON.stringify({token}),
    });

    navigate("/");
    return (
        <div>
             
        </div>
    )
};

export default RedditAuth