import Card, { CardContent } from "@/components/ui/Card";
import WorkspaceTitle from "@/components/WorkspaceTitle";
import { faChevronRight, faGear } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Page() {
  return (
    <section className="w-full h-[75vh] ">
      <WorkspaceTitle
        title="Settings"
        subtext="Application preferences and features."
        currentPage="Settings"
        currentHref="/workspace/settings"
      />
      <main className="flex-1 p-2 row h-auto ">
        <div className="grid grid-cols-12 gap-4 mb-8">
          <div className="col-span-3 flex flex-col gap-4">
            <Card className="w-full h-[65vh]">
              <CardContent className="flex flex-col gap-4">
                <h3 className="text-xl font-bold mt-4 text-slate-500">
                  Personal Information
                </h3>
                <button className="w-full h-8 mt-2 px-4 py-1 rounded-xl bg-slate-300/50  hover:bg-slate-400/50 hover:cursor-pointer text-left grid grid-cols-12">
                  <span className="col-span-10 ">
                    <FontAwesomeIcon icon={faGear} className="mr-4" />
                    Setting 1
                  </span>
                  <span className="col-span-2 flex justify-end items-center ">
                    <FontAwesomeIcon
                      icon={faChevronRight}
                      className="mr-4 float-right"
                    />
                  </span>
                </button>
                <button className="w-full h-8 mt-2 px-4 py-1 rounded-xl bg-slate-300/50  hover:bg-slate-400/50 hover:cursor-pointer text-left grid grid-cols-12">
                  <span className="col-span-10 ">
                    <FontAwesomeIcon icon={faGear} className="mr-4" />
                    Setting 2
                  </span>
                  <span className="col-span-2 flex justify-end items-center ">
                    <FontAwesomeIcon
                      icon={faChevronRight}
                      className="mr-4 float-right"
                    />
                  </span>
                </button>
                <button className="w-full h-8 mt-2 px-4 py-1 rounded-xl bg-slate-300/50  hover:bg-slate-400/50 hover:cursor-pointer text-left grid grid-cols-12">
                  <span className="col-span-10 ">
                    <FontAwesomeIcon icon={faGear} className="mr-4" />
                    Setting 3
                  </span>
                  <span className="col-span-2 flex justify-end items-center ">
                    <FontAwesomeIcon
                      icon={faChevronRight}
                      className="mr-4 float-right"
                    />
                  </span>
                </button>
                <button className="w-full h-8 mt-2 px-4 py-1 rounded-xl bg-slate-300/50  hover:bg-slate-400/50 hover:cursor-pointer text-left grid grid-cols-12">
                  <span className="col-span-10 ">
                    <FontAwesomeIcon icon={faGear} className="mr-4" />
                    Setting 4
                  </span>
                  <span className="col-span-2 flex justify-end items-center ">
                    <FontAwesomeIcon
                      icon={faChevronRight}
                      className="mr-4 float-right"
                    />
                  </span>
                </button>
              </CardContent>
            </Card>
          </div>
          {/* Side column */}
          <div className="col-span-9">
            <Card className="w-full h-[65vh]">
              <CardContent className="flex flex-col gap-4">
                <h3 className="text-xl font-bold mt-4 text-slate-500">
                  Setting 1
                </h3>
                <div className="grid grid-cols-2 gap-4 mt-2">
                  <div className="flex flex-col">
                    <span className="w-full font-semibold">Toggle themes</span>
                    <span className="text-slate-400 italic text-sm w-2/3 text-justify">
                      Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet
                    </span>
                  </div>
                  <div className="flex flex-row gap-4">
                    <label className="text-slate-600">
                      <input
                        type="radio"
                        name="theme"
                        value="light"
                        className="mr-2 hover:cursor-pointer"
                      />
                      Light
                    </label>
                    <label className="text-slate-600">
                      <input
                        type="radio"
                        name="theme"
                        value="dark"
                        className="mr-2 hover:cursor-pointer"
                      />
                      Dark
                    </label>
                    <label className="text-slate-600">
                      <input
                        type="radio"
                        name="theme"
                        value="default"
                        className="mr-2 hover:cursor-pointer "
                      />
                      System Default
                    </label>
                  </div>
                  <div className="flex flex-col">
                    <span className="w-full font-semibold">Toggle themes</span>
                    <span className="text-slate-400 italic text-sm w-2/3 text-justify">
                      Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet
                    </span>
                  </div>
                  <div className="flex flex-row gap-4">
                    <label className="text-slate-600">
                      <input
                        type="radio"
                        name="theme"
                        value="light"
                        className="mr-2 hover:cursor-pointer"
                      />
                      Light
                    </label>
                    <label className="text-slate-600">
                      <input
                        type="radio"
                        name="theme"
                        value="dark"
                        className="mr-2 hover:cursor-pointer"
                      />
                      Dark
                    </label>
                    <label className="text-slate-600">
                      <input
                        type="radio"
                        name="theme"
                        value="default"
                        className="mr-2 hover:cursor-pointer "
                      />
                      System Default
                    </label>
                  </div>
                  <div className="flex flex-col">
                    <span className="w-full font-semibold">Toggle themes</span>
                    <span className="text-slate-400 italic text-sm w-2/3 text-justify">
                      Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet
                    </span>
                  </div>
                  <div className="flex flex-row gap-4">
                    <label className="text-slate-600">
                      <input
                        type="radio"
                        name="theme"
                        value="light"
                        className="mr-2 hover:cursor-pointer"
                      />
                      Light
                    </label>
                    <label className="text-slate-600">
                      <input
                        type="radio"
                        name="theme"
                        value="dark"
                        className="mr-2 hover:cursor-pointer"
                      />
                      Dark
                    </label>
                    <label className="text-slate-600">
                      <input
                        type="radio"
                        name="theme"
                        value="default"
                        className="mr-2 hover:cursor-pointer "
                      />
                      System Default
                    </label>
                  </div>
                  <div className="flex flex-col">
                    <span className="w-full font-semibold">Toggle themes</span>
                    <span className="text-slate-400 italic text-sm w-2/3 text-justify">
                      Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet
                    </span>
                  </div>
                  <div className="flex flex-row gap-4">
                    <label className="text-slate-600">
                      <input
                        type="radio"
                        name="theme"
                        value="light"
                        className="mr-2 hover:cursor-pointer"
                      />
                      Light
                    </label>
                    <label className="text-slate-600">
                      <input
                        type="radio"
                        name="theme"
                        value="dark"
                        className="mr-2 hover:cursor-pointer"
                      />
                      Dark
                    </label>
                    <label className="text-slate-600">
                      <input
                        type="radio"
                        name="theme"
                        value="default"
                        className="mr-2 hover:cursor-pointer "
                      />
                      System Default
                    </label>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </section>
  );
}
