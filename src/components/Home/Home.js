import React, {useState} from 'react';
import Class from "../Class/Class.js";
import ClassGraphQL from "../Class/ClassGraphQL.js"
import "./Home.css";

function Home(props) {
    const [value, setValue] = useState('');
    const [backendType, setApiType] = useState('rest')
    const [favoriteClasses, setClasses] = useState([]);

    const handleChange = (event) => {
        setValue(event.target.value);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        if (!favoriteClasses.includes(value)) {
            setClasses(favoriteClasses.concat(value));
            setValue('');
        }
        // console.log(favoriteClasses);
    }

    const handleApiTypeChange = (event) => {
        setApiType(event.target.value);
    }

    return (
        <div className="home">
            <h1>Favorite Classes</h1>
            <form onSubmit={handleSubmit}>
                <label>Add Favorite Class</label>
                <input type="text" value={value} onChange={handleChange}></input>
                <button type="submit">Add Class!</button>
            </form>
            <form>
                <p>Select API</p>
                <label>
                    <input
                        type="radio"
                        name="api"
                        value="rest"
                        checked={backendType === 'rest'}
                        onChange={handleApiTypeChange} /> REST
                </label>
                <label>
                    <input
                        type="radio"
                        name="api"
                        value="graphql"
                        checked={backendType === 'graphql'}
                        onChange={handleApiTypeChange} /> GraphQL
                </label>
            </form>
            <div className="listClasses">
                {favoriteClasses.map((favClass) => {
                    if (backendType === 'rest') {
                        return <Class name={favClass} key={favClass}></Class>
                    } else {
                        return <ClassGraphQL name={favClass} key={favClass}></ClassGraphQL>
                    }
                }
                )}
            </div>
        </div>
    )
}

export default Home

