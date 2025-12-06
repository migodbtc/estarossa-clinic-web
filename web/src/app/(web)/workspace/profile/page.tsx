"use client";
import Card, { CardContent } from "@/components/ui/Card";
import WorkspaceTitle from "@/components/WorkspaceTitle";
import { useMockUser } from "@/contexts/MockUserContext";
import { faEdit, faPenSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { userAgent } from "next/server";

export default function Page() {
  const { user: mockUserCtx } = useMockUser();

  return (
    <section className="w-full h-[75vh] ">
      <WorkspaceTitle
        title="Profile"
        subtext="Edit your profile and contact details."
        currentPage="Profile"
        currentHref="/workspace/profile"
      />
      <main className="flex-1 p-2 row h-auto ">
        <div className="grid grid-cols-12 gap-4 h-full mb-8">
          <div className="col-span-8 flex flex-col gap-4">
            <Card className="py-2 flex justify-left align-middle text-left">
              <CardContent>
                <div className="w-full pt-12 grid grid-cols-2">
                  <div className="h-full text-left ">
                    <h3 className="text-2xl font-bold">
                      {mockUserCtx.full_name}
                    </h3>
                    <span className="bg-slate-400 text-white text-xs px-4 py-1 rounded-2xl font-bold">
                      {mockUserCtx.role.toUpperCase()}
                    </span>
                  </div>
                  <div className="h-full text-right flex justify-end">
                    <button className="w-auto h-auto bg-slate-100 px-4 py-1 rounded-lg mt-auto flex flex-row gap-2 text-sm font-semibold hover:cursor-pointer hover:bg-slate-200">
                      <span>
                        {" "}
                        <FontAwesomeIcon icon={faEdit}></FontAwesomeIcon>
                        {"  "}Edit Profile
                      </span>
                    </button>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="py-2 flex justify-left align-middle text-left">
              <CardContent>
                <form>
                  <div className="w-full">
                    <h3 className="text-xl font-bold">Personal Information</h3>
                    <div className="grid grid-cols-2 gap-4 my-4">
                      <div className="">
                        <label className="font-semibold text-sm text-slate-500">
                          Full Name
                        </label>
                        <input
                          type="text"
                          className="w-full h-8 border-slate-200 border-2 rounded-lg px-2 py-1 text-sm"
                          value={mockUserCtx.full_name ?? ""}
                          disabled
                        ></input>
                      </div>
                      <div className="">
                        <label className="font-semibold text-sm text-slate-500">
                          Email Address
                        </label>
                        <input
                          type="email"
                          className="w-full h-8 border-slate-200 border-2 rounded-lg px-2 py-1 text-sm"
                          value={mockUserCtx.email ?? ""}
                          disabled
                        ></input>
                      </div>
                      <div className="col-span-2">
                        <label className="font-semibold text-sm text-slate-500">
                          Home Address
                        </label>
                        <input
                          type="text"
                          className="w-full h-8 border-slate-200 border-2 rounded-lg px-2 py-1 text-sm"
                          disabled
                        ></input>
                      </div>
                      <div className="">
                        <label className="font-semibold text-sm text-slate-500">
                          Contact Number
                        </label>
                        <input
                          type="tel"
                          className="w-full h-8 border-slate-200 border-2 rounded-lg px-2 py-1 text-sm"
                          value={mockUserCtx.contact_number ?? ""}
                          disabled
                        ></input>
                      </div>
                      <div className="">
                        <label className="font-semibold text-sm text-slate-500">
                          Sex
                        </label>
                        <select
                          className="w-full h-8 border-slate-200 border-2 rounded-lg px-2 py-1 text-sm"
                          value={mockUserCtx.sex ?? ""}
                          disabled
                        >
                          <option value="" disabled>
                            Select sex
                          </option>
                          <option value="male">Male</option>
                          <option value="female">Female</option>
                          <option value="other">Other</option>
                        </select>
                      </div>
                      <div className="">
                        <label className="font-semibold text-sm text-slate-500">
                          Birthdate
                        </label>
                        <input
                          type="date"
                          className="w-full h-8 border-slate-200 border-2 rounded-lg px-2 py-1 text-sm"
                          disabled
                        ></input>
                      </div>
                      <div className="">
                        <label className="font-semibold text-sm text-slate-500">
                          Role
                        </label>
                        <input
                          type="text"
                          className="w-full h-8 border-slate-200 border-2 rounded-lg px-2 py-1 text-sm"
                          disabled
                        ></input>
                      </div>
                    </div>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
          {/* Side column */}
          <div className="col-span-4 h-full">
            <Card className="w-full h-full py-2">
              <CardContent className="">
                Gonna be a role-based sidebar rendering the role of the user
                with its responsibilities
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </section>
  );
}
