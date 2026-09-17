import React, { useState, useEffect } from "react";
import "./Class.css"

function ClassGraphQL(props) {

    const [classInfo, setClassInfo] = useState({});

    const url = "https://anteaterapi.com/v2/graphql/";

    useEffect(() => {
        const fetchData = async () => {

            const query = `
query {
    course(id:"${props.name}") {
        title
        departmentName
        description
    }
}
`

            const response = await fetch(url, {
                method: "POST",
                body: JSON.stringify({query}),
                headers: {
                    "Content-Type": "application/json"
                }
            });
            const data = await response.json();
            console.log(data);
            setClassInfo(!data.errors ? data.data.course : data);
        }
        fetchData();
    }, [props.name]);

    let info;
    if (classInfo.errors) {
        info = <p>Class not found</p>
    }
    else if (classInfo.title) {
        info = <div className="information">
            <p id="title">{classInfo.title}</p>
            <p id="department">{classInfo.departmentName}</p>
            <p id="description">{classInfo.description}</p>
        </div>
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

export default ClassGraphQL;
