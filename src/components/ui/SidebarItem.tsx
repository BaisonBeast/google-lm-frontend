import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useUserStore from "../../store/userStore";
import { Check,Trash } from "lucide-react";
import ReactGA from "react-ga4";

interface PreviousCreations {
    _id: string;
    name: string;
}

interface SidebarItemProps {
    title: string;
    type: "icon" | "button" | "otherType";
    buttonText?: string;
    iconSrc?: string;
    key: number;
    functionality: () => void;
    previousCreations: PreviousCreations[];
    deleteWorkspace? : (workspaceId:string) => void;
}

const SidebarItem: React.FC<SidebarItemProps> = ({
    title,
    type,
    buttonText,
    iconSrc,
    functionality,
    previousCreations,
    deleteWorkspace
}) => {
    const navigate = useNavigate();
    const { openAiKey, propertyId } = useUserStore();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [workspaceToDelete,setWorkspaceToDelete] = useState<string | null>(null);

    const handleDeletClick = (workspaceId : string)=>{
        setWorkspaceToDelete(workspaceId);
        setIsModalOpen(true);
    }

    const handleDeleteConfirm = () => {
        if(workspaceToDelete && deleteWorkspace){
            deleteWorkspace(workspaceToDelete);
        }
        setIsModalOpen(false);
        setWorkspaceToDelete(null);
    }

    const handleDeleteCancel = () => {
        setIsModalOpen(false);
        setWorkspaceToDelete(null);
    }

    return (
        <div>
            <h2 className="text-start text-2xl  font-pops">{title}</h2>
            {type === "icon" && (
                <div className="flex shrink-0 mt-7 rounded-3xl border border-gray-300 border-solid h-[110px] w-[110px]" />
            )}
            {type === "button" && (
                <div className="flex gap-2 w-screen p-5 flex-wrap">
                    {/* Button */}
                    <button
                        className={`${title === 'Integrations'? 'min-w-40 h-40': 'min-w-48 h-48'} font-pops flex flex-col items-center justify-center px-4 py-4 text-lg font-medium rounded-3xl border border-gray-300 transition-transform duration-300 transform hover:scale-105 hover:bg-gray-200`}
                        onClick={() => functionality()}
                    >
                        <img
                            loading="lazy"
                            src={iconSrc}
                            alt=""
                            className="object-contain w-12 h-12"
                        />
                        <span
                            data-layername={buttonText?.toLowerCase()}
                            className="mt-4 text-center text-gray-700"
                        >
                            {buttonText}
                        </span>
                    </button>
                    {/* <div className="flex flex-wrap w-screen gap-2"> */}
                        {/* Previous Creations */}
                        {previousCreations.length > 0 &&
    previousCreations.map((previousCreation) => (
        <div
            key={previousCreation._id}
            className="relative flex flex-col items-center justify-center w-48 h-48 px-4 py-4 text-lg font-medium rounded-3xl border border-gray-300 transition-transform duration-300 transform hover:scale-105 hover:bg-gray-200 cursor-pointer"
            onClick={() => {
                ReactGA.event({
                    category: "User",
                    action: "Clicked Submit Button",
                    label: "Submit Form",
                });
                navigate(`/workspace/${previousCreation._id}`);
            }}
        >
            <span className="text-gray-700 font-semibold text-center">
                {previousCreation.name}
            </span>
            
            <button
                className="absolute bottom-2 right-2 p-2 rounded-full  text-red-600"
                onClick={(e) => {
                    e.stopPropagation();
                    handleDeletClick(previousCreation._id);
                }}
            >
                <Trash size={18} />
            </button>
        </div>
    ))}

                        {openAiKey && title === "Integrations" && (
                            <div className="flex items-center justify-center w-40 h-40 px-4 py-4 text-lg font-medium rounded-3xl border border-gray-300 transition-transform duration-300 transform hover:scale-105 hover:bg-gray-200 cursor-pointer gap-1">
                                <span>ChatGpt</span>
                                <Check className="text-green-500" />
                            </div>
                        )}
                        {propertyId && title === "Integrations" && (
                            <div className="flex items-center justify-center w-40 h-40 px-4 py-4 text-lg font-medium rounded-3xl border border-gray-300 transition-transform duration-300 transform hover:scale-105 hover:bg-gray-200 cursor-pointer gap-1">
                                <span>Analytics</span>
                                <Check className="text-green-500" />
                            </div>
                        )}
                        {isModalOpen && (
                            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                                <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
                                    <h3 className="text-lg font-medium text-gray-800">Are you sure you want to delete this workspace</h3>
                                    <div className="flex justify-end gap-3 mt-4">
                                        <button className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                                        onClick={handleDeleteConfirm}
                                        >Delete</button>
                                        <button className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400"
                                        onClick={handleDeleteCancel}
                                        >Cancel</button>
                                    </div>
                                </div>
                            </div>
                        )}
                    {/* </div> */}
                </div>
            )}
        </div>
    );
};

export default SidebarItem;
