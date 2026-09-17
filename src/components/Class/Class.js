import React, { useState, useEffect } from "react";
import "./Class.css"

function Class(props) {

    const [classInfo, setClassInfo] = useState({});

    const url = "https://anteaterapi.com/v2/rest/courses/";

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(url + props.name, {
                "method": "GET"
            });
            const data = await response.json();
            console.log(data);
            setClassInfo(data);
        }
        fetchData();
    }, [props.name]);

    let info;
    if (classInfo.ok === true) {
        info = <div className="information">
            <p id="title">{classInfo.data.title}</p>
            <p id="department">{classInfo.data.departmentName}</p>
            <p id="description">{classInfo.data.description}</p>
        </div>
    } else if (classInfo.ok === false) {
        info = <p>Class not found</p>
    } else {
        info = <p>Loading...</p>
    }

    return (
        <div className="class">
            {props.name}
            <div>
                {info}
            </div>
        </div>
    );
}

export default Class;
