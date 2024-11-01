import React, { useState } from "react";
import SidebarItem from "./ui/SidebarItem";
import IntegrationPopup from "./ui/IntegrationPopup";
import { useNavigate } from "react-router-dom";

interface SidebarProps {}

const Sidebar: React.FC<SidebarProps> = () => {
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const navigate = useNavigate();

    const handlePopup = () => {
        setIsPopupOpen((prev) => !prev);
    };

    const createWorkSpace = () => {
        console.log("New workspace created");
        navigate("/workspace");
    };

    const sidebarItems = [
        {
            title: "Integrations",
            type: "button" as const,
            iconSrc:
                "https://cdn.builder.io/api/v1/image/assets/TEMP/bb8c4a9d007bd61f491d62f7f6828ed33b25aa7b5b1edfaeb9d64afb94ad3535?placeholderIfAbsent=true&apiKey=185142cafc424ef59bd121ce5895eb95",
            functionality: handlePopup,
        },
        {
            title: "Workspaces",
            type: "button" as const,
            buttonText: "New Workspaces",
            iconSrc:
                "https://cdn.builder.io/api/v1/image/assets/TEMP/bb8c4a9d007bd61f491d62f7f6828ed33b25aa7b5b1edfaeb9d64afb94ad3535?placeholderIfAbsent=true&apiKey=185142cafc424ef59bd121ce5895eb95",
            functionality: createWorkSpace,
        },
    ];

    return (
        <aside className="flex flex-col items-start mt-14 ml-14 max-w-full text-2xl w-[220px] max-md:mt-10 max-md:ml-2.5">
            {sidebarItems.map((item, index) => (
                <SidebarItem key={index} {...item} />
            ))}
            {/* {PopupSection &&  */}
            {isPopupOpen && <IntegrationPopup handlePopup={handlePopup} />}
        </aside>
    );
};

export default Sidebar;
