import React, { useState, useEffect} from 'react'
// import myFetch from "../api/api";
import {getToken} from "../api/auth";
// import axios from "axios";
// import Header from "../components/layout/Header";

// const GoTo = async (e) => {
//     e.preventDefault();
//     const name = "memes"
//     try {
//         const bodyReq = new URLSearchParams();
//         bodyReq.append('name', name);
//         const loginResponse = await axios.post(
//             "http://localhost:8080/reddit/sub",
//             bodyReq,
//         ).then((res) => {
//             console.log(res.data);
//         });
//     } catch (err) {
//         console.log(err);
//     }
// };

// const Current = async (e) => {
//     e.preventDefault();
//     const city = "Strasbourg";
//     try {
//         const loginResponse = await axios.get(
//             `http://localhost:8080/weather/current?city=${city}`,
//         ).then((res) => {
//             console.log(res.data);
//         });
//     } catch (err) {
//         console.log(err);
//     }
// };

// const Crypto = async (e) => {
//     e.preventDefault();
//     const coin = "bitcoin";
//     const currency = "eur";
//     try {
//         const loginResponse = await axios.get(
//             `http://localhost:8080/crypto/value?coin=${coin}&currency=${currency}`,
//         ).then((res) => {
//             console.log(res.data);
//         });
//     } catch (err) {
//         console.log(err);
//     }
// };

// const Bourse = async (e) => {
//     e.preventDefault();
//     const symbol = "AAPL";
//     try {
//         const loginResponse = await axios.get(
//             `http://localhost:8080/bourse/value?symbol=${symbol}`,
//         ).then((res) => {
//             console.log(res.data);
//         });
//     } catch (err) {
//         console.log(err);
//     }
// };

// const Forecast = async (e) => {
//     e.preventDefault();
//     const city = "Strasbourg";
//     const nb = "2";
//     try {
//         const loginResponse = await axios.get(
//             `http://localhost:8080/weather/forecast?city=${city}&nb=${nb}`,
//         ).then((res) => {
//             console.log(res.data);
//         });
//     } catch (err) {
//         console.log(err);
//     }
// };

// const GoToMe = async (e) => {
//     e.preventDefault();
//     try {
//         let userToken = localStorage.getItem("auth-token");
//         const loginResponse = await axios.get(
//             "http://localhost:8080/reddit/me",
//             {headers: { "x-auth-token": userToken }},
//         ).then((res) => {
//             console.log(res.data);
//         });
//     } catch (err) {
//         console.log(err);
//     }
// };



function ProfileTodo() {
    
    const [urlReddit, setUrl] = useState();
    // const RedditData = JSON.parse(RedditUrl);

    const GetUrl = async (e) => {
        const token = getToken();
        const url = "http://localhost:8080/services/todoist/connect";
        const requestHeaders = new Headers();
        requestHeaders.set("Content-Type", "application/json");
        requestHeaders.set("Authorization", token != null ? `Bearer ${token}` : "");
        const RedditUrl = await fetch(url, {
            method: 'GET',
            headers: requestHeaders,
            body: undefined,
        });
        console.log(RedditUrl);
        setUrl(RedditUrl)
    };

    useEffect(() => {
        GetUrl();

    }, []);

    return (
        <div className="page" id="pageId">
            {/* <Header /> */}
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '100vh'
                }}
            >
            <h1>profile</h1> 
            <a href={urlReddit}>Reddit</a>
            {/* <button onClick={ConnectReddit}>Connect Reddit</button> */}
            {/* <button onClick={GoTo}>request sub</button>
            <button onClick={GoToMe}>request me</button>
            <button onClick={Current}>Current Weather</button>
            <button onClick={Forecast}>Forecast Weather</button>
            <button onClick={Crypto}>Crypto</button>
            <button onClick={Bourse}>Bourse</button> */}
            </div>
        </div>
    );
};

export default ProfileTodo;