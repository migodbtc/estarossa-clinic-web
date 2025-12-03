import { faMinus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

interface WorkspaceTitleProps {
  title: string;
  subtext: string;
  currentPage?: string;
  currentHref?: string;
}

const WorkspaceTitle = ({
  title,
  subtext,
  currentPage,
  currentHref,
}: WorkspaceTitleProps) => {
  return (
    <div className="h-[10vh] grid grid-cols-4 grid-rows-1 gap-4 px-2 mb-2">
      <div className="col-span-2 flex flex-col justify-center align-middle ">
        <h1 className="text-2xl font-bold mb-1">{title}</h1>
        <p className="text-sm text-slate-700">{subtext}</p>
      </div>

      <div className="col-span-2 flex flex-col justify-center align-middle text-right ">
        <span>
          <a href="/home" className="hover:underline">
            Estarossa
          </a>
          <FontAwesomeIcon icon={faMinus} className="mx-2" />
          <a href="/workspace" className="hover:underline">
            Workspace
          </a>
          <FontAwesomeIcon icon={faMinus} className="mx-2" />
          <a href={currentHref} className="hover:underline">
            {currentPage}
          </a>
        </span>
      </div>
    </div>
  );
};

export default WorkspaceTitle;
