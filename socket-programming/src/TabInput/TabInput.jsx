import Info from './Info/Info'
import Interests from './Interests/Interests';
import Settings from "./Settings/Settings";
import "./TabInput.css";
import React, { useState } from "react";


const config = [
    {
        name: "Info",
        component: Info,
        info: {
            name: "syed sarosh Hashmi",
            age: 35,
            gender: "Male"
        }
    },
    {
        name: "Interests",
        component: Interests,
        interests: {
            interest: ["cricket", "movies", "books", "javascript"]

        }

    },
    {
        name: "Settings",
        component: Settings,
        settings: {
            theme: "dark"
        }

    }

]
const TabInput = () => {
    const [activeTab, setActiveTab] = useState(0);

    return (
        <div>
            <div className='tabs'>
                {config && config?.map((data, i) => {
                    return <p className='items' key={i} onClick={() => setActiveTab(i)}>{data?.name}</p>
                })}
            </div>
            {config?.map((data, index) => {
                return <React.Fragment key={index}>
                    {activeTab == index ? <data.component /> : ""}
                </React.Fragment>
            })}
        </div>
    )
}

export default TabInput